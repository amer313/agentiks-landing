import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, AGENT_CARDS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const DISPLAYED_AGENTS = [
  { label: "Marketing Agent", color: "#F43F5E", angle: -60 },
  { label: "Finance Agent", color: "#10B981", angle: 0 },
  { label: "Logistics Agent", color: "#22D3EE", angle: 60 },
  { label: "Compliance Agent", color: "#14B8A6", angle: 120 },
  { label: "Legal Agent", color: "#8B5CF6", angle: 180 },
  { label: "Sales Agent", color: "#F59E0B", angle: 240 },
];

export const EcosystemExpand: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const coreScale = spring({ frame, fps: FPS, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });
  const coreOpacity = interpolate(progress, [0, 0.12], [0, 1], { extrapolateRight: "clamp" });

  const orbitRadius = interpolate(progress, [0.1, 0.65], [0, 280], { extrapolateRight: "clamp" });
  const labelOpacity = interpolate(progress, [0.6, 0.85], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 0,
        background: "transparent",
      }}
    >
      <div style={{ position: "relative", width: 680, height: 680 }}>
        {/* Connecting lines */}
        <svg
          width="680"
          height="680"
          style={{ position: "absolute", inset: 0 }}
        >
          {DISPLAYED_AGENTS.map((agent, i) => {
            const angleRad = (agent.angle * Math.PI) / 180;
            const cx = 340;
            const cy = 340;
            const ex = cx + orbitRadius * Math.cos(angleRad);
            const ey = cy + orbitRadius * Math.sin(angleRad);
            const lineOpacity = interpolate(
              progress,
              [0.1 + i * 0.06, 0.25 + i * 0.06],
              [0, 0.35],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );
            return (
              <line
                key={agent.label}
                x1={cx}
                y1={cy}
                x2={ex}
                y2={ey}
                stroke={agent.color}
                strokeWidth={1.5}
                opacity={lineOpacity}
                strokeDasharray="4 6"
              />
            );
          })}
          {/* Orbit ring */}
          <circle
            cx="340"
            cy="340"
            r={orbitRadius}
            stroke={COLORS.brand}
            strokeWidth={1}
            opacity={interpolate(progress, [0.2, 0.5], [0, 0.18], { extrapolateRight: "clamp" })}
            fill="none"
            strokeDasharray="6 8"
          />
        </svg>

        {/* Agent cards fanning out */}
        {DISPLAYED_AGENTS.map((agent, i) => {
          const angleRad = (agent.angle * Math.PI) / 180;
          const x = 340 + orbitRadius * Math.cos(angleRad);
          const y = 340 + orbitRadius * Math.sin(angleRad);

          const cardProgress = interpolate(
            progress,
            [0.1 + i * 0.06, 0.3 + i * 0.06],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          const cardScale = spring({
            frame: Math.max(0, frame - Math.round((0.1 + i * 0.06) * durationFrames)),
            fps: FPS,
            config: { damping: 14, stiffness: 120 },
            from: 0,
            to: 1,
          });

          return (
            <div
              key={agent.label}
              style={{
                position: "absolute",
                left: x - 80,
                top: y - 32,
                width: 160,
                opacity: cardProgress,
                transform: `scale(${cardScale})`,
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  background: COLORS.surface2,
                  borderRadius: 10,
                  border: `1.5px solid ${agent.color}55`,
                  boxShadow: `0 0 18px ${agent.color}22`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: agent.color,
                      boxShadow: `0 0 6px ${agent.color}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: FONT_FAMILY_SANS,
                      fontSize: 13,
                      fontWeight: 700,
                      color: COLORS.foreground,
                      lineHeight: 1.2,
                    }}
                  >
                    {agent.label}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: FONT_FAMILY_MONO,
                    fontSize: 10,
                    color: COLORS.mutedForeground,
                  }}
                >
                  active
                </span>
              </div>
            </div>
          );
        })}

        {/* Core orchestrator dot */}
        <div
          style={{
            position: "absolute",
            left: 340 - 52,
            top: 340 - 52,
            width: 104,
            height: 104,
            opacity: coreOpacity,
            transform: `scale(${coreScale})`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: `radial-gradient(circle at 40% 40%, ${COLORS.brandLight}, ${COLORS.brand})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 40px ${COLORS.brand}88, 0 0 80px ${COLORS.brand}33`,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 11,
                fontWeight: 800,
                color: "#fff",
                textAlign: "center",
                lineHeight: 1.3,
                letterSpacing: "0.04em",
              }}
            >
              ORCH-{"\n"}ESTRATOR
            </span>
          </div>
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          opacity: labelOpacity,
          marginTop: 24,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 36,
            fontWeight: 700,
            color: COLORS.foreground,
            letterSpacing: "-0.02em",
          }}
        >
          entire AI agent ecosystems
        </span>
      </div>
    </AbsoluteFill>
  );
};
