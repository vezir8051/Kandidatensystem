"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DemoBanner, Header, Footer } from "@/components/ui";
import { KANTONE, BERUF_VORSCHLAEGE } from "@/lib/kantone";
import type { Agentur, Inserat } from "@/lib/types";

type Eingereicht = {
  agenturId: string;
  inseratId: string;
  vorname: string;
  nachname: string;
};

function formatDatum(iso: string): string {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// Kleine Icons (Pin, Kalender) im Jobwish-Stil.
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function AgenturDashboard({
  agenturen,
  offeneInserate,
  firmaName,
  firmaBranche,
  eingereicht,
  initialBeruf = "",
  initialOrt = "",
}: {
  agenturen: Agentur[];
  offeneInserate: Inserat[];
  firmaName: Record<string, string>;
  firmaBranche: Record<string, string>;
  eingereicht: Eingereicht[];
  initialBeruf?: string;
  initialOrt?: string;
}) {
  const [agenturId, setAgenturId] = useState(agenturen[0]?.id ?? "");
  const [berufFilter, setBerufFilter] = useState(initialBeruf);
  const [ortFilter, setOrtFilter] = useState(initialOrt);
  const [titelFilter, setTitelFilter] = useState("");
  const [sortierung, setSortierung] = useState<"neueste" | "aelteste" | "alpha">("neueste");

  const agentur = agenturen.find((a) => a.id === agenturId) ?? agenturen[0];

  const berufVorschlaege = useMemo(
    () =>
      Array.from(new Set([...offeneInserate.map((i) => i.beruf), ...BERUF_VORSCHLAEGE])).sort(),
    [offeneInserate],
  );
  const ortVorschlaege = useMemo(
    () => Array.from(new Set([...offeneInserate.map((i) => i.ort), ...KANTONE])).sort(),
    [offeneInserate],
  );

  const berufQuery = berufFilter.trim().toLowerCase();
  const ortQuery = ortFilter.trim().toLowerCase();
  const titelQuery = titelFilter.trim().toLowerCase();

  const gefiltert = useMemo(() => {
    const list = offeneInserate.filter(
      (i) =>
        (berufQuery === "" || i.beruf.toLowerCase().includes(berufQuery)) &&
        (ortQuery === "" || i.ort.toLowerCase().includes(ortQuery)) &&
        (titelQuery === "" || i.titel.toLowerCase().includes(titelQuery)),
    );
    const sorted = [...list];
    if (sortierung === "alpha") sorted.sort((a, b) => a.titel.localeCompare(b.titel));
    else if (sortierung === "aelteste") sorted.sort((a, b) => a.erstelltAm.localeCompare(b.erstelltAm));
    else sorted.sort((a, b) => b.erstelltAm.localeCompare(a.erstelltAm));
    return sorted;
  }, [offeneInserate, berufQuery, ortQuery, titelQuery, sortierung]);

  function eingereichtFuer(inseratId: string): Eingereicht | undefined {
    return eingereicht.find((e) => e.agenturId === agenturId && e.inseratId === inseratId);
  }

  const hatFilter = berufFilter || ortFilter || titelFilter;
  function filterZuruecksetzen() {
    setBerufFilter("");
    setOrtFilter("");
    setTitelFilter("");
  }

  return (
    <>
      <DemoBanner />
      <Header rolle="agentur" name={agentur?.name} />

      <main className="min-h-screen bg-slate-50">
        {/* Kopfzeile: Agentur + Radar + Umschalter */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-extrabold text-ink">{agentur?.name}</h1>
              <p className="text-muted mt-1 text-sm">
                {agentur?.ort} · Ansprechperson: {agentur?.kontaktperson}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/agentur/radar"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-sm font-medium text-body hover:bg-slate-50 transition-colors"
              >
                Markt-Radar
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-600 text-white text-xs font-bold">
                  4
                </span>
              </Link>
              <div>
                <label className="block text-xs text-muted mb-1">Demo: Agentur wechseln</label>
                <select
                  value={agenturId}
                  onChange={(e) => setAgenturId(e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {agenturen.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 grid gap-8 lg:grid-cols-4">
          {/* Sidebar: Abo + Filter */}
          <aside className="space-y-6 lg:col-span-1 h-fit lg:sticky lg:top-24">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="font-medium text-emerald-900 text-sm">Abonnement aktiv – Starter</p>
              <p className="text-xs text-emerald-700 mt-1">29 CHF/Monat · nächste Abrechnung 01.07.2026</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-ink">Filter</h3>
                {hatFilter && (
                  <button
                    onClick={filterZuruecksetzen}
                    className="text-xs font-medium text-accent-pink hover:underline"
                  >
                    Zurücksetzen
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-muted mb-1">Suche nach Titel</label>
                  <input
                    value={titelFilter}
                    onChange={(e) => setTitelFilter(e.target.value)}
                    placeholder="z.B. Maler"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">Beruf</label>
                  <input
                    list="agentur-berufe"
                    value={berufFilter}
                    onChange={(e) => setBerufFilter(e.target.value)}
                    placeholder="Alle Berufe"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <datalist id="agentur-berufe">
                    {berufVorschlaege.map((b) => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">Ort / Kanton</label>
                  <input
                    list="agentur-orte"
                    value={ortFilter}
                    onChange={(e) => setOrtFilter(e.target.value)}
                    placeholder="Ganze Schweiz"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <datalist id="agentur-orte">
                    {ortVorschlaege.map((o) => (
                      <option key={o} value={o} />
                    ))}
                  </datalist>
                </div>
                {hatFilter && (
                  <button
                    onClick={filterZuruecksetzen}
                    className="w-full rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
                  >
                    Löschen
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Hauptbereich: Header + Liste */}
          <section className="lg:col-span-3">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-xl font-bold text-ink">
                {gefiltert.length} {gefiltert.length === 1 ? "Inserat" : "Inserate"} gefunden
              </h2>
              <label className="flex items-center gap-2 text-sm text-muted">
                Sortieren nach
                <select
                  value={sortierung}
                  onChange={(e) => setSortierung(e.target.value as typeof sortierung)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="neueste">Neueste</option>
                  <option value="aelteste">Älteste</option>
                  <option value="alpha">Alphabetisch</option>
                </select>
              </label>
            </div>

            {gefiltert.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="font-medium text-body">Keine Inserate gefunden</p>
                <p className="text-sm text-muted mt-1">Passen Sie die Filter an, um mehr zu sehen.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {gefiltert.map((inserat) => {
                  const bereits = eingereichtFuer(inserat.id);
                  const initialen = (firmaName[inserat.firmaId] ?? "?").slice(0, 2).toUpperCase();
                  return (
                    <div
                      key={inserat.id}
                      className="relative flex items-start gap-4 rounded-2xl bg-white p-4 shadow-soft hover:shadow-card transition-shadow"
                    >
                      <span className="hidden sm:flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-xl font-bold text-brand-600">
                        {initialen}
                      </span>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-ink leading-snug pr-10">{inserat.titel}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                          <span className="text-brand-700">{firmaName[inserat.firmaId]}</span>
                          <span className="flex items-center gap-1">
                            <PinIcon /> {inserat.ort}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarIcon /> {formatDatum(inserat.startDatum)}
                          </span>
                          <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
                            {inserat.dauer}
                          </span>
                          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                            {firmaBranche[inserat.firmaId]}
                          </span>
                        </div>
                        {inserat.beschreibung && (
                          <p className="mt-2 text-sm text-body line-clamp-2">{inserat.beschreibung}</p>
                        )}
                        <div className="mt-4">
                          {bereits ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                              ✓ Kandidat eingereicht: {bereits.vorname} {bereits.nachname}
                            </span>
                          ) : (
                            <Link href={`/agentur/inserat/${inserat.id}`} className="btn-cta px-5 py-2.5 text-sm">
                              Kandidat einreichen
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
