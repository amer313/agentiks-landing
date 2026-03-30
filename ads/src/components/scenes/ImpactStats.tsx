import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";
import { AnimatedCounter } from "../typography/AnimatedCounter";

export const ImpactStats: React.FC = () => {
  const frame = useCurrentFrame();

  // Stat 1: "60%" -- visible frames 0-80
  const stat1Opacity = interpolate(frame, [0, 8, 55, 75], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const label1Opacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stat 2: "3x" -- visible frames 70-150
  const stat2Opacity = interpolate(
    frame,
    [70, 78, 125, 145],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const label2Opacity = interpolate(frame, [80, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stat 3: "4 wk" -- visible frames 140-210
  const stat3Opacity = interpolate(
    frame,
    [140, 148, 195, 210],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const label3Opacity = interpolate(frame, [150, 165], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Summary text: frames 210-240
  const summaryOpacity = interpolate(frame, [210, 225], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Stat 1: 60% */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: stat1Opacity,
        }}
      >
        <AnimatedCounter
          startValue={0}
          endValue={60}
          durationFrames={40}
          suffix="%"
          startFrame={5}
          fontSize={120}
          color={COLORS.foreground}
        />
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 32,
            color: COLORS.mutedForeground,
            marginTop: 8,
            opacity: label1Opacity,
          }}
        >
          Less Manual Work
        </div>
      </div>

      {/* Stat 2: 3x */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: stat2Opacity,
        }}
      >
        <AnimatedCounter
          startValue={0}
          endValue={3}
          durationFrames={30}
          suffix="x"
          startFrame={75}
          fontSize={120}
          color={COLORS.foreground}
        />
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 32,
            color: COLORS.mutedForeground,
            marginTop: 8,
            opacity: label2Opacity,
          }}
        >
          Efficiency
        </div>
      </div>

      {/* Stat 3: 4 wk */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: stat3Opacity,
        }}
      >
        <AnimatedCounter
          startValue={0}
          endValue={4}
          durationFrames={25}
          suffix=" wk"
          startFrame={145}
          fontSize={120}
          color={COLORS.foreground}
        />
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 32,
            color: COLORS.mutedForeground,
            marginTop: 8,
            opacity: label3Opacity,
          }}
        >
          Time to Deploy
        </div>
      </div>

      {/* Summary text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: summaryOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 36,
            fontWeight: 300,
            color: COLORS.foreground,
            textAlign: "center",
          }}
        >
          Strategy. Development. Orchestration. All of it.
        </div>
      </div>
    </AbsoluteFill>
  );
};
