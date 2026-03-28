import React from "react";
import { useCurrentFrame, spring } from "remotion";
import { FPS } from "../../brand";
import type { AgentCardData } from "../../types";
import { FONT_FAMILY_MONO } from "../../fonts";

interface AgentCardProps {
  workflow: AgentCardData;
  cx: number;
  cy: number;
  size: number;
  enterFrame: number;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  workflow,
  cx,
  cy,
  size,
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

  const x = cx + workflow.px * size;
  const y = cy + workflow.py * size;
  const cw = size * 0.16;
  const ch = size * 0.045;

  // Sub-agents fan outward from center through the parent
  const parentAngle = Math.atan2(workflow.py, workflow.px);
  const parentDist = Math.sqrt(workflow.px ** 2 + workflow.py ** 2);
  const subNodes = workflow.subs.map((sub, si) => {
    const spread = (si - (workflow.subs.length - 1) / 2) * 0.35;
    const subAngle = parentAngle + spread;
    const subDist = (parentDist + 0.14) * size;
    return {
      label: sub,
      x: cx + Math.cos(subAngle) * subDist,
      y: cy + Math.sin(subAngle) * subDist,
    };
  });

  const subOpacity = spring({
    frame: Math.max(0, relativeFrame - 15),
    fps: FPS,
    config: { damping: 15 },
  });

  return (
    <g
      opacity={popIn}
      transform={`translate(${x}, ${y}) scale(${popIn}) translate(${-x}, ${-y})`}
    >
      {/* Line to core */}
      <line
        x1={cx}
        y1={cy}
        x2={x}
        y2={y}
        stroke={workflow.color}
        strokeOpacity={0.1}
        strokeWidth={0.6}
        strokeDasharray="3 6"
      />

      {/* Sub-agents */}
      {subNodes.map((sub, si) => (
        <g key={si} opacity={subOpacity}>
          <line
            x1={x}
            y1={y}
            x2={sub.x}
            y2={sub.y}
            stroke={workflow.color}
            strokeOpacity={0.08}
            strokeWidth={0.4}
            strokeDasharray="2 5"
          />
          <circle
            cx={sub.x}
            cy={sub.y}
            r={size * 0.012}
            fill={workflow.color}
            fillOpacity={0.05}
            stroke={workflow.color}
            strokeOpacity={0.15}
            strokeWidth={0.4}
          />
          <circle
            cx={sub.x}
            cy={sub.y}
            r={size * 0.004}
            fill={workflow.color}
            fillOpacity={0.3}
          />
          <text
            x={sub.x}
            y={sub.y + size * 0.024}
            textAnchor="middle"
            fill="rgba(255,255,255,0.2)"
            fontSize={size * 0.013}
            fontFamily={FONT_FAMILY_MONO}
          >
            {sub.label}
          </text>
        </g>
      ))}

      {/* Card background */}
      <rect
        x={x - cw / 2}
        y={y - ch / 2}
        width={cw}
        height={ch}
        rx={4}
        fill="rgba(10,11,16,0.88)"
        stroke={workflow.color}
        strokeOpacity={0.22}
        strokeWidth={0.5}
      />
      {/* Status dot */}
      <circle
        cx={x - cw / 2 + size * 0.012}
        cy={y - ch * 0.12}
        r={size * 0.004}
        fill={workflow.color}
        fillOpacity={0.7}
      />
      {/* Label text */}
      <text
        x={x - cw / 2 + size * 0.02}
        y={y + ch * 0.05}
        fill="rgba(255,255,255,0.65)"
        fontSize={size * 0.015}
        fontFamily={FONT_FAMILY_MONO}
        fontWeight={600}
      >
        {workflow.label}
      </text>
      {/* Status text */}
      <text
        x={x - cw / 2 + size * 0.012}
        y={y + ch * 0.35}
        fill="rgba(255,255,255,0.25)"
        fontSize={size * 0.011}
        fontFamily={FONT_FAMILY_MONO}
      >
        {workflow.status}
      </text>
    </g>
  );
};
