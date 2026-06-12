// Gemeinsame Domänen-Typen für TempMatch.
// SQLite kennt keine Enums – die Werte werden als String gespeichert, hier aber
// als TS-Union typisiert, damit der Code typsicher bleibt.

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
  verfuegbarBis?: string;
  telefon?: string;
  email?: string;
  fruehererArbeitgeber?: string;
  status: KandidatStatus;
  notiz: string;
  hatCv?: boolean;
  cvDateiname?: string;
}

export interface Meldung {
  id: string;
  kandidatId: string;
  kandidatName: string;
  grund: string;
  erstelltAm: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  rolle: string;
  erstelltAm: string;
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
  festanstellungMoeglich?: boolean;
  status: InseratStatus;
  erstelltAm: string;
}
