import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

interface AnimatedCounterProps {
  startValue: number;
  endValue: number;
  durationFrames: number;
  prefix?: string;
  suffix?: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  override?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  startValue,
  endValue,
  durationFrames,
  prefix = "",
  suffix = "",
  startFrame = 0,
  fontSize = 96,
  color = COLORS.foreground,
  override,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const displayValue = override
    ? override
    : `${prefix}${Math.floor(
        interpolate(
          relativeFrame,
          [0, durationFrames],
          [startValue, endValue],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        )
      )}${suffix}`;

  const opacity = interpolate(
    relativeFrame,
    [0, 6],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        fontFamily: FONT_FAMILY_SANS,
        fontSize,
        fontWeight: 700,
        color,
        opacity,
        fontFeatureSettings: '"tnum" 1',
        textAlign: "center",
        letterSpacing: "-0.02em",
      }}
    >
      {displayValue}
    </div>
  );
};
