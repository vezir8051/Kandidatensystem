import Link from "next/link";
import { DemoBanner, Header, Footer } from "@/components/ui";

// Gemeinsames Layout für die Rechtsseiten (Datenschutz, Impressum, AGB).
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
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-sm text-brand-600 hover:underline">
          ← Zur Startseite
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-6">{titel}</h1>
        <div className="prose-sm space-y-4 text-slate-700 leading-relaxed">{children}</div>
        <p className="mt-10 text-xs text-slate-400 border-t border-slate-200 pt-4">
          Hinweis: Dies ist eine Demo-Version. Diese Texte sind Platzhalter und ersetzen keine
          rechtsgültigen Dokumente. Für den produktiven Einsatz sind rechtlich geprüfte Texte
          erforderlich.
        </p>
      </main>
      <Footer />
    </>
  );
}

export function Absatz({ titel, text }: { titel: string; text: string }) {
  return (
    <div>
      <h2 className="font-semibold text-slate-900 text-lg mb-1">{titel}</h2>
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  );
}
