import Link from "next/link";
import type { InseratStatus, KandidatStatus } from "@/lib/demo-data";

// --- Demo-Banner ---
export function DemoBanner() {
  return (
    <div className="bg-amber-100 border-b border-amber-200 text-amber-900 text-center text-sm py-2 px-4">
      🚧 <strong>Demo-Version</strong> – Alle Daten sind Beispieldaten. Keine echte Anmeldung,
      keine Zahlungen.
    </div>
  );
}

// --- Header / Navigation ---
export function Header({
  rolle,
}: {
  rolle?: "firma" | "agentur";
}) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-brand-600 text-white font-bold text-lg">
            T
          </span>
          <span className="font-bold text-xl text-slate-900">TempMatch</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          {rolle === "firma" && (
            <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 font-medium">
              Angemeldet als Firma
            </span>
          )}
          {rolle === "agentur" && (
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium">
              Angemeldet als Agentur
            </span>
          )}
          {rolle && (
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition"
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
    <footer className="border-t border-slate-200 mt-16 py-8 text-center text-sm text-slate-500">
      <p>TempMatch – Demo-Version · Businessplan-Prototyp · {new Date().getFullYear()}</p>
    </footer>
  );
}
