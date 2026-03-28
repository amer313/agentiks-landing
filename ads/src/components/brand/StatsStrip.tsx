import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, STATS } from "../../brand";
import type { Stat } from "../../types";
import { FONT_FAMILY_MONO } from "../../fonts";
import { AnimatedCounter } from "../typography/AnimatedCounter";

interface StatsStripProps {
  startFrame: number;
  stats?: Stat[];
}

export const StatsStrip: React.FC<StatsStripProps> = ({
  startFrame,
  stats = STATS,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        width: "100%",
        border: `1px dashed rgba(255,255,255,0.08)`,
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {stats.map((stat, i) => {
        const cellStartFrame = startFrame + i * 5;

        return (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "24px 16px",
              borderRight:
                i < stats.length - 1
                  ? `1px dashed rgba(255,255,255,0.08)`
                  : "none",
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontWeight: 300,
                fontSize: 36,
                letterSpacing: "-0.02em",
                color: COLORS.foreground,
                marginBottom: 4,
              }}
            >
              <AnimatedCounter
                startValue={0}
                endValue={stat.value}
                durationFrames={30}
                suffix={stat.suffix}
                startFrame={cellStartFrame}
                fontSize={36}
                color={COLORS.foreground}
                override={stat.override}
              />
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 10,
                color: COLORS.mutedForeground,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                whiteSpace: "nowrap",
              }}
            >
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
