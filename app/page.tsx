import React from "react";
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
            Simple Online Image Converter
          </h1>
          <p className="mt-3 max-w-2xl text-slate-700">
            Convert JPG, PNG, and WebP images in a few clicks. No account required.
          </p>
        </header>

        {/* Tool */}
        <section className="mb-6">
          <ImageConvertBox />
        </section>

        {/* Ad (Top) */}
        <section className="mb-10">
          <div className="max-w-2xl mx-auto">
            <AdSlot label="Ad space (Top)" />
          </div>
        </section>

        {/* Info cards (like WiseConvert) */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold">Supported formats</h3>
            <p className="mt-2 text-sm text-slate-600">JPG, PNG, WebP</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold">How it works</h3>
            <p className="mt-2 text-sm text-slate-600">
              Upload your image, choose an output format, and download the result.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold">Privacy</h3>
            <p className="mt-2 text-sm text-slate-600">
              Files are processed only to perform conversion.
            </p>
          </div>
        </section>

        {/* Ad (Bottom) */}
        <section className="mt-10">
          <div className="max-w-5xl mx-auto">
            <AdSlot label="Ad space (Bottom)" />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-600 flex flex-wrap gap-x-4 gap-y-2">
          <a href="/about" className="hover:text-slate-900">About</a>
          <a href="/privacy" className="hover:text-slate-900">Privacy</a>
          <a href="/terms" className="hover:text-slate-900">Terms</a>
          <a href="/contact" className="hover:text-slate-900">Contact</a>
          <span className="ml-auto">© {new Date().getFullYear()} PixoConvert</span>
        </footer>
      </div>
    </main>
  );
}
