import Link from "next/link";
import { DemoBanner, Header, Footer } from "@/components/ui";

// Gemeinsames Layout für die Rechtsseiten (Datenschutz, Impressum, AGB, Spielregeln).
export function RechtsSeite({
  titel,
  children,
}: {
  titel: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <DemoBanner />
      <Header />
      <main className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
            >
              ← Zur Startseite
            </Link>
            <h1 className="font-display text-3xl font-extrabold text-ink mt-3">{titel}</h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-soft space-y-4 text-body leading-relaxed">
            {children}
          </div>
          <p className="mt-6 text-xs text-muted border-t border-slate-200 pt-4">
            Hinweis: Dies ist eine Demo-Version. Diese Texte sind Platzhalter und ersetzen keine
            rechtsgültigen Dokumente. Für den produktiven Einsatz sind rechtlich geprüfte Texte
            erforderlich.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function Absatz({ titel, text }: { titel: string; text: string }) {
  return (
    <div>
      <h2 className="font-display font-bold text-ink text-lg mb-1">{titel}</h2>
      <p className="text-sm text-body">{text}</p>
    </div>
  );
}
