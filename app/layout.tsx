import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LeTraits | Haute Fragrance Archive & AI Consultant",
  description:
    "Explore a curated digital library of raw perfumery materials, historical extractions, and local botanical treasures. Consult our AI Fragrance Expert for personalized scent recommendations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} bg-[#0d0f0f] text-[#e2e2e2] antialiased selection:bg-[#1591DC]/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
