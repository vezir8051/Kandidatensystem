import Link from "next/link";
import { DemoBanner, Header, Footer } from "@/components/ui";
import { LeadFormular } from "@/components/lead-formular";
import { SuchPille } from "@/components/such-pille";
import { Sparkle, BlobImage } from "@/components/decor";
import { Reveal } from "@/components/reveal";
import { BILDER } from "@/lib/bilder";
import { getFirmen, getInserate, getKandidaten } from "@/lib/db";

export const dynamic = "force-dynamic";

const BERUFSFELDER = [
  { name: "Maler", bild: BILDER.bau },
  { name: "Koch", bild: BILDER.koch },
  { name: "Lagerist", bild: BILDER.logistik },
  { name: "Elektriker", bild: BILDER.elektriker },
  { name: "Reinigungskraft", bild: BILDER.reinigung },
  { name: "Schreiner", bild: BILDER.schreiner },
];

const TESTIMONIALS = [
  {
    name: "Sandra Meier",
    rolle: "HR, Bauunternehmen Zürich",
    bild: BILDER.portraitFrau1,
    text: "Endlich kein Kaltakquise-Telefon mehr. Wir inserieren und bekommen passende Kandidaten – top.",
  },
  {
    name: "Marco Bühler",
    rolle: "Inhaber Vermittlungsbüro",
    bild: BILDER.portraitMann1,
    text: "Wir sehen sofort, welche Firmen echten Bedarf haben. Das spart uns enorm viel Zeit.",
  },
  {
    name: "Thomas Keller",
    rolle: "Gastro-Betrieb Bern",
    bild: BILDER.portraitMann2,
    text: "Innert zwei Tagen hatten wir drei Köche zur Auswahl. Schneller geht es nicht.",
  },
];

