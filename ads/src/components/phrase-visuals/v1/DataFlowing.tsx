import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS, mulberry32 } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

// 3 nodes in a triangle
const NODES = [
  { id: "crm", label: "CRM", color: COLORS.cyan, x: 260, y: 200 },
  { id: "erp", label: "ERP", color: COLORS.brand, x: 520, y: 380 },
  { id: "db", label: "DB", color: COLORS.green, x: 200, y: 440 },
];

// All directed connections
const EDGES = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 0 },
  { from: 0, to: 2 },
];

// Pre-generate particles per edge
function buildParticles() {
  const particles: Array<{
    edgeIdx: number;
    t: number; // 0..1 position offset (stagger)
    speed: number;
    size: number;
    opacity: number;
  }> = [];
  const rng = mulberry32(42);
  EDGES.forEach((_, ei) => {
    for (let p = 0; p < 5; p++) {
      particles.push({
        edgeIdx: ei,
        t: rng(),
        speed: 0.6 + rng() * 0.8,
        size: 5 + rng() * 5,
        opacity: 0.6 + rng() * 0.4,
      });
    }
  });
  return particles;
}

const PARTICLES = buildParticles();

export const DataFlowing: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const systemsOpacity = interpolate(progress, [0, 0.2], [0, 1], { extrapolateRight: "clamp" });
  const edgesOpacity = interpolate(progress, [0.15, 0.35], [0, 0.3], { extrapolateRight: "clamp" });
  const particlesActive = interpolate(progress, [0.25, 0.45], [0, 1], { extrapolateRight: "clamp" });
  const labelOpacity = interpolate(progress, [0.65, 0.85], [0, 1], { extrapolateRight: "clamp" });

  // Animating cycle — normalized time that loops
  const cycleTime = (frame / durationFrames) * 2; // 2 loops over clip duration

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <div style={{ position: "relative", width: 720, height: 660 }}>
        <svg
          width="720"
          height="660"
          style={{ position: "absolute", inset: 0 }}
        >
          {/* Static connecting lines */}
          {EDGES.map(({ from, to }, ei) => {
            const a = NODES[from];
            const b = NODES[to];
            return (
              <line
                key={ei}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={a.color}
                strokeWidth={1.5}
                opacity={edgesOpacity}
                strokeDasharray="5 7"
              />
            );
          })}

          {/* Particles */}
          {PARTICLES.map((p, pi) => {
            const edge = EDGES[p.edgeIdx];
            const a = NODES[edge.from];
            const b = NODES[edge.to];

            // Each particle travels 0→1 continuously; offset by p.t and speed
            const rawT = ((cycleTime * p.speed + p.t) % 1);
            const px = a.x + (b.x - a.x) * rawT;
            const py = a.y + (b.y - a.y) * rawT;

            const particleOpacity = p.opacity * particlesActive;

            return (
              <circle
                key={pi}
                cx={px}
                cy={py}
                r={p.size / 2}
                fill={a.color}
                opacity={particleOpacity}
                style={{ filter: `drop-shadow(0 0 ${p.size}px ${a.color})` }}
              />
            );
          })}
        </svg>

        {/* System node circles */}
        {NODES.map((node, ni) => {
          const nodeOpacity = interpolate(
            progress,
            [ni * 0.07, ni * 0.07 + 0.18],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );

          return (
            <div
              key={node.id}
              style={{
                position: "absolute",
                left: node.x - 54,
                top: node.y - 54,
                width: 108,
                height: 108,
                opacity: systemsOpacity * nodeOpacity,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: COLORS.surface2,
                  border: `2.5px solid ${node.color}66`,
                  boxShadow: `0 0 28px ${node.color}33`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY_SANS,
                    fontSize: 22,
                    fontWeight: 800,
                    color: node.color,
                    lineHeight: 1,
                  }}
                >
                  {node.label}
                </span>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: node.color,
                    boxShadow: `0 0 8px ${node.color}`,
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Label */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: labelOpacity,
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 30,
              fontWeight: 700,
              color: COLORS.foreground,
            }}
          >
            running on autopilot
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
