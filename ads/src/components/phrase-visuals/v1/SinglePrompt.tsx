import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

const TEMPLATE_TEXT = "Summarize this email and reply professionally.";

export const SinglePrompt: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const boxScale = spring({ frame, fps: FPS, config: { damping: 14, stiffness: 80 }, from: 0.7, to: 1 });
  const boxOpacity = interpolate(progress, [0, 0.15], [0, 1], { extrapolateRight: "clamp" });

  // Cursor blink
  const cursorVisible = Math.floor(frame / (FPS * 0.5)) % 2 === 0;

  // Type out the text
  const charsVisible = Math.floor(interpolate(progress, [0.05, 0.7], [0, TEMPLATE_TEXT.length], { extrapolateRight: "clamp" }));
  const visibleText = TEMPLATE_TEXT.slice(0, charsVisible);

  const labelOpacity = interpolate(progress, [0.7, 0.9], [0, 1], { extrapolateRight: "clamp" });
  const labelY = interpolate(progress, [0.7, 0.9], [16, 0], { extrapolateRight: "clamp" });

  const tagOpacity = interpolate(progress, [0.5, 0.7], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 40,
        background: "transparent",
      }}
    >
      {/* App chrome mockup */}
      <div
        style={{
          opacity: boxOpacity,
          transform: `scale(${boxScale})`,
          width: 560,
          background: COLORS.surface,
          borderRadius: 16,
          border: `1.5px solid ${COLORS.mutedForeground}22`,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            background: COLORS.surface2,
            borderBottom: `1px solid ${COLORS.mutedForeground}11`,
          }}
        >
          {["#EF4444", "#F59E0B", "#10B981"].map((c) => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
          ))}
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 13,
              color: COLORS.mutedForeground,
              marginLeft: 8,
            }}
          >
            AI Assistant v1.0 — Basic Edition
          </span>
        </div>

        {/* Prompt label */}
        <div style={{ padding: "14px 20px 0" }}>
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.mutedForeground,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Prompt Template
          </span>
        </div>

        {/* Input box */}
        <div
          style={{
            margin: "8px 20px 20px",
            padding: "14px 16px",
            background: COLORS.background,
            borderRadius: 10,
            border: `1.5px solid ${COLORS.mutedForeground}22`,
            minHeight: 80,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY_MONO,
              fontSize: 18,
              color: COLORS.foreground,
              lineHeight: 1.5,
            }}
          >
            {visibleText}
            {cursorVisible && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1.1em",
                  background: COLORS.brand,
                  verticalAlign: "text-bottom",
                  marginLeft: 2,
                }}
              />
            )}
          </span>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "0 20px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY_MONO,
              fontSize: 12,
              color: COLORS.mutedForeground + "66",
            }}
          >
            1 template · 0 integrations
          </span>
          <div
            style={{
              padding: "6px 16px",
              background: COLORS.mutedForeground + "22",
              borderRadius: 6,
              opacity: 0.5,
            }}
          >
            <span style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 14, color: COLORS.mutedForeground }}>
              Run
            </span>
          </div>
        </div>
      </div>

      {/* "One prompt template" limitation badge */}
      <div
        style={{
          opacity: tagOpacity,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 20px",
          borderRadius: 999,
          border: `1.5px solid ${COLORS.amber}44`,
          background: COLORS.amber + "11",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2L14 13H2L8 2Z" stroke={COLORS.amber} strokeWidth={1.5} strokeLinejoin="round" />
          <line x1="8" y1="6" x2="8" y2="10" stroke={COLORS.amber} strokeWidth={1.5} />
          <circle cx="8" cy="11.5" r="0.75" fill={COLORS.amber} />
        </svg>
        <span style={{ fontFamily: FONT_FAMILY_SANS, fontSize: 18, fontWeight: 500, color: COLORS.amber }}>
          one prompt template
        </span>
      </div>

      {/* Bottom label */}
      <div
        style={{
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 24,
            fontWeight: 400,
            color: COLORS.mutedForeground,
            fontStyle: "italic",
          }}
        >
          "and call it a day"
        </span>
      </div>
    </AbsoluteFill>
  );
};
