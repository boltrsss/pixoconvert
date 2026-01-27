export const runtime = "edge";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-sm text-slate-700">
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">
        Privacy Policy
      </h1>

      <p className="mb-4">
        PixoConvert respects your privacy. This Privacy Policy explains how we
        handle information when you use our website.
      </p>

      <h2 className="font-semibold text-slate-900 mt-6 mb-2">
        Information We Collect
      </h2>
      <p className="mb-4">
        We do not require users to create an account or provide personal
        information to use our image conversion tool.
      </p>

      <h2 className="font-semibold text-slate-900 mt-6 mb-2">
        File Processing
      </h2>
      <p className="mb-4">
        Uploaded files are processed only to perform conversion. Files are not
        reviewed manually.
      </p>
      <p className="mb-4">
        Files uploaded to PixoConvert may be temporarily stored to complete the
        conversion and are automatically deleted after processing.
      </p>

      <h2 className="font-semibold text-slate-900 mt-6 mb-2">
        Advertising (Google AdSense)
      </h2>
      <p className="mb-4">
        We use Google AdSense to display advertisements on this website.
      </p>
      <p className="mb-4">
        Google and its partners may use cookies to serve ads based on users&apos;
        previous visits to this website or other websites.
      </p>
      <p className="mb-4">
        Users may opt out of personalized advertising by visiting Google&apos;s Ads
        Settings:{" "}
        <a
          className="underline text-blue-700"
          href="https://adssettings.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://adssettings.google.com
        </a>
      </p>

      <h2 className="font-semibold text-slate-900 mt-6 mb-2">
        Cookies
      </h2>
      <p className="mb-4">
        Cookies may be used for site functionality, analytics, and advertising.
        Cookies do not necessarily contain personally identifiable information.
      </p>

      <h2 className="font-semibold text-slate-900 mt-6 mb-2">
        Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page.
      </p>

      <p className="mt-8 text-xs text-slate-500">
        Last updated: January 2026
      </p>
    </main>
  );
}
