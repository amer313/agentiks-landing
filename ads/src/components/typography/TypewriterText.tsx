import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../../brand";
import { FONT_FAMILY_MONO } from "../../fonts";

interface TypewriterTextProps {
  text: string;
  charsPerFrame?: number;
  startFrame?: number;
  cursorColor?: string;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  charsPerFrame = 1,
  startFrame = 0,
  cursorColor = COLORS.brand,
  fontSize = 24,
  color = COLORS.foreground,
  fontFamily = FONT_FAMILY_MONO,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const visibleChars = Math.min(
    Math.floor(relativeFrame * charsPerFrame),
    text.length
  );

  const isComplete = visibleChars >= text.length;
  const cursorVisible = !isComplete || Math.floor(frame / 15) % 2 === 0;

  return (
    <div
      style={{
        fontFamily,
        fontSize,
        color,
        whiteSpace: "pre-wrap",
        lineHeight: 1.5,
      }}
    >
      {text.slice(0, visibleChars)}
      {cursorVisible && (
        <span
          style={{
            display: "inline-block",
            width: fontSize * 0.55,
            height: fontSize * 0.8,
            backgroundColor: cursorColor,
            opacity: 0.7,
            verticalAlign: "text-bottom",
            marginLeft: 1,
          }}
        />
      )}
    </div>
  );
};
