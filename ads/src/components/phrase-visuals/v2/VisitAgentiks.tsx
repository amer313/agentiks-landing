import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const VisitAgentiks: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const urlSpring = spring({
    frame,
    fps: FPS,
    config: { damping: 14, stiffness: 160, mass: 0.8 },
  });

  const ctaSpring = spring({
    frame: Math.max(0, frame - 16),
    fps: FPS,
    config: { damping: 14, stiffness: 140 },
  });

  const urlScale = interpolate(urlSpring, [0, 1], [0.6, 1]);
  const ctaOpacity = ctaSpring;

  // Gradient underline width
  const underlineWidth = interpolate(urlSpring, [0.2, 1], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle glow pulse
  const glow = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.7, 1]);

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
      {/* Brand glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${COLORS.brand}20 0%, transparent 70%)`,
          filter: "blur(80px)",
          opacity: glow * urlSpring,
        }}
      />

      {/* URL */}
      <div
        style={{
          fontFamily: FONT_FAMILY_MONO,
          fontSize: 72,
          fontWeight: 800,
          color: COLORS.foreground,
          textAlign: "center",
          letterSpacing: "-0.03em",
          opacity: urlSpring,
          transform: `scale(${urlScale})`,
          position: "relative",
          zIndex: 1,
        }}
      >
        agentiks.dev
      </div>

      {/* Gradient underline */}
      <div
        style={{
          height: 5,
          background: `linear-gradient(90deg, ${COLORS.brand}, ${COLORS.cyan}, ${COLORS.magenta})`,
          borderRadius: 3,
          width: `${underlineWidth}%`,
          maxWidth: 520,
          boxShadow: `0 0 24px ${COLORS.brand}80`,
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* CTA button */}
      <div
        style={{
          marginTop: 8,
          padding: "20px 48px",
          background: COLORS.brand,
          borderRadius: 14,
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 28,
          fontWeight: 700,
          color: "#fff",
          textAlign: "center",
          opacity: ctaOpacity,
          transform: `scale(${interpolate(ctaSpring, [0, 1], [0.8, 1])})`,
          boxShadow: `0 8px 40px ${COLORS.brand}60, 0 2px 0 ${COLORS.brandLight} inset`,
          position: "relative",
          zIndex: 1,
          letterSpacing: "-0.01em",
        }}
      >
        Book a free strategy call
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 22,
          color: COLORS.mutedForeground,
          textAlign: "center",
          opacity: interpolate(progress, [0.6, 0.9], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "relative",
          zIndex: 1,
        }}
      >
        No pitch. No commitment. Just a plan.
      </div>
    </AbsoluteFill>
  );
};
