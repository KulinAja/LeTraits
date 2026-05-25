import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["id", "en"];
const defaultLocale = "id";

function getLocale(request: NextRequest): string {
  // Simple check for accept-language or dynamic default
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage && acceptLanguage.toLowerCase().includes("en")) {
    return "en";
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // Return the redirect response
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, static files, api, favicon)
    "/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.css).*)",
  ],
};
