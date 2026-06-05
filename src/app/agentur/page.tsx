import Link from "next/link";
import { DemoBanner, Header, Footer, InseratBadge } from "@/components/ui";
import {
  getAgentur,
  getFirma,
  inserate,
  getEingereichtVonAgentur,
} from "@/lib/demo-data";

// Demo: Wir sind als Agentur "FlexPersonal AG" (a1) eingeloggt.
const AKTUELLE_AGENTUR_ID = "a1";

export default function AgenturDashboard() {
  const agentur = getAgentur(AKTUELLE_AGENTUR_ID)!;
  const offeneInserate = inserate.filter((i) => i.status === "OFFEN");

  return (
    <>
      <DemoBanner />
      <Header rolle="agentur" />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">{agentur.name}</h1>
          <p className="text-slate-500 mt-1">
            {agentur.ort} · Ansprechperson: {agentur.kontaktperson}
          </p>
        </div>

        {/* Abo-Status */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <div>
              <p className="font-medium text-emerald-900">Abonnement aktiv – Starter (29 CHF/Monat)</p>
              <p className="text-sm text-emerald-700">
                Sie können Kandidaten für alle offenen Inserate einreichen.
              </p>
            </div>
          </div>
          <span className="text-sm text-emerald-700">Nächste Abrechnung: 01.07.2026</span>
        </div>

        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Offene Inserate ({offeneInserate.length})
        </h2>
        <div className="space-y-4">
          {offeneInserate.map((inserat) => {
            const firma = getFirma(inserat.firmaId);
            const bereitsEingereicht = getEingereichtVonAgentur(
              AKTUELLE_AGENTUR_ID,
              inserat.id,
            );
            return (
              <div
                key={inserat.id}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-300 transition"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-slate-900">{inserat.titel}</h3>
                      <InseratBadge status={inserat.status} />
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {firma?.name} · {firma?.branche}
                    </p>
                    <p className="text-sm text-slate-600 mt-2">{inserat.beschreibung}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-slate-500">
                      <span>📍 {inserat.ort}</span>
                      <span>📅 Start: {formatDatum(inserat.startDatum)}</span>
                      <span>⏱️ {inserat.dauer}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {bereitsEingereicht ? (
                      <div className="text-sm">
                        <span className="inline-block px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 font-medium">
                          ✓ Kandidat eingereicht
                        </span>
                        <p className="text-xs text-slate-400 mt-1">
                          {bereitsEingereicht.vorname} {bereitsEingereicht.nachname}
                        </p>
                      </div>
                    ) : (
                      <Link
                        href={`/agentur/inserat/${inserat.id}`}
                        className="inline-block px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
                      >
                        Kandidat einreichen →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
