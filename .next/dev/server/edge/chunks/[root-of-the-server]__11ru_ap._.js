(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__11ru_ap._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
const locales = [
    "id",
    "en"
];
const defaultLocale = "id";
function getLocale(request) {
    // Simple check for accept-language or dynamic default
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage && acceptLanguage.toLowerCase().includes("en")) {
        return "en";
    }
    return defaultLocale;
}
function middleware(request) {
    const { pathname } = request.nextUrl;
    // Check if there is any supported locale in the pathname
    const pathnameHasLocale = locales.some((locale)=>pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
    if (pathnameHasLocale) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // Return the redirect response
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(request.nextUrl);
}
const config = {
    matcher: [
        // Skip all internal paths (_next, static files, api, favicon)
        "/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.css).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__11ru_ap._.js.map