import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Line 1: "What if your entire operation" fade in frames 20-50
  const line1Opacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 2: "ran itself?" fade in frames 50-80
  const line2Opacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Both lines fade out frames 110-130
  const fadeOut = interpolate(frame, [110, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Brand-red radial glow pulsing at frames 130-149
  const glowOpacity =
    frame >= 130
      ? 0.04 * Math.sin(((frame - 130) / 19) * Math.PI)
      : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
      }}
    >
      {/* Pulsing brand glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, rgba(220,38,38,${glowOpacity}) 0%, transparent 60%)`,
        }}
      />

      {/* Text container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 64,
            fontWeight: 300,
            color: COLORS.foreground,
            opacity: line1Opacity * fadeOut,
            textAlign: "center",
          }}
        >
          What if your entire operation
        </div>

        {/* Line 2 */}
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 72,
            fontWeight: 700,
            color: COLORS.foreground,
            opacity: line2Opacity * fadeOut,
            textAlign: "center",
          }}
        >
          ran itself?
        </div>
      </div>
    </AbsoluteFill>
  );
};
