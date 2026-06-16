import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Jobwish verwendet Jost als Display-Schrift (geometrisch, rund).
const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

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
    <html lang="de" className={`${inter.variable} ${jost.variable}`}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
