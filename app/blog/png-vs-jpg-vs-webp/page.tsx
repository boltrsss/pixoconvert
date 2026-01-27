export const runtime = "edge";

export default function BlogImageFormats() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">
        PNG vs JPG vs WebP: Which Image Format Should You Use?
      </h1>

      <p className="mt-4 text-slate-600 leading-relaxed">
        Choosing the correct image format is essential for balancing quality,
        file size, and compatibility. Each format serves a different purpose.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">JPG</h2>
      <p className="mt-3 text-slate-600 leading-relaxed">
        JPG is widely used for photographs due to its efficient lossy
        compression, but it does not support transparency.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">PNG</h2>
      <p className="mt-3 text-slate-600 leading-relaxed">
        PNG supports transparency and lossless compression, making it ideal for
        graphics and UI elements.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">WebP</h2>
      <p className="mt-3 text-slate-600 leading-relaxed">
        WebP combines the advantages of JPG and PNG with superior compression,
        making it a strong choice for modern websites.
      </p>

      <p className="mt-6 text-slate-600 leading-relaxed">
        PixoConvert supports all three formats, allowing you to choose the best
        option for your needs.
      </p>
    </main>
  );
}
