import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FPS, mulberry32 } from "../../brand";

interface DataStreamsProps {
  cx: number;
  cy: number;
  size: number;
}

function buildStreams(cx: number, cy: number, size: number) {
  const r = mulberry32(55);
  const colors = ["#3B82F6", "#06B6D4", "#8B5CF6", "#10B981", "#F59E0B"];
  return Array.from({ length: 18 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 18 + r() * 0.4;
    const dist = size * (0.15 + r() * 0.25);
    return {
      startX: cx + Math.cos(a) * dist,
      startY: cy + Math.sin(a) * dist,
      endX: cx + (Math.cos(a) * dist - cx) * 0.15 + cx * 0.85,
      endY: cy + (Math.sin(a) * dist - cy) * 0.15 + cy * 0.85,
      color: colors[i % 5],
      delay: r() * 5,
      dur: 2 + r() * 2,
    };
  });
}

export const DataStreams: React.FC<DataStreamsProps> = ({ cx, cy, size }) => {
  const frame = useCurrentFrame();
  const streams = buildStreams(cx, cy, size);

  return (
    <g>
      {streams.map((s, i) => {
        const delayFrames = Math.floor(s.delay * FPS);
        const durFrames = Math.floor(s.dur * FPS);
        const pauseFrames = 3 * FPS;
        const totalCycle = durFrames + pauseFrames;
        const localFrame = (frame - delayFrames + totalCycle * 100) % totalCycle;

        const progress = interpolate(
          localFrame,
          [0, durFrames],
          [0, 1],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );

        const particleX = interpolate(progress, [0, 1], [s.startX, cx + (s.startX - cx) * 0.15]);
        const particleY = interpolate(progress, [0, 1], [s.startY, cy + (s.startY - cy) * 0.15]);

        const particleOpacity = interpolate(
          localFrame,
          [0, Math.floor(durFrames * 0.1), Math.floor(durFrames * 0.7), durFrames],
          [0, 0.7, 0.7, 0],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );

        return (
          <circle
            key={i}
            cx={particleX}
            cy={particleY}
            r={1.5}
            fill={s.color}
            opacity={particleOpacity}
          />
        );
      })}
    </g>
  );
};
