"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { KandidatBadge } from "@/components/ui";
import { kandidatAuswaehlen, kandidatAblehnen, kandidatMelden } from "@/lib/actions";
import type { Kandidat, KandidatStatus, Agentur } from "@/lib/demo-data";

function formatDatum(iso: string): string {
  return new Date(iso).toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function isAbgelaufen(iso: string): boolean {
  return new Date(iso) < new Date();
}

export function KandidatenListe({
  kandidaten,
  agenturen,
}: {
  kandidaten: Kandidat[];
  agenturen: Record<string, Agentur | undefined>;
}) {
  const router = useRouter();
  const [istAmSpeichern, startUebergang] = useTransition();
  const [stati, setStati] = useState<Record<string, KandidatStatus>>(
    Object.fromEntries(kandidaten.map((k) => [k.id, k.status])),
  );
  const [meldung, setMeldung] = useState<string | null>(null);
  const [gemeldet, setGemeldet] = useState<string | null>(null);

  const ausgewaehlteId = Object.entries(stati).find(([, s]) => s === "AUSGEWAEHLT")?.[0] ?? null;

  function auswaehlen(k: Kandidat) {
    // Optimistisches UI-Update; danach in der Datenbank persistieren.
    setStati((prev) => {
      const next: Record<string, KandidatStatus> = { ...prev };
      for (const kand of kandidaten) {
        next[kand.id] = kand.id === k.id ? "AUSGEWAEHLT" : "ABGELEHNT";
      }
      return next;
    });
    setMeldung(
      `✓ ${k.vorname} ${k.nachname} wurde ausgewählt. Die Agentur wurde benachrichtigt.`,
    );
    startUebergang(async () => {
      const res = await kandidatAuswaehlen(k.id);
      if (!res.ok) setMeldung(res.fehler);
      router.refresh();
    });
  }

  function ablehnen(k: Kandidat) {
    setStati((prev) => ({ ...prev, [k.id]: "ABGELEHNT" }));
    setMeldung(`${k.vorname} ${k.nachname} wurde nicht berücksichtigt.`);
    startUebergang(async () => {
      const res = await kandidatAblehnen(k.id);
      if (!res.ok) setMeldung(res.fehler);
      router.refresh();
    });
  }

  function melden(k: Kandidat) {
    const grund = window.prompt(
      `Warum möchten Sie ${k.vorname} ${k.nachname} melden?\n(z.B. falsche Angaben, nicht erreichbar)`,
    );
    if (grund === null) return; // Abbruch
    if (!grund.trim()) {
      setMeldung("Bitte einen Grund für die Meldung angeben.");
      return;
    }
    setGemeldet(k.id);
    startUebergang(async () => {
      const res = await kandidatMelden(k.id, grund.trim());
      if (!res.ok) {
        setGemeldet(null);
        setMeldung(res.fehler);
        return;
      }
      setMeldung(`Meldung für ${k.vorname} ${k.nachname} wurde an das Admin-Team übermittelt.`);
    });
  }

  if (kandidaten.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
        <p className="text-body font-medium">Noch keine Kandidaten eingereicht</p>
        <p className="text-sm text-muted mt-1">
          Sobald Agenturen Kandidaten einreichen, erscheinen sie hier.
        </p>
      </div>
    );
  }

  return (
    <>
      {meldung && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-4 mb-4 flex items-center justify-between gap-3">
          <span className="text-sm font-medium">{meldung}</span>
          <button
            onClick={() => setMeldung(null)}
            className="text-emerald-600 hover:text-emerald-800 text-lg leading-none"
            aria-label="Schliessen"
          >
            ×
          </button>
        </div>
      )}

      {ausgewaehlteId && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 mb-4 text-sm">
          <strong>Hinweis:</strong> Bitte wickeln Sie den Einsatz über die Agentur ab. Direktkontakt
          mit dem Kandidaten unter Umgehung der Agentur ist gemäss AGB untersagt und kann zur
          Sperrung Ihres Kontos führen.
        </div>
      )}

      <div className="space-y-4">
        {kandidaten.map((k) => {
          const status = stati[k.id];
          const agentur = agenturen[k.agenturId];
          const istAusgewaehlt = status === "AUSGEWAEHLT";
          const verfuegbarAbgelaufen = k.verfuegbarBis ? isAbgelaufen(k.verfuegbarBis) : false;

          return (
            <div
              key={k.id}
              className={`bg-white rounded-2xl border p-5 shadow-soft transition ${
                istAusgewaehlt
                  ? "border-emerald-300 ring-1 ring-emerald-200"
                  : status === "ABGELEHNT"
                    ? "border-slate-100 opacity-60"
                    : "border-slate-100"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display font-bold text-brand-600">
                    {(k.vorname[0] ?? "") + (k.nachname[0] ?? "")}
                  </span>
                  <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-ink">
                      {k.vorname} {k.nachname}
                    </h3>
                    <KandidatBadge status={status} />
                  </div>
                  <p className="text-sm text-muted mt-0.5">
                    {k.beruf} · {k.erfahrungJahre} Jahre Erfahrung · verfügbar ab{" "}
                    {formatDatum(k.verfuegbarAb)}
                  </p>
                  {k.verfuegbarBis && (
                    <p className={`text-xs mt-0.5 ${verfuegbarAbgelaufen ? "text-red-600 font-medium" : "text-slate-400"}`}>
                      {verfuegbarAbgelaufen
                        ? "Verfügbarkeit prüfen – garantierte Verfügbarkeit bis " + formatDatum(k.verfuegbarBis) + " abgelaufen"
                        : "Verfügbar bis: " + formatDatum(k.verfuegbarBis)}
                    </p>
                  )}
                  {k.fruehererArbeitgeber && (
                    <p className="text-xs text-muted mt-1">
                      Früherer Arbeitgeber: {k.fruehererArbeitgeber}
                    </p>
                  )}
                  <p className="text-xs text-muted mt-1">
                    Eingereicht von: {agentur?.name}
                  </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {status === "AUSSTEHEND" && (
                    <>
                      <button
                        onClick={() => auswaehlen(k)}
                        disabled={istAmSpeichern}
                        className="btn-cta px-5 py-2 text-sm disabled:opacity-50"
                      >
                        Auswählen
                      </button>
                      <button
                        onClick={() => ablehnen(k)}
                        disabled={istAmSpeichern}
                        className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition disabled:opacity-50"
                      >
                        Ablehnen
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Qualifikationen:</p>
                <ul className="flex flex-wrap gap-2">
                  {k.qualifikationen.map((q) => (
                    <li
                      key={q}
                      className="text-xs bg-brand-50 text-brand-700 px-3 py-1 rounded-full"
                    >
                      {q}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-slate-600 mt-4 italic border-l-2 border-slate-200 pl-3">
                „{k.notiz}"
              </p>

              {istAusgewaehlt && (k.telefon || k.email) && (
                <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
                  <p className="text-xs font-semibold text-emerald-700 mb-2">
                    Kontaktdaten freigegeben
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-700">
                    {k.telefon && (
                      <span>Tel. {k.telefon}</span>
                    )}
                    {k.email && (
                      <span>{k.email}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Bitte nehmen Sie den Kontakt ausschliesslich über die Agentur auf.
                  </p>
                </div>
              )}

              <div className="mt-4 flex items-center gap-4">
                {k.hatCv ? (
                  <a
                    href={`/api/kandidat/${k.id}/cv`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-brand-600 hover:underline"
                  >
                    Lebenslauf (PDF) ansehen
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm text-slate-400">
                    Kein Lebenslauf hochgeladen
                  </span>
                )}
                {gemeldet !== k.id && (
                  <button
                    onClick={() => melden(k)}
                    className="text-xs text-slate-400 hover:text-red-500 transition"
                  >
                    Kandidat melden
                  </button>
                )}
                {gemeldet === k.id && (
                  <span className="text-xs text-slate-400">✓ Gemeldet</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
