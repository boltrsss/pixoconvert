import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg sm:text-xl font-semibold text-slate-900">
              PixoConvert
            </span>
            <span className="text-xs sm:text-sm text-slate-500">
              Simple Image Converter
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center gap-6 text-sm">
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
            Privacy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-slate-600 hover:text-slate-900"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-slate-600 hover:text-slate-900"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
