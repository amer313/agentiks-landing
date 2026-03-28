import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FPS } from "../../brand";

interface ScanRingsProps {
  cx: number;
  cy: number;
  size: number;
  color?: string;
}

export const ScanRings: React.FC<ScanRingsProps> = ({
  cx,
  cy,
  size,
  color = "#2563EB",
}) => {
  const frame = useCurrentFrame();
  const cycleDuration = 5 * FPS; // 5 seconds per cycle
  const delays = [0, 3 * FPS, 6 * FPS]; // staggered by 3 seconds

  return (
    <g>
      {delays.map((delayFrames, i) => {
        const localFrame = (frame - delayFrames + cycleDuration * 100) % cycleDuration;
        const radius = interpolate(
          localFrame,
          [0, cycleDuration],
          [size * 0.04, size * 0.45],
          { extrapolateRight: "clamp" }
        );
        const ringOpacity = interpolate(
          localFrame,
          [0, Math.floor(cycleDuration * 0.3), cycleDuration],
          [0, 0.15, 0],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );

        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={0.5}
            opacity={ringOpacity}
          />
        );
      })}
    </g>
  );
};
