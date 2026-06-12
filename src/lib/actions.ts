"use server";

// Server Actions: echte Schreibvorgänge gegen die Datenbank.
// Werden direkt aus den (Client-)Formularen aufgerufen.

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type ActionResult = { ok: true } | { ok: false; fehler: string };

function listeAusText(text: string): string {
  const items = text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return JSON.stringify(items);
}

// --- Firma: neues Inserat erstellen ---

export async function inseratErstellen(input: {
  firmaId?: string;
  titel: string;
  beruf: string;
  ort: string;
  beschreibung: string;
  anforderungen?: string;
  startDatum?: string;
  dauer?: string;
  festanstellungMoeglich?: boolean;
}): Promise<ActionResult> {
  const titel = input.titel?.trim();
  if (!titel) return { ok: false, fehler: "Bitte einen Titel angeben." };

  // Demo: ohne Auth wird das Inserat der ersten Firma zugeordnet.
  const firma = input.firmaId
    ? await prisma.firma.findUnique({ where: { id: input.firmaId } })
    : await prisma.firma.findFirst({ orderBy: { createdAt: "asc" } });
  if (!firma) return { ok: false, fehler: "Keine Firma gefunden." };

  await prisma.inserat.create({
    data: {
      firmaId: firma.id,
      titel,
      beruf: input.beruf?.trim() || "Maler",
      ort: input.ort?.trim() || firma.ort,
      beschreibung: input.beschreibung?.trim() || "",
      anforderungen: listeAusText(input.anforderungen ?? ""),
      startDatum: input.startDatum?.trim() || new Date().toISOString().slice(0, 10),
      dauer: input.dauer?.trim() || "Temporär",
      festanstellungMoeglich: Boolean(input.festanstellungMoeglich),
      status: "OFFEN",
      erstelltAm: new Date().toISOString().slice(0, 10),
    },
  });

  revalidatePath("/firma");
  revalidatePath("/agentur");
  revalidatePath("/admin");
  return { ok: true };
}

// --- Agentur: Kandidat für ein Inserat einreichen ---

export async function kandidatEinreichen(input: {
  inseratId: string;
  agenturId?: string;
  vorname: string;
  nachname: string;
  beruf?: string;
  erfahrungJahre?: number;
  qualifikationen?: string;
  verfuegbarAb?: string;
  verfuegbarBis?: string;
  telefon?: string;
  email?: string;
  fruehererArbeitgeber?: string;
  notiz?: string;
  consentNdsg?: boolean;
  consentWahrheit?: boolean;
  consentErreichbar?: boolean;
  cvDateiname?: string;
  cvBase64?: string;
}): Promise<ActionResult> {
  const vorname = input.vorname?.trim();
  const nachname = input.nachname?.trim();
  if (!vorname || !nachname) {
    return { ok: false, fehler: "Bitte Vor- und Nachname angeben." };
  }

  // Pflichtbestätigungen müssen serverseitig vorliegen (nicht nur im UI).
  if (!input.consentNdsg || !input.consentWahrheit || !input.consentErreichbar) {
    return { ok: false, fehler: "Bitte alle drei Pflichtbestätigungen ankreuzen." };
  }

  // CV (optional): Base64 -> Bytes, nur PDFs bis 5 MB akzeptieren.
  let cvInhalt: Uint8Array<ArrayBuffer> | null = null;
  let cvDateiname: string | null = null;
  if (input.cvBase64) {
    try {
      const roh = Buffer.from(input.cvBase64, "base64");
      cvInhalt = new Uint8Array(new ArrayBuffer(roh.byteLength));
      cvInhalt.set(roh);
    } catch {
      return { ok: false, fehler: "Der hochgeladene Lebenslauf konnte nicht verarbeitet werden." };
    }
    if (cvInhalt.length > 5 * 1024 * 1024) {
      return { ok: false, fehler: "Der Lebenslauf ist zu gross (max. 5 MB)." };
    }
    cvDateiname = input.cvDateiname?.trim() || "lebenslauf.pdf";
  }

  const inserat = await prisma.inserat.findUnique({ where: { id: input.inseratId } });
  if (!inserat) return { ok: false, fehler: "Inserat nicht gefunden." };

  // Demo: ohne Auth wird die erste Agentur als einreichende Agentur verwendet.
  const agentur = input.agenturId
    ? await prisma.agentur.findUnique({ where: { id: input.agenturId } })
    : await prisma.agentur.findFirst({ orderBy: { createdAt: "asc" } });
  if (!agentur) return { ok: false, fehler: "Keine Agentur gefunden." };

  // Regel: genau ein Kandidat pro Agentur pro Inserat.
  const schonEingereicht = await prisma.kandidat.findFirst({
    where: { inseratId: inserat.id, agenturId: agentur.id },
  });
  if (schonEingereicht) {
    return { ok: false, fehler: "Sie haben für dieses Inserat bereits einen Kandidaten eingereicht." };
  }

  await prisma.kandidat.create({
    data: {
      inseratId: inserat.id,
      agenturId: agentur.id,
      vorname,
      nachname,
      beruf: input.beruf?.trim() || inserat.beruf,
      erfahrungJahre: Number.isFinite(input.erfahrungJahre) ? Number(input.erfahrungJahre) : 0,
      qualifikationen: listeAusText(input.qualifikationen ?? ""),
      verfuegbarAb: input.verfuegbarAb?.trim() || inserat.startDatum,
      verfuegbarBis: input.verfuegbarBis?.trim() || null,
      telefon: input.telefon?.trim() || null,
      email: input.email?.trim() || null,
      fruehererArbeitgeber: input.fruehererArbeitgeber?.trim() || null,
      status: "AUSSTEHEND",
      notiz: input.notiz?.trim() || "",
      consentNdsg: true,
      consentWahrheit: true,
      consentErreichbar: true,
      consentAm: new Date(),
      cvInhalt,
      cvDateiname,
    },
  });

  revalidatePath(`/firma/inserat/${inserat.id}`);
  revalidatePath("/agentur");
  revalidatePath("/admin");
  return { ok: true };
}

