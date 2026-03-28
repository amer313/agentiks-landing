import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const Speedometer: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  // Needle sweeps from -135deg to +135deg (max = redline)
  const needleProgress = spring({
    frame,
    fps: FPS,
    config: { damping: 8, stiffness: 80, mass: 1.2 },
  });
  const needleAngle = interpolate(needleProgress, [0, 1], [-135, 135]);

  // Shake at max
  const shakeAmount = interpolate(progress, [0.6, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shakeX = shakeAmount * (Math.sin(frame * 1.8) * 3);
  const shakeY = shakeAmount * (Math.cos(frame * 2.3) * 2);

  // Glow pulse
  const glowPulse = interpolate(Math.sin(frame * 0.3), [-1, 1], [0.6, 1]);

  const labelOpacity = interpolate(progress, [0, 0.2], [0, 1], { extrapolateRight: "clamp" });

  const cx = 280;
  const cy = 260;
  const r = 200;

  // Tick marks
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const angle = -135 + i * 27;
    const rad = (angle * Math.PI) / 180;
    const isRed = i >= 8;
    return { angle, rad, isRed };
  });

  const needleRad = (needleAngle * Math.PI) / 180;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 24,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Label */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 28,
          fontWeight: 600,
          color: COLORS.mutedForeground,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          opacity: labelOpacity,
        }}
      >
        AI Industry Speed
      </div>

      {/* Gauge SVG */}
      <svg width="560" height="360" viewBox="0 0 560 360">
        {/* Background arc */}
        <path
          d={`M ${cx - r * Math.cos((135 * Math.PI) / 180)} ${cy - r * Math.sin((135 * Math.PI) / 180)} A ${r} ${r} 0 1 1 ${cx + r * Math.cos((45 * Math.PI) / 180)} ${cy - r * Math.sin((45 * Math.PI) / 180)}`}
          fill="none"
          stroke={COLORS.surface2}
          strokeWidth={28}
          strokeLinecap="round"
        />
        {/* Colored arc - green to yellow to red */}
        <defs>
          <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={COLORS.green} />
            <stop offset="50%" stopColor={COLORS.amber} />
            <stop offset="100%" stopColor={COLORS.red} />
          </linearGradient>
        </defs>
        <path
          d={`M ${cx - r * Math.cos((135 * Math.PI) / 180)} ${cy - r * Math.sin((135 * Math.PI) / 180)} A ${r} ${r} 0 1 1 ${cx + r * Math.cos((45 * Math.PI) / 180)} ${cy - r * Math.sin((45 * Math.PI) / 180)}`}
          fill="none"
          stroke="url(#speedGrad)"
          strokeWidth={28}
          strokeLinecap="round"
          opacity={0.9}
        />

        {/* Tick marks */}
        {ticks.map(({ rad, isRed }, i) => (
          <line
            key={i}
            x1={cx + (r - 20) * Math.cos(rad)}
            y1={cy + (r - 20) * Math.sin(rad)}
            x2={cx + (r + 20) * Math.cos(rad)}
            y2={cy + (r + 20) * Math.sin(rad)}
            stroke={isRed ? COLORS.red : COLORS.mutedForeground}
            strokeWidth={isRed ? 4 : 2}
            opacity={isRed ? 0.9 : 0.5}
          />
        ))}

        {/* Redline zone glow */}
        <path
          d={`M ${cx + (r - 14) * Math.cos((63 * Math.PI) / 180)} ${cy + (r - 14) * Math.sin((63 * Math.PI) / 180)} A ${r - 14} ${r - 14} 0 0 1 ${cx + (r - 14) * Math.cos((135 * Math.PI) / 180)} ${cy + (r - 14) * Math.sin((135 * Math.PI) / 180)}`}
          fill="none"
          stroke={COLORS.red}
          strokeWidth={28}
          strokeLinecap="butt"
          opacity={0.15 * glowPulse}
          filter="url(#redGlow)"
        />

        <defs>
          <filter id="redGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + (r - 30) * Math.cos(needleRad)}
          y2={cy + (r - 30) * Math.sin(needleRad)}
          stroke={COLORS.red}
          strokeWidth={5}
          strokeLinecap="round"
        />
        {/* Needle base */}
        <circle cx={cx} cy={cy} r={16} fill={COLORS.surface2} stroke={COLORS.foreground} strokeWidth={3} />
        <circle cx={cx} cy={cy} r={6} fill={COLORS.red} />

        {/* MAXED label */}
        <text
          x={cx}
          y={cy + 70}
          textAnchor="middle"
          fontFamily={FONT_FAMILY_SANS}
          fontSize={28}
          fontWeight={800}
          fill={COLORS.red}
          opacity={shakeAmount}
        >
          MAXED OUT
        </text>
      </svg>
    </AbsoluteFill>
  );
};
