import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const SalaryCounter: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const salary = Math.round(interpolate(progress, [0, 0.85], [0, 120000], { extrapolateRight: "clamp" }));
  const formatted = salary.toLocaleString("en-US");

  const iconOpacity = interpolate(progress, [0, 0.15], [0, 1], { extrapolateRight: "clamp" });
  const iconScale = spring({ frame, fps: FPS, config: { damping: 14, stiffness: 100 }, from: 0.5, to: 1 });

  const counterScale = interpolate(progress, [0.8, 0.9, 1.0], [1, 1.08, 1], { extrapolateRight: "clamp" });
  const plusOpacity = interpolate(progress, [0.85, 1.0], [0, 1], { extrapolateRight: "clamp" });

  const labelOpacity = interpolate(progress, [0.1, 0.3], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 48,
        background: "transparent",
      }}
    >
      {/* Executive silhouette icon */}
      <div style={{ opacity: iconOpacity, transform: `scale(${iconScale})` }}>
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
          {/* Head */}
          <circle cx="60" cy="32" r="22" fill={COLORS.foreground} opacity={0.85} />
          {/* Body / suit */}
          <path
            d="M18 140 C18 100 38 80 60 78 C82 80 102 100 102 140Z"
            fill={COLORS.foreground}
            opacity={0.85}
          />
          {/* Tie */}
          <polygon points="60,82 54,96 60,128 66,96" fill={COLORS.brand} opacity={0.9} />
          {/* Lapels */}
          <path d="M38 85 L60 82 L54 110Z" fill={COLORS.surface2} opacity={0.7} />
          <path d="M82 85 L60 82 L66 110Z" fill={COLORS.surface2} opacity={0.7} />
        </svg>
      </div>

      {/* Counter */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 6,
          transform: `scale(${counterScale})`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 96,
            fontWeight: 700,
            color: COLORS.green,
            lineHeight: 1,
            letterSpacing: "-4px",
          }}
        >
          ${formatted}
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 64,
            fontWeight: 700,
            color: COLORS.green,
            opacity: plusOpacity,
          }}
        >
          +
        </span>
      </div>

      {/* Label */}
      <div
        style={{
          opacity: labelOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 28,
            fontWeight: 500,
            color: COLORS.mutedForeground,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          annual salary
        </span>
        <div
          style={{
            width: 200,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.green}, transparent)`,
          }}
        />
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 22,
            fontWeight: 400,
            color: COLORS.amber,
          }}
        >
          copy-pasting spreadsheets
        </span>
      </div>
    </AbsoluteFill>
  );
};
