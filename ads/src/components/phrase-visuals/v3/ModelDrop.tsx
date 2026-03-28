import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const MODELS = [
  { name: "GPT-5", color: "#10B981", delay: 0 },
  { name: "Claude 4", color: COLORS.brand, delay: 8 },
  { name: "Gemini 3", color: COLORS.cyan, delay: 16 },
];

export const ModelDrop: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 32,
        padding: "0 60px",
      }}
    >
      {/* Label */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 28,
          fontWeight: 500,
          color: COLORS.mutedForeground,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: interpolate(progress, [0, 0.15], [0, 1], { extrapolateRight: "clamp" }),
          marginBottom: 8,
        }}
      >
        Last week dropped:
      </div>

      {/* Model cards */}
      {MODELS.map((model, i) => {
        const cardSpring = spring({
          frame: Math.max(0, frame - model.delay),
          fps: FPS,
          config: { damping: 14, stiffness: 180, mass: 0.8 },
        });
        const translateY = interpolate(cardSpring, [0, 1], [-120, 0]);
        const opacity = interpolate(cardSpring, [0, 0.3], [0, 1]);

        return (
          <div
            key={model.name}
            style={{
              width: "100%",
              maxWidth: 600,
              background: COLORS.surface,
              border: `2px solid ${model.color}40`,
              borderRadius: 20,
              padding: "28px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity,
              transform: `translateY(${translateY}px)`,
              boxShadow: `0 8px 40px ${model.color}20, inset 0 1px 0 ${model.color}20`,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 42,
                fontWeight: 700,
                color: COLORS.foreground,
                letterSpacing: "-0.02em",
              }}
            >
              {model.name}
            </span>
            <span
              style={{
                background: model.color,
                color: "#000",
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 18,
                fontWeight: 800,
                padding: "6px 16px",
                borderRadius: 8,
                letterSpacing: "0.1em",
              }}
            >
              NEW
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
