import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Agentiks — AI Agent Consulting & Development"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050508",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "rgba(37,99,235,0.2)",
              border: "1px solid rgba(37,99,235,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            ⚡
          </div>
          <span style={{ fontSize: "40px", fontWeight: 600, color: "#F7F8F8" }}>
            Agentiks
          </span>
        </div>
        <div
          style={{
            fontSize: "52px",
            fontWeight: 500,
            color: "#F7F8F8",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.2,
          }}
        >
          AI Agent Systems for
          <span style={{ color: "#2563EB" }}> Every Business</span>
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "#8A8F98",
            marginTop: "24px",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          Custom AI agents that automate workflows, scale operations, and give
          your team superpowers.
        </div>
      </div>
    ),
    { ...size }
  )
}
