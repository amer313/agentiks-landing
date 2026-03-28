import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

type WorkflowNode = {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
};

type WorkflowEdge = {
  from: string;
  to: string;
};

const NODES: WorkflowNode[] = [
  { id: "input", label: "Lead Input", color: COLORS.cyan, x: 80, y: 180 },
  { id: "qualify", label: "Qualify", color: COLORS.brand, x: 240, y: 100 },
  { id: "score", label: "Score", color: COLORS.brand, x: 240, y: 260 },
  { id: "crm", label: "CRM Sync", color: COLORS.amber, x: 420, y: 100 },
  { id: "notify", label: "Notify Sales", color: COLORS.green, x: 420, y: 260 },
  { id: "report", label: "Report", color: COLORS.green, x: 580, y: 180 },
];

const EDGES: WorkflowEdge[] = [
  { from: "input", to: "qualify" },
  { from: "input", to: "score" },
  { from: "qualify", to: "crm" },
  { from: "score", to: "notify" },
  { from: "crm", to: "report" },
  { from: "notify", to: "report" },
];

function getNodeCenter(id: string) {
  const node = NODES.find((n) => n.id === id);
  if (!node) return { cx: 0, cy: 0 };
  return { cx: node.x + 56, cy: node.y + 20 };
}

export const WorkflowMap: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const containerSpring = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 90 } });
  const containerOpacity = interpolate(containerSpring, [0, 0.5], [0, 1]);
  const containerScale = interpolate(containerSpring, [0, 1], [0.86, 1]);

  // Edges draw in progressively
  const edgeProgress = interpolate(progress, [0.05, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ROI badge appears at the end
  const roiSpring = spring({ frame: frame - 18, fps: FPS, config: { damping: 12, stiffness: 180 } });
  const roiScale = interpolate(roiSpring, [0, 1], [0.5, 1]);
  const roiOpacity = interpolate(roiSpring, [0, 0.4], [0, 1]);

  const pulsePhase = (frame * 0.08) % (Math.PI * 2);

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 44,
        }}
      >
        {/* Title */}
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 42,
            fontWeight: 900,
            color: COLORS.foreground,
            letterSpacing: "-0.03em",
          }}
        >
          Map your workflows.{" "}
          <span style={{ color: COLORS.cyan }}>Show the ROI.</span>
        </span>

        {/* Workflow graph */}
        <div
          style={{
            position: "relative",
            width: 700,
            height: 360,
            backgroundColor: COLORS.surface,
            borderRadius: 20,
            border: `1.5px solid rgba(255,255,255,0.07)`,
            overflow: "hidden",
          }}
        >
          <svg
            width="700"
            height="360"
            viewBox="0 0 700 360"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {/* Draw edges */}
            {EDGES.map((edge, i) => {
              const { cx: x1, cy: y1 } = getNodeCenter(edge.from);
              const { cx: x2, cy: y2 } = getNodeCenter(edge.to);
              const edgeReveal = interpolate(edgeProgress, [i / EDGES.length, (i + 1) / EDGES.length], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const lineLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x1 + (x2 - x1) * edgeReveal}
                  y2={y1 + (y2 - y1) * edgeReveal}
                  stroke="rgba(180,0,255,0.35)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {NODES.map((node, i) => {
            const delay = i * 4;
            const nodeSpring = spring({ frame: frame - delay, fps: FPS, config: { damping: 15, stiffness: 160 } });
            const nodeOpacity = interpolate(nodeSpring, [0, 0.4], [0, 1]);
            const nodeScale = interpolate(nodeSpring, [0, 1], [0.6, 1]);
            const pulse = 1 + Math.sin(pulsePhase + i * 0.8) * 0.03;
            return (
              <div
                key={node.id}
                style={{
                  position: "absolute",
                  left: node.x,
                  top: node.y,
                  opacity: nodeOpacity,
                  transform: `scale(${nodeScale * pulse})`,
                  transformOrigin: "center",
                }}
              >
                <div
                  style={{
                    padding: "10px 18px",
                    backgroundColor: `rgba(10,11,16,0.9)`,
                    border: `2px solid ${node.color}`,
                    borderRadius: 10,
                    boxShadow: `0 0 16px ${node.color}40`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_FAMILY_MONO,
                      fontSize: 16,
                      fontWeight: 700,
                      color: node.color,
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {node.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ROI badge */}
        <div
          style={{
            opacity: roiOpacity,
            transform: `scale(${roiScale})`,
            padding: "16px 40px",
            backgroundColor: `rgba(16,185,129,0.1)`,
            border: `2px solid ${COLORS.green}`,
            borderRadius: 100,
            boxShadow: `0 0 40px rgba(16,185,129,0.2)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 32,
              fontWeight: 800,
              color: COLORS.green,
              letterSpacing: "-0.02em",
            }}
          >
            ROI before you spend a dollar
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
