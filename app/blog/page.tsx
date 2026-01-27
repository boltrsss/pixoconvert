import Link from "next/link";

export const runtime = "edge";

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">
        Image Conversion Guides
      </h1>

      <p className="mt-4 text-slate-600 leading-relaxed">
        Learn how to convert, optimize, and manage images for the web. These
        guides explain image formats, compression techniques, and best practices
        for modern websites.
      </p>

      <ul className="mt-8 space-y-6">
        <li>
          <Link
            href="/blog/jpg-to-webp"
            className="text-lg font-medium text-blue-600 underline"
          >
            Why You Should Convert JPG to WebP in 2026
          </Link>
          <p className="mt-1 text-sm text-slate-600">
            Understand why WebP is becoming the standard image format for modern
            websites.
          </p>
        </li>

        <li>
          <Link
            href="/blog/compress-images-without-losing-quality"
            className="text-lg font-medium text-blue-600 underline"
          >
            How to Compress Images Without Losing Quality
          </Link>
          <p className="mt-1 text-sm text-slate-600">
            Learn practical techniques to reduce image file size while
            preserving visual quality.
          </p>
        </li>

        <li>
          <Link
            href="/blog/png-vs-jpg-vs-webp"
            className="text-lg font-medium text-blue-600 underline"
          >
            PNG vs JPG vs WebP: Which Image Format Should You Use?
          </Link>
          <p className="mt-1 text-sm text-slate-600">
            A detailed comparison of the most common image formats used on the
            web.
          </p>
        </li>
      </ul>
    </main>
  );
}
