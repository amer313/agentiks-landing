import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const PILLARS = [
  {
    title: "Strategy",
    subtitle: "Weeks 1–2",
    desc: "Audit workflows, map automation opportunities, project ROI",
    color: COLORS.cyan,
    icon: (color: string) => (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect x="4" y="28" width="8" height="12" rx="1.5" fill={color} opacity={0.9} />
        <rect x="18" y="18" width="8" height="22" rx="1.5" fill={color} opacity={0.9} />
        <rect x="32" y="8" width="8" height="32" rx="1.5" fill={color} opacity={0.9} />
        <path d="M6 22 L22 14 L36 6" stroke={color} strokeWidth={2} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    title: "Custom Development",
    subtitle: "Weeks 3–6",
    desc: "Production-grade agents built on your stack with full orchestration",
    color: COLORS.brand,
    icon: (color: string) => (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <path d="M14 16 L6 22 L14 28" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 16 L38 22 L30 28" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 10 L20 34" stroke={color} strokeWidth={2.5} strokeLinecap="round" opacity={0.7} />
      </svg>
    ),
  },
  {
    title: "Multi-Agent Orchestration",
    subtitle: "Ongoing",
    desc: "Coordinated agent networks that reason, adapt, and execute 24/7",
    color: COLORS.green,
    icon: (color: string) => (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="5" fill={color} opacity={0.9} />
        <circle cx="8" cy="10" r="4" stroke={color} strokeWidth={2} />
        <circle cx="36" cy="10" r="4" stroke={color} strokeWidth={2} />
        <circle cx="8" cy="34" r="4" stroke={color} strokeWidth={2} />
        <circle cx="36" cy="34" r="4" stroke={color} strokeWidth={2} />
        <line x1="12" y1="13" x2="18" y2="18" stroke={color} strokeWidth={1.5} opacity={0.6} />
        <line x1="32" y1="13" x2="26" y2="18" stroke={color} strokeWidth={1.5} opacity={0.6} />
        <line x1="12" y1="31" x2="18" y2="26" stroke={color} strokeWidth={1.5} opacity={0.6} />
        <line x1="32" y1="31" x2="26" y2="26" stroke={color} strokeWidth={1.5} opacity={0.6} />
      </svg>
    ),
  },
];

export const PillarCards: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 32,
        background: "transparent",
      }}
    >
      {PILLARS.map((pillar, i) => {
        const startProgress = i * 0.22;
        const cardProgress = interpolate(
          progress,
          [startProgress, startProgress + 0.25],
          [0, 1],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );
        const cardScale = spring({
          frame: Math.max(0, frame - Math.round(startProgress * durationFrames)),
          fps: FPS,
          config: { damping: 13, stiffness: 110 },
          from: 0.6,
          to: 1,
        });
        const cardY = interpolate(cardProgress, [0, 1], [40, 0]);

        return (
          <div
            key={pillar.title}
            style={{
              opacity: cardProgress,
              transform: `translateY(${cardY}px) scale(${cardScale})`,
              width: 640,
              padding: "28px 32px",
              background: COLORS.surface,
              borderRadius: 16,
              border: `1.5px dashed ${pillar.color}55`,
              boxShadow: `0 0 32px ${pillar.color}18, inset 0 0 0 1px ${pillar.color}11`,
              display: "flex",
              alignItems: "center",
              gap: 28,
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 14,
                background: `${pillar.color}18`,
                border: `1.5px solid ${pillar.color}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {pillar.icon(pillar.color)}
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                <span
                  style={{
                    fontFamily: FONT_FAMILY_SANS,
                    fontSize: 26,
                    fontWeight: 800,
                    color: pillar.color,
                    lineHeight: 1.2,
                  }}
                >
                  {pillar.title}
                </span>
                <span
                  style={{
                    fontFamily: FONT_FAMILY_MONO,
                    fontSize: 13,
                    color: COLORS.mutedForeground,
                    fontWeight: 500,
                  }}
                >
                  {pillar.subtitle}
                </span>
              </div>
              <span
                style={{
                  fontFamily: FONT_FAMILY_SANS,
                  fontSize: 16,
                  fontWeight: 400,
                  color: COLORS.mutedForeground,
                  lineHeight: 1.5,
                }}
              >
                {pillar.desc}
              </span>
            </div>

            {/* Sequence number */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: `2px solid ${pillar.color}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY_MONO,
                  fontSize: 20,
                  fontWeight: 700,
                  color: pillar.color,
                  opacity: 0.7,
                }}
              >
                {i + 1}
              </span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
