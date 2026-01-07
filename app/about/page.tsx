export const runtime = "edge";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">About PixoConvert</h1>
      <p className="mt-4 text-slate-600 leading-relaxed">
        PixoConvert is a simple and fast online image converter that helps you
        convert images between common formats like JPG, PNG, and WebP.
      </p>

      <div className="mt-8 space-y-4 text-slate-600 leading-relaxed">
        <p>
          Our goal is to provide an easy-to-use tool that works directly in your
          browser—no installation and no account required.
        </p>
        <p>
          We focus on privacy, simplicity, and reliability. Files uploaded to
          PixoConvert are processed only to perform the conversion and are not used
          for any other purpose.
        </p>
        <p>
          If you have feedback or questions, please visit our Contact page.
        </p>
      </div>
    </main>
  );
}
