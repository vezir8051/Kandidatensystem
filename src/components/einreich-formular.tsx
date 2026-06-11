"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { kandidatEinreichen } from "@/lib/actions";

export function EinreichFormular({
  inseratId,
  beruf,
  inseratTitel,
}: {
  inseratId: string;
  beruf: string;
  inseratTitel: string;
}) {
  const router = useRouter();
  const [istAmSpeichern, startUebergang] = useTransition();
  const [abgeschickt, setAbgeschickt] = useState(false);
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [verfuegbarBis, setVerfuegbarBis] = useState("");
  const [einverstaendnis, setEinverstaendnis] = useState(false);
  const [wahrheit, setWahrheit] = useState(false);
  const [erreichbar, setErreichbar] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  function absenden(e: React.FormEvent<HTMLFormElement>) {
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

    const fd = new FormData(e.currentTarget);
    const erfahrungRoh = (fd.get("erfahrungJahre") as string) || "";
    startUebergang(async () => {
      const res = await kandidatEinreichen({
        inseratId,
        vorname: vorname.trim(),
        nachname: nachname.trim(),
        beruf: ((fd.get("beruf") as string) || beruf).trim(),
        erfahrungJahre: erfahrungRoh ? Number(erfahrungRoh) : 0,
        qualifikationen: (fd.get("qualifikationen") as string) || "",
        verfuegbarAb: (fd.get("verfuegbarAb") as string) || "",
        verfuegbarBis,
        telefon: (fd.get("telefon") as string) || "",
        email: (fd.get("email") as string) || "",
        fruehererArbeitgeber: (fd.get("fruehererArbeitgeber") as string) || "",
        notiz: (fd.get("notiz") as string) || "",
        consentNdsg: einverstaendnis,
        consentWahrheit: wahrheit,
        consentErreichbar: erreichbar,
      });
      if (!res.ok) {
        setFehler(res.fehler);
        return;
      }
      setAbgeschickt(true);
      router.refresh();
    });
  }

  if (abgeschickt) {
    return (
      <div className="bg-white rounded-xl border border-emerald-200 p-8 mt-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
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
          className="inline-block mt-6 px-6 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
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
            name="vorname"
            value={vorname}
            onChange={(e) => setVorname(e.target.value)}
            placeholder="z.B. Andreas"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Nachname *</label>
          <input
            name="nachname"
            value={nachname}
            onChange={(e) => setNachname(e.target.value)}
            placeholder="z.B. Huber"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="beruf" label="Beruf" placeholder={beruf} defaultValue={beruf} />
        <Field name="erfahrungJahre" label="Jahre Erfahrung" placeholder="z.B. 8" type="number" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="verfuegbarAb" label="Verfügbar ab" type="date" />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Verfügbar bis *
          </label>
          <input
            type="date"
            value={verfuegbarBis}
            onChange={(e) => setVerfuegbarBis(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <p className="text-xs text-slate-400 mt-1">
            Datum, bis zu dem der Kandidat garantiert verfügbar und erreichbar ist.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Qualifikationen</label>
        <input
          name="qualifikationen"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          placeholder="z.B. EFZ Maler, Gerüstbau, Fahrausweis (mit Komma getrennt)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Früherer Arbeitgeber
        </label>
        <input
          name="fruehererArbeitgeber"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          placeholder="z.B. Malerei Muster AG, Zürich"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Telefon Kandidat
          </label>
          <input
            name="telefon"
            type="tel"
            placeholder="z.B. +41 79 123 45 67"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            E-Mail Kandidat
          </label>
          <input
            name="email"
            type="email"
            placeholder="z.B. kandidat@example.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
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
          name="notiz"
          rows={3}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          placeholder="Kurze Beschreibung, warum dieser Kandidat passt."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Lebenslauf (PDF)</label>
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center text-sm text-slate-500">
          PDF hierher ziehen oder klicken zum Hochladen
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
        disabled={istAmSpeichern}
        className="w-full px-5 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors disabled:opacity-50"
      >
        {istAmSpeichern ? "Wird eingereicht…" : "Kandidat einreichen"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  defaultValue,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
    </div>
  );
}
