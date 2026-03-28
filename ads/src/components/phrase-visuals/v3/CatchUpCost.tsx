import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const CatchUpCost: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const multiplierSpring = spring({
    frame,
    fps: FPS,
    config: { damping: 8, stiffness: 160, mass: 0.9 },
  });

  const scale = interpolate(multiplierSpring, [0, 1], [0.2, 1]);
  const opacity = multiplierSpring;

  // Radiation lines
  const lineCount = 12;
  const lineProgress = interpolate(progress, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  const warningOpacity = interpolate(progress, [0.4, 0.7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Pulsing red glow
  const redPulse = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.6, 1]);

  const textOpacity = interpolate(progress, [0.55, 0.85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Red glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.red}25 0%, transparent 70%)`,
          filter: "blur(60px)",
          opacity: redPulse * opacity,
        }}
      />

      {/* 2x multiplier */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <svg width="360" height="360" viewBox="-180 -180 360 360" style={{ overflow: "visible" }}>
          {/* Radiation lines */}
          {Array.from({ length: lineCount }, (_, i) => {
            const angle = (i / lineCount) * Math.PI * 2;
            const len = 90 + (i % 3) * 20;
            const lineLen = lineProgress * len;
            return (
              <line
                key={i}
                x1={Math.cos(angle) * 88}
                y1={Math.sin(angle) * 88}
                x2={Math.cos(angle) * (88 + lineLen)}
                y2={Math.sin(angle) * (88 + lineLen)}
                stroke={COLORS.red}
                strokeWidth={2 + (i % 2)}
                opacity={0.4 + (i % 3) * 0.15}
                strokeLinecap="round"
              />
            );
          })}

          {/* Main circle */}
          <circle cx={0} cy={0} r={85} fill={`${COLORS.red}15`} stroke={COLORS.red} strokeWidth={3} />

          {/* 2x text */}
          <text
            x={0}
            y={20}
            textAnchor="middle"
            fontFamily={FONT_FAMILY_MONO}
            fontSize={100}
            fontWeight={900}
            fill={COLORS.red}
          >
            2×
          </text>
        </svg>
      </div>

      {/* Warning label */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.red,
          textAlign: "center",
          opacity: warningOpacity,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          position: "relative",
          zIndex: 1,
        }}
      >
        ⚠ Cost to catch up
      </div>

      {/* Main text */}
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
          padding: "0 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        The ones that wait will spend{" "}
        <span style={{ color: COLORS.red }}>twice as much</span>{" "}
        trying to catch up.
      </div>
    </AbsoluteFill>
  );
};
