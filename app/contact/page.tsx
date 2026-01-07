export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-sm text-slate-700">
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">
        Contact Us
      </h1>

      <p className="mb-4">
        If you have questions, feedback, or concerns about PixoConvert, you can
        reach us using the information below.
      </p>

      <p className="mb-4">
        Email:{" "}
        <a
          href="mailto:support@pixoconvert.com"
          className="text-blue-600 underline"
        >
          support@pixoconvert.com
        </a>
      </p>

      <p className="mb-4">
        We aim to respond to all inquiries within a reasonable time.
      </p>
    </main>
  );
}
