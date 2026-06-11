import Link from "next/link";
import { DemoBanner, Header, Footer, InseratBadge } from "@/components/ui";
import { InseratErstellenButton } from "@/components/inserat-erstellen";
import { getFirma, getInserate, countKandidatenFuerInserat } from "@/lib/db";

// Demo: Wir sind als Firma "Müller Bau AG" (f1) eingeloggt.
const AKTUELLE_FIRMA_ID = "f1";

// Daten kommen jetzt zur Laufzeit aus der Datenbank.
export const dynamic = "force-dynamic";

export default async function FirmaDashboard() {
  const firma = (await getFirma(AKTUELLE_FIRMA_ID))!;
  const inserate = await getInserate();
  // Demo zeigt alle Inserate, damit die Ansicht voll wirkt – eigene zuerst.
  const eigeneInserate = inserate.filter((i) => i.firmaId === AKTUELLE_FIRMA_ID);
  const andereInserate = inserate.filter((i) => i.firmaId !== AKTUELLE_FIRMA_ID);
  const alleInserate = [...eigeneInserate, ...andereInserate];
  const kandidatenZahlen = Object.fromEntries(
    await Promise.all(
      alleInserate.map(async (i) => [i.id, await countKandidatenFuerInserat(i.id)] as const),
    ),
  );

  return (
    <>
      <DemoBanner />
      <Header rolle="firma" />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Willkommen, {firma.name}</h1>
            <p className="text-slate-500 mt-1">
              {firma.branche} · {firma.ort} · Ansprechperson: {firma.kontaktperson}
            </p>
          </div>
          <InseratErstellenButton />
        </div>

        <h2 className="text-lg font-semibold text-slate-900 mb-4">Ihre Inserate</h2>
        <div className="space-y-4">
          {alleInserate.map((inserat) => {
            const anzahlKandidaten = kandidatenZahlen[inserat.id] ?? 0;
            const istEigenes = inserat.firmaId === AKTUELLE_FIRMA_ID;
            return (
              <div
                key={inserat.id}
                className="bg-white rounded-2xl border border-slate-100 p-5 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-slate-900">{inserat.titel}</h3>
                      <InseratBadge status={inserat.status} />
                      {!istEigenes && (
                        <span className="text-xs text-slate-400">(anderes Unternehmen)</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{inserat.beschreibung}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-slate-500">
                      <span>{inserat.ort}</span>
                      <span>Start: {formatDatum(inserat.startDatum)}</span>
                      <span>{inserat.dauer}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-brand-600">{anzahlKandidaten}</div>
                    <div className="text-xs text-slate-500">Kandidaten</div>
                    <Link
                      href={`/firma/inserat/${inserat.id}`}
                      className="inline-block mt-3 px-4 py-2 rounded-lg bg-brand-50 text-brand-700 text-sm font-medium hover:bg-brand-100 transition"
                    >
                      Kandidaten ansehen →
                    </Link>
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
