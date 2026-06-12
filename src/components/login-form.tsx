"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zugangPruefen } from "@/lib/gate-actions";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [passwort, setPasswort] = useState("");
  const [fehler, setFehler] = useState<string | null>(null);
  const [istAmPruefen, startUebergang] = useTransition();

  function absenden(e: React.FormEvent) {
    e.preventDefault();
    setFehler(null);
    startUebergang(async () => {
      const res = await zugangPruefen(passwort);
      if (!res.ok) {
        setFehler(res.fehler);
        return;
      }
      const weiter = params.get("weiter") || "/";
      router.replace(weiter);
      router.refresh();
    });
  }

  return (
    <form onSubmit={absenden} className="space-y-4">
      <div>
        <label htmlFor="passwort" className="block text-sm font-medium text-slate-700 mb-1.5">
          Passwort
        </label>
        <input
          id="passwort"
          type="password"
          autoFocus
          value={passwort}
          onChange={(e) => setPasswort(e.target.value)}
          placeholder="Zugangspasswort eingeben"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {fehler && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {fehler}
        </p>
      )}

      <button
        type="submit"
        disabled={istAmPruefen}
        className="w-full px-5 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition disabled:opacity-60"
      >
        {istAmPruefen ? "Wird geprüft…" : "Zugang freischalten"}
      </button>
    </form>
  );
}
