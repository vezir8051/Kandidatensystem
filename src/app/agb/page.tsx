import { RechtsSeite, Absatz } from "@/components/rechts-seite";

export const metadata = { title: "AGB – TempMatch" };

export default function AGB() {
  return (
    <RechtsSeite titel="Allgemeine Geschäftsbedingungen">
      <Absatz
        titel="1. Geltungsbereich"
        text="Diese AGB regeln die Nutzung der TempMatch-Plattform durch Firmen und Vermittlungsbüros (Agenturen)."
      />
      <Absatz
        titel="2. Leistung der Plattform"
        text="TempMatch vermittelt den Kontakt zwischen Firmen mit Personalbedarf und Agenturen. Die Plattform wickelt selbst keine Arbeitsverträge oder Zahlungen zwischen Firma und Agentur ab."
      />
      <Absatz
        titel="3. Abonnement für Agenturen"
        text="Agenturen benötigen ein aktives Abonnement (ab 29 CHF/Monat), um Kandidaten einzureichen. Das Abo ist monatlich kündbar."
      />
      <Absatz
        titel="4. Eine Einreichung pro Inserat"
        text="Pro Inserat darf eine Agentur genau einen Kandidaten einreichen. Mehrfacheinreichungen sind nicht zulässig."
      />
      <Absatz
        titel="5. Pflichten der Agenturen"
        text="Agenturen sichern zu, dass eingereichte Kandidaten ihr Einverständnis zur Datenweitergabe erteilt haben und die Angaben wahrheitsgetreu sind."
      />
      <Absatz
        titel="6. Tarifvereinbarung"
        text="Der Tarif für einen vermittelten Einsatz wird direkt zwischen Firma und Agentur vereinbart. TempMatch ist daran nicht beteiligt."
      />
      <Absatz
        titel="7. Änderungen"
        text="TempMatch behält sich vor, diese AGB anzupassen. Über wesentliche Änderungen werden die Nutzer informiert."
      />
    </RechtsSeite>
  );
}
