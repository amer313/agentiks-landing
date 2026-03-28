import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { COLORS, mulberry32 } from "../../brand";
import { FONT_FAMILY_MONO, FONT_FAMILY_SANS } from "../../fonts";
import { AnimatedCounter } from "../typography/AnimatedCounter";

// Generate fake spreadsheet data deterministically
const rng = mulberry32(42);
const spreadsheetData = Array.from({ length: 8 }, () =>
  Array.from({ length: 5 }, () => Math.floor(rng() * 10000))
);

export const ProblemMontageScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Spreadsheet grid (frames 0-60)
  const spreadsheetOpacity = interpolate(
    frame,
    [0, 10, 50, 70],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Phase 2: Clock + inbox (frames 60-120)
  const clockPhaseOpacity = interpolate(
    frame,
    [50, 65, 110, 125],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Phase 3: Dollar counter (frames 120-180)
  const dollarPhaseOpacity = interpolate(
    frame,
    [110, 125, 170, 190],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Phase 4: Fade out (frames 180-210)
  const finalFade = interpolate(
    frame,
    [180, 210],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow />

      {/* Phase 1: Spreadsheet grid */}
      <AbsoluteFill style={{ opacity: spreadsheetOpacity * finalFade }}>
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            right: "10%",
          }}
        >
          {spreadsheetData.map((row, ri) => (
            <div
              key={ri}
              style={{
                display: "flex",
                gap: 2,
                marginBottom: 2,
              }}
            >
              {row.map((cell, ci) => {
                const cellFrame = ri * 5 + ci * 3;
                const cellOpacity = interpolate(
                  frame,
                  [cellFrame, cellFrame + 5],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                const isRed = rng() > 0.7;

                return (
                  <div
                    key={ci}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      backgroundColor: isRed
                        ? "rgba(239,68,68,0.15)"
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isRed ? "rgba(239,68,68,0.3)" : COLORS.line}`,
                      fontFamily: FONT_FAMILY_MONO,
                      fontSize: 14,
                      color: isRed ? COLORS.red : COLORS.mutedForeground,
                      opacity: cellOpacity,
                      textAlign: "right",
                    }}
                  >
                    {cell.toLocaleString()}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* Phase 2: Inbox counter */}
      <AbsoluteFill style={{ opacity: clockPhaseOpacity * finalFade }}>
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Clock icon (spinning) */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLORS.amber}
            strokeWidth="1.5"
            style={{
              transform: `rotate(${frame * 6}deg)`,
            }}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>

          {/* Inbox counter */}
          <div style={{ textAlign: "center" }}>
            <AnimatedCounter
              startValue={0}
              endValue={2847}
              durationFrames={50}
              startFrame={0}
              fontSize={64}
              color={COLORS.red}
            />
            <div
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 20,
                color: COLORS.mutedForeground,
                marginTop: 8,
              }}
            >
              unread messages
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Phase 3: Dollar waste counter */}
      <AbsoluteFill style={{ opacity: dollarPhaseOpacity * finalFade }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AnimatedCounter
            startValue={0}
            endValue={340}
            durationFrames={40}
            prefix="$"
            suffix="K"
            startFrame={0}
            fontSize={120}
            color={COLORS.red}
          />
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 28,
              color: COLORS.mutedForeground,
              marginTop: 16,
            }}
          >
            per year wasted
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
