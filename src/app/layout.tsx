import type { Metadata, Viewport } from "next";
import { Inter, Jost } from "next/font/google";
import "./globals.css";
import { ScrollTop } from "@/components/scroll-top";
import { AgentationGate } from "@/components/agentation-gate";

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

const beschreibung =
  "Die B2B-Plattform, die Firmen mit temporären Vermittlungsbüros verbindet. Schluss mit Kaltakquise.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kandidatensystem.vercel.app"),
  title: {
    default: "TempMatch – Temporär-Vermittlung für die Schweiz",
    template: "%s · TempMatch",
  },
  description: beschreibung,
  applicationName: "TempMatch",
  keywords: [
    "Temporärvermittlung",
    "Personalvermittlung",
    "Schweiz",
    "Inserate",
    "Vermittlungsbüro",
    "Temporärarbeit",
    "Kandidaten",
  ],
  authors: [{ name: "TempMatch" }],
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "TempMatch",
    title: "TempMatch – Temporär-Vermittlung für die Schweiz",
    description: beschreibung,
  },
  twitter: {
    card: "summary_large_image",
    title: "TempMatch – Temporär-Vermittlung für die Schweiz",
    description: beschreibung,
  },
};

export const viewport: Viewport = {
  themeColor: "#2d6fd4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${jost.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        {children}
        <ScrollTop />
        <AgentationGate />
      </body>
    </html>
  );
}
