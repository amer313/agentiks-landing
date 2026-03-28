import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const PerfectTeammate: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const containerSpring = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 90 } });
  const containerOpacity = interpolate(containerSpring, [0, 1], [0, 1]);
  const containerScale = interpolate(containerSpring, [0, 1], [0.88, 1]);

  // Pulsing glow
  const glowSize = Math.sin(frame * 0.1) * 20 + 80;
  const glowOpacity = Math.sin(frame * 0.1) * 0.15 + 0.35;

  const STATUS_ITEMS = [
    { label: "Status", value: "active", color: COLORS.green },
    { label: "Errors", value: "0", color: COLORS.green },
    { label: "Uptime", value: "99.9%", color: COLORS.cyan },
    { label: "Improving", value: "always", color: COLORS.brand },
  ];

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
        {/* Silhouette with glow */}
        <div style={{ position: "relative", width: 260, height: 260 }}>
          {/* Outer glow rings */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: glowSize * 2.5,
              height: glowSize * 2.5,
              borderRadius: "50%",
              backgroundColor: `rgba(180,0,255,${glowOpacity * 0.3})`,
              transform: "translate(-50%, -50%)",
              filter: "blur(30px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: glowSize * 1.6,
              height: glowSize * 1.6,
              borderRadius: "50%",
              backgroundColor: `rgba(0,240,255,${glowOpacity * 0.15})`,
              transform: "translate(-50%, -50%)",
              filter: "blur(20px)",
            }}
          />

          {/* Humanoid silhouette SVG */}
          <svg
            width="260"
            height="260"
            viewBox="0 0 260 260"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {/* Glow filter */}
            <defs>
              <filter id="glow-teammate">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Head */}
            <circle cx="130" cy="70" r="38" fill={`rgba(180,0,255,0.15)`} stroke={COLORS.brand} strokeWidth="2.5" filter="url(#glow-teammate)" />

            {/* Body */}
            <path
              d="M100 108 C80 118 65 140 65 165 L65 195 L195 195 L195 165 C195 140 180 118 160 108 Z"
              fill={`rgba(180,0,255,0.1)`}
              stroke={COLORS.brand}
              strokeWidth="2.5"
              filter="url(#glow-teammate)"
            />

            {/* Arms */}
            <line x1="100" y1="130" x2="60" y2="175" stroke={COLORS.brand} strokeWidth="2.5" strokeLinecap="round" filter="url(#glow-teammate)" />
            <line x1="160" y1="130" x2="200" y2="175" stroke={COLORS.brand} strokeWidth="2.5" strokeLinecap="round" filter="url(#glow-teammate)" />

            {/* Circuit lines on body (AI indicator) */}
            <path d="M105 145 L125 145 L125 165 L145 165" stroke={COLORS.cyan} strokeWidth="1.5" fill="none" opacity="0.7" />
            <circle cx="125" cy="145" r="3" fill={COLORS.cyan} opacity="0.8" />
            <circle cx="145" cy="165" r="3" fill={COLORS.cyan} opacity="0.8" />
            <path d="M130 155 L150 155" stroke={COLORS.cyan} strokeWidth="1.5" opacity="0.5" />

            {/* Eye glow */}
            <circle cx="118" cy="65" r="6" fill={COLORS.cyan} opacity={0.7 + Math.sin(frame * 0.08) * 0.3} />
            <circle cx="142" cy="65" r="6" fill={COLORS.cyan} opacity={0.7 + Math.sin(frame * 0.08) * 0.3} />
          </svg>
        </div>

        {/* Status indicators */}
        <div style={{ width: 680, display: "flex", flexDirection: "column", gap: 14 }}>
          {STATUS_ITEMS.map((item, i) => {
            const itemSpring = spring({ frame: frame - i * 6, fps: FPS, config: { damping: 16, stiffness: 160 } });
            const itemOpacity = interpolate(itemSpring, [0, 0.4], [0, 1]);
            const itemX = interpolate(itemSpring, [0, 1], [30, 0]);
            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `translateX(${itemX}px)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 24px",
                  backgroundColor: COLORS.surface,
                  border: `1.5px solid rgba(255,255,255,0.06)`,
                  borderRadius: 12,
                  borderLeft: `3px solid ${item.color}`,
                }}
              >
                <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 18, color: COLORS.mutedForeground, letterSpacing: "0.06em" }}>
                  {item.label.toUpperCase()}
                </span>
                <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 22, fontWeight: 700, color: item.color }}>
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Label */}
        <div style={{ textAlign: "center" as const }}>
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.foreground,
              letterSpacing: "-0.02em",
            }}
          >
            A teammate that never sleeps.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
