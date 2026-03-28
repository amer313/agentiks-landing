import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const ROWS = 5;
const COLS = 4;

function SpreadsheetGrid({ color, labelColor }: { color: string; labelColor: string }) {
  return (
    <div
      style={{
        border: `2px solid ${color}`,
        borderRadius: 8,
        overflow: "hidden",
        background: COLORS.surface,
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", background: color + "22" }}>
        {Array.from({ length: COLS }).map((_, c) => (
          <div
            key={c}
            style={{
              width: 80,
              height: 28,
              borderRight: c < COLS - 1 ? `1px solid ${color}44` : "none",
              borderBottom: `1px solid ${color}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 40, height: 8, borderRadius: 4, background: color + "55" }} />
          </div>
        ))}
      </div>
      {/* Data rows */}
      {Array.from({ length: ROWS }).map((_, r) => (
        <div key={r} style={{ display: "flex" }}>
          {Array.from({ length: COLS }).map((_, c) => (
            <div
              key={c}
              style={{
                width: 80,
                height: 24,
                borderRight: c < COLS - 1 ? `1px solid ${color}22` : "none",
                borderBottom: r < ROWS - 1 ? `1px solid ${color}22` : "none",
                display: "flex",
                alignItems: "center",
                paddingLeft: 6,
              }}
            >
              <div
                style={{
                  width: 30 + ((r * COLS + c) % 3) * 12,
                  height: 6,
                  borderRadius: 3,
                  background: labelColor + "44",
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export const SpreadsheetCopyPaste: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const cycle = (progress * 3) % 1;
  const arrowX = interpolate(cycle, [0, 0.5, 1], [-60, 60, -60]);
  const arrowOpacity = interpolate(cycle, [0, 0.1, 0.4, 0.6, 0.9, 1], [0, 1, 1, 1, 1, 0]);

  const leftScale = spring({ frame, fps: FPS, config: { damping: 16, stiffness: 80 }, from: 0.85, to: 1 });
  const rightScale = spring({ frame: Math.max(0, frame - 8), fps: FPS, config: { damping: 16, stiffness: 80 }, from: 0.85, to: 1 });

  const highlightProgress = interpolate(cycle, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
  const highlightRow = Math.floor(highlightProgress * ROWS);

  const labelOpacity = interpolate(progress, [0, 0.2], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 40,
        background: "transparent",
      }}
    >
      {/* Label */}
      <div style={{ opacity: labelOpacity }}>
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 32,
            fontWeight: 600,
            color: COLORS.amber,
            letterSpacing: "0.05em",
          }}
        >
          Copy → Paste → Repeat
        </span>
      </div>

      {/* Spreadsheets row */}
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        {/* Left spreadsheet */}
        <div style={{ transform: `scale(${leftScale})`, position: "relative" }}>
          {/* Highlight row */}
          <div
            style={{
              position: "absolute",
              left: 2,
              top: 28 + highlightRow * 24 + 2,
              width: "calc(100% - 4px)",
              height: 22,
              background: COLORS.amber + "44",
              pointerEvents: "none",
              zIndex: 1,
              transition: "top 0.1s",
            }}
          />
          <SpreadsheetGrid color={COLORS.amber} labelColor={COLORS.amber} />
        </div>

        {/* Arrows */}
        <div
          style={{
            opacity: arrowOpacity,
            transform: `translateX(${arrowX}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <svg width="80" height="32" viewBox="0 0 80 32">
            <path d="M4 16 H68 M56 6 L76 16 L56 26" stroke={COLORS.brand} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <svg width="80" height="32" viewBox="0 0 80 32" style={{ transform: "scaleX(-1)" }}>
            <path d="M4 16 H68 M56 6 L76 16 L56 26" stroke={COLORS.cyan} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        {/* Right spreadsheet */}
        <div style={{ transform: `scale(${rightScale})` }}>
          <SpreadsheetGrid color={COLORS.cyan} labelColor={COLORS.cyan} />
        </div>
      </div>

      {/* Tedium indicator */}
      <div style={{ opacity: labelOpacity, display: "flex", gap: 12 }}>
        {["Manual", "Repetitive", "Error-prone"].map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 18,
              fontWeight: 500,
              color: COLORS.red,
              padding: "4px 12px",
              border: `1px solid ${COLORS.red}55`,
              borderRadius: 999,
              background: COLORS.red + "11",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
