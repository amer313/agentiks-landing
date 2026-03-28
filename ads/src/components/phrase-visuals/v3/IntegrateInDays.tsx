import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const IntegrateInDays: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const sceneIn = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 140 } });

  // Old bar shrinks
  const oldBarWidth = interpolate(progress, [0.1, 0.5], [280, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // New bar grows
  const newBarWidth = interpolate(progress, [0.4, 0.85], [0, 280], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const arrowOpacity = interpolate(progress, [0.3, 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const newLabelOpacity = interpolate(progress, [0.5, 0.75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const strikethroughWidth = interpolate(progress, [0.2, 0.45], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 40,
        padding: "0 60px",
        opacity: sceneIn,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 28,
          fontWeight: 600,
          color: COLORS.mutedForeground,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        Time to integrate
      </div>

      {/* Old row: Quarters */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 580 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 22,
              fontWeight: 600,
              color: COLORS.red,
              width: 140,
              position: "relative",
              opacity: 0.7,
            }}
          >
            Quarters
            {/* Strikethrough */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                height: 3,
                width: `${strikethroughWidth}%`,
                background: COLORS.red,
                borderRadius: 2,
              }}
            />
          </div>
          <div
            style={{
              height: 36,
              width: oldBarWidth,
              background: `linear-gradient(90deg, ${COLORS.red}60, ${COLORS.red}30)`,
              borderRadius: 6,
              border: `1.5px solid ${COLORS.red}40`,
              transition: "width 0.05s",
            }}
          />
          <div style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 18, color: COLORS.red, opacity: 0.7 }}>
            3-6 mo
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: arrowOpacity,
          }}
        >
          <svg width="40" height="32" viewBox="0 0 40 32">
            <line x1={20} y1={0} x2={20} y2={20} stroke={COLORS.brand} strokeWidth={3} strokeLinecap="round" />
            <polyline points="10,14 20,24 30,14" fill="none" stroke={COLORS.brand} strokeWidth={3} strokeLinejoin="round" />
          </svg>
          <div style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 18, fontWeight: 700, color: COLORS.brand, marginLeft: 8 }}>
            With Agentiks
          </div>
        </div>

        {/* New row: Days */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.green,
              width: 140,
            }}
          >
            Days
          </div>
          <div
            style={{
              height: 36,
              width: newBarWidth,
              background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.cyan})`,
              borderRadius: 6,
              boxShadow: `0 0 20px ${COLORS.green}50`,
            }}
          />
          <div style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 18, color: COLORS.green, opacity: newLabelOpacity, fontWeight: 700 }}>
            2-5 days
          </div>
        </div>
      </div>

      {/* Speed label */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 38,
          fontWeight: 800,
          color: COLORS.foreground,
          textAlign: "center",
          opacity: newLabelOpacity,
          letterSpacing: "-0.02em",
        }}
      >
        Not quarters.{" "}
        <span style={{ color: COLORS.green }}>Days.</span>
      </div>
    </AbsoluteFill>
  );
};
