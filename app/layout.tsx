import "./globals.css";
import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "PixoConvert - Simple Online Image Converter",
  description:
    "Convert JPG, PNG, and WebP images online with PixoConvert. Fast, simple, no account required.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
