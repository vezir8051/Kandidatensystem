// Markt-Radar: Statische Demo-Daten für drei Signal-Typen.
// Produktiv würden diese von Scrapers / APIs (SHAB, Zefix, simap.ch, jobs.ch) befüllt.

interface RadarSignalBase {
  id: string;
  firmaName: string;
  firmaOrt: string;
  branche: string;
  warum: string;       // Erklärt der Agentur warum sie jetzt anrufen sollte
  datum: string;       // ISO – wann Signal erkannt
  prioritaet: 1 | 2 | 3;
}

export interface StaleInserat extends RadarSignalBase {
  typ: "STALE_INSERAT";
  quellePlattform: string;
  berufsbezeichnung: string;
  alterTage: number;
}

export interface KandidatenAbgang extends RadarSignalBase {
  typ: "KANDIDATEN_ABGANG";
  kandidatVorname: string;
  abgangDatum: string;
  berufsfeld: string;
}

export type WachstumsTyp =
  | "HANDELSREGISTER_NEUEINTRAGUNG"
  | "KAPITALERHOEHUNG"
  | "BAUGENEHMIGUNG"
  | "SIMAP_AUSSCHREIBUNG_GEWONNEN";

export interface Wachstumssignal extends RadarSignalBase {
  typ: "WACHSTUMSSIGNAL";
  wachstumsTyp: WachstumsTyp;
  quelleLabel: string;
  details: string;
}

export type RadarSignal = StaleInserat | KandidatenAbgang | Wachstumssignal;

export const wachstumsTypLabel: Record<WachstumsTyp, string> = {
  HANDELSREGISTER_NEUEINTRAGUNG: "Neueintragung",
  KAPITALERHOEHUNG: "Kapitalerhöhung",
  BAUGENEHMIGUNG: "Baugenehmigung",
  SIMAP_AUSSCHREIBUNG_GEWONNEN: "Submissionsgewinn",
};

export function prioritaetLabel(p: 1 | 2 | 3): string {
  return p === 1 ? "Sofort handeln" : p === 2 ? "Diese Woche" : "Beobachten";
}

export const staleInserate: StaleInserat[] = [
  {
    id: "sr1",
    typ: "STALE_INSERAT",
    firmaName: "Pfister Holzbau GmbH",
    firmaOrt: "Thun",
    branche: "Baugewerbe",
    quellePlattform: "jobs.ch",
    berufsbezeichnung: "Zimmermann EFZ",
    alterTage: 52,
    datum: "2026-04-15",
    prioritaet: 1,
    warum:
      "Inserat seit 52 Tagen aktiv – bereits zweimal neu aufgeschaltet. Deutet darauf hin, dass die Direktanstellung nicht gelingt. Jetzt ist der Moment für ein Agentur-Angebot.",
  },
  {
    id: "sr2",
    typ: "STALE_INSERAT",
    firmaName: "Compass Group Schweiz AG",
    firmaOrt: "Bern",
    branche: "Gastronomie / Catering",
    quellePlattform: "jobscout24.ch",
    berufsbezeichnung: "Koch / Köchin",
    alterTage: 61,
    datum: "2026-04-06",
    prioritaet: 1,
    warum:
      "Seit über zwei Monaten inseriert. Gastronomie-Betriebe mit solch langen Laufzeiten haben erfahrungsgemäss einen dringenden, dauerhaften Bedarf – idealer Kandidat für eine Temporär-Lösung.",
  },
  {
    id: "sr3",
    typ: "STALE_INSERAT",
    firmaName: "Erne AG Bauunternehmung",
    firmaOrt: "Aarau",
    branche: "Tiefbau",
    quellePlattform: "indeed.ch",
    berufsbezeichnung: "Maurer / Polier",
    alterTage: 45,
    datum: "2026-04-22",
    prioritaet: 2,
    warum:
      "45 Tage – noch kein Zeichen, dass die Stelle besetzt ist. Tiefbaubetriebe starten häufig Projekte mit kurzem Vorlauf. Ein Anruf diese Woche kommt rechtzeitig.",
  },
  {
    id: "sr4",
    typ: "STALE_INSERAT",
    firmaName: "Stäubli International AG",
    firmaOrt: "Horgen",
    branche: "Maschinenbau",
    quellePlattform: "jobs.ch",
    berufsbezeichnung: "Elektriker Instandhaltung",
    alterTage: 44,
    datum: "2026-04-23",
    prioritaet: 2,
    warum:
      "Spezialisiertes Profil (Instandhaltung) ist schwer direkt zu besetzen. Agenturen mit Elektrikern im Pool haben hier einen klaren Vorteil.",
  },
];

