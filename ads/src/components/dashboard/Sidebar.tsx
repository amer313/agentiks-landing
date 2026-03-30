import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS, AGENT_CARDS } from "../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../fonts";

interface SidebarProps {
  visibleCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ visibleCount }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 56,
        width: 280,
        bottom: 0,
        padding: "8px 0",
        zIndex: 2,
      }}
    >
      {/* Section header */}
      <div
        style={{
          padding: "12px 16px 8px",
          fontFamily: FONT_FAMILY_MONO,
          fontSize: 10,
          fontWeight: 600,
          color: COLORS.mutedForeground,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        Active Agents
      </div>

      {AGENT_CARDS.map((card, i) => {
        const isVisible = i < visibleCount;
        const entryProgress = isVisible ? 1 : 0;
        const slideX = interpolate(entryProgress, [0, 1], [-20, 0]);
        const cardOpacity = entryProgress;

        // Green pulsing dot
        const pulse = 0.5 + 0.5 * Math.sin(frame * 0.12 + i * 1.2);

        return (
          <div
            key={card.label}
            style={{
              height: 64,
              padding: "12px 16px",
              borderLeft: `3px solid ${card.color}`,
              borderBottom: `1px solid ${COLORS.line}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: cardOpacity,
              transform: `translateX(${slideX}px)`,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: FONT_FAMILY_SANS,
                  fontSize: 14,
                  fontWeight: 700,
                  color: COLORS.foreground,
                  marginBottom: 2,
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY_MONO,
                  fontSize: 11,
                  color: COLORS.mutedForeground,
                }}
              >
                {card.status}
              </div>
            </div>

            {/* Green status dot */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: COLORS.green,
                opacity: 0.5 + pulse * 0.5,
                boxShadow: `0 0 6px ${COLORS.green}60`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
