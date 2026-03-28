import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const BrokenAutomation: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const containerSpring = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 100 } });
  const containerOpacity = interpolate(containerSpring, [0, 1], [0, 1]);
  const containerScale = interpolate(containerSpring, [0, 1], [0.9, 1]);

  // Spark flashes
  const spark1 = Math.random() < 0.08 ? 1 : Math.sin(frame * 0.7) * 0.3 + 0.3;
  const spark2 = Math.sin(frame * 1.1 + 2) * 0.4 + 0.4;

  // Shake effect on error
  const shakeX = Math.sin(frame * 3.5) * interpolate(progress, [0.3, 0.5], [0, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Red X overlay
  const xOpacity = interpolate(progress, [0.2, 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Strikethrough on text
  const strikethroughWidth = interpolate(progress, [0.5, 0.85], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          opacity: containerOpacity,
          transform: `scale(${containerScale}) translateX(${shakeX}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 56,
        }}
      >
        {/* Broken gear */}
        <div style={{ position: "relative", width: 200, height: 200 }}>
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            {/* Gear body with cracks */}
            <path
              d="M100 30 L115 15 L130 30 L148 25 L148 45 L165 55 L155 70 L165 85 L155 100 L165 115 L148 125 L148 145 L130 140 L115 155 L100 140 L85 155 L70 140 L52 145 L52 125 L35 115 L45 100 L35 85 L45 70 L35 55 L52 45 L52 25 L70 30 L85 15 Z"
              fill={`rgba(239,68,68,0.1)`}
              stroke={COLORS.red}
              strokeWidth="2.5"
            />
            <circle cx="100" cy="87" r="25" fill="rgba(5,5,8,1)" stroke={COLORS.red} strokeWidth="2" />

            {/* Crack lines */}
            <path d="M80 50 L95 70 L85 85" stroke={COLORS.red} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <path d="M120 45 L108 68" stroke={COLORS.red} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            <path d="M140 80 L122 90" stroke={COLORS.amber} strokeWidth="2" strokeLinecap="round" opacity="0.6" />

            {/* Sparks */}
            {[
              { x: 75, y: 42, delay: 0 },
              { x: 135, y: 38, delay: 5 },
              { x: 155, y: 90, delay: 10 },
            ].map((spark, i) => {
              const sparkOpacity = Math.sin((frame + i * 7) * 0.8) * 0.5 + 0.5;
              return (
                <g key={i} opacity={sparkOpacity}>
                  <line x1={spark.x} y1={spark.y} x2={spark.x + 6} y2={spark.y - 8} stroke={COLORS.amber} strokeWidth="2" strokeLinecap="round" />
                  <line x1={spark.x} y1={spark.y} x2={spark.x - 5} y2={spark.y - 6} stroke={COLORS.amber} strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx={spark.x} cy={spark.y} r="2.5" fill={COLORS.amber} />
                </g>
              );
            })}
          </svg>

          {/* Red X overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: xOpacity,
            }}
          >
            <svg width="160" height="160" viewBox="0 0 160 160">
              <line x1="20" y1="20" x2="140" y2="140" stroke={COLORS.red} strokeWidth="8" strokeLinecap="round" />
              <line x1="140" y1="20" x2="20" y2="140" stroke={COLORS.red} strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* "half-baked automation" with strikethrough */}
        <div style={{ position: "relative", textAlign: "center" as const }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 20, color: COLORS.mutedForeground, letterSpacing: "0.08em" }}>
              NOT THIS
            </span>
          </div>
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 48,
              fontWeight: 700,
              color: `rgba(239,68,68,0.8)`,
              letterSpacing: "-0.02em",
            }}
          >
            half-baked automation
          </span>
          {/* Strikethrough */}
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: 0,
              height: 5,
              backgroundColor: COLORS.red,
              borderRadius: 3,
              width: `${strikethroughWidth}%`,
              boxShadow: `0 0 16px ${COLORS.red}`,
            }}
          />
        </div>

        {/* "breaks every other week" */}
        <div
          style={{
            padding: "14px 28px",
            backgroundColor: `rgba(239,68,68,0.08)`,
            border: `1.5px solid rgba(239,68,68,0.2)`,
            borderRadius: 12,
            opacity: interpolate(progress, [0.4, 0.7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 22, color: COLORS.red, letterSpacing: "0.04em" }}>
            ERROR: breaks every other week
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
