import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FPS, mulberry32 } from "../../brand";

interface NeuralWebProps {
  cx: number;
  cy: number;
  size: number;
  opacity?: number;
}

function buildNeural(cx: number, cy: number, size: number) {
  const r = mulberry32(77);
  const nodes: { x: number; y: number }[] = [];
  for (let i = 0; i < 35; i++) {
    const a = r() * Math.PI * 2;
    const d = (r() * 0.32 + 0.1) * size;
    nodes.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d });
  }
  const lines: { x1: number; y1: number; x2: number; y2: number; delay: number; color: string }[] = [];
  const colors = ["#2563EB", "#06B6D4", "#8B5CF6", "#F59E0B"];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.sqrt((nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2);
      if (d < size * 0.14 && r() > 0.45) {
        lines.push({
          x1: nodes[i].x,
          y1: nodes[i].y,
          x2: nodes[j].x,
          y2: nodes[j].y,
          delay: r() * 6,
          color: colors[Math.floor(r() * 4)],
        });
      }
    }
  }
  return lines;
}

export const NeuralWeb: React.FC<NeuralWebProps> = ({ cx, cy, size, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const lines = buildNeural(cx, cy, size);
  const cycleDuration = Math.floor(3.5 * FPS);
  const pauseDuration = 3 * FPS;
  const totalCycle = cycleDuration + pauseDuration;

  return (
    <g opacity={opacity}>
      {lines.map((l, i) => {
        const delayFrames = Math.floor(l.delay * FPS);
        const localFrame = (frame + delayFrames) % totalCycle;
        const lineOpacity = interpolate(
          localFrame,
          [0, Math.floor(FPS * 0.5), cycleDuration - Math.floor(FPS * 0.5), cycleDuration],
          [0, 0.25, 0.25, 0],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );

        return (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={l.color}
            strokeWidth={0.4}
            opacity={lineOpacity}
          />
        );
      })}
    </g>
  );
};
