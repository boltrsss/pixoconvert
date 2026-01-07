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
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [target, setTarget] = useState<TargetFormat>("png");
  const [isDragging, setIsDragging] = useState(false);

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

  function clearFile() {
    setFile(null);
    resetState();
    if (inputRef.current) inputRef.current.value = "";
  }

  function setPickedFile(f: File | null) {
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

      const up = await getUploadUrl(file);
      await uploadFileToS3(file, up.upload_url);

      setStatus("converting");
      setMessage("Converting...");

      const start = await startImageConversion(up.key, normalizeTarget(target));

      const maxTries = 90; // ~90s
      for (let i = 0; i < maxTries; i++) {
        const st = await getJobStatus(start.job_id);

        if (isDoneStatus(st.status)) {
          if (st.file_url) {
            setDownloadUrl(st.file_url);
            setStatus("done");
            setMessage("Done.");
            return;
          }

          setStatus("error");
          setMessage(
            st.output_s3_key
              ? "Job completed but no file_url returned. Backend should return a signed download URL."
              : "Job completed but no file_url returned."
          );
          return;
        }

        if (isErrorStatus(st.status)) {
          setStatus("error");
          setMessage(extractErrorMessage(st));
          return;
        }

        const p =
          typeof st.progress === "number"
            ? Math.max(0, Math.min(99, st.progress))
            : null;

        if (p !== null) setMessage(`Converting... ${p}%`);
        else if (st.status) setMessage(`Converting... (${st.status})`);
        else setMessage("Converting...");

        await new Promise((r) => setTimeout(r, 1000));
      }

      setStatus("error");
      setMessage("Timed out. Please try again.");
    } catch (e: any) {
      setStatus("error");
      setMessage(e?.message || "Something went wrong.");
    }
  }

  // --- Drag & Drop handlers ---
  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const f = e.dataTransfer?.files?.[0] || null;
    if (f) setPickedFile(f);
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

  const selectedName = file?.name || "";

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold">Convert an image</h2>
      <p className="text-sm text-slate-600 mt-1">
        Upload a JPG/PNG/WebP file, choose an output format, and download the converted result.
      </p>

      {/* Big Drag Area */}
      <div
        className={`mt-5 w-full mx-auto rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors relative ${
          isDragging
            ? "border-blue-600 bg-blue-100"
            : "border-blue-300 bg-blue-50 hover:bg-blue-100"
        }`}
        onClick={() => inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        {/* Remove (X) */}
        {file && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              clearFile();
            }}
            aria-label="Remove selected file"
            className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white"
          >
            ✕
          </button>
        )}

        <div className="flex flex-col items-center justify-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center">
            <span className="text-2xl">⬆️</span>
          </div>

          <div className="mt-4 text-base font-semibold text-slate-900">
            Drop your image here
          </div>
          <div className="mt-1 text-sm text-slate-700">
            or <span className="underline text-blue-700">click to browse</span>
          </div>

          <div className="mt-3 text-xs text-slate-600">
            Supported: JPG, PNG, WebP
          </div>

          {file && (
            <div className="mt-4 w-full max-w-xl text-sm text-slate-800">
              <div className="font-medium">Selected:</div>
              <div className="mt-1 break-words">{selectedName}</div>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => setPickedFile(e.target.files?.[0] ?? null)}
        />
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value as TargetFormat)}
          className="w-full sm:w-1/2 rounded-xl border border-slate-300 px-3 py-2 bg-white"
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

      {/* Message */}
      {message ? (
        <div
          className={`mt-3 text-sm ${
            status === "error" ? "text-red-600" : "text-slate-700"
          }`}
        >
          {message}
        </div>
      ) : null}

      {/* Download */}
      {downloadUrl ? (
        <a
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 text-white px-4 py-2 font-semibold"
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      ) : null}

      {/* Footer small row */}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={clearFile}
          className="text-xs text-slate-600 hover:text-slate-900 underline"
        >
          Reset
        </button>

        <p className="text-xs text-slate-500">
          Files are processed only to perform conversion.
        </p>
      </div>
    </div>
  );
}
