import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const Untouchable: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const shieldSpring = spring({
    frame,
    fps: FPS,
    config: { damping: 9, stiffness: 180, mass: 0.8 },
  });

  const crownSpring = spring({
    frame: Math.max(0, frame - 12),
    fps: FPS,
    config: { damping: 10, stiffness: 200, mass: 0.7 },
  });

  const textSpring = spring({
    frame: Math.max(0, frame - 20),
    fps: FPS,
    config: { damping: 14, stiffness: 140 },
  });

  const shieldScale = interpolate(shieldSpring, [0, 1], [0.3, 1]);
  const crownScale = interpolate(crownSpring, [0, 1], [0, 1]);

  // Golden glow pulse
  const glowPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.5, 1]);
  const glowRadius = interpolate(shieldSpring, [0, 1], [20, 100]);

  const subtitleOpacity = interpolate(progress, [0.5, 0.8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 32,
      }}
    >
      {/* Golden glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.amber}30 0%, transparent 70%)`,
          filter: `blur(${glowRadius}px)`,
          opacity: glowPulse * shieldSpring,
        }}
      />

      {/* Shield + Crown SVG */}
      <svg
        width="320"
        height="360"
        viewBox="0 0 320 360"
        style={{
          transform: `scale(${shieldScale})`,
          filter: `drop-shadow(0 0 30px ${COLORS.amber}60)`,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Shield */}
        <path
          d="M160 30 L280 80 L280 200 Q280 300 160 340 Q40 300 40 200 L40 80 Z"
          fill={`${COLORS.amber}20`}
          stroke={COLORS.amber}
          strokeWidth={4}
        />
        {/* Inner shield */}
        <path
          d="M160 60 L250 100 L250 200 Q250 275 160 310 Q70 275 70 200 L70 100 Z"
          fill={`${COLORS.amber}15`}
          stroke={COLORS.amber}
          strokeWidth={2}
          opacity={0.6}
        />
        {/* Shield center glyph */}
        <text
          x={160}
          y={210}
          textAnchor="middle"
          fontFamily={FONT_FAMILY_SANS}
          fontSize={72}
          fontWeight={900}
          fill={COLORS.amber}
          opacity={0.9}
        >
          A
        </text>

        {/* Crown */}
        <g transform={`translate(160, 15) scale(${crownScale})`} style={{ transformOrigin: "160px 15px" }}>
          <path
            d="M-50 -15 L-50 -40 L-25 -20 L0 -50 L25 -20 L50 -40 L50 -15 Z"
            fill={COLORS.amber}
            opacity={0.95}
          />
          {/* Crown jewels */}
          <circle cx={0} cy={-42} r={6} fill={COLORS.brand} />
          <circle cx={-32} cy={-30} r={4} fill={COLORS.cyan} />
          <circle cx={32} cy={-30} r={4} fill={COLORS.cyan} />
        </g>
      </svg>

      {/* Main text */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 64,
          fontWeight: 900,
          color: COLORS.amber,
          textAlign: "center",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          opacity: textSpring,
          transform: `scale(${interpolate(textSpring, [0, 1], [0.7, 1])})`,
          textShadow: `0 0 40px ${COLORS.amber}80, 0 0 80px ${COLORS.amber}40`,
          position: "relative",
          zIndex: 1,
        }}
      >
        Untouchable.
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 30,
          fontWeight: 500,
          color: COLORS.foreground,
          textAlign: "center",
          opacity: subtitleOpacity * textSpring,
          letterSpacing: "-0.01em",
          position: "relative",
          zIndex: 1,
        }}
      >
        In two years.
      </div>
    </AbsoluteFill>
  );
};
