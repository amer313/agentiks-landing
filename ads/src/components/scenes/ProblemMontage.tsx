import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FPS, mulberry32 } from "../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../fonts";

/* ---------- Panel 1: Email Inbox ---------- */
const EmailPanel: React.FC = () => {
  const frame = useCurrentFrame();

  const counter = Math.floor(
    interpolate(frame, [0, 45], [47, 238], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const captionScale = spring({
    frame: Math.max(0, frame - 10),
    fps: FPS,
    config: { damping: 12, stiffness: 200 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Email inbox card */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: 700,
          background: COLORS.surface,
          borderRadius: 16,
          padding: 24,
          border: `1px solid ${COLORS.line}`,
        }}
      >
        {/* Header with badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.foreground,
            }}
          >
            Inbox
          </div>
          <div
            style={{
              background: COLORS.brand,
              color: "#fff",
              fontFamily: FONT_FAMILY_MONO,
              fontSize: 14,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 12,
            }}
          >
            {counter}
          </div>
        </div>

        {/* Email rows */}
        {Array.from({ length: 6 }).map((_, i) => {
          const slideIn = interpolate(
            frame,
            [i * 4, i * 4 + 12],
            [100, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const rowOpacity = interpolate(
            frame,
            [i * 4, i * 4 + 8],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                height: 40,
                background: COLORS.surface2,
                borderRadius: 8,
                marginBottom: 8,
                opacity: rowOpacity,
                transform: `translateX(${slideIn}px)`,
              }}
            />
          );
        })}
      </div>

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          transform: `scale(${captionScale})`,
          opacity: captionScale,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.foreground,
          }}
        >
          Manual workflows.
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Panel 2: Spreadsheet ---------- */
const SpreadsheetPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const rng = mulberry32(frame * 7);

  const captionScale = spring({
    frame: Math.max(0, frame - 10),
    fps: FPS,
    config: { damping: 12, stiffness: 200 },
  });

  const ROWS = 6;
  const COLS = 8;

  // Pick 3-4 random cells to flash red
  const flashCells = new Set<string>();
  const count = 3 + Math.floor(rng() * 2);
  for (let n = 0; n < count; n++) {
    const r = Math.floor(rng() * ROWS);
    const c = Math.floor(rng() * COLS);
    flashCells.add(`${r}-${c}`);
  }

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 80px)`,
            gridTemplateRows: `repeat(${ROWS}, 40px)`,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {Array.from({ length: ROWS * COLS }).map((_, idx) => {
            const r = Math.floor(idx / COLS);
            const c = idx % COLS;
            const isFlashing = flashCells.has(`${r}-${c}`);
            return (
              <div
                key={idx}
                style={{
                  borderRight: `1px solid ${COLORS.line}`,
                  borderBottom: `1px solid ${COLORS.line}`,
                  background: isFlashing
                    ? `${COLORS.brand}33`
                    : "transparent",
                  transition: "background 0.1s",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          transform: `scale(${captionScale})`,
          opacity: captionScale,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.foreground,
          }}
        >
          Bottlenecks.
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Panel 3: Chat Messages ---------- */
const ChatPanel: React.FC = () => {
  const frame = useCurrentFrame();

  const messages = [
    "Can you check this?",
    "Where is the report?",
    "Need this ASAP",
    "Following up...",
    "Did you see my last message?",
  ];

  const notifCount = Math.floor(
    interpolate(frame, [0, 40], [3, 12], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const captionScale = spring({
    frame: Math.max(0, frame - 10),
    fps: FPS,
    config: { damping: 12, stiffness: 200 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Notification badge */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 200,
          background: COLORS.brand,
          color: "#fff",
          fontFamily: FONT_FAMILY_MONO,
          fontSize: 16,
          fontWeight: 700,
          padding: "6px 14px",
          borderRadius: 16,
        }}
      >
        {notifCount}
      </div>

      {/* Chat bubbles */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: 500,
        }}
      >
        {messages.map((msg, i) => {
          const slideIn = interpolate(
            frame,
            [i * 6, i * 6 + 12],
            [80, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const bubbleOpacity = interpolate(
            frame,
            [i * 6, i * 6 + 8],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const isRight = i % 2 === 1;
          return (
            <div
              key={i}
              style={{
                alignSelf: isRight ? "flex-end" : "flex-start",
                background: COLORS.surface2,
                padding: "12px 20px",
                borderRadius: 16,
                maxWidth: 400,
                opacity: bubbleOpacity,
                transform: `translateX(${isRight ? slideIn : -slideIn}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY_SANS,
                  fontSize: 16,
                  color: COLORS.foreground,
                }}
              >
                {msg}
              </span>
            </div>
          );
        })}
      </div>

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          transform: `scale(${captionScale})`,
          opacity: captionScale,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.foreground,
          }}
        >
          Wasted hours.
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Panel 4: Clock ---------- */
const ClockPanel: React.FC = () => {
  const frame = useCurrentFrame();

  const rotation = interpolate(frame, [0, 40], [0, 330], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const timeOpacity = interpolate(frame, [24, 30], [0, 1], {
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
        }}
      >
        <svg width={300} height={300} viewBox="0 0 200 200">
          {/* Clock face */}
          <circle
            cx={100}
            cy={100}
            r={90}
            fill="none"
            stroke={COLORS.line}
            strokeWidth={2}
          />

          {/* 12 tick marks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 100 + Math.cos(angle) * 80;
            const y1 = 100 + Math.sin(angle) * 80;
            const x2 = 100 + Math.cos(angle) * 88;
            const y2 = 100 + Math.sin(angle) * 88;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={COLORS.mutedForeground}
                strokeWidth={2}
                strokeLinecap="round"
              />
            );
          })}

          {/* Hour hand */}
          <line
            x1={100}
            y1={100}
            x2={
              100 +
              Math.cos((rotation - 90) * (Math.PI / 180)) * 55
            }
            y2={
              100 +
              Math.sin((rotation - 90) * (Math.PI / 180)) * 55
            }
            stroke={COLORS.brand}
            strokeWidth={4}
            strokeLinecap="round"
          />

          {/* Center dot */}
          <circle cx={100} cy={100} r={4} fill={COLORS.brand} />
        </svg>

        {/* 11 PM text */}
        <div
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.brand,
            opacity: timeOpacity,
          }}
        >
          11 PM
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Main ProblemMontage ---------- */
export const ProblemMontage: React.FC = () => {
  const frame = useCurrentFrame();

  // White flash opacity (frames 200-209 relative)
  const flashOpacity = interpolate(
    frame,
    [200, 203, 209],
    [0, 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={0} durationInFrames={52}>
        <EmailPanel />
      </Sequence>

      <Sequence from={52} durationInFrames={52}>
        <SpreadsheetPanel />
      </Sequence>

      <Sequence from={104} durationInFrames={52}>
        <ChatPanel />
      </Sequence>

      <Sequence from={156} durationInFrames={44}>
        <ClockPanel />
      </Sequence>

      {/* White flash transition */}
      <Sequence from={200} durationInFrames={10}>
        <AbsoluteFill
          style={{
            backgroundColor: "#FFFFFF",
            opacity: flashOpacity,
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
