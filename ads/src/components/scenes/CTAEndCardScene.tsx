import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { CTAButton } from "../brand/CTAButton";
import { StatsStrip } from "../brand/StatsStrip";
import { COLORS, FPS, LOGO_PATH } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

interface CTAEndCardSceneProps {
  ctaText?: string;
}

export const CTAEndCardScene: React.FC<CTAEndCardSceneProps> = ({
  ctaText = "Book a Free Strategy Call",
}) => {
  const frame = useCurrentFrame();

  // Logo appears first
  const logoOpacity = spring({
    frame,
    fps: FPS,
    config: { damping: 20, stiffness: 100 },
  });

  // CTA button enters
  const ctaOpacity = interpolate(
    frame,
    [20, 40],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const ctaY = interpolate(
    frame,
    [20, 40],
    [30, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Website URL
  const urlOpacity = interpolate(
    frame,
    [40, 55],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow glowIntensity={2} showCyanGlow />

      {/* Gradient border glow effect */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(37,99,235,0.08) 70%, transparent 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {/* Logo */}
        <div style={{ opacity: logoOpacity }}>
          <svg width="100" height="150" viewBox="0 0 120 150">
            <defs>
              <filter id="ctaLogoGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={LOGO_PATH}
              fill={COLORS.brand}
              filter="url(#ctaLogoGlow)"
            />
          </svg>
        </div>

        {/* AGENTIKS text */}
        <div
          style={{
            opacity: logoOpacity,
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 48,
            fontWeight: 600,
            color: COLORS.foreground,
            letterSpacing: "0.3em",
          }}
        >
          AGENTIKS
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
          }}
        >
          <CTAButton text={ctaText} />
        </div>

        {/* Website URL */}
        <div
          style={{
            opacity: urlOpacity,
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 22,
            color: COLORS.mutedForeground,
            letterSpacing: "0.1em",
          }}
        >
          agentiks.dev
        </div>

        {/* Stats strip at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: 40,
            right: 40,
          }}
        >
          <StatsStrip startFrame={30} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
