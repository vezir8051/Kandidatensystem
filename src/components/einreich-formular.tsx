"use client";

import Link from "next/link";
import { useState } from "react";

export function EinreichFormular({
  beruf,
  inseratTitel,
}: {
  beruf: string;
  inseratTitel: string;
}) {
  const [abgeschickt, setAbgeschickt] = useState(false);
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [verfuegbarBis, setVerfuegbarBis] = useState("");
  const [einverstaendnis, setEinverstaendnis] = useState(false);
  const [wahrheit, setWahrheit] = useState(false);
  const [erreichbar, setErreichbar] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  function absenden(e: React.FormEvent) {
    e.preventDefault();
    if (!vorname.trim() || !nachname.trim()) {
      setFehler("Bitte Vor- und Nachname ausfüllen.");
      return;
    }
    if (!verfuegbarBis) {
      setFehler("Bitte das Datum angeben, bis wann der Kandidat verfügbar ist.");
      return;
    }
    if (!einverstaendnis || !wahrheit || !erreichbar) {
      setFehler("Bitte alle drei Bestätigungen ankreuzen.");
      return;
    }
    setFehler(null);
    setAbgeschickt(true);
  }

  if (abgeschickt) {
    return (
      <div className="bg-white rounded-xl border border-emerald-200 p-8 mt-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl flex items-center justify-center mx-auto">
          ✓
        </div>
        <h2 className="text-xl font-bold text-slate-900 mt-4">Kandidat eingereicht!</h2>
        <p className="text-slate-600 mt-2 max-w-md mx-auto">
          <strong>
            {vorname} {nachname}
          </strong>{" "}
          wurde für das Inserat „{inseratTitel}" eingereicht. Die Firma erhält eine
          Benachrichtigung und meldet sich bei Auswahl direkt bei Ihnen.
        </p>
        <Link
          href="/agentur"
          className="inline-block mt-6 px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
        >
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={absenden}
      className="bg-white rounded-2xl border border-slate-100 p-6 mt-6 space-y-5 shadow-soft"
    >
      <h2 className="font-semibold text-slate-900">Kandidat einreichen</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Vorname *</label>
          <input
            value={vorname}
            onChange={(e) => setVorname(e.target.value)}
            placeholder="z.B. Andreas"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Nachname *</label>
          <input
            value={nachname}
            onChange={(e) => setNachname(e.target.value)}
            placeholder="z.B. Huber"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Beruf" placeholder={beruf} />
        <Field label="Jahre Erfahrung" placeholder="z.B. 8" type="number" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Verfügbar ab" type="date" />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Verfügbar bis *
          </label>
          <input
            type="date"
            value={verfuegbarBis}
            onChange={(e) => setVerfuegbarBis(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <p className="text-xs text-slate-400 mt-1">
            Datum, bis zu dem der Kandidat garantiert verfügbar und erreichbar ist.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Qualifikationen</label>
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="z.B. EFZ Maler, Gerüstbau, Fahrausweis (mit Komma getrennt)"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Telefon Kandidat
          </label>
          <input
            type="tel"
            placeholder="z.B. +41 79 123 45 67"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            E-Mail Kandidat
          </label>
          <input
            type="email"
            placeholder="z.B. kandidat@example.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
      <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 -mt-2">
        Kontaktdaten werden der Firma erst dann freigegeben, wenn sie diesen Kandidaten auswählt.
      </p>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Notiz für die Firma
        </label>
        <textarea
          rows={3}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Kurze Beschreibung, warum dieser Kandidat passt."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Lebenslauf (PDF)</label>
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center text-sm text-slate-500">
          📄 PDF hierher ziehen oder klicken zum Hochladen
        </div>
      </div>

      <div className="space-y-3 border border-slate-200 rounded-lg p-4 bg-slate-50">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Pflichtbestätigungen
        </p>
        <label className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={einverstaendnis}
            onChange={(e) => setEinverstaendnis(e.target.checked)}
            className="rounded mt-0.5"
          />
          <span>
            Der Kandidat hat sein ausdrückliches Einverständnis zur Weitergabe seiner Daten an
            die Firma erteilt (nDSG). Ich bestätige, dass ich als Agentur datenschutzrechtlich
            verantwortlich bin.
          </span>
        </label>
        <label className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={wahrheit}
            onChange={(e) => setWahrheit(e.target.checked)}
            className="rounded mt-0.5"
          />
          <span>
            Alle Angaben zu diesem Kandidaten (Qualifikationen, Zertifikate, Berufserfahrung)
            sind wahrheitsgetreu und vollständig.
          </span>
        </label>
        <label className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={erreichbar}
            onChange={(e) => setErreichbar(e.target.checked)}
            className="rounded mt-0.5"
          />
          <span>
            Der Kandidat ist verfügbar und bis zum angegebenen Datum kontaktierbar. Ich garantiere
            seine Erreichbarkeit nach einer allfälligen Auswahl durch die Firma.
          </span>
        </label>
      </div>

      {fehler && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {fehler}
        </p>
      )}

      <button
        type="submit"
        className="w-full px-5 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
      >
        Kandidat einreichen
      </button>
    </form>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}
