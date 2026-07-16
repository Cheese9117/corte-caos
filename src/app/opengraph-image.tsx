import { ImageResponse } from "next/og";
import { SITE } from "@/lib/data";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social card, rendered at build/request time via Satori. */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        backgroundColor: "#050506",
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        color: "#ededed",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontSize: "24px",
          letterSpacing: "8px",
          textTransform: "uppercase",
          color: "#74747f",
        }}
      >
        <div
          style={{ width: "16px", height: "16px", backgroundColor: "#ccff00" }}
        />
        El Poblado · Medellín
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "24px",
            fontSize: "150px",
            fontWeight: 800,
            lineHeight: 0.9,
            textTransform: "uppercase",
            letterSpacing: "-4px",
          }}
        >
          <span>Corte</span>
          <span style={{ color: "#ccff00" }}>&</span>
          <span>Caos</span>
        </div>
        <div
          style={{
            marginTop: "28px",
            fontSize: "34px",
            color: "#b6b6bd",
            maxWidth: "820px",
          }}
        >
          Barbería de autor. No cortamos pelo — editamos identidades.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "2px solid #22222a",
          paddingTop: "28px",
          fontSize: "24px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "#74747f",
        }}
      >
        <span>corteycaos.co</span>
        <span style={{ color: "#ccff00" }}>Agenda tu cita</span>
      </div>
    </div>,
    size
  );
}
