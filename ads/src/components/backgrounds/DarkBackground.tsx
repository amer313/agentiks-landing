import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../brand";

interface DarkBackgroundProps {
  showBrandGlow?: boolean;
  showCyanGlow?: boolean;
  glowIntensity?: number;
}

export const DarkBackground: React.FC<DarkBackgroundProps> = ({
  showBrandGlow = true,
  showCyanGlow = false,
  glowIntensity = 1,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
      }}
    >
      {showBrandGlow && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at center, rgba(180,0,255,${0.06 * glowIntensity}) 0%, transparent 60%)`,
          }}
        />
      )}
      {showCyanGlow && (
        <div
          style={{
            position: "absolute",
            inset: "20%",
            borderRadius: "50%",
            background: `radial-gradient(circle at center, rgba(6,182,212,${0.04 * glowIntensity}) 0%, transparent 70%)`,
          }}
        />
      )}
      {/* Subtle scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.03,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
        }}
      />
    </AbsoluteFill>
  );
};
