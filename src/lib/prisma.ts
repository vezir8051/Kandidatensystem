import { PrismaClient } from "@prisma/client";

// Vercel Postgres injiziert je nach Integration unterschiedliche Variablennamen.
// Wir lösen die Verbindungs-URL tolerant auf, damit weder Build noch Runtime an
// einem fehlenden DATABASE_URL scheitern, solange irgendeine gültige URL gesetzt ist.
export function resolveDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL || // Vercel Postgres, gepoolt (gut für Serverless-Runtime)
    process.env.POSTGRES_URL_NON_POOLING || // Vercel Postgres, direkt
    process.env.DATABASE_URL_UNPOOLED || // Neon-Integration
    process.env.POSTGRES_URL ||
    undefined
  );
}

// Singleton, damit im Next.js-Dev-Modus (Hot Reload) nicht bei jedem Reload
// eine neue Verbindung geöffnet wird.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const url = resolveDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    // url kann undefined sein -> dann nutzt Prisma den Wert aus dem Schema (env).
    ...(url ? { datasources: { db: { url } } } : {}),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
