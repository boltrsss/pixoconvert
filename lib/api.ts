// lib/api.ts
export type UploadUrlResponse = { upload_url: string; key: string };
export type StartResponse = { job_id: string };
export type StatusResponse = {
  status: "queued" | "processing" | "done" | "error";
  download_url?: string;
  error?: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://cnv.wiseconverthub.com";

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

/**
 * Step 1: ask backend for presigned upload URL
 * NOTE: Update the endpoint path to match your existing backend.
 */
export async function getUploadUrl(filename: string, contentType: string) {
  return jsonFetch<UploadUrlResponse>(`${API_BASE_URL}/upload-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, content_type: contentType }),
  });
}

/** Step 2: upload file to S3 presigned URL */
export async function uploadFileToS3(uploadUrl: string, file: File) {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });
  if (!res.ok) throw new Error(`S3 upload failed: ${res.status}`);
}

/**
 * Step 3: start conversion job
 * NOTE: Update endpoint + payload to match your existing backend.
 */
export async function startImageConvert(key: string, targetFormat: "jpg" | "png" | "webp") {
  return jsonFetch<StartResponse>(`${API_BASE_URL}/convert/image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tool_slug: "image-convert",
      input_key: key,
      target_format: targetFormat,
      settings: {},
    }),
  });
}

/** Step 4: poll job status */
export async function getJobStatus(jobId: string) {
  return jsonFetch<StatusResponse>(`${API_BASE_URL}/status/${jobId}`, {
    method: "GET",
  });
}
