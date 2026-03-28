import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

interface KineticTextProps {
  text: string;
  color?: string;
  glitchColor?: string;
  enterFrame?: number;
  holdFrames?: number;
  fontSize?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  color = COLORS.foreground,
  glitchColor = COLORS.cyan,
  enterFrame = 0,
  holdFrames = 60,
  fontSize = 72,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - enterFrame;

  if (relativeFrame < 0) return null;

  // Phase 1: Slam in (frames 0-9)
  const slamProgress = spring({
    frame: relativeFrame,
    fps: FPS,
    config: { damping: 12, stiffness: 200 },
  });

  const scale = interpolate(slamProgress, [0, 1], [1.3, 1]);
  const opacity = interpolate(
    relativeFrame,
    [0, 3],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Phase 2: Glitch effect (frames 3-9)
  const glitchActive = relativeFrame >= 3 && relativeFrame <= 9;
  const glitchOffset = glitchActive ? Math.sin(relativeFrame * 17) * 2 : 0;

  // Phase 3: Hold

  // Phase 4: Fade out
  const fadeOutStart = 9 + holdFrames;
  const fadeOutOpacity = interpolate(
    relativeFrame,
    [fadeOutStart, fadeOutStart + 6],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const finalOpacity = Math.min(opacity, fadeOutOpacity);

  const textShadow = glitchActive
    ? `${glitchOffset}px 0 ${glitchColor}, ${-glitchOffset}px 0 ${COLORS.brand}`
    : "none";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: finalOpacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize,
          fontWeight: 700,
          color,
          textAlign: "center",
          textShadow,
          padding: "0 60px",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        {text}
      </div>
    </div>
  );
};
