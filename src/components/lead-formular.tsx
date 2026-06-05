"use client";

import { useState } from "react";

// Demo-Lead-Formular für die Frühbucher-Warteliste.
// Speichert nichts – zeigt nach Absenden eine Bestätigung.
export function LeadFormular() {
  const [gesendet, setGesendet] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rolle, setRolle] = useState("Firma");

  if (gesendet) {
    return (
      <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md mx-auto">
        <div className="text-4xl">🎉</div>
        <h3 className="text-xl font-bold text-white mt-3">Vielen Dank, {name}!</h3>
        <p className="text-brand-50 mt-2 text-sm">
          Sie stehen auf der Frühbucher-Liste. Wir melden uns unter {email}, sobald TempMatch
          startet.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setGesendet(true);
      }}
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
        <option>Ich bin eine Firma</option>
        <option>Ich bin ein Vermittlungsbüro</option>
      </select>
      <button
        type="submit"
        className="w-full px-5 py-3 rounded-lg bg-white text-brand-700 font-semibold hover:bg-brand-50 transition"
      >
        Auf die Frühbucher-Liste
      </button>
    </form>
  );
}
