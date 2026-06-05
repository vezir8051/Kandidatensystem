import Link from "next/link";
import { DemoBanner, Header, Footer } from "@/components/ui";
import { LeadFormular } from "@/components/lead-formular";

export default function Home() {
  return (
    <>
      <DemoBanner />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        {/* dezenter Indigo/Violett-Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-gradient-to-r from-brand-300/40 via-accent-300/30 to-brand-200/40 blur-3xl"
        />
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <p className="inline-block text-brand-700 bg-white/70 ring-1 ring-brand-100 rounded-full px-4 py-1.5 text-sm font-medium mb-6 shadow-soft">
            Die Schweizer Plattform für temporäre Vermittlung
          </p>
          <h1 className="text-balance text-4xl md:text-6xl font-bold text-slate-900 max-w-3xl mx-auto leading-[1.05]">
            Schluss mit Kaltakquise.{" "}
            <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
              Firmen und Vermittlungsbüros
            </span>{" "}
            finden sich hier.
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Firmen inserieren ihren Personalbedarf. Temporär-Vermittlungen reichen passende
            Kandidaten ein. Effizient, transparent, fair.
          </p>

          {/* Demo-Login-Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/firma"
              className="px-8 py-4 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 hover:-translate-y-0.5 transition-all shadow-glow"
            >
              🏢 Als Firma ansehen
            </Link>
            <Link
              href="/agentur"
              className="px-8 py-4 rounded-xl bg-white text-slate-800 font-semibold ring-1 ring-slate-200 hover:ring-brand-300 hover:-translate-y-0.5 transition-all shadow-soft"
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
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { zahl: "CHF 4,3 Mrd.", text: "Schweizer Temporärmarkt / Jahr" },
            { zahl: "600+", text: "Vermittlungsbüros in der Schweiz" },
            { zahl: "110'000", text: "Temporärangestellte täglich" },
            { zahl: "29 CHF", text: "pro Monat für Agenturen" },
          ].map((s) => (
            <div key={s.text}>
              <div className="tabular text-2xl md:text-3xl font-bold bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
                {s.zahl}
              </div>
              <div className="text-sm text-slate-500 mt-1">{s.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* So funktioniert's */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-14">
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
            <div
              key={s.nr}
              className="bg-white rounded-2xl border border-slate-100 p-7 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white font-bold flex items-center justify-center mb-5 shadow-glow">
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
          <div className="rounded-2xl p-8 text-white bg-gradient-to-br from-brand-600 to-brand-700 shadow-card">
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
          <div className="rounded-2xl p-8 text-white bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-card">
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
      <section id="preise" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-3">
          Preise für Vermittlungsbüros
        </h2>
        <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">
          Für Firmen ist TempMatch kostenlos. Agenturen wählen das passende Abo.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-soft">
            <h3 className="font-semibold text-slate-900">Starter</h3>
            <div className="mt-3">
              <span className="tabular text-4xl font-bold text-slate-900">29</span>
              <span className="text-slate-500"> CHF/Monat</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li>✓ Zugang zu allen Inseraten</li>
              <li>✓ Bis zu 10 Einreichungen / Monat</li>
              <li>✓ E-Mail-Benachrichtigungen</li>
              <li>✓ Monatlich kündbar</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl ring-2 ring-brand-500 p-8 relative shadow-card">
            <span className="absolute -top-3 left-8 bg-gradient-to-r from-brand-600 to-accent-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-glow">
              Beliebt
            </span>
            <h3 className="font-semibold text-slate-900">Professional</h3>
            <div className="mt-3">
              <span className="tabular text-4xl font-bold text-slate-900">59</span>
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
        <div className="max-w-3xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">
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
                className="group bg-slate-50 rounded-xl border border-slate-100 p-4 open:shadow-soft transition"
              >
                <summary className="font-medium text-slate-800 cursor-pointer list-none flex items-center justify-between">
                  {item.f}
                  <span className="text-brand-400 group-open:rotate-180 transition">▾</span>
                </summary>
                <p className="text-sm text-slate-600 mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Lead-Formular / Frühbucher */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-700 to-accent-700">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-accent-400/30 blur-3xl"
        />
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-white">Jetzt vormerken</h2>
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
