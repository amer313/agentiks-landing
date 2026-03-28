import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const CantKeepUp: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  // Treadmill speed increases over time
  const speed = interpolate(progress, [0, 1], [1, 4], { extrapolateRight: "clamp" });

  // Running figure bob animation (legs cycling)
  const legCycle = (Math.sin(frame * 0.5 * speed) + 1) / 2;
  const armCycle = (Math.cos(frame * 0.5 * speed) + 1) / 2;

  // Figure slipping back
  const figureX = interpolate(progress, [0.3, 1], [0, -60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Speed lines
  const speedLineOpacity = interpolate(progress, [0, 0.3], [0, 0.8], { extrapolateRight: "clamp" });

  // Text fade
  const textOpacity = interpolate(progress, [0.5, 0.75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const treadmillSpring = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 120 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 48,
        padding: "0 60px",
      }}
    >
      {/* Scene container */}
      <div
        style={{
          width: 560,
          height: 380,
          position: "relative",
          opacity: treadmillSpring,
        }}
      >
        <svg width="560" height="380" viewBox="0 0 560 380">
          {/* Speed lines in background */}
          {Array.from({ length: 8 }, (_, i) => {
            const y = 100 + i * 22;
            const lineLen = interpolate(speed, [1, 4], [60, 200]);
            return (
              <line
                key={i}
                x1={520 - lineLen * ((i % 3) * 0.3 + 0.7)}
                y1={y}
                x2={520}
                y2={y}
                stroke={COLORS.cyan}
                strokeWidth={2}
                opacity={speedLineOpacity * (0.3 + (i % 3) * 0.2)}
                strokeLinecap="round"
              />
            );
          })}

          {/* Treadmill belt */}
          <rect x={80} y={290} width={380} height={28} rx={14} fill={COLORS.surface2} stroke={COLORS.surface} strokeWidth={2} />
          {/* Moving belt marks */}
          {Array.from({ length: 6 }, (_, i) => {
            const x = ((i * 65 - (frame * speed * 2.5) % 390 + 390) % 390) + 80;
            return (
              <rect key={i} x={x} y={292} width={20} height={24} rx={4} fill={COLORS.surface} opacity={0.6} />
            );
          })}

          {/* Treadmill frame */}
          <rect x={70} y={275} width={400} height={6} rx={3} fill={COLORS.mutedForeground} opacity={0.4} />
          <rect x={80} y={318} width={12} height={50} rx={3} fill={COLORS.mutedForeground} opacity={0.4} />
          <rect x={448} y={318} width={12} height={50} rx={3} fill={COLORS.mutedForeground} opacity={0.4} />

          {/* Running figure — SVG stick figure */}
          <g transform={`translate(${240 + figureX}, 155)`}>
            {/* Head */}
            <circle cx={0} cy={-80} r={22} fill="none" stroke={COLORS.foreground} strokeWidth={4} />

            {/* Body */}
            <line x1={0} y1={-58} x2={0} y2={0} stroke={COLORS.foreground} strokeWidth={4} strokeLinecap="round" />

            {/* Arms */}
            <line
              x1={0} y1={-45}
              x2={-30 + armCycle * 20} y2={-10 + armCycle * 10}
              stroke={COLORS.foreground} strokeWidth={4} strokeLinecap="round"
            />
            <line
              x1={0} y1={-45}
              x2={30 - armCycle * 20} y2={-10 - armCycle * 10}
              stroke={COLORS.foreground} strokeWidth={4} strokeLinecap="round"
            />

            {/* Legs */}
            <line
              x1={0} y1={0}
              x2={-20 + legCycle * 40} y2={60 + legCycle * 20}
              stroke={COLORS.foreground} strokeWidth={4} strokeLinecap="round"
            />
            <line
              x1={0} y1={0}
              x2={20 - legCycle * 40} y2={60 - legCycle * 10}
              stroke={COLORS.foreground} strokeWidth={4} strokeLinecap="round"
            />

            {/* Sweat drops */}
            {progress > 0.4 && (
              <>
                <circle cx={28} cy={-75} r={4} fill={COLORS.cyan} opacity={0.7} />
                <circle cx={35} cy={-65} r={3} fill={COLORS.cyan} opacity={0.5} />
              </>
            )}

            {/* Speed indicator above figure */}
            <text
              x={0}
              y={-115}
              textAnchor="middle"
              fontFamily={FONT_FAMILY_SANS}
              fontSize={18}
              fontWeight={700}
              fill={COLORS.red}
              opacity={speedLineOpacity}
            >
              {`${Math.round(speed * 10)} mph`}
            </text>
          </g>
        </svg>
      </div>

      {/* Text */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 36,
          fontWeight: 700,
          color: COLORS.foreground,
          textAlign: "center",
          opacity: textOpacity,
          letterSpacing: "-0.02em",
          maxWidth: 520,
          lineHeight: 1.2,
        }}
      >
        Most businesses{" "}
        <span style={{ color: COLORS.red }}>can&apos;t keep up.</span>
      </div>
    </AbsoluteFill>
  );
};
