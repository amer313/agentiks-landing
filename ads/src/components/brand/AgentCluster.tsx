import React from "react";
import { AGENT_CARDS } from "../../brand";
import { AgentCard } from "./AgentCard";

interface AgentClusterProps {
  cardCount?: 6 | 16;
  cx: number;
  cy: number;
  size: number;
  startFrame: number;
  staggerFrames?: number;
}

export const AgentCluster: React.FC<AgentClusterProps> = ({
  cardCount = 6,
  cx,
  cy,
  size,
  startFrame,
  staggerFrames = 4,
}) => {
  const cards = AGENT_CARDS.slice(0, cardCount);

  return (
    <g>
      {cards.map((card, i) => (
        <AgentCard
          key={card.label}
          workflow={card}
          cx={cx}
          cy={cy}
          size={size}
          enterFrame={startFrame + i * staggerFrames}
        />
      ))}
    </g>
  );
};
