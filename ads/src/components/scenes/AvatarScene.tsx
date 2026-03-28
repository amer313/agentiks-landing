import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";

interface AvatarSceneProps {
  avatarSrc: string;
  durationFrames: number;
}

export const AvatarScene: React.FC<AvatarSceneProps> = ({
  avatarSrc,
  durationFrames,
}) => {
  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow={false} />
      {/* Avatar video overlay */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <OffthreadVideo
          src={staticFile(avatarSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>
      {/* Vignette overlay at edges */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(5,5,8,0.6) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
