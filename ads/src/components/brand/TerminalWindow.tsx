import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS, TERMINAL_LINES, FPS } from "../../brand";
import { FONT_FAMILY_MONO } from "../../fonts";

interface TerminalWindowProps {
  startFrame: number;
  linesPerSecond?: number;
  width?: number;
  height?: number;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  startFrame,
  linesPerSecond = 1.5,
  width = 380,
  height = 280,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const containerOpacity = interpolate(
    relativeFrame,
    [0, 15],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const framesPerLine = Math.floor(FPS / linesPerSecond);
  const visibleLineCount = Math.min(
    Math.floor(relativeFrame / framesPerLine) + 1,
    TERMINAL_LINES.length
  );

  const visibleLines = TERMINAL_LINES.slice(0, visibleLineCount);

  // Cursor blink
  const cursorVisible = Math.floor(frame / 18) % 2 === 0;

  return (
    <div
      style={{
        width,
        height,
        opacity: containerOpacity,
        borderRadius: 8,
        border: `1px solid ${COLORS.line}`,
        backgroundColor: "rgba(7,8,13,0.95)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          borderBottom: `1px solid ${COLORS.line}`,
          backgroundColor: COLORS.surface,
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "rgba(239,68,68,0.5)",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "rgba(245,158,11,0.5)",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "rgba(16,185,129,0.5)",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 9,
            color: COLORS.mutedForeground,
            opacity: 0.4,
            marginLeft: 4,
          }}
        >
          agentiks -- live ops
        </span>
        <span
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: COLORS.green,
            }}
          />
          <span
            style={{
              fontFamily: FONT_FAMILY_MONO,
              fontSize: 8,
              color: COLORS.green,
              opacity: 0.7,
            }}
          >
            LIVE
          </span>
        </span>
      </div>

      {/* Terminal body */}
      <div
        style={{
          flex: 1,
          padding: 12,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        {visibleLines.map((line, i) => {
          const lineFrame = relativeFrame - i * framesPerLine;
          const lineOpacity = interpolate(
            lineFrame,
            [0, 8],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const lineColor = line.text.includes("\u2713")
            ? COLORS.green
            : line.text.startsWith("\u25b6")
              ? COLORS.brand
              : "rgba(255,255,255,0.35)";

          return (
            <div
              key={i}
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 10,
                lineHeight: 1.6,
                color: lineColor,
                opacity: lineOpacity,
                marginBottom: 2,
                whiteSpace: "nowrap",
              }}
            >
              {line.text}
            </div>
          );
        })}

        {/* Cursor */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginTop: 6,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY_MONO,
              fontSize: 10,
              color: COLORS.brand,
              opacity: 0.4,
            }}
          >
            $
          </span>
          {cursorVisible && (
            <span
              style={{
                width: 5,
                height: 12,
                backgroundColor: COLORS.brand,
                opacity: 0.5,
              }}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "6px 12px",
          borderTop: `1px solid ${COLORS.line}`,
          backgroundColor: COLORS.surface,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 8,
            color: COLORS.mutedForeground,
            opacity: 0.3,
          }}
        >
          16 agents
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 8,
            color: COLORS.mutedForeground,
            opacity: 0.3,
          }}
        >
          48 sub-agents
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 8,
            color: COLORS.green,
            opacity: 0.5,
          }}
        >
          99.97% uptime
        </span>
      </div>
    </div>
  );
};
