import React from "react";
import { COLORS, TERMINAL_LINES } from "../../brand";
import { FONT_FAMILY_MONO } from "../../fonts";

interface MetricsPanelProps {
  frame: number;
}

const METRICS = [
  {
    label: "Leads Scored",
    baseValue: 3847,
    rate: 0.03,
    suffix: "+12 today",
    suffixColor: "#10B981",
  },
  {
    label: "Tasks Complete",
    baseValue: 1204,
    rate: 0.05,
    suffix: "+34",
    suffixColor: "#10B981",
  },
  {
    label: "Uptime",
    staticValue: "99.97%",
    valueColor: "#10B981",
  },
  {
    label: "Active Agents",
    staticValue: "8/8",
    valueColor: "#10B981",
  },
] as const;

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ frame }) => {
  const visibleLogLines = Math.min(4, Math.floor(frame / 25));

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 56,
        width: 320,
        padding: 16,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {/* Metric cards */}
      {METRICS.map((metric, i) => {
        const displayValue =
          "staticValue" in metric
            ? metric.staticValue
            : Math.floor(
                metric.baseValue + Math.min(frame, 60) * metric.rate
              ).toLocaleString();

        return (
          <div
            key={i}
            style={{
              height: 72,
              backgroundColor: COLORS.surface2,
              borderRadius: 8,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              border: `1px solid ${COLORS.line}`,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 11,
                color: COLORS.mutedForeground,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 4,
              }}
            >
              {metric.label}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY_MONO,
                  fontSize: 24,
                  fontWeight: 700,
                  color:
                    "valueColor" in metric
                      ? metric.valueColor
                      : COLORS.foreground,
                }}
              >
                {displayValue}
              </span>
              {"suffix" in metric && (
                <span
                  style={{
                    fontFamily: FONT_FAMILY_MONO,
                    fontSize: 11,
                    color: metric.suffixColor,
                  }}
                >
                  {metric.suffix}
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* Terminal log section */}
      <div
        style={{
          backgroundColor: COLORS.surface2,
          borderRadius: 8,
          padding: 12,
          border: `1px solid ${COLORS.line}`,
          marginTop: 4,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 10,
            color: COLORS.mutedForeground,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 8,
          }}
        >
          Activity Log
        </div>
        {TERMINAL_LINES.slice(0, visibleLogLines).map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: FONT_FAMILY_MONO,
              fontSize: 11,
              color: COLORS.mutedForeground,
              lineHeight: 1.6,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ color: COLORS.green }}>{">"}</span> {line.text}
          </div>
        ))}
      </div>
    </div>
  );
};
