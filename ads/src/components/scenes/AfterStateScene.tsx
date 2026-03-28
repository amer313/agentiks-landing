import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { DataStreams } from "../backgrounds/DataStreams";
import { AgentCluster } from "../brand/AgentCluster";
import { OrchestratorCore } from "../brand/OrchestratorCore";
import { TerminalWindow } from "../brand/TerminalWindow";
import { FPS } from "../../brand";

export const AfterStateScene: React.FC = () => {
  const frame = useCurrentFrame();

  // SVG viewbox
  const svgSize = 500;
  const pad = svgSize * 0.18;
  const vbSize = svgSize + pad * 2;
  const cx = vbSize / 2;
  const cy = vbSize / 2;

  // Phase 1: Core appears (0-60)
  const coreOpacity = spring({
    frame,
    fps: FPS,
    config: { damping: 20, stiffness: 100 },
  });

  // Phase 2: Agent cluster (60-240)
  const clusterOpacity = interpolate(
    frame,
    [50, 70],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 3: Terminal (120-240)
  const terminalOpacity = interpolate(
    frame,
    [120, 150],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 4: Data streams (240-300)
  const streamsOpacity = interpolate(
    frame,
    [240, 260],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow showCyanGlow glowIntensity={1.5} />

      {/* Orchestrator visualization */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox={`0 0 ${vbSize} ${vbSize}`}
          style={{
            width: "85%",
            maxWidth: 700,
            height: "auto",
            marginTop: -60,
          }}
        >
          {/* Core */}
          <g opacity={coreOpacity}>
            <OrchestratorCore cx={cx} cy={cy} size={svgSize} />
          </g>

          {/* Agent cluster */}
          <g opacity={clusterOpacity}>
            <AgentCluster
              cardCount={6}
              cx={cx}
              cy={cy}
              size={svgSize}
              startFrame={60}
              staggerFrames={6}
            />
          </g>

          {/* Data streams */}
          <g opacity={streamsOpacity}>
            <DataStreams cx={cx} cy={cy} size={svgSize} />
          </g>
        </svg>

        {/* Terminal window */}
        <div
          style={{
            opacity: terminalOpacity,
            marginTop: 20,
          }}
        >
          <TerminalWindow startFrame={0} width={480} height={220} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
