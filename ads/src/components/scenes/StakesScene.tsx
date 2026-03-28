import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { KineticText } from "../typography/KineticText";
import { TypewriterText } from "../typography/TypewriterText";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

export const StakesScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Typewriter build (0-90)
  const typewriterOpacity = interpolate(
    frame,
    [0, 5, 85, 100],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 2: Kinetic slam (90-150)
  // KineticText handles its own timing internally

  // Phase 3: Hold (150-200) -- handled by KineticText holdFrames

  // Phase 4: Counter-text (200-240)
  const counterTextOpacity = interpolate(
    frame,
    [200, 220],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const counterTextY = interpolate(
    frame,
    [200, 220],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Background glow intensification during slam
  const glowIntensity = interpolate(
    frame,
    [80, 100, 160, 200],
    [1, 3, 3, 1.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow glowIntensity={glowIntensity} />

      {/* Phase 1: Typewriter text */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          opacity: typewriterOpacity,
        }}
      >
        <TypewriterText
          text="The companies that lock in their AI advantage now..."
          charsPerFrame={1.2}
          startFrame={0}
          fontSize={28}
          color={COLORS.foreground}
          fontFamily={FONT_FAMILY_SANS}
        />
      </AbsoluteFill>

      {/* Phase 2: Kinetic slam */}
      <KineticText
        text="will be untouchable in two years."
        color={COLORS.brand}
        glitchColor={COLORS.cyan}
        enterFrame={90}
        holdFrames={70}
        fontSize={56}
      />

      {/* Phase 4: Counter-text */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "25%",
          opacity: counterTextOpacity,
          transform: `translateY(${counterTextY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 24,
            fontWeight: 400,
            color: COLORS.mutedForeground,
            textAlign: "center",
          }}
        >
          The ones that wait... won't.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
