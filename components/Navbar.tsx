"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary, Locale } from "@/lib/dictionary";
import { useScentCabinet } from "@/components/ScentCabinetProvider";
import { Bookmark, Menu, X } from "lucide-react";

export default function Navbar({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const pathname = usePathname();
  const { savedScentSlugs } = useScentCabinet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const otherLang: Locale = lang === "id" ? "en" : "id";

  // Get the path after /[lang]/ to build the alternate locale URL
  const pathWithoutLang = pathname.replace(/^\/(en|id)/, "") || "/";
  const switchLangHref = `/${otherLang}${pathWithoutLang}`;

  const isHome = pathname === `/${lang}`;
  const isIngredients = pathname.startsWith(`/${lang}/ingredients`);
  const isConsultant = pathname.startsWith(`/${lang}/ai-consultant`);

  return (
    <nav id="global-navbar" className="border-b border-[#2C5EAD] sticky top-0 bg-[#0d0f0f]/90 backdrop-blur-md z-40">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo & Headline */}
        <Link href={`/${lang}`} className="flex flex-col">
          <span className="font-serif italic text-2xl tracking-tighter text-white font-normal hover:text-[#1591DC] transition-colors">
            {dict.navbar.brand}
          </span>
          <span className="font-mono text-[8px] tracking-[0.2em] text-[#bfc7d2] -mt-1 uppercase">
            {dict.navbar.tagline}
          </span>
        </Link>

        {/* Desktop Navigation links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href={`/${lang}`}
            className={`font-mono text-[11px] uppercase tracking-widest hover:text-[#1591DC] transition-colors ${
              isHome ? "text-[#1591DC] border-b border-[#1591DC]" : "text-[#bfc7d2]"
            }`}
          >
            {dict.navbar.home}
          </Link>
          <Link
            href={`/${lang}/ingredients`}
            className={`font-mono text-[11px] uppercase tracking-widest hover:text-[#1591DC] transition-colors ${
              isIngredients ? "text-[#1591DC] border-b border-[#1591DC]" : "text-[#bfc7d2]"
            }`}
          >
            {dict.navbar.ingredients}
          </Link>
          <Link
            href={`/${lang}/ai-consultant`}
            className={`font-mono text-[11px] uppercase tracking-widest hover:text-[#1591DC] transition-colors ${
              isConsultant ? "text-[#1591DC] border-b border-[#1591DC]" : "text-[#bfc7d2]"
            }`}
          >
            {dict.navbar.aiConsultant}
          </Link>
        </div>

        {/* Language Toggle and Saved indicator */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Saved Cabinet Indicator */}
          {savedScentSlugs.length > 0 && (
            <Link
              href={`/${lang}/ingredients`}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#1591DC]/10 border border-[#2C5EAD] rounded-none cursor-pointer hover:border-[#1591DC] transition-colors"
              title={`${savedScentSlugs.length} saved scent specimens`}
            >
              <Bookmark className="w-3.5 h-3.5 text-[#1591DC] fill-[#1591DC]" />
              <span className="font-mono text-[10px] text-white font-bold">{savedScentSlugs.length} SPECIMENS</span>
            </Link>
          )}

          {/* Language Switch Buttons */}
          <div className="border border-[#2C5EAD] bg-[#121414] p-0.5 flex">
            <Link
              href={`/id${pathWithoutLang}`}
              className={`px-3 py-1 font-mono text-[10px] uppercase hover:text-white transition-colors ${
                lang === "id" ? "bg-[#1591DC] text-white font-bold" : "text-[#bfc7d2]"
              }`}
            >
              ID
            </Link>
            <Link
              href={`/en${pathWithoutLang}`}
              className={`px-3 py-1 font-mono text-[10px] uppercase hover:text-white transition-colors ${
                lang === "en" ? "bg-[#1591DC] text-white font-bold" : "text-[#bfc7d2]"
              }`}
            >
              EN
            </Link>
          </div>
        </div>

        {/* Mobile menu triggers */}
        <div className="md:hidden flex items-center space-x-3">
          {savedScentSlugs.length > 0 && (
            <Link
              href={`/${lang}/ingredients`}
              className="p-1.5 bg-[#1591DC]/10 border border-[#2C5EAD] text-[#1591DC]"
            >
              <Bookmark className="w-4.5 h-4.5 fill-current" />
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-[#2C5EAD] text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121414] border-b border-[#2C5EAD] absolute left-0 w-full p-6 space-y-6 z-50">
          <div className="flex flex-col space-y-4">
            <Link
              href={`/${lang}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-left font-sans text-lg tracking-wide py-2 text-white border-b border-neutral-800"
            >
              {dict.navbar.home}
            </Link>
            <Link
              href={`/${lang}/ingredients`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-left font-sans text-lg tracking-wide py-2 text-white border-b border-neutral-800"
            >
              {dict.navbar.ingredients}
            </Link>
            <Link
              href={`/${lang}/ai-consultant`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-left font-sans text-lg tracking-wide py-2 text-white border-b border-neutral-800"
            >
              {dict.navbar.aiConsultant}
            </Link>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="font-mono text-xs text-[#bfc7d2] uppercase">{dict.navbar.language}</span>
            <div className="border border-[#2C5EAD] bg-black p-0.5 flex">
              <Link
                href={`/id${pathWithoutLang}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-1.5 font-mono text-[11px] ${
                  lang === "id" ? "bg-[#1591DC] text-white font-bold" : "text-[#bfc7d2]"
                }`}
              >
                Indonesian
              </Link>
              <Link
                href={`/en${pathWithoutLang}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-1.5 font-mono text-[11px] ${
                  lang === "en" ? "bg-[#1591DC] text-white font-bold" : "text-[#bfc7d2]"
                }`}
              >
                English
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
