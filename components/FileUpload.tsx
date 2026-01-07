"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  getUploadUrl,
  uploadFileToS3,
  startImageConversion,
  getJobStatus,
  type StatusResponse,
} from "@/lib/api";

type UploadStatus = "idle" | "uploading" | "processing" | "done" | "error";

type UploadItem = {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: UploadStatus;
  progress: number;
  outputFormat: string;
  jobId?: string;
  downloadUrl?: string;
  errorMessage?: string;
};

type FileUploadProps = {
  inputFormat?: string; // 顯示用，例如 "JPG"
  outputFormat?: string; // 預設輸出格式，例如 "PNG"
};

const OUTPUT_OPTIONS = ["png", "jpg", "jpeg", "webp"];

function fmtMb(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function isSuccessStatus(s?: string) {
  const v = (s || "").toLowerCase();
  return v === "done" || v === "completed" || v === "success";
}

function isErrorStatus(s?: string) {
  const v = (s || "").toLowerCase();
  return v === "error" || v === "failed" || v === "fail";
}

export default function FileUpload({ inputFormat, outputFormat = "png" }: FileUploadProps) {
  const [items, setItems] = useState<UploadItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // 取消：只停止 polling，不殺後端 job
  const cancelledJobsRef = useRef<Set<string>>(new Set());

  const [selectedOutput, setSelectedOutput] = useState(
    (outputFormat || "png").toLowerCase()
  );

  const addItem = (file: File): UploadItem => {
    const id = crypto.randomUUID();
    const item: UploadItem = {
      id,
      file,
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
      status: "idle",
      progress: 0,
      outputFormat: selectedOutput,
    };
    setItems((prev) => [...prev, item]);
    return item;
  };

  const updateItem = (id: string, patch: Partial<UploadItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  const runJobPipeline = async (item: UploadItem) => {
    try {
      const ext = item.name.split(".").pop()?.toLowerCase();

      // pixoconvert：先擋掉 avif（你原本也擋）
      if (ext === "avif") {
        const msg = "Unsupported format. Please upload JPG, PNG, or WebP.";
        updateItem(item.id, { status: "error", progress: 100, errorMessage: msg });
        setGlobalError(msg);
        return;
      }

      updateItem(item.id, { status: "uploading", progress: 0, errorMessage: undefined });

      // 1) Get presigned URL
      const uploadInfo = await getUploadUrl(item.file);

      // 2) Upload to S3
      await uploadFileToS3(item.file, uploadInfo.upload_url);
      updateItem(item.id, { status: "processing", progress: 10 });

      // 3) Start conversion (image)
      const targetFormat = (item.outputFormat || selectedOutput || "png").toLowerCase();

      // 注意：你的 backend 接 target_format；jpeg 可傳 jpeg（若後端只吃 jpg，你可以在這裡做映射）
      const normalizedTarget =
        targetFormat === "jpeg" ? "jpg" : targetFormat;

      const { job_id } = await startImageConversion(
        uploadInfo.key,
        normalizedTarget as any
      );

      updateItem(item.id, { jobId: job_id, status: "processing" });

      // 4) Polling
      const poll = async (): Promise<void> => {
        if (cancelledJobsRef.current.has(item.id)) return;

        const res: StatusResponse = await getJobStatus(job_id);

        // ✅ 進度（如果後端沒回，就用保守推進）
        const nextProgress = Math.min(95, Number(res.progress ?? 0) || 25);
        updateItem(item.id, { progress: nextProgress });

        // ✅ 成功：completed 或 done 都算
        if (isSuccessStatus(res.status)) {
          const anyRes = res as any;
          const downloadUrl =
            anyRes.file_url ?? anyRes.download_url ?? anyRes.output_url ?? null;

          updateItem(item.id, {
            status: "done",
            progress: 100,
            ...(downloadUrl ? { downloadUrl } : {}),
          });
          return;
        }

        // ✅ 失敗：failed 或 error
        if (isErrorStatus(res.status)) {
          const msg =
            (res as any)?.message ||
            "Conversion failed. Please try a different file or format.";

          updateItem(item.id, {
            status: "error",
            progress: 100,
            errorMessage: msg,
          });
          setGlobalError(msg);
          return;
        }

        setTimeout(poll, 3000);
      };

      setTimeout(poll, 1500);
    } catch (err: any) {
      console.error("[pipeline] error", err);
      const msg = err?.message || "Conversion failed. Please try again.";
      updateItem(item.id, { status: "error", progress: 100, errorMessage: msg });
      setGlobalError(msg);
    }
  };

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const list = Array.from(files);
      for (const file of list) {
        const item = addItem(file);
        void runJobPipeline(item);
      }
    },
    [selectedOutput]
  );

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const dt = e.dataTransfer;
    if (!dt) return;
    if (dt.files && dt.files.length > 0) handleFiles(dt.files);
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
      e.target.value = "";
    }
  };

  const displayOutput = (selectedOutput || outputFormat || "png").toUpperCase();

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Global Error Banner */}
      {globalError && (
        <div className="w-full max-w-3xl mx-auto mb-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 flex items-start justify-between gap-3">
          <div className="flex gap-2">
            <span className="mt-0.5">⚠️</span>
            <span>{globalError}</span>
          </div>
          <button
            type="button"
            onClick={() => setGlobalError(null)}
            className="text-red-400 hover:text-red-600 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top: output format */}
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between text-sm mb-1 gap-3">
        <div className="text-gray-600">
          {inputFormat ? `Convert ${inputFormat} files to ${displayOutput}` : `Files will be converted to ${displayOutput}`}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-500">Output format</span>
          <select
            className="border border-gray-300 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedOutput}
            onChange={(e) => setSelectedOutput(e.target.value)}
          >
            {OUTPUT_OPTIONS.map((fmt) => (
              <option key={fmt} value={fmt}>
                {fmt.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Drop zone */}
      <div
        className={`w-full max-w-3xl border-2 border-dashed rounded-2xl p-10 mx-auto text-center transition-colors cursor-pointer ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl">⬆️</span>
          </div>
          <p className="text-lg font-semibold">
            Drop images here or <span className="text-blue-600 underline">browse</span>
          </p>
          <p className="text-xs text-gray-500">
            JPG / PNG / WebP · Converted to {displayOutput}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={onFileInputChange}
        />
      </div>

      {/* Queue */}
      <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
        <h2 className="font-semibold mb-3 text-sm">Conversion Queue</h2>

        {items.length === 0 && (
          <p className="text-sm text-gray-400">No files yet. Drop a file to start converting.</p>
        )}

        <ul className="space-y-3">
          {items.map((item) => {
            const isRunning = item.status === "uploading" || item.status === "processing";

            return (
              <li
                key={item.id}
                className="flex flex-col gap-2 text-sm border border-gray-100 rounded-xl px-3 py-2"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{item.name}</div>
                    <div className="text-xs text-gray-400">
                      {fmtMb(item.size)} · {Math.round(item.progress ?? 0)}% · →{" "}
                      {(item.outputFormat || "").toUpperCase()}
                    </div>

                    <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-2 transition-all ${
                          item.status === "error"
                            ? "bg-red-400"
                            : item.status === "done"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${item.progress ?? 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {item.status === "done" && item.downloadUrl && (
                      <a
                        href={item.downloadUrl}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Download
                      </a>
                    )}

                    {isRunning && (
                      <button
                        type="button"
                        onClick={() => {
                          cancelledJobsRef.current.add(item.id);
                          updateItem(item.id, {
                            status: "error",
                            errorMessage: "Cancelled by user.",
                            progress: 100,
                          });
                        }}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-300 text-gray-600 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {item.errorMessage && (
                  <div className="text-xs text-red-500 mt-0.5">{item.errorMessage}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
