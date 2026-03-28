import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

// Center of the 200x200 viewBox
const CX = 100;
const CY = 100;

// Ray endpoints (from spec)
const RAYS = [
  { x: 55, y: 40, color: COLORS.cyan },
  { x: 155, y: 50, color: COLORS.magenta },
  { x: 100, y: 170, color: COLORS.brand },
];

export const LogoRevealSync: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const logoScale = spring({ frame, fps: FPS, config: { damping: 12, stiffness: 90 }, from: 0.4, to: 1 });
  const logoOpacity = interpolate(progress, [0, 0.1], [0, 1], { extrapolateRight: "clamp" });

  const textOpacity = interpolate(progress, [0.5, 0.75], [0, 1], { extrapolateRight: "clamp" });
  const textLetterSpacing = interpolate(progress, [0.5, 0.75], [20, 6], { extrapolateRight: "clamp" });

  const glowOpacity = interpolate(progress, [0.2, 0.6], [0, 1], { extrapolateRight: "clamp" });
  const glowScale = interpolate(progress, [0.2, 0.8], [0.5, 1.2], { extrapolateRight: "clamp" });

  // Center dot pulse
  const dotPulse = interpolate((frame / (FPS * 1.2)) % 1, [0, 0.5, 1], [1, 1.3, 1]);
  const dotOpacity = interpolate(progress, [0.15, 0.35], [0, 1], { extrapolateRight: "clamp" });

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
      {/* Logo SVG */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          position: "relative",
        }}
      >
        {/* Glow backdrop */}
        <div
          style={{
            position: "absolute",
            inset: -40,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.brand}22 0%, transparent 70%)`,
            opacity: glowOpacity,
            transform: `scale(${glowScale})`,
          }}
        />

        <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
          {RAYS.map((ray, i) => {
            const rayProgress = interpolate(progress, [i * 0.12, i * 0.12 + 0.35], [0, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            });

            // Interpolate from endpoint toward center
            const x1 = ray.x + (CX - ray.x) * (1 - rayProgress);
            const y1 = ray.y + (CY - ray.y) * (1 - rayProgress);

            return (
              <g key={i}>
                {/* Glow ray */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={CX}
                  y2={CY}
                  stroke={ray.color}
                  strokeWidth={6}
                  strokeLinecap="round"
                  opacity={0.25}
                />
                {/* Main ray */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={CX}
                  y2={CY}
                  stroke={ray.color}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                {/* Origin dot */}
                <circle
                  cx={ray.x}
                  cy={ray.y}
                  r={5}
                  fill={ray.color}
                  opacity={rayProgress}
                />
              </g>
            );
          })}

          {/* Center convergence dot */}
          <circle
            cx={CX}
            cy={CY}
            r={10 * dotPulse}
            fill="white"
            opacity={dotOpacity * 0.9}
          />
          <circle
            cx={CX}
            cy={CY}
            r={6}
            fill="white"
            opacity={dotOpacity}
          />
          {/* Center glow ring */}
          <circle
            cx={CX}
            cy={CY}
            r={18 * dotPulse}
            stroke="white"
            strokeWidth={1}
            fill="none"
            opacity={dotOpacity * 0.3}
          />
        </svg>
      </div>

      {/* "AGENTIKS" text */}
      <div style={{ opacity: textOpacity }}>
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 52,
            fontWeight: 800,
            color: COLORS.foreground,
            letterSpacing: `${textLetterSpacing}px`,
            textTransform: "uppercase",
          }}
        >
          AGENTIKS
        </span>
      </div>
    </AbsoluteFill>
  );
};
