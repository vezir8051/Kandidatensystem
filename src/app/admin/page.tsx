import { DemoBanner, Header, Footer, InseratBadge } from "@/components/ui";
import {
  firmen,
  agenturen,
  inserate,
  kandidaten,
  getFirma,
  getKandidatenFuerInserat,
} from "@/lib/demo-data";

export const metadata = {
  title: "Admin – TempMatch",
};

export default function AdminDashboard() {
  const offene = inserate.filter((i) => i.status === "OFFEN").length;

  const kennzahlen = [
    { label: "Firmen", wert: firmen.length, icon: "🏢" },
    { label: "Agenturen", wert: agenturen.length, icon: "🤝" },
    { label: "Inserate (offen)", wert: offene, icon: "📋" },
    { label: "Kandidaten", wert: kandidaten.length, icon: "👷" },
  ];

  return (
    <>
      <DemoBanner />
      <Header rolle="admin" />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Admin-Übersicht</h1>

        {/* Kennzahlen */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {kennzahlen.map((k) => (
            <div key={k.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-soft">
              <div className="text-2xl">{k.icon}</div>
              <div className="tabular text-3xl font-bold text-ink mt-2">
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
                  <td className="px-4 py-3 text-slate-600">{getFirma(i.firmaId)?.name}</td>
                  <td className="px-4 py-3 text-slate-600">{i.ort}</td>
                  <td className="px-4 py-3 text-center text-slate-800 font-medium">
                    {getKandidatenFuerInserat(i.id).length}
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
      </main>

      <Footer />
    </>
  );
}
