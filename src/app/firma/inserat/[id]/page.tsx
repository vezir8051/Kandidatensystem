import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBanner, Header, Footer, InseratBadge } from "@/components/ui";
import { KandidatenListe } from "@/components/kandidaten-liste";
import { getInserat, getKandidatenFuerInserat, getAgentur } from "@/lib/db";
import type { Agentur } from "@/lib/types";

export const dynamic = "force-dynamic";

function formatDatum(iso: string): string {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function InseratDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inserat = await getInserat(id);
  if (!inserat) notFound();

  const kandidaten = await getKandidatenFuerInserat(inserat.id);
  const agenturIds = Array.from(new Set(kandidaten.map((k) => k.agenturId)));
  const agenturen: Record<string, Agentur | undefined> = Object.fromEntries(
    await Promise.all(agenturIds.map(async (aid) => [aid, await getAgentur(aid)] as const)),
  );

  return (
    <>
      <DemoBanner />
      <Header rolle="firma" />

      <main className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <Link
              href="/firma"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
            >
              ← Zurück zur Übersicht
            </Link>
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <h1 className="font-display text-2xl font-extrabold text-ink">{inserat.titel}</h1>
              <InseratBadge status={inserat.status} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {inserat.ort}
              </span>
              <span className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                Start: {formatDatum(inserat.startDatum)}
              </span>
              <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
                {inserat.dauer}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Inserat-Details */}
          <div className="rounded-2xl bg-white p-6 shadow-soft">
            <p className="text-body">{inserat.beschreibung}</p>
            {inserat.anforderungen.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-ink mb-2">Anforderungen</p>
                <ul className="flex flex-wrap gap-2">
                  {inserat.anforderungen.map((a) => (
                    <li key={a} className="text-xs bg-brand-50 text-brand-700 px-3 py-1 rounded-full font-medium">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <h2 className="font-display text-lg font-bold text-ink mt-8 mb-4">
            Eingereichte Kandidaten ({kandidaten.length})
          </h2>

          <KandidatenListe kandidaten={kandidaten} agenturen={agenturen} />
        </div>
      </main>

      <Footer />
    </>
  );
}
