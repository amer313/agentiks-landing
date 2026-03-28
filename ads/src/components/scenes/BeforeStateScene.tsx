import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { COLORS, mulberry32 } from "../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../fonts";

// Slack-style messages
const slackMessages = [
  "Where's the Q3 report?",
  "Has anyone seen the updated pricing?",
  "Can someone approve this PO?",
  "Who owns the client onboarding doc?",
  "Did we ever fix the API timeout?",
  "Where do I find the brand guidelines?",
  "Is the pipeline data up to date?",
  "Has the invoice been sent?",
  "Who's handling the escalation?",
  "Can you resend that spreadsheet?",
];

const rng = mulberry32(88);

// Pre-generate spreadsheet data deterministically (outside render)
const COL_HEADERS = ["A", "B", "C", "D", "E"];
const ROW_COUNT = 8;
// Which cells should show a red "error" highlight (row, col) pairs
const ERROR_CELLS = new Set(["1-2", "3-0", "3-4", "5-1", "6-3", "7-2"]);
const rngSpread = mulberry32(42);
const SPREAD_DATA: string[][] = Array.from({ length: ROW_COUNT }, () =>
  Array.from({ length: 5 }, () =>
    (Math.floor(rngSpread() * 90000) + 10000).toLocaleString()
  )
);

