import { Locale } from "@/lib/dictionary";
import { ScentCabinetProvider } from "@/components/ScentCabinetProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;

  return (
    <ScentCabinetProvider>
      <div className="min-h-screen bg-[#0d0f0f] text-[#e2e2e2] flex flex-col font-sans selection:bg-[#1591DC]/30 selection:text-white">
        <Navbar lang={lang} />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 pt-8">
          {children}
        </main>
        <Footer lang={lang} />
      </div>
    </ScentCabinetProvider>
  );
}
