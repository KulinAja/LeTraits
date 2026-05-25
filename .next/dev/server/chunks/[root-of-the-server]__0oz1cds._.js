module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$google$2f$genai__$5b$external$5d$__$2840$google$2f$genai$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$google$2f$genai$29$__ = __turbopack_context__.i("[externals]/@google/genai [external] (@google/genai, esm_import, [project]/node_modules/@google/genai)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$google$2f$genai__$5b$external$5d$__$2840$google$2f$genai$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$google$2f$genai$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$google$2f$genai__$5b$external$5d$__$2840$google$2f$genai$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$google$2f$genai$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
// Ensure we initialize GoogleGenAI with the server environment variable
const getGenAI = ()=>{
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in the environment variables");
    }
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$google$2f$genai__$5b$external$5d$__$2840$google$2f$genai$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$google$2f$genai$29$__["GoogleGenAI"]({
        apiKey,
        httpOptions: {
            headers: {
                "User-Agent": "aistudio-build"
            }
        }
    });
};
async function POST(req) {
    try {
        const { messages, language = "id" } = await req.json();
        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({
                error: "Invalid request payload"
            }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
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
        const contents = messages.map((m)=>({
                role: m.role === "assistant" ? "model" : "user",
                parts: [
                    {
                        text: m.content
                    }
                ]
            }));
        // Trigger the stream
        const responseStream = await ai.models.generateContentStream({
            model: "gemini-3.5-flash",
            contents: contents,
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.7
            }
        });
        // Create a readable stream to pipe chunks directly to the client
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start (controller) {
                try {
                    for await (const chunk of responseStream){
                        const text = chunk.text;
                        if (text) {
                            // Write raw chunk text
                            controller.enqueue(encoder.encode(text));
                        }
                    }
                } catch (err) {
                    console.error("Stream generation error:", err);
                    controller.error(err);
                } finally{
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
    } catch (error) {
        console.error("Chat API error:", error);
        return new Response(JSON.stringify({
            error: error.message || "Internal Server Error"
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0oz1cds._.js.map