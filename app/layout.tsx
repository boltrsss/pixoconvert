import Script from "next/script";
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

      {/* 🔽🔽🔽 就插在這裡（body 之前） 🔽🔽🔽 */}
      <head>
       <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2697453238338970"
     crossorigin="anonymous"></script>
      </head>
      {/* 🔼🔼🔼 插入位置到這裡結束 🔼🔼🔼 */}
      
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
