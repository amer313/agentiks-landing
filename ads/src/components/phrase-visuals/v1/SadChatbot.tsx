import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const SadChatbot: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  // Bounce animation — lonely bob up and down
  const bounceCycle = (frame / (FPS * 1.6)) % 1;
  const bounceY = interpolate(bounceCycle, [0, 0.5, 1], [0, -18, 0]);
  const bounceSqueeze = interpolate(bounceCycle, [0, 0.5, 1], [1, 0.94, 1]);
  const squishX = interpolate(bounceCycle, [0, 0.5, 1], [1, 1.06, 1]);

  const scale = spring({ frame, fps: FPS, config: { damping: 14, stiffness: 80 }, from: 0.3, to: 1 });
  const opacity = interpolate(progress, [0, 0.15], [0, 1], { extrapolateRight: "clamp" });

  // Sad eyes blink
  const blinkCycle = (frame / (FPS * 3.5)) % 1;
  const eyeScaleY = interpolate(blinkCycle, [0, 0.85, 0.9, 0.95, 1], [1, 1, 0.1, 1, 1]);

  const labelOpacity = interpolate(progress, [0.3, 0.55], [0, 1], { extrapolateRight: "clamp" });
  const labelY = interpolate(progress, [0.3, 0.55], [20, 0], { extrapolateRight: "clamp" });

  // Speech bubble
  const bubbleOpacity = interpolate(progress, [0.5, 0.7], [0, 1], { extrapolateRight: "clamp" });
  const bubbleScale = spring({
    frame: Math.max(0, frame - Math.round(durationFrames * 0.5)),
    fps: FPS,
    config: { damping: 12, stiffness: 100 },
    from: 0.5,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 32,
        background: "transparent",
      }}
    >
      {/* Surrounding emptiness indicators */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* Lonely dots far around the chatbot */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 50 + 38 * Math.cos(rad);
          const y = 50 + 38 * Math.sin(rad);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: COLORS.surface2,
                border: `1px solid ${COLORS.mutedForeground}22`,
                opacity: interpolate(progress, [0.1, 0.3], [0, 0.3], { extrapolateRight: "clamp" }),
              }}
            />
          );
        })}
      </div>

      {/* Speech bubble */}
      <div
        style={{
          opacity: bubbleOpacity,
          transform: `scale(${bubbleScale})`,
          position: "relative",
          background: COLORS.surface2,
          border: `1.5px solid ${COLORS.mutedForeground}33`,
          borderRadius: 16,
          padding: "12px 20px",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 18,
            color: COLORS.mutedForeground,
          }}
        >
          Hi! How can I help you?
        </span>
        {/* Bubble tail */}
        <div
          style={{
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: `10px solid ${COLORS.surface2}`,
          }}
        />
      </div>

      {/* Chatbot widget */}
      <div
        style={{
          opacity,
          transform: `scale(${scale * squishX}) translateY(${bounceY}px) scaleY(${bounceSqueeze})`,
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            background: COLORS.surface,
            border: `2px solid ${COLORS.mutedForeground}44`,
            borderRadius: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
            position: "relative",
          }}
        >
          {/* Antenna */}
          <div
            style={{
              position: "absolute",
              top: -20,
              left: "50%",
              transform: "translateX(-50%)",
              width: 3,
              height: 20,
              background: COLORS.mutedForeground,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -28,
              left: "50%",
              transform: "translateX(-50%)",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: COLORS.mutedForeground,
            }}
          />

          {/* Eyes */}
          <div style={{ display: "flex", gap: 24 }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: COLORS.mutedForeground,
                  transform: `scaleY(${eyeScaleY})`,
                  position: "relative",
                }}
              />
            ))}
          </div>

          {/* Sad mouth */}
          <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
            <path d="M8 8 Q24 2 40 8" stroke={COLORS.mutedForeground} strokeWidth={2.5} strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>

      {/* "One chatbot" label */}
      <div
        style={{
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 30,
            fontWeight: 600,
            color: COLORS.mutedForeground,
            fontStyle: "italic",
          }}
        >
          one chatbot
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 20,
            fontWeight: 400,
            color: COLORS.mutedForeground + "88",
          }}
        >
          ...alone in the corner
        </span>
      </div>
    </AbsoluteFill>
  );
};
