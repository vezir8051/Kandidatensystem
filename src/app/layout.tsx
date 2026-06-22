import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AgentationGate } from "@/components/agentation-gate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="de" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        {children}
        <AgentationGate />
      </body>
    </html>
  );
}
