"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DemoBanner, Header, Footer, InseratBadge } from "@/components/ui";
import {
  agenturen,
  getFirma,
  inserate,
  getEingereichtVonAgentur,
} from "@/lib/demo-data";

function formatDatum(iso: string): string {
  return new Date(iso).toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function AgenturDashboard() {
  const [agenturId, setAgenturId] = useState(agenturen[0].id);
  const [berufFilter, setBerufFilter] = useState("");
  const [ortFilter, setOrtFilter] = useState("");

  const agentur = agenturen.find((a) => a.id === agenturId)!;
  const offeneInserate = inserate.filter((i) => i.status === "OFFEN");

  // Filterwerte aus den offenen Inseraten ableiten.
  const berufe = useMemo(
    () => Array.from(new Set(offeneInserate.map((i) => i.beruf))).sort(),
    [offeneInserate],
  );
  const orte = useMemo(
    () => Array.from(new Set(offeneInserate.map((i) => i.ort))).sort(),
    [offeneInserate],
  );

  const gefiltert = offeneInserate.filter(
    (i) =>
      (berufFilter === "" || i.beruf === berufFilter) &&
      (ortFilter === "" || i.ort === ortFilter),
  );

  return (
    <>
      <DemoBanner />
      <Header rolle="agentur" name={agentur.name} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{agentur.name}</h1>
            <p className="text-slate-500 mt-1">
              {agentur.ort} · Ansprechperson: {agentur.kontaktperson}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/agentur/radar"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              Markt-Radar
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-600 text-white text-xs font-bold">
                4
              </span>
            </Link>
            {/* Demo-Umschalter zwischen den Agenturen */}
            <div>
              <label className="block text-xs text-slate-400 mb-1">Demo: Agentur wechseln</label>
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

        {/* Abo-Status */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-medium text-emerald-900">
                Abonnement aktiv – Starter (29 CHF/Monat)
              </p>
              <p className="text-sm text-emerald-700">
                Sie können Kandidaten für alle offenen Inserate einreichen.
              </p>
            </div>
          </div>
          <span className="text-sm text-emerald-700">Nächste Abrechnung: 01.07.2026</span>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-end gap-3 mb-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Beruf</label>
            <select
              value={berufFilter}
              onChange={(e) => setBerufFilter(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Alle Berufe</option>
              {berufe.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Ort</label>
            <select
              value={ortFilter}
              onChange={(e) => setOrtFilter(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Alle Orte</option>
              {orte.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          {(berufFilter || ortFilter) && (
            <button
              onClick={() => {
                setBerufFilter("");
                setOrtFilter("");
              }}
              className="text-sm text-slate-500 hover:text-slate-700 underline pb-2"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>

        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Offene Inserate ({gefiltert.length})
        </h2>

        {gefiltert.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center">
              <p className="text-slate-600 font-medium">Keine Inserate gefunden</p>
            <p className="text-sm text-slate-400 mt-1">
              Passen Sie die Filter an, um mehr Inserate zu sehen.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {gefiltert.map((inserat) => {
              const firma = getFirma(inserat.firmaId);
              const bereitsEingereicht = getEingereichtVonAgentur(agenturId, inserat.id);
              return (
                <div
                  key={inserat.id}
                  className="bg-white rounded-2xl border border-slate-100 p-5 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-slate-900">{inserat.titel}</h3>
                        <InseratBadge status={inserat.status} />
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {firma?.name} · {firma?.branche}
                      </p>
                      <p className="text-sm text-slate-600 mt-2">{inserat.beschreibung}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-slate-500">
                        <span>{inserat.ort}</span>
                        <span>Start: {formatDatum(inserat.startDatum)}</span>
                        <span>{inserat.dauer}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {bereitsEingereicht ? (
                        <div className="text-sm">
                          <span className="inline-block px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 font-medium">
                            ✓ Kandidat eingereicht
                          </span>
                          <p className="text-xs text-slate-400 mt-1">
                            {bereitsEingereicht.vorname} {bereitsEingereicht.nachname}
                          </p>
                        </div>
                      ) : (
                        <Link
                          href={`/agentur/inserat/${inserat.id}`}
                          className="inline-block px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
                        >
                          Kandidat einreichen →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
