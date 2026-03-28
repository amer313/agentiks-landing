import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const VERSIONS = ["v1.0", "v1.1", "v1.2", "v1.3", "v2.0", "v2.1"];

export const WeeklyEvolution: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const sceneIn = spring({ frame, fps: FPS, config: { damping: 20, stiffness: 100 } });

  // How many versions visible
  const visibleVersions = Math.min(VERSIONS.length, Math.ceil(progress * VERSIONS.length * 1.3));

  const textOpacity = interpolate(progress, [0.65, 0.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 32,
        padding: "0 60px",
        opacity: sceneIn,
      }}
    >
      {/* Label */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 26,
          fontWeight: 600,
          color: COLORS.mutedForeground,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: interpolate(progress, [0, 0.15], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Your agents evolve
      </div>

      {/* Version timeline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          width: "100%",
          maxWidth: 560,
        }}
      >
        {VERSIONS.map((version, i) => {
          const isVisible = i < visibleVersions;
          const vSpring = spring({
            frame: Math.max(0, frame - i * 6),
            fps: FPS,
            config: { damping: 14, stiffness: 160 },
          });

          const isLatest = i === visibleVersions - 1;
          const isMajor = version.includes(".0");

          const color = isMajor ? COLORS.brand : COLORS.cyan;

          return (
            <div
              key={version}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: isVisible ? vSpring : 0,
                transform: `translateX(${isVisible ? interpolate(vSpring, [0, 1], [-30, 0]) : -30}px)`,
              }}
            >
              {/* Connector line (except first) */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 32 }}>
                {i > 0 && (
                  <div
                    style={{
                      width: 2,
                      height: 16,
                      background: isVisible ? color : COLORS.surface2,
                      opacity: 0.4,
                      marginBottom: 0,
                    }}
                  />
                )}
                {/* Node */}
                <div
                  style={{
                    width: isMajor ? 18 : 12,
                    height: isMajor ? 18 : 12,
                    borderRadius: "50%",
                    background: isVisible ? color : COLORS.surface2,
                    boxShadow: isVisible && isLatest ? `0 0 20px ${color}80` : "none",
                    border: isMajor ? `3px solid ${color}` : "none",
                    flexShrink: 0,
                  }}
                />
                {i < VERSIONS.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      height: 16,
                      background: isVisible ? color : COLORS.surface2,
                      opacity: 0.4,
                      marginTop: 0,
                    }}
                  />
                )}
              </div>

              {/* Version card */}
              <div
                style={{
                  flex: 1,
                  padding: "10px 20px",
                  background: isLatest ? `${color}20` : COLORS.surface,
                  border: `1.5px solid ${isLatest ? color + "60" : COLORS.surface2}`,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY_MONO,
                    fontSize: isMajor ? 28 : 22,
                    fontWeight: isMajor ? 800 : 600,
                    color: isVisible ? (isLatest ? color : COLORS.foreground) : COLORS.surface2,
                  }}
                >
                  {version}
                </span>
                {isLatest && (
                  <span
                    style={{
                      fontFamily: FONT_FAMILY_SANS,
                      fontSize: 13,
                      fontWeight: 700,
                      color: color,
                      letterSpacing: "0.08em",
                    }}
                  >
                    CURRENT
                  </span>
                )}
                {isMajor && !isLatest && (
                  <span
                    style={{
                      fontFamily: FONT_FAMILY_SANS,
                      fontSize: 12,
                      color: COLORS.mutedForeground,
                      letterSpacing: "0.06em",
                    }}
                  >
                    MAJOR
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 34,
          fontWeight: 700,
          color: COLORS.foreground,
          textAlign: "center",
          opacity: textOpacity,
          letterSpacing: "-0.02em",
        }}
      >
        Every. Single. Week.
      </div>
    </AbsoluteFill>
  );
};
