import { DemoBanner, Header, Footer, InseratBadge } from "@/components/ui";
import {
  getFirmen,
  getAgenturen,
  getInserate,
  getKandidaten,
  getLeads,
  getMeldungen,
  countKandidatenFuerInserat,
} from "@/lib/db";

export const metadata = {
  title: "Admin – TempMatch",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [firmen, agenturen, inserate, kandidaten, leads, meldungen] = await Promise.all([
    getFirmen(),
    getAgenturen(),
    getInserate(),
    getKandidaten(),
    getLeads(),
    getMeldungen(),
  ]);
  const firmaName = Object.fromEntries(firmen.map((f) => [f.id, f.name]));
  const kandidatenZahlen = Object.fromEntries(
    await Promise.all(
      inserate.map(async (i) => [i.id, await countKandidatenFuerInserat(i.id)] as const),
    ),
  );
  const offene = inserate.filter((i) => i.status === "OFFEN").length;

  const kennzahlen = [
    { label: "Firmen", wert: firmen.length },
    { label: "Agenturen", wert: agenturen.length },
    { label: "Inserate (offen)", wert: offene },
    { label: "Kandidaten", wert: kandidaten.length },
    { label: "Frühbucher-Leads", wert: leads.length },
    { label: "Meldungen", wert: meldungen.length },
  ];

  return (
    <>
      <DemoBanner />
      <Header rolle="admin" />

      <main className="min-h-screen bg-slate-50">
        {/* Kopfzeile */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="font-display text-2xl font-extrabold text-ink">Admin-Übersicht</h1>
            <p className="text-muted mt-1 text-sm">Alle Kennzahlen und Daten der Plattform.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
          {/* Kennzahlen */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {kennzahlen.map((k) => (
              <div key={k.label} className="rounded-2xl bg-white p-5 shadow-soft">
                <div className="tabular font-display text-3xl font-extrabold text-brand-600">
                  {k.wert}
                </div>
                <div className="text-sm text-muted mt-1">{k.label}</div>
              </div>
            ))}
          </div>

          {/* Inserate-Tabelle */}
          <section>
            <h2 className="font-display text-lg font-bold text-ink mb-3">Alle Inserate</h2>
            <div className="rounded-2xl bg-white shadow-soft overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-muted text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium">Inserat</th>
                    <th className="px-4 py-3 font-medium">Firma</th>
                    <th className="px-4 py-3 font-medium">Ort</th>
                    <th className="px-4 py-3 font-medium text-center">Kandidaten</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inserate.map((i) => (
                    <tr key={i.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-ink font-medium">{i.titel}</td>
                      <td className="px-4 py-3 text-body">{firmaName[i.firmaId]}</td>
                      <td className="px-4 py-3 text-body">{i.ort}</td>
                      <td className="px-4 py-3 text-center font-semibold text-brand-600">
                        {kandidatenZahlen[i.id] ?? 0}
                      </td>
                      <td className="px-4 py-3">
                        <InseratBadge status={i.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Abonnenten */}
          <section>
            <h2 className="font-display text-lg font-bold text-ink mb-3">Abonnenten (Agenturen)</h2>
            <div className="rounded-2xl bg-white shadow-soft overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-muted text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium">Agentur</th>
                    <th className="px-4 py-3 font-medium">Ort</th>
                    <th className="px-4 py-3 font-medium">Ansprechperson</th>
                    <th className="px-4 py-3 font-medium">Abo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {agenturen.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-ink font-medium">{a.name}</td>
                      <td className="px-4 py-3 text-body">{a.ort}</td>
                      <td className="px-4 py-3 text-body">{a.kontaktperson}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                            a.aboAktiv
                              ? "bg-green-100 text-green-800"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {a.aboAktiv ? "Aktiv" : "Inaktiv"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Frühbucher-Leads */}
          <section>
            <h2 className="font-display text-lg font-bold text-ink mb-3">Frühbucher-Liste</h2>
            {leads.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-muted">
                Noch keine Einträge. Anmeldungen über das Formular auf der Startseite erscheinen hier.
              </div>
            ) : (
              <div className="rounded-2xl bg-white shadow-soft overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-muted text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">E-Mail</th>
                      <th className="px-4 py-3 font-medium">Rolle</th>
                      <th className="px-4 py-3 font-medium">Eingetragen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-ink font-medium">{l.name}</td>
                        <td className="px-4 py-3 text-body">{l.email}</td>
                        <td className="px-4 py-3 text-body">{l.rolle}</td>
                        <td className="px-4 py-3 text-body">{l.erstelltAm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Gemeldete Kandidaten */}
          <section>
            <h2 className="font-display text-lg font-bold text-ink mb-3">Gemeldete Kandidaten</h2>
            {meldungen.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-muted">
                Keine Meldungen. Von Firmen gemeldete Kandidaten erscheinen hier.
              </div>
            ) : (
              <div className="rounded-2xl bg-white shadow-soft overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-muted text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium">Kandidat</th>
                      <th className="px-4 py-3 font-medium">Grund</th>
                      <th className="px-4 py-3 font-medium">Gemeldet am</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {meldungen.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-ink font-medium">{m.kandidatName}</td>
                        <td className="px-4 py-3 text-body">{m.grund}</td>
                        <td className="px-4 py-3 text-body">{m.erstelltAm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
