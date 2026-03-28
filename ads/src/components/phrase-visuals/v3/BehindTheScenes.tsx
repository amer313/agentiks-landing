import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const BehindTheScenes: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const sceneIn = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 100 } });

  // Gears rotation
  const gear1Angle = frame * 1.5;
  const gear2Angle = -frame * 2.0;
  const gear3Angle = frame * 1.2;

  const panelOpacity = interpolate(progress, [0, 0.2], [0, 0.85], { extrapolateRight: "clamp" });
  const textOpacity = interpolate(progress, [0.4, 0.7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const smarterOpacity = interpolate(progress, [0.6, 0.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  function GearPath({ teeth, r }: { teeth: number; r: number }) {
    const innerR = r * 0.7;
    const toothH = r * 0.22;
    const points: string[] = [];
    for (let i = 0; i < teeth; i++) {
      const a1 = (i / teeth) * Math.PI * 2;
      const a2 = ((i + 0.4) / teeth) * Math.PI * 2;
      const a3 = ((i + 0.6) / teeth) * Math.PI * 2;
      const a4 = ((i + 1) / teeth) * Math.PI * 2;
      points.push(
        `${innerR * Math.cos(a1)},${innerR * Math.sin(a1)}`,
        `${(innerR + toothH) * Math.cos(a2)},${(innerR + toothH) * Math.sin(a2)}`,
        `${(innerR + toothH) * Math.cos(a3)},${(innerR + toothH) * Math.sin(a3)}`,
        `${innerR * Math.cos(a4)},${innerR * Math.sin(a4)}`,
      );
    }
    return <polygon points={points.join(" ")} />;
  }

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
      {/* Your AI gets smarter label */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 38,
          fontWeight: 800,
          color: COLORS.foreground,
          textAlign: "center",
          opacity: textOpacity,
          letterSpacing: "-0.02em",
        }}
      >
        Your AI gets smarter.
      </div>

      {/* Gear machinery behind frosted panel */}
      <div
        style={{
          position: "relative",
          width: 540,
          height: 340,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        {/* Gears behind */}
        <svg
          width="540"
          height="340"
          viewBox="0 0 540 340"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {/* Gear 1 - large */}
          <g transform={`translate(200, 170) rotate(${gear1Angle})`}>
            <GearPath teeth={16} r={90} />
            <polygon
              points={Array.from({ length: 16 }, (_, i) => {
                const a1 = (i / 16) * Math.PI * 2;
                const a2 = ((i + 0.4) / 16) * Math.PI * 2;
                const a3 = ((i + 0.6) / 16) * Math.PI * 2;
                const a4 = ((i + 1) / 16) * Math.PI * 2;
                const ir = 63, or = 90 * 1.22;
                return `${ir * Math.cos(a1)},${ir * Math.sin(a1)} ${or * Math.cos(a2)},${or * Math.sin(a2)} ${or * Math.cos(a3)},${or * Math.sin(a3)} ${ir * Math.cos(a4)},${ir * Math.sin(a4)}`;
              }).join(" ")}
              fill={COLORS.brand}
              opacity={0.6}
            />
            <circle cx={0} cy={0} r={63} fill={COLORS.brand} opacity={0.25} />
            <circle cx={0} cy={0} r={20} fill={COLORS.surface} />
            <circle cx={0} cy={0} r={8} fill={COLORS.brand} opacity={0.8} />
          </g>

          {/* Gear 2 - small right */}
          <g transform={`translate(360, 100) rotate(${gear2Angle})`}>
            <circle cx={0} cy={0} r={40} fill={COLORS.cyan} opacity={0.3} />
            {Array.from({ length: 10 }, (_, i) => {
              const a1 = (i / 10) * Math.PI * 2;
              const a2 = ((i + 0.4) / 10) * Math.PI * 2;
              const a3 = ((i + 0.6) / 10) * Math.PI * 2;
              const a4 = ((i + 1) / 10) * Math.PI * 2;
              const ir = 28, or = 50;
              return (
                <polygon
                  key={i}
                  points={`${ir * Math.cos(a1)},${ir * Math.sin(a1)} ${or * Math.cos(a2)},${or * Math.sin(a2)} ${or * Math.cos(a3)},${or * Math.sin(a3)} ${ir * Math.cos(a4)},${ir * Math.sin(a4)}`}
                  fill={COLORS.cyan}
                  opacity={0.5}
                />
              );
            })}
            <circle cx={0} cy={0} r={12} fill={COLORS.surface} />
            <circle cx={0} cy={0} r={5} fill={COLORS.cyan} opacity={0.8} />
          </g>

          {/* Gear 3 - small left */}
          <g transform={`translate(100, 100) rotate(${gear3Angle})`}>
            <circle cx={0} cy={0} r={35} fill={COLORS.green} opacity={0.25} />
            {Array.from({ length: 9 }, (_, i) => {
              const a1 = (i / 9) * Math.PI * 2;
              const a2 = ((i + 0.4) / 9) * Math.PI * 2;
              const a3 = ((i + 0.6) / 9) * Math.PI * 2;
              const a4 = ((i + 1) / 9) * Math.PI * 2;
              const ir = 24, or = 44;
              return (
                <polygon
                  key={i}
                  points={`${ir * Math.cos(a1)},${ir * Math.sin(a1)} ${or * Math.cos(a2)},${or * Math.sin(a2)} ${or * Math.cos(a3)},${or * Math.sin(a3)} ${ir * Math.cos(a4)},${ir * Math.sin(a4)}`}
                  fill={COLORS.green}
                  opacity={0.45}
                />
              );
            })}
            <circle cx={0} cy={0} r={10} fill={COLORS.surface} />
            <circle cx={0} cy={0} r={4} fill={COLORS.green} opacity={0.8} />
          </g>
        </svg>

        {/* Frosted glass panel overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `${COLORS.background}CC`,
            borderRadius: 20,
            border: `1px solid rgba(255,255,255,0.08)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: panelOpacity,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 22,
              fontWeight: 500,
              color: COLORS.mutedForeground,
              textAlign: "center",
              letterSpacing: "0.04em",
            }}
          >
            Behind the scenes
          </div>
        </div>
      </div>

      {/* Auto-improving label */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 28,
          fontWeight: 500,
          color: COLORS.green,
          textAlign: "center",
          opacity: smarterOpacity,
        }}
      >
        Automatically. Continuously.
      </div>
    </AbsoluteFill>
  );
};