// --- Firma: Kandidat auswählen (alle anderen für dieses Inserat ablehnen) ---

export async function kandidatAuswaehlen(kandidatId: string): Promise<ActionResult> {
  const kandidat = await prisma.kandidat.findUnique({ where: { id: kandidatId } });
  if (!kandidat) return { ok: false, fehler: "Kandidat nicht gefunden." };

  await prisma.$transaction([
    prisma.kandidat.updateMany({
      where: { inseratId: kandidat.inseratId, id: { not: kandidatId } },
      data: { status: "ABGELEHNT" },
    }),
    prisma.kandidat.update({
      where: { id: kandidatId },
      data: { status: "AUSGEWAEHLT" },
    }),
    prisma.inserat.update({
      where: { id: kandidat.inseratId },
      data: { status: "BESETZT" },
    }),
  ]);

  revalidatePath(`/firma/inserat/${kandidat.inseratId}`);
  revalidatePath("/firma");
  revalidatePath("/agentur");
  revalidatePath("/admin");
  return { ok: true };
}

// --- Firma: einzelnen Kandidaten ablehnen ---

export async function kandidatAblehnen(kandidatId: string): Promise<ActionResult> {
  const kandidat = await prisma.kandidat.findUnique({ where: { id: kandidatId } });
  if (!kandidat) return { ok: false, fehler: "Kandidat nicht gefunden." };

  await prisma.kandidat.update({
    where: { id: kandidatId },
    data: { status: "ABGELEHNT" },
  });

  revalidatePath(`/firma/inserat/${kandidat.inseratId}`);
  return { ok: true };
}

// --- Firma: Kandidaten melden (Missbrauch/Beschwerde) ---

export async function kandidatMelden(
  kandidatId: string,
  grund: string,
): Promise<ActionResult> {
  const text = grund?.trim();
  if (!text) return { ok: false, fehler: "Bitte einen Grund angeben." };

  const kandidat = await prisma.kandidat.findUnique({ where: { id: kandidatId } });
  if (!kandidat) return { ok: false, fehler: "Kandidat nicht gefunden." };

  await prisma.meldung.create({ data: { kandidatId, grund: text } });

  revalidatePath("/admin");
  return { ok: true };
}

// --- Startseite: Frühbucher-Lead speichern ---

export async function leadSpeichern(input: {
  name: string;
  email: string;
  rolle: string;
}): Promise<ActionResult> {
  const name = input.name?.trim();
  const email = input.email?.trim();
  if (!name) return { ok: false, fehler: "Bitte einen Namen angeben." };
  if (!email || !email.includes("@")) {
    return { ok: false, fehler: "Bitte eine gültige E-Mail-Adresse angeben." };
  }

  await prisma.lead.create({
    data: {
      name,
      email,
      rolle: input.rolle?.trim() || "Firma",
    },
  });

  revalidatePath("/admin");
  return { ok: true };
}
