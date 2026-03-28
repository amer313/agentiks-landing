import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";
import { AnimatedCounter } from "../typography/AnimatedCounter";

interface MetricPanel {
  label: string;
  endValue: number;
  prefix: string;
  suffix: string;
  color: string;
  direction: "up" | "down";
}

const metrics: MetricPanel[] = [
  { label: "Revenue", endValue: 34, prefix: "+", suffix: "%", color: COLORS.green, direction: "up" },
  { label: "Costs", endValue: 47, prefix: "-", suffix: "%", color: COLORS.cyan, direction: "down" },
  { label: "Team Capacity", endValue: 60, prefix: "+", suffix: "%", color: COLORS.brand, direction: "up" },
];

export const ResultsScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow showCyanGlow />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: "0 60px",
        }}
      >
        {metrics.map((metric, i) => {
          const panelStartFrame = i * 60;
          const panelOpacity = interpolate(
            frame,
            [panelStartFrame, panelStartFrame + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const slideX = interpolate(
            frame,
            [panelStartFrame, panelStartFrame + 20],
            [50, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Glow intensification after all panels visible
          const glowIntensity = frame >= 180
            ? interpolate(frame, [180, 240], [1, 1.5], { extrapolateRight: "clamp" })
            : 1;

          return (
            <div
              key={metric.label}
              style={{
                opacity: panelOpacity,
                transform: `translateX(${slideX}px)`,
                width: "100%",
                maxWidth: 700,
                padding: "24px 32px",
                backgroundColor: "rgba(10,11,16,0.6)",
                border: `1px dashed ${COLORS.line}`,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                gap: 24,
                boxShadow: frame >= 180 ? `0 0 ${20 * glowIntensity}px ${metric.color}15` : "none",
              }}
            >
              {/* Direction arrow */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke={metric.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {metric.direction === "up" ? (
                  <>
                    <path d="M12 19V5" />
                    <path d="M5 12l7-7 7 7" />
                  </>
                ) : (
                  <>
                    <path d="M12 5v14" />
                    <path d="M19 12l-7 7-7-7" />
                  </>
                )}
              </svg>

              {/* Label */}
              <div
                style={{
                  flex: 1,
                  fontFamily: FONT_FAMILY_SANS,
                  fontSize: 24,
                  fontWeight: 500,
                  color: COLORS.foreground,
                }}
              >
                {metric.label}
              </div>

              {/* Counter */}
              <AnimatedCounter
                startValue={0}
                endValue={metric.endValue}
                durationFrames={40}
                prefix={metric.prefix}
                suffix={metric.suffix}
                startFrame={panelStartFrame}
                fontSize={48}
                color={metric.color}
              />
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
