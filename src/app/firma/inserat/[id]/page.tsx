import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBanner, Header, Footer, InseratBadge, KandidatBadge } from "@/components/ui";
import {
  getInserat,
  getKandidatenFuerInserat,
  getAgentur,
  inserate,
} from "@/lib/demo-data";

export function generateStaticParams() {
  return inserate.map((i) => ({ id: i.id }));
}

export default function InseratDetail({ params }: { params: { id: string } }) {
  const inserat = getInserat(params.id);
  if (!inserat) notFound();

  const kandidaten = getKandidatenFuerInserat(inserat.id);

  return (
    <>
      <DemoBanner />
      <Header rolle="firma" />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/firma" className="text-sm text-brand-600 hover:underline">
          ← Zurück zur Übersicht
        </Link>

        {/* Inserat-Kopf */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mt-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-slate-900">{inserat.titel}</h1>
            <InseratBadge status={inserat.status} />
          </div>
          <p className="text-slate-600 mt-3">{inserat.beschreibung}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-slate-500">
            <span>📍 {inserat.ort}</span>
            <span>📅 Start: {formatDatum(inserat.startDatum)}</span>
            <span>⏱️ Dauer: {inserat.dauer}</span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-700 mb-2">Anforderungen:</p>
            <ul className="flex flex-wrap gap-2">
              {inserat.anforderungen.map((a) => (
                <li
                  key={a}
                  className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Kandidaten */}
        <h2 className="text-lg font-semibold text-slate-900 mt-10 mb-4">
          Eingereichte Kandidaten ({kandidaten.length})
        </h2>

        {kandidaten.length === 0 ? (
          <p className="text-slate-500 bg-white rounded-xl border border-slate-200 p-6">
            Noch keine Kandidaten eingereicht.
          </p>
        ) : (
          <div className="space-y-4">
            {kandidaten.map((k) => {
              const agentur = getAgentur(k.agenturId);
              return (
                <div
                  key={k.id}
                  className={`bg-white rounded-xl border p-5 ${
                    k.status === "AUSGEWAEHLT"
                      ? "border-emerald-300 ring-1 ring-emerald-200"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-slate-900">
                          {k.vorname} {k.nachname}
                        </h3>
                        <KandidatBadge status={k.status} />
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {k.beruf} · {k.erfahrungJahre} Jahre Erfahrung · verfügbar ab{" "}
                        {formatDatum(k.verfuegbarAb)}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Eingereicht von: {agentur?.name}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {k.status === "AUSSTEHEND" && (
                        <>
                          <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition cursor-not-allowed opacity-90">
                            Auswählen
                          </button>
                          <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition cursor-not-allowed opacity-90">
                            Ablehnen
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Qualifikationen:</p>
                    <ul className="flex flex-wrap gap-2">
                      {k.qualifikationen.map((q) => (
                        <li
                          key={q}
                          className="text-xs bg-brand-50 text-brand-700 px-3 py-1 rounded-full"
                        >
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-sm text-slate-600 mt-4 italic border-l-2 border-slate-200 pl-3">
                    „{k.notiz}"
                  </p>

                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1 text-sm text-brand-600 cursor-not-allowed">
                      📄 Lebenslauf (PDF) ansehen
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

function formatDatum(iso: string): string {
  return new Date(iso).toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
