# TempMatch (Kandidatensystem)

Temporär-Vermittlungsplattform für die Schweiz im Jobwish-Stil. Firmen schreiben
Inserate aus, Agenturen reichen Kandidaten ein, Firmen wählen aus.

## Tech-Stack

- **Next.js 15** (App Router, Server Components, Server Actions, `force-dynamic`)
- **Prisma 6** + **PostgreSQL** (lokal Port 5433; Neon/Vercel Postgres in Produktion)
- **Tailwind CSS** mit eigenem Theme (Brand-Blau, Accent Pink/Purple, `font-display` = Jost)
- Deployment auf **Vercel** (Merge auf `claude/temp-staffing-marketplace-Lmcay` = Produktion)

## Wichtige Pfade

- `src/app/` — Seiten (Startseite, `firma`, `agentur`, `admin`, Detail- und Rechtsseiten)
- `src/components/` — UI-Komponenten
- `src/lib/actions.ts` — Server Actions (Inserat erstellen, Kandidat einreichen/auswählen)
- `src/lib/db.ts`, `src/lib/prisma.ts` — Datenzugriff
- `prisma/schema.prisma`, `prisma/seed.ts` — Datenbank & Seed

## Agent skills

### Issue tracker

Issues und PRDs leben als GitHub-Issues in `vezir8051/Kandidatensystem`. See `docs/agents/issue-tracker.md`.

### Triage labels

Standard-Vokabular (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context (ein `CONTEXT.md` + `docs/adr/` im Root, sobald angelegt). See `docs/agents/domain.md`.
