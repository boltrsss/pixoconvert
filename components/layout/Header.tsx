"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <span className="text-lg sm:text-xl font-semibold text-slate-900">
            PixoConvert
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {/* Core functions */}
          <Link href="/#convert" className="text-slate-600 hover:text-slate-900">
            JPG → PNG
          </Link>
          <Link href="/#convert" className="text-slate-600 hover:text-slate-900">
            JPG → WebP
          </Link>
          <Link href="/#convert" className="text-slate-600 hover:text-slate-900">
            PNG → JPG
          </Link>

          {/* Pages */}
          <Link href="/about" className="text-slate-600 hover:text-slate-900">
            About
          </Link>
          <Link href="/contact" className="text-slate-600 hover:text-slate-900">
            Contact
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-slate-700"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="flex flex-col px-4 py-4 gap-3 text-sm">
            {/* Core functions */}
            <Link
              href="/#convert"
              onClick={() => setOpen(false)}
              className="text-slate-700"
            >
              Convert JPG → PNG
            </Link>
            <Link
              href="/#convert"
              onClick={() => setOpen(false)}
              className="text-slate-700"
            >
              Convert JPG → WebP
            </Link>
            <Link
              href="/#convert"
              onClick={() => setOpen(false)}
              className="text-slate-700"
            >
              Convert PNG → JPG
            </Link>

            <div className="h-px bg-slate-200 my-2" />

            {/* Pages */}
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="text-slate-700"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="text-slate-700"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
