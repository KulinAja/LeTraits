import { Locale } from "@/lib/dictionary";

export default function Footer({ lang }: { lang: Locale }) {
  return (
    <footer className="max-w-7xl w-full mx-auto px-6 mt-16 pt-8 border-t border-[#2C5EAD]/40 text-center font-mono text-[9px] text-neutral-500 space-y-2 uppercase leading-relaxed pb-12">
      <div>
        © 2026 LETRAITS. FINEST PERFUMERY DATABASE. ALL RIGHTS RESERVED.
      </div>
      <div>
        DESIGNED FOR SENSORY PURITY. EXPERT AI INTELLIGENCE VIA PORTAL 3000.
      </div>
    </footer>
  );
}
