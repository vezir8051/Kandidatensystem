import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBanner, Header, Footer, InseratBadge } from "@/components/ui";
import { getInserat, getFirma, inserate } from "@/lib/demo-data";

export function generateStaticParams() {
  return inserate.map((i) => ({ id: i.id }));
}

export default function KandidatEinreichen({ params }: { params: { id: string } }) {
  const inserat = getInserat(params.id);
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

        {/* Formular (Demo, nicht funktional) */}
        <form className="bg-white rounded-xl border border-slate-200 p-6 mt-6 space-y-5">
          <h2 className="font-semibold text-slate-900">Kandidat einreichen</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Vorname" placeholder="z.B. Andreas" />
            <Field label="Nachname" placeholder="z.B. Huber" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Beruf" placeholder={inserat.beruf} />
            <Field label="Jahre Erfahrung" placeholder="z.B. 8" type="number" />
          </div>

          <Field label="Verfügbar ab" type="date" />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Qualifikationen
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="z.B. EFZ Maler, Gerüstbau, Fahrausweis (mit Komma getrennt)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Notiz für die Firma
            </label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Kurze Beschreibung, warum dieser Kandidat passt."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Lebenslauf (PDF)
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center text-sm text-slate-500">
              📄 PDF hierher ziehen oder klicken zum Hochladen
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" className="rounded" />
            <span>
              Der Kandidat hat sein Einverständnis zur Weitergabe seiner Daten gegeben (nDSG).
            </span>
          </div>

          <button
            type="button"
            className="w-full px-5 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition cursor-not-allowed opacity-90"
          >
            Kandidat einreichen (Demo – nicht aktiv)
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}
