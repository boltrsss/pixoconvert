export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600">
            <div className="font-semibold text-slate-900">PixoConvert</div>
            <div className="mt-1">
              Simple online image converter — JPG, PNG, WebP.
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href="/privacy-policy"
              className="text-slate-600 hover:text-slate-900 underline-offset-4 hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-slate-600 hover:text-slate-900 underline-offset-4 hover:underline"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="text-slate-600 hover:text-slate-900 underline-offset-4 hover:underline"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} PixoConvert. All rights reserved.
        </div>
      </div>
    </footer>
  );
}