import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, accessToken } from "@/lib/gate";

// Seitenweiter Passwort-Schutz: ohne gültigen Zugangs-Cookie wird jede
// Anfrage auf /login umgeleitet. Die Login-Seite selbst bleibt frei
// erreichbar, ebenso statische Assets (siehe matcher unten).

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Login-Seite immer erlauben (sonst Endlos-Redirect).
  if (pathname === "/login") {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie && cookie === accessToken()) {
    return NextResponse.next();
  }

  // Nicht freigeschaltet -> auf Login umleiten, Ziel als ?weiter merken.
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  if (pathname !== "/") {
    url.searchParams.set("weiter", pathname + search);
  }
  return NextResponse.redirect(url);
}

export const config = {
  // Alles ausser Next-Internas und statischen Dateien schützen.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
