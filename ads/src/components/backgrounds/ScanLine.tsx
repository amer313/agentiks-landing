import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface ScanLineProps {
  startFrame: number;
  durationFrames: number;
  color?: string;
  width: number;
  height: number;
}

export const ScanLine: React.FC<ScanLineProps> = ({
  startFrame,
  durationFrames,
  color = "#2563EB",
  width,
  height,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0 || relativeFrame > durationFrames) {
    return null;
  }

  const yPosition = interpolate(
    relativeFrame,
    [0, durationFrames],
    [0, height],
    { extrapolateRight: "clamp" }
  );

  const lineOpacity = interpolate(
    relativeFrame,
    [0, Math.floor(durationFrames * 0.1), Math.floor(durationFrames * 0.9), durationFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {/* The scan line itself */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: 2,
          top: yPosition,
          backgroundColor: color,
          opacity: lineOpacity,
          boxShadow: `0 0 20px ${color}, 0 0 40px ${color}40`,
        }}
      />
      {/* "Cleared" area above the line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: yPosition,
          backgroundColor: "rgba(5, 5, 8, 0.3)",
          opacity: lineOpacity * 0.5,
        }}
      />
    </div>
  );
};
