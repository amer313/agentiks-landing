import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const TASK_LABELS = [
  "Q3 Report Review",
  "Lead Qualification",
  "Invoice Batch #847",
  "Client Onboarding",
  "Pipeline Audit",
  "Support Escalations",
  "Budget Reconciliation",
  "Contract Review",
];

export const BacklogPileup: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const visibleCards = Math.floor(interpolate(progress, [0, 0.9], [1, TASK_LABELS.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  const pipelineFill = interpolate(progress, [0, 1], [0.15, 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pipelineFlash = Math.sin(frame * 0.3) * 0.15 + 0.85;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 780, display: "flex", flexDirection: "column", gap: 36 }}>
        {/* Pipeline bar at top */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 20, color: COLORS.mutedForeground, letterSpacing: "0.06em" }}>
              PIPELINE STATUS
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 20,
                fontWeight: 700,
                color: pipelineFill > 0.75 ? COLORS.red : COLORS.amber,
              }}
            >
              {Math.round(pipelineFill * 100)}% BACKED UP
            </span>
          </div>
          <div
            style={{
              height: 18,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: 9,
              overflow: "hidden",
              border: `1px solid rgba(255,255,255,0.08)`,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pipelineFill * 100}%`,
                background: pipelineFill > 0.75
                  ? `linear-gradient(90deg, ${COLORS.amber}, ${COLORS.red})`
                  : `linear-gradient(90deg, ${COLORS.amber}, ${COLORS.amber})`,
                borderRadius: 9,
                opacity: pipelineFlash,
                transition: "width 0.05s",
                boxShadow: `0 0 20px rgba(239,68,68,${pipelineFill * 0.5})`,
              }}
            />
          </div>
        </div>

        {/* Task cards piling up */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
          {TASK_LABELS.map((label, i) => {
            const isVisible = i < visibleCards;
            const cardProgress = spring({
              frame: frame - i * 3,
              fps: FPS,
              config: { damping: 14, stiffness: 160, mass: 0.7 },
            });
            const cardY = interpolate(cardProgress, [0, 1], [-30, 0]);
            const cardOpacity = interpolate(cardProgress, [0, 0.3], [0, 1]);
            const overlap = i === 0 ? 0 : -8;

            return (
              <div
                key={i}
                style={{
                  opacity: isVisible ? cardOpacity : 0,
                  transform: `translateY(${isVisible ? cardY : -30}px)`,
                  marginTop: i === 0 ? 0 : overlap,
                  position: "relative",
                  zIndex: TASK_LABELS.length - i,
                }}
              >
                <div
                  style={{
                    padding: "18px 24px",
                    backgroundColor: COLORS.surface,
                    border: `1.5px solid rgba(255,255,255,0.07)`,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(239,68,68,${i > 4 ? 0.2 : 0})`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {/* Red indicator */}
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: i > 4 ? COLORS.red : COLORS.amber,
                        boxShadow: `0 0 8px ${i > 4 ? COLORS.red : COLORS.amber}`,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: FONT_FAMILY_SANS,
                        fontSize: 26,
                        fontWeight: 500,
                        color: COLORS.foreground,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: FONT_FAMILY_MONO,
                      fontSize: 18,
                      color: i > 4 ? COLORS.red : COLORS.mutedForeground,
                      fontWeight: i > 4 ? 700 : 400,
                    }}
                  >
                    {i > 4 ? "OVERDUE" : "PENDING"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Count badge */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              padding: "12px 28px",
              backgroundColor: `rgba(239,68,68,0.12)`,
              border: `1.5px solid rgba(239,68,68,0.3)`,
              borderRadius: 100,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: COLORS.red, boxShadow: `0 0 10px ${COLORS.red}` }} />
            <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 22, fontWeight: 700, color: COLORS.red, letterSpacing: "0.04em" }}>
              {visibleCards} tasks backed up
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
