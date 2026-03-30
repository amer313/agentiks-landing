import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FPS, COLORS } from "../../brand";

interface OrchestratorCoreProps {
  cx: number;
  cy: number;
  size: number;
}

export const OrchestratorCore: React.FC<OrchestratorCoreProps> = ({
  cx,
  cy,
  size,
}) => {
  const frame = useCurrentFrame();

  // Pulsing core
  const pulseCycle = 3 * FPS;
  const pulseProgress = (frame % pulseCycle) / pulseCycle;
  const pulseOpacity = interpolate(
    pulseProgress,
    [0, 0.5, 1],
    [0.5, 0.25, 0.5]
  );

  // Breathing radius
  const breathCycle = 4 * FPS;
  const breathProgress = (frame % breathCycle) / breathCycle;
  const coreRadius = interpolate(
    breathProgress,
    [0, 0.5, 1],
    [size * 0.065, size * 0.073, size * 0.065]
  );

  // Rotating rings
  const ring1Rotation = (frame / FPS) * (360 / 30); // 30s full rotation
  const ring2Rotation = -(frame / FPS) * (360 / 45); // 45s reverse rotation

  return (
    <g>
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={COLORS.brandLight} stopOpacity="1" />
          <stop offset="30%" stopColor={COLORS.brand} stopOpacity="0.6" />
          <stop offset="60%" stopColor={COLORS.brandDark} stopOpacity="0.2" />
          <stop offset="100%" stopColor={COLORS.brandDark} stopOpacity="0" />
        </radialGradient>
        <filter id="coreGlowFilter">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer glow */}
      <circle
        cx={cx}
        cy={cy}
        r={size * 0.1}
        fill="url(#coreGlow)"
        fillOpacity={0.08}
      />

      {/* Breathing core */}
      <circle
        cx={cx}
        cy={cy}
        r={coreRadius}
        fill="url(#coreGlow)"
        fillOpacity={0.12}
        filter="url(#coreGlowFilter)"
      />

      {/* Inner pulsing core */}
      <circle
        cx={cx}
        cy={cy}
        r={size * 0.038}
        fill={COLORS.brand}
        fillOpacity={pulseOpacity}
      />

      {/* Bright center dot */}
      <circle
        cx={cx}
        cy={cy}
        r={size * 0.016}
        fill={COLORS.brandLight}
        fillOpacity={0.9}
        filter="url(#coreGlowFilter)"
      />

      {/* Rotating ring 1 */}
      <circle
        cx={cx}
        cy={cy}
        r={size * 0.055}
        fill="none"
        stroke={COLORS.brand}
        strokeWidth={0.8}
        strokeOpacity={0.2}
        strokeDasharray="4 3"
        transform={`rotate(${ring1Rotation} ${cx} ${cy})`}
      />

      {/* Rotating ring 2 */}
      <circle
        cx={cx}
        cy={cy}
        r={size * 0.085}
        fill="none"
        stroke={COLORS.magenta}
        strokeWidth={0.4}
        strokeOpacity={0.1}
        strokeDasharray="2 8"
        transform={`rotate(${ring2Rotation} ${cx} ${cy})`}
      />
    </g>
  );
};
