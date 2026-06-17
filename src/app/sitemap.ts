import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kandidatensystem.vercel.app";
  const now = new Date();
  const seiten: { pfad: string; prioritaet: number }[] = [
    { pfad: "", prioritaet: 1 },
    { pfad: "/agentur", prioritaet: 0.9 },
    { pfad: "/firma", prioritaet: 0.9 },
    { pfad: "/login", prioritaet: 0.5 },
    { pfad: "/spielregeln", prioritaet: 0.6 },
    { pfad: "/agb", prioritaet: 0.3 },
    { pfad: "/datenschutz", prioritaet: 0.3 },
    { pfad: "/impressum", prioritaet: 0.3 },
  ];
  return seiten.map(({ pfad, prioritaet }) => ({
    url: `${base}${pfad}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: prioritaet,
  }));
}
