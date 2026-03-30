import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { FPS, COLORS, LOGO_PATHS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

interface LogoRevealProps {
  startFrame?: number;
  durationFrames: number;
  width?: number;
  height?: number;
  showText?: boolean;
}

const PATHS_ORDERED: Array<{
  key: string;
  d: string;
  phase: [number, number];
  isCutout?: boolean;
}> = [
  { key: "visor", d: LOGO_PATHS.visor, phase: [0, 0.3] },
  { key: "visorSlit", d: LOGO_PATHS.visorSlit, phase: [0.2, 0.4], isCutout: true },
  { key: "chevron1", d: LOGO_PATHS.chevron1, phase: [0.3, 0.5] },
  { key: "chevron2", d: LOGO_PATHS.chevron2, phase: [0.4, 0.6] },
  { key: "chevron3", d: LOGO_PATHS.chevron3, phase: [0.5, 0.7] },
  { key: "diamond", d: LOGO_PATHS.diamond, phase: [0.65, 0.85] },
];

export const LogoReveal: React.FC<LogoRevealProps> = ({
  startFrame = 0,
  durationFrames,
  width = 1920,
  height = 1080,
  showText = true,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const progress = relativeFrame / durationFrames;

  // Diamond spring animation
  const diamondSpring = spring({
    frame: Math.max(0, relativeFrame - Math.floor(durationFrames * 0.65)),
    fps: FPS,
    config: { damping: 10, stiffness: 140 },
  });

  // Text fade (80-100% of duration)
  const textOpacity = showText
    ? interpolate(
        progress,
        [0.8, 1.0],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  const scale = 2.5;
  const svgW = 149 * scale;
  const svgH = 157 * scale;
  const logoX = (width - svgW) / 2;
  const logoY = (height - svgH) / 2 - (showText ? 40 : 0);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <filter id="brandGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="blur" in2="SourceGraphic" operator="over" />
          </filter>
        </defs>

        <g transform={`translate(${logoX}, ${logoY}) scale(${scale})`}>
          {PATHS_ORDERED.map((pathDef) => {
            const [phaseStart, phaseEnd] = pathDef.phase;

            if (pathDef.key === "diamond") {
              // Diamond uses spring scale
              const cx = 74.4;
              const cy = 148.9;
              return (
                <path
                  key={pathDef.key}
                  d={pathDef.d}
                  fill={COLORS.brand}
                  opacity={diamondSpring}
                  transform={`translate(${cx}, ${cy}) scale(${diamondSpring}) translate(${-cx}, ${-cy})`}
                />
              );
            }

            if (pathDef.isCutout) {
              // Visor slit -- fades in as cutout
              const slitOpacity = interpolate(
                progress,
                [phaseStart, phaseEnd],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <path
                  key={pathDef.key}
                  d={pathDef.d}
                  fill={COLORS.background}
                  opacity={slitOpacity}
                />
              );
            }

            // Chevrons and visor -- clip-path reveal via translateY
            const reveal = interpolate(
              progress,
              [phaseStart, phaseEnd],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const pathOpacity = interpolate(
              reveal,
              [0, 0.1],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <path
                key={pathDef.key}
                d={pathDef.d}
                fill={COLORS.brand}
                opacity={pathOpacity}
                filter={reveal > 0.5 ? "url(#brandGlow)" : undefined}
              />
            );
          })}
        </g>
      </svg>

      {/* AGENTIKS text */}
      {showText && (
        <div
          style={{
            position: "absolute",
            top: logoY + svgH + 30,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: textOpacity,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 48,
              fontWeight: 600,
              color: COLORS.foreground,
              letterSpacing: "0.3em",
            }}
          >
            AGENTIKS
          </div>
        </div>
      )}
    </div>
  );
};