export const BeforeStateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Spreadsheet (0-90)
  const spreadsheetOpacity = interpolate(
    frame,
    [0, 10, 80, 100],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 2: Slack messages (90-210)
  const slackPhaseOpacity = interpolate(
    frame,
    [80, 100, 200, 220],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 3: Email counter (210-330)
  const emailPhaseOpacity = interpolate(
    frame,
    [200, 220, 320, 340],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 4: Freeze/desaturate (330-390)
  const freezeOpacity = interpolate(
    frame,
    [330, 350],
    [0, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Notification dots in a perfect circle using trigonometry
  const dotCount = 8;
  const centerX = 540; // horizontal center of 1080px frame
  const centerY = 960; // vertical center of 1920px frame
  const dotRadius = 220; // consistent radius for all dots

  const dots = Array.from({ length: dotCount }, (_, i) => {
    const angle = (2 * Math.PI * i) / dotCount;
    return {
      x: centerX + Math.cos(angle) * dotRadius,
      y: centerY + Math.sin(angle) * dotRadius,
      badgeNum: Math.floor(rng() * 99),
    };
  });

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow={false} />

      {/* Phase 1: Spreadsheet grid */}
      <AbsoluteFill style={{ opacity: spreadsheetOpacity }}>
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
          <div
            style={{
              width: 860,
              backgroundColor: "#0A0B10",
              border: `1.5px solid ${COLORS.amber}`,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: `0 0 60px rgba(245,158,11,0.15), 0 0 0 1px rgba(245,158,11,0.1)`,
            }}
          >
            {/* Title bar */}
            <div
              style={{
                padding: "14px 20px",
                borderBottom: `1px solid rgba(245,158,11,0.3)`,
                display: "flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "rgba(245,158,11,0.05)",
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY_MONO,
                  fontSize: 18,
                  color: COLORS.amber,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                }}
              >
                Q3 Operations Report
              </span>
              <span
                style={{
                  fontFamily: FONT_FAMILY_MONO,
                  fontSize: 14,
                  color: COLORS.mutedForeground,
                  marginLeft: "auto",
                }}
              >
                ops_q3_2024.xlsx
              </span>
            </div>

            {/* Column headers */}
            <div
              style={{
                display: "flex",
                borderBottom: `1px solid rgba(245,158,11,0.25)`,
                backgroundColor: "rgba(245,158,11,0.04)",
              }}
            >
              {/* Row number gutter */}
              <div
                style={{
                  width: 48,
                  padding: "10px 8px",
                  fontFamily: FONT_FAMILY_MONO,
                  fontSize: 15,
                  color: "rgba(245,158,11,0.4)",
                  textAlign: "center" as const,
                  borderRight: `1px solid rgba(245,158,11,0.2)`,
                  flexShrink: 0,
                }}
              />
              {COL_HEADERS.map((h) => (
                <div
                  key={h}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    fontFamily: FONT_FAMILY_MONO,
                    fontSize: 15,
                    color: COLORS.amber,
                    textAlign: "center" as const,
                    borderRight: `1px solid rgba(245,158,11,0.15)`,
                    letterSpacing: "0.1em",
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {SPREAD_DATA.map((row, ri) => {
              const rowOpacity = interpolate(
                frame,
                [ri * 4, ri * 4 + 8],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={ri}
                  style={{
                    display: "flex",
                    borderBottom: ri < ROW_COUNT - 1
                      ? `1px solid rgba(245,158,11,0.1)`
                      : "none",
                    opacity: rowOpacity,
                    transform: `translateY(${interpolate(rowOpacity, [0, 1], [8, 0])}px)`,
                  }}
                >
                  {/* Row number */}
                  <div
                    style={{
                      width: 48,
                      padding: "12px 8px",
                      fontFamily: FONT_FAMILY_MONO,
                      fontSize: 14,
                      color: "rgba(245,158,11,0.35)",
                      textAlign: "center" as const,
                      borderRight: `1px solid rgba(245,158,11,0.15)`,
                      flexShrink: 0,
                    }}
                  >
                    {ri + 1}
                  </div>
                  {row.map((cell, ci) => {
                    const isError = ERROR_CELLS.has(`${ri}-${ci}`);
                    return (
                      <div
                        key={ci}
                        style={{
                          flex: 1,
                          padding: "12px 14px",
                          fontFamily: FONT_FAMILY_MONO,
                          fontSize: 16,
                          color: isError ? COLORS.red : "rgba(255,255,255,0.65)",
                          textAlign: "right" as const,
                          borderRight: `1px solid rgba(245,158,11,0.1)`,
                          backgroundColor: isError
                            ? "rgba(239,68,68,0.08)"
                            : "transparent",
                        }}
                      >
                        {cell}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>

      {/* Phase 2: Slack-like messages -- centered, wide, large text */}
      <AbsoluteFill style={{ opacity: slackPhaseOpacity }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Dark card background behind the message list */}
          <div
            style={{
              width: "86%",
              backgroundColor: "rgba(10, 11, 16, 0.75)",
              borderRadius: 16,
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              boxShadow: "0 0 60px rgba(0,0,0,0.6)",
            }}
          >
            {slackMessages.map((msg, i) => {
              const msgFrame = frame - 90;
              const springProgress = spring({
                frame: msgFrame - i * 8,
                fps,
                config: { damping: 14, stiffness: 120, mass: 0.8 },
              });
              const msgOpacity = interpolate(
                msgFrame - i * 8,
                [0, 8],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const msgY = interpolate(springProgress, [0, 1], [20, 0]);

              return (
                <div
                  key={i}
                  style={{
                    opacity: msgOpacity,
                    transform: `translateY(${msgY}px)`,
                    padding: "14px 20px",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderRadius: 10,
                    borderLeft: `4px solid ${COLORS.amber}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_FAMILY_SANS,
                      fontSize: 28,
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.3,
                    }}
                  >
                    {msg}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>

      {/* Phase 3: Email notification badges -- centered */}
      <AbsoluteFill style={{ opacity: emailPhaseOpacity }}>
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
          {/* Inbox icon */}
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke={COLORS.mutedForeground} strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
          </svg>

          {/* Counter -- larger font */}
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 96,
              fontWeight: 700,
              color: COLORS.red,
              marginTop: 20,
              fontFeatureSettings: '"tnum" 1',
              letterSpacing: "-0.02em",
            }}
          >
            {Math.min(
              Math.floor(interpolate(frame - 210, [0, 80], [0, 1247], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })),
              1247
            ).toLocaleString()}
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 20,
              color: COLORS.mutedForeground,
              marginTop: 8,
            }}
          >
            notifications this week
          </div>

          {/* Notification dots in a perfect circle using trigonometry */}
          {dots.map(({ x, y, badgeNum }, i) => {
            const badgeFrame = frame - 220 - i * 8;
            const badgeOpacity = interpolate(badgeFrame, [0, 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x - 6,   // 6 = radius (12px diameter / 2)
                  top: y - 6,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: COLORS.red,
                  opacity: badgeOpacity * 0.75,
                }}
              />
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Phase 4: Freeze overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: "rgba(5,5,8,0.6)",
          opacity: freezeOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
