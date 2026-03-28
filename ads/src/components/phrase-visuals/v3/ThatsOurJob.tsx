import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const ThatsOurJob: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const textSpring = spring({
    frame,
    fps: FPS,
    config: { damping: 8, stiffness: 200, mass: 0.6 },
  });

  const scale = interpolate(textSpring, [0, 1], [0.4, 1]);
  const opacity = interpolate(textSpring, [0, 0.2], [0, 1]);

  // Glow pulse after entry
  const glowPulse = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.6, 1]);
  const glowSize = interpolate(textSpring, [0, 1], [20, 80]);

  // Underline expand
  const underlineWidth = interpolate(textSpring, [0.3, 1], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Glow background */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(ellipse at center, ${COLORS.brand}30 0%, transparent 70%)`,
          opacity: glowPulse * textSpring,
          filter: `blur(${glowSize}px)`,
        }}
      />

      {/* Main text */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 96,
          fontWeight: 900,
          color: COLORS.foreground,
          textAlign: "center",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          opacity,
          transform: `scale(${scale})`,
          textShadow: `0 0 60px ${COLORS.brand}80, 0 0 120px ${COLORS.brand}40`,
          position: "relative",
          zIndex: 1,
        }}
      >
        That&apos;s our job.
      </div>

      {/* Underline */}
      <div
        style={{
          marginTop: 16,
          height: 4,
          background: `linear-gradient(90deg, ${COLORS.brand}, ${COLORS.cyan})`,
          borderRadius: 2,
          width: `${underlineWidth}%`,
          maxWidth: 560,
          opacity: textSpring,
          boxShadow: `0 0 20px ${COLORS.brand}80`,
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 28,
          fontWeight: 400,
          color: COLORS.mutedForeground,
          marginTop: 32,
          opacity: interpolate(progress, [0.4, 0.7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          letterSpacing: "0.02em",
          position: "relative",
          zIndex: 1,
        }}
      >
        Not yours.
      </div>
    </AbsoluteFill>
  );
};
