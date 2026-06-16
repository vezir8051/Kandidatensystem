import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBanner, Header, Footer, InseratBadge } from "@/components/ui";
import { EinreichFormular } from "@/components/einreich-formular";
import { getInserat, getFirma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function KandidatEinreichen({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inserat = await getInserat(id);
  if (!inserat) notFound();
  const firma = await getFirma(inserat.firmaId);

  return (
    <>
      <DemoBanner />
      <Header rolle="agentur" />

      <main className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <Link
              href="/agentur"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
            >
              ← Zurück zur Übersicht
            </Link>
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <h1 className="font-display text-2xl font-extrabold text-ink">{inserat.titel}</h1>
              <InseratBadge status={inserat.status} />
            </div>
            <p className="text-sm text-muted mt-2">
              {firma?.name} · {inserat.ort} · {inserat.dauer}
            </p>
            {inserat.anforderungen.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {inserat.anforderungen.map((a) => (
                  <span key={a} className="text-xs bg-brand-50 text-brand-700 px-3 py-1 rounded-full font-medium">
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
            Pro Inserat können Sie <strong>genau einen</strong> Kandidaten einreichen. Wählen Sie
            den am besten passenden aus Ihrem Pool.
          </div>

          <EinreichFormular
            inseratId={inserat.id}
            beruf={inserat.beruf}
            inseratTitel={inserat.titel}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
