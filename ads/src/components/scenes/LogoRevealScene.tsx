import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";
import { LogoReveal } from "../brand/LogoReveal";

export const LogoRevealScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Quick spring scale-pop: logo appears in ~15 frames
  const logoScale = spring({
    frame,
    fps: FPS,
    config: { damping: 8, stiffness: 280, mass: 0.6 },
  });

  // Flash/bloom effect on appearance (peaks at frame 5, fades by frame 20)
  const bloomOpacity = interpolate(frame, [0, 5, 20], [0, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Meet Agentiks." text fades in after ~10 frames delay
  const textOpacity = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Overall fade out near end of 60-frame scene
  const fadeOut = interpolate(frame, [48, 58], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Flash/bloom effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, rgba(220,38,38,${bloomOpacity}) 0%, rgba(220,38,38,${bloomOpacity * 0.3}) 30%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Logo with spring scale-pop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${logoScale})`,
          opacity: fadeOut,
        }}
      >
        <LogoReveal
          startFrame={0}
          durationFrames={15}
          logoSize={300}
          showText={false}
        />
      </div>

      {/* "Meet Agentiks." text below logo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 400,
          opacity: textOpacity * fadeOut,
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
