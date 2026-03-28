import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

// Simple upward growth path points (normalized 0-1)
const PATH_POINTS: Array<[number, number]> = [
  [0, 0.85],
  [0.12, 0.82],
  [0.22, 0.75],
  [0.32, 0.72],
  [0.44, 0.60],
  [0.55, 0.50],
  [0.65, 0.38],
  [0.75, 0.28],
  [0.85, 0.16],
  [0.94, 0.08],
  [1.0, 0.04],
];

const CHART_W = 640;
const CHART_H = 300;

function buildPathD(points: Array<[number, number]>, revealFraction: number): string {
  if (revealFraction <= 0) return "";
  const maxIndex = Math.max(1, Math.floor(points.length * revealFraction));
  const fraction = (points.length * revealFraction) % 1;

  const visible = points.slice(0, maxIndex + 1);

  // If we need to interpolate the last point
  if (fraction > 0 && maxIndex < points.length - 1) {
    const prev = points[maxIndex - 1] ?? points[0];
    const next = points[maxIndex];
    const interp: [number, number] = [
      prev[0] + (next[0] - prev[0]) * fraction,
      prev[1] + (next[1] - prev[1]) * fraction,
    ];
    visible[visible.length - 1] = interp;
  }

  return visible
    .map(([x, y], i) => {
      const px = x * CHART_W;
      const py = y * CHART_H;
      return i === 0 ? `M ${px} ${py}` : `L ${px} ${py}`;
    })
    .join(" ");
}

export const GrowthChart: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const containerSpring = spring({ frame, fps: FPS, config: { damping: 16, stiffness: 90 } });
  const containerOpacity = interpolate(containerSpring, [0, 0.5], [0, 1]);
  const containerScale = interpolate(containerSpring, [0, 1], [0.85, 1]);

  const lineProgress = interpolate(progress, [0, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pathD = buildPathD(PATH_POINTS, lineProgress);

  // Current value at line tip
  const lastPoint = PATH_POINTS[PATH_POINTS.length - 1];
  const tipIndex = Math.min(
    PATH_POINTS.length - 1,
    Math.floor(lineProgress * (PATH_POINTS.length - 1))
  );
  const tipX = PATH_POINTS[tipIndex][0] * CHART_W;
  const tipY = PATH_POINTS[tipIndex][1] * CHART_H;

  const glowPulse = 0.6 + Math.sin(frame * 0.12) * 0.3;

  const arrowSpring = spring({
    frame: Math.max(0, frame - 20),
    fps: FPS,
    config: { damping: 10, stiffness: 200 },
  });
  const arrowOpacity = interpolate(arrowSpring, [0, 0.5], [0, 1]);
  const arrowScale = interpolate(arrowSpring, [0, 1], [0.3, 1]);

  const labelOpacity = interpolate(progress, [0.6, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 40,
      }}
    >
      {/* Headline */}
      <div
        style={{
          opacity: containerOpacity,
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 52,
          fontWeight: 900,
          color: COLORS.foreground,
          letterSpacing: "-0.03em",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        Grow the{" "}
        <span
          style={{
            color: COLORS.green,
            textShadow: `0 0 40px ${COLORS.green}70`,
          }}
        >
          business.
        </span>
      </div>

      {/* Chart */}
      <div
        style={{
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Ambient glow under chart */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: 0,
            right: 0,
            height: 80,
            background: `linear-gradient(0deg, ${COLORS.green}18, transparent)`,
            filter: "blur(20px)",
            opacity: lineProgress,
          }}
        />

        <svg
          width={CHART_W}
          height={CHART_H + 20}
          viewBox={`0 -10 ${CHART_W} ${CHART_H + 20}`}
          style={{ overflow: "visible" }}
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <line
              key={pct}
              x1={0}
              y1={pct * CHART_H}
              x2={CHART_W}
              y2={pct * CHART_H}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={1}
            />
          ))}

          {/* Area fill */}
          <path
            d={
              pathD
                ? `${pathD} L ${tipX} ${CHART_H} L 0 ${CHART_H} Z`
                : ""
            }
            fill={`${COLORS.green}15`}
          />

          {/* Main line */}
          <path
            d={pathD}
            fill="none"
            stroke={COLORS.green}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 12px ${COLORS.green}90)` }}
          />

          {/* Glowing tip dot */}
          {lineProgress > 0.05 && (
            <>
              <circle
                cx={tipX}
                cy={tipY}
                r={14}
                fill={`${COLORS.green}20`}
                opacity={glowPulse}
              />
              <circle
                cx={tipX}
                cy={tipY}
                r={7}
                fill={COLORS.green}
                style={{ filter: `drop-shadow(0 0 10px ${COLORS.green})` }}
              />
            </>
          )}

          {/* Baseline */}
          <line x1={0} y1={CHART_H} x2={CHART_W} y2={CHART_H} stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} />
        </svg>
      </div>

      {/* Arrow + label row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: arrowOpacity,
          transform: `scale(${arrowScale})`,
          position: "relative",
          zIndex: 2,
        }}
      >
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <path
            d="M26 44 L26 8 M12 22 L26 8 L40 22"
            stroke={COLORS.green}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 10px ${COLORS.green})` }}
          />
        </svg>
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 48,
            fontWeight: 900,
            color: COLORS.green,
            letterSpacing: "-0.02em",
            textShadow: `0 0 40px ${COLORS.green}60`,
          }}
        >
          Revenue up. Costs down.
        </span>
      </div>

      {/* Sublabel */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 26,
          fontWeight: 500,
          color: COLORS.mutedForeground,
          textAlign: "center",
          letterSpacing: "0.04em",
          opacity: labelOpacity,
          position: "relative",
          zIndex: 2,
        }}
      >
        Actually grows the business.
      </div>
    </AbsoluteFill>
  );
};
