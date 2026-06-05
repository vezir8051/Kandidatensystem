# TempMatch – Demo

B2B-Plattform, die Schweizer Firmen mit temporären Vermittlungsbüros (Agenturen)
verbindet. Firmen inserieren ihren Personalbedarf, Agenturen reichen pro Inserat
einen Kandidaten ein, die Firma wählt aus.

> **Dies ist die Demo-Version.** Alle Daten sind hartcodierte Beispieldaten
> (`src/lib/demo-data.ts`). Es gibt keine echte Anmeldung, keine Datenbank und
> keine Zahlungen. Der vollständige Businessplan liegt separat vor.

## Tech-Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** für das Styling
- Keine Datenbank – statische Demo-Daten

## Starten

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build
```

## Seiten

| Route | Beschreibung |
|---|---|
| `/` | Landing-Page mit Demo-Login-Buttons |
| `/firma` | Firmen-Dashboard (eingeloggt als „Müller Bau AG") |
| `/firma/inserat/[id]` | Eingereichte Kandidaten zu einem Inserat ansehen |
| `/agentur` | Agentur-Dashboard (eingeloggt als „FlexPersonal AG") |
| `/agentur/inserat/[id]` | Kandidat für ein Inserat einreichen (Formular) |

## Demo-Daten

3 Firmen, 2 Agenturen, 5 Inserate, 7 Kandidaten – definiert in
`src/lib/demo-data.ts`.

## Nächste Schritte (MVP)

Die Demo zeigt die Benutzerführung. Für den echten MVP folgen:

1. PostgreSQL + Prisma (Datenmodell ersetzt `demo-data.ts`)
2. Authentifizierung (NextAuth.js) für Firmen / Agenturen / Admin
3. Echte Inserat- und Kandidaten-Funktionen (Erstellen, Einreichen, Auswählen)
4. Stripe-Abonnement (29 CHF/Monat) für Agenturen
5. E-Mail-Benachrichtigungen
