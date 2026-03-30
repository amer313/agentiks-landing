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
    interpolate(frame, [0, 35], [47, 238], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const captionScale = spring({
    frame: Math.max(0, frame - 8),
    fps: FPS,
    config: { damping: 12, stiffness: 200 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Email inbox card -- larger */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: 800,
          background: COLORS.surface,
          borderRadius: 20,
          padding: 32,
          border: `1px solid ${COLORS.line}`,
        }}
      >
        {/* Header with badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 28,
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
              fontSize: 22,
              fontWeight: 700,
              padding: "6px 16px",
              borderRadius: 14,
            }}
          >
            {counter}
          </div>
        </div>

        {/* Email rows -- larger */}
        {Array.from({ length: 5 }).map((_, i) => {
          const slideIn = interpolate(
            frame,
            [i * 4, i * 4 + 10],
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
                height: 52,
                background: COLORS.surface2,
                borderRadius: 10,
                marginBottom: 10,
                opacity: rowOpacity,
                transform: `translateX(${slideIn}px)`,
              }}
            />
          );
        })}
      </div>

      {/* Caption -- larger */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
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
            fontSize: 56,
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
    frame: Math.max(0, frame - 8),
    fps: FPS,
    config: { damping: 12, stiffness: 200 },
  });

  const ROWS = 5;
  const COLS = 7;

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
            gridTemplateColumns: `repeat(${COLS}, 100px)`,
            gridTemplateRows: `repeat(${ROWS}, 52px)`,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 10,
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

      {/* Caption -- larger */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
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
            fontSize: 56,
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
    interpolate(frame, [0, 30], [3, 12], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const captionScale = spring({
    frame: Math.max(0, frame - 8),
    fps: FPS,
    config: { damping: 12, stiffness: 200 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Notification badge -- larger */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 240,
          background: COLORS.brand,
          color: "#fff",
          fontFamily: FONT_FAMILY_MONO,
          fontSize: 22,
          fontWeight: 700,
          padding: "8px 18px",
          borderRadius: 20,
        }}
      >
        {notifCount}
      </div>

      {/* Chat bubbles -- larger */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: 600,
        }}
      >
        {messages.map((msg, i) => {
          const slideIn = interpolate(
            frame,
            [i * 5, i * 5 + 10],
            [80, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const bubbleOpacity = interpolate(
            frame,
            [i * 5, i * 5 + 8],
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
                padding: "16px 24px",
                borderRadius: 20,
                maxWidth: 480,
                opacity: bubbleOpacity,
                transform: `translateX(${isRight ? slideIn : -slideIn}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY_SANS,
                  fontSize: 22,
                  color: COLORS.foreground,
                }}
              >
                {msg}
              </span>
            </div>
          );
        })}
      </div>

      {/* Caption -- larger */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
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
            fontSize: 56,
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

  const rotation = interpolate(frame, [0, 35], [0, 330], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const timeOpacity = interpolate(frame, [20, 28], [0, 1], {
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
          gap: 40,
        }}
      >
        <svg width={400} height={400} viewBox="0 0 200 200">
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

        {/* 11 PM text -- larger */}
        <div
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 64,
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

/* ---------- Main ProblemMontage (180 frames = 6s) ---------- */
export const ProblemMontage: React.FC = () => {
  const frame = useCurrentFrame();

  // Panel timing for 180 frames: 4 panels x 45 frames each
  // White flash transition at end
  const flashOpacity = interpolate(
    frame,
    [170, 173, 179],
    [0, 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={0} durationInFrames={45}>
        <EmailPanel />
      </Sequence>

      <Sequence from={45} durationInFrames={45}>
        <SpreadsheetPanel />
      </Sequence>

      <Sequence from={90} durationInFrames={45}>
        <ChatPanel />
      </Sequence>

      <Sequence from={135} durationInFrames={45}>
        <ClockPanel />
      </Sequence>

      {/* White flash transition */}
      <Sequence from={170} durationInFrames={10}>
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
