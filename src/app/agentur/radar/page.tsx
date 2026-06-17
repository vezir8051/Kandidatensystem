"use client";

import Link from "next/link";
import { useState } from "react";
import { DemoBanner, Header, Footer } from "@/components/ui";
import { agenturen } from "@/lib/demo-data";
import {
  staleInserate,
  kandidatenAbgaenge,
  wachstumssignale,
  wachstumsTypLabel,
  prioritaetLabel,
  type RadarSignal,
  type StaleInserat,
  type KandidatenAbgang,
  type Wachstumssignal,
} from "@/lib/radar-data";

type TabId = "stale" | "abgang" | "wachstum";

function formatDatum(iso: string): string {
  return new Date(iso).toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const signalTypConfig: Record<
  RadarSignal["typ"],
  { label: string; badgeClass: string; leftBorder: string; icon: React.ReactNode }
> = {
  STALE_INSERAT: {
    label: "Veraltetes Inserat",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    leftBorder: "border-l-amber-400",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>
    ),
  },
  KANDIDATEN_ABGANG: {
    label: "Kandidaten-Abgang",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
    leftBorder: "border-l-sky-400",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
    ),
  },
  WACHSTUMSSIGNAL: {
    label: "Wachstumssignal",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    leftBorder: "border-l-emerald-400",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
    ),
  },
};

const prioritaetConfig: Record<1 | 2 | 3, { class: string; borderClass: string }> = {
  1: { class: "text-brand-600 font-semibold", borderClass: "border-brand-600" },
  2: { class: "text-amber-600 font-semibold", borderClass: "border-amber-400" },
  3: { class: "text-slate-400", borderClass: "border-slate-300" },
};

