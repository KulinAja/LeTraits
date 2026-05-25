"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getDictionary, Locale } from "@/lib/dictionary";
import { ingredientsData } from "@/data/ingredientsData";
import { useScentCabinet } from "@/components/ScentCabinetProvider";
import IngredientCard from "@/components/IngredientCard";
import { ArrowRight, ChevronRight, Bookmark } from "lucide-react";

export default function HomePage() {
  const params = useParams();
  const lang = (params?.lang === "en" ? "en" : "id") as Locale;
  const dict = getDictionary(lang);
  const { savedScentSlugs } = useScentCabinet();

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Spread section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
        <div className="lg:col-span-7 space-y-8 pr-4">
          <h1 className="text-6xl md:text-8xl font-serif tracking-tight leading-[0.95] text-white">
            {dict.home.heroTitle.split("\n").map((line, i) => (
              <span key={i} className="block last:italic last:text-[#1591DC] last:font-normal">
                {line}
              </span>
            ))}
          </h1>

          <p className="font-sans text-md md:text-lg text-[#bfc7d2] font-light max-w-xl leading-relaxed">
            {dict.home.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* Action 1 */}
            <Link
              href={`/${lang}/ai-consultant`}
              className="group px-8 py-4 bg-[#1591DC] hover:bg-[#1591DC]/90 text-black border border-transparent font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#1591DC]/20"
            >
              <span>{dict.home.exploreCta}</span>
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Action 2 */}
            <Link
              href={`/${lang}/ingredients`}
              className="px-8 py-4 border border-[#2C5EAD] hover:border-[#1591DC] bg-transparent text-white font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-200"
            >
              <span>{dict.home.browseArchives}</span>
            </Link>
          </div>
        </div>

        {/* Graphic/Atmosphere (5 cols) */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0">
          <div className="relative aspect-[4/5] overflow-hidden border border-[#2C5EAD] bg-[#121414]">
            <img
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80"
              alt="Haute perfume archive specimen"
              className="object-cover w-full h-full filter grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />

            {/* Glowing absolute layer overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f0f] via-transparent to-transparent opacity-90" />

            <div className="absolute bottom-6 left-6 right-6 p-6 rigid-glass backdrop-blur-md">
              <span className="font-mono text-[9px] tracking-widest text-[#1591DC] uppercase block mb-1">
                CURRENT ARCHIVE HIGHLIGHT
              </span>
              <h3 className="font-serif italic text-2xl text-white font-light">
                Bergamot Oil Specimen 042
              </h3>
              <p className="text-xs text-[#bfc7d2] font-mono mt-2 flex justify-between">
                <span>CALABRIA, ITALY</span>
                <span>ACTIVE HARVEST 2026</span>
              </p>
              <Link
                href={`/${lang}/ingredients/bergamot`}
                className="mt-4 font-mono text-[10px] tracking-widest uppercase text-[#4BB8FA] hover:text-white flex items-center gap-1"
              >
                <span>EXAMINE ANATOMY</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Scent Archives Section */}
      <section className="space-y-8 border-t border-[#2C5EAD] pt-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#1591DC] block uppercase mb-1">
              CRAFTED EXCLUSIVITY
            </span>
            <h2 className="text-4xl font-serif text-white tracking-tight leading-none italic">
              {dict.home.featuredTitle}
            </h2>
            <p className="text-sm text-[#bfc7d2] font-sans mt-2">
              {dict.home.featuredSubtitle}
            </p>
          </div>

          <Link
            href={`/${lang}/ingredients`}
            className="font-mono text-xs uppercase tracking-widest text-[#4BB8FA] hover:text-[#1591DC] transition-colors flex items-center gap-1 font-semibold"
          >
            <span>{lang === "en" ? "VIEW ENTIRE ARCHIVE" : "TENTUKAN SEMUA BAHAN"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid Layout (3 Featured items) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ingredientsData.slice(0, 3).map((item, index) => (
            <IngredientCard
              key={item.slug}
              item={item}
              lang={lang}
              index={index}
              viewLabel={dict.home.viewSpecimen}
              archiveLabel={dict.home.archivesLabel}
            />
          ))}
        </div>
      </section>

      {/* Informational Callout: "The Cabinet" section */}
      <section className="rigid-glass p-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="font-mono text-[10px] tracking-widest text-[#1591DC] uppercase block">
            PERSONAL SCENT LIBRARY
          </span>
          <h3 className="font-serif italic text-2xl text-white">Your Cabinet Collection</h3>
          <p className="text-xs text-[#bfc7d2] font-sans max-w-xl">
            &quot;Your cabinet is a living reflection of your olfactory journey. Archive new specimens
            while browsing the database to build your digital library.&quot;
          </p>
        </div>

        {savedScentSlugs.length > 0 ? (
          <div className="flex flex-wrap gap-2 shrink-0 justify-center">
            {savedScentSlugs.map((slug) => {
              const matched = ingredientsData.find((i) => i.slug === slug);
              if (!matched) return null;
              return (
                <Link
                  key={slug}
                  href={`/${lang}/ingredients/${slug}`}
                  className="px-4 py-2 border border-[#1591DC] hover:border-white bg-[#1591DC]/5 hover:bg-[#121414] font-mono text-[10px] uppercase text-white tracking-wider"
                >
                  ✦ {matched.name[lang]}
                </Link>
              );
            })}
          </div>
        ) : (
          <span className="font-mono text-xs text-neutral-500 italic">
            No archived specimens. Explore the directory!
          </span>
        )}
      </section>
    </div>
  );
}
