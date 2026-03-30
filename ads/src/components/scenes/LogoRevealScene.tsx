import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";
import { LogoReveal } from "../brand/LogoReveal";

export const LogoRevealScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Text fade in frames 40-60 (adjusted for 90-frame duration)
  const textOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Logo centered via flex in LogoReveal */}
      <LogoReveal
        startFrame={0}
        durationFrames={60}
        logoSize={300}
        showText={false}
      />

      {/* "Meet Agentiks." text below logo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 400,
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