function SignalCard({ signal, onKontakt }: { signal: RadarSignal; onKontakt: () => void }) {
  const typCfg = signalTypConfig[signal.typ];
  const pCfg = prioritaetConfig[signal.prioritaet];

  return (
    <div className={`bg-white rounded-2xl border border-l-4 border-slate-200 ${typCfg.leftBorder} p-6 shadow-soft hover:shadow-card transition-shadow`}>
      {/* Zeile 1: Badge + Dringlichkeit */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${typCfg.badgeClass}`}
        >
          {typCfg.icon}
          {typCfg.label}
        </span>
        <div className={`border-l-2 pl-2 ${pCfg.borderClass}`}>
          <span className={`text-xs ${pCfg.class}`}>{prioritaetLabel(signal.prioritaet)}</span>
        </div>
      </div>

      {/* Zeile 2: Firma */}
      <div className="mb-3">
        <h3 className="font-semibold text-ink text-lg leading-tight">{signal.firmaName}</h3>
        <p className="text-sm text-muted mt-0.5">
          {signal.firmaOrt} · {signal.branche}
        </p>
      </div>

      {/* Zeile 3: Typ-spezifische Details */}
      <SignalDetails signal={signal} />

      {/* Zeile 4: Warum jetzt? */}
      <div className="mt-4">
        <p className="text-xs text-muted uppercase tracking-wide mb-1">Warum jetzt?</p>
        <p className="text-sm text-body leading-relaxed">{signal.warum}</p>
      </div>

      {/* Zeile 5: Footer */}
      <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
        <span className="text-xs text-muted">Signal erkannt: {formatDatum(signal.datum)}</span>
        <button onClick={onKontakt} className="btn-cta px-4 py-2 text-sm">
          Kontakt vorbereiten →
        </button>
      </div>
    </div>
  );
}

function SignalDetails({ signal }: { signal: RadarSignal }) {
  if (signal.typ === "STALE_INSERAT") {
    const s = signal as StaleInserat;
    return (
      <div className="bg-slate-50 rounded-lg px-4 py-2.5 text-sm text-body">
        <span className="text-muted">Gesuchtes Profil:</span> {s.berufsbezeichnung}
        <span className="mx-2 text-slate-300">·</span>
        <span className="text-muted">Quelle:</span> {s.quellePlattform}
        <span className="mx-2 text-slate-300">·</span>
        <span className="text-amber-700 font-medium">Seit {s.alterTage} Tagen aktiv</span>
      </div>
    );
  }

  if (signal.typ === "KANDIDATEN_ABGANG") {
    const s = signal as KandidatenAbgang;
    return (
      <div className="bg-slate-50 rounded-lg px-4 py-2.5 text-sm text-body">
        <span className="text-muted">Kandidat:</span> {s.kandidatVorname}
        <span className="mx-2 text-slate-300">·</span>
        <span className="text-muted">Berufsfeld:</span> {s.berufsfeld}
        <span className="mx-2 text-slate-300">·</span>
        <span className="text-muted">Abgang:</span> {formatDatum(s.abgangDatum)}
      </div>
    );
  }

  if (signal.typ === "WACHSTUMSSIGNAL") {
    const s = signal as Wachstumssignal;
    return (
      <div className="bg-slate-50 rounded-lg px-4 py-2.5 text-sm text-body">
        <span className="text-muted">Ereignis:</span>{" "}
        <span className="font-medium">{wachstumsTypLabel[s.wachstumsTyp]}</span>
        <span className="mx-2 text-slate-300">·</span>
        <span className="text-muted">Quelle:</span> {s.quelleLabel}
        <div className="mt-1 text-muted">{s.details}</div>
      </div>
    );
  }

  return null;
}

export default function RadarPage() {
  const agentur = agenturen[0];
  const [activeTab, setActiveTab] = useState<TabId>("stale");
  const [hinweis, setHinweis] = useState<string | null>(null);

  const tabs: { id: TabId; label: string; signals: RadarSignal[] }[] = [
    { id: "stale", label: "Veraltete Inserate", signals: staleInserate },
    { id: "abgang", label: "Kandidaten-Abgänge", signals: kandidatenAbgaenge },
    { id: "wachstum", label: "Wachstumssignale", signals: wachstumssignale },
  ];

  const activeSignals = tabs.find((t) => t.id === activeTab)!.signals;

  const sofortCount =
    staleInserate.filter((s) => s.prioritaet === 1).length +
    kandidatenAbgaenge.filter((s) => s.prioritaet === 1).length +
    wachstumssignale.filter((s) => s.prioritaet === 1).length;

  function handleKontakt(signal: RadarSignal) {
    setHinweis(
      `In der Vollversion öffnet sich hier ein vorbereitetes Gesprächsleitfaden-Formular für ${signal.firmaName} – mit Signalkontext, Kontaktdaten und vorgeschlagenem Angebot.`,
    );
  }

  const KAT_STIL: Record<
    TabId,
    { aktiv: string; iconBg: string; dringend: string; text: string; icon: React.ReactNode }
  > = {
    stale: {
      aktiv: "border-amber-300 bg-amber-50 ring-1 ring-amber-200",
      iconBg: "bg-amber-100 text-amber-700",
      dringend: "text-amber-700",
      text: "Externe Stellen, die 6+ Wochen offen sind. Die Firma hat's selbst versucht — jetzt ist sie offen für eine Agentur.",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>
      ),
    },
    abgang: {
      aktiv: "border-sky-300 bg-sky-50 ring-1 ring-sky-200",
      iconBg: "bg-sky-100 text-sky-700",
      dringend: "text-sky-700",
      text: "Verlässt ein Kandidat eine Firma, entsteht eine Lücke. Noch nirgends inseriert — Sie wissen es als Erste.",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
      ),
    },
    wachstum: {
      aktiv: "border-emerald-300 bg-emerald-50 ring-1 ring-emerald-200",
      iconBg: "bg-emerald-100 text-emerald-700",
      dringend: "text-emerald-700",
      text: "SHAB, Zefix, simap.ch: Neugründungen, Kapitalerhöhungen, gewonnene Aufträge — Firmen, die sofort Personal brauchen.",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
      ),
    },
  };

  return (
    <>
      <DemoBanner />
      <Header rolle="agentur" name={agentur.name} />

      <main className="min-h-screen bg-slate-50">
        {/* Kopfzeile */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <Link
              href="/agentur"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
            >
              ← Zur Übersicht
            </Link>
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              </span>
              <h1 className="font-display text-2xl font-extrabold text-ink">Markt-Radar</h1>
              {sofortCount > 0 && (
                <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {sofortCount} sofort relevant
                </span>
              )}
            </div>
            <p className="text-muted mt-2 max-w-2xl">
              Datenbasierte Signale für proaktive Kundengewinnung. Nicht wer inseriert — sondern
              wer feststeckt und wer wächst.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Kategorien (klickbar = Tabs) */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {tabs.map((tab) => {
              const urgent = tab.signals.filter((s) => s.prioritaet === 1).length;
              const aktiv = activeTab === tab.id;
              const stil = KAT_STIL[tab.id];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={aktiv}
                  className={`text-left rounded-2xl border p-4 transition ${
                    aktiv
                      ? stil.aktiv
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-soft"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${stil.iconBg}`}>
                      {stil.icon}
                    </span>
                    <span className="text-xs font-semibold text-ink">
                      {tab.signals.length} Signale
                      {urgent > 0 && <span className={stil.dringend}> · {urgent} dringend</span>}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-ink">{tab.label}</p>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{stil.text}</p>
                </button>
              );
            })}
          </div>

          {/* Hinweis-Banner */}
          {hinweis && (
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 mb-6 flex items-start justify-between gap-3 shadow-soft">
              <p className="text-sm text-body">{hinweis}</p>
              <button
                onClick={() => setHinweis(null)}
                className="text-muted hover:text-ink text-lg leading-none shrink-0"
                aria-label="Schliessen"
              >
                ×
              </button>
            </div>
          )}

          {/* Signal-Feed */}
          <div className="space-y-4">
            {activeSignals
              .sort((a, b) => a.prioritaet - b.prioritaet)
              .map((signal) => (
                <SignalCard
                  key={signal.id}
                  signal={signal}
                  onKontakt={() => handleKontakt(signal)}
                />
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
