import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { HexGrid } from "../backgrounds/HexGrid";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";
import { AnimatedCounter } from "../typography/AnimatedCounter";

export const CounterOpenScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Counter color transition from brand to green
  const colorProgress = interpolate(
    frame,
    [40, 60],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtitle appears after counter hits 60
  const subtitleOpacity = interpolate(
    frame,
    [60, 75],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const subtitleY = interpolate(
    frame,
    [60, 75],
    [15, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow />

      {/* Background hex grid */}
      <AbsoluteFill>
        <svg width="100%" height="100%" viewBox="0 0 1080 1920">
          <HexGrid cx={540} cy={960} size={500} opacity={0.15} />
        </svg>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Giant counter */}
        <AnimatedCounter
          startValue={0}
          endValue={60}
          durationFrames={60}
          suffix="%"
          fontSize={200}
          color={colorProgress > 0.5 ? COLORS.green : COLORS.brand}
        />

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            marginTop: 24,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 32,
              fontWeight: 500,
              color: COLORS.mutedForeground,
              textAlign: "center",
            }}
          >
            of your team's time -- recovered.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
