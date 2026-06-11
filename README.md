# TempMatch

B2B-Plattform, die Schweizer Firmen mit temporären Vermittlungsbüros (Agenturen)
verbindet. Firmen inserieren ihren Personalbedarf, Agenturen reichen pro Inserat
einen Kandidaten ein, die Firma wählt aus.

> **Backend-Stand.** Die App schreibt und liest echte Daten über eine
> Datenbank (Prisma). Inserate erstellen, Kandidaten einreichen sowie
> auswählen/ablehnen werden persistiert. Noch offen: Authentifizierung
> (aktuell „eingeloggt" als feste Demo-Firma/-Agentur) und Zahlungen.

## Tech-Stack

- **Next.js 15** (App Router, Server Actions) + **React 18** + **TypeScript**
- **Prisma 6** + **SQLite** (lokal) – für Produktion auf PostgreSQL umstellbar
- **Tailwind CSS** für das Styling

## Starten

```bash
npm install            # erzeugt auch den Prisma-Client (postinstall)
npm run db:push        # legt das DB-Schema in prisma/dev.db an
npm run db:seed        # befüllt die DB mit den Ausgangsdaten
npm run dev            # http://localhost:3000

npm run db:reset       # DB komplett zurücksetzen + neu seeden
npm run build          # Produktions-Build
```

Die Verbindung wird über `DATABASE_URL` in `.env` gesteuert
(Standard: `file:./dev.db`).

## Architektur

- `prisma/schema.prisma` – Datenmodell (Firma, Agentur, Inserat, Kandidat)
- `prisma/seed.ts` – befüllt die DB aus `src/lib/demo-data.ts`
- `src/lib/types.ts` – gemeinsame Domänen-Typen
- `src/lib/prisma.ts` – Prisma-Client (Singleton)
- `src/lib/db.ts` – Lese-Schicht (mappt DB-Zeilen auf Domänen-Typen)
- `src/lib/actions.ts` – Server Actions (Schreibvorgänge)

## Seiten

| Route | Beschreibung |
|---|---|
| `/` | Landing-Page mit Demo-Login-Buttons |
| `/firma` | Firmen-Dashboard (eingeloggt als „Müller Bau AG") |
| `/firma/inserat/[id]` | Eingereichte Kandidaten zu einem Inserat ansehen |
| `/agentur` | Agentur-Dashboard (eingeloggt als „FlexPersonal AG") |
| `/agentur/inserat/[id]` | Kandidat für ein Inserat einreichen (Formular) |

## Ausgangsdaten

3 Firmen, 2 Agenturen, 5 Inserate, 7 Kandidaten – als Seed definiert in
`src/lib/demo-data.ts` und über `npm run db:seed` in die DB geladen.

## Nächste Schritte (MVP)

1. **Authentifizierung** (NextAuth.js) für Firmen / Agenturen / Admin –
   ersetzt die festen Demo-Identitäten (`AKTUELLE_FIRMA_ID`, erste Agentur)
2. **Produktions-Datenbank**: Prisma-Datasource auf `postgresql` umstellen
   und `DATABASE_URL` auf eine gehostete DB (z. B. Vercel Postgres / Neon)
   zeigen lassen – SQLite ist auf Vercel nicht persistent
3. **Stripe-Abonnement** (29 CHF/Monat) für Agenturen
4. **E-Mail-Benachrichtigungen** (Auswahl, neue Einreichungen)
5. **Datei-Uploads** für Lebensläufe (PDF)
