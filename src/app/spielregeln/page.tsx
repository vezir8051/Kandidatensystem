import Link from "next/link";
import { RechtsSeite } from "@/components/rechts-seite";

export const metadata = { title: "Spielregeln – TempMatch" };

// Linien-Icons (24er-Grid, currentColor) – konsistent mit dem übrigen Seiten-Stil.
const ICONS: Record<string, React.ReactNode> = {
  inserieren: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      <path d="M9 7h2M9 11h2M9 15h2M13 7h2M13 11h2M13 15h2" />
    </>
  ),
  sichtbar: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  tarif: (
    <>
      <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
      <circle cx="7" cy="7" r="1.2" />
    </>
  ),
  warnung: (
    <>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
  kalender: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  liste: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6M9 16h6" />
    </>
  ),
  check: (
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </>
  ),
  schloss: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  sprechblase: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </>
  ),
  kreislauf: (
    <>
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </>
  ),
};

function Regel({
  icon,
  titel,
  text,
  tone = "brand",
}: {
  icon: keyof typeof ICONS;
  titel: string;
  text: string;
  tone?: "brand" | "warn";
}) {
  const farbe = tone === "warn" ? "bg-amber-50 text-amber-600" : "bg-brand-50 text-brand-600";
  return (
    <div className="flex gap-4">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${farbe}`}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {ICONS[icon]}
        </svg>
      </span>
      <div>
        <h2 className="font-semibold text-ink text-base mb-1">{titel}</h2>
        <p className="text-sm text-muted leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export default function Spielregeln() {
  return (
    <RechtsSeite titel="Die Spielregeln">
      <p className="text-sm text-muted leading-relaxed">
        Kurz und klar – damit alle wissen, wie TempMatch funktioniert und was fair ist. Die
        vollständigen rechtlichen Details finden Sie in den{" "}
        <Link href="/agb" className="text-brand-600 hover:underline">
          AGB
        </Link>
        .
      </p>

      <div className="mt-6 space-y-6">
        <h3 className="font-bold text-ink text-sm uppercase tracking-wide">Für Firmen</h3>

        <Regel
          icon="inserieren"
          titel="Kostenlos inserieren"
          text="Firmen inserieren kostenlos. Beschreiben Sie einfach, wen Sie suchen – Beruf, Dauer, Startdatum – und Agenturen mit passenden Kandidaten melden sich."
        />
        <Regel
          icon="sichtbar"
          titel="Alle Kandidaten sofort sichtbar"
          text="Sie sehen alle eingereichten Kandidaten mit Namen, Erfahrung, Qualifikationen und einer Notiz der Agentur. Kontaktdaten werden erst nach Ihrer Auswahl freigegeben."
        />
        <Regel
          icon="tarif"
          titel="Tarif direkt mit der Agentur vereinbaren"
          text="Preise werden nicht auf der Plattform angezeigt. Nach Ihrer Auswahl nehmen Sie direkt mit der Agentur Kontakt auf und verhandeln den Tarif bilateral."
        />
        <Regel
          icon="warnung"
          tone="warn"
          titel="Kein Direktkontakt ohne Agentur"
          text="Kandidatendaten, die Sie über TempMatch erhalten, dürfen Sie nicht dazu nutzen, Kandidaten direkt zu engagieren und die Agentur zu umgehen. Das ist ein Vertragsbruch und führt zur sofortigen Sperrung."
        />
        <Regel
          icon="kalender"
          titel="30-Tage-Regel"
          text="Inserate ohne Auswahl werden nach 30 Tagen automatisch archiviert. Sie erhalten vorher eine Erinnerung. So halten wir die Plattform aktuell – für alle."
        />
      </div>

      <div className="mt-8 space-y-6">
        <h3 className="font-bold text-ink text-sm uppercase tracking-wide">Für Agenturen</h3>

        <Regel
          icon="liste"
          titel="Einen Kandidaten pro Inserat"
          text="Pro Inserat darf jede Agentur genau einen Kandidaten einreichen. Das zwingt zur Qualität statt Masse – und gibt Ihrer Einreichung mehr Gewicht."
        />
        <Regel
          icon="check"
          titel="Nur verfügbare Kandidaten einreichen"
          text="Beim Einreichen geben Sie an, bis wann der Kandidat verfügbar und erreichbar ist. Reichen Sie nur ein, wenn Sie sicher sind – Sie haften für die Angaben."
        />
        <Regel
          icon="schloss"
          titel="Einverständnis immer einholen"
          text="Der Kandidat muss sein Einverständnis zur Datenweitergabe gegeben haben (nDSG). Sie sind datenschutzrechtlich verantwortlich – TempMatch verarbeitet die Daten nur in Ihrem Auftrag."
        />
        <Regel
          icon="sprechblase"
          titel="Wahrheitsgetreue Angaben"
          text="Qualifikationen, Zertifikate und Berufserfahrung müssen stimmen. Falsche Angaben führen zum Verlust des Einreichungs-Slots und bei Wiederholung zur Abo-Sperre."
        />
        <Regel
          icon="kreislauf"
          titel="Einsätze über die Plattform abwickeln"
          text="Wurde ein Kontakt über TempMatch hergestellt, gehören alle weiteren Einsätze in dieser Beziehung für 24 Monate auf die Plattform. So bleibt das System fair für alle – und Sie behalten Ihren Zugang zu neuen Firmenkunden."
        />
      </div>

      <div className="mt-8 bg-brand-50 border border-brand-100 rounded-xl p-5 space-y-3">
        <h3 className="font-bold text-brand-900">Warum lohnt sich das Abo dauerhaft?</h3>
        <p className="text-sm text-body leading-relaxed">
          29 CHF im Monat – für einen einzigen erfolgreichen Einsatz (der typischerweise Hunderte
          Franken wert ist) ist das kein Hindernis.
        </p>
        <ul className="text-sm text-body space-y-2">
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
