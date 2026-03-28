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
        display: "flex",
        justifyContent: "center",
        gap: 0,
        width: "100%",
        maxWidth: 900,
      }}
    >
      {stats.map((stat, i) => {
        const cellStartFrame = startFrame + i * 5;

        return (
          <div
            key={stat.label}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "16px 8px",
              borderLeft: i > 0 ? `1px dashed ${COLORS.line}` : "none",
            }}
          >
            <AnimatedCounter
              startValue={0}
              endValue={stat.value}
              durationFrames={30}
              suffix={stat.suffix}
              startFrame={cellStartFrame}
              fontSize={28}
              color={COLORS.foreground}
              override={stat.override}
            />
            <div
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 10,
                color: COLORS.mutedForeground,
                marginTop: 4,
                textAlign: "center",
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
