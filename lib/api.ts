// lib/api.ts

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://cnv.wiseconverthub.com";

export type UploadUrlResponse = {
  upload_url: string;
  key: string; // s3_key
};

export async function getUploadUrl(file: File): Promise<UploadUrlResponse> {
  const res = await fetch(`${API_BASE}/api/get-upload-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      file_name: file.name,
      content_type: file.type || "application/octet-stream",
    }),
  });

  if (!res.ok) throw new Error("Failed to get upload URL");
  return res.json();
}

export async function uploadFileToS3(file: File, uploadUrl: string): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });

  if (!res.ok) throw new Error("Failed to upload file to S3");
}

export type StartConversionResponse = {
  job_id: string;
  status: string;
};

export async function startImageConversion(
  s3Key: string,
  targetFormat: "jpg" | "png" | "webp"
): Promise<StartConversionResponse> {
  const res = await fetch(`${API_BASE}/api/start-conversion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      s3_key: s3Key,
      target_format: targetFormat,
      settings: null, // image convert 不需要 settings
    }),
  });

  if (!res.ok) throw new Error("Failed to start conversion");
  return res.json();
}

export type StatusResponse = {
  job_id: string;
  status?: string; // queued/processing/done/error (你的後端怎麼回就怎麼吃)
  progress?: number;
  message?: string;
  output_s3_key?: string;
  file_url?: string; // ✅ 你後端回的 download URL
  raw?: Record<string, any>;
};

export async function getJobStatus(jobId: string): Promise<StatusResponse> {
  const res = await fetch(`${API_BASE}/api/status/${jobId}`, { method: "GET" });
  if (!res.ok) throw new Error("Failed to fetch job status");
  return res.json();
}
