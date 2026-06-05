import Link from "next/link";
import { DemoBanner, Header, Footer } from "@/components/ui";
import { LeadFormular } from "@/components/lead-formular";

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
            Demo – einfach reinklicken, keine Anmeldung nötig ·{" "}
            <Link href="/admin" className="underline hover:text-slate-600">
              Admin-Ansicht
            </Link>
          </p>
        </div>
      </section>

      {/* Statistiken (Branchen-Richtwerte) */}
      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { zahl: "CHF 4,3 Mrd.", text: "Schweizer Temporärmarkt / Jahr" },
            { zahl: "600+", text: "Vermittlungsbüros in der Schweiz" },
            { zahl: "110'000", text: "Temporärangestellte täglich" },
            { zahl: "29 CHF", text: "pro Monat für Agenturen" },
          ].map((s) => (
            <div key={s.text}>
              <div className="text-2xl md:text-3xl font-bold text-brand-600">{s.zahl}</div>
              <div className="text-sm text-slate-500 mt-1">{s.text}</div>
            </div>
          ))}
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

      {/* Preise */}
      <section id="preise" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-3">
          Preise für Vermittlungsbüros
        </h2>
        <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">
          Für Firmen ist TempMatch kostenlos. Agenturen wählen das passende Abo.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h3 className="font-semibold text-slate-900">Starter</h3>
            <div className="mt-3">
              <span className="text-4xl font-bold text-slate-900">29</span>
              <span className="text-slate-500"> CHF/Monat</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li>✓ Zugang zu allen Inseraten</li>
              <li>✓ Bis zu 10 Einreichungen / Monat</li>
              <li>✓ E-Mail-Benachrichtigungen</li>
              <li>✓ Monatlich kündbar</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl border-2 border-brand-500 p-8 relative">
            <span className="absolute -top-3 left-8 bg-brand-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              Beliebt
            </span>
            <h3 className="font-semibold text-slate-900">Professional</h3>
            <div className="mt-3">
              <span className="text-4xl font-bold text-slate-900">59</span>
              <span className="text-slate-500"> CHF/Monat</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li>✓ Alles aus Starter</li>
              <li>✓ Unbegrenzte Einreichungen</li>
              <li>✓ Prioritäts-Anzeige bei Firmen</li>
              <li>✓ Statistiken & Erfolgsquote</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-10">
            Häufige Fragen
          </h2>
          <div className="space-y-3">
            {[
              {
                f: "Was kostet TempMatch für Firmen?",
                a: "Für Firmen ist die Nutzung komplett kostenlos – registrieren, inserieren und Kandidaten auswählen ohne Gebühren.",
              },
              {
                f: "Wie viel zahlen Vermittlungsbüros?",
                a: "Ab 29 CHF pro Monat im Starter-Abo. Jederzeit kündbar, keine Mindestlaufzeit.",
              },
              {
                f: "Wer bezahlt die Vermittlung des Kandidaten?",
                a: "Den Tarif für den Einsatz verhandelt die Firma direkt mit der gewählten Agentur. TempMatch stellt nur den Kontakt her.",
              },
              {
                f: "Wie viele Kandidaten kann eine Agentur einreichen?",
                a: "Pro Inserat genau einen Kandidaten. So bleibt die Auswahl für die Firma übersichtlich und fair.",
              },
              {
                f: "Werden die Daten der Kandidaten geschützt?",
                a: "Ja. Agenturen bestätigen bei jeder Einreichung das Einverständnis des Kandidaten gemäss Schweizer Datenschutzgesetz (nDSG).",
              },
            ].map((item) => (
              <details
                key={item.f}
                className="group bg-slate-50 rounded-xl border border-slate-200 p-4"
              >
                <summary className="font-medium text-slate-800 cursor-pointer list-none flex items-center justify-between">
                  {item.f}
                  <span className="text-slate-400 group-open:rotate-180 transition">▾</span>
                </summary>
                <p className="text-sm text-slate-600 mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Lead-Formular / Frühbucher */}
      <section className="bg-brand-700">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-white">Jetzt vormerken</h2>
          <p className="text-brand-100 mt-2 mb-8 max-w-lg mx-auto">
            Tragen Sie sich auf die Frühbucher-Liste ein und sichern Sie sich den Start-Rabatt für
            die ersten drei Monate.
          </p>
          <LeadFormular />
        </div>
      </section>

      <Footer />
    </>
  );
}
