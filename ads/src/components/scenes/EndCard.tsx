import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../fonts";
import { LogoReveal } from "../brand/LogoReveal";

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Tagline fade in frames 80-100
  const taglineOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL fade in frames 120-140
  const urlOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing brand glow for frames 150+
  const glowOpacity =
    frame >= 150
      ? 0.03 + 0.05 * Math.sin(frame * 0.08)
      : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Pulsing brand glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, rgba(220,38,38,${glowOpacity}) 0%, transparent 60%)`,
        }}
      />

      {/* Logo reveal -- starts at frame 30 */}
      {frame >= 30 && (
        <LogoReveal
          startFrame={30}
          durationFrames={50}
          showText={false}
        />
      )}

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          marginTop: 280,
          textAlign: "center",
          opacity: taglineOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 36,
            fontWeight: 300,
            color: COLORS.mutedForeground,
          }}
        >
          The future is agentic.
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          marginTop: 340,
          textAlign: "center",
          opacity: urlOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 24,
            color: COLORS.brand,
          }}
        >
          agentiks.dev
        </div>
      </div>
    </AbsoluteFill>
  );
};
