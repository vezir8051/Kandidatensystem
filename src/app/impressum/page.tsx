import { RechtsSeite, Absatz } from "@/components/rechts-seite";

export const metadata = { title: "Impressum – TempMatch" };

export default function Impressum() {
  return (
    <RechtsSeite titel="Impressum">
      <Absatz
        titel="Betreiber"
        text="TempMatch (Demo-Version) – Arbeitstitel eines Plattform-Prototyps. Die finalen Firmenangaben werden vor dem produktiven Start ergänzt."
      />
      <Absatz titel="Sitz" text="Schweiz" />
      <Absatz
        titel="Kontakt"
        text="Anfragen bitte über das Kontaktformular auf der Startseite. Eine E-Mail-Adresse wird zum Launch veröffentlicht."
      />
      <Absatz
        titel="Haftungsausschluss"
        text="TempMatch stellt lediglich die Plattform für den Kontakt zwischen Firmen und Vermittlungsbüros bereit. Für die vermittelten Einsätze und Verträge sind die beteiligten Parteien selbst verantwortlich."
      />
    </RechtsSeite>
  );
}
