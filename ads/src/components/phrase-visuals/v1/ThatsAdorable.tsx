import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const ThatsAdorable: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  // Heavy slam-in spring for the main text
  const slamScale = spring({
    frame,
    fps: FPS,
    config: { damping: 6, stiffness: 200, mass: 1.2 },
    from: 3,
    to: 1,
  });

  const slamRotate = spring({
    frame,
    fps: FPS,
    config: { damping: 8, stiffness: 180 },
    from: -8,
    to: 0,
  });

  const slamOpacity = interpolate(progress, [0, 0.08], [0, 1], { extrapolateRight: "clamp" });

  // Shockwave ring on slam
  const shockwave = interpolate(progress, [0, 0.2], [0, 1], { extrapolateRight: "clamp" });
  const shockOpacity = interpolate(progress, [0, 0.06, 0.25], [0, 0.6, 0], { extrapolateRight: "clamp" });

  // "That's..." separator — slightly offset timing
  const thatOpacity = interpolate(progress, [0, 0.1], [0, 1], { extrapolateRight: "clamp" });

  // "adorable." scale wobble on ellipsis
  const adorableWobble = spring({
    frame: Math.max(0, frame - 4),
    fps: FPS,
    config: { damping: 5, stiffness: 160 },
    from: 0,
    to: 1,
  });

  // Sarcasm emoji pulse
  const emojiPulse = interpolate(
    (frame / (FPS * 1.5)) % 1,
    [0, 0.5, 1],
    [1, 1.15, 1]
  );
  const emojiOpacity = interpolate(progress, [0.3, 0.5], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 24,
        background: "transparent",
      }}
    >
      {/* Shockwave */}
      <div
        style={{
          position: "absolute",
          width: `${shockwave * 900}px`,
          height: `${shockwave * 900}px`,
          borderRadius: "50%",
          border: `3px solid ${COLORS.brand}`,
          opacity: shockOpacity,
          pointerEvents: "none",
        }}
      />

      {/* "That's..." */}
      <div style={{ opacity: thatOpacity }}>
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.mutedForeground,
            letterSpacing: "-0.02em",
          }}
        >
          That's...
        </span>
      </div>

      {/* "adorable." — the slam */}
      <div
        style={{
          opacity: slamOpacity,
          transform: `scale(${slamScale}) rotate(${slamRotate}deg)`,
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 112,
            fontWeight: 900,
            color: COLORS.foreground,
            letterSpacing: "-4px",
            lineHeight: 1,
            display: "block",
            textShadow: `0 0 80px ${COLORS.brand}44`,
          }}
        >
          adorable.
        </span>

        {/* Underline emphasis */}
        <div
          style={{
            position: "absolute",
            bottom: -6,
            left: 0,
            right: 0,
            height: 6,
            background: `linear-gradient(90deg, ${COLORS.brand}, ${COLORS.magenta})`,
            borderRadius: 3,
            transform: `scaleX(${adorableWobble})`,
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Sarcasm indicator */}
      <div
        style={{
          opacity: emojiOpacity,
          transform: `scale(${emojiPulse})`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 8,
        }}
      >
        <span style={{ fontSize: 36 }}>🙄</span>
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 22,
            fontWeight: 500,
            color: COLORS.mutedForeground,
            letterSpacing: "0.06em",
          }}
        >
          so impressed
        </span>
        <span style={{ fontSize: 36 }}>🙄</span>
      </div>
    </AbsoluteFill>
  );
};
