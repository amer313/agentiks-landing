import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
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

export const BeforeStateScene: React.FC = () => {
  const frame = useCurrentFrame();

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

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow={false} />

      {/* Phase 1: Spreadsheet grid */}
      <AbsoluteFill style={{ opacity: spreadsheetOpacity }}>
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "8%",
            right: "8%",
          }}
        >
          {Array.from({ length: 10 }, (_, ri) => (
            <div key={ri} style={{ display: "flex", gap: 2, marginBottom: 2 }}>
              {Array.from({ length: 4 }, (_, ci) => {
                const cellVisible = frame > ri * 3 + ci * 2;
                return (
                  <div
                    key={ci}
                    style={{
                      flex: 1,
                      padding: "6px 10px",
                      backgroundColor: "rgba(255,255,255,0.02)",
                      border: `1px solid ${COLORS.line}`,
                      fontFamily: FONT_FAMILY_MONO,
                      fontSize: 12,
                      color: COLORS.mutedForeground,
                      opacity: cellVisible ? 0.6 : 0,
                      textAlign: "right",
                    }}
                  >
                    {Math.floor(rng() * 99999).toLocaleString()}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* Phase 2: Slack-like messages */}
      <AbsoluteFill style={{ opacity: slackPhaseOpacity }}>
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            right: "10%",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {slackMessages.map((msg, i) => {
            const msgFrame = (frame - 90) - i * 10;
            const msgOpacity = interpolate(
              msgFrame,
              [0, 8],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const msgY = interpolate(
              msgFrame,
              [0, 8],
              [10, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: msgOpacity,
                  transform: `translateY(${msgY}px)`,
                  padding: "10px 16px",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderRadius: 8,
                  borderLeft: `3px solid ${COLORS.amber}`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY_SANS,
                    fontSize: 16,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {msg}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Phase 3: Email notification badges */}
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

          {/* Counter */}
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 80,
              fontWeight: 700,
              color: COLORS.red,
              marginTop: 20,
              fontFeatureSettings: '"tnum" 1',
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

          {/* Red badges scattered */}
          {Array.from({ length: 8 }, (_, i) => {
            const badgeFrame = frame - 220 - i * 8;
            const badgeOpacity = interpolate(badgeFrame, [0, 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const angle = (i / 8) * Math.PI * 2 + 0.5;
            const radius = 180 + i * 15;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 540 + Math.cos(angle) * radius - 12,
                  top: 960 + Math.sin(angle) * radius - 12,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: COLORS.red,
                  opacity: badgeOpacity * 0.6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "white",
                  fontFamily: FONT_FAMILY_SANS,
                }}
              >
                {Math.floor(rng() * 99)}
              </div>
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
