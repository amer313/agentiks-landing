import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const BEFORE_ITEMS = [
  { label: "FIREFIGHTING", color: COLORS.red },
  { label: "PATCHING", color: COLORS.amber },
  { label: "REACTING", color: COLORS.red },
];

const AFTER_ITEMS = [
  { label: "SCALING", color: COLORS.green },
  { label: "GROWING", color: COLORS.cyan },
  { label: "LEADING", color: COLORS.brand },
];

export const StopFirefighting: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const containerSpring = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 100 } });
  const containerScale = interpolate(containerSpring, [0, 1], [0.88, 1]);
  const containerOpacity = interpolate(containerSpring, [0, 0.5], [0, 1]);

  // Arrow transition progress
  const arrowProgress = interpolate(progress, [0.3, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Strikethrough on "before" items
  const strikeProgress = interpolate(progress, [0.2, 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const arrowGlow = Math.sin(frame * 0.12) * 0.2 + 0.8;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 56,
          width: 820,
        }}
      >
        {/* Title */}
        <div style={{ textAlign: "center" as const }}>
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 44,
              fontWeight: 900,
              color: COLORS.foreground,
              letterSpacing: "-0.03em",
            }}
          >
            Stop firefighting.{" "}
            <span style={{ color: COLORS.green }}>Start scaling.</span>
          </span>
        </div>

        {/* Before → After transition */}
        <div style={{ display: "flex", alignItems: "center", gap: 40, width: "100%" }}>
          {/* BEFORE column */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            <span
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.red,
                letterSpacing: "0.1em",
                marginBottom: 4,
              }}
            >
              BEFORE
            </span>
            {BEFORE_ITEMS.map((item, i) => {
              const itemSpring = spring({ frame: frame - i * 5, fps: FPS, config: { damping: 16, stiffness: 150 } });
              const itemOpacity = interpolate(itemSpring, [0, 0.4], [0, 1]);
              const strikeWidth = interpolate(strikeProgress, [0, 1], [0, 100]);
              return (
                <div
                  key={i}
                  style={{
                    opacity: itemOpacity,
                    position: "relative",
                    padding: "18px 24px",
                    backgroundColor: `rgba(239,68,68,0.07)`,
                    border: `1.5px solid rgba(239,68,68,0.2)`,
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_FAMILY_MONO,
                      fontSize: 20,
                      fontWeight: 700,
                      color: item.color,
                      opacity: 0.6,
                    }}
                  >
                    {item.label}
                  </span>
                  {/* Strikethrough line */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 24,
                      height: 2.5,
                      width: `${strikeWidth}%`,
                      backgroundColor: COLORS.red,
                      opacity: 0.7,
                      borderRadius: 2,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Arrow */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              opacity: arrowProgress,
              transform: `scale(${0.7 + arrowProgress * 0.3})`,
            }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path
                d="M10 30 L42 30 M34 18 L50 30 L34 42"
                stroke={COLORS.green}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: `drop-shadow(0 0 8px rgba(16,185,129,${arrowGlow}))` }}
              />
            </svg>
          </div>

          {/* AFTER column */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            <span
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.green,
                letterSpacing: "0.1em",
                marginBottom: 4,
              }}
            >
              AFTER
            </span>
            {AFTER_ITEMS.map((item, i) => {
              const delay = 10 + i * 5;
              const itemSpring = spring({ frame: frame - delay, fps: FPS, config: { damping: 16, stiffness: 150 } });
              const itemOpacity = interpolate(itemSpring, [0, 0.5], [0, 1]);
              const itemX = interpolate(itemSpring, [0, 1], [20, 0]);
              return (
                <div
                  key={i}
                  style={{
                    opacity: itemOpacity,
                    transform: `translateX(${itemX}px)`,
                    padding: "18px 24px",
                    backgroundColor: `rgba(16,185,129,0.08)`,
                    border: `1.5px solid rgba(16,185,129,0.25)`,
                    borderRadius: 12,
                    boxShadow: `0 0 20px rgba(16,185,129,0.05)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_FAMILY_MONO,
                      fontSize: 20,
                      fontWeight: 700,
                      color: item.color,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
