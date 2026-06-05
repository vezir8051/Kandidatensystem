"use client";

import { useState } from "react";

// Demo: "Neues Inserat erstellen" öffnet ein Modal-Formular.
// Nach Absenden erscheint eine Bestätigung (kein echtes Backend).
export function InseratErstellenButton() {
  const [offen, setOffen] = useState(false);
  const [fertig, setFertig] = useState(false);
  const [titel, setTitel] = useState("");

  function schliessen() {
    setOffen(false);
    setFertig(false);
    setTitel("");
  }

  return (
    <>
      <button
        onClick={() => setOffen(true)}
        className="px-5 py-2.5 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition"
      >
        + Neues Inserat erstellen
      </button>

      {offen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
            {fertig ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 text-2xl flex items-center justify-center mx-auto">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-3">Inserat veröffentlicht!</h3>
                <p className="text-slate-600 mt-1 text-sm">
                  „{titel || "Ihr Inserat"}" ist jetzt für alle Agenturen sichtbar. Sie erhalten
                  eine E-Mail, sobald Kandidaten eingereicht werden.
                </p>
                <button
                  onClick={schliessen}
                  className="mt-5 px-6 py-2.5 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition"
                >
                  Schliessen
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFertig(true);
                }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Neues Inserat</h3>
                  <button
                    type="button"
                    onClick={schliessen}
                    className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
                    aria-label="Schliessen"
                  >
                    ×
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Titel des Inserats *
                  </label>
                  <input
                    required
                    value={titel}
                    onChange={(e) => setTitel(e.target.value)}
                    placeholder="z.B. Maler für Renovationsprojekt gesucht"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Beruf</label>
                    <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                      <option>Maler</option>
                      <option>Schreiner</option>
                      <option>Lagerist</option>
                      <option>Koch</option>
                      <option>Elektriker</option>
                      <option>Reinigungskraft</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Ort</label>
                    <input
                      placeholder="z.B. Zürich"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Beschreibung
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Beschreiben Sie die Tätigkeit und die Anforderungen."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-5 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition"
                >
                  Inserat veröffentlichen
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
