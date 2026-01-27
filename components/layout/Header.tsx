"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
            P
          </div>
          <div className="leading-tight">
            <div className="text-base font-semibold text-slate-900">
              PixoConvert
            </div>
            <div className="text-xs text-slate-500">
              Simple online image converter
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/about" className="text-slate-700 hover:text-slate-900">
            About
          </Link>
          <Link href="/privacy" className="text-slate-700 hover:text-slate-900">
            Privacy
          </Link>
          <Link href="/terms" className="text-slate-700 hover:text-slate-900">
            Terms
          </Link>
          <Link href="/contact" className="text-slate-700 hover:text-slate-900">
            Contact
          </Link>
          <Link
            href="/#convert"
            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            Convert
          </Link>
        </nav>
      </div>
    </header>
  );
}
