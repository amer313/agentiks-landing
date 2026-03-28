import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const WorkloadCounter: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  // Count from 0 up to 60
  const countValue = Math.round(interpolate(progress, [0, 0.85], [0, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  // Milestone pops at 40, 50, 60
  const milestone40 = countValue >= 40;
  const milestone50 = countValue >= 50;
  const milestone60 = countValue >= 60;

  const numberSpring = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 80 } });
  const numberOpacity = interpolate(numberSpring, [0, 0.5], [0, 1]);
  const numberScale = interpolate(numberSpring, [0, 1], [0.7, 1]);

  // Color based on count
  const color = countValue >= 50 ? COLORS.green : countValue >= 30 ? COLORS.cyan : COLORS.brand;

  // Arc progress for circular gauge
  const arcProgress = countValue / 60;
  const arcRadius = 190;
  const arcCircumference = 2 * Math.PI * arcRadius;
  const arcDash = arcProgress * arcCircumference * 0.75; // 3/4 circle
  const arcGap = arcCircumference - arcDash;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          opacity: numberOpacity,
          transform: `scale(${numberScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 48,
        }}
      >
        {/* Circular gauge */}
        <div style={{ position: "relative", width: 420, height: 420 }}>
          <svg width="420" height="420" viewBox="0 0 420 420">
            {/* Background track */}
            <circle
              cx="210"
              cy="210"
              r={arcRadius}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="16"
              strokeDasharray={`${arcCircumference * 0.75} ${arcCircumference * 0.25}`}
              strokeDashoffset={`${arcCircumference * 0.125}`}
              strokeLinecap="round"
              transform="rotate(135, 210, 210)"
            />
            {/* Animated arc */}
            <circle
              cx="210"
              cy="210"
              r={arcRadius}
              fill="none"
              stroke={color}
              strokeWidth="16"
              strokeDasharray={`${arcDash} ${arcCircumference - arcDash}`}
              strokeDashoffset={`${arcCircumference * 0.125}`}
              strokeLinecap="round"
              transform="rotate(135, 210, 210)"
              style={{ filter: `drop-shadow(0 0 12px ${color})` }}
            />

            {/* Milestone dots */}
            {[
              { pct: 40 / 60, label: "40%" },
              { pct: 50 / 60, label: "50%" },
              { pct: 60 / 60, label: "60%" },
            ].map(({ pct, label }, i) => {
              const angle = (135 + pct * 270) * (Math.PI / 180);
              const mx = 210 + Math.cos(angle) * arcRadius;
              const my = 210 + Math.sin(angle) * arcRadius;
              const isReached = arcProgress >= pct;
              return (
                <g key={i}>
                  <circle
                    cx={mx}
                    cy={my}
                    r="10"
                    fill={isReached ? color : "rgba(255,255,255,0.15)"}
                    style={isReached ? { filter: `drop-shadow(0 0 8px ${color})` } : {}}
                  />
                </g>
              );
            })}
          </svg>

          {/* Center content */}
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
            <span
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 120,
                fontWeight: 900,
                color,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                fontFeatureSettings: '"tnum" 1',
                textShadow: `0 0 60px ${color}50`,
              }}
            >
              {countValue}%
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 24,
                fontWeight: 500,
                color: COLORS.mutedForeground,
                marginTop: 8,
                textAlign: "center" as const,
              }}
            >
              workload handled
            </span>
          </div>
        </div>

        {/* Milestone badges */}
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "40%", reached: milestone40 },
            { label: "50%", reached: milestone50 },
            { label: "60%", reached: milestone60 },
          ].map(({ label, reached }, i) => {
            const badgeSpring = spring({
              frame: frame - i * 5,
              fps: FPS,
              config: { damping: 14, stiffness: 180 },
            });
            return (
              <div
                key={i}
                style={{
                  opacity: interpolate(badgeSpring, [0, 0.5], [0, 1]),
                  padding: "10px 20px",
                  backgroundColor: reached ? `rgba(16,185,129,0.12)` : `rgba(255,255,255,0.04)`,
                  border: `1.5px solid ${reached ? `rgba(16,185,129,0.4)` : `rgba(255,255,255,0.08)`}`,
                  borderRadius: 100,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY_MONO,
                    fontSize: 22,
                    fontWeight: 700,
                    color: reached ? COLORS.green : COLORS.mutedForeground,
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
