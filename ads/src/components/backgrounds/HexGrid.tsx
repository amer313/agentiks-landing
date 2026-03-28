import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FPS, mulberry32 } from "../../brand";

interface HexGridProps {
  cx: number;
  cy: number;
  size: number;
  opacity?: number;
}

function buildHexes(cx: number, cy: number, size: number) {
  const r = mulberry32(99);
  const hexSize = 28;
  const hexH = hexSize * Math.sqrt(3);
  const cols = Math.ceil(size / (hexSize * 1.5)) + 1;
  const rows = Math.ceil(size / hexH) + 1;
  const result: { x: number; y: number; delay: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let c = 0; c < cols; c++) {
      const x = c * hexSize * 1.5 + (cx - size / 2);
      const y = row * hexH + (c % 2 === 1 ? hexH / 2 : 0) + (cy - size / 2);
      const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (d < size * 0.46 && r() > 0.65) {
        result.push({ x, y, delay: r() * 8 });
      }
    }
  }
  return result;
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

export const HexGrid: React.FC<HexGridProps> = ({ cx, cy, size, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const hexes = buildHexes(cx, cy, size);
  const cycleDuration = 4 * FPS; // 4 seconds

  return (
    <g opacity={opacity}>
      {hexes.map((h, i) => {
        const delayFrames = Math.floor(h.delay * FPS);
        const localFrame = (frame + delayFrames) % cycleDuration;
        const hexOpacity = interpolate(
          localFrame,
          [0, FPS, 3 * FPS, cycleDuration],
          [0, 0.35, 0.35, 0],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );

        return (
          <polygon
            key={i}
            points={hexPoints(h.x, h.y, 10)}
            fill="none"
            stroke="rgba(180,0,255,0.08)"
            strokeWidth={0.5}
            opacity={hexOpacity}
          />
        );
      })}
    </g>
  );
};
