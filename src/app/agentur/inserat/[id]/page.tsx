import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBanner, Header, Footer, InseratBadge } from "@/components/ui";
import { EinreichFormular } from "@/components/einreich-formular";
import { getInserat, getFirma, inserate } from "@/lib/demo-data";

export function generateStaticParams() {
  return inserate.map((i) => ({ id: i.id }));
}

export default async function KandidatEinreichen({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inserat = getInserat(id);
  if (!inserat) notFound();
  const firma = getFirma(inserat.firmaId);

  return (
    <>
      <DemoBanner />
      <Header rolle="agentur" />

      <main className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/agentur" className="text-sm text-emerald-600 hover:underline">
          ← Zurück zur Übersicht
        </Link>

        {/* Inserat-Zusammenfassung */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mt-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-slate-900">{inserat.titel}</h1>
            <InseratBadge status={inserat.status} />
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {firma?.name} · 📍 {inserat.ort} · ⏱️ {inserat.dauer}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {inserat.anforderungen.map((a) => (
              <span key={a} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Hinweis 1 Kandidat pro Inserat */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6 text-sm text-amber-800">
          ℹ️ Pro Inserat können Sie <strong>genau einen</strong> Kandidaten einreichen. Wählen Sie
          den am besten passenden aus Ihrem Pool.
        </div>

        <EinreichFormular beruf={inserat.beruf} inseratTitel={inserat.titel} />
      </main>

      <Footer />
    </>
  );
}
