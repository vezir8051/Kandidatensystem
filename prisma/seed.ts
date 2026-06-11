// Befüllt die Datenbank mit den Ausgangsdaten aus src/lib/demo-data.ts.
// Aufruf: npm run db:seed (setzt die Tabellen vorher zurück).

import { PrismaClient } from "@prisma/client";
import {
  agenturen,
  firmen,
  inserate,
  kandidaten,
} from "../src/lib/demo-data";

const prisma = new PrismaClient();

async function main() {
  // In umgekehrter Abhängigkeitsreihenfolge leeren.
  await prisma.kandidat.deleteMany();
  await prisma.inserat.deleteMany();
  await prisma.agentur.deleteMany();
  await prisma.firma.deleteMany();

  for (const f of firmen) {
    await prisma.firma.create({
      data: {
        id: f.id,
        name: f.name,
        branche: f.branche,
        ort: f.ort,
        kontaktperson: f.kontaktperson,
      },
    });
  }

  for (const a of agenturen) {
    await prisma.agentur.create({
      data: {
        id: a.id,
        name: a.name,
        ort: a.ort,
        kontaktperson: a.kontaktperson,
        aboAktiv: a.aboAktiv,
      },
    });
  }

  for (const i of inserate) {
    await prisma.inserat.create({
      data: {
        id: i.id,
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
      },
    });
  }

  for (const k of kandidaten) {
    await prisma.kandidat.create({
      data: {
        id: k.id,
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
      },
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
