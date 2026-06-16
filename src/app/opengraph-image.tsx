import { ImageResponse } from "next/og";

export const alt = "TempMatch – Temporär-Vermittlung für die Schweiz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded Vorschaubild für geteilte Links (LinkedIn, WhatsApp, X …).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a225a 0%, #1e40af 55%, #2d6fd4 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 40, fontWeight: 800 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "white",
              color: "#2d6fd4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            T
          </div>
          <span>TempMatch</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 56 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05 }}>
            Inserate matchen.
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, color: "#f9a8d4" }}>
            Vermittlung verbinden.
          </div>
        </div>

        <div style={{ fontSize: 30, marginTop: 40, color: "rgba(255,255,255,0.85)", maxWidth: 900 }}>
          Die B2B-Plattform, die Firmen mit temporären Vermittlungsbüros verbindet.
        </div>
      </div>
    ),
    { ...size },
  );
}
