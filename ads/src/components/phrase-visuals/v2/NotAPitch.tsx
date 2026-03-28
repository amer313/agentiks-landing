import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const NotAPitch: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const containerSpring = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 110 } });
  const containerOpacity = interpolate(containerSpring, [0, 0.5], [0, 1]);
  const containerScale = interpolate(containerSpring, [0, 1], [0.88, 1]);

  // "Pitch" word gets struck through, then "Reality" appears
  const strikeProgress = interpolate(progress, [0.2, 0.55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const realityOpacity = interpolate(progress, [0.45, 0.75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const realityY = interpolate(progress, [0.45, 0.75], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Proof points
  const PROOF_POINTS = [
    { label: "Clients see real ROI", icon: "✓" },
    { label: "Measurable results", icon: "✓" },
    { label: "Built at Agentiks", icon: "✓" },
  ];

  const pulseBrightness = Math.sin(frame * 0.1) * 0.15 + 0.85;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 56,
        }}
      >
        {/* Main statement */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            textAlign: "center" as const,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" as const, justifyContent: "center" }}>
            <span
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 64,
                fontWeight: 900,
                color: COLORS.foreground,
                letterSpacing: "-0.04em",
              }}
            >
              That's not a
            </span>
            {/* "Pitch" with strikethrough */}
            <div style={{ position: "relative", display: "inline-block" }}>
              <span
                style={{
                  fontFamily: FONT_FAMILY_SANS,
                  fontSize: 64,
                  fontWeight: 900,
                  color: COLORS.mutedForeground,
                  letterSpacing: "-0.04em",
                  opacity: 1 - strikeProgress * 0.5,
                }}
              >
                pitch
              </span>
              {/* Strikethrough */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  height: 5,
                  width: `${strikeProgress * 100}%`,
                  backgroundColor: COLORS.red,
                  borderRadius: 3,
                  marginTop: -2,
                }}
              />
            </div>
          </div>

          {/* "Reality" replacement */}
          <div
            style={{
              opacity: realityOpacity,
              transform: `translateY(${realityY}px)`,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 56,
                height: 3,
                backgroundColor: COLORS.brand,
                borderRadius: 2,
                boxShadow: `0 0 12px ${COLORS.brand}`,
              }}
            />
            <span
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 52,
                fontWeight: 900,
                color: COLORS.brand,
                letterSpacing: "-0.03em",
                textShadow: `0 0 60px rgba(180,0,255,${pulseBrightness * 0.5})`,
              }}
            >
              That's what we build.
            </span>
            <div
              style={{
                width: 56,
                height: 3,
                backgroundColor: COLORS.brand,
                borderRadius: 2,
                boxShadow: `0 0 12px ${COLORS.brand}`,
              }}
            />
          </div>
        </div>

        {/* Proof points */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 660 }}>
          {PROOF_POINTS.map((point, i) => {
            const delay = 8 + i * 6;
            const itemSpring = spring({ frame: frame - delay, fps: FPS, config: { damping: 16, stiffness: 140 } });
            const itemOpacity = interpolate(itemSpring, [0, 0.5], [0, 1]);
            const itemX = interpolate(itemSpring, [0, 1], [-20, 0]);
            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `translateX(${itemX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "16px 24px",
                  backgroundColor: COLORS.surface,
                  border: `1.5px solid rgba(180,0,255,0.15)`,
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: `rgba(16,185,129,0.15)`,
                    border: `2px solid ${COLORS.green}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 18, color: COLORS.green, fontWeight: 700 }}>
                    {point.icon}
                  </span>
                </div>
                <span style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 24, fontWeight: 600, color: COLORS.foreground }}>
                  {point.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
