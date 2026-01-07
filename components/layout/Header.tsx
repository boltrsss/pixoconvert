"use client";

import React from "react";
import { useLang } from "@/context/LanguageContext";

export default function Header() {
  const { lang, setLang } = useLang();

  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
            P
          </div>
          <div className="font-semibold text-slate-900">
            Pixo<span className="text-blue-600">Convert</span>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 rounded-full text-xs border ${
              lang === "en"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLang("zh")}
            className={`px-3 py-1.5 rounded-full text-xs border ${
              lang === "zh"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            中文
          </button>
        </div>
      </div>
    </header>
  );
}
