"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { inseratErstellen } from "@/lib/actions";

// "Neues Inserat erstellen" öffnet ein Modal-Formular und legt das Inserat
// nach dem Absenden in der Datenbank an.
export function InseratErstellenButton() {
  const router = useRouter();
  const [istAmSpeichern, startUebergang] = useTransition();
  const [offen, setOffen] = useState(false);
  const [fertig, setFertig] = useState(false);
  const [titel, setTitel] = useState("");
  const [festanstellung, setFestanstellung] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  function schliessen() {
    setOffen(false);
    setFertig(false);
    setTitel("");
    setFestanstellung(false);
    setFehler(null);
  }

  function absenden(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFehler(null);
    const fd = new FormData(e.currentTarget);
    startUebergang(async () => {
      const res = await inseratErstellen({
        titel: titel.trim(),
        beruf: (fd.get("beruf") as string) || "Maler",
        ort: (fd.get("ort") as string) || "",
        beschreibung: (fd.get("beschreibung") as string) || "",
        festanstellungMoeglich: festanstellung,
      });
      if (!res.ok) {
        setFehler(res.fehler);
        return;
      }
      setFertig(true);
      router.refresh();
    });
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
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
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
              <form onSubmit={absenden} className="space-y-4">
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
                    <select
                      name="beruf"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
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
                      name="ort"
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
                    name="beschreibung"
                    rows={3}
                    placeholder="Beschreiben Sie die Tätigkeit und die Anforderungen."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <label className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={festanstellung}
                    onChange={(e) => setFestanstellung(e.target.checked)}
                    className="rounded mt-0.5"
                  />
                  <span>
                    Festanstellung des Kandidaten möglich (gegen Vermittlungsgebühr, bilateral vereinbart)
                  </span>
                </label>

                <p className="text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                  Inserate ohne Auswahl werden nach <strong>30 Tagen</strong> automatisch archiviert.
                  Sie erhalten vorher eine Erinnerung.
                </p>

                {fehler && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {fehler}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={istAmSpeichern}
                  className="w-full px-5 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition disabled:opacity-50"
                >
                  {istAmSpeichern ? "Wird veröffentlicht…" : "Inserat veröffentlichen"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
