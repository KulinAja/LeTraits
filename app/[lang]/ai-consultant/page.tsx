"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { getDictionary, Locale } from "@/lib/dictionary";
import { Send, Bot, User, Compass, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AiConsultantPage() {
  const params = useParams();
  const lang = (params?.lang === "en" ? "en" : "id") as Locale;
  const dict = getDictionary(lang);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "assistant",
      content: dict.consultant.introMessage,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickQueries = {
    en: [
      {
        display: "Fresh Summer Accords",
        prompt:
          "Recommend a fresh, high-sillage summer fragrance listing both luxury international icons and Indonesian local gems.",
      },
      {
        display: "EDP vs EDT Hierarchy",
        prompt:
          "Provide an expert chemical and sillage-based explanation of the structural differences between Eau de Parfum (EDP) and Eau de Toilette (EDT).",
      },
      {
        display: "Patchouli Botanical Pairings",
        prompt:
          "What detailed olfactory notes pair best with Patchouli (Indonesian Nilam)? Create a structured table of accords.",
      },
      {
        display: "Indonesian Woody Treasures",
        prompt:
          "Identify and describe the finest local Indonesian woody fragrances featuring Gaharu or Santalum.",
      },
    ],
    id: [
      {
        display: "Aroma Segar Musim Panas",
        prompt:
          "Rekomendasikan parfum musim panas yang segar dengan daya pancar (sillage) tinggi, daftarkan pilihan mewah internasional dan lokal Indonesia.",
      },
      {
        display: "Hierarki EDP vs EDT",
        prompt:
          "Berikan penjelasan ahli mengenai perbedaan kimiawi dan struktur penguapan antara Eau de Parfum (EDP) dan Eau de Toilette (EDT).",
      },
      {
        display: "Paduan Botani Nilam",
        prompt:
          "Aroma olfaktori apa saja yang paling harmonis dipadukan dengan Nilam (Patchouli)? Buat tabel komposisi accord.",
      },
      {
        display: "Arsip Kayu Lokal Indonesia",
        prompt:
          "Identifikasi dan jelaskan parfum lokal Indonesia terbaik berkarakter kayu (wood) dengan kandungan Gaharu atau Cendana.",
      },
    ],
  };

  const activeSuggestions = quickQueries[lang] || quickQueries.en;

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = Date.now().toString();
    const newUserMessage: Message = {
      id: userMsgId,
      role: "user",
      content: textToSend.trim(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsLoading(true);

    const assistantMsgId = (Date.now() + 1).toString();
    const newAssistantMessage: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, newAssistantMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, newUserMessage].map(({ role, content }) => ({
            role,
            content,
          })),
          language: lang,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to consult the scent archive server.");
      }

      if (!response.body) {
        throw new Error("Server returned empty olfactory spectrum.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, content: accumulatedText } : m
          )
        );
      }
    } catch (error: any) {
      console.error(error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content:
                  lang === "en"
                    ? `*Olfactory connection timeout.* Could not establish link to LeTraits Scent Intelligence. Please ensure GEMINI_API_KEY is configured in Settings > Secrets.\n\nError details: ${error.message}`
                    : `*Koneksi arsip terputus.* Gagal menghubungkan ke Scent Intelligence LeTraits. Pastikan GEMINI_API_KEY telah dikonfigurasi di menu Settings > Secrets.\n\nDetail kesalahan: ${error.message}`,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "intro",
        role: "assistant",
        content: dict.consultant.introMessage,
      },
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#2C5EAD] overflow-hidden animate-fade-in">
      {/* Left Column (4 columns): Instructions & Suggestions */}
      <section className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#2C5EAD] bg-[#121414]/90 p-6 flex flex-col justify-between space-y-8">
        <div className="space-y-6">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#1591DC] uppercase block">
            CRAFTED AI INTELLIGENCE
          </span>
          <h1 className="text-3xl font-serif italic text-white leading-none">
            {dict.consultant.title}
          </h1>
          <p className="text-xs text-[#bfc7d2] leading-relaxed">
            {dict.consultant.subtitle}
          </p>

          {/* Suggestions Stack */}
          <div className="space-y-3 pt-6 border-t border-[#2C5EAD]/40">
            <span className="text-[9px] font-mono tracking-widest text-[#bfc7d2] block uppercase mb-1">
              {dict.consultant.quickSuggestions}
            </span>
            <div className="flex flex-col gap-2">
              {activeSuggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sug.prompt)}
                  className="text-left p-3 border border-[#2C5EAD] hover:border-[#1591DC] bg-[#0d0f0f]/50 hover:bg-[#1591DC]/5 cursor-pointer font-mono text-[10px] uppercase text-[#bfc7d2] hover:text-white transition-all duration-200 leading-tight"
                >
                  ✦ {sug.display}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Session Button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-neutral-500 hover:text-[#1591DC] transition-colors pt-2"
          >
            <RefreshCw className="w-3 h-3" />
            RESET SESSION
          </button>
        </div>

        {/* Server proxy disclaimer */}
        <div className="border-t border-[#2C5EAD]/20 pt-4 flex flex-col space-y-1">
          <span className="font-mono text-[8px] text-[#4BB8FA] uppercase tracking-widest">
            SECURE GEMINI NODE 3.5 FLASH
          </span>
          <span className="font-mono text-[8px] text-neutral-500">
            SERVER PROXIED CALLS TO PREVENT BROWSER API EXPOSURE.
          </span>
        </div>
      </section>

      {/* Right Column (8 columns): Chat Console */}
      <section className="lg:col-span-8 flex flex-col bg-[#0d0f0f] min-h-[500px] h-[650px]">
        {/* Messages viewport */}
        <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-[#0c0e0e]/50">
          {messages.map((m) => {
            const isAssistant = m.role === "assistant";
            return (
              <div
                key={m.id}
                className={`flex gap-4 animate-fade-in ${
                  isAssistant ? "justify-start" : "justify-end"
                }`}
              >
                {isAssistant && (
                  <div className="w-8 h-8 rounded-none border border-[#1591DC] flex items-center justify-center bg-[#121414] text-[#1591DC] shrink-0 font-mono text-[10px]">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] border p-4 font-sans text-xs md:text-sm leading-relaxed ${
                    isAssistant
                      ? "bg-[#121414] border-[#2C5EAD] text-[#e2e2e2]"
                      : "bg-[#1591DC]/10 border-[#1591DC] text-white"
                  }`}
                >
                  <div className="font-mono text-[8px] tracking-wider text-[#1591DC] block mb-2 uppercase select-none">
                    {isAssistant ? "AI SYSTEM EXPERT" : "USER ENQUIRY"}
                  </div>

                  {/* Parse lines */}
                  <div className="space-y-2 prose prose-xs prose-invert">
                    {m.content ? (
                      m.content.split("\n").map((line, idx) => {
                        if (line.startsWith("- ") || line.startsWith("* ")) {
                          return (
                            <li key={idx} className="ml-4 list-disc">
                              {line.substring(2)}
                            </li>
                          );
                        }
                        if (line.startsWith("### ")) {
                          return (
                            <h4
                              key={idx}
                              className="text-[#4BB8FA] font-serif italic text-sm pt-2"
                            >
                              {line.substring(4)}
                            </h4>
                          );
                        }
                        if (line.startsWith("## ")) {
                          return (
                            <h3
                              key={idx}
                              className="text-white font-serif italic text-md pt-3 pb-1"
                            >
                              {line.substring(3)}
                            </h3>
                          );
                        }
                        return <p key={idx}>{line}</p>;
                      })
                    ) : (
                      <span className="flex items-center gap-2 text-neutral-500 font-mono text-xs animate-pulse">
                        <Compass className="w-4 h-4 animate-spin text-[#1591DC]" />
                        {dict.consultant.thinking}
                      </span>
                    )}
                  </div>
                </div>

                {!isAssistant && (
                  <div className="w-8 h-8 rounded-none border border-[#2C5EAD] flex items-center justify-center bg-[#121414] text-neutral-400 shrink-0 font-mono text-[10px]">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat form */}
        <footer className="p-4 border-t border-[#2C5EAD] bg-[#121414]/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={dict.consultant.inputPlaceholder}
              disabled={isLoading}
              className="flex-grow bg-[#0c0e0e] border border-[#2C5EAD] focus:border-[#1591DC] rounded-none py-3 px-4 text-sm text-white placeholder-neutral-500 focus:outline-none transition-all font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`px-6 py-3 border font-mono text-xs uppercase tracking-widest flex items-center gap-2 ${
                !input.trim() || isLoading
                  ? "border-neutral-800 text-neutral-600 cursor-not-allowed bg-transparent"
                  : "border-[#1591DC] text-white hover:bg-[#1591DC]/15 cursor-pointer transition-colors"
              }`}
            >
              <span>{dict.consultant.send}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </footer>
      </section>
    </div>
  );
}
