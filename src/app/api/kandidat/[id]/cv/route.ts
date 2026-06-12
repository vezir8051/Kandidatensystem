import { prisma } from "@/lib/prisma";

// Liefert den Lebenslauf-PDF eines Kandidaten aus.
// Liegt hinter der seitenweiten Passwort-Middleware (nur mit Zugang abrufbar).
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const kandidat = await prisma.kandidat.findUnique({
    where: { id },
    select: { cvInhalt: true, cvDateiname: true },
  });

  if (!kandidat?.cvInhalt) {
    return new Response("Kein Lebenslauf vorhanden.", { status: 404 });
  }

  const name = kandidat.cvDateiname || "lebenslauf.pdf";
  const bytes = new Uint8Array(kandidat.cvInhalt);
  return new Response(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${encodeURIComponent(name)}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
