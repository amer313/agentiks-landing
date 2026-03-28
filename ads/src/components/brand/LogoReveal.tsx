import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { FPS, COLORS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

interface LogoRevealProps {
  startFrame: number;
  durationFrames: number;
  width?: number;
  height?: number;
}

// The three-ray logo endpoints (in 200x200 viewBox space)
const CENTER = { x: 100, y: 100 };
const ENDPOINTS = [
  { x: 55,  y: 40,  color: COLORS.logoCyan },  // Ray 1 — Logo Cyan
  { x: 155, y: 50,  color: COLORS.magenta },    // Ray 2 — Magenta
  { x: 100, y: 170, color: COLORS.purple },     // Ray 3 — Purple
];

// Back-depth ghost edges between endpoints
const DEPTH_EDGES = [
  [0, 1], [1, 2], [2, 0],
] as const;

export const LogoReveal: React.FC<LogoRevealProps> = ({
  startFrame,
  durationFrames,
  width = 1080,
  height = 1920,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  // Phase 1: rays draw in from endpoints toward center (0 → 60% of duration)
  const rayDrawDuration = Math.floor(durationFrames * 0.6);
  // Phase 2: dots appear (50–70%)
  const dotStartFrame = Math.floor(durationFrames * 0.5);
  const dotEndFrame   = Math.floor(durationFrames * 0.7);
  // Phase 3: center ring pulses in (60–80%)
  const ringStartFrame = Math.floor(durationFrames * 0.6);
  // Phase 4: text fades in (75–100%)
  const textStartFrame = Math.floor(durationFrames * 0.75);

  // Stagger each ray slightly
  const rayDelays = [0, 0.1, 0.2]; // fraction of rayDrawDuration

  const logoSize = 200;
  const logoScale = 3.2; // scale up for video frame
  const logoW = logoSize * logoScale;
  const logoH = logoSize * logoScale;
  const logoX = (width - logoW) / 2;
  const logoY = height / 2 - logoH / 2 - 80;

  // Center ring spring
  const ringSpring = spring({
    frame: Math.max(0, relativeFrame - ringStartFrame),
    fps: FPS,
    config: { damping: 14, stiffness: 120 },
  });

  // Text fade
  const textOpacity = interpolate(
    relativeFrame,
    [textStartFrame, textStartFrame + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Overall logo opacity (ghost depth edges fade in first)
  const depthOpacity = interpolate(
    relativeFrame,
    [0, 15],
    [0, 0.18],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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
          <filter id="logoRayGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="logoDotGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Render in logo's own coordinate space */}
        <g transform={`translate(${logoX}, ${logoY}) scale(${logoScale})`}>

          {/* Back depth edges */}
          {DEPTH_EDGES.map(([a, b], i) => {
            const ep1 = ENDPOINTS[a];
            const ep2 = ENDPOINTS[b];
            return (
              <line
                key={i}
                x1={ep1.x} y1={ep1.y}
                x2={ep2.x} y2={ep2.y}
                stroke="#FFFFFF"
                strokeWidth={1}
                opacity={depthOpacity}
              />
            );
          })}
          {/* Back center dot */}
          <circle
            cx={130} cy={85} r={3}
            fill="#FFFFFF"
            opacity={depthOpacity}
          />

          {/* Front rays — each draws from endpoint toward center */}
          {ENDPOINTS.map((ep, i) => {
            const rayDelay = rayDelays[i] * rayDrawDuration;
            const progress = interpolate(
              relativeFrame - rayDelay,
              [0, rayDrawDuration * (1 - rayDelays[i])],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            // Interpolate from endpoint toward center
            const x2 = ep.x + (CENTER.x - ep.x) * progress;
            const y2 = ep.y + (CENTER.y - ep.y) * progress;
            const rayOpacity = interpolate(progress, [0, 0.05], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <line
                key={i}
                x1={ep.x} y1={ep.y}
                x2={x2}   y2={y2}
                stroke={ep.color}
                strokeWidth={3}
                strokeLinecap="round"
                opacity={rayOpacity}
                filter="url(#logoRayGlow)"
              />
            );
          })}

          {/* Endpoint dots — appear after rays */}
          {ENDPOINTS.map((ep, i) => {
            const dotOpacity = interpolate(
              relativeFrame,
              [dotStartFrame + i * 6, dotEndFrame + i * 6],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <circle
                key={i}
                cx={ep.x} cy={ep.y} r={5}
                fill={ep.color}
                opacity={dotOpacity}
                filter="url(#logoDotGlow)"
              />
            );
          })}

          {/* Center ring + inner dot */}
          <circle
            cx={CENTER.x} cy={CENTER.y}
            r={10 * ringSpring}
            fill="#07080D"
            stroke="#FFFFFF"
            strokeWidth={2}
            opacity={ringSpring}
          />
          <circle
            cx={CENTER.x} cy={CENTER.y}
            r={4 * ringSpring}
            fill="#FFFFFF"
            opacity={ringSpring}
          />
        </g>
      </svg>

      {/* AGENTIKS text */}
      <div
        style={{
          position: "absolute",
          top: logoY + logoH + 40,
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
