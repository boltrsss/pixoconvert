"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  getUploadUrl,
  uploadFileToS3,
  startImageConversion,
  getJobStatus,
  type StatusResponse,
} from "@/lib/api";

type TargetFormat = "jpg" | "png" | "webp" | "jpeg";
const SUPPORTED: TargetFormat[] = ["jpg", "jpeg", "png", "webp"];

function normalizeTarget(t: TargetFormat): "jpg" | "png" | "webp" {
  // 後端通常只吃 jpg/png/webp，前端選 jpeg 也統一轉成 jpg
  if (t === "jpeg") return "jpg";
  return t;
}

function isDoneStatus(status?: string) {
  const s = (status || "").toLowerCase();
  return s === "done" || s === "completed" || s === "success";
}

function isErrorStatus(status?: string) {
  const s = (status || "").toLowerCase();
  return s === "error" || s === "failed" || s === "fail";
}

export default function ImageConvertBox() {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [target, setTarget] = useState<TargetFormat>("png");

  const [status, setStatus] = useState<
    "idle" | "uploading" | "converting" | "done" | "error"
  >("idle");

  const [message, setMessage] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const canConvert = useMemo(() => {
    return !!file && status !== "uploading" && status !== "converting";
  }, [file, status]);

  function resetState() {
    setStatus("idle");
    setMessage("");
    setDownloadUrl("");
  }

  async function onPickFile(f: File | null) {
    setFile(f);
    resetState();
  }

  function extractErrorMessage(st: StatusResponse) {
    return (
      st.message ||
      (st.raw && (st.raw as any).message) ||
      "Conversion failed."
    );
  }

  async function onConvert() {
    if (!file) return;

    try {
      setStatus("uploading");
      setMessage("Preparing upload...");
      setDownloadUrl("");

      // 1) Get presigned URL
      const up = await getUploadUrl(file);

      // 2) Upload to S3
      await uploadFileToS3(file, up.upload_url);

      // 3) Start conversion
      setStatus("converting");
      setMessage("Converting...");

      const start = await startImageConversion(up.key, normalizeTarget(target));

      // 4) Poll status
      const maxTries = 70; // ~70s (1s interval)
      for (let i = 0; i < maxTries; i++) {
        const st = await getJobStatus(start.job_id);

        // ✅ 支援 done / completed / success
        if (isDoneStatus(st.status)) {
          if (st.file_url) {
            setDownloadUrl(st.file_url);
            setStatus("done");
            setMessage("Done.");
            return;
          }

          // 有些後端 completed 只回 output_s3_key，沒回 file_url
          // 先把狀況顯示出來方便 debug
          setStatus("error");
          setMessage(
            st.output_s3_key
              ? "Job completed but no file_url returned. Backend should return a signed download URL."
              : "Job completed but no file_url returned."
          );
          return;
        }

        // ✅ 支援 error / failed / fail
        if (isErrorStatus(st.status)) {
          setStatus("error");
          setMessage(extractErrorMessage(st));
          return;
        }

        // Progress / status hints
        const p =
          typeof st.progress === "number" ? Math.max(0, Math.min(99, st.progress)) : null;

        if (p !== null) {
          setMessage(`Converting... ${p}%`);
        } else if (st.status) {
          setMessage(`Converting... (${st.status})`);
        } else {
          setMessage("Converting...");
        }

        await new Promise((r) => setTimeout(r, 1000));
      }

      setStatus("error");
      setMessage("Timed out. Please try again.");
    } catch (e: any) {
      setStatus("error");
      setMessage(e?.message || "Something went wrong.");
    }
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-sm border border-slate-200 p-5">
      <h2 className="text-lg font-semibold">Convert an image</h2>
      <p className="text-sm text-slate-600 mt-1">
        Upload a JPG/PNG/WebP file, choose an output format, and download the converted result.
      </p>

      <div className="mt-4 space-y-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
        />

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-left hover:bg-slate-100"
        >
          {file ? (
            <span className="text-sm">
              Selected: <span className="font-medium">{file.name}</span>
            </span>
          ) : (
            <span className="text-sm text-slate-700">Click to upload an image</span>
          )}
        </button>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value as TargetFormat)}
            className="w-full sm:w-1/2 rounded-xl border border-slate-300 px-3 py-2"
          >
            {SUPPORTED.map((f) => (
              <option key={f} value={f}>
                Convert to {f.toUpperCase()}
              </option>
            ))}
          </select>

          <button
            type="button"
            disabled={!canConvert}
            onClick={onConvert}
            className="w-full sm:w-1/2 rounded-xl bg-slate-900 text-white px-4 py-2 disabled:opacity-50"
          >
            {status === "uploading"
              ? "Uploading..."
              : status === "converting"
              ? "Converting..."
              : "Convert"}
          </button>
        </div>

        {message ? (
          <div
            className={`text-sm ${
              status === "error" ? "text-red-600" : "text-slate-700"
            }`}
          >
            {message}
          </div>
        ) : null}

        {downloadUrl ? (
          <a
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-4 py-2"
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        ) : null}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setFile(null);
              resetState();
              if (fileRef.current) fileRef.current.value = "";
            }}
            className="text-xs text-slate-600 hover:text-slate-900 underline"
          >
            Reset
          </button>

          <p className="text-xs text-slate-500">
            Files are processed only to perform conversion. See Privacy Policy for details.
          </p>
        </div>
      </div>
    </div>
  );
}
