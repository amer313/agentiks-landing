import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const TwentyFourSeven: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  // Clock spinning fast
  const clockAngle = frame * 12; // spins fast
  const secondHandAngle = frame * 18;

  const labelSpring = spring({ frame, fps: FPS, config: { damping: 14, stiffness: 150, mass: 0.8 } });
  const labelScale = interpolate(labelSpring, [0, 1], [0.5, 1]);
  const labelOpacity = interpolate(labelSpring, [0, 0.4], [0, 1]);

  // Pulse effect
  const pulse = Math.sin(frame * 0.15) * 0.12 + 0.88;
  const pulseGlow = Math.sin(frame * 0.15) * 30 + 50;

  // Orbit dots
  const orbitDots = Array.from({ length: 8 }, (_, i) => {
    const angle = ((i / 8) * Math.PI * 2) + (frame * 0.03);
    return { x: Math.cos(angle) * 200, y: Math.sin(angle) * 200 };
  });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 52 }}>

        {/* Clock */}
        <div style={{ position: "relative", width: 320, height: 320 }}>
          {/* Orbit dots */}
          {orbitDots.map((dot, i) => {
            const dotOpacity = interpolate(frame, [i * 2, i * 2 + 6], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: COLORS.brand,
                  transform: `translate(calc(-50% + ${dot.x}px), calc(-50% + ${dot.y}px))`,
                  opacity: dotOpacity,
                  boxShadow: `0 0 8px ${COLORS.brand}`,
                }}
              />
            );
          })}

          {/* Clock face */}
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {/* Outer glow ring */}
            <circle cx="160" cy="160" r="148" fill="none" stroke={COLORS.brand} strokeWidth="2" opacity="0.25" />
            <circle cx="160" cy="160" r="130" fill="rgba(180,0,255,0.06)" stroke={COLORS.brand} strokeWidth="2" opacity="0.5" />
            <circle cx="160" cy="160" r="125" fill="rgba(5,5,8,0.95)" />

            {/* Hour marks */}
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
              const x1 = 160 + Math.cos(a) * 110;
              const y1 = 160 + Math.sin(a) * 110;
              const x2 = 160 + Math.cos(a) * 118;
              const y2 = 160 + Math.sin(a) * 118;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS.mutedForeground} strokeWidth="2" />;
            })}

            {/* Minute hand (spinning) */}
            <line
              x1="160"
              y1="160"
              x2={160 + Math.cos((clockAngle * Math.PI / 180) - Math.PI / 2) * 85}
              y2={160 + Math.sin((clockAngle * Math.PI / 180) - Math.PI / 2) * 85}
              stroke={COLORS.brand}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Second hand (spinning faster) */}
            <line
              x1="160"
              y1="160"
              x2={160 + Math.cos((secondHandAngle * Math.PI / 180) - Math.PI / 2) * 100}
              y2={160 + Math.sin((secondHandAngle * Math.PI / 180) - Math.PI / 2) * 100}
              stroke={COLORS.cyan}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Hour hand */}
            <line
              x1="160"
              y1="160"
              x2={160 + Math.cos((clockAngle * 0.08 * Math.PI / 180) - Math.PI / 2) * 65}
              y2={160 + Math.sin((clockAngle * 0.08 * Math.PI / 180) - Math.PI / 2) * 65}
              stroke={COLORS.foreground}
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Center dot */}
            <circle cx="160" cy="160" r="6" fill={COLORS.brand} />
          </svg>
        </div>

        {/* 24/7 text */}
        <div
          style={{
            opacity: labelOpacity,
            transform: `scale(${labelScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 120,
              fontWeight: 900,
              color: COLORS.foreground,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              transform: `scale(${pulse})`,
              display: "block",
              textShadow: `0 0 ${pulseGlow}px rgba(180,0,255,0.4)`,
            }}
          >
            24/7
          </span>
          <span
            style={{
              fontFamily: FONT_FAMILY_MONO,
              fontSize: 24,
              letterSpacing: "0.2em",
              color: COLORS.mutedForeground,
              textTransform: "uppercase" as const,
            }}
          >
            non-stop
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
