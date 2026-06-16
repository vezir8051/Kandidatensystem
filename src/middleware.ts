import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Passwort-Schutz vorerst DEAKTIVIERT (Seite ist noch in Arbeit).
// Die Login-/Gate-Logik bleibt im Code (src/lib/gate*.ts, /login) erhalten
// und kann später durch Wiederherstellen der Weiterleitung reaktiviert werden.
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
