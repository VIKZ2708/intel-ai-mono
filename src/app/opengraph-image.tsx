import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Intel AI — Master DSA, System Design, Full Stack & AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d1117 0%, #161b22 60%, #0d1117 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid dots background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(0,113,227,0.12) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,113,227,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #0071e3, #00c9ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              boxShadow: "0 0 40px rgba(0,113,227,0.5)",
            }}
          >
            ⚡
          </div>
          <span style={{ fontSize: 56, fontWeight: 800, color: "white", letterSpacing: -2 }}>
            Intel{" "}
            <span style={{ color: "#00c9ff" }}>AI</span>
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 30,
            color: "rgba(255,255,255,0.85)",
            fontWeight: 600,
            marginBottom: 20,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Master DSA · System Design · Full Stack · AI
        </div>

        <div
          style={{
            fontSize: 20,
            color: "rgba(139,148,158,1)",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Structured learning paths built by engineers from TATA AIG, MediBuddy & Scaler
        </div>

        {/* Pill tags */}
        <div style={{ display: "flex", gap: 12, marginTop: 44 }}>
          {["DSA & Algorithms", "System Design", "Full Stack", "AI & Deep Learning"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(0,113,227,0.4)",
                background: "rgba(0,113,227,0.12)",
                color: "#60b4ff",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            color: "rgba(139,148,158,0.6)",
            fontSize: 16,
          }}
        >
          intel-ai-mu.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
