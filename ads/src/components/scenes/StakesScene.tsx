import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { COLORS, FPS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

// Line reveal timings (frames)
// Line 1: "The companies that figure this out now"
const LINE1_START = 0;
// Line 2: "will be untouchable in two years."
const LINE2_START = 25;
// Beat / pause before lines 3-4
// Line 3: "The ones that wait..."
const LINE3_START = 80;
// Line 4: "won't." — appears with emphasis
const LINE4_START = 115;

function useFadeIn(frame: number, startFrame: number, durationFrames = 12) {
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const translateY = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return { opacity, translateY };
}

export const StakesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const line1 = useFadeIn(frame, LINE1_START);
  const line2 = useFadeIn(frame, LINE2_START);
  const line3 = useFadeIn(frame, LINE3_START);

  // "won't." springs in with a pop
  const wontSpring = spring({
    frame: Math.max(0, frame - LINE4_START),
    fps: FPS,
    config: { damping: 10, stiffness: 220, mass: 0.7 },
  });
  const wontScale = interpolate(wontSpring, [0, 1], [0.6, 1]);
  const wontOpacity = interpolate(
    frame,
    [LINE4_START, LINE4_START + 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Background glow ramps up as emphasis builds
  const glowIntensity = interpolate(
    frame,
    [0, LINE3_START, LINE4_START, LINE4_START + 30],
    [1, 1.5, 2.5, 3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow glowIntensity={glowIntensity} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          gap: 0,
        }}
      >
        {/* Block 1: statement */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginBottom: 56,
          }}
        >
          {/* Line 1 */}
          <div
            style={{
              opacity: line1.opacity,
              transform: `translateY(${line1.translateY}px)`,
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 48,
              fontWeight: 700,
              color: COLORS.foreground,
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            The companies that figure this out now
          </div>

          {/* Line 2 */}
          <div
            style={{
              opacity: line2.opacity,
              transform: `translateY(${line2.translateY}px)`,
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 48,
              fontWeight: 700,
              color: COLORS.brand,
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            will be untouchable in two years.
          </div>
        </div>

        {/* Block 2: consequence */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Line 3 */}
          <div
            style={{
              opacity: line3.opacity,
              transform: `translateY(${line3.translateY}px)`,
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 48,
              fontWeight: 500,
              color: COLORS.mutedForeground,
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            The ones that wait...
          </div>

          {/* Line 4: "won't." — emphasis pop */}
          <div
            style={{
              opacity: wontOpacity,
              transform: `scale(${wontScale})`,
              transformOrigin: "center center",
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 72,
              fontWeight: 800,
              color: COLORS.foreground,
              textAlign: "center",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              textShadow: `0 0 40px ${COLORS.brand}80, 0 0 80px ${COLORS.brand}40`,
            }}
          >
            won&apos;t.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
