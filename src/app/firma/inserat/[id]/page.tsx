import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBanner, Header, Footer, InseratBadge } from "@/components/ui";
import { KandidatenListe } from "@/components/kandidaten-liste";
import {
  getInserat,
  getKandidatenFuerInserat,
  getAgentur,
  inserate,
} from "@/lib/demo-data";

export function generateStaticParams() {
  return inserate.map((i) => ({ id: i.id }));
}

export default async function InseratDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inserat = getInserat(id);
  if (!inserat) notFound();

  const kandidaten = getKandidatenFuerInserat(inserat.id);
  const agenturen = Object.fromEntries(
    kandidaten.map((k) => [k.agenturId, getAgentur(k.agenturId)]),
  );

  return (
    <>
      <DemoBanner />
      <Header rolle="firma" />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/firma" className="text-sm text-brand-600 hover:underline">
          ← Zurück zur Übersicht
        </Link>

        {/* Inserat-Kopf */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mt-4 shadow-soft">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-slate-900">{inserat.titel}</h1>
            <InseratBadge status={inserat.status} />
          </div>
          <p className="text-slate-600 mt-3">{inserat.beschreibung}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-slate-500">
            <span>{inserat.ort}</span>
            <span>Start: {formatDatum(inserat.startDatum)}</span>
            <span>Dauer: {inserat.dauer}</span>
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

        <KandidatenListe kandidaten={kandidaten} agenturen={agenturen} />
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
