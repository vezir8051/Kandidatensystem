import Link from "next/link";
import type { InseratStatus, KandidatStatus } from "@/lib/demo-data";

// --- Demo-Banner ---
export function DemoBanner() {
  return (
    <div className="bg-brand-600 text-white text-center text-sm py-2 px-4">
      <span className="opacity-90">
        Demo-Version – alle Daten sind Beispieldaten. Keine echte Anmeldung, keine Zahlungen.
      </span>
    </div>
  );
}

// --- Header / Navigation ---
export function Header({
  rolle,
  name,
}: {
  rolle?: "firma" | "agentur" | "admin";
  name?: string;
}) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-brand-600 text-white font-bold text-lg">
            T
          </span>
          <span className="font-bold text-xl tracking-tight text-brand-600">TempMatch</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          {rolle === "firma" && (
            <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-600 font-medium">
              {name ? `Firma: ${name}` : "Angemeldet als Firma"}
            </span>
          )}
          {rolle === "agentur" && (
            <span className="px-3 py-1 rounded-full bg-slate-50 text-ink font-medium border border-slate-200">
              {name ? `Agentur: ${name}` : "Angemeldet als Agentur"}
            </span>
          )}
          {rolle === "admin" && (
            <span className="px-3 py-1 rounded-full bg-ink text-white font-medium">
              Admin-Bereich
            </span>
          )}
          {rolle && (
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg text-body hover:bg-slate-50 transition-colors"
            >
              Abmelden
            </Link>
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
