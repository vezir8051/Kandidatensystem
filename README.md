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
- **Prisma 6** + **PostgreSQL** (Vercel Postgres in Produktion)
- **Tailwind CSS** für das Styling

## Starten

Voraussetzung: eine erreichbare PostgreSQL-Datenbank. `DATABASE_URL` in einer
`.env` setzen (z. B. lokales Postgres oder die Vercel-Postgres-URL):

```bash
echo 'DATABASE_URL="postgresql://USER:PASS@HOST:5432/DBNAME"' > .env

npm install            # erzeugt auch den Prisma-Client (postinstall)
npm run db:push        # legt das Schema in der DB an
npm run db:seed        # befüllt die DB mit den Ausgangsdaten (idempotent)
npm run dev            # http://localhost:3000

npm run db:reset       # DB komplett zurücksetzen + neu seeden
npm run build          # Produktions-Build
```

## Deployment auf Vercel

1. Im Vercel-Dashboard unter **Storage → Create Database → Postgres** anlegen
   und mit dem Projekt verbinden.
2. Sicherstellen, dass die Env-Var **`DATABASE_URL`** im Projekt gesetzt ist
   (auf die **direkte/Non-Pooling**-Connection-URL zeigen lassen – nötig für
   `prisma db push`).
3. Deploy auslösen. Der Build (`vercel.json → buildCommand`) führt automatisch
   `prisma db push` + Seed aus und baut danach die App.

Schema und Seed laufen also bei jedem Deploy automatisch; der Seed ist
idempotent (Upserts) und überschreibt keine zur Laufzeit erstellten Daten.

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
2. **Stripe-Abonnement** (29 CHF/Monat) für Agenturen
3. **E-Mail-Benachrichtigungen** (Auswahl, neue Einreichungen)
4. **Datei-Uploads** für Lebensläufe (PDF)
