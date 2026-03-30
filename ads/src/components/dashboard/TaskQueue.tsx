import React from "react";
import { interpolate } from "remotion";
import { COLORS } from "../../brand";
import { FONT_FAMILY_MONO } from "../../fonts";

interface TaskQueueProps {
  frame: number;
}

interface TaskItem {
  agent: string;
  task: string;
  status: "complete" | "processing" | "queued";
}

const TASKS: TaskItem[] = [
  { agent: "Sales Agent", task: "Pipeline scoring batch", status: "complete" },
  {
    agent: "Finance Agent",
    task: "Invoice processing",
    status: "complete",
  },
  {
    agent: "Data Agent",
    task: "Route optimization",
    status: "processing",
  },
  { agent: "HR Agent", task: "Board deck generation", status: "queued" },
  {
    agent: "Compliance Agent",
    task: "SOC2 audit check",
    status: "queued",
  },
];

const CheckIcon: React.FC = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <circle cx={8} cy={8} r={7} fill={COLORS.green} opacity={0.2} />
    <path
      d="M5 8l2 2 4-4"
      stroke={COLORS.green}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon: React.FC = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <circle
      cx={8}
      cy={8}
      r={6}
      stroke={COLORS.mutedForeground}
      strokeWidth={1}
      opacity={0.5}
    />
    <path
      d="M8 5v3l2 1"
      stroke={COLORS.mutedForeground}
      strokeWidth={1}
      strokeLinecap="round"
      opacity={0.5}
    />
  </svg>
);

export const TaskQueue: React.FC<TaskQueueProps> = ({ frame }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 340,
        bottom: 60,
        width: 560,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: FONT_FAMILY_MONO,
          fontSize: 10,
          color: COLORS.mutedForeground,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 4,
        }}
      >
        Task Queue
      </div>

      {TASKS.map((task, i) => {
        const slideY = interpolate(
          frame,
          [i * 12, i * 12 + 15],
          [30, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const itemOpacity = interpolate(
          frame,
          [i * 12, i * 12 + 12],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Processing progress bar
        const progressWidth =
          task.status === "processing"
            ? interpolate(frame, [0, 60], [0, 75], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 0;

        // Amber pulse for processing
        const amberPulse =
          task.status === "processing"
            ? 0.5 + 0.5 * Math.sin(frame * 0.2)
            : 0;

        return (
          <div
            key={i}
            style={{
              height: 48,
              backgroundColor: COLORS.surface2,
              borderRadius: 6,
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: itemOpacity,
              transform: `translateY(${slideY}px)`,
              border: `1px solid ${COLORS.line}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Status icon */}
            <div style={{ flexShrink: 0 }}>
              {task.status === "complete" && <CheckIcon />}
              {task.status === "processing" && (
                <div
                  style={{
                    width: 16,
                    height: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: COLORS.amber,
                      opacity: amberPulse,
                      boxShadow: `0 0 8px ${COLORS.amber}80`,
                    }}
                  />
                </div>
              )}
              {task.status === "queued" && <ClockIcon />}
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: FONT_FAMILY_MONO,
                  fontSize: 13,
                  color: COLORS.foreground,
                }}
              >
                {task.task}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY_MONO,
                  fontSize: 11,
                  color: COLORS.mutedForeground,
                }}
              >
                {task.agent}
              </div>
            </div>

            {/* Processing progress bar */}
            {task.status === "processing" && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: 3,
                  width: `${progressWidth}%`,
                  backgroundColor: COLORS.amber,
                  borderRadius: "0 2px 2px 0",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
