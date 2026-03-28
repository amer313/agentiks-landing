import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const HOURS_SAVED_PER_WEEK = 28;

export const TimeSaved: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const containerSpring = spring({ frame, fps: FPS, config: { damping: 14, stiffness: 100 } });
  const containerOpacity = interpolate(containerSpring, [0, 0.5], [0, 1]);
  const containerScale = interpolate(containerSpring, [0, 1], [0.8, 1]);

  const hoursCount = Math.round(
    interpolate(progress, [0, 0.75], [0, HOURS_SAVED_PER_WEEK], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Clock hand animation
  const clockAngle = interpolate(progress, [0, 1], [0, 360]);

  const tagSpring = spring({ frame: Math.max(0, frame - 18), fps: FPS, config: { damping: 12, stiffness: 160 } });
  const tagOpacity = interpolate(tagSpring, [0, 0.5], [0, 1]);
  const tagScale = interpolate(tagSpring, [0, 1], [0.6, 1]);

  const glowPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.6, 1.0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 44,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.cyan}20 0%, transparent 70%)`,
          filter: "blur(60px)",
          opacity: glowPulse * containerSpring,
        }}
      />

      {/* Clock icon */}
      <div
        style={{
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          position: "relative",
          zIndex: 1,
        }}
      >
        <svg width="180" height="180" viewBox="0 0 180 180">
          {/* Outer ring */}
          <circle
            cx="90"
            cy="90"
            r="80"
            fill={`${COLORS.cyan}10`}
            stroke={COLORS.cyan}
            strokeWidth="3"
            style={{ filter: `drop-shadow(0 0 16px ${COLORS.cyan}60)` }}
          />
          {/* Hour markers */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 90 + 68 * Math.cos(rad);
            const y1 = 90 + 68 * Math.sin(rad);
            const x2 = 90 + 76 * Math.cos(rad);
            const y2 = 90 + 76 * Math.sin(rad);
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`${COLORS.cyan}60`} strokeWidth={deg % 90 === 0 ? 3 : 1.5} />;
          })}
          {/* Minute hand */}
          <line
            x1="90"
            y1="90"
            x2={90 + 60 * Math.cos(((clockAngle - 90) * Math.PI) / 180)}
            y2={90 + 60 * Math.sin(((clockAngle - 90) * Math.PI) / 180)}
            stroke={COLORS.cyan}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${COLORS.cyan})` }}
          />
          {/* Hour hand */}
          <line
            x1="90"
            y1="90"
            x2={90 + 40 * Math.cos(((clockAngle / 12 - 90) * Math.PI) / 180)}
            y2={90 + 40 * Math.sin(((clockAngle / 12 - 90) * Math.PI) / 180)}
            stroke={COLORS.foreground}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Center dot */}
          <circle cx="90" cy="90" r="6" fill={COLORS.cyan} />
        </svg>
      </div>

      {/* Counter */}
      <div
        style={{
          opacity: containerOpacity,
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 140,
            fontWeight: 900,
            color: COLORS.cyan,
            lineHeight: 1,
            letterSpacing: "-5px",
            textShadow: `0 0 50px ${COLORS.cyan}80`,
          }}
        >
          {hoursCount}
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.cyan,
            opacity: 0.75,
          }}
        >
          hrs
        </span>
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 28,
          fontWeight: 500,
          color: COLORS.mutedForeground,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: interpolate(progress, [0.2, 0.45], [0, 1], { extrapolateRight: "clamp" }),
          position: "relative",
          zIndex: 1,
        }}
      >
        given back per week
      </div>

      {/* "Back to what matters" tag */}
      <div
        style={{
          opacity: tagOpacity,
          transform: `scale(${tagScale})`,
          padding: "12px 32px",
          background: `${COLORS.cyan}15`,
          border: `2px solid ${COLORS.cyan}40`,
          borderRadius: 100,
          boxShadow: `0 0 28px ${COLORS.cyan}25`,
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 24,
            fontWeight: 700,
            color: COLORS.cyan,
            letterSpacing: "0.02em",
          }}
        >
          Back to what matters
        </span>
      </div>
    </AbsoluteFill>
  );
};
