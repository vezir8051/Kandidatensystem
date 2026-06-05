import { RechtsSeite, Absatz } from "@/components/rechts-seite";

export const metadata = { title: "Datenschutz – TempMatch" };

export default function Datenschutz() {
  return (
    <RechtsSeite titel="Datenschutzerklärung">
      <p className="text-sm text-slate-600">
        Der Schutz Ihrer Personendaten ist uns wichtig. Diese Erklärung richtet sich nach dem
        Schweizer Datenschutzgesetz (nDSG).
      </p>
      <Absatz
        titel="1. Verantwortliche Stelle"
        text="Verantwortlich für die Datenbearbeitung ist die TempMatch (Demo). Bei Fragen erreichen Sie uns über das Kontaktformular."
      />
      <Absatz
        titel="2. Welche Daten wir bearbeiten"
        text="Wir bearbeiten Kontaktdaten von Firmen und Agenturen (Name, E-Mail, Telefon) sowie Inserate- und Kandidatendaten, die zur Vermittlung notwendig sind."
      />
      <Absatz
        titel="3. Kandidatendaten"
        text="Agenturen reichen Kandidatendaten nur mit ausdrücklichem Einverständnis der betroffenen Person ein. Diese Daten werden ausschliesslich der inserierenden Firma zugänglich gemacht."
      />
      <Absatz
        titel="4. Speicherdauer"
        text="Daten werden nur so lange gespeichert, wie es für den Vermittlungszweck nötig ist. Inserate und zugehörige Kandidatenprofile werden nach 90 Tagen archiviert."
      />
      <Absatz
        titel="5. Ihre Rechte"
        text="Sie haben jederzeit das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten. Wenden Sie sich dazu an die verantwortliche Stelle."
      />
    </RechtsSeite>
  );
}
