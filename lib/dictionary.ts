// Dictionary mapping for Indonesian (ID) and English (EN)

export const dictionaries = {
  en: {
    navbar: {
      brand: "LeTraits",
      tagline: "HAUTE FRAGRANCE ARCHIVE",
      home: "Home",
      ingredients: "Ingredients",
      aiConsultant: "AI Consultant",
      language: "Language"
    },
    home: {
      heroTitle: "Discover the\nAnatomy of\nScent",
      heroSubtitle: "Explore our curated digital library of raw perfumery materials, historical extractions, and local botanical treasures.",
      exploreCta: "Consult AI Expert",
      browseArchives: "Browse Scent Archives",
      featuredTitle: "Featured Ingredients",
      featuredSubtitle: "Scent specimens of outstanding character and cultural legacy.",
      viewSpecimen: "EXPLORE SPECIMEN",
      archivesLabel: "ARCHIVE NO."
    },
    directory: {
      title: "Olfactory Specimens",
      subtitle: "A modern taxonomic catalogue of exquisite fragrance ingredients.",
      searchPlaceholder: "SEARCH SPECIMENS...",
      all: "ALL",
      top: "TOP NOTE",
      heart: "HEART NOTE",
      base: "BASE NOTE",
      origin: "Origin",
      viewDetails: "Explore Specimen",
      noResults: "No olfactory specimens found matching your search."
    },
    details: {
      scientificName: "SCIENTIFIC TAXONOMY",
      category: "CLASSIFICATION",
      origin: "BOTANICAL ORIGIN",
      profile: "OLFACTORY PROFILE",
      extraction: "EXTRACTION METHOD",
      scentStrength: "SCENT STRENGTH",
      volatility: "VOLATILITY RATE",
      scientificDefinition: "SCIENTIFIC PROFILE",
      originHistory: "ORIGIN & HISTORY",
      growthSource: "BOTANICAL SOURCE",
      backLink: "← Back to Directory",
      fragranceMatches: "Fragrance Matches",
      globalIcons: "GLOBAL ICONS",
      localGems: "INDONESIAN GEMS",
      recommendationsTitle: "ARCHIVE RECOMMENDATIONS",
      quickFacts: "TECHNICAL SPECS",
      quote: "Bergamot is not just a smell; it is the light that illuminates the architecture of a fragrance."
    },
    consultant: {
      title: "AI Fragrance Consultant",
      subtitle: "Conversational expert in olfactory science, historical extractions, and curated recommendations.",
      quickSuggestions: "QUICK ARCHIVE QUERIES",
      inputPlaceholder: "Describe a memory, a scent profile, or ask for a pairing...",
      send: "SEND",
      thinking: "Analyzing notes...",
      introMessage: "Welcome to LeTraits. I am your expert AI Fragrance Consultant. Ask me about scent profiles, historical lineages, or local Indonesian gems."
    }
  },
  id: {
    navbar: {
      brand: "LeTraits",
      tagline: "ARSIP WEWANGIAN MEWAH",
      home: "Beranda",
      ingredients: "Daftar Bahan",
      aiConsultant: "AI Konsultan",
      language: "Bahasa"
    },
    home: {
      heroTitle: "Temukan\nAnatomi\nAroma",
      heroSubtitle: "Jelajahi perpustakaan digital pilihan dari bahan wewangian mentah, ekstraksi bersejarah, dan harta botani lokal.",
      exploreCta: "Konsultasi Ahli AI",
      browseArchives: "Telusuri Arsip Aroma",
      featuredTitle: "Bahan Unggulan",
      featuredSubtitle: "Spesimen aroma dengan karakter luar biasa dan warisan budaya tinggi.",
      viewSpecimen: "JELAJAHI MATERI",
      archivesLabel: "ARSIP NO."
    },
    directory: {
      title: "Spesimen Olfaktori",
      subtitle: "Katalog taksonomi modern dari bahan-bahan wewangian berkualitas tinggi.",
      searchPlaceholder: "CARI SPESIMEN...",
      all: "SEMUA",
      top: "TOP NOTE",
      heart: "HEART NOTE",
      base: "BASE NOTE",
      origin: "Asal",
      viewDetails: "Jelajahi Spesimen",
      noResults: "Tidak ada spesimen aroma yang cocok dengan pencarian Anda."
    },
    details: {
      scientificName: "TAKSONOMI ILMIAH",
      category: "KLASIFIKASI",
      origin: "ASAL USUL BOTANI",
      profile: "PROFIL OLFAKTORI",
      extraction: "METODE EKSTRAKSI",
      scentStrength: "KEKUATAN AROMA",
      volatility: "TINGKAT PENGUAPAN",
      scientificDefinition: "PROFIL ILMIAH",
      originHistory: "SEJARAH & ASAL USUL",
      growthSource: "SUMBER BOTANI",
      backLink: "← Kembali ke Katalog",
      fragranceMatches: "Paduan Wewangian",
      globalIcons: "IKON REKOMENDASI GLOBAL",
      localGems: "REKOMENDASI LOKAL INDONESIA",
      recommendationsTitle: "REKOMENDASI ARSIP",
      quickFacts: "SPESIFIKASI TEKNIS",
      quote: "Bergamot bukan sekadar aroma; ia adalah cahaya yang menyinari arsitektur sebuah parfum."
    },
    consultant: {
      title: "AI Konsultan Aroma",
      subtitle: "Pakar percakapan dalam ilmu olfaktori, ekstraksi sejarah, dan kurasi rekomendasi parfum.",
      quickSuggestions: "PERTANYAAN CEPAT ARSIP",
      inputPlaceholder: "Gambarkan suatu kenangan, profil aroma, atau tanyakan perpaduan...",
      send: "KIRIM",
      thinking: "Menganalisis aroma...",
      introMessage: "Selamat datang di LeTraits. Saya adalah Konsultan Parfum AI Anda. Tanyakan saya tentang profil aroma, latar belakang sejarah, atau parfum lokal Indonesia."
    }
  }
};

export type Locale = "en" | "id";

export const getDictionary = (locale: Locale) => {
  return dictionaries[locale] || dictionaries.en;
};
