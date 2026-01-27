import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-base font-semibold text-slate-900">
              PixoConvert
            </div>
            <p className="mt-2 text-sm text-slate-600 max-w-sm">
              Simple online image converter — JPG, PNG, WebP. Files are processed
              only to perform conversion.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/about" className="text-slate-700 hover:text-slate-900">
              About
            </Link>
            <Link href="/privacy" className="text-slate-700 hover:text-slate-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-700 hover:text-slate-900">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-slate-700 hover:text-slate-900">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} PixoConvert. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
