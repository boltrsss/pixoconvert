export const runtime = "edge";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-sm text-slate-700">
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">
        Terms and Conditions
      </h1>
      <p className="mb-6 text-xs text-slate-500">
        Last updated: January 27, 2026
      </p>

      <p className="mb-4">
        Please read these Terms and Conditions carefully before using Our Service.
      </p>

      <h2 className="font-semibold text-slate-900 mt-6 mb-2">
        Interpretation and Definitions
      </h2>

      <h3 className="font-medium text-slate-800 mt-4 mb-1">
        Interpretation
      </h3>
      <p className="mb-4">
        The words whose initial letters are capitalized have meanings defined
        under the following conditions. The following definitions shall have the
        same meaning regardless of whether they appear in singular or plural.
      </p>

      <h3 className="font-medium text-slate-800 mt-4 mb-1">
        Definitions
      </h3>
      <p className="mb-3">For the purposes of these Terms and Conditions:</p>

      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>
          <strong>Company</strong> refers to PIH Digital INC, 71–75 Shelton Street,
          Covent Garden, London, WC2H 9JQ, United Kingdom.
        </li>
        <li>
          <strong>Service</strong> refers to the Website.
        </li>
        <li>
          <strong>Website</strong> refers to PixoConvert, accessible from{" "}
          <a
            href="https://www.pixoconvert.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://www.pixoconvert.com
          </a>
          .
        </li>
        <li>
          <strong>You</strong> means the individual accessing or using the
          Service.
        </li>
      </ul>

      <h2 className="font-semibold text-slate-900 mt-6 mb-2">
        Acknowledgment
      </h2>
      <p className="mb-4">
        These Terms and Conditions govern the use of this Service and form the
        agreement between You and the Company.
      </p>
      <p className="mb-4">
        By accessing or using the Service, You agree to be bound by these Terms.
        If You do not agree with any part of the Terms, You may not access the
        Service.
      </p>
      <p className="mb-4">
        You represent that You have the legal capacity to enter into these Terms
        and Conditions under applicable law.
      </p>
      <p className="mb-4">
        Your use of the Service is also subject to Our Privacy Policy. Please
        review it carefully.
      </p>

      {/* 🔑 User Uploaded Files */}
      <h2 className="font-semibold text-slate-900 mt-6 mb-2">
        User Content and Uploaded Files
      </h2>
      <p className="mb-4">
        The Service allows You to upload image files solely for the purpose of
        converting them to another supported format.
      </p>
      <p className="mb-4">
        By uploading files, You confirm that You own the rights to the content or
        have obtained all necessary permissions. You agree not to upload any
        unlawful, infringing, harmful, or otherwise prohibited content.
      </p>
      <p className="mb-4">
        The Company does not claim ownership of any uploaded files. Files are
        processed automatically and are not reviewed manually.
      </p>
      <p className="mb-4">
        Uploaded files are temporarily stored only as necessary to perform the
        requested conversion and are automatically deleted after processing.
      </p>
      <p className="mb-4">
        You are solely responsible for the content You upload and any
        consequences arising from such uploads.
      </p>

      <h2 className="font-semibold text-slate-900 mt-6 mb-2">
        Prohibited Uses
      </h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Violates any applicable law or regulation</li>
        <li>Infringes intellectual property rights</li>
        <li>Contains malware, viruses, or harmful code</li>
        <li>Is abusive, obscene, or otherwise objectionable</li>
      </ul>
      <p className="mb-4">
        The Company reserves the right to restrict or terminate access if these
        Terms are violated.
      </p>

      <h2 className="font-semibold text-slate-900 mt-6 mb-2">
        Limitation of Liability
      </h2>
      <p className="mb-4">
        The Service is provided on an &quot;AS IS&quot; and &quot;AS
        AVAILABLE&quot; basis. To the maximum extent permitted by law, the
        Company shall not be liable for any indirect or consequential damages.
      </p>

      <h2 className="font-semibold text-slate-900 mt-6 mb-2">
        Governing Law
      </h2>
      <p className="mb-4">
        These Terms shall be governed by the laws of the United Kingdom.
      </p>

      <h2 className="font-semibold text-slate-900 mt-6 mb-2">
        Changes to These Terms
      </h2>
      <p className="mb-4">
        We may update these Terms from time to time. Continued use of the Service
        constitutes acceptance of the revised Terms.
      </p>

      <h2 className="font-semibold text-slate-900 mt-6 mb-2">
        Contact Us
      </h2>
      <p className="mb-4">
        If you have any questions about these Terms, please contact us at{" "}
        <a
          href="mailto:support@pixoconvert.com"
          className="text-blue-600 underline"
        >
          support@pixoconvert.com
        </a>
        .
      </p>
    </main>
  );
}
