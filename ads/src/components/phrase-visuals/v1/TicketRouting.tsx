import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const TICKETS = [
  { id: "TKT-2847", label: "DB timeout prod", color: COLORS.red, lane: 0 },
  { id: "TKT-2848", label: "Login loop", color: COLORS.amber, lane: 1 },
  { id: "TKT-2849", label: "Invoice mismatch", color: COLORS.green, lane: 2 },
  { id: "TKT-2850", label: "API 500 error", color: COLORS.red, lane: 0 },
  { id: "TKT-2851", label: "Email bounce", color: COLORS.amber, lane: 1 },
];

const LANE_LABELS = ["Critical", "High", "Normal"];
const LANE_COLORS = [COLORS.red, COLORS.amber, COLORS.green];

export const TicketRouting: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const clockOpacity = interpolate(progress, [0, 0.2], [0, 1], { extrapolateRight: "clamp" });
  const clockScale = spring({ frame, fps: FPS, config: { damping: 14, stiffness: 100 }, from: 0.6, to: 1 });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 36,
        background: "transparent",
      }}
    >
      {/* Clock */}
      <div
        style={{
          opacity: clockOpacity,
          transform: `scale(${clockScale})`,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="29" stroke={COLORS.amber} strokeWidth={3} />
          <circle cx="32" cy="32" r="3" fill={COLORS.amber} />
          {/* Hour hand pointing to 11 */}
          <line x1="32" y1="32" x2="18" y2="12" stroke={COLORS.foreground} strokeWidth={3} strokeLinecap="round" />
          {/* Minute hand pointing to 12 */}
          <line x1="32" y1="32" x2="32" y2="8" stroke={COLORS.amber} strokeWidth={2} strokeLinecap="round" />
          {/* Hour markers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 32 + 25 * Math.sin(angle);
            const y1 = 32 - 25 * Math.cos(angle);
            const x2 = 32 + 29 * Math.sin(angle);
            const y2 = 32 - 29 * Math.cos(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS.foreground} strokeWidth={i % 3 === 0 ? 2.5 : 1} opacity={0.5} />;
          })}
        </svg>
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.amber,
          }}
        >
          11:00 PM
        </span>
      </div>

      {/* Lanes */}
      <div style={{ display: "flex", gap: 20 }}>
        {LANE_LABELS.map((lane, laneIdx) => {
          const laneColor = LANE_COLORS[laneIdx];
          const laneTickets = TICKETS.filter((t) => t.lane === laneIdx);
          return (
            <div
              key={lane}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                width: 220,
              }}
            >
              {/* Lane header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  paddingBottom: 8,
                  borderBottom: `2px solid ${laneColor}`,
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: laneColor }} />
                <span
                  style={{
                    fontFamily: FONT_FAMILY_SANS,
                    fontSize: 16,
                    fontWeight: 700,
                    color: laneColor,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {lane}
                </span>
                <span
                  style={{
                    fontFamily: FONT_FAMILY_MONO,
                    fontSize: 14,
                    color: COLORS.mutedForeground,
                    marginLeft: "auto",
                  }}
                >
                  {laneTickets.length}
                </span>
              </div>

              {/* Tickets */}
              {laneTickets.map((ticket, ti) => {
                const ticketProgress = interpolate(
                  progress,
                  [ti * 0.15, ti * 0.15 + 0.25],
                  [0, 1],
                  { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
                );
                const ticketY = interpolate(ticketProgress, [0, 1], [-40, 0]);
                const ticketOpacity = interpolate(ticketProgress, [0, 1], [0, 1]);
                return (
                  <div
                    key={ticket.id}
                    style={{
                      transform: `translateY(${ticketY}px)`,
                      opacity: ticketOpacity,
                      padding: "10px 14px",
                      background: COLORS.surface2,
                      borderRadius: 8,
                      borderLeft: `3px solid ${ticket.color}`,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT_FAMILY_MONO,
                        fontSize: 11,
                        color: COLORS.mutedForeground,
                      }}
                    >
                      {ticket.id}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY_SANS,
                        fontSize: 14,
                        fontWeight: 500,
                        color: COLORS.foreground,
                      }}
                    >
                      {ticket.label}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* "Manually routing..." label */}
      <div style={{ opacity: interpolate(progress, [0.3, 0.5], [0, 1], { extrapolateRight: "clamp" }) }}>
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 22,
            fontWeight: 400,
            color: COLORS.mutedForeground,
            fontStyle: "italic",
          }}
        >
          manually routing tickets at 11 PM...
        </span>
      </div>
    </AbsoluteFill>
  );
};
