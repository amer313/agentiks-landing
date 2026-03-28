import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { CTAButton } from "../brand/CTAButton";
import { StatsStrip } from "../brand/StatsStrip";
import { COLORS, FPS } from "../../brand";
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
            "radial-gradient(ellipse at center, transparent 40%, rgba(180,0,255,0.08) 70%, transparent 100%)",
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
        {/* Logo — three-ray convergence design */}
        <div style={{ opacity: logoOpacity }}>
          <svg width="120" height="120" viewBox="0 0 200 200">
            <defs>
              <filter id="ctaLogoGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Back depth edges */}
            <line x1="130" y1="85" x2="55"  y2="40"  stroke="#FFF" strokeWidth="1" opacity="0.18" />
            <line x1="130" y1="85" x2="155" y2="50"  stroke="#FFF" strokeWidth="1" opacity="0.18" />
            <line x1="130" y1="85" x2="100" y2="170" stroke="#FFF" strokeWidth="1" opacity="0.18" />
            <line x1="55"  y1="40" x2="155" y2="50"  stroke="#FFF" strokeWidth="1" opacity="0.18" />
            <line x1="155" y1="50" x2="100" y2="170" stroke="#FFF" strokeWidth="1" opacity="0.18" />
            <line x1="100" y1="170" x2="55" y2="40"  stroke="#FFF" strokeWidth="1" opacity="0.18" />
            <circle cx="130" cy="85" r="3" fill="#FFF" opacity="0.18" />
            {/* Front rays */}
            <line x1="100" y1="100" x2="55"  y2="40"  stroke={COLORS.logoCyan} strokeWidth="3" strokeLinecap="round" filter="url(#ctaLogoGlow)" />
            <line x1="100" y1="100" x2="155" y2="50"  stroke={COLORS.magenta}  strokeWidth="3" strokeLinecap="round" filter="url(#ctaLogoGlow)" />
            <line x1="100" y1="100" x2="100" y2="170" stroke={COLORS.purple}   strokeWidth="3" strokeLinecap="round" filter="url(#ctaLogoGlow)" />
            {/* Endpoint dots */}
            <circle cx="55"  cy="40"  r="5" fill={COLORS.logoCyan} filter="url(#ctaLogoGlow)" />
            <circle cx="155" cy="50"  r="5" fill={COLORS.magenta}  filter="url(#ctaLogoGlow)" />
            <circle cx="100" cy="170" r="5" fill={COLORS.purple}   filter="url(#ctaLogoGlow)" />
            {/* Center ring + inner dot */}
            <circle cx="100" cy="100" r="10" fill={COLORS.background} stroke="#FFF" strokeWidth="2" />
            <circle cx="100" cy="100" r="4"  fill="#FFF" />
          </svg>
        </div>

        {/* AGENTIKS text */}
        <div
          style={{
            opacity: logoOpacity,
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 72,
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
          <CTAButton text={ctaText} fontSize={32} width={540} />
        </div>

        {/* Website URL */}
        <div
          style={{
            opacity: urlOpacity,
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 38,
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
