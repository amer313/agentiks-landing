import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const COLS = 7;
const ROWS = 8;
const TOTAL = COLS * ROWS;

export const NewModelsWeekly: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  // How many cells are filled based on progress
  const filledCount = Math.floor(progress * TOTAL);

  // Pulse for filled cells
  const pulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.7, 1]);

  const labelOpacity = interpolate(progress, [0.7, 0.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 40,
        padding: "0 60px",
      }}
    >
      {/* Calendar header */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 24,
          fontWeight: 500,
          color: COLORS.mutedForeground,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          opacity: interpolate(progress, [0, 0.1], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Mon  Tue  Wed  Thu  Fri  Sat  Sun
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gap: 14,
          width: "100%",
          maxWidth: 600,
        }}
      >
        {Array.from({ length: TOTAL }, (_, i) => {
          const isFilled = i < filledCount;
          const fillProgress = isFilled
            ? Math.min(1, (filledCount - i) / 1)
            : 0;

          // Determine week row color
          const row = Math.floor(i / COLS);
          const hue = row * 30;
          const cellColor = isFilled
            ? `hsl(${270 + hue}, 100%, 65%)`
            : COLORS.surface2;

          return (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                borderRadius: 8,
                background: isFilled ? cellColor : COLORS.surface,
                border: `1.5px solid ${isFilled ? cellColor + "80" : COLORS.surface2}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: isFilled ? 0.85 * pulse : 0.4,
                boxShadow: isFilled ? `0 0 12px ${cellColor}60` : "none",
                transform: `scale(${isFilled ? 1 : 0.85})`,
                transition: "all 0.1s",
              }}
            >
              {isFilled && (
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#fff",
                    opacity: 0.9,
                    boxShadow: `0 0 8px ${cellColor}`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 36,
          fontWeight: 700,
          color: COLORS.foreground,
          textAlign: "center",
          opacity: labelOpacity,
          letterSpacing: "-0.02em",
        }}
      >
        New models every week.
      </div>
    </AbsoluteFill>
  );
};
