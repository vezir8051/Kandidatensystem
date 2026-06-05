import { RechtsSeite, Absatz } from "@/components/rechts-seite";

export const metadata = { title: "AGB – TempMatch" };

export default function AGB() {
  return (
    <RechtsSeite titel="Allgemeine Geschäftsbedingungen">
      <Absatz
        titel="1. Geltungsbereich"
        text="Diese AGB regeln die Nutzung der TempMatch-Plattform durch Firmen und Vermittlungsbüros (Agenturen). Mit der Registrierung erklären sich Nutzer mit diesen Bedingungen einverstanden."
      />
      <Absatz
        titel="2. Rolle der Plattform – kein Garant"
        text="TempMatch ist ein reiner Marktplatz und vermittelt den Erstkontakt zwischen Firmen und Agenturen. TempMatch ist nicht Vertragspartei bei Einsätzen und übernimmt keine Haftung für den Verlauf, die Qualität oder die Ausführung von Arbeitseinsätzen. Bei No-Shows, Einsatzabbrüchen oder Qualitätsmängeln ist ausschliesslich die beteiligte Agentur verantwortlich."
      />
      <Absatz
        titel="3. Direktkontakt-Verbot und Plattform-Exklusivität"
        text="Firmen dürfen Kandidaten, deren Daten über TempMatch bekanntgegeben wurden, nicht unter Umgehung der einreichenden Agentur direkt kontaktieren oder beauftragen. Für einen Zeitraum von 24 Monaten nach dem ersten Kontakt über TempMatch sind alle weiteren Vermittlungen zwischen derselben Firma und Agentur über die Plattform abzuwickeln oder zu melden. Ein Verstoss gegen dieses Verbot stellt einen Vertragsbruch dar und kann zur sofortigen Sperrung des Plattformzugangs führen."
      />
      <Absatz
        titel="4. Meldepflicht für Einsätze"
        text="Agenturen sind verpflichtet, alle Einsätze, die aus einem über TempMatch hergestellten Kontakt resultieren, auf der Plattform zu melden – auch wenn die Abwicklung ausserhalb der Plattform erfolgt. Diese Pflicht gilt für 24 Monate nach dem Erstkontakt."
      />
      <Absatz
        titel="5. Festanstellungs-Klausel"
        text="Stellt eine Firma einen über TempMatch vermittelten Kandidaten innerhalb von 12 Monaten nach dem Einsatz fest an, ohne dies im Inserat als erlaubt angegeben zu haben, löst dies eine Direktvermittlungsgebühr aus, die zwischen Firma und Agentur bilateral vereinbart und bezahlt wird. TempMatch ist an dieser Zahlung nicht beteiligt, weist aber auf diese branchenübliche Regelung hin."
      />
      <Absatz
        titel="6. Eine Einreichung pro Inserat"
        text="Pro Inserat darf eine Agentur genau einen Kandidaten einreichen. Mehrfacheinreichungen sind nicht zulässig. Reicht eine Agentur denselben Kandidaten mehrfach für dasselbe Inserat ein, gilt die erste Einreichung. Wird ein Kandidat von mehreren Agenturen eingereicht, hat die Agentur mit der früheren Einreichung Vorrang."
      />
      <Absatz
        titel="7. Wahrheitspflicht der Agentur"
        text="Agenturen haften für die Richtigkeit aller eingereichten Angaben, insbesondere Qualifikationen, Zertifikate und Berufserfahrung des Kandidaten. Bei nachweislichen Falschaussagen verliert die Agentur ihren Einreichungs-Slot für das betreffende Inserat ohne Rückerstattung. Bei wiederholten Verstössen droht die Sperrung des Abonnements ohne Rückerstattung."
      />
      <Absatz
        titel="8. Verfügbarkeitsgarantie"
        text="Durch die Einreichung garantiert die Agentur, dass der Kandidat bis zum angegebenen 'Verfügbar bis'-Datum kontaktierbar und für den Einsatz verfügbar ist. Ist der Kandidat zum Zeitpunkt der Auswahl durch die Firma nicht mehr verfügbar, trägt die Agentur die volle Verantwortung. Die Firma kann in diesem Fall den nächsten Kandidaten auswählen."
      />
      <Absatz
        titel="9. Datenschutz und nDSG"
        text="Die Agentur ist datenschutzrechtlich verantwortlich für die Kandidatendaten, die sie auf TempMatch einreicht. Sie bestätigt mit jeder Einreichung, dass der Kandidat sein ausdrückliches Einverständnis zur Weitergabe seiner Daten an die inserierenden Firmen erteilt hat, wie es das Schweizer Datenschutzgesetz (nDSG) verlangt. TempMatch fungiert als Auftragsbearbeiter. Kontaktdaten von Kandidaten werden nur der Firma zugänglich gemacht, die den Kandidaten ausgewählt hat."
      />
      <Absatz
        titel="10. Zahlung und Tarifvereinbarung"
        text="Der Tarif für einen vermittelten Einsatz sowie sämtliche Zahlungen werden direkt zwischen Firma und Agentur vereinbart und abgewickelt. TempMatch ist daran nicht beteiligt. Agenturen wird empfohlen, vor Einsatzbeginn einen eigenen Vertrag mit der Firma abzuschliessen."
      />
      <Absatz
        titel="11. Phantom-Inserate und automatische Archivierung"
        text="Inserate, bei denen innert 30 Tagen kein Kandidat ausgewählt wurde, werden automatisch archiviert und für Agenturen nicht mehr sichtbar. Die Firma erhält eine Erinnerungsbenachrichtigung. Firmen mit wiederholten Phantom-Inseraten können vom Admin kontaktiert oder gesperrt werden."
      />
      <Absatz
        titel="12. Abonnement und Kündigung"
        text="Agenturen benötigen ein aktives Abonnement (ab 29 CHF/Monat), um Kandidaten einzureichen. Das Abo ist monatlich kündbar. Bei nachgewiesenem Missbrauch der Plattform – insbesondere bei Verstössen gegen das Direktkontakt-Verbot, bei Falschaussagen oder bei Datenschutzverletzungen – kann TempMatch das Abonnement ohne Rückerstattung kündigen und das Konto sperren."
      />
      <Absatz
        titel="13. Sperrung bei Missbrauch"
        text="TempMatch behält sich vor, Nutzerkonten (Firmen wie Agenturen) bei Verstoss gegen diese AGB ohne Vorankündigung zu sperren. Schwerwiegende Verstösse – insbesondere das Umgehen der Agenturvergütung, die Einreichung gefälschter Kandidatendaten oder wiederholte Datenschutzverletzungen – können zivil- oder strafrechtliche Konsequenzen haben."
      />
      <Absatz
        titel="14. Leistung der Plattform"
        text="TempMatch garantiert keine minimale Anzahl an Inseraten, Kandidaten oder erfolgreichen Vermittlungen. Die Plattform stellt die technische Infrastruktur bereit; der Erfolg einer Vermittlung hängt von den beteiligten Parteien ab."
      />
      <Absatz
        titel="15. Änderungen"
        text="TempMatch behält sich vor, diese AGB anzupassen. Über wesentliche Änderungen werden die Nutzer per E-Mail informiert. Die weitere Nutzung der Plattform nach Inkrafttreten der neuen AGB gilt als Zustimmung."
      />
    </RechtsSeite>
  );
}
