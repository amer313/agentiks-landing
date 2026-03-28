import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const RevenueUpCostsDown: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const containerSpring = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 100 } });
  const containerOpacity = interpolate(containerSpring, [0, 0.5], [0, 1]);
  const containerScale = interpolate(containerSpring, [0, 1], [0.86, 1]);

  // Revenue bar grows up
  const revenueHeight = interpolate(progress, [0, 0.8], [0, 240], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Costs bar shrinks down
  const costsHeight = interpolate(progress, [0.1, 0.9], [200, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arrow springs
  const upArrowSpring = spring({ frame: frame - 8, fps: FPS, config: { damping: 14, stiffness: 130 } });
  const downArrowSpring = spring({ frame: frame - 12, fps: FPS, config: { damping: 14, stiffness: 130 } });

  const upArrowOpacity = interpolate(upArrowSpring, [0, 0.4], [0, 1]);
  const downArrowOpacity = interpolate(downArrowSpring, [0, 0.4], [0, 1]);

  // Revenue value
  const revenueValue = Math.round(interpolate(progress, [0, 0.8], [80, 142], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  // Costs value
  const costsValue = Math.round(interpolate(progress, [0.1, 0.9], [100, 38], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 52,
        }}
      >
        {/* Headline */}
        <div
          style={{
            display: "flex",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div
            style={{
              opacity: upArrowOpacity,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 40 L24 8 M10 22 L24 8 L38 22"
                stroke={COLORS.green}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: `drop-shadow(0 0 10px ${COLORS.green})` }}
              />
            </svg>
            <span
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 52,
                fontWeight: 900,
                color: COLORS.green,
                letterSpacing: "-0.03em",
                textShadow: `0 0 40px rgba(16,185,129,0.4)`,
              }}
            >
              Revenue
            </span>
          </div>

          <div
            style={{
              opacity: downArrowOpacity,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 8 L24 40 M10 26 L24 40 L38 26"
                stroke={COLORS.red}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: `drop-shadow(0 0 10px ${COLORS.red})` }}
              />
            </svg>
            <span
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 52,
                fontWeight: 900,
                color: COLORS.red,
                letterSpacing: "-0.03em",
                textShadow: `0 0 40px rgba(239,68,68,0.4)`,
              }}
            >
              Costs
            </span>
          </div>
        </div>

        {/* Bar chart */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 80,
            height: 280,
          }}
        >
          {/* Revenue bar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <span
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 28,
                fontWeight: 800,
                color: COLORS.green,
                letterSpacing: "-0.02em",
                fontFeatureSettings: '"tnum" 1',
              }}
            >
              +{revenueValue}%
            </span>
            <div
              style={{
                width: 120,
                height: revenueHeight,
                backgroundColor: COLORS.green,
                borderRadius: "8px 8px 0 0",
                boxShadow: `0 0 40px rgba(16,185,129,0.4), 0 0 80px rgba(16,185,129,0.15)`,
                transition: "height 0.05s",
              }}
            />
            <span
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 20,
                fontWeight: 600,
                color: COLORS.mutedForeground,
              }}
            >
              REVENUE
            </span>
          </div>

          {/* Costs bar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <span
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 28,
                fontWeight: 800,
                color: COLORS.red,
                letterSpacing: "-0.02em",
                fontFeatureSettings: '"tnum" 1',
              }}
            >
              -{costsValue}%
            </span>
            <div
              style={{
                width: 120,
                height: costsHeight,
                backgroundColor: COLORS.red,
                borderRadius: "8px 8px 0 0",
                boxShadow: `0 0 40px rgba(239,68,68,0.3), 0 0 60px rgba(239,68,68,0.1)`,
                transition: "height 0.05s",
              }}
            />
            <span
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 20,
                fontWeight: 600,
                color: COLORS.mutedForeground,
              }}
            >
              COSTS
            </span>
          </div>
        </div>

        {/* Baseline */}
        <div
          style={{
            width: 500,
            height: 2,
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: 2,
            marginTop: -16,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
