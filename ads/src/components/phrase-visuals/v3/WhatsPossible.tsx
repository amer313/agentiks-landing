import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const POSSIBILITIES = [
  { label: "Agents that never sleep", color: COLORS.brand, delay: 0 },
  { label: "Systems that evolve weekly", color: COLORS.cyan, delay: 10 },
  { label: "Edge that compounds daily", color: COLORS.green, delay: 20 },
];

export const WhatsPossible: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const headlineSpring = spring({
    frame,
    fps: FPS,
    config: { damping: 14, stiffness: 180, mass: 0.8 },
  });

  const headlineScale = interpolate(headlineSpring, [0, 1], [0.5, 1]);
  const headlineOpacity = headlineSpring;

  // Radial burst effect
  const burstScale = interpolate(headlineSpring, [0, 1], [0.3, 1.2]);
  const burstOpacity = interpolate(headlineSpring, [0, 0.4, 1], [0, 0.6, 0]);

  // Spinning glow
  const spinAngle = frame * 1.2;
  const glowPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.7, 1.0]);

  const outroFade = interpolate(
    progress,
    [0.85, 1.0],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 40,
        opacity: outroFade,
      }}
    >
      {/* Radial burst */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `conic-gradient(from ${spinAngle}deg, ${COLORS.brand}18, ${COLORS.cyan}18, ${COLORS.magenta}18, transparent, ${COLORS.brand}18)`,
          transform: `scale(${burstScale})`,
          opacity: burstOpacity * glowPulse,
        }}
      />

      {/* Soft glow behind headline */}
      <div
        style={{
          position: "absolute",
          width: 640,
          height: 320,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${COLORS.brand}28 0%, transparent 70%)`,
          filter: "blur(60px)",
          opacity: headlineSpring * glowPulse,
        }}
      />

      {/* "What's possible" headline */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 88,
          fontWeight: 900,
          color: COLORS.foreground,
          textAlign: "center",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          opacity: headlineOpacity,
          transform: `scale(${headlineScale})`,
          position: "relative",
          zIndex: 2,
          textShadow: `0 0 60px ${COLORS.brand}50`,
        }}
      >
        What&apos;s{" "}
        <span
          style={{
            background: `linear-gradient(135deg, ${COLORS.brand}, ${COLORS.cyan})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          possible.
        </span>
      </div>

      {/* Possibilities list — staggered entry */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          maxWidth: 680,
          padding: "0 60px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {POSSIBILITIES.map((item, i) => {
          const itemSpring = spring({
            frame: Math.max(0, frame - item.delay),
            fps: FPS,
            config: { damping: 14, stiffness: 160, mass: 0.8 },
          });
          const itemTranslateX = interpolate(itemSpring, [0, 1], [-80, 0]);
          const itemOpacity = interpolate(itemSpring, [0, 0.3], [0, 1]);

          return (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                opacity: itemOpacity,
                transform: `translateX(${itemTranslateX}px)`,
                background: `${item.color}0F`,
                border: `1.5px solid ${item.color}30`,
                borderRadius: 16,
                padding: "18px 28px",
                boxShadow: `0 4px 24px ${item.color}15`,
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: item.color,
                  flexShrink: 0,
                  boxShadow: `0 0 16px ${item.color}80`,
                }}
              />
              <span
                style={{
                  fontFamily: FONT_FAMILY_MONO,
                  fontSize: 32,
                  fontWeight: 700,
                  color: COLORS.foreground,
                  letterSpacing: "-0.02em",
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 24,
          fontWeight: 500,
          color: COLORS.mutedForeground,
          textAlign: "center",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          opacity: interpolate(
            progress,
            [0.5, 0.75],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ) * outroFade,
          position: "relative",
          zIndex: 2,
        }}
      >
        agentiks.dev
      </div>
    </AbsoluteFill>
  );
};
