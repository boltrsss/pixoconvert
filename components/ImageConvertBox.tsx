"use client";

import React, { useMemo, useRef, useState } from "react";
import { getUploadUrl, uploadFileToS3, startImageConvert, getJobStatus } from "@/lib/api";

type TargetFormat = "jpg" | "png" | "webp";

const SUPPORTED: TargetFormat[] = ["jpg", "png", "webp"];

export default function ImageConvertBox() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [target, setTarget] = useState<TargetFormat>("png");
  const [status, setStatus] = useState<"idle" | "uploading" | "converting" | "done" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const canConvert = useMemo(() => !!file && status !== "uploading" && status !== "converting", [file, status]);

  async function onPickFile(f: File | null) {
    setFile(f);
    setStatus("idle");
    setMessage("");
    setDownloadUrl("");
  }

  async function onConvert() {
    if (!file) return;

    try {
      setStatus("uploading");
      setMessage("Preparing upload...");

      const up = await getUploadUrl(file.name, file.type || "application/octet-stream");
      await uploadFileToS3(up.upload_url, file);

      setStatus("converting");
      setMessage("Converting...");

      const start = await startImageConvert(up.key, target);

      // poll
      const maxTries = 60; // ~60s if 1s interval
      for (let i = 0; i < maxTries; i++) {
        const st = await getJobStatus(start.job_id);

        if (st.status === "done" && st.download_url) {
          setDownloadUrl(st.download_url);
          setStatus("done");
          setMessage("Done.");
          return;
        }
        if (st.status === "error") {
          setStatus("error");
          setMessage(st.error || "Conversion failed.");
          return;
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
            {status === "uploading" ? "Uploading..." : status === "converting" ? "Converting..." : "Convert"}
          </button>
        </div>

        {message ? <div className="text-sm text-slate-700">{message}</div> : null}

        {downloadUrl ? (
          <a
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-4 py-2"
            href={downloadUrl}
          >
            Download
          </a>
        ) : null}

        <p className="text-xs text-slate-500">
          Files are processed for conversion and should be removed from storage after processing (see Privacy Policy).
        </p>
      </div>
    </div>
  );
}
