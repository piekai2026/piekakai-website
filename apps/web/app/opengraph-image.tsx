import { ImageResponse } from "next/og";

/*
 * Open Graph / Twitter card image — generated at the edge by Next.js.
 * Picked up automatically by the openGraph + twitter metadata in layout.tsx.
 * Phase 0 placeholder: brand peak mark + wordmark on bone, per DESIGN_SYSTEM.md.
 */

export const alt = "PiekAI — Word de standaard. In Google. In ChatGPT. Overal.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafaf7",
        padding: "80px",
      }}
    >
      {/* Peak micro-mark — the PiekAI brand motif. */}
      <svg width="116" height="116" viewBox="0 0 32 32" aria-hidden="true">
        <title>PiekAI</title>
        <path d="M16 5 L28 27 H4 Z" fill="#3e6d4e" />
      </svg>
      <div
        style={{
          fontSize: 132,
          color: "#2b2a26",
          marginTop: 28,
          letterSpacing: "-0.04em",
        }}
      >
        PiekAI
      </div>
      <div
        style={{
          fontSize: 44,
          color: "#2a4d37",
          marginTop: 4,
          textAlign: "center",
        }}
      >
        Word de standaard. In Google. In ChatGPT. Overal.
      </div>
      <div style={{ fontSize: 26, color: "#6b6860", marginTop: 44 }}>Een product van AanloopAI</div>
    </div>,
    { ...size },
  );
}
