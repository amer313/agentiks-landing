import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { VALUE_PROPS, COLORS, FPS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

export const ValuePropsScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow showCyanGlow />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: "0 60px",
        }}
      >
        {VALUE_PROPS.map((prop, i) => {
          const cardStartFrame = i * 60;
          const slideIn = spring({
            frame: Math.max(0, frame - cardStartFrame),
            fps: FPS,
            config: { damping: 15, stiffness: 120 },
          });

          const slideX = interpolate(slideIn, [0, 1], [-200, 0]);
          const cardOpacity = slideIn;

          // Subtle glow cycling after all cards visible (frames 240+)
          const glowActive = frame >= 240;
          const glowPhase = glowActive
            ? ((frame - 240) / 60 + i * 0.25) % 1
            : 0;
          const glowIntensity = glowActive
            ? interpolate(
                glowPhase,
                [0, 0.3, 0.7, 1],
                [0, 1, 1, 0]
              )
            : 0;

          return (
            <div
              key={prop.title}
              style={{
                opacity: cardOpacity,
                transform: `translateX(${slideX}px)`,
                width: "100%",
                maxWidth: 700,
                padding: "20px 28px",
                backgroundColor: "rgba(10,11,16,0.6)",
                border: `1px dashed ${COLORS.line}`,
                borderRadius: 12,
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                boxShadow: glowIntensity > 0
                  ? `0 0 ${20 * glowIntensity}px ${prop.iconColor}20, inset 0 0 ${10 * glowIntensity}px ${prop.iconColor}08`
                  : "none",
              }}
            >
              {/* Icon placeholder (colored circle) */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: `${prop.iconColor}20`,
                  border: `1px solid ${prop.iconColor}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: prop.iconColor,
                    opacity: 0.6,
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY_SANS,
                    fontSize: 22,
                    fontWeight: 600,
                    color: COLORS.foreground,
                    marginBottom: 6,
                  }}
                >
                  {prop.title}
                </div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY_SANS,
                    fontSize: 15,
                    fontWeight: 400,
                    color: COLORS.mutedForeground,
                    lineHeight: 1.5,
                  }}
                >
                  {prop.desc}
                </div>
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
