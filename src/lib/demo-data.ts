// Demo-Daten für TempMatch – statisch, ohne Datenbank.
// In der MVP-Version werden diese durch echte Datenbank-Einträge (Prisma/PostgreSQL) ersetzt.

export type Beruf =
  | "Maler"
  | "Schreiner"
  | "Lagerist"
  | "Koch"
  | "Elektriker"
  | "Reinigungskraft";

export type InseratStatus = "OFFEN" | "BESETZT" | "GESCHLOSSEN";
export type KandidatStatus = "AUSSTEHEND" | "AUSGEWAEHLT" | "ABGELEHNT";

export interface Firma {
  id: string;
  name: string;
  branche: string;
  ort: string;
  kontaktperson: string;
}

export interface Agentur {
  id: string;
  name: string;
  ort: string;
  kontaktperson: string;
  aboAktiv: boolean;
}

export interface Kandidat {
  id: string;
  inseratId: string;
  agenturId: string;
  vorname: string;
  nachname: string;
  beruf: Beruf;
  erfahrungJahre: number;
  qualifikationen: string[];
  verfuegbarAb: string;
  status: KandidatStatus;
  notiz: string;
}

export interface Inserat {
  id: string;
  firmaId: string;
  titel: string;
  beruf: Beruf;
  beschreibung: string;
  anforderungen: string[];
  ort: string;
  startDatum: string;
  dauer: string;
  status: InseratStatus;
  erstelltAm: string;
}

export const firmen: Firma[] = [
  {
    id: "f1",
    name: "Müller Bau AG",
    branche: "Baugewerbe",
    ort: "Zürich",
    kontaktperson: "Thomas Müller",
  },
  {
    id: "f2",
    name: "Gastro Genuss GmbH",
    branche: "Gastronomie",
    ort: "Winterthur",
    kontaktperson: "Sandra Keller",
  },
  {
    id: "f3",
    name: "LogiTrans Logistik",
    branche: "Logistik",
    ort: "Dietikon",
    kontaktperson: "Marco Bianchi",
  },
];

export const agenturen: Agentur[] = [
  {
    id: "a1",
    name: "FlexPersonal AG",
    ort: "Zürich",
    kontaktperson: "Petra Wyss",
    aboAktiv: true,
  },
  {
    id: "a2",
    name: "TempProfi Vermittlung",
    ort: "Baden",
    kontaktperson: "Daniel Frei",
    aboAktiv: true,
  },
];

export const inserate: Inserat[] = [
  {
    id: "i1",
    firmaId: "f1",
    titel: "Maler für Renovationsprojekt gesucht",
    beruf: "Maler",
    beschreibung:
      "Für ein grösseres Renovationsprojekt in Zürich-West suchen wir einen erfahrenen Maler. Innen- und Aussenarbeiten.",
    anforderungen: ["EFZ-Abschluss als Maler", "Mind. 3 Jahre Erfahrung", "Selbständiges Arbeiten"],
    ort: "Zürich",
    startDatum: "2026-06-15",
    dauer: "3 Wochen",
    status: "OFFEN",
    erstelltAm: "2026-06-02",
  },
  {
    id: "i2",
    firmaId: "f1",
    titel: "Schreiner für Innenausbau",
    beruf: "Schreiner",
    beschreibung:
      "Innenausbau einer Bürofläche. Montage von Trennwänden, Einbaumöbeln und Türen.",
    anforderungen: ["EFZ Schreiner", "Erfahrung im Innenausbau", "Eigenes Werkzeug von Vorteil"],
    ort: "Zürich",
    startDatum: "2026-06-20",
    dauer: "2 Wochen",
    status: "OFFEN",
    erstelltAm: "2026-06-03",
  },
  {
    id: "i3",
    firmaId: "f2",
    titel: "Koch für Sommersaison",
    beruf: "Koch",
    beschreibung:
      "Verstärkung für unsere Küche während der Sommersaison. À-la-carte Restaurant mit saisonaler Küche.",
    anforderungen: ["Kochlehre abgeschlossen", "Erfahrung à la carte", "Wochenendarbeit möglich"],
    ort: "Winterthur",
    startDatum: "2026-07-01",
    dauer: "2 Monate",
    status: "OFFEN",
    erstelltAm: "2026-06-01",
  },
  {
    id: "i4",
    firmaId: "f3",
    titel: "Lagerist mit Staplerausweis",
    beruf: "Lagerist",
    beschreibung:
      "Für unser Logistikzentrum suchen wir einen zuverlässigen Lageristen. Kommissionierung und Wareneingang.",
    anforderungen: ["Staplerausweis (Kat. R)", "Körperliche Belastbarkeit", "Schichtbereitschaft"],
    ort: "Dietikon",
    startDatum: "2026-06-10",
    dauer: "1 Monat",
    status: "OFFEN",
    erstelltAm: "2026-06-04",
  },
  {
    id: "i5",
    firmaId: "f3",
    titel: "Reinigungskraft für Bürogebäude",
    beruf: "Reinigungskraft",
    beschreibung:
      "Unterhaltsreinigung eines Bürogebäudes in den Abendstunden. Geregelte Arbeitszeiten.",
    anforderungen: ["Erfahrung in der Gebäudereinigung", "Zuverlässigkeit", "Abendarbeit (ab 18 Uhr)"],
    ort: "Dietikon",
    startDatum: "2026-06-12",
    dauer: "Unbefristet (temporär)",
    status: "OFFEN",
    erstelltAm: "2026-06-04",
  },
];

