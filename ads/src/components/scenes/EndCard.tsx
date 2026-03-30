import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../fonts";
import { LogoReveal } from "../brand/LogoReveal";

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Duration: 165 frames (5.5s)
  // Logo reveal starts at frame 15, runs for 45 frames
  // Tagline fades in at frame 60-80
  // URL fades in at frame 85-105
  // Hold with glow from 105+

  const taglineOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const urlOpacity = interpolate(frame, [85, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing brand glow for frames 105+
  const glowOpacity =
    frame >= 105
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

      {/* Logo reveal -- centered, large, starts at frame 15 */}
      {frame >= 15 && (
        <LogoReveal
          startFrame={15}
          durationFrames={45}
          logoSize={220}
          showText={false}
        />
      )}

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 380,
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
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 460,
          opacity: urlOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 28,
            color: COLORS.brand,
          }}
        >
          agentiks.dev
        </div>
      </div>
    </AbsoluteFill>
  );
};
