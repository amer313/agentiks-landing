import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const CostOfBusiness: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  // Phase 1: "cost of doing business" with strikethrough
  const phase1Opacity = interpolate(progress, [0, 0.15, 0.5, 0.65], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const strikethroughWidth = interpolate(progress, [0.2, 0.5], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Phase 2: "Not anymore." bold appear
  const phase2Spring = spring({
    frame: Math.max(0, frame - Math.floor(durationFrames * 0.55)),
    fps: FPS,
    config: { damping: 12, stiffness: 200, mass: 0.8 },
  });
  const phase2Scale = interpolate(phase2Spring, [0, 1], [0.6, 1]);
  const phase2Opacity = interpolate(phase2Spring, [0, 0.3], [0, 1]);

  // Dollar signs
  const dollarCount = 6;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 60 }}>

        {/* Dollar signs row */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {Array.from({ length: dollarCount }).map((_, i) => {
            const dollarOpacity = interpolate(frame, [i * 3, i * 3 + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const crossOpacity = interpolate(progress, [0.2 + i * 0.05, 0.35 + i * 0.05], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ position: "relative", opacity: dollarOpacity }}>
                <span
                  style={{
                    fontFamily: FONT_FAMILY_MONO,
                    fontSize: 64,
                    fontWeight: 800,
                    color: COLORS.amber,
                    opacity: 1 - crossOpacity * 0.5,
                    display: "block",
                  }}
                >
                  $
                </span>
                {/* X overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: crossOpacity,
                  }}
                >
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    <line x1="8" y1="8" x2="48" y2="48" stroke={COLORS.red} strokeWidth="5" strokeLinecap="round" />
                    <line x1="48" y1="8" x2="8" y2="48" stroke={COLORS.red} strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* "cost of doing business" with strikethrough */}
        <div style={{ opacity: phase1Opacity, position: "relative", textAlign: "center" as const }}>
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 52,
              fontWeight: 600,
              color: COLORS.mutedForeground,
              letterSpacing: "-0.02em",
            }}
          >
            cost of doing business
          </span>
          {/* Animated strikethrough line */}
          <div
            style={{
              position: "absolute",
              top: "52%",
              left: 0,
              height: 5,
              backgroundColor: COLORS.red,
              borderRadius: 3,
              width: `${strikethroughWidth}%`,
              boxShadow: `0 0 12px ${COLORS.red}`,
            }}
          />
        </div>

        {/* "Not anymore." */}
        <div
          style={{
            opacity: phase2Opacity,
            transform: `scale(${phase2Scale})`,
            textAlign: "center" as const,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 80,
              fontWeight: 900,
              color: COLORS.foreground,
              letterSpacing: "-0.03em",
              display: "block",
            }}
          >
            Not anymore.
          </span>
          <div
            style={{
              marginTop: 8,
              height: 4,
              width: 220,
              margin: "8px auto 0",
              background: `linear-gradient(90deg, ${COLORS.brand}, ${COLORS.cyan})`,
              borderRadius: 4,
              boxShadow: `0 0 20px rgba(180,0,255,0.5)`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
