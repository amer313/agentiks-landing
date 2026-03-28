import React from "react";
import { AbsoluteFill } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { HexGrid } from "../backgrounds/HexGrid";
import { KineticText } from "../typography/KineticText";
import { COLORS } from "../../brand";

interface TextSlamSceneProps {
  text: string;
  glitchColor?: string;
  fontSize?: number;
}

export const TextSlamScene: React.FC<TextSlamSceneProps> = ({
  text,
  glitchColor = COLORS.cyan,
  fontSize = 72,
}) => {
  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow showCyanGlow />
      {/* Subtle hex grid in background */}
      <AbsoluteFill>
        <svg width="100%" height="100%" viewBox="0 0 1080 1920">
          <HexGrid cx={540} cy={960} size={600} opacity={0.3} />
        </svg>
      </AbsoluteFill>
      <KineticText
        text={text}
        glitchColor={glitchColor}
        holdFrames={50}
        fontSize={fontSize}
      />
    </AbsoluteFill>
  );
};
