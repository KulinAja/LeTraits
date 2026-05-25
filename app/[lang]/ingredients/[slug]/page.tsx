"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ingredientsData } from "@/data/ingredientsData";
import { getDictionary, Locale } from "@/lib/dictionary";
import { useScentCabinet } from "@/components/ScentCabinetProvider";
import {
  Sparkles,
  MapPin,
  Award,
  BookOpen,
  Activity,
  Compass,
  ArrowLeft,
  Bookmark,
} from "lucide-react";

// Scent glossary database for UI tooltips
const technicalGlossary: Record<string, Record<Locale, string>> = {
  "top note": {
    en: "The opening scent that registers first and evaporates within 15-30 minutes.",
    id: "Aroma pembuka yang tercium pertama kali dan menguap dalam waktu 15-30 menit pertama.",
  },
  volatile: {
    en: "Compounds that vaporize easily at room temperature to disperse fragrance rapidly.",
    id: "Senyawa yang sangat mudah menguap pada suhu ruang untuk menyebarkan keharuman dengan cepat.",
  },
  sillage: {
    en: "The trail of perfume left behind in the air when someone moves.",
    id: "Jejak aroma wewangian yang tertinggal di udara ketika seseorang bergerak.",
  },
  "base note": {
    en: "Heavy, enduring ingredients that anchor a perfume and persist for many hours.",
    id: "Bahan berbobot berat dan tahan lama yang mendasari parfum serta bertahan hingga berjam-jam.",
  },
  fixative: {
    en: "An aromatic agent that acts as an anchor to slow the evaporation of lighter notes.",
    id: "Zat aromatik pengikat yang memperlambat laju penguapan bahan pewangi yang lebih ringan.",
  },
  accords: {
    en: "A unified, synergistic blend of different raw materials representing a distinct aroma.",
    id: "Kombinasi harmonis dari beberapa bahan wewangian dasar yang menciptakan satu aroma khas baru.",
  },
  absolute: {
    en: "An ultra-concentrated, highly aromatic oil extracted through solvents, not steam.",
    id: "Minyak aromatik murni dengan konsentrasi sangat tinggi yang diekstraksi menggunakan pelarutan kimia.",
  },
  "heart note": {
    en: "The core character of a scent that emerges as top notes fade, lasting 2 to 4 hours.",
    id: "Karakter inti keharuman yang muncul setelah top note memudar, bertahan sekitar 2 hingga 4 jam.",
  },
};

