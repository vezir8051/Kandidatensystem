import Link from "next/link";
import type { InseratStatus, KandidatStatus } from "@/lib/demo-data";
import { Sparkle } from "@/components/decor";

// --- Demo-Banner ---
export function DemoBanner() {
  return (
    <div className="bg-night-900 text-white/90 text-center text-sm py-2 px-4">
      <span>Demo-Version – alle Daten sind Beispieldaten. Keine echte Anmeldung, keine Zahlungen.</span>
    </div>
  );
}

// --- Logo (weiss, mit Sternchen) ---
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-1.5">
      <span
        className={`font-display font-extrabold text-2xl tracking-tight ${
          dark ? "text-ink" : "text-white"
        }`}
      >
        Temp<span className={dark ? "text-brand-600" : "text-white/90"}>Match</span>
      </span>
      <Sparkle size={16} color={dark ? "#0d57f5" : "#ffffff"} className="-mt-3" />
    </Link>
  );
}

// --- Header / Navigation (blaue Jobwish-Leiste) ---
export function Header({
  rolle,
  name,
}: {
  rolle?: "firma" | "agentur" | "admin";
  name?: string;
}) {
  return (
    <header className="sticky top-0 z-30 bg-brand-600">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-2 text-sm">
          {rolle === "firma" && (
            <span className="px-3 py-1.5 rounded-full bg-white/15 text-white font-medium">
              {name ? `Firma: ${name}` : "Firma"}
            </span>
          )}
          {rolle === "agentur" && (
            <span className="px-3 py-1.5 rounded-full bg-white/15 text-white font-medium">
              {name ? `Agentur: ${name}` : "Agentur"}
            </span>
          )}
          {rolle === "admin" && (
            <span className="px-3 py-1.5 rounded-full bg-white/15 text-white font-medium">
              Admin-Bereich
            </span>
          )}
          {rolle ? (
            <Link
              href="/"
              className="btn-pill border-white/60 text-white px-4 py-1.5 hover:bg-white/10"
            >
              Abmelden
            </Link>
          ) : (
            <>
              <Link
                href="/agentur"
                className="btn-pill border-white/60 text-white px-4 py-1.5 hover:bg-white/10 hidden sm:inline-flex"
              >
                Offene Inserate
              </Link>
              <Link
                href="/firma"
                className="btn-pill border-white/60 text-white px-4 py-1.5 hover:bg-white/10 hidden sm:inline-flex"
              >
                Für Firmen
              </Link>
              <Link
                href="/login"
                className="btn-pill border-white bg-white text-brand-700 px-4 py-1.5 hover:bg-white/90"
              >
                Anmelden
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

// --- Status-Badge für Inserate ---
export function InseratBadge({ status }: { status: InseratStatus }) {
  const styles: Record<InseratStatus, string> = {
    OFFEN: "bg-emerald-50 text-emerald-700 border-emerald-200",
    BESETZT: "bg-slate-100 text-slate-600 border-slate-200",
    GESCHLOSSEN: "bg-red-50 text-red-700 border-red-200",
  };
  const labels: Record<InseratStatus, string> = {
    OFFEN: "Offen",
    BESETZT: "Besetzt",
    GESCHLOSSEN: "Geschlossen",
  };
  return (
    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

// --- Status-Badge für Kandidaten ---
export function KandidatBadge({ status }: { status: KandidatStatus }) {
  const styles: Record<KandidatStatus, string> = {
    AUSSTEHEND: "bg-amber-50 text-amber-700 border-amber-200",
    AUSGEWAEHLT: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ABGELEHNT: "bg-slate-100 text-slate-500 border-slate-200",
  };
  const labels: Record<KandidatStatus, string> = {
    AUSSTEHEND: "Ausstehend",
    AUSGEWAEHLT: "✓ Ausgewählt",
    ABGELEHNT: "Nicht berücksichtigt",
  };
  return (
    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

// --- Footer ---
export function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-20 py-10 text-sm text-slate-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-brand-600 text-white font-bold text-sm">
            T
          </span>
          <p>TempMatch · Demo-Version · {new Date().getFullYear()}</p>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/spielregeln" className="hover:text-brand-600 transition">
            Spielregeln
          </Link>
          <Link href="/agb" className="hover:text-brand-600 transition">
            AGB
          </Link>
          <Link href="/datenschutz" className="hover:text-brand-600 transition">
            Datenschutz
          </Link>
          <Link href="/impressum" className="hover:text-brand-600 transition">
            Impressum
          </Link>
        </nav>
      </div>
    </footer>
  );
}
