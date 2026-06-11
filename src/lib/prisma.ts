import { PrismaClient } from "@prisma/client";

// Singleton, damit im Next.js-Dev-Modus (Hot Reload) nicht bei jedem Reload
// eine neue Verbindung geöffnet wird.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
