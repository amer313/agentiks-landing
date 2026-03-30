import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";
import { AnimatedCounter } from "../typography/AnimatedCounter";

export const ImpactStats: React.FC = () => {
  const frame = useCurrentFrame();

  // Total duration: 195 frames (6.5s at 30fps)
  // Stat 1: "60%" -- visible frames 0-55
  const stat1Opacity = interpolate(frame, [0, 6, 40, 53], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const label1Opacity = interpolate(frame, [8, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stat 2: "3x" -- visible frames 50-105
  const stat2Opacity = interpolate(
    frame,
    [50, 56, 90, 103],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const label2Opacity = interpolate(frame, [58, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stat 3: "4 wk" -- visible frames 100-150
  const stat3Opacity = interpolate(
    frame,
    [100, 106, 135, 148],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const label3Opacity = interpolate(frame, [108, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Summary text: "Strategy. Development. Orchestration. All of it."
  // frames 145-195 (50 frames = ~1.67s, was only 20 frames before)
  const summaryOpacity = interpolate(frame, [145, 158], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const summaryFadeOut = interpolate(frame, [185, 195], [1, 0], {
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
          durationFrames={30}
          suffix="%"
          startFrame={3}
          fontSize={220}
          color={COLORS.foreground}
        />
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 40,
            color: COLORS.mutedForeground,
            marginTop: 12,
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
          durationFrames={20}
          suffix="x"
          startFrame={53}
          fontSize={220}
          color={COLORS.foreground}
        />
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 40,
            color: COLORS.mutedForeground,
            marginTop: 12,
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
          durationFrames={15}
          suffix=" wk"
          startFrame={103}
          fontSize={220}
          color={COLORS.foreground}
        />
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 40,
            color: COLORS.mutedForeground,
            marginTop: 12,
            opacity: label3Opacity,
          }}
        >
          Time to Deploy
        </div>
      </div>

      {/* Summary text -- extended duration for "Strategy. Development. Orchestration." */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: summaryOpacity * summaryFadeOut,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 44,
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
