import React from "react";
import { AbsoluteFill } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { HexGrid } from "../backgrounds/HexGrid";
import { NeuralWeb } from "../backgrounds/NeuralWeb";
import { AgentCluster } from "../brand/AgentCluster";
import { OrchestratorCore } from "../brand/OrchestratorCore";
import { CTAButton } from "../brand/CTAButton";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

export const OrchestratorStillScene: React.FC = () => {
  // Static scene -- single frame. All springs will be at rest state (frame=1000 ensures full animation)
  const svgSize = 500;
  const pad = svgSize * 0.18;
  const vbSize = svgSize + pad * 2;
  const cx = vbSize / 2;
  const cy = vbSize / 2;

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow showCyanGlow glowIntensity={1.5} />

      {/* Header text */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 40,
            fontWeight: 500,
            color: COLORS.foreground,
            lineHeight: 1.2,
          }}
        >
          Your entire operation.
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 40,
            fontWeight: 500,
            color: COLORS.brand,
            lineHeight: 1.2,
          }}
        >
          Automated.
        </div>
      </div>

      {/* SVG visualization */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox={`0 0 ${vbSize} ${vbSize}`}
          style={{
            width: "90%",
            height: "auto",
            maxWidth: 800,
          }}
        >
          <HexGrid cx={cx} cy={cy} size={svgSize} opacity={0.3} />
          <NeuralWeb cx={cx} cy={cy} size={svgSize} opacity={0.4} />
          <OrchestratorCore cx={cx} cy={cy} size={svgSize} />
          <AgentCluster
            cardCount={6}
            cx={cx}
            cy={cy}
            size={svgSize}
            startFrame={-1000}
            staggerFrames={0}
          />
        </svg>
      </AbsoluteFill>

      {/* CTA button at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CTAButton text="Book a Free Strategy Call" />
      </div>
    </AbsoluteFill>
  );
};
