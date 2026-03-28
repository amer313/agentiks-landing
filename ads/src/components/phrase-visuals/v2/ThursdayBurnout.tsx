import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const ThursdayBurnout: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const containerScale = spring({
    frame,
    fps: FPS,
    config: { damping: 18, stiffness: 120, mass: 0.9 },
  });

  const thuFlash = Math.sin(frame * 0.25) * 0.4 + 0.6;
  const fireScale = interpolate(progress, [0.5, 1], [0.8, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Stick figures drooping
  const droopAngle = interpolate(progress, [0.3, 0.9], [0, 18], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          transform: `scale(${interpolate(containerScale, [0, 1], [0.85, 1])})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 48,
        }}
      >
        {/* Calendar */}
        <div
          style={{
            width: 760,
            backgroundColor: COLORS.surface,
            borderRadius: 20,
            overflow: "hidden",
            border: `1.5px solid rgba(255,255,255,0.08)`,
            boxShadow: `0 0 80px rgba(180,0,255,0.1)`,
          }}
        >
          {/* Calendar header */}
          <div
            style={{
              padding: "20px 28px",
              backgroundColor: COLORS.surface2,
              borderBottom: `1px solid rgba(255,255,255,0.06)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 26, fontWeight: 700, color: COLORS.foreground }}>
              October 2024
            </span>
            <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 18, color: COLORS.mutedForeground }}>
              Week 42
            </span>
          </div>

          {/* Day grid */}
          <div style={{ display: "flex" }}>
            {DAYS.map((day, i) => {
              const isThu = day === "THU";
              const dayOpacity = interpolate(frame, [i * 3, i * 3 + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div
                  key={day}
                  style={{
                    flex: 1,
                    padding: "22px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    opacity: dayOpacity,
                    backgroundColor: isThu ? `rgba(239,68,68,${0.15 * thuFlash})` : "transparent",
                    borderRight: i < 6 ? `1px solid rgba(255,255,255,0.05)` : "none",
                    transition: "background-color 0.1s",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_FAMILY_MONO,
                      fontSize: 18,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: isThu ? COLORS.red : COLORS.mutedForeground,
                    }}
                  >
                    {day}
                  </span>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: isThu ? COLORS.red : "rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: isThu ? `0 0 24px rgba(239,68,68,${0.6 * thuFlash})` : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT_FAMILY_SANS,
                        fontSize: 22,
                        fontWeight: 700,
                        color: isThu ? "#fff" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {10 + i}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stick figures row -- exhausted team */}
        <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
          {[0, 1, 2, 3, 4].map((i) => {
            const figureDelay = i * 4;
            const figureOpacity = interpolate(frame, [figureDelay, figureDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const figureDroop = droopAngle * (0.7 + i * 0.15);
            return (
              <div
                key={i}
                style={{
                  opacity: figureOpacity,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transform: `rotate(${figureDroop}deg)`,
                  transformOrigin: "bottom center",
                }}
              >
                <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
                  {/* Head */}
                  <circle cx="30" cy="14" r="12" stroke={COLORS.mutedForeground} strokeWidth="3" />
                  {/* Body */}
                  <line x1="30" y1="26" x2="30" y2="60" stroke={COLORS.mutedForeground} strokeWidth="3" strokeLinecap="round" />
                  {/* Arms drooping */}
                  <line x1="30" y1="40" x2="10" y2="58" stroke={COLORS.mutedForeground} strokeWidth="3" strokeLinecap="round" />
                  <line x1="30" y1="40" x2="50" y2="58" stroke={COLORS.mutedForeground} strokeWidth="3" strokeLinecap="round" />
                  {/* Legs */}
                  <line x1="30" y1="60" x2="18" y2="90" stroke={COLORS.mutedForeground} strokeWidth="3" strokeLinecap="round" />
                  <line x1="30" y1="60" x2="42" y2="90" stroke={COLORS.mutedForeground} strokeWidth="3" strokeLinecap="round" />
                  {/* Tired eyes */}
                  <line x1="24" y1="13" x2="28" y2="13" stroke={COLORS.mutedForeground} strokeWidth="2" strokeLinecap="round" />
                  <line x1="32" y1="13" x2="36" y2="13" stroke={COLORS.mutedForeground} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            );
          })}
        </div>

        {/* Fire/burnout icon */}
        <div
          style={{
            transform: `scale(${fireScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <svg width="72" height="80" viewBox="0 0 72 80" fill="none">
            <path
              d="M36 8 C36 8 48 22 48 36 C48 36 44 28 36 28 C36 28 56 48 44 64 C44 64 52 44 36 44 C36 44 44 60 28 68 C16 74 8 64 8 52 C8 36 24 28 24 16 C24 16 20 28 28 32 C28 32 20 20 36 8Z"
              fill={COLORS.red}
              opacity={0.85}
            />
            <path
              d="M36 32 C36 32 44 42 40 52 C38 56 32 60 28 56 C24 52 28 44 36 32Z"
              fill={COLORS.amber}
              opacity={0.9}
            />
          </svg>
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.red,
              letterSpacing: "-0.01em",
            }}
          >
            Already fried.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
