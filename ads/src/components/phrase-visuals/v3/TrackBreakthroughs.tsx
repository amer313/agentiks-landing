import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

// Radar blips — deterministic positions
const BLIPS = [
  { r: 55, angle: 30, delay: 0.15, label: "GPT-5" },
  { r: 95, angle: 110, delay: 0.3, label: "MCP v2" },
  { r: 70, angle: 200, delay: 0.45, label: "Gemini 3" },
  { r: 120, angle: 310, delay: 0.6, label: "Claude 4" },
  { r: 40, angle: 260, delay: 0.75, label: "Flux 3" },
];

export const TrackBreakthroughs: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const sceneIn = spring({ frame, fps: FPS, config: { damping: 20, stiffness: 120 } });

  // Sweeping radar line angle
  const sweepAngle = (frame * 2.5) % 360;
  const sweepRad = (sweepAngle * Math.PI) / 180;

  const cx = 280;
  const cy = 230;
  const maxR = 150;

  const labelOpacity = interpolate(progress, [0.6, 0.85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
      {/* Radar display */}
      <svg width="560" height="460" viewBox="0 0 560 460" style={{ overflow: "visible" }}>
        {/* Background circles */}
        {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={maxR * ratio}
            fill="none"
            stroke={COLORS.green}
            strokeWidth={1}
            opacity={0.2}
          />
        ))}

        {/* Cross hairs */}
        <line x1={cx - maxR - 10} y1={cy} x2={cx + maxR + 10} y2={cy} stroke={COLORS.green} strokeWidth={1} opacity={0.15} />
        <line x1={cx} y1={cy - maxR - 10} x2={cx} y2={cy + maxR + 10} stroke={COLORS.green} strokeWidth={1} opacity={0.15} />

        {/* Sweep gradient */}
        <defs>
          <radialGradient id="sweepGrad" cx="0%" cy="50%" r="100%">
            <stop offset="0%" stopColor={COLORS.green} stopOpacity={0} />
            <stop offset="100%" stopColor={COLORS.green} stopOpacity={0.5} />
          </radialGradient>
        </defs>
        {/* Sweep sector */}
        <path
          d={`M ${cx} ${cy} L ${cx + maxR * Math.cos(sweepRad - 0.3)} ${cy + maxR * Math.sin(sweepRad - 0.3)} A ${maxR} ${maxR} 0 0 1 ${cx + maxR * Math.cos(sweepRad)} ${cy + maxR * Math.sin(sweepRad)} Z`}
          fill={COLORS.green}
          opacity={0.12}
        />
        {/* Sweep line */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + maxR * Math.cos(sweepRad)}
          y2={cy + maxR * Math.sin(sweepRad)}
          stroke={COLORS.green}
          strokeWidth={2}
          opacity={0.7}
        />

        {/* Blips */}
        {BLIPS.map((blip, i) => {
          const visible = progress > blip.delay;
          if (!visible) return null;

          const blipProgress = Math.min(1, (progress - blip.delay) / 0.1);
          const rad = (blip.angle * Math.PI) / 180;
          const bx = cx + blip.r * Math.cos(rad);
          const by = cy + blip.r * Math.sin(rad);

          // Ping animation
          const pingFrame = Math.max(0, frame - blip.delay * durationFrames);
          const pingScale = ((pingFrame * 0.08) % 2);
          const pingOpacity = 1 - (pingScale / 2);

          return (
            <g key={i}>
              {/* Ping ring */}
              <circle
                cx={bx}
                cy={by}
                r={6 + pingScale * 14}
                fill="none"
                stroke={COLORS.green}
                strokeWidth={2}
                opacity={pingOpacity * 0.5}
              />
              {/* Blip dot */}
              <circle
                cx={bx}
                cy={by}
                r={5}
                fill={COLORS.green}
                opacity={blipProgress}
              />
              {/* Label */}
              <text
                x={bx + 10}
                y={by - 8}
                fontFamily={FONT_FAMILY_MONO}
                fontSize={13}
                fill={COLORS.green}
                opacity={blipProgress * 0.8}
              >
                {blip.label}
              </text>
            </g>
          );
        })}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={4} fill={COLORS.green} />
      </svg>

      {/* Label */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 36,
          fontWeight: 700,
          color: COLORS.foreground,
          textAlign: "center",
          opacity: labelOpacity,
          letterSpacing: "-0.02em",
        }}
      >
        Tracking breakthroughs.
      </div>
    </AbsoluteFill>
  );
};
