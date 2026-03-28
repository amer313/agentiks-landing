import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

// Steps: 40 → 50 → 60 with pauses
function getDisplayValue(progress: number): number {
  if (progress < 0.2) return 40;
  if (progress < 0.35) {
    // quick ramp 40→50
    return Math.round(interpolate(progress, [0.2, 0.32], [40, 50], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }));
  }
  if (progress < 0.55) return 50;
  if (progress < 0.72) {
    // quick ramp 50→60
    return Math.round(interpolate(progress, [0.55, 0.70], [50, 60], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }));
  }
  return 60;
}

export const PercentCounter: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const value = getDisplayValue(progress);

  const containerOpacity = interpolate(progress, [0, 0.12], [0, 1], { extrapolateRight: "clamp" });
  const containerScale = spring({ frame, fps: FPS, config: { damping: 14, stiffness: 80 }, from: 0.7, to: 1 });

  // Pulse on step change
  const at50 = interpolate(progress, [0.32, 0.36], [0, 1], { extrapolateRight: "clamp" });
  const at60 = interpolate(progress, [0.70, 0.74], [0, 1], { extrapolateRight: "clamp" });
  const stepPulse = Math.max(
    interpolate(at50, [0, 0.5, 1], [1, 1.12, 1]),
    interpolate(at60, [0, 0.5, 1], [1, 1.12, 1])
  );

  const sublabelOpacity = interpolate(progress, [0.15, 0.35], [0, 1], { extrapolateRight: "clamp" });
  const sublabelY = interpolate(progress, [0.15, 0.35], [20, 0], { extrapolateRight: "clamp" });

  const tagOpacity = interpolate(progress, [0.72, 0.88], [0, 1], { extrapolateRight: "clamp" });

  // Glow strengthens at 60
  const glowIntensity = interpolate(progress, [0.55, 0.80], [0.3, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 32,
        background: "transparent",
      }}
    >
      {/* Giant counter */}
      <div
        style={{
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          display: "flex",
          alignItems: "flex-start",
          lineHeight: 1,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 220,
            fontWeight: 900,
            color: COLORS.green,
            lineHeight: 1,
            letterSpacing: "-8px",
            transform: `scale(${stepPulse})`,
            display: "inline-block",
            textShadow: `0 0 ${60 * glowIntensity}px ${COLORS.green}88, 0 0 ${120 * glowIntensity}px ${COLORS.green}33`,
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 100,
            fontWeight: 900,
            color: COLORS.green,
            lineHeight: 1,
            marginTop: 28,
            opacity: 0.8,
          }}
        >
          %
        </span>
      </div>

      {/* Sublabel */}
      <div
        style={{
          opacity: sublabelOpacity,
          transform: `translateY(${sublabelY}px)`,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 280,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.green}, transparent)`,
          }}
        />
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 28,
            fontWeight: 500,
            color: COLORS.mutedForeground,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          of your team's time
        </span>
      </div>

      {/* "given back" tag */}
      <div
        style={{
          opacity: tagOpacity,
          padding: "10px 28px",
          borderRadius: 999,
          background: `${COLORS.green}18`,
          border: `1.5px solid ${COLORS.green}44`,
          boxShadow: `0 0 24px ${COLORS.green}22`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 24,
            fontWeight: 700,
            color: COLORS.green,
            letterSpacing: "0.04em",
          }}
        >
          given back
        </span>
      </div>
    </AbsoluteFill>
  );
};
