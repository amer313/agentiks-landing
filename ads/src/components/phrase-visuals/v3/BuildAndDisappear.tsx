import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const BuildAndDisappear: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const sceneIn = spring({ frame, fps: FPS, config: { damping: 20, stiffness: 110 } });

  // Figure fades and walks away
  const figureOpacity = interpolate(progress, [0, 0.3, 0.8, 1], [0, 0.9, 0.3, 0]);
  const figureX = interpolate(progress, [0, 1], [0, 80]);

  // Dotted outline remains
  const outlineOpacity = interpolate(progress, [0.3, 0.6], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const textOpacity = interpolate(progress, [0.5, 0.8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 48,
        padding: "0 60px",
        opacity: sceneIn,
      }}
    >
      {/* Walking figure scene */}
      <div style={{ position: "relative", width: 400, height: 320 }}>
        <svg width="400" height="320" viewBox="0 0 400 320" style={{ overflow: "visible" }}>
          {/* Ground line */}
          <line x1={0} y1={285} x2={400} y2={285} stroke={COLORS.surface2} strokeWidth={2} />

          {/* Shadow trail */}
          {[0.8, 0.6, 0.4, 0.2].map((alpha, i) => (
            <ellipse
              key={i}
              cx={200 + figureX - i * 12}
              cy={288}
              rx={25 - i * 3}
              ry={5}
              fill={COLORS.mutedForeground}
              opacity={alpha * 0.1 * figureOpacity}
            />
          ))}

          {/* Dotted ghost outline */}
          <g transform={`translate(${200}, 160)`} opacity={outlineOpacity}>
            <circle cx={0} cy={-80} r={24} fill="none" stroke={COLORS.mutedForeground} strokeWidth={2} strokeDasharray="6 4" />
            <line x1={0} y1={-56} x2={0} y2={40} stroke={COLORS.mutedForeground} strokeWidth={2} strokeDasharray="6 4" />
            <line x1={0} y1={-40} x2={-28} y2={0} stroke={COLORS.mutedForeground} strokeWidth={2} strokeDasharray="6 4" />
            <line x1={0} y1={-40} x2={28} y2={0} stroke={COLORS.mutedForeground} strokeWidth={2} strokeDasharray="6 4" />
            <line x1={0} y1={40} x2={-20} y2={100} stroke={COLORS.mutedForeground} strokeWidth={2} strokeDasharray="6 4" />
            <line x1={0} y1={40} x2={20} y2={100} stroke={COLORS.mutedForeground} strokeWidth={2} strokeDasharray="6 4" />
          </g>

          {/* Walking figure (fading away) */}
          <g transform={`translate(${200 + figureX}, 160)`} opacity={figureOpacity}>
            <circle cx={0} cy={-80} r={24} fill="none" stroke={COLORS.foreground} strokeWidth={3} />
            <line x1={0} y1={-56} x2={0} y2={40} stroke={COLORS.foreground} strokeWidth={3} strokeLinecap="round" />
            {/* Walking legs */}
            <line x1={0} y1={40} x2={-18} y2={100} stroke={COLORS.foreground} strokeWidth={3} strokeLinecap="round" />
            <line x1={0} y1={40} x2={24} y2={90} stroke={COLORS.foreground} strokeWidth={3} strokeLinecap="round" />
            {/* Arms */}
            <line x1={0} y1={-30} x2={-28} y2={10} stroke={COLORS.foreground} strokeWidth={3} strokeLinecap="round" />
            <line x1={0} y1={-30} x2={32} y2={0} stroke={COLORS.foreground} strokeWidth={3} strokeLinecap="round" />
          </g>

          {/* "GONE" label */}
          <text
            x={200}
            y={120}
            textAnchor="middle"
            fontFamily={FONT_FAMILY_SANS}
            fontSize={22}
            fontWeight={700}
            fill={COLORS.mutedForeground}
            opacity={outlineOpacity}
          >
            GONE
          </text>
        </svg>
      </div>

      {/* Text */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 34,
          fontWeight: 700,
          color: COLORS.foreground,
          textAlign: "center",
          opacity: textOpacity,
          letterSpacing: "-0.02em",
          lineHeight: 1.3,
          maxWidth: 520,
        }}
      >
        Most AI companies{" "}
        <span style={{ color: COLORS.red }}>build and disappear.</span>
      </div>
    </AbsoluteFill>
  );
};
