import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";
import { LogoReveal } from "../brand/LogoReveal";

export const LogoRevealScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Text fade in frames 30-50
  const textOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <LogoReveal startFrame={0} durationFrames={50} showText={false} />

      {/* "Meet Agentiks." text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          marginTop: 280,
          textAlign: "center",
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 48,
            fontWeight: 300,
            color: COLORS.foreground,
          }}
        >
          Meet Agentiks.
        </div>
      </div>
    </AbsoluteFill>
  );
};
