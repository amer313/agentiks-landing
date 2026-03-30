import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS, AGENT_CARDS } from "../../brand";
import { FONT_FAMILY_MONO } from "../../fonts";

interface OrchestratorGraphProps {
  progress: number;
}

const NODE_COUNT = 6;
const CENTER_X = 660;
const CENTER_Y = 340;
const ORBIT_RADIUS = 160;

export const OrchestratorGraph: React.FC<OrchestratorGraphProps> = ({
  progress,
}) => {
  const frame = useCurrentFrame();

  // Pulsing ring on center node
  const pulseOpacity = 0.3 + 0.2 * Math.sin(frame * 0.15);

  return (
    <div
      style={{
        position: "absolute",
        left: 280,
        top: 56,
        right: 320,
        bottom: 0,
        zIndex: 1,
      }}
    >
      <svg
        width={1320}
        height={1024}
        viewBox="0 0 1320 700"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Edges from center to outer nodes */}
        {Array.from({ length: NODE_COUNT }).map((_, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const nx = CENTER_X + Math.cos(angle) * ORBIT_RADIUS;
          const ny = CENTER_Y + Math.sin(angle) * ORBIT_RADIUS;

          const edgeOpacity = interpolate(
            progress,
            [i * 0.1, i * 0.1 + 0.3],
            [0, 0.4],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Animated dash offset
          const dashOffset = interpolate(
            progress,
            [0, 1],
            [200, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <line
              key={`edge-${i}`}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={nx}
              y2={ny}
              stroke={COLORS.line}
              strokeWidth={1.5}
              strokeDasharray="6 4"
              strokeDashoffset={dashOffset}
              opacity={edgeOpacity}
            />
          );
        })}

        {/* Center node */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={48}
          fill="none"
          stroke={COLORS.brand}
          strokeWidth={2}
          opacity={pulseOpacity}
        />
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={40}
          fill={COLORS.surface2}
          stroke={COLORS.brand}
          strokeWidth={2}
        />
        <text
          x={CENTER_X}
          y={CENTER_Y + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={COLORS.foreground}
          fontSize={11}
          fontFamily={FONT_FAMILY_MONO}
          fontWeight={700}
        >
          Orchestrator
        </text>

        {/* Outer nodes */}
        {Array.from({ length: NODE_COUNT }).map((_, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const nx = CENTER_X + Math.cos(angle) * ORBIT_RADIUS;
          const ny = CENTER_Y + Math.sin(angle) * ORBIT_RADIUS;
          const card = AGENT_CARDS[i];

          const nodeOpacity = interpolate(
            progress,
            [i * 0.15, i * 0.15 + 0.2],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <g key={`node-${i}`} opacity={nodeOpacity}>
              <circle
                cx={nx}
                cy={ny}
                r={24}
                fill={COLORS.surface2}
                stroke={card.color}
                strokeWidth={2}
              />
              <circle
                cx={nx}
                cy={ny}
                r={6}
                fill={card.color}
                opacity={0.7}
              />
              <text
                x={nx}
                y={ny + 36}
                textAnchor="middle"
                fill={COLORS.mutedForeground}
                fontSize={10}
                fontFamily={FONT_FAMILY_MONO}
              >
                {card.label.replace(" Agent", "")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
