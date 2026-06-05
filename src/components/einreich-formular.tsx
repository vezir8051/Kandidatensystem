"use client";

import Link from "next/link";
import { useState } from "react";

// Demo-Formular: validiert lokal und zeigt nach Absenden eine Bestätigung.
// In der Vollversion würde hier ein echter API-Call erfolgen.
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
  const [einverstanden, setEinverstanden] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  function absenden(e: React.FormEvent) {
    e.preventDefault();
    if (!vorname.trim() || !nachname.trim()) {
      setFehler("Bitte Vor- und Nachname ausfüllen.");
      return;
    }
    if (!einverstanden) {
      setFehler("Bitte bestätigen Sie das Einverständnis des Kandidaten (nDSG).");
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
      className="bg-white rounded-xl border border-slate-200 p-6 mt-6 space-y-5"
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

      <Field label="Verfügbar ab" type="date" />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Qualifikationen</label>
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="z.B. EFZ Maler, Gerüstbau, Fahrausweis (mit Komma getrennt)"
        />
      </div>

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

      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
        <input
          type="checkbox"
          checked={einverstanden}
          onChange={(e) => setEinverstanden(e.target.checked)}
          className="rounded"
        />
        <span>
          Der Kandidat hat sein Einverständnis zur Weitergabe seiner Daten gegeben (nDSG).
        </span>
      </label>

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
