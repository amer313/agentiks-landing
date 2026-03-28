import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

function BuildingIcon({ color }: { color: string }) {
  return (
    <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
      <rect x="10" y="20" width="60" height="75" rx="2" fill={COLORS.surface2} stroke={color} strokeWidth={1.5} />
      <rect x="20" y="30" width="12" height="10" rx="1" fill={color} opacity={0.7} />
      <rect x="36" y="30" width="12" height="10" rx="1" fill={color} opacity={0.7} />
      <rect x="52" y="30" width="12" height="10" rx="1" fill={color} opacity={0.7} />
      <rect x="20" y="46" width="12" height="10" rx="1" fill={color} opacity={0.7} />
      <rect x="36" y="46" width="12" height="10" rx="1" fill={color} opacity={0.7} />
      <rect x="52" y="46" width="12" height="10" rx="1" fill={color} opacity={0.7} />
      <rect x="20" y="62" width="12" height="10" rx="1" fill={color} opacity={0.5} />
      <rect x="36" y="62" width="12" height="10" rx="1" fill={color} opacity={0.5} />
      <rect x="52" y="62" width="12" height="10" rx="1" fill={color} opacity={0.5} />
      <rect x="32" y="80" width="16" height="14" rx="1" fill={color} opacity={0.9} />
      {/* Roof details */}
      <polygon points="10,20 40,4 70,20" fill={COLORS.surface2} stroke={color} strokeWidth={1.5} />
    </svg>
  );
}

function WarningDot({ pulse }: { pulse: number }) {
  return (
    <div style={{ position: "relative", width: 28, height: 28 }}>
      {/* Pulse ring */}
      <div
        style={{
          position: "absolute",
          inset: -4,
          borderRadius: "50%",
          border: `2px solid ${COLORS.red}`,
          opacity: interpolate(pulse, [0, 1], [0.8, 0], { extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(pulse, [0, 1], [1, 1.8])})`,
        }}
      />
      {/* Core dot */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: COLORS.red,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 12px ${COLORS.red}88`,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2V8" stroke="white" strokeWidth={2} strokeLinecap="round" />
          <circle cx="7" cy="11" r="1" fill="white" />
        </svg>
      </div>
    </div>
  );
}

const COMPANIES = [
  { color: COLORS.cyan },
  { color: COLORS.brand },
  { color: COLORS.amber },
  { color: COLORS.green },
  { color: COLORS.magenta },
  { color: COLORS.brandLight },
];

export const EveryCompany: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();
  const pulseCycle = (frame / (FPS * 1.2)) % 1;

  const textOpacity = interpolate(progress, [0.6, 0.85], [0, 1], { extrapolateRight: "clamp" });
  const textY = interpolate(progress, [0.6, 0.85], [20, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 48,
        background: "transparent",
      }}
    >
      {/* 2x3 grid of company buildings */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 140px)",
          gridTemplateRows: "repeat(2, 160px)",
          gap: "20px 20px",
        }}
      >
        {COMPANIES.map((company, i) => {
          const entryProgress = interpolate(
            progress,
            [i * 0.08, i * 0.08 + 0.2],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          const entryScale = spring({
            frame: Math.max(0, frame - i * Math.round(FPS * 0.08)),
            fps: FPS,
            config: { damping: 14, stiffness: 100 },
            from: 0,
            to: 1,
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 8,
                transform: `scale(${entryScale})`,
                opacity: entryProgress,
              }}
            >
              <div style={{ position: "relative" }}>
                <BuildingIcon color={company.color} />
                <div style={{ position: "absolute", top: -8, right: -8 }}>
                  <WarningDot pulse={pulseCycle} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Text */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.foreground,
          }}
        >
          Every company has that.
        </span>
      </div>
    </AbsoluteFill>
  );
};
