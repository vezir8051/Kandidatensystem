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

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Admin-Übersicht</h1>

        {/* Kennzahlen */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {kennzahlen.map((k) => (
            <div key={k.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft">
              <div className="tabular text-3xl font-bold text-ink">
                {k.wert}
              </div>
              <div className="text-sm text-slate-500">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Inserate-Tabelle */}
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Alle Inserate</h2>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden mb-10">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-left">
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
                  <td className="px-4 py-3 text-slate-800">{i.titel}</td>
                  <td className="px-4 py-3 text-slate-600">{firmaName[i.firmaId]}</td>
                  <td className="px-4 py-3 text-slate-600">{i.ort}</td>
                  <td className="px-4 py-3 text-center text-slate-800 font-medium">
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

        {/* Abonnenten */}
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Abonnenten (Agenturen)</h2>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-left">
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
                  <td className="px-4 py-3 text-slate-800">{a.name}</td>
                  <td className="px-4 py-3 text-slate-600">{a.ort}</td>
                  <td className="px-4 py-3 text-slate-600">{a.kontaktperson}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${
                        a.aboAktiv
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-100 text-slate-500 border-slate-200"
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

        {/* Frühbucher-Leads */}
        <h2 className="text-lg font-semibold text-slate-900 mb-3 mt-10">Frühbucher-Liste</h2>
        {leads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
            Noch keine Einträge. Anmeldungen über das Formular auf der Startseite erscheinen hier.
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-left">
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
                    <td className="px-4 py-3 text-slate-800">{l.name}</td>
                    <td className="px-4 py-3 text-slate-600">{l.email}</td>
                    <td className="px-4 py-3 text-slate-600">{l.rolle}</td>
                    <td className="px-4 py-3 text-slate-600">{l.erstelltAm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Gemeldete Kandidaten */}
        <h2 className="text-lg font-semibold text-slate-900 mb-3 mt-10">Gemeldete Kandidaten</h2>
        {meldungen.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
            Keine Meldungen. Von Firmen gemeldete Kandidaten erscheinen hier.
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Kandidat</th>
                  <th className="px-4 py-3 font-medium">Grund</th>
                  <th className="px-4 py-3 font-medium">Gemeldet am</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {meldungen.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-800">{m.kandidatName}</td>
                    <td className="px-4 py-3 text-slate-600">{m.grund}</td>
                    <td className="px-4 py-3 text-slate-600">{m.erstelltAm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
