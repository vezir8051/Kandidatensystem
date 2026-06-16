import Link from "next/link";
import { DemoBanner, Header, Footer } from "@/components/ui";
import { Sparkle } from "@/components/decor";

export const metadata = {
  title: "Anmelden – TempMatch",
};

// Hinweis: Echte Authentifizierung ist noch nicht gebaut (Roadmap). Bis dahin
// dient diese Seite als sauberer Demo-Einstieg in die drei Rollen-Ansichten.
// Der frühere Passwort-Gate-Code bleibt in src/lib/gate*.ts und login-form.tsx
// erhalten, wird hier aber nicht verwendet.
const ROLLEN = [
  {
    href: "/firma",
    titel: "Als Firma",
    text: "Inserate erstellen, Kandidaten von Agenturen prüfen und auswählen.",
    cta: "Firmen-Ansicht öffnen",
    farbe: "bg-brand-50 text-brand-600",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" /><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
      </svg>
    ),
  },
  {
    href: "/agentur",
    titel: "Als Agentur",
    text: "Offene Inserate durchsuchen, Kandidaten einreichen und den Markt-Radar nutzen.",
    cta: "Agentur-Ansicht öffnen",
    farbe: "bg-accent-pink/10 text-accent-pink",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: "/admin",
    titel: "Als Admin",
    text: "Plattform-Kennzahlen, Firmen, Agenturen und Meldungen im Überblick.",
    cta: "Admin-Bereich öffnen",
    farbe: "bg-night-900/10 text-night-900",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export default function LoginPage() {
  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 py-14 sm:py-20">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              <Sparkle size={13} color="#2d6fd4" /> Demo-Zugang
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink mt-4">
              Anmelden
            </h1>
            <p className="text-muted mt-3 max-w-xl mx-auto">
              In dieser Demo wählen Sie einfach die Ansicht, die Sie erkunden möchten.
              Eine echte Anmeldung mit Login ist noch nicht aktiviert.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {ROLLEN.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group flex flex-col rounded-2xl bg-white p-6 shadow-soft border border-slate-100 hover:shadow-card hover:-translate-y-0.5 transition-all"
              >
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${r.farbe}`}>
                  {r.icon}
                </span>
                <h2 className="font-display text-lg font-bold text-ink mt-4">{r.titel}</h2>
                <p className="text-sm text-muted mt-1 flex-grow">{r.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 transition-all">
                  {r.cta} <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>

          <p className="text-center text-xs text-muted mt-10">
            Alle Daten sind Beispieldaten. Es werden keine echten Konten angelegt.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
