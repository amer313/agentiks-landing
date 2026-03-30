import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FPS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";
import {
  DashboardShell,
  Sidebar,
  OrchestratorGraph,
  MetricsPanel,
  TaskQueue,
  MouseCursor,
} from "../dashboard";

const CURSOR_PATH = [
  { x: 960, y: 400, frame: 90 },
  { x: 700, y: 540, frame: 110 },
  { x: 960, y: 620, frame: 130 },
];

export const DashboardDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Frames 0-30: Dashboard fade in
  const dashboardOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dashboardScale = spring({
    frame,
    fps: FPS,
    config: { damping: 14, stiffness: 80 },
    from: 0.85,
    to: 1,
  });

  // Frames 30-90: Sidebar agents populate
  const sidebarCount =
    frame < 30 ? 0 : Math.min(8, Math.floor((frame - 30) / 7.5));

  // Frames 60-120: Orchestrator graph
  const orchestratorProgress = interpolate(frame, [60, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Frames 100-180: Metrics panel
  const metricsFrame = Math.max(0, frame - 100);

  // Frames 120-180: Task queue
  const taskFrame = Math.max(0, frame - 120);

  // Deploy Agent button click at frame 130
  const isClickFrame =
    frame >= 130 && frame < 135;
  const buttonScale = isClickFrame ? 0.95 : 1;

  // Text overlay frames 140-180
  const textOpacity = interpolate(frame, [140, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${dashboardScale})`,
        }}
      >
        <DashboardShell opacity={dashboardOpacity}>
          {/* Sidebar */}
          <Sidebar visibleCount={sidebarCount} />

          {/* Orchestrator Graph */}
          <OrchestratorGraph progress={orchestratorProgress} />

          {/* Deploy Agent button */}
          <div
            style={{
              position: "absolute",
              left: 700,
              top: 600,
              zIndex: 3,
            }}
          >
            <div
              style={{
                backgroundColor: COLORS.brand,
                color: "#FFFFFF",
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 16,
                fontWeight: 700,
                padding: "12px 24px",
                borderRadius: 8,
                transform: `scale(${buttonScale})`,
                boxShadow: `0 0 20px ${COLORS.brand}40`,
                cursor: "pointer",
              }}
            >
              Deploy Agent
            </div>
          </div>

          {/* Task Queue */}
          {frame >= 120 && <TaskQueue frame={taskFrame} />}

          {/* Metrics Panel */}
          {frame >= 100 && <MetricsPanel frame={metricsFrame} />}

          {/* Mouse Cursor */}
          {frame >= 90 && (
            <MouseCursor path={CURSOR_PATH} clickFrame={130} />
          )}
        </DashboardShell>
      </div>

      {/* Text overlay */}
      {frame >= 140 && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: textOpacity,
            zIndex: 200,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 36,
              fontWeight: 300,
              color: COLORS.foreground,
              textShadow: "0 2px 20px rgba(0,0,0,0.8)",
            }}
          >
            AI agents that run your workflows. 24/7.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
