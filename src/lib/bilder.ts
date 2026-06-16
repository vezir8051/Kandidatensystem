// Zentrale Fotosammlung (Unsplash-CDN). Wird zur Laufzeit im Browser geladen.
// Hinweis: Lokal in der Sandbox nicht abrufbar – auf der Live-Seite aber sichtbar.

const U = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const BILDER = {
  // Berufsfelder / Branchen
  bau: U("1504307651254-35680f356dfd"),
  koch: U("1577219491135-ce391730fb2c"),
  logistik: U("1553413077-190dd305871c"),
  elektriker: U("1621905251918-48416bd8575a"),
  reinigung: U("1581578731548-c64695cc6952"),
  schreiner: U("1601564921647-b446839a013f"),
  // Menschen / Szenen
  team: U("1521737604893-d14cc237f11d"),
  frauHandy: U("1573496359142-b8d87734a5a2"),
  handschlag: U("1600880292089-90a7e086ee0c"),
  bueroFrau: U("1573497019940-1c28c88b4f3e"),
  mannLaecheln: U("1519085360753-af0119f7cbe7"),
  // Portraits (Testimonials)
  portraitFrau1: U("1494790108377-be9c29b29330", 200),
  portraitMann1: U("1507003211169-0a1dd7228f2d", 200),
  portraitMann2: U("1500648767791-00dcc994a43e", 200),
} as const;
