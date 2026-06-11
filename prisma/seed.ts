// Befüllt die Datenbank mit den Ausgangsdaten aus src/lib/demo-data.ts.
// Idempotent (Upserts): kann gefahrlos mehrfach laufen – auch im Vercel-Build –
// und löscht keine zur Laufzeit erstellten Datensätze.
// Aufruf lokal: npm run db:seed

import { PrismaClient } from "@prisma/client";
import {
  agenturen,
  firmen,
  inserate,
  kandidaten,
} from "../src/lib/demo-data";

const prisma = new PrismaClient();

async function main() {
  for (const f of firmen) {
    const data = {
      name: f.name,
      branche: f.branche,
      ort: f.ort,
      kontaktperson: f.kontaktperson,
    };
    await prisma.firma.upsert({
      where: { id: f.id },
      update: data,
      create: { id: f.id, ...data },
    });
  }

  for (const a of agenturen) {
    const data = {
      name: a.name,
      ort: a.ort,
      kontaktperson: a.kontaktperson,
      aboAktiv: a.aboAktiv,
    };
    await prisma.agentur.upsert({
      where: { id: a.id },
      update: data,
      create: { id: a.id, ...data },
    });
  }

  for (const i of inserate) {
    const data = {
      firmaId: i.firmaId,
      titel: i.titel,
      beruf: i.beruf,
      beschreibung: i.beschreibung,
      anforderungen: JSON.stringify(i.anforderungen),
      ort: i.ort,
      startDatum: i.startDatum,
      dauer: i.dauer,
      festanstellungMoeglich: Boolean(i.festanstellungMoeglich),
      status: i.status,
      erstelltAm: i.erstelltAm,
    };
    await prisma.inserat.upsert({
      where: { id: i.id },
      update: data,
      create: { id: i.id, ...data },
    });
  }

  for (const k of kandidaten) {
    const data = {
      inseratId: k.inseratId,
      agenturId: k.agenturId,
      vorname: k.vorname,
      nachname: k.nachname,
      beruf: k.beruf,
      erfahrungJahre: k.erfahrungJahre,
      qualifikationen: JSON.stringify(k.qualifikationen),
      verfuegbarAb: k.verfuegbarAb,
      verfuegbarBis: k.verfuegbarBis ?? null,
      telefon: k.telefon ?? null,
      email: k.email ?? null,
      fruehererArbeitgeber: k.fruehererArbeitgeber ?? null,
      status: k.status,
      notiz: k.notiz,
    };
    await prisma.kandidat.upsert({
      where: { id: k.id },
      update: data,
      create: { id: k.id, ...data },
    });
  }

  const [nf, na, ni, nk] = await Promise.all([
    prisma.firma.count(),
    prisma.agentur.count(),
    prisma.inserat.count(),
    prisma.kandidat.count(),
  ]);
  console.log(`Seed abgeschlossen: ${nf} Firmen, ${na} Agenturen, ${ni} Inserate, ${nk} Kandidaten.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
