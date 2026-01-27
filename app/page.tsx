import React, { Suspense } from "react";
import ImageConvertBox from "@/components/ImageConvertBox";
import AdSlot from "@/components/AdSlot";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <header className="mb-8">
          <div className="text-sm text-slate-600">PixoConvert</div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            JPG to PNG Converter
          </h1>

          <p className="mt-3 max-w-2xl text-slate-700">
            Convert JPG images to PNG online in seconds. No account required.
            <span className="block text-sm text-slate-500 mt-1">
              Also supports PNG and WebP images.
            </span>
          </p>
        </header>

        {/* Tool (Suspense required for useSearchParams) */}
        <section className="mb-6" id="convert">
          <Suspense
            fallback={
              <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                Loading converter…
              </div>
            }
          >
            <ImageConvertBox />
          </Suspense>
        </section>

        {/* Ad (Top) */}
        <section className="mb-10">
          <div className="max-w-2xl mx-auto">
            <AdSlot label="Ad space (Top)" />
          </div>
        </section>

        {/* Info cards */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold">Supported formats</h2>
            <p className="mt-2 text-sm text-slate-600">JPG, PNG, WebP</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold">How it works</h2>
            <p className="mt-2 text-sm text-slate-600">
              Upload your image, choose an output format, and download the result.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold">Privacy</h2>
            <p className="mt-2 text-sm text-slate-600">
              Files are processed only to perform conversion. Temporary files are removed
              after processing.
            </p>
          </div>
        </section>

        {/* TEXT WEIGHT (Important for AdSense) */}
        <section className="mt-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold">About this JPG to PNG Converter</h2>
            <div className="mt-3 space-y-3 text-sm text-slate-700 leading-7">
              <p>
                PixoConvert is a simple online image converter designed for fast, everyday
                file format changes. JPG is widely used for photos because it can compress
                images to smaller sizes, while PNG is often preferred when you need
                lossless quality or transparent backgrounds (depending on the image).
              </p>
              <p>
                If you&apos;re preparing assets for websites, design work, or documents, converting
                to PNG can help preserve details and avoid artifacts in certain cases.
                For modern web performance, WebP is also supported and can often reduce file
                size while keeping good visual quality.
              </p>
              <p>
                We keep this site focused on one core job: image conversion. That means fewer
                distractions, no account required, and a straightforward workflow — upload,
                select output, convert, and download.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>

            <h3 className="mt-5 font-semibold">Is my image safe?</h3>
            <p className="mt-2 text-sm text-slate-700 leading-7">
              Yes. Files are processed only to perform conversion and are not used for profiling.
              Temporary uploads are removed after processing. See the Privacy Policy for details.
            </p>

            <h3 className="mt-5 font-semibold">Will converting reduce image quality?</h3>
            <p className="mt-2 text-sm text-slate-700 leading-7">
              Results vary by format. PNG is typically lossless. JPG and WebP may use
              compression, so file size and quality can change depending on the input.
            </p>

            <h3 className="mt-5 font-semibold">Why is the converted file size larger?</h3>
            <p className="mt-2 text-sm text-slate-700 leading-7">
              PNG files can be larger because they often store more information and may use
              lossless compression. WebP usually provides smaller files for web usage.
            </p>

            <h3 className="mt-5 font-semibold">Do I need an account?</h3>
            <p className="mt-2 text-sm text-slate-700 leading-7">
              No. PixoConvert is designed to be simple and fast with no account required.
            </p>
          </div>
        </section>

        {/* Ad (Bottom) */}
        <section className="mt-10">
          <div className="max-w-5xl mx-auto">
            <AdSlot label="Ad space (Bottom)" />
          </div>
        </section>
      </div>
    </main>
  );
}
