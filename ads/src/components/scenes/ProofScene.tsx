import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { HexGrid } from "../backgrounds/HexGrid";
import { DataStreams } from "../backgrounds/DataStreams";
import { COLORS, FPS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

export const ProofScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Counter progression: 0-100 (40%), 100-180 (50%), 180-240 (60%)
  let displayValue: number;
  let displayColor: string;

  if (frame < 100) {
    displayValue = Math.floor(
      interpolate(frame, [0, 80], [0, 40], { extrapolateRight: "clamp" })
    );
    displayColor = COLORS.brand;
  } else if (frame < 180) {
    displayValue = Math.floor(
      interpolate(frame, [100, 160], [40, 50], { extrapolateRight: "clamp" })
    );
    displayColor = COLORS.cyan;
  } else {
    displayValue = Math.floor(
      interpolate(frame, [180, 230], [50, 60], { extrapolateRight: "clamp" })
    );
    displayColor = COLORS.green;
  }

  // Scale pop at thresholds
  const atThreshold40 = frame >= 78 && frame <= 90;
  const atThreshold50 = frame >= 158 && frame <= 170;
  const atThreshold60 = frame >= 228 && frame <= 240;
  const popActive = atThreshold40 || atThreshold50 || atThreshold60;

  const popScale = popActive
    ? spring({
        frame: popActive
          ? atThreshold40
            ? frame - 78
            : atThreshold50
              ? frame - 158
              : frame - 228
          : 0,
        fps: FPS,
        config: { damping: 10, stiffness: 200 },
      })
    : 0;

  const counterScale = 1 + popScale * 0.15;

  // "given back" text appears after 60%
  const textOpacity = interpolate(
    frame,
    [240, 270],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const textY = interpolate(
    frame,
    [240, 270],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow glowIntensity={1.5} />

      {/* Background elements */}
      <AbsoluteFill>
        <svg width="100%" height="100%" viewBox="0 0 1080 1920">
          <HexGrid cx={540} cy={960} size={500} opacity={0.2} />
          <DataStreams cx={540} cy={960} size={500} />
        </svg>
      </AbsoluteFill>

      {/* Center counter */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            transform: `scale(${counterScale})`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 180,
              fontWeight: 700,
              color: displayColor,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              fontFeatureSettings: '"tnum" 1',
              textShadow: `0 0 60px ${displayColor}40`,
            }}
          >
            {displayValue}%
          </div>
        </div>

        {/* Subtitle text */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            marginTop: 30,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 36,
              fontWeight: 500,
              color: COLORS.foreground,
              textAlign: "center",
              letterSpacing: "0.02em",
            }}
          >
            of your team's time --{" "}
            <span style={{ color: COLORS.green, fontWeight: 700 }}>
              given back
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
