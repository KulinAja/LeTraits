import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Ensure we initialize GoogleGenAI with the server environment variable
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
};

export async function POST(req: NextRequest) {
  try {
    const { messages, language = "id" } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const ai = getGenAI();

    // System prompt instructing the AI on target personality, expertise, and bilingual features
    const systemPrompt = `You are LeTraits' expert AI Fragrance Consultant. 
Detect the user's language (ID/EN) and respond accordingly (if the payload specifies language "${language}", prioritize this but adapt dynamically to user queries).
Educate users on scent notes, chemistry, history, and pairings. 
Always recommend both international icons (e.g. Chanel, Tom Ford, Creed) and local Indonesian perfumes (e.g. HMNS, Mine. Perfumery, Oullu, Layr, Kahf).
Tone: highly intellectual, elegant, poetic yet deeply knowledgeable. Use markdown tables, bullets, and italic quotes where appropriate. Introduce yourself elegantly.`;

    // Map historical message list to correct content format for the SDK
    // In @google/genai, chats.create handles chat history, but for complete flexibility
    // in API routes we can construct the content list or run chats.create.
    // Let's call generateContentStream with history as contents, using role mapping.
    const lastUserMessage = messages[messages.length - 1]?.content;

    // Convert previous messages to appropriate structure
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    // Trigger the stream
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.5-flash",
      contents: contents, // Full history
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    // Create a readable stream to pipe chunks directly to the client
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
              // Write raw chunk text
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          console.error("Stream generation error:", err);
          controller.error(err);
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    });

  } catch (error: any) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
