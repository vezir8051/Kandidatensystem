"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { KANTONE, BERUF_VORSCHLAEGE } from "@/lib/kantone";

// Such-Leiste auf der Startseite (Airbnb-Stil): Beruf frei eingeben,
// Ort aus allen Kantonen wählen – führt mit den Werten in die Inserat-Übersicht.
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
      className="group mt-10 inline-flex items-center bg-white border border-slate-200 rounded-full shadow-soft hover:shadow-card transition-shadow overflow-hidden text-left"
    >
      <label className="px-6 py-3 border-r border-slate-200 flex flex-col cursor-text">
        <span className="block text-xs font-medium text-ink">Beruf</span>
        <input
          list="beruf-vorschlaege"
          value={beruf}
          onChange={(e) => setBeruf(e.target.value)}
          placeholder="z.B. Maler, Koch …"
          className="block text-sm text-ink placeholder:text-muted bg-transparent focus:outline-none w-36 sm:w-40"
        />
        <datalist id="beruf-vorschlaege">
          {BERUF_VORSCHLAEGE.map((b) => (
            <option key={b} value={b} />
          ))}
        </datalist>
      </label>

      <label className="px-6 py-3 border-r border-slate-200 hidden sm:flex flex-col cursor-pointer">
        <span className="block text-xs font-medium text-ink">Ort</span>
        <select
          value={ort}
          onChange={(e) => setOrt(e.target.value)}
          className="block text-sm bg-transparent focus:outline-none w-40 -ml-0.5 text-ink"
        >
          <option value="">Ganze Schweiz</option>
          {KANTONE.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" className="pl-5 pr-2 py-2 flex items-center gap-2">
        <span className="hidden sm:block text-sm font-medium text-ink">Inserate ansehen</span>
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-600 text-white group-hover:bg-brand-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </span>
      </button>
    </form>
  );
}
