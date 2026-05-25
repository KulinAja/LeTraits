"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface ScentCabinetContextType {
  savedScentSlugs: string[];
  toggleSaveScent: (slug: string, e?: React.MouseEvent) => void;
}

const ScentCabinetContext = createContext<ScentCabinetContextType>({
  savedScentSlugs: [],
  toggleSaveScent: () => {},
});

export function useScentCabinet() {
  return useContext(ScentCabinetContext);
}

export function ScentCabinetProvider({ children }: { children: React.ReactNode }) {
  const [savedScentSlugs, setSavedScentSlugs] = useState<string[]>(["bergamot", "patchouli"]);

  const toggleSaveScent = useCallback((slug: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedScentSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  return (
    <ScentCabinetContext.Provider value={{ savedScentSlugs, toggleSaveScent }}>
      {children}
    </ScentCabinetContext.Provider>
  );
}
