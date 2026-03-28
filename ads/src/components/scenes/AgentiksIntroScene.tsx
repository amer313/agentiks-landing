import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { HexGrid } from "../backgrounds/HexGrid";
import { NeuralWeb } from "../backgrounds/NeuralWeb";
import { ScanRings } from "../backgrounds/ScanRings";
import { LogoReveal } from "../brand/LogoReveal";
import { AgentCluster } from "../brand/AgentCluster";
import { OrchestratorCore } from "../brand/OrchestratorCore";
import { TerminalWindow } from "../brand/TerminalWindow";

export const AgentiksIntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // SVG viewbox for the orchestrator visualization
  const svgSize = 600;
  const pad = svgSize * 0.18;
  const vbSize = svgSize + pad * 2;
  const cx = vbSize / 2;
  const cy = vbSize / 2;

  // Phase 1: Logo reveal (frames 0-90)
  const logoPhase = frame < 90;

  // Phase 2: Orchestrator builds up (frames 90-300)
  const orchestratorOpacity = interpolate(
    frame,
    [60, 90],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 3: Terminal fades in (frames 300-360)
  const terminalOpacity = interpolate(
    frame,
    [300, 330],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow showCyanGlow glowIntensity={1.5} />

      {/* Logo reveal (first 90 frames) */}
      {logoPhase && (
        <LogoReveal
          startFrame={0}
          durationFrames={90}
          width={1080}
          height={1920}
        />
      )}

      {/* Orchestrator visualization */}
      <AbsoluteFill
        style={{
          opacity: orchestratorOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox={`0 0 ${vbSize} ${vbSize}`}
          style={{
            width: "90%",
            maxWidth: 800,
            height: "auto",
            marginTop: -100,
          }}
        >
          <HexGrid cx={cx} cy={cy} size={svgSize} opacity={0.5} />
          <NeuralWeb cx={cx} cy={cy} size={svgSize} opacity={0.6} />
          <ScanRings cx={cx} cy={cy} size={svgSize} />
          <OrchestratorCore cx={cx} cy={cy} size={svgSize} />
          <AgentCluster
            cardCount={6}
            cx={cx}
            cy={cy}
            size={svgSize}
            startFrame={90}
            staggerFrames={5}
          />
        </svg>

        {/* Terminal window below */}
        <div
          style={{
            opacity: terminalOpacity,
            marginTop: 20,
          }}
        >
          <TerminalWindow startFrame={0} width={500} height={250} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
