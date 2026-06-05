import Link from "next/link";
import { DemoBanner, Header, Footer } from "@/components/ui";

export default function Home() {
  return (
    <>
      <DemoBanner />
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <p className="inline-block text-brand-700 bg-brand-100 rounded-full px-4 py-1 text-sm font-medium mb-6">
            Die Schweizer Plattform für temporäre Vermittlung
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 max-w-3xl mx-auto leading-tight">
            Schluss mit Kaltakquise. Firmen und Vermittlungsbüros finden sich hier.
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Firmen inserieren ihren Personalbedarf. Temporär-Vermittlungen reichen passende
            Kandidaten ein. Effizient, transparent, fair.
          </p>

          {/* Demo-Login-Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/firma"
              className="px-8 py-4 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition shadow-lg shadow-brand-600/20"
            >
              🏢 Als Firma ansehen
            </Link>
            <Link
              href="/agentur"
              className="px-8 py-4 rounded-xl bg-white text-brand-700 font-semibold border-2 border-brand-200 hover:border-brand-400 transition"
            >
              🤝 Als Agentur ansehen
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Demo – einfach reinklicken, keine Anmeldung nötig
          </p>
        </div>
      </section>

      {/* So funktioniert's */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-12">
          So funktioniert TempMatch
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              nr: "1",
              titel: "Firma inseriert",
              text: "Ein Unternehmen sucht z.B. einen Maler und erstellt in wenigen Minuten ein Inserat mit allen Anforderungen.",
            },
            {
              nr: "2",
              titel: "Agenturen reichen ein",
              text: "Registrierte Vermittlungsbüros sehen das Inserat und reichen pro Stelle einen passenden Kandidaten aus ihrem Pool ein.",
            },
            {
              nr: "3",
              titel: "Firma wählt aus",
              text: "Die Firma vergleicht alle Kandidaten und wählt den passenden aus. Der Tarif wird direkt mit der Agentur vereinbart.",
            },
          ].map((s) => (
            <div key={s.nr} className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center mb-4">
                {s.nr}
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">{s.titel}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zwei Zielgruppen */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-brand-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-3">Für Firmen</h3>
            <ul className="space-y-2 text-brand-50 text-sm">
              <li>✓ Kostenlos registrieren und inserieren</li>
              <li>✓ Mehrere Kandidaten auf einen Blick vergleichen</li>
              <li>✓ Keine Anrufe von Dutzenden Agenturen mehr</li>
            </ul>
            <Link
              href="/firma"
              className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-white text-brand-700 font-medium hover:bg-brand-50 transition"
            >
              Firmen-Ansicht öffnen →
            </Link>
          </div>
          <div className="bg-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-3">Für Vermittlungsbüros</h3>
            <ul className="space-y-2 text-emerald-50 text-sm">
              <li>✓ Nur 29 CHF/Monat, jederzeit kündbar</li>
              <li>✓ Zugang zu Firmen mit echtem Bedarf</li>
              <li>✓ Keine Kaltakquise mehr nötig</li>
            </ul>
            <Link
              href="/agentur"
              className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-white text-emerald-700 font-medium hover:bg-emerald-50 transition"
            >
              Agentur-Ansicht öffnen →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
