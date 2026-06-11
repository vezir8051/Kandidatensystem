import { AgenturDashboard } from "@/components/agentur-dashboard";
import { getAgenturen, getInserate, getFirmen, getKandidaten } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AgenturPage({
  searchParams,
}: {
  searchParams: Promise<{ beruf?: string; ort?: string }>;
}) {
  const { beruf, ort } = await searchParams;
  const [agenturen, inserate, firmen, kandidaten] = await Promise.all([
    getAgenturen(),
    getInserate(),
    getFirmen(),
    getKandidaten(),
  ]);

  const offeneInserate = inserate.filter((i) => i.status === "OFFEN");
  const firmaName = Object.fromEntries(firmen.map((f) => [f.id, f.name]));
  const firmaBranche = Object.fromEntries(firmen.map((f) => [f.id, f.branche]));

  // Welche Agentur hat zu welchem Inserat bereits eingereicht?
  const eingereicht = kandidaten.map((k) => ({
    agenturId: k.agenturId,
    inseratId: k.inseratId,
    vorname: k.vorname,
    nachname: k.nachname,
  }));

  return (
    <AgenturDashboard
      agenturen={agenturen}
      offeneInserate={offeneInserate}
      firmaName={firmaName}
      firmaBranche={firmaBranche}
      eingereicht={eingereicht}
      initialBeruf={beruf ?? ""}
      initialOrt={ort ?? ""}
    />
  );
}
