import React from "react";
import { AGENT_CARDS } from "../../brand";
import { AgentCard } from "./AgentCard";

// Indices of well-distributed agents covering all 360°:
// Marketing (-0.30,-0.36), Finance (0.32,-0.24), Logistics (-0.40,0.06),
// Scheduling (0.36,0.18), Compliance (-0.24,0.20), Legal (0.20,0.34)
const DISTRIBUTED_6_LABELS = [
  "Marketing Agent",
  "Finance Agent",
  "Logistics Agent",
  "Scheduling Agent",
  "Compliance Agent",
  "Legal Agent",
];

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
  // Scale up the visualization by 40% to fill more of the frame
  const scaledSize = size * 1.4;

  let cards;
  if (cardCount === 6) {
    // Pick the well-distributed subset instead of slice(0,6) which clusters above
    cards = DISTRIBUTED_6_LABELS
      .map((label) => AGENT_CARDS.find((c) => c.label === label))
      .filter((c): c is (typeof AGENT_CARDS)[0] => c !== undefined);
  } else {
    cards = AGENT_CARDS.slice(0, cardCount);
  }

  return (
    <g>
      {cards.map((card, i) => (
        <AgentCard
          key={card.label}
          workflow={card}
          cx={cx}
          cy={cy}
          size={scaledSize}
          enterFrame={startFrame + i * staggerFrames}
        />
      ))}
    </g>
  );
};
