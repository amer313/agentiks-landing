import React from "react";
import { useCurrentFrame, spring } from "remotion";
import { COLORS, FPS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

interface Word {
  word: string;
  startFrame: number;
  endFrame: number;
}

interface AnimatedCaptionProps {
  words: Word[];
  style?: "bottom" | "center";
  fontSize?: number;
}

export const AnimatedCaption: React.FC<AnimatedCaptionProps> = ({
  words,
  style = "bottom",
  fontSize = 32,
}) => {
  const frame = useCurrentFrame();

  // Find the current active word
  const activeIndex = words.findIndex(
    (w) => frame >= w.startFrame && frame < w.endFrame
  );

  if (activeIndex === -1) return null;

  // Show a window of words around the active one
  const windowSize = 3;
  const startIdx = Math.max(0, activeIndex - windowSize);
  const endIdx = Math.min(words.length, activeIndex + windowSize + 1);
  const visibleWords = words.slice(startIdx, endIdx);

  const positionStyle: React.CSSProperties =
    style === "bottom"
      ? { position: "absolute", bottom: "15%", left: 0, right: 0 }
      : { position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)" };

  return (
    <div
      style={{
        ...positionStyle,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: fontSize * 0.3,
        flexWrap: "wrap",
        padding: "0 60px",
      }}
    >
      {visibleWords.map((w, i) => {
        const globalIdx = startIdx + i;
        const isActive = globalIdx === activeIndex;

        const scaleValue = isActive
          ? spring({
              frame: frame - w.startFrame,
              fps: FPS,
              config: { damping: 15, stiffness: 200 },
            })
          : 1;

        const scale = isActive ? 0.95 + scaleValue * 0.05 : 1;

        return (
          <span
            key={globalIdx}
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? COLORS.foreground : COLORS.mutedForeground,
              opacity: isActive ? 1 : 0.4,
              transform: `scale(${scale})`,
              transition: "none",
            }}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );
};
