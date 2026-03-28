import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const AgentsReason: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const containerSpring = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 100 } });
  const containerOpacity = interpolate(containerSpring, [0, 1], [0, 1]);

  // Gear rotation
  const gearRotation = frame * 2;
  const gearRotation2 = -frame * 3;

  // Thought bubbles appearing
  const bubbles = [
    { delay: 0, text: "analyze", x: -180, y: -120 },
    { delay: 6, text: "adapt", x: 160, y: -100 },
    { delay: 12, text: "execute", x: -140, y: 100 },
    { delay: 18, text: "learn", x: 150, y: 120 },
  ];

  // "reason" highlight pulse
  const reasonGlow = Math.sin(frame * 0.2) * 0.3 + 0.7;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          opacity: containerOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 60,
        }}
      >
        {/* Brain/neural network */}
        <div style={{ position: "relative", width: 360, height: 320 }}>
          {/* Central brain SVG */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* Simplified brain outline */}
              <ellipse cx="60" cy="55" rx="40" ry="35" fill={`rgba(180,0,255,0.12)`} stroke={COLORS.brand} strokeWidth="2" />
              <path d="M60 20 C45 20 35 30 35 42 C35 52 42 58 50 60 C42 62 35 68 35 78 C35 90 45 100 60 100 C75 100 85 90 85 78 C85 68 78 62 70 60 C78 58 85 52 85 42 C85 30 75 20 60 20Z" fill="none" stroke={COLORS.brand} strokeWidth="1.5" />
              {/* Neural connections */}
              <line x1="40" y1="45" x2="80" y2="45" stroke={COLORS.cyan} strokeWidth="1" opacity="0.5" />
              <line x1="40" y1="60" x2="80" y2="60" stroke={COLORS.cyan} strokeWidth="1" opacity="0.5" />
              <line x1="40" y1="75" x2="80" y2="75" stroke={COLORS.cyan} strokeWidth="1" opacity="0.5" />
              <circle cx="60" cy="60" r="6" fill={COLORS.brand} opacity="0.8" />
              <circle cx="45" cy="48" r="4" fill={COLORS.cyan} opacity="0.7" />
              <circle cx="75" cy="48" r="4" fill={COLORS.cyan} opacity="0.7" />
              <circle cx="45" cy="72" r="4" fill={COLORS.cyan} opacity="0.7" />
              <circle cx="75" cy="72" r="4" fill={COLORS.cyan} opacity="0.7" />
            </svg>
          </div>

          {/* Gear 1 */}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 20,
              transform: `rotate(${gearRotation}deg)`,
              opacity: 0.6,
            }}
          >
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <path d="M28 14 L32 8 L36 14 L42 12 L42 18 L48 22 L44 26 L48 30 L44 34 L48 38 L42 42 L42 48 L36 46 L32 52 L28 46 L24 52 L20 46 L14 48 L14 42 L8 38 L12 34 L8 30 L12 26 L8 22 L14 18 L14 12 L20 14 L24 8 Z" fill={`rgba(180,0,255,0.2)`} stroke={COLORS.brand} strokeWidth="1.5" />
              <circle cx="28" cy="28" r="8" fill={`rgba(180,0,255,0.3)`} stroke={COLORS.brand} strokeWidth="1.5" />
            </svg>
          </div>

          {/* Gear 2 */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 15,
              transform: `rotate(${gearRotation2}deg)`,
              opacity: 0.5,
            }}
          >
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <path d="M21 10 L24 6 L27 10 L31 9 L31 13 L35 16 L32 19 L35 22 L32 25 L35 28 L31 31 L31 35 L27 34 L24 38 L21 34 L18 38 L15 34 L11 35 L11 31 L7 28 L10 25 L7 22 L10 19 L7 16 L11 13 L11 9 L15 10 L18 6 Z" fill={`rgba(0,240,255,0.15)`} stroke={COLORS.cyan} strokeWidth="1.5" />
              <circle cx="21" cy="21" r="6" fill={`rgba(0,240,255,0.2)`} stroke={COLORS.cyan} strokeWidth="1.5" />
            </svg>
          </div>

          {/* Thought bubbles */}
          {bubbles.map((bubble, i) => {
            const bubbleSpring = spring({ frame: frame - bubble.delay, fps: FPS, config: { damping: 14, stiffness: 180 } });
            const bubbleOpacity = interpolate(bubbleSpring, [0, 0.4], [0, 1]);
            const bubbleScale = interpolate(bubbleSpring, [0, 1], [0.5, 1]);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(calc(-50% + ${bubble.x}px), calc(-50% + ${bubble.y}px)) scale(${bubbleScale})`,
                  opacity: bubbleOpacity,
                }}
              >
                <div
                  style={{
                    padding: "8px 16px",
                    backgroundColor: `rgba(0,240,255,0.1)`,
                    border: `1.5px solid rgba(0,240,255,0.35)`,
                    borderRadius: 100,
                  }}
                >
                  <span style={{ fontFamily: FONT_FAMILY_MONO, fontSize: 18, color: COLORS.cyan, letterSpacing: "0.04em" }}>
                    {bubble.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Text */}
        <div style={{ textAlign: "center" as const, maxWidth: 760 }}>
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 48,
              fontWeight: 700,
              color: COLORS.foreground,
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
            }}
          >
            AI agents don't follow scripts — they{" "}
            <span
              style={{
                color: COLORS.cyan,
                textShadow: `0 0 ${24 * reasonGlow}px rgba(0,240,255,${0.6 * reasonGlow})`,
              }}
            >
              reason.
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