export default function IngredientPage() {
  const params = useParams();
  const lang = (params?.lang === "en" ? "en" : "id") as Locale;
  const slug = params?.slug as string;
  const dict = getDictionary(lang);
  const { savedScentSlugs, toggleSaveScent } = useScentCabinet();

  const ingredient = ingredientsData.find((ing) => ing.slug === slug);

  if (!ingredient) {
    return (
      <div className="p-12 text-center rigid-glass max-w-xl mx-auto space-y-3 animate-fade-in">
        <Compass className="w-8 h-8 text-[#2C5EAD] mx-auto animate-pulse" />
        <p className="font-mono text-xs uppercase tracking-widest text-[#bfc7d2]">
          Specimen not found in the archive.
        </p>
        <Link
          href={`/${lang}/ingredients`}
          className="font-mono text-xs uppercase tracking-widest text-[#1591DC] hover:text-white transition-colors"
        >
          ← Return to Directory
        </Link>
      </div>
    );
  }

  // Helper to format definitions with interactive tooltips
  const renderDefinitionWithTooltips = (text: string) => {
    const words = text.split(/(\s+)/);
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();

      let matchedKey = "";
      if (technicalGlossary[cleanWord]) matchedKey = cleanWord;
      else if (cleanWord.endsWith("s") && technicalGlossary[cleanWord.slice(0, -1)]) {
        matchedKey = cleanWord.slice(0, -1);
      } else if (cleanWord === "fiksatif" || cleanWord === "fiksatifnya") {
        matchedKey = "fixative";
      } else if (cleanWord === "asiri") {
        matchedKey = "volatile";
      }

      if (matchedKey) {
        const tooltipText = technicalGlossary[matchedKey][lang];
        return (
          <span
            key={index}
            className="group relative inline-block cursor-help border-b border-[#1591DC] border-dashed text-white font-medium hover:text-[#4BB8FA] transition-colors"
          >
            {word}
            <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 scale-75 rounded-none border border-[#2C5EAD] bg-[#121414] p-3 text-xs leading-relaxed text-[#bfc7d2] opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:scale-100 group-hover:pointer-events-auto group-hover:opacity-100">
              <strong className="block mb-1 text-[#1591DC] uppercase tracking-wider text-[10px]">
                GLOSSARY
              </strong>
              {tooltipText}
            </span>
          </span>
        );
      }
      return <React.Fragment key={index}>{word}</React.Fragment>;
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back to list button */}
      <Link
        href={`/${lang}/ingredients`}
        className="font-mono text-xs uppercase tracking-widest text-[#bfc7d2] hover:text-[#1591DC] transition-colors flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{dict.details.backLink}</span>
      </Link>

      {/* Layout Grid */}
      <article className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-[#2C5EAD] pt-8">
        {/* Left Column (4 Cols): Image and Statistics Specs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative aspect-[3/4] overflow-hidden border border-[#2C5EAD] bg-[#121414]">
            <img
              src={ingredient.image}
              alt={ingredient.name[lang]}
              className="object-cover w-full h-full filter grayscale contrast-125 hover:grayscale-0 transition-all duration-750"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-[#121414]/95 border border-[#1591DC]/40 px-2.5 py-1 font-mono text-[9px] text-[#1591DC] uppercase tracking-wider">
              {ingredient.category}
            </div>

            {/* Floating Toggle Bookmark button */}
            <button
              onClick={(e) => toggleSaveScent(ingredient.slug, e)}
              className="absolute top-4 right-4 bg-[#121414]/90 p-2 border border-[#2C5EAD] hover:border-[#1591DC] text-[#bfc7d2]"
              title="Archive specimen to cabinet"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  savedScentSlugs.includes(ingredient.slug)
                    ? "text-[#1591DC] fill-[#1591DC]"
                    : ""
                }`}
              />
            </button>
          </div>

          {/* Scent Performance Data Card */}
          <div className="rigid-glass p-6 space-y-6">
            <span className="font-mono text-[9px] tracking-widest text-[#1591DC] uppercase block">
              {dict.details.quickFacts}
            </span>

            <div className="space-y-4">
              {/* Scent Strength */}
              <div>
                <div className="flex justify-between items-center text-xs text-[#bfc7d2] mb-1 font-mono">
                  <span>{dict.details.scentStrength}</span>
                  <span>{ingredient.scentStrength}/5</span>
                </div>
                <div className="h-1.5 w-full bg-black/60 border border-[#2C5EAD]/50">
                  <div
                    className="h-full bg-gradient-to-r from-[#2C5EAD] to-[#1591DC]"
                    style={{ width: `${(ingredient.scentStrength / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Scent Volatility */}
              <div>
                <div className="flex justify-between items-center text-xs text-[#bfc7d2] mb-1 font-mono">
                  <span>{dict.details.volatility}</span>
                  <span>{ingredient.volatility}/5</span>
                </div>
                <div className="h-1.5 w-full bg-black/60 border border-[#2C5EAD]/50">
                  <div
                    className="h-full bg-gradient-to-r from-[#2C5EAD] to-[#1591DC]"
                    style={{ width: `${(ingredient.volatility / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Physical parameters list */}
            <div className="pt-4 mt-2 border-t border-[#2C5EAD]/30 space-y-3 font-mono text-[10px] leading-relaxed">
              <div className="flex justify-between gap-4 text-neutral-400">
                <span className="uppercase text-neutral-500">{dict.details.extraction}</span>
                <span className="text-right text-white">{ingredient.extraction[lang]}</span>
              </div>

              <div className="flex justify-between gap-4 text-neutral-400 pt-2 border-t border-[#2C5EAD]/10">
                <span className="uppercase text-neutral-500">{dict.details.growthSource}</span>
                <span className="text-right text-white font-sans">
                  {ingredient.growthSource[lang]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (8 Cols): Title, Definition and recommendation lists */}
        <div className="lg:col-span-8 space-y-12">
          {/* Header */}
          <header className="border-b border-[#2C5EAD]/30 pb-6">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-white font-normal italic mb-1">
              {ingredient.name[lang]}
            </h1>
            <p className="font-mono text-xs tracking-widest text-[#1591DC] uppercase flex items-center gap-2">
              <Compass className="w-4 h-4" />
              {ingredient.scientificName}
            </p>
          </header>

          {/* Definition */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono tracking-widest text-[#1591DC] uppercase flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#1591DC]" />
              {dict.details.scientificDefinition}
            </h2>
            <div className="text-lg md:text-xl font-light leading-relaxed text-[#e2e2e2] max-w-3xl">
              {renderDefinitionWithTooltips(ingredient.definition[lang])}
            </div>
          </section>

          {/* History & Origin */}
          <section className="space-y-4 border-t border-[#2C5EAD]/30 pt-8">
            <h2 className="text-xs font-mono tracking-widest text-[#1591DC] uppercase flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {dict.details.originHistory}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 text-sm text-[#bfc7d2] leading-relaxed space-y-4">
                <p>{ingredient.history[lang]}</p>
              </div>

              {/* Geographic Callout */}
              <div className="rigid-glass p-6 flex flex-col justify-between">
                <div>
                  <MapPin className="w-5 h-5 text-[#1591DC] mb-3" />
                  <span className="block font-mono text-[9px] tracking-widest text-neutral-500 uppercase mb-1">
                    {dict.details.origin}
                  </span>
                  <p className="text-md text-white font-serif italic">
                    {ingredient.origin[lang]}
                  </p>
                </div>
                <div className="mt-4 border-t border-[#2C5EAD]/20 pt-4 font-mono text-[9px] text-[#4BB8FA] uppercase tracking-widest">
                  CURATED ANCESTRIES
                </div>
              </div>
            </div>
          </section>

          {/* Scent Quote block */}
          {ingredient.slug === "bergamot" && (
            <div className="border-l border-[#1591DC] pl-6 py-2 italic font-serif text-neutral-400 text-md">
              &quot;{dict.details.quote}&quot;
            </div>
          )}

          {/* Fragrance Matches Lists (Global vs Indon Gems) */}
          <section className="space-y-6 border-t border-[#2C5EAD]/30 pt-8">
            <h2 className="text-xs font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-2">
              <Award className="w-4 h-4 text-[#1591DC]" />
              {dict.details.recommendationsTitle || dict.details.fragranceMatches}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Global Icons */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-[#4BB8FA] tracking-widest uppercase flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  {dict.details.globalIcons}
                </h3>

                <div className="divide-y divide-[#2C5EAD]/30 border-y border-[#2C5EAD]/35">
                  {ingredient.fragranceMatches.globalIcons.map((item, i) => (
                    <div
                      key={i}
                      className="py-3 flex justify-between items-center group/item hover:bg-[#1591DC]/5 transition-all duration-150 px-2 select-none"
                    >
                      <span className="font-serif text-white group-hover/item:text-[#4BB8FA] transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        {item.brand}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Gems */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-[#1591DC] tracking-widest uppercase flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  {dict.details.localGems}
                </h3>

                <div className="divide-y divide-[#2C5EAD]/30 border-y border-[#2C5EAD]/35">
                  {ingredient.fragranceMatches.localGems.map((item, i) => (
                    <div
                      key={i}
                      className="py-3 flex justify-between items-center group/item hover:bg-[#1591DC]/5 transition-all duration-150 px-2 select-none"
                    >
                      <span className="font-serif text-white group-hover/item:text-[#1591DC] transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        {item.brand}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
