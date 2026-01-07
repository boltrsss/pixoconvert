import ImageConvertBox from "@/components/ImageConvertBox";
import ImageConvertBox from "@/components/AdSlot";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8">
          <div className="text-sm text-slate-600">PixoConvert</div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Simple Online Image Converter
          </h1>
          <p className="mt-3 max-w-2xl text-slate-700">
            Convert JPG, PNG, and WebP images in a few clicks. No account required.
          </p>
        </header>

        <section className="mb-10">
          <ImageConvertBox />
          <AdSlot />
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white border border-slate-200 p-5">
            <h2 className="font-semibold">Supported formats</h2>
            <p className="mt-2 text-sm text-slate-700">JPG, PNG, WebP</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5">
            <h2 className="font-semibold">How it works</h2>
            <p className="mt-2 text-sm text-slate-700">
              Upload → choose output format → convert → download.
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-5">
            <h2 className="font-semibold">Privacy</h2>
            <p className="mt-2 text-sm text-slate-700">
              We only use your file to perform the conversion. See our Privacy Policy for details.
            </p>
          </div>
        </section>

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
