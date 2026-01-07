import "./globals.css";
import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "PixoConvert - Simple Online Image Converter",
  description:
    "Convert JPG, PNG, and WebP images online with PixoConvert. Fast, simple, and no account required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
