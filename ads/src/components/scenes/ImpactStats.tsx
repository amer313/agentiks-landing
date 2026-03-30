import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";
import { AnimatedCounter } from "../typography/AnimatedCounter";

export const ImpactStats: React.FC = () => {
  const frame = useCurrentFrame();

  // Stat 1: "60%" -- visible frames 0-50
  const stat1Opacity = interpolate(frame, [0, 6, 35, 48], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const label1Opacity = interpolate(frame, [8, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stat 2: "3x" -- visible frames 45-95
  const stat2Opacity = interpolate(
    frame,
    [45, 51, 80, 93],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const label2Opacity = interpolate(frame, [53, 63], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stat 3: "4 wk" -- visible frames 90-135
  const stat3Opacity = interpolate(
    frame,
    [90, 96, 120, 133],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const label3Opacity = interpolate(frame, [98, 108], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Summary text: frames 130-150
  const summaryOpacity = interpolate(frame, [130, 142], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Stat 1: 60% -- massive */}
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

      {/* Stat 2: 3x -- massive */}
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
          startFrame={48}
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

      {/* Stat 3: 4 wk -- massive */}
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
          startFrame={93}
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
