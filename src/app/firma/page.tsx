import Link from "next/link";
import { DemoBanner, Header, Footer, InseratBadge } from "@/components/ui";
import { InseratErstellenButton } from "@/components/inserat-erstellen";
import { getFirma, getInserate, countKandidatenFuerInserat } from "@/lib/db";

// Demo: Wir sind als Firma "Müller Bau AG" (f1) eingeloggt.
const AKTUELLE_FIRMA_ID = "f1";

// Daten kommen jetzt zur Laufzeit aus der Datenbank.
export const dynamic = "force-dynamic";

function formatDatum(iso: string): string {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" });
}

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

  const offene = eigeneInserate.filter((i) => i.status === "OFFEN").length;
  const kandidatenGesamt = eigeneInserate.reduce((s, i) => s + (kandidatenZahlen[i.id] ?? 0), 0);

  return (
    <>
      <DemoBanner />
      <Header rolle="firma" />

      <main className="min-h-screen bg-slate-50">
        {/* Kopfzeile */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-extrabold text-ink">
                Willkommen, {firma.name}
              </h1>
              <p className="text-muted mt-1 text-sm">
                {firma.branche} · {firma.ort} · Ansprechperson: {firma.kontaktperson}
              </p>
            </div>
            <InseratErstellenButton />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 grid gap-8 lg:grid-cols-4">
          {/* Sidebar: Kennzahlen */}
          <aside className="space-y-4 lg:col-span-1 h-fit lg:sticky lg:top-24">
            <div className="rounded-2xl bg-white p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold text-ink mb-4">Übersicht</h3>
              <dl className="space-y-3">
                {[
                  { label: "Eigene Inserate", wert: eigeneInserate.length },
                  { label: "Davon offen", wert: offene },
                  { label: "Kandidaten gesamt", wert: kandidatenGesamt },
                ].map((k) => (
                  <div key={k.label} className="flex items-center justify-between">
                    <dt className="text-sm text-muted">{k.label}</dt>
                    <dd className="font-display text-xl font-extrabold text-brand-600">{k.wert}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-800">
              Inserate ohne Auswahl werden nach 30 Tagen automatisch archiviert.
            </div>
          </aside>

          {/* Hauptbereich */}
          <section className="lg:col-span-3">
            <h2 className="font-display text-xl font-bold text-ink mb-6">
              Ihre Inserate ({alleInserate.length})
            </h2>
            <div className="space-y-4">
              {alleInserate.map((inserat) => {
                const anzahlKandidaten = kandidatenZahlen[inserat.id] ?? 0;
                const istEigenes = inserat.firmaId === AKTUELLE_FIRMA_ID;
                const initialen = inserat.titel.slice(0, 2).toUpperCase();
                return (
                  <div
                    key={inserat.id}
                    className="relative flex items-start gap-4 rounded-2xl bg-white p-4 shadow-soft hover:shadow-card transition-shadow"
                  >
                    <span className="hidden sm:flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-xl font-bold text-brand-600">
                      {initialen}
                    </span>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 flex-wrap pr-2">
                        <h3 className="font-semibold text-ink leading-snug">{inserat.titel}</h3>
                        <InseratBadge status={inserat.status} />
                        {!istEigenes && (
                          <span className="text-xs text-muted">(anderes Unternehmen)</span>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {inserat.ort}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                          {formatDatum(inserat.startDatum)}
                        </span>
                        <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
                          {inserat.dauer}
                        </span>
                      </div>
                      {inserat.beschreibung && (
                        <p className="mt-2 text-sm text-body line-clamp-2">{inserat.beschreibung}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end justify-between self-stretch text-right">
                      <div>
                        <div className="font-display text-2xl font-extrabold text-brand-600">
                          {anzahlKandidaten}
                        </div>
                        <div className="text-xs text-muted">Kandidaten</div>
                      </div>
                      <Link
                        href={`/firma/inserat/${inserat.id}`}
                        className="mt-3 inline-flex items-center justify-center rounded-full border border-brand-600 px-4 py-2 text-sm font-medium text-brand-600 hover:bg-brand-600 hover:text-white transition-colors"
                      >
                        Kandidaten ansehen
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
