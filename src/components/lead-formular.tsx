"use client";

import { useState, useTransition } from "react";
import { leadSpeichern } from "@/lib/actions";

// Lead-Formular für die Frühbucher-Warteliste.
// Speichert den Eintrag in der Datenbank (Lead-Tabelle).
export function LeadFormular() {
  const [istAmSpeichern, startUebergang] = useTransition();
  const [gesendet, setGesendet] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rolle, setRolle] = useState("Firma");
  const [fehler, setFehler] = useState<string | null>(null);

  function absenden(e: React.FormEvent) {
    e.preventDefault();
    setFehler(null);
    startUebergang(async () => {
      const res = await leadSpeichern({ name: name.trim(), email: email.trim(), rolle });
      if (!res.ok) {
        setFehler(res.fehler);
        return;
      }
      setGesendet(true);
    });
  }

  if (gesendet) {
    return (
      <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md mx-auto">
        <h3 className="text-xl font-bold text-white">Vielen Dank, {name}!</h3>
        <p className="text-brand-50 mt-2 text-sm">
          Sie stehen auf der Frühbucher-Liste. Wir melden uns unter {email}, sobald TempMatch
          startet.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={absenden}
      className="bg-white/10 backdrop-blur rounded-2xl p-6 max-w-md mx-auto space-y-3"
    >
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ihr Name"
        className="w-full rounded-lg border border-white/30 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
      />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-Mail-Adresse"
        className="w-full rounded-lg border border-white/30 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
      />
      <select
        value={rolle}
        onChange={(e) => setRolle(e.target.value)}
        className="w-full rounded-lg border border-white/30 bg-white/90 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <option value="Firma">Ich bin eine Firma</option>
        <option value="Vermittlungsbüro">Ich bin ein Vermittlungsbüro</option>
      </select>
      {fehler && (
        <p className="text-sm text-white bg-red-500/80 rounded-lg px-3 py-2">{fehler}</p>
      )}
      <button
        type="submit"
        disabled={istAmSpeichern}
        className="w-full px-5 py-3 rounded-lg bg-white text-brand-700 font-semibold hover:bg-brand-50 transition disabled:opacity-60"
      >
        {istAmSpeichern ? "Wird gespeichert…" : "Auf die Frühbucher-Liste"}
      </button>
    </form>
  );
}
