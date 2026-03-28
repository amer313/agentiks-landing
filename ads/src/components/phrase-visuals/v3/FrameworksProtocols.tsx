import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const FrameworksProtocols: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const itemA = spring({ frame, fps: FPS, config: { damping: 12, stiffness: 160, mass: 0.9 } });
  const itemB = spring({ frame: Math.max(0, frame - 10), fps: FPS, config: { damping: 12, stiffness: 160, mass: 0.9 } });
  const proto = spring({ frame: Math.max(0, frame - 20), fps: FPS, config: { damping: 10, stiffness: 140, mass: 1.0 } });

  const questionOpacity = interpolate(progress, [0.5, 0.7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 48,
        padding: "0 60px",
      }}
    >
      {/* Two framework cards side-by-side */}
      <div style={{ display: "flex", gap: 24, width: "100%", maxWidth: 680 }}>
        {/* Framework A */}
        <div
          style={{
            flex: 1,
            background: COLORS.surface,
            border: `2px solid ${COLORS.cyan}50`,
            borderRadius: 16,
            padding: "24px 20px",
            textAlign: "center",
            opacity: itemA,
            transform: `scale(${interpolate(itemA, [0, 1], [0.7, 1])}) translateX(${interpolate(itemA, [0, 1], [-40, 0])}px)`,
            boxShadow: `0 0 30px ${COLORS.cyan}20`,
          }}
        >
          <div style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 52, fontWeight: 700, color: COLORS.cyan, lineHeight: 1 }}>
            {"{ }"}
          </div>
          <div style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 22, fontWeight: 600, color: COLORS.foreground, marginTop: 12 }}>
            Framework A
          </div>
          <div style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 15, color: COLORS.mutedForeground, marginTop: 4 }}>
            v3.2 released
          </div>
        </div>

        {/* Framework B */}
        <div
          style={{
            flex: 1,
            background: COLORS.surface,
            border: `2px solid ${COLORS.magenta}50`,
            borderRadius: 16,
            padding: "24px 20px",
            textAlign: "center",
            opacity: itemB,
            transform: `scale(${interpolate(itemB, [0, 1], [0.7, 1])}) translateX(${interpolate(itemB, [0, 1], [40, 0])}px)`,
            boxShadow: `0 0 30px ${COLORS.magenta}20`,
          }}
        >
          <div style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 52, fontWeight: 700, color: COLORS.magenta, lineHeight: 1 }}>
            {"{ }"}
          </div>
          <div style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 22, fontWeight: 600, color: COLORS.foreground, marginTop: 12 }}>
            Framework B
          </div>
          <div style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 15, color: COLORS.mutedForeground, marginTop: 4 }}>
            v1.0 stable
          </div>
        </div>
      </div>

      {/* Protocol node graph */}
      <div
        style={{
          width: "100%",
          maxWidth: 680,
          background: COLORS.surface,
          border: `2px solid ${COLORS.brand}50`,
          borderRadius: 16,
          padding: "24px 28px",
          opacity: proto,
          transform: `translateY(${interpolate(proto, [0, 1], [40, 0])}px)`,
          boxShadow: `0 0 40px ${COLORS.brand}25`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="80" height="60" viewBox="0 0 80 60">
            {/* Nodes */}
            {[[10, 30], [40, 10], [70, 30], [40, 50]].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={6}
                fill={COLORS.brand}
                opacity={0.9}
              />
            ))}
            {/* Edges */}
            {[[10, 30, 40, 10], [40, 10, 70, 30], [70, 30, 40, 50], [40, 50, 10, 30], [10, 30, 70, 30]].map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={COLORS.brand}
                strokeWidth={1.5}
                opacity={0.4}
              />
            ))}
          </svg>
          <div>
            <div style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 24, fontWeight: 700, color: COLORS.brand }}>
              New Protocol
            </div>
            <div style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 16, color: COLORS.mutedForeground, marginTop: 4 }}>
              Changes everything
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 40,
          fontWeight: 700,
          color: COLORS.foreground,
          opacity: questionOpacity,
          textAlign: "center",
          letterSpacing: "-0.02em",
        }}
      >
        Did you catch that?
      </div>
    </AbsoluteFill>
  );
};
