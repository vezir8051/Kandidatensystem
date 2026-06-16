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
  { label: string; badgeClass: string }
> = {
  STALE_INSERAT: {
    label: "Veraltetes Inserat",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  KANDIDATEN_ABGANG: {
    label: "Kandidaten-Abgang",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
  },
  WACHSTUMSSIGNAL: {
    label: "Wachstumssignal",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
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
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft hover:shadow-card transition-shadow">
      {/* Zeile 1: Badge + Dringlichkeit */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <span
          className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${typCfg.badgeClass}`}
        >
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
        <button
          onClick={onKontakt}
          className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
        >
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

  return (
    <>
      <DemoBanner />
      <Header rolle="agentur" name={agentur.name} />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/agentur" className="text-sm text-brand-600 hover:underline">
          ← Zur Übersicht
        </Link>

        {/* Seitentitel */}
        <div className="mt-6 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-display text-2xl font-extrabold text-ink">Markt-Radar</h1>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-600 text-white text-xs font-bold">
              {sofortCount}
            </span>
          </div>
          <p className="text-muted mt-1 max-w-2xl">
            Datenbasierte Signale für proaktive Kundengewinnung. Nicht wer inseriert — sondern
            wer feststeckt und wer wächst.
          </p>
        </div>

        {/* Erklärungs-Banner */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              titel: "Veraltete Inserate",
              text: "Externe Stellen die 6+ Wochen offen sind. Die Firma hat's selbst versucht — jetzt ist sie offen für eine Agentur.",
              aktiv: activeTab === "stale",
            },
            {
              titel: "Kandidaten-Abgänge",
              text: "Wenn ein Kandidat eine Firma verlässt, hat diese Firma eine Lücke. Noch nirgends inseriert — Sie wissen es als erste.",
              aktiv: activeTab === "abgang",
            },
            {
              titel: "Wachstumssignale",
              text: "SHAB, Zefix, simap.ch: Neugründungen, Kapitalerhöhungen, gewonnene Aufträge — Firmen die sofort Personal brauchen.",
              aktiv: activeTab === "wachstum",
            },
          ].map((k) => (
            <div
              key={k.titel}
              className={`rounded-xl border p-4 transition-colors ${
                k.aktiv ? "border-brand-200 bg-brand-50" : "border-slate-200 bg-white"
              }`}
            >
              <p className={`text-sm font-semibold mb-1 ${k.aktiv ? "text-brand-700" : "text-ink"}`}>
                {k.titel}
              </p>
              <p className="text-xs text-muted leading-relaxed">{k.text}</p>
            </div>
          ))}
        </div>

        {/* Hinweis-Banner */}
        {hinweis && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-6 flex items-start justify-between gap-3">
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

        {/* Tab-Bar */}
        <div className="flex gap-1 border-b border-slate-200 mb-6">
          {tabs.map((tab) => {
            const urgentCount = tab.signals.filter((s) => s.prioritaet === 1).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-3 text-sm border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "border-brand-600 text-ink font-semibold"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {tab.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                    activeTab === tab.id
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tab.signals.length}
                  {urgentCount > 0 && (
                    <span className={activeTab === tab.id ? "" : " text-brand-600"}>
                      {" "}·{" "}{urgentCount} dringend
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

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
      </main>

      <Footer />
    </>
  );
}