export const kandidatenAbgaenge: KandidatenAbgang[] = [
  {
    id: "ka1",
    typ: "KANDIDATEN_ABGANG",
    firmaName: "Migros Genossenschaft",
    firmaOrt: "Zürich",
    branche: "Logistik / Handel",
    kandidatVorname: "Sofie",
    berufsfeld: "Lageristin",
    abgangDatum: "2026-06-03",
    datum: "2026-06-03",
    prioritaet: 1,
    warum:
      "Kandidatin Sofie hat am 03.06. ihren Austritt aus der Migros-Logistik gemeldet. Die Stelle ist noch nicht ausgeschrieben – versteckter Bedarf. Sie haben einen Vorsprung von Tagen gegenüber allen anderen Agenturen.",
  },
  {
    id: "ka2",
    typ: "KANDIDATEN_ABGANG",
    firmaName: "Helion Energy AG",
    firmaOrt: "Schlieren",
    branche: "Energie / Photovoltaik",
    kandidatVorname: "Bruno",
    berufsfeld: "Elektriker",
    abgangDatum: "2026-06-01",
    datum: "2026-06-01",
    prioritaet: 1,
    warum:
      "Bruno hat per 01.06. gekündigt. Helion wächst stark (Solarboom) und wird den Elektriker sofort ersetzen wollen – wahrscheinlich sogar temporär überbrücken, bevor eine Festanstellung kommt.",
  },
  {
    id: "ka3",
    typ: "KANDIDATEN_ABGANG",
    firmaName: "ISS Facility Services AG",
    firmaOrt: "Zürich",
    branche: "Gebäudereinigung",
    kandidatVorname: "Nadine",
    berufsfeld: "Reinigungskraft",
    abgangDatum: "2026-05-28",
    datum: "2026-05-28",
    prioritaet: 2,
    warum:
      "Nadine hat ISS Ende Mai verlassen. Reinigungsunternehmen haben typischerweise hohe Fluktuation – die Stelle wurde möglicherweise noch nicht ausgeschrieben.",
  },
];

export const wachstumssignale: Wachstumssignal[] = [
  {
    id: "ws1",
    typ: "WACHSTUMSSIGNAL",
    firmaName: "Implenia AG (Niederlassung Luzern)",
    firmaOrt: "Luzern",
    branche: "Infrastruktur / Tiefbau",
    wachstumsTyp: "SIMAP_AUSSCHREIBUNG_GEWONNEN",
    quelleLabel: "simap.ch",
    details: "Zuschlag Tiefbauauftrag Umfahrungsstrasse Luzern Nord – CHF 14.2 Mio.",
    datum: "2026-06-02",
    prioritaet: 1,
    warum:
      "Ein Auftrag dieser Grösse bedeutet sofortiger Personalbedarf auf der Baustelle. Implenia beginnt typischerweise innerhalb von 4–6 Wochen nach Zuschlag. Der Anruf heute ist der Anruf vor allen anderen.",
  },
  {
    id: "ws2",
    typ: "WACHSTUMSSIGNAL",
    firmaName: "Novartis Pharma AG",
    firmaOrt: "Stein AG",
    branche: "Pharma / Produktion",
    wachstumsTyp: "BAUGENEHMIGUNG",
    quelleLabel: "Kanton Aargau – Baubewilligungen",
    details: "Baugenehmigung für neues Produktionsgebäude, Nutzfläche 8'400 m².",
    datum: "2026-05-28",
    prioritaet: 1,
    warum:
      "Neues Gebäude = Bauphase (Monteure, Logistik) + Inbetriebnahme (Techniker, Reinigung). Zwei verschiedene Personalwellen in den nächsten 12–18 Monaten.",
  },
  {
    id: "ws3",
    typ: "WACHSTUMSSIGNAL",
    firmaName: "DataHub Solutions GmbH",
    firmaOrt: "Zug",
    branche: "IT / Software",
    wachstumsTyp: "HANDELSREGISTER_NEUEINTRAGUNG",
    quelleLabel: "Zefix",
    details: "Neueintragung im Handelsregister, Stammkapital CHF 100'000, 6–8 Mitarbeitende geplant.",
    datum: "2026-05-30",
    prioritaet: 2,
    warum:
      "Frisch gegründete Tech-Firmen in Zug skalieren rasch. Erfahrungsgemäss suchen sie in den ersten 6 Monaten Unterstützung für Backoffice, Logistik oder Kundenservice – oft temporär.",
  },
  {
    id: "ws4",
    typ: "WACHSTUMSSIGNAL",
    firmaName: "Energie 360° AG",
    firmaOrt: "Zürich",
    branche: "Energie / Fernwärme",
    wachstumsTyp: "KAPITALERHOEHUNG",
    quelleLabel: "SHAB",
    details: "Kapitalerhöhung von CHF 8 Mio. auf CHF 12.5 Mio. – Ausbau Fernwärmenetz Zürich Nord.",
    datum: "2026-05-26",
    prioritaet: 2,
    warum:
      "Kapitalerhöhung für Netzausbau = Bauprojekte = Bedarf an Monteuren, Tiefbauern und Hilfskräften über mehrere Monate. Gut planbar.",
  },
];