export const kandidaten: Kandidat[] = [
  // Inserat i1 – Maler
  {
    id: "k1",
    inseratId: "i1",
    agenturId: "a1",
    vorname: "Andreas",
    nachname: "Huber",
    beruf: "Maler",
    erfahrungJahre: 8,
    qualifikationen: ["EFZ Maler", "Gerüstbau-Erfahrung", "Fahrausweis Kat. B"],
    verfuegbarAb: "2026-06-15",
    status: "AUSSTEHEND",
    notiz: "Sehr zuverlässig, war bereits in mehreren Grossprojekten im Einsatz.",
  },
  {
    id: "k2",
    inseratId: "i1",
    agenturId: "a2",
    vorname: "Luka",
    nachname: "Petrović",
    beruf: "Maler",
    erfahrungJahre: 5,
    qualifikationen: ["EFZ Maler", "Tapezier-Spezialist"],
    verfuegbarAb: "2026-06-16",
    status: "AUSSTEHEND",
    notiz: "Spezialisiert auf hochwertige Innenanstriche und Tapezierarbeiten.",
  },
  // Inserat i2 – Schreiner
  {
    id: "k3",
    inseratId: "i2",
    agenturId: "a1",
    vorname: "Marco",
    nachname: "Steiner",
    beruf: "Schreiner",
    erfahrungJahre: 12,
    qualifikationen: ["EFZ Schreiner", "CNC-Erfahrung", "Vorarbeiter"],
    verfuegbarAb: "2026-06-20",
    status: "AUSSTEHEND",
    notiz: "Langjährige Erfahrung im Innenausbau, kann auch ein Team führen.",
  },
  // Inserat i3 – Koch
  {
    id: "k4",
    inseratId: "i3",
    agenturId: "a1",
    vorname: "Sofia",
    nachname: "Rossi",
    beruf: "Koch",
    erfahrungJahre: 6,
    qualifikationen: ["Kochlehre EFZ", "Erfahrung Gourmetküche", "Allergen-Schulung"],
    verfuegbarAb: "2026-07-01",
    status: "AUSGEWAEHLT",
    notiz: "Kreativ, schnell, hervorragende Referenzen aus der gehobenen Gastronomie.",
  },
  {
    id: "k5",
    inseratId: "i3",
    agenturId: "a2",
    vorname: "Jonas",
    nachname: "Meier",
    beruf: "Koch",
    erfahrungJahre: 3,
    qualifikationen: ["Kochlehre EFZ", "à-la-carte Erfahrung"],
    verfuegbarAb: "2026-07-03",
    status: "ABGELEHNT",
    notiz: "Junger, motivierter Koch mit solider Grundausbildung.",
  },
  // Inserat i4 – Lagerist
  {
    id: "k6",
    inseratId: "i4",
    agenturId: "a2",
    vorname: "Ahmed",
    nachname: "Yilmaz",
    beruf: "Lagerist",
    erfahrungJahre: 4,
    qualifikationen: ["Staplerausweis Kat. R", "Logistik-Grundkurs", "Schichterfahrung"],
    verfuegbarAb: "2026-06-10",
    status: "AUSSTEHEND",
    notiz: "Erfahren im Umgang mit Lagerverwaltungssystemen (SAP).",
  },
  // Inserat i5 – Reinigungskraft
  {
    id: "k7",
    inseratId: "i5",
    agenturId: "a1",
    vorname: "Maria",
    nachname: "Santos",
    beruf: "Reinigungskraft",
    erfahrungJahre: 7,
    qualifikationen: ["Gebäudereinigung", "Bodenpflege-Maschinen", "Referenzen vorhanden"],
    verfuegbarAb: "2026-06-12",
    status: "AUSSTEHEND",
    notiz: "Sehr gründlich und zuverlässig, langjährige Unterhaltsreinigung.",
  },
];

// --- Hilfsfunktionen ---

export function getFirma(id: string): Firma | undefined {
  return firmen.find((f) => f.id === id);
}

export function getAgentur(id: string): Agentur | undefined {
  return agenturen.find((a) => a.id === id);
}

export function getInserat(id: string): Inserat | undefined {
  return inserate.find((i) => i.id === id);
}

export function getInserateVonFirma(firmaId: string): Inserat[] {
  return inserate.filter((i) => i.firmaId === firmaId);
}

export function getKandidatenFuerInserat(inseratId: string): Kandidat[] {
  return kandidaten.filter((k) => k.inseratId === inseratId);
}

export function getKandidatenVonAgentur(agenturId: string): Kandidat[] {
  return kandidaten.filter((k) => k.agenturId === agenturId);
}

export function getEingereichtVonAgentur(agenturId: string, inseratId: string): Kandidat | undefined {
  return kandidaten.find((k) => k.agenturId === agenturId && k.inseratId === inseratId);
}
