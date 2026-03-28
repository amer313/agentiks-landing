import React from "react";
import { AbsoluteFill } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { CTAButton } from "../brand/CTAButton";
import { COLORS } from "../../brand";
import type { CarouselCard } from "../../types";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../fonts";

interface CarouselCardSceneProps {
  card: CarouselCard;
  cardIndex: number;
  totalCards: number;
}

export const CarouselCardScene: React.FC<CarouselCardSceneProps> = ({
  card,
  cardIndex,
  totalCards,
}) => {
  const isCover = cardIndex === 0;
  const isCTA = cardIndex === totalCards - 1;

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow glowIntensity={isCover || isCTA ? 1.5 : 0.8} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 60px",
          gap: 24,
        }}
      >
        {/* Logo for cover and CTA cards — three-ray convergence design */}
        {(isCover || isCTA) && (
          <svg width="72" height="72" viewBox="0 0 200 200" style={{ marginBottom: 8 }}>
            <defs>
              <filter id="carouselLogoGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <line x1="130" y1="85" x2="55"  y2="40"  stroke="#FFF" strokeWidth="1" opacity="0.18" />
            <line x1="130" y1="85" x2="155" y2="50"  stroke="#FFF" strokeWidth="1" opacity="0.18" />
            <line x1="130" y1="85" x2="100" y2="170" stroke="#FFF" strokeWidth="1" opacity="0.18" />
            <line x1="55"  y1="40" x2="155" y2="50"  stroke="#FFF" strokeWidth="1" opacity="0.18" />
            <line x1="155" y1="50" x2="100" y2="170" stroke="#FFF" strokeWidth="1" opacity="0.18" />
            <line x1="100" y1="170" x2="55" y2="40"  stroke="#FFF" strokeWidth="1" opacity="0.18" />
            <circle cx="130" cy="85" r="3" fill="#FFF" opacity="0.18" />
            <line x1="100" y1="100" x2="55"  y2="40"  stroke={COLORS.cyan}    strokeWidth="3" strokeLinecap="round" filter="url(#carouselLogoGlow)" />
            <line x1="100" y1="100" x2="155" y2="50"  stroke={COLORS.magenta} strokeWidth="3" strokeLinecap="round" filter="url(#carouselLogoGlow)" />
            <line x1="100" y1="100" x2="100" y2="170" stroke={COLORS.purple}  strokeWidth="3" strokeLinecap="round" filter="url(#carouselLogoGlow)" />
            <circle cx="55"  cy="40"  r="5" fill={COLORS.cyan}    filter="url(#carouselLogoGlow)" />
            <circle cx="155" cy="50"  r="5" fill={COLORS.magenta} filter="url(#carouselLogoGlow)" />
            <circle cx="100" cy="170" r="5" fill={COLORS.purple}  filter="url(#carouselLogoGlow)" />
            <circle cx="100" cy="100" r="10" fill="#07080D" stroke="#FFF" strokeWidth="2" />
            <circle cx="100" cy="100" r="4"  fill="#FFF" />
          </svg>
        )}

        {/* Phase number badge */}
        {card.phaseNumber && (
          <div
            style={{
              fontFamily: FONT_FAMILY_MONO,
              fontSize: 14,
              fontWeight: 700,
              color: COLORS.brand,
              backgroundColor: `${COLORS.brand}15`,
              padding: "6px 16px",
              borderRadius: 6,
              letterSpacing: "0.15em",
              border: `1px solid ${COLORS.brand}30`,
            }}
          >
            PHASE {card.phaseNumber}
          </div>
        )}

        {/* Heading */}
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: isCover ? 48 : 40,
            fontWeight: 600,
            color: COLORS.foreground,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {card.heading}
        </div>

        {/* Subheading */}
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 18,
            fontWeight: 400,
            color: COLORS.mutedForeground,
            textAlign: "center",
          }}
        >
          {card.subheading}
        </div>

        {/* Body text */}
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 16,
            fontWeight: 400,
            color: COLORS.mutedForeground,
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: 500,
            marginTop: 12,
          }}
        >
          {card.body}
        </div>

        {/* CTA button for last card */}
        {isCTA && (
          <div style={{ marginTop: 24 }}>
            <CTAButton text="Book a Free Strategy Call" width={280} />
          </div>
        )}
      </AbsoluteFill>

      {/* Dot indicator at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {Array.from({ length: totalCards }, (_, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: i === cardIndex ? COLORS.brand : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>

      {/* Card border treatment */}
      <div
        style={{
          position: "absolute",
          inset: 20,
          border: `1px dashed ${COLORS.line}`,
          borderRadius: 16,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
