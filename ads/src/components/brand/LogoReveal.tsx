import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { FPS, LOGO_PATH, COLORS, mulberry32 } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

interface LogoRevealProps {
  startFrame: number;
  durationFrames: number;
  width?: number;
  height?: number;
}

// Generate particle start positions deterministically
function generateParticles(count: number) {
  const rng = mulberry32(123);
  return Array.from({ length: count }, () => ({
    startX: (rng() - 0.5) * 800,
    startY: (rng() - 0.5) * 800,
    targetX: rng() * 120, // within logo bounds (0-120 wide)
    targetY: rng() * 150, // within logo bounds (0-150 tall)
    size: 1 + rng() * 2,
    delay: rng() * 0.3,
  }));
}

const particles = generateParticles(200);

export const LogoReveal: React.FC<LogoRevealProps> = ({
  startFrame,
  durationFrames,
  width = 1080,
  height = 1920,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const convergeDuration = Math.floor(durationFrames * 0.6);

  // Logo solidification after convergence
  const solidOpacity = spring({
    frame: Math.max(0, relativeFrame - convergeDuration),
    fps: FPS,
    config: { damping: 20, stiffness: 100 },
  });

  // Text fade in after logo
  const textOpacity = interpolate(
    relativeFrame,
    [convergeDuration + 10, convergeDuration + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const logoScale = 1.2;
  const logoOffsetX = width / 2 - 60 * logoScale;
  const logoOffsetY = height / 2 - 100 * logoScale;

  return (
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
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <filter id="logoGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Particles converging */}
        {particles.map((p, i) => {
          const particleDelay = p.delay * convergeDuration;
          const particleProgress = interpolate(
            relativeFrame - particleDelay,
            [0, convergeDuration - particleDelay],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const easedProgress = Math.pow(particleProgress, 2);
          const px = interpolate(
            easedProgress,
            [0, 1],
            [p.startX + width / 2, logoOffsetX + p.targetX * logoScale]
          );
          const py = interpolate(
            easedProgress,
            [0, 1],
            [p.startY + height / 2, logoOffsetY + p.targetY * logoScale]
          );

          const particleOpacity = interpolate(
            particleProgress,
            [0, 0.1, 0.8, 1],
            [0, 0.8, 0.8, solidOpacity > 0.5 ? 0 : 0.6],
            { extrapolateRight: "clamp" }
          );

          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r={p.size}
              fill={COLORS.brand}
              opacity={particleOpacity}
            />
          );
        })}

        {/* Solid logo (appears after convergence) */}
        <g
          transform={`translate(${logoOffsetX}, ${logoOffsetY}) scale(${logoScale})`}
          opacity={solidOpacity}
          filter="url(#logoGlow)"
        >
          <path d={LOGO_PATH} fill={COLORS.brand} />
        </g>
      </svg>

      {/* AGENTIKS text */}
      <div
        style={{
          position: "absolute",
          top: height / 2 + 100,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 48,
            fontWeight: 600,
            color: COLORS.foreground,
            letterSpacing: "0.3em",
          }}
        >
          AGENTIKS
        </div>
      </div>
    </div>
  );
};
