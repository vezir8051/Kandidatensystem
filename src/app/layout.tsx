import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TempMatch – Temporär-Vermittlung für die Schweiz",
  description:
    "Die B2B-Plattform, die Firmen mit temporären Vermittlungsbüros verbindet. Schluss mit Kaltakquise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
