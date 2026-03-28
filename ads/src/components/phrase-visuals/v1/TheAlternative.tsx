import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const TheAlternative: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const qMarkScale = spring({ frame, fps: FPS, config: { damping: 10, stiffness: 120 }, from: 0, to: 1 });
  const qMarkRotate = interpolate(progress, [0, 0.15, 0.3, 0.5], [0, -8, 6, 0], { extrapolateRight: "clamp" });

  const pulseCycle = (frame / (FPS * 2)) % 1;
  const pulseScale = interpolate(pulseCycle, [0, 0.5, 1], [1, 1.08, 1]);
  const pulseOpacity = interpolate(pulseCycle, [0, 0.5, 1], [0.6, 1, 0.6]);

  const textOpacity = interpolate(progress, [0.35, 0.6], [0, 1], { extrapolateRight: "clamp" });
  const textY = interpolate(progress, [0.35, 0.6], [30, 0], { extrapolateRight: "clamp" });
  const textScale = spring({
    frame: Math.max(0, frame - Math.round(durationFrames * 0.35)),
    fps: FPS,
    config: { damping: 12, stiffness: 90 },
    from: 0.8,
    to: 1,
  });

  const glowOpacity = interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 56,
        background: "transparent",
      }}
    >
      {/* Giant question mark */}
      <div
        style={{
          position: "relative",
          transform: `scale(${qMarkScale * pulseScale}) rotate(${qMarkRotate}deg)`,
          opacity: pulseOpacity,
        }}
      >
        {/* Glow halo */}
        <div
          style={{
            position: "absolute",
            inset: -40,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.brand}33 0%, transparent 70%)`,
            opacity: glowOpacity,
          }}
        />
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 220,
            fontWeight: 900,
            color: COLORS.brand,
            lineHeight: 1,
            display: "block",
            textShadow: `0 0 60px ${COLORS.brand}88, 0 0 120px ${COLORS.brand}44`,
            position: "relative",
          }}
        >
          ?
        </span>
      </div>

      {/* Question text */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px) scale(${textScale})`,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 42,
            fontWeight: 700,
            color: COLORS.foreground,
            letterSpacing: "-0.02em",
          }}
        >
          what's the alternative?
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {["right?", "...right?"].map((word, i) => (
            <span
              key={i}
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 28,
                fontWeight: 400,
                color: COLORS.mutedForeground,
                opacity: interpolate(progress, [0.55 + i * 0.1, 0.75 + i * 0.1], [0, 0.7], { extrapolateRight: "clamp" }),
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
