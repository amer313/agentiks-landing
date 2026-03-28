import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const FreeStrategyCall: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const containerSpring = spring({ frame, fps: FPS, config: { damping: 16, stiffness: 90 } });
  const containerOpacity = interpolate(containerSpring, [0, 0.5], [0, 1]);
  const containerScale = interpolate(containerSpring, [0, 1], [0.85, 1]);

  // Phone icon ring animation
  const ringScale = 1 + Math.sin(frame * 0.14) * 0.06;
  const ringOpacity = 0.4 + Math.sin(frame * 0.14) * 0.15;

  // Badge pop-in
  const freeBadgeSpring = spring({ frame: frame - 6, fps: FPS, config: { damping: 12, stiffness: 200 } });
  const freeBadgeScale = interpolate(freeBadgeSpring, [0, 1], [0.5, 1]);
  const freeBadgeOpacity = interpolate(freeBadgeSpring, [0, 0.4], [0, 1]);

  const CALL_ITEMS = [
    { label: "No commitment required", color: COLORS.green },
    { label: "ROI mapped upfront", color: COLORS.cyan },
    { label: "Expert strategy session", color: COLORS.brand },
  ];

  const glowIntensity = Math.sin(frame * 0.09) * 0.2 + 0.6;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 48,
        }}
      >
        {/* Phone icon with rings */}
        <div style={{ position: "relative", width: 200, height: 200 }}>
          {/* Ripple rings */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 80 + i * 44,
                height: 80 + i * 44,
                borderRadius: "50%",
                border: `2px solid rgba(180,0,255,${ringOpacity / i})`,
                transform: `translate(-50%, -50%) scale(${ringScale})`,
              }}
            />
          ))}

          {/* Phone circle */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: `rgba(180,0,255,0.15)`,
              border: `3px solid ${COLORS.brand}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 40px rgba(180,0,255,${glowIntensity * 0.5})`,
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M10 8 C10 6.9 10.9 6 12 6 L18 6 C18.7 6 19.4 6.4 19.7 7.1 L22.7 14.1 C23.1 14.9 22.8 15.9 22.1 16.4 L18.7 18.8 C20.5 22.5 23.5 25.5 27.2 27.3 L29.6 23.9 C30.1 23.2 31.1 22.9 31.9 23.3 L38.9 26.3 C39.6 26.6 40 27.3 40 28 L40 34 C40 35.1 39.1 36 38 36 L36 36 C21.6 36 10 24.4 10 10 L10 8Z"
                fill={COLORS.brand}
                style={{ filter: `drop-shadow(0 0 6px ${COLORS.brand})` }}
              />
            </svg>
          </div>
        </div>

        {/* CTA text */}
        <div style={{ textAlign: "center" as const, display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          {/* FREE badge */}
          <div
            style={{
              opacity: freeBadgeOpacity,
              transform: `scale(${freeBadgeScale})`,
              padding: "8px 28px",
              backgroundColor: `rgba(16,185,129,0.12)`,
              border: `2px solid ${COLORS.green}`,
              borderRadius: 100,
              boxShadow: `0 0 20px rgba(16,185,129,0.2)`,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 22,
                fontWeight: 800,
                color: COLORS.green,
                letterSpacing: "0.12em",
              }}
            >
              FREE
            </span>
          </div>

          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 56,
              fontWeight: 900,
              color: COLORS.foreground,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            Strategy Call
          </span>
        </div>

        {/* Feature list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 680 }}>
          {CALL_ITEMS.map((item, i) => {
            const delay = 10 + i * 6;
            const itemSpring = spring({ frame: frame - delay, fps: FPS, config: { damping: 16, stiffness: 140 } });
            const itemOpacity = interpolate(itemSpring, [0, 0.5], [0, 1]);
            const itemY = interpolate(itemSpring, [0, 1], [16, 0]);
            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `translateY(${itemY}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "16px 24px",
                  backgroundColor: COLORS.surface,
                  border: `1.5px solid rgba(255,255,255,0.07)`,
                  borderRadius: 12,
                  borderLeft: `3px solid ${item.color}`,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    boxShadow: `0 0 8px ${item.color}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: FONT_FAMILY_SANS,
                    fontSize: 24,
                    fontWeight: 600,
                    color: COLORS.foreground,
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
