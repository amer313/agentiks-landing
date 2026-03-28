import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const TASKS = [
  { label: "Lead scoring", icon: "👤" },
  { label: "Invoicing", icon: "💳" },
  { label: "Customer intake", icon: "📥" },
  { label: "Reporting", icon: "📊" },
];

export const TaskChecklist: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const headerSpring = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 120 } });
  const headerOpacity = interpolate(headerSpring, [0, 0.5], [0, 1]);

  // Each task checks off sequentially
  const checkedCount = Math.floor(interpolate(progress, [0.1, 0.9], [0, TASKS.length + 0.99], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 740, display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Header */}
        <div
          style={{
            opacity: headerOpacity,
            display: "flex",
            alignItems: "center",
            gap: 16,
            paddingBottom: 20,
            borderBottom: `1px solid rgba(255,255,255,0.06)`,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="1" y="1" width="26" height="26" rx="5" stroke={COLORS.green} strokeWidth="2" />
            <path d="M6 14 L11 19 L22 8" stroke={COLORS.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 22, letterSpacing: "0.08em", color: COLORS.mutedForeground }}>
            AGENT TASKS — RUNNING
          </span>
          <div
            style={{
              marginLeft: "auto",
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: COLORS.green,
              boxShadow: `0 0 12px ${COLORS.green}`,
              animation: "pulse 1s infinite",
            }}
          />
        </div>

        {/* Task items */}
        {TASKS.map((task, i) => {
          const taskSpring = spring({ frame: frame - i * 6, fps: FPS, config: { damping: 16, stiffness: 140 } });
          const taskOpacity = interpolate(taskSpring, [0, 0.3], [0, 1]);
          const taskY = interpolate(taskSpring, [0, 1], [24, 0]);
          const isChecked = i < checkedCount;

          const checkSpring = spring({
            frame: frame - Math.floor(durationFrames * (0.1 + i * 0.2)),
            fps: FPS,
            config: { damping: 10, stiffness: 220, mass: 0.6 },
          });
          const checkScale = isChecked ? interpolate(checkSpring, [0, 1], [0, 1]) : 0;

          return (
            <div
              key={i}
              style={{
                opacity: taskOpacity,
                transform: `translateY(${taskY}px)`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "22px 28px",
                backgroundColor: isChecked ? `rgba(16,185,129,0.07)` : COLORS.surface,
                border: `1.5px solid ${isChecked ? `rgba(16,185,129,0.3)` : `rgba(255,255,255,0.06)`}`,
                borderRadius: 16,
                transition: "background-color 0.15s",
              }}
            >
              {/* Checkbox */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  border: `2.5px solid ${isChecked ? COLORS.green : `rgba(255,255,255,0.2)`}`,
                  backgroundColor: isChecked ? `rgba(16,185,129,0.2)` : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${1 + checkScale * 0.05})`,
                  flexShrink: 0,
                  boxShadow: isChecked ? `0 0 16px rgba(16,185,129,0.3)` : "none",
                }}
              >
                <div style={{ transform: `scale(${checkScale})` }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12 L9 17 L20 6" stroke={COLORS.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Task label */}
              <span
                style={{
                  fontFamily: FONT_FAMILY_SANS,
                  fontSize: 36,
                  fontWeight: 600,
                  color: isChecked ? COLORS.foreground : COLORS.mutedForeground,
                  textDecoration: isChecked ? "none" : "none",
                  letterSpacing: "-0.01em",
                }}
              >
                {task.label}
              </span>

              {/* Status */}
              <div style={{ marginLeft: "auto" }}>
                <span
                  style={{
                    fontFamily: FONT_FAMILY_MONO,
                    fontSize: 18,
                    color: isChecked ? COLORS.green : COLORS.mutedForeground,
                    fontWeight: isChecked ? 700 : 400,
                    letterSpacing: "0.04em",
                  }}
                >
                  {isChecked ? "DONE ✓" : "queued"}
                </span>
              </div>
            </div>
          );
        })}

        {/* Progress summary */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            backgroundColor: `rgba(16,185,129,0.06)`,
            border: `1px solid rgba(16,185,129,0.15)`,
            borderRadius: 12,
            opacity: interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 18, color: COLORS.mutedForeground }}>
            PROGRESS
          </span>
          <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 22, fontWeight: 700, color: COLORS.green }}>
            {checkedCount}/{TASKS.length} complete
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
