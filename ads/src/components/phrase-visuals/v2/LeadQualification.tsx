import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const LeadQualification: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const count = Math.round(interpolate(progress, [0, 0.6], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  const containerSpring = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 100, mass: 1 } });
  const containerOpacity = interpolate(containerSpring, [0, 1], [0, 1]);
  const containerScale = interpolate(containerSpring, [0, 1], [0.9, 1]);

  // Generate lead dots
  const TOTAL_DOTS = 40;
  const dotsInFunnel = Math.floor(interpolate(progress, [0.2, 0.8], [0, TOTAL_DOTS], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 52,
        }}
      >
        {/* CRM inbox header */}
        <div
          style={{
            width: 740,
            backgroundColor: COLORS.surface,
            borderRadius: 16,
            border: `1.5px solid rgba(255,255,255,0.08)`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              backgroundColor: COLORS.surface2,
              borderBottom: `1px solid rgba(255,255,255,0.06)`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.cyan} strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 20, color: COLORS.foreground, letterSpacing: "0.04em" }}>
              CRM INBOX
            </span>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  backgroundColor: `rgba(0,240,255,0.15)`,
                  border: `1.5px solid ${COLORS.cyan}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 16, fontWeight: 700, color: COLORS.cyan }}>
                  {count}
                </span>
              </div>
              <span style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 18, color: COLORS.mutedForeground }}>
                unqualified leads
              </span>
            </div>
          </div>

          {/* Lead rows */}
          {["Acme Corp", "TechStack Inc", "BuildRight LLC", "Vertex Solutions", "NovaSystems"].map((name, i) => {
            const rowOpacity = interpolate(frame, [i * 4, i * 4 + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div
                key={name}
                style={{
                  padding: "14px 24px",
                  borderBottom: i < 4 ? `1px solid rgba(255,255,255,0.04)` : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  opacity: rowOpacity,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: COLORS.cyan, opacity: 0.7 }} />
                <span style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 22, color: "rgba(255,255,255,0.65)" }}>{name}</span>
                <span style={{ marginLeft: "auto", fontFamily: FONT_FAMILY_MONO, fontSize: 16, color: COLORS.mutedForeground }}>
                  unreviewed
                </span>
              </div>
            );
          })}
          <div style={{ padding: "12px 24px", textAlign: "center" as const }}>
            <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 16, color: COLORS.mutedForeground }}>
              + {Math.max(0, count - 5)} more...
            </span>
          </div>
        </div>

        {/* Funnel visualization */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <svg width="280" height="200" viewBox="0 0 280 200" fill="none">
            {/* Funnel shape */}
            <path d="M20 20 L260 20 L180 100 L180 180 L100 180 L100 100 Z" fill="rgba(0,240,255,0.06)" stroke={COLORS.cyan} strokeWidth="2" />
            {/* Flowing dots */}
            {Array.from({ length: Math.min(dotsInFunnel, TOTAL_DOTS) }).map((_, i) => {
              const t = (i / TOTAL_DOTS);
              const x = 140 + Math.sin(i * 2.3) * (100 - t * 60);
              const y = 20 + t * 160;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={3}
                  fill={COLORS.cyan}
                  opacity={0.6 + Math.sin(i) * 0.3}
                />
              );
            })}
            {/* "200" label inside funnel top */}
            <text x="140" y="50" textAnchor="middle" fontFamily={FONT_FAMILY_MONO} fontSize="22" fontWeight="700" fill={COLORS.cyan}>
              200
            </text>
            <text x="140" y="72" textAnchor="middle" fontFamily={FONT_FAMILY_SANS} fontSize="14" fill={COLORS.mutedForeground}>
              leads
            </text>
          </svg>

          <div
            style={{
              padding: "14px 32px",
              backgroundColor: `rgba(0,240,255,0.08)`,
              border: `1.5px solid rgba(0,240,255,0.25)`,
              borderRadius: 100,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 26,
                fontWeight: 700,
                color: COLORS.cyan,
              }}
            >
              {count} leads need qualifying
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
