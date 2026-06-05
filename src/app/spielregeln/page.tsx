import Link from "next/link";
import { RechtsSeite } from "@/components/rechts-seite";

export const metadata = { title: "Spielregeln – TempMatch" };

function Regel({
  icon,
  titel,
  text,
}: {
  icon: string;
  titel: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="text-2xl mt-0.5 shrink-0">{icon}</div>
      <div>
        <h2 className="font-semibold text-slate-900 text-base mb-1">{titel}</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export default function Spielregeln() {
  return (
    <RechtsSeite titel="Die Spielregeln">
      <p className="text-sm text-slate-600 leading-relaxed">
        Kurz und klar – damit alle wissen, wie TempMatch funktioniert und was fair ist. Die
        vollständigen rechtlichen Details finden Sie in den{" "}
        <Link href="/agb" className="text-brand-600 hover:underline">
          AGB
        </Link>
        .
      </p>

      <div className="mt-6 space-y-6">
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
          Für Firmen
        </h3>

        <Regel
          icon="🏢"
          titel="Kostenlos inserieren"
          text="Firmen inserieren kostenlos. Beschreiben Sie einfach, wen Sie suchen – Beruf, Dauer, Startdatum – und Agenturen mit passenden Kandidaten melden sich."
        />
        <Regel
          icon="👁"
          titel="Alle Kandidaten sofort sichtbar"
          text="Sie sehen alle eingereichten Kandidaten mit Namen, Erfahrung, Qualifikationen und einer Notiz der Agentur. Kontaktdaten werden erst nach Ihrer Auswahl freigegeben."
        />
        <Regel
          icon="🤝"
          titel="Tarif direkt mit der Agentur vereinbaren"
          text="Preise werden nicht auf der Plattform angezeigt. Nach Ihrer Auswahl nehmen Sie direkt mit der Agentur Kontakt auf und verhandeln den Tarif bilateral."
        />
        <Regel
          icon="⚠️"
          titel="Kein Direktkontakt ohne Agentur"
          text="Kandidatendaten, die Sie über TempMatch erhalten, dürfen Sie nicht dazu nutzen, Kandidaten direkt zu engagieren und die Agentur zu umgehen. Das ist ein Vertragsbruch und führt zur sofortigen Sperrung."
        />
        <Regel
          icon="📅"
          titel="30-Tage-Regel"
          text="Inserate ohne Auswahl werden nach 30 Tagen automatisch archiviert. Sie erhalten vorher eine Erinnerung. So halten wir die Plattform aktuell – für alle."
        />
      </div>

      <div className="mt-8 space-y-6">
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
          Für Agenturen
        </h3>

        <Regel
          icon="📋"
          titel="Einen Kandidaten pro Inserat"
          text="Pro Inserat darf jede Agentur genau einen Kandidaten einreichen. Das zwingt zur Qualität statt Masse – und gibt Ihrer Einreichung mehr Gewicht."
        />
        <Regel
          icon="✅"
          titel="Nur verfügbare Kandidaten einreichen"
          text="Beim Einreichen geben Sie an, bis wann der Kandidat verfügbar und erreichbar ist. Reichen Sie nur ein, wenn Sie sicher sind – Sie haften für die Angaben."
        />
        <Regel
          icon="🔒"
          titel="Einverständnis immer einholen"
          text="Der Kandidat muss sein Einverständnis zur Datenweitergabe gegeben haben (nDSG). Sie sind datenschutzrechtlich verantwortlich – TempMatch verarbeitet die Daten nur in Ihrem Auftrag."
        />
        <Regel
          icon="💬"
          titel="Wahrheitsgetreue Angaben"
          text="Qualifikationen, Zertifikate und Berufserfahrung müssen stimmen. Falsche Angaben führen zum Verlust des Einreichungs-Slots und bei Wiederholung zur Abo-Sperre."
        />
        <Regel
          icon="📞"
          titel="Einsätze über die Plattform abwickeln"
          text="Wurde ein Kontakt über TempMatch hergestellt, gehören alle weiteren Einsätze in dieser Beziehung für 24 Monate auf die Plattform. So bleibt das System fair für alle – und Sie behalten Ihren Zugang zu neuen Firmenkunden."
        />
      </div>

      <div className="mt-8 bg-brand-50 border border-brand-100 rounded-xl p-5 space-y-3">
        <h3 className="font-bold text-brand-900">Warum lohnt sich das Abo dauerhaft?</h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          29 CHF im Monat – für einen einzigen erfolgreichen Einsatz (der typischerweise Hunderte
          Franken wert ist) ist das kein Hindernis.
        </p>
        <ul className="text-sm text-slate-700 space-y-2">
          <li className="flex gap-2">
            <span className="text-brand-600 font-bold shrink-0">→</span>
            <span>
              <strong>Laufend neue Firmenkunden:</strong> Firmen posten ständig neue Inserate.
              Ohne Abo sehen Sie diese nicht – selbst für Firmen, mit denen Sie schon zusammengearbeitet haben.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-brand-600 font-bold shrink-0">→</span>
            <span>
              <strong>Ihr Ruf auf der Plattform:</strong> Agenturen mit vielen erfolgreichen
              Einreichungen werden prominenter gelistet. Das Abo aufzugeben bedeutet, dieses
              Reputationskapital zu verlieren.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-brand-600 font-bold shrink-0">→</span>
            <span>
              <strong>Einreichungshistorie und Dokumentation:</strong> Alle Placements, CVs und
              Kandidatenprofile bleiben in Ihrer Übersicht – für Audits, Steuern und Referenzen.
            </span>
          </li>
        </ul>
      </div>
    </RechtsSeite>
  );
}
