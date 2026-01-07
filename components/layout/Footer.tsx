import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left */}
          <div>
            <div className="font-semibold text-slate-900">PixoConvert</div>
            <p className="text-sm text-slate-500 mt-1">
              Simple online image converter — JPG, PNG, WebP.
            </p>
            <p className="text-xs text-slate-400 mt-2">
              © {new Date().getFullYear()} PixoConvert. All rights reserved.
            </p>
          </div>

          {/* Right links */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900"
            >
              About
            </Link>
            <Link
              href="/privacy-policy"
              className="text-slate-600 hover:text-slate-900"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-slate-600 hover:text-slate-900"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-slate-900"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
