import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../fonts";

interface AvatarSceneProps {
  avatarSrc: string;
  durationFrames: number;
}

/**
 * Check if a static file exists by trying to resolve it.
 * In Remotion studio preview, missing files throw errors.
 * We use a simple flag approach: if the file path points to
 * a known placeholder path, show the placeholder instead.
 */
const PLACEHOLDER_AVATAR = false; // Avatar files are generated

export const AvatarScene: React.FC<AvatarSceneProps> = ({
  avatarSrc,
  durationFrames,
}) => {
  const frame = useCurrentFrame();

  // Pulse animation for placeholder
  const pulseOpacity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.3, 0.6, 0.3],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow={false} />

      {PLACEHOLDER_AVATAR ? (
        /* Placeholder: silhouette + label until HeyGen clips are generated */
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {/* Silhouette circle */}
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS.brand}22, ${COLORS.surface})`,
              border: `2px dashed ${COLORS.brand}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: pulseOpacity,
            }}
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill={COLORS.brand} opacity={0.5} />
              <path
                d="M4 20c0-4 4-7 8-7s8 3 8 7"
                fill={COLORS.brand}
                opacity={0.3}
              />
            </svg>
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY_MONO,
              fontSize: 18,
              color: COLORS.brand,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              opacity: 0.6,
            }}
          >
            HeyGen Avatar
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 14,
              color: COLORS.mutedForeground,
              opacity: 0.4,
            }}
          >
            {avatarSrc}
          </div>
        </AbsoluteFill>
      ) : (
        /* Real avatar video */
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OffthreadVideo
            src={staticFile(avatarSrc)}
            volume={0}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      )}

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