function formatDatum(iso: string): string {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function Home() {
  const [firmen, inserate, kandidaten] = await Promise.all([
    getFirmen(),
    getInserate(),
    getKandidaten(),
  ]);
  const offene = inserate.filter((i) => i.status === "OFFEN");
  const spotlight = offene.slice(0, 3);
  const topFirmen = firmen.slice(0, 3);
  const firmaName = Object.fromEntries(firmen.map((f) => [f.id, f.name]));

  return (
    <>
      <DemoBanner />
      <Header />

      {/* ================= HERO (dunkles Sternenfeld) ================= */}
      <section className="relative constellation overflow-hidden">
        {/* Deko-Sternchen */}
        <Sparkle className="absolute left-[12%] top-24 animate-twinkle" size={22} color="#7c3aed" />
        <Sparkle className="absolute right-[14%] top-32 animate-twinkle" size={28} color="#3f7cff" />
        <Sparkle className="absolute left-[22%] bottom-40 animate-twinkle" size={18} color="#5eead4" />
        <Sparkle className="absolute right-[24%] bottom-48 animate-twinkle" size={20} color="#3f7cff" />

        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-44 text-center motion-safe:animate-fade-up">
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white leading-[1.08] text-balance">
            Inserate matchen. <span className="text-brand-300">Vermittlung verbinden.</span> Einsätze starten.
          </h1>

          {/* Statistik */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-14 gap-y-6">
            {[
              { zahl: offene.length, label: "Offene Inserate" },
              { zahl: firmen.length, label: "Registrierte Firmen" },
              { zahl: kandidaten.length, label: "Eingereichte Kandidaten" },
            ].map((s) => (
              <div key={s.label}>
                <div className="tabular font-display text-4xl md:text-5xl font-extrabold text-white">
                  {s.zahl}
                </div>
                <div className="text-sm text-white/70 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Suchleiste */}
          <div className="mt-10">
            <SuchPille />
          </div>

          {/* Schnellfilter-Pillen: Klick führt zur gefilterten Inserat-Liste */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {BERUFSFELDER.slice(0, 5).map((b) => (
              <Link
                key={b.name}
                href={`/agentur?beruf=${encodeURIComponent(b.name)}`}
                className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/90 hover:bg-white/20 transition-colors"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Lila Wellen-Blob unten */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="wave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#d23bb4" />
            </linearGradient>
          </defs>
          <path
            d="M0,80 C360,160 540,40 720,70 C900,100 1080,170 1440,90 L1440,160 L0,160 Z"
            fill="url(#wave)"
            opacity="0.9"
          />
          <path d="M0,120 C400,180 680,90 1440,140 L1440,160 L0,160 Z" fill="#ffffff" />
        </svg>
      </section>

      {/* ================= KARTEN-REIHE ================= */}
      <section className="max-w-7xl mx-auto px-4 -mt-28 relative z-10 grid gap-6 lg:grid-cols-3">
        {/* Promo-Karte */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-night-700 to-accent-purple p-7 text-white shadow-card">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-semibold tracking-wide">
            PRO-TIPP
          </span>
          <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight">
            Hol mehr aus deinem Account raus!
          </h3>
          <p className="mt-3 text-sm text-white/80 max-w-[16rem]">
            Je vollständiger dein Profil, desto besser die Matches zwischen Firma und Vermittlung.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BILDER.frauHandy}
            alt="Person am Smartphone"
            loading="lazy"
            className="mt-4 ml-auto h-40 w-32 object-cover blob-2"
          />
          <Sparkle className="absolute bottom-6 left-6" size={20} color="#5eead4" />
        </div>

        {/* Top Firmen */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-card">
          <div className="bg-gradient-to-r from-brand-700 to-brand-500 px-6 py-4">
            <h3 className="font-display text-lg font-bold text-white">Top Firmen</h3>
          </div>
          <div className="p-4 space-y-3">
            {topFirmen.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-transparent transition hover:bg-white hover:shadow-soft hover:ring-slate-100"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display font-bold text-brand-600">
                  {f.name.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{f.name}</p>
                  <p className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                    <span>{f.branche}</span>
                    <span className="flex items-center gap-1">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {f.ort}
                    </span>
                  </p>
                </div>
              </div>
            ))}
            <Link
              href="/agentur"
              className="block pt-1 text-center text-sm font-semibold text-brand-600 hover:underline"
            >
              Alle Firmen ansehen →
            </Link>
          </div>
        </div>

        {/* Inserate im Spotlight */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-card">
          <div className="bg-gradient-to-r from-accent-purple to-accent-pink px-6 py-4">
            <h3 className="font-display text-lg font-bold text-white">Inserate im Spotlight</h3>
          </div>
          <div className="p-4 space-y-3">
            {spotlight.length === 0 && (
              <p className="text-sm text-muted text-center py-6">Aktuell keine offenen Inserate.</p>
            )}
            {spotlight.map((i) => (
              <div
                key={i.id}
                className="rounded-2xl bg-slate-50 p-3 ring-1 ring-transparent transition hover:bg-white hover:shadow-soft hover:ring-slate-100"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-ink leading-snug">{i.titel}</p>
                  <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-800">
                    {i.dauer}
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                  {firmaName[i.firmaId]}
                  <span className="flex items-center gap-1">
                    ·
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    {i.ort}
                  </span>
                </p>
                <Link
                  href={`/agentur/inserat/${i.id}`}
                  className="btn-cta mt-2 inline-block px-4 py-1.5 text-xs"
                >
                  Kandidat einreichen
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BERUFSFELDER (mit Fotos) ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink">
            Beliebte Berufsfelder
          </h2>
          <p className="mt-3 text-body">Finde temporäre Talente in den gefragtesten Branchen.</p>
        </div>
        <Reveal className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {BERUFSFELDER.map((b) => (
            <Link
              key={b.name}
              href={`/agentur?beruf=${encodeURIComponent(b.name)}`}
              className="group relative h-44 overflow-hidden rounded-3xl shadow-soft bg-night-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.bild}
                alt={b.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-900/80 via-night-900/20 to-transparent" />
              <span className="absolute bottom-4 left-5 font-display text-xl font-bold text-white">
                {b.name}
              </span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ================= HOW-TO BOX ================= */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl bg-brand-50 px-6 py-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink flex items-center justify-center gap-2">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600 shrink-0"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.8.8 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
            So funktioniert TempMatch – richtig vermitteln
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-body">
            Firmen inserieren ihren Personalbedarf in wenigen Minuten. Vermittlungsbüros reichen
            pro Stelle einen passenden Kandidaten ein. Die Firma vergleicht und wählt aus – zentral,
            übersichtlich und fair.
          </p>
          <Link href="#schritte" className="btn-cta mt-7 px-7 py-3 text-sm">
            Mehr erfahren
          </Link>
        </div>
      </section>

      {/* ================= WARUM (Foto-Collage) ================= */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <BlobImage src={BILDER.team} alt="Team im Gespräch" shape="blob-1" backdrop="bg-brand-200" className="h-80" />
          <div className="absolute -bottom-5 -right-3 rounded-2xl bg-white px-4 py-3 shadow-card">
            <p className="text-xs text-muted">Eingereichte Kandidaten</p>
            <p className="font-display text-xl font-extrabold text-brand-600">{kandidaten.length}+</p>
          </div>
          <Sparkle className="absolute -top-3 right-10" size={24} color="#3f7cff" />
        </div>
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink leading-tight">
            Warum TempMatch? Weil es funktioniert!
          </h2>
          <p className="mt-5 text-body leading-relaxed">
            Schluss mit endloser Kaltakquise. TempMatch verbindet Firmen mit echtem Personalbedarf
            direkt mit spezialisierten Vermittlungsbüros. Effizient, transparent und fair – für
            beide Seiten.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/firma" className="btn-cta px-6 py-3 text-sm">Als Firma starten</Link>
            <Link href="/agentur" className="btn-pill border-slate-300 text-ink px-6 py-3 text-sm hover:bg-slate-50">
              Als Agentur ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ALTERNIERENDE BLOB-SEKTION ================= */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="font-display text-3xl font-extrabold text-ink leading-tight">
            Zu viele Anrufe, zu wenig passende Kandidaten?
          </h2>
          <p className="mt-5 text-body leading-relaxed">
            Auf TempMatch sehen Vermittlungsbüros genau, welche Firmen gerade Bedarf haben – und
            reichen gezielt passende Profile ein. Kein Streuverlust, keine Kaltakquise.
          </p>
        </div>
        <div className="order-1 md:order-2 relative">
          <BlobImage src={BILDER.frauHandy} alt="Vermittlerin am Smartphone" shape="blob-2" backdrop="bg-accent-purple/40" className="h-80" />
          <div className="absolute top-6 -left-3 flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink shadow-card">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600 shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            {offene.length} offene Inserate
          </div>
          <div className="absolute -bottom-3 right-6 flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-card">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" /></svg>
            Passender Match
          </div>
          <Sparkle className="absolute bottom-12 -left-2" size={18} color="#5eead4" />
        </div>
      </section>

      {/* ================= SCHRITTE ================= */}
      <section id="schritte" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-center font-display text-3xl md:text-4xl font-extrabold text-ink mb-14">
          In wenigen Schritten zum Einsatz
        </h2>
        <Reveal className="grid md:grid-cols-3 gap-8">
          {[
            { nr: "1", titel: "Firma inseriert", text: "Ein Unternehmen erstellt in Minuten ein Inserat mit allen Anforderungen." },
            { nr: "2", titel: "Agenturen reichen ein", text: "Vermittlungsbüros sehen das Inserat und reichen pro Stelle einen Kandidaten ein." },
            { nr: "3", titel: "Firma wählt aus", text: "Die Firma vergleicht alle Kandidaten und wählt den passenden aus." },
          ].map((s) => (
            <div key={s.nr} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cta-gradient font-display text-lg font-bold text-white">
                {s.nr}
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{s.titel}</h3>
              <p className="mt-2 text-sm text-body leading-relaxed">{s.text}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center font-display text-3xl md:text-4xl font-extrabold text-ink mb-14">
            Das sagen unsere Nutzer
          </h2>
          <Reveal className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-3xl bg-white p-7 shadow-soft">
                <div className="flex gap-0.5 text-accent-pink mb-3" aria-label="5 von 5 Sternen">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.9 6.26L21.6 9.27l-4.8 4.68 1.13 6.6L12 17.4l-5.93 3.15L7.2 13.95 2.4 9.27l6.7-1.01z" /></svg>
                  ))}
                </div>
                <p className="text-body leading-relaxed">„{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display font-bold text-brand-600">
                    {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                  <div className="text-sm">
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-muted">{t.rolle}</p>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= PREISE ================= */}
      <section id="preise" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-center font-display text-3xl md:text-4xl font-extrabold text-ink mb-3">
          Preise für Vermittlungsbüros
        </h2>
        <p className="text-center text-muted mb-12 max-w-xl mx-auto">
          Für Firmen ist TempMatch kostenlos. Agenturen wählen das passende Abo.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <h3 className="font-display font-bold text-ink">Starter</h3>
            <div className="mt-3">
              <span className="tabular font-display text-4xl font-extrabold text-ink">29</span>
              <span className="text-muted"> CHF/Monat</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-body">
              <li>✓ Zugang zu allen Inseraten</li>
              <li>✓ Bis zu 10 Einreichungen / Monat</li>
              <li>✓ E-Mail-Benachrichtigungen</li>
              <li>✓ Monatlich kündbar</li>
            </ul>
          </div>
          <div className="relative rounded-3xl bg-white p-8 ring-2 ring-accent-purple">
            <span className="absolute -top-3 left-8 rounded-full bg-cta-gradient px-3 py-1 text-xs font-medium text-white">
              Beliebt
            </span>
            <h3 className="font-display font-bold text-ink">Professional</h3>
            <div className="mt-3">
              <span className="tabular font-display text-4xl font-extrabold text-ink">59</span>
              <span className="text-muted"> CHF/Monat</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-body">
              <li>✓ Alles aus Starter</li>
              <li>✓ Unbegrenzte Einreichungen</li>
              <li>✓ Prioritäts-Anzeige bei Firmen</li>
              <li>✓ Statistiken & Erfolgsquote</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-20">
          <h2 className="text-center font-display text-3xl md:text-4xl font-extrabold text-ink mb-10">
            Häufige Fragen
          </h2>
          <div className="space-y-3">
            {[
              { f: "Was kostet TempMatch für Firmen?", a: "Für Firmen ist die Nutzung komplett kostenlos – registrieren, inserieren und Kandidaten auswählen ohne Gebühren." },
              { f: "Wie viel zahlen Vermittlungsbüros?", a: "Ab 29 CHF pro Monat im Starter-Abo. Jederzeit kündbar, keine Mindestlaufzeit." },
              { f: "Wer bezahlt die Vermittlung des Kandidaten?", a: "Den Tarif für den Einsatz verhandelt die Firma direkt mit der gewählten Agentur. TempMatch stellt nur den Kontakt her." },
              { f: "Wie viele Kandidaten kann eine Agentur einreichen?", a: "Pro Inserat genau einen Kandidaten. So bleibt die Auswahl für die Firma übersichtlich und fair." },
              { f: "Werden die Daten der Kandidaten geschützt?", a: "Ja. Agenturen bestätigen bei jeder Einreichung das Einverständnis des Kandidaten gemäss nDSG." },
            ].map((item) => (
              <details key={item.f} className="group rounded-2xl border border-slate-100 bg-slate-50 p-4 open:shadow-soft transition">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink">
                  {item.f}
                  <span className="text-brand-500 transition group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-3 text-sm text-body">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LEAD-CTA ================= */}
      <section className="relative constellation overflow-hidden">
        <Sparkle className="absolute left-[15%] top-12 animate-twinkle" size={20} color="#7c3aed" />
        <Sparkle className="absolute right-[18%] bottom-12 animate-twinkle" size={24} color="#3f7cff" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">Jetzt vormerken</h2>
          <p className="mx-auto mt-3 mb-8 max-w-lg text-white/75">
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
