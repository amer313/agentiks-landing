import React from "react";
import { useCurrentFrame, spring } from "remotion";
import { FPS } from "../../brand";
import type { AgentCardData } from "../../types";
import { FONT_FAMILY_MONO } from "../../fonts";

interface AgentCardProps {
  workflow: AgentCardData;
  x: number;
  y: number;
  width: number;
  height: number;
  enterFrame: number;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  workflow,
  x,
  y,
  width,
  height,
  enterFrame,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - enterFrame;

  const popIn = spring({
    frame: Math.max(0, relativeFrame),
    fps: FPS,
    config: { damping: 12, stiffness: 180 },
  });

  if (relativeFrame < 0) return null;

  return (
    <g opacity={popIn} transform={`translate(${x}, ${y}) scale(${popIn})`}>
      {/* Card background */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={4}
        fill="rgba(10,11,16,0.88)"
        stroke={workflow.color}
        strokeOpacity={0.22}
        strokeWidth={0.5}
      />
      {/* Status dot */}
      <circle
        cx={12}
        cy={height / 2}
        r={4}
        fill={workflow.color}
        fillOpacity={0.7}
      />
      {/* Label text */}
      <text
        x={24}
        y={height * 0.42}
        fill="rgba(255,255,255,0.65)"
        fontSize={14}
        fontFamily={FONT_FAMILY_MONO}
        fontWeight={600}
      >
        {workflow.label}
      </text>
      {/* Status text */}
      <text
        x={24}
        y={height * 0.72}
        fill="rgba(255,255,255,0.25)"
        fontSize={11}
        fontFamily={FONT_FAMILY_MONO}
      >
        {workflow.status}
      </text>
    </g>
  );
};
