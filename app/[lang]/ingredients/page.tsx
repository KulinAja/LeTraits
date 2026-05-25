"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { getDictionary, Locale } from "@/lib/dictionary";
import { ingredientsData } from "@/data/ingredientsData";
import IngredientCard from "@/components/IngredientCard";
import { Search, Compass, SlidersHorizontal } from "lucide-react";

type Category = "ALL" | "Top Note" | "Heart Note" | "Base Note";

export default function IngredientsPage() {
  const params = useParams();
  const lang = (params?.lang === "en" ? "en" : "id") as Locale;
  const dict = getDictionary(lang);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");

  const filteredIngredients = ingredientsData.filter((ing) => {
    const matchesSearch =
      ing.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
      ing.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ing.origin[lang].toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === "ALL" || ing.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header / Taxon Search */}
      <section className="border-b border-[#2C5EAD] pb-6">
        <span className="font-mono text-[10px] tracking-widest text-[#1591DC] block uppercase mb-1">
          SYSTEMATIC TAXONOMY LIST
        </span>
        <h1 className="text-4xl md:text-5xl font-serif italic text-white leading-none">
          {dict.directory.title}
        </h1>
        <p className="text-sm text-[#bfc7d2] mt-2">{dict.directory.subtitle}</p>
      </section>

      {/* Filter Bar / Controls */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Search input (8 columns) */}
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.directory.searchPlaceholder}
            className="w-full bg-[#121414] border border-[#2C5EAD] focus:border-[#1591DC] rounded-none py-3 pl-12 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none transition-all font-sans"
          />
        </div>

        {/* Quick Categories dropdown (4 columns) */}
        <div className="md:col-span-4 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#1591DC]" />
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value as Category)}
            className="flex-1 bg-[#121414] border border-[#2C5EAD] focus:border-[#1591DC] rounded-none py-3 px-3 text-xs uppercase tracking-widest text-[#bfc7d2] focus:outline-none cursor-pointer font-mono"
          >
            <option value="ALL">{dict.directory.all}</option>
            <option value="Top Note">{dict.directory.top}</option>
            <option value="Heart Note">{dict.directory.heart}</option>
            <option value="Base Note">{dict.directory.base}</option>
          </select>
        </div>
      </section>

      {/* Category tabs toggle indicators */}
      <div className="flex flex-wrap gap-2 border-b border-[#2C5EAD]/40 pb-4">
        {(["ALL", "Top Note", "Heart Note", "Base Note"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase cursor-pointer border ${
              activeCategory === cat
                ? "bg-[#1591DC]/10 border-[#1591DC] text-[#1591DC] font-bold"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            {cat === "ALL"
              ? dict.directory.all
              : cat === "Top Note"
              ? dict.directory.top
              : cat === "Heart Note"
              ? dict.directory.heart
              : dict.directory.base}
          </button>
        ))}
      </div>

      {/* Ingredients Grid list */}
      {filteredIngredients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIngredients.map((item, index) => (
            <IngredientCard
              key={item.slug}
              item={item}
              lang={lang}
              index={index}
              viewLabel={dict.directory.viewDetails}
              originLabel={dict.directory.origin}
              showStrength={true}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rigid-glass max-w-xl mx-auto space-y-3">
          <Compass className="w-8 h-8 text-[#2C5EAD] mx-auto animate-pulse" />
          <p className="font-mono text-xs uppercase tracking-widest text-[#bfc7d2]">
            {dict.directory.noResults}
          </p>
        </div>
      )}
    </div>
  );
}
