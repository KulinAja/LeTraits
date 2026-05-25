"use client";

import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/dictionary";
import { Ingredient } from "@/data/ingredientsData";
import { useScentCabinet } from "@/components/ScentCabinetProvider";
import { Bookmark } from "lucide-react";

interface IngredientCardProps {
  item: Ingredient;
  lang: Locale;
  index: number;
  viewLabel: string;
  originLabel?: string;
  archiveLabel?: string;
  showStrength?: boolean;
}

export default function IngredientCard({
  item,
  lang,
  index,
  viewLabel,
  originLabel,
  archiveLabel,
  showStrength = false,
}: IngredientCardProps) {
  const { savedScentSlugs, toggleSaveScent } = useScentCabinet();

  return (
    <Link
      href={`/${lang}/ingredients/${item.slug}`}
      className="rigid-glass-interactive cursor-pointer flex flex-col group overflow-hidden"
    >
      <div className="relative aspect-[3/2] overflow-hidden border-b border-[#2C5EAD]/40">
        <img
          src={item.image}
          alt={item.name[lang]}
          className="object-cover w-full h-full filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-750"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-[#121414]/95 border border-[#1591DC]/40 px-2.5 py-1 font-mono text-[9px] text-[#1591DC] uppercase tracking-wider">
          {item.category}
        </div>

        {/* Scent Bookmark button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSaveScent(item.slug, e);
          }}
          className="absolute top-4 right-4 bg-[#121414]/90 p-1.5 border border-[#2C5EAD] hover:border-[#1591DC] text-[#bfc7d2]"
          title="Archive specimen to cabinet"
        >
          <Bookmark
            className={`w-3.5 h-3.5 ${
              savedScentSlugs.includes(item.slug) ? "text-[#1591DC] fill-[#1591DC]" : ""
            }`}
          />
        </button>
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase">
              {archiveLabel || "SPEC NO."} {100 + index}
            </span>
            {showStrength && (
              <span className="font-mono text-[9px] text-[#1591DC] tracking-widest uppercase">
                ★ STRENGTH: {item.scentStrength}/5
              </span>
            )}
          </div>
          <h3 className="font-serif italic text-2xl text-white group-hover:text-[#1591DC] transition-colors leading-none">
            {item.name[lang]}
          </h3>
          <p className="font-mono text-[10px] text-neutral-400 uppercase italic">
            {item.scientificName}
          </p>
          <p className="text-xs text-[#bfc7d2] leading-relaxed line-clamp-2 pt-1">
            {item.definition[lang]}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-[#2C5EAD]/20 flex justify-between items-center text-[10px] font-mono">
          <span className="text-neutral-500 uppercase">
            {originLabel || "ORIGIN"}: <strong className="text-white font-normal">{item.origin[lang]}</strong>
          </span>
          <span className="text-[#4BB8FA] uppercase tracking-widest flex items-center group-hover:translate-x-1.5 transition-transform duration-300">
            {viewLabel} →
          </span>
        </div>
      </div>
    </Link>
  );
}
