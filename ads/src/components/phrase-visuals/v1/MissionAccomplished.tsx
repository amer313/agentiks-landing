import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const NUM_FRAGMENTS = 16;

export const MissionAccomplished: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const CRACK_START = 0.5;

  const bannerScale = spring({
    frame,
    fps: FPS,
    config: { damping: 10, stiffness: 120 },
    from: 0,
    to: 1,
  });
  const bannerOpacity = interpolate(progress, [0, 0.1], [0, 1], { extrapolateRight: "clamp" });
  const bannerOpacityOut = interpolate(progress, [CRACK_START + 0.05, CRACK_START + 0.25], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const crackProgress = interpolate(progress, [CRACK_START, 1.0], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Crack line visibility
  const crackOpacity = interpolate(progress, [CRACK_START, CRACK_START + 0.05], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Fragment seeds (deterministic)
  const fragments = Array.from({ length: NUM_FRAGMENTS }, (_, i) => {
    const angle = (i / NUM_FRAGMENTS) * Math.PI * 2 + (i % 3) * 0.5;
    const dist = 180 + (i % 5) * 60;
    const rotSpeed = (i % 2 === 0 ? 1 : -1) * (80 + (i % 4) * 40);
    const sx = Math.cos(angle) * dist;
    const sy = Math.sin(angle) * dist + crackProgress * 120; // gravity
    return { angle, dist, rotSpeed, sx, sy, i };
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "transparent",
      }}
    >
      {/* Banner — shown before crack */}
      <div
        style={{
          position: "absolute",
          opacity: bannerOpacity * bannerOpacityOut,
          transform: `scale(${bannerScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Ribbon top */}
        <div
          style={{
            width: 580,
            background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.cyan} 100%)`,
            padding: "20px 48px",
            borderRadius: 8,
            textAlign: "center",
            boxShadow: `0 0 40px ${COLORS.green}66`,
            position: "relative",
          }}
        >
          {/* Crack overlay — SVG on top */}
          <svg
            style={{ position: "absolute", inset: 0, opacity: crackOpacity }}
            width="100%"
            height="100%"
            viewBox="0 0 580 80"
            preserveAspectRatio="none"
          >
            <path
              d="M290 0 L280 25 L310 35 L270 55 L300 80"
              stroke="rgba(0,0,0,0.7)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M290 0 L305 20 L280 38 L315 60 L290 80"
              stroke="rgba(0,0,0,0.4)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 64,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-2px",
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            Done!
          </span>
        </div>
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 22,
            fontWeight: 500,
            color: COLORS.mutedForeground,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          mission accomplished
        </span>
      </div>

      {/* Fragments */}
      {crackProgress > 0.05 &&
        fragments.map(({ sx, sy, rotSpeed, i }) => {
          const fragmentOpacity = interpolate(crackProgress, [0.05, 0.2, 0.8, 1.0], [0, 1, 0.6, 0]);
          const tx = sx * crackProgress;
          const ty = sy * crackProgress;
          const rot = rotSpeed * crackProgress;

          const w = 40 + (i % 5) * 20;
          const h = 16 + (i % 3) * 10;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                opacity: fragmentOpacity,
                transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
                width: w,
                height: h,
                background: `linear-gradient(135deg, ${COLORS.green}cc, ${COLORS.cyan}cc)`,
                borderRadius: 4,
              }}
            />
          );
        })}
    </AbsoluteFill>
  );
};
