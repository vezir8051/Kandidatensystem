// Daten-Zugriffsschicht: kapselt Prisma und mappt die DB-Zeilen auf die
// Domänen-Typen (insb. JSON-Listen -> string[] und String -> Union-Typen).
// Die Seiten verwenden ausschliesslich diese Funktionen, nicht Prisma direkt.

import { prisma } from "@/lib/prisma";
import type {
  Agentur,
  Beruf,
  Firma,
  Inserat,
  InseratStatus,
  Kandidat,
  KandidatStatus,
  Lead,
} from "@/lib/types";

function parseListe(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

// --- Mapper: Prisma-Row -> Domänen-Typ ---

type FirmaRow = Awaited<ReturnType<typeof prisma.firma.findFirst>>;
type AgenturRow = Awaited<ReturnType<typeof prisma.agentur.findFirst>>;
type InseratRow = Awaited<ReturnType<typeof prisma.inserat.findFirst>>;
type KandidatRow = Awaited<ReturnType<typeof prisma.kandidat.findFirst>>;

function mapFirma(r: NonNullable<FirmaRow>): Firma {
  return {
    id: r.id,
    name: r.name,
    branche: r.branche,
    ort: r.ort,
    kontaktperson: r.kontaktperson,
  };
}

function mapAgentur(r: NonNullable<AgenturRow>): Agentur {
  return {
    id: r.id,
    name: r.name,
    ort: r.ort,
    kontaktperson: r.kontaktperson,
    aboAktiv: r.aboAktiv,
  };
}

function mapInserat(r: NonNullable<InseratRow>): Inserat {
  return {
    id: r.id,
    firmaId: r.firmaId,
    titel: r.titel,
    beruf: r.beruf as Beruf,
    beschreibung: r.beschreibung,
    anforderungen: parseListe(r.anforderungen),
    ort: r.ort,
    startDatum: r.startDatum,
    dauer: r.dauer,
    festanstellungMoeglich: r.festanstellungMoeglich,
    status: r.status as InseratStatus,
    erstelltAm: r.erstelltAm,
  };
}

function mapKandidat(r: NonNullable<KandidatRow>): Kandidat {
  return {
    id: r.id,
    inseratId: r.inseratId,
    agenturId: r.agenturId,
    vorname: r.vorname,
    nachname: r.nachname,
    beruf: r.beruf as Beruf,
    erfahrungJahre: r.erfahrungJahre,
    qualifikationen: parseListe(r.qualifikationen),
    verfuegbarAb: r.verfuegbarAb,
    verfuegbarBis: r.verfuegbarBis ?? undefined,
    telefon: r.telefon ?? undefined,
    email: r.email ?? undefined,
    fruehererArbeitgeber: r.fruehererArbeitgeber ?? undefined,
    status: r.status as KandidatStatus,
    notiz: r.notiz,
  };
}

// --- Lese-Funktionen ---

export async function getFirmen(): Promise<Firma[]> {
  const rows = await prisma.firma.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(mapFirma);
}

export async function getFirma(id: string): Promise<Firma | undefined> {
  const r = await prisma.firma.findUnique({ where: { id } });
  return r ? mapFirma(r) : undefined;
}

export async function getAgenturen(): Promise<Agentur[]> {
  const rows = await prisma.agentur.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(mapAgentur);
}

export async function getAgentur(id: string): Promise<Agentur | undefined> {
  const r = await prisma.agentur.findUnique({ where: { id } });
  return r ? mapAgentur(r) : undefined;
}

export async function getInserate(): Promise<Inserat[]> {
  const rows = await prisma.inserat.findMany({ orderBy: { erstelltAm: "asc" } });
  return rows.map(mapInserat);
}

export async function getInserat(id: string): Promise<Inserat | undefined> {
  const r = await prisma.inserat.findUnique({ where: { id } });
  return r ? mapInserat(r) : undefined;
}

export async function getInserateVonFirma(firmaId: string): Promise<Inserat[]> {
  const rows = await prisma.inserat.findMany({
    where: { firmaId },
    orderBy: { erstelltAm: "asc" },
  });
  return rows.map(mapInserat);
}

export async function getKandidaten(): Promise<Kandidat[]> {
  const rows = await prisma.kandidat.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(mapKandidat);
}

export async function getKandidatenFuerInserat(inseratId: string): Promise<Kandidat[]> {
  const rows = await prisma.kandidat.findMany({
    where: { inseratId },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(mapKandidat);
}

export async function getEingereichtVonAgentur(
  agenturId: string,
  inseratId: string,
): Promise<Kandidat | undefined> {
  const r = await prisma.kandidat.findFirst({ where: { agenturId, inseratId } });
  return r ? mapKandidat(r) : undefined;
}

// Kennzahl für das Firmen-/Admin-Dashboard, ohne alle Kandidaten zu laden.
export async function countKandidatenFuerInserat(inseratId: string): Promise<number> {
  return prisma.kandidat.count({ where: { inseratId } });
}

export async function getLeads(): Promise<Lead[]> {
  const rows = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    rolle: r.rolle,
    erstelltAm: r.createdAt.toISOString().slice(0, 10),
  }));
}
