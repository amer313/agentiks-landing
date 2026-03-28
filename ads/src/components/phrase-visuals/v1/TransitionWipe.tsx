import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { COLORS } from "../../../brand";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const TransitionWipe: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  // Wipe sweeps from left (0%) to right (100%) over the duration
  const wipeX = interpolate(progress, [0, 1], [-100, 200]);

  // The glow line position — slightly ahead of the wipe edge
  const glowX = wipeX;

  // Trail opacity — fades in behind the sweep
  const trailOpacity = interpolate(progress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "transparent" }}>
      {/* Dark fill that sweeps across */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${wipeX + 2}%`,
          height: "100%",
          background: COLORS.background,
          opacity: 0.95,
        }}
      />

      {/* Leading glow line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${glowX}%`,
          width: 6,
          height: "100%",
          background: COLORS.brand,
          boxShadow: `0 0 40px 12px ${COLORS.brand}88, 0 0 80px 24px ${COLORS.brand}44`,
          opacity: trailOpacity,
          transform: "translateX(-50%)",
        }}
      />

      {/* Secondary glow — slightly behind */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${glowX - 1}%`,
          width: 80,
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${COLORS.brand}22, ${COLORS.brand}55, transparent)`,
          opacity: trailOpacity,
          transform: "translateX(-50%)",
        }}
      />

      {/* Cyan accent line */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: `${glowX}%`,
          width: 3,
          height: "10%",
          background: COLORS.cyan,
          boxShadow: `0 0 20px 6px ${COLORS.cyan}88`,
          opacity: trailOpacity * 0.8,
          transform: "translateX(-50%)",
        }}
      />

      {/* Small particle dots along the line */}
      {[10, 25, 40, 60, 75, 90].map((yPct, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${yPct}%`,
            left: `${glowX}%`,
            width: i % 2 === 0 ? 6 : 4,
            height: i % 2 === 0 ? 6 : 4,
            borderRadius: "50%",
            background: i % 2 === 0 ? COLORS.brand : COLORS.cyan,
            boxShadow: `0 0 12px 4px ${i % 2 === 0 ? COLORS.brand : COLORS.cyan}88`,
            opacity: trailOpacity * 0.9,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
