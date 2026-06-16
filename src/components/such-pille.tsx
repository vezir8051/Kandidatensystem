"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { KANTONE, BERUF_VORSCHLAEGE } from "@/lib/kantone";

// Breite Suchleiste auf der Startseite (Jobwish-Stil): Berufsfeld + Ort,
// Pink-Verlauf-Button. Führt mit den Werten in die Inserat-Übersicht.
export function SuchPille() {
  const router = useRouter();
  const [beruf, setBeruf] = useState("");
  const [ort, setOrt] = useState("");

  function suchen(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (beruf.trim()) params.set("beruf", beruf.trim());
    if (ort) params.set("ort", ort);
    const qs = params.toString();
    router.push(qs ? `/agentur?${qs}` : "/agentur");
  }

  return (
    <form
      onSubmit={suchen}
      className="mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-3xl bg-white p-2 shadow-card sm:flex-row sm:items-center sm:rounded-full sm:gap-0"
    >
      {/* Berufsfeld */}
      <label className="flex flex-1 items-center gap-2 px-5 py-2.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a99b5" strokeWidth="2" className="shrink-0">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          list="beruf-vorschlaege"
          value={beruf}
          onChange={(e) => setBeruf(e.target.value)}
          placeholder="Berufsfeld – z.B. Maler, Koch"
          className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
        />
        <datalist id="beruf-vorschlaege">
          {BERUF_VORSCHLAEGE.map((b) => (
            <option key={b} value={b} />
          ))}
        </datalist>
      </label>

      <span className="hidden h-7 w-px bg-slate-200 sm:block" />

      {/* Ort / Kanton */}
      <label className="flex flex-1 items-center gap-2 px-5 py-2.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a99b5" strokeWidth="2" className="shrink-0">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" />
        </svg>
        <select
          value={ort}
          onChange={(e) => setOrt(e.target.value)}
          className="w-full bg-transparent text-sm text-ink focus:outline-none"
        >
          <option value="">Ganze Schweiz</option>
          {KANTONE.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" className="btn-cta px-7 py-3 text-sm">
        Suchen
      </button>
    </form>
  );
}
