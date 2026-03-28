import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../fonts";
import { AnimatedCounter } from "../typography/AnimatedCounter";

// Slack-style messages
const CHAT_MESSAGES = [
  { user: "Sarah K.", msg: "Where's the Q3 report?", time: "11:42 AM" },
  { user: "Mike T.", msg: "Has anyone seen the updated pricing?", time: "11:43 AM" },
  { user: "Jordan L.", msg: "Can someone approve this PO?", time: "11:43 AM" },
  { user: "Alex R.", msg: "Who owns the client onboarding doc?", time: "11:44 AM" },
  { user: "Taylor M.", msg: "Did the finance team review this?", time: "11:44 AM" },
  { user: "Chris P.", msg: "Urgent: need the vendor list ASAP", time: "11:45 AM" },
  { user: "Dana W.", msg: "Why is this still not done??", time: "11:45 AM" },
  { user: "Riley S.", msg: "Anyone? This is blocking the launch", time: "11:46 AM" },
];

// Slack message bubble component
const ChatBubble: React.FC<{
  user: string;
  msg: string;
  time: string;
  index: number;
  frame: number;
}> = ({ user, msg, time, index, frame }) => {
  const enterFrame = index * 8;
  const slideX = interpolate(
    frame,
    [enterFrame, enterFrame + 10],
    [-120, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = interpolate(
    frame,
    [enterFrame, enterFrame + 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Amber accent on newer / urgent messages
  const isUrgent = index >= 5;
  const avatarColor = isUrgent ? COLORS.amber : COLORS.brand;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${slideX}px)`,
        display: "flex",
        alignItems: "flex-start",
        gap: 20,
        padding: "18px 24px",
        backgroundColor: "rgba(255,255,255,0.04)",
        borderLeft: `4px solid ${isUrgent ? COLORS.amber : "rgba(255,255,255,0.08)"}`,
        borderRadius: 8,
        marginBottom: 12,
      }}
    >
      {/* Avatar circle */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          backgroundColor: avatarColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 20,
          fontWeight: 700,
          color: "#fff",
        }}
      >
        {user[0]}
      </div>

      {/* Message body */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 28,
              fontWeight: 700,
              color: isUrgent ? COLORS.amber : COLORS.foreground,
            }}
          >
            {user}
          </span>
          <span
            style={{
              fontFamily: FONT_FAMILY_MONO,
              fontSize: 22,
              color: COLORS.mutedForeground,
            }}
          >
            {time}
          </span>
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 28,
            color: COLORS.foreground,
            lineHeight: 1.3,
          }}
        >
          {msg}
        </div>
      </div>
    </div>
  );
};

export const ProblemMontageScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Vignette 1: Chat flood (frames 0-70)
  const chatOpacity = interpolate(
    frame,
    [0, 8, 55, 70],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Vignette 2: Email inbox counter (frames 65-135)
  const emailOpacity = interpolate(
    frame,
    [60, 72, 120, 135],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Vignette 3: Clock / cost ring (frames 130-210)
  const clockOpacity = interpolate(
    frame,
    [125, 138, 190, 210],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Circular ring progress for vignette 3
  const ringProgress = interpolate(
    frame,
    [138, 185],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const ringRadius = 220;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringDash = ringProgress * ringCircumference;

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow />

      {/* Vignette 1: Slack-style chat flood */}
      <AbsoluteFill style={{ opacity: chatOpacity }}>
        {/* Channel header */}
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 60,
            right: 60,
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
            paddingBottom: 24,
            borderBottom: `2px solid rgba(255,255,255,0.08)`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.mutedForeground,
            }}
          >
            #
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.foreground,
            }}
          >
            general
          </div>
          {/* Notification badge */}
          <div
            style={{
              backgroundColor: COLORS.red,
              borderRadius: 20,
              padding: "4px 14px",
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 24,
              fontWeight: 700,
              color: "#fff",
              marginLeft: 8,
            }}
          >
            {Math.min(CHAT_MESSAGES.length, Math.floor(frame / 8) + 1)} new
          </div>
        </div>

        {/* Message bubbles */}
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 60,
            right: 60,
            bottom: 80,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {CHAT_MESSAGES.map((m, i) => (
            <ChatBubble
              key={i}
              user={m.user}
              msg={m.msg}
              time={m.time}
              index={i}
              frame={frame}
            />
          ))}
        </div>
      </AbsoluteFill>

      {/* Vignette 2: Email inbox counter */}
      <AbsoluteFill style={{ opacity: emailOpacity }}>
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
          {/* Envelope icon */}
          <svg
            width="160"
            height="160"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLORS.red}
            strokeWidth="1.2"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>

          {/* Big counter */}
          <AnimatedCounter
            startValue={0}
            endValue={2847}
            durationFrames={55}
            startFrame={0}
            fontSize={120}
            color={COLORS.red}
          />

          {/* Label */}
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 42,
              fontWeight: 500,
              color: COLORS.mutedForeground,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            unread messages
          </div>
        </div>
      </AbsoluteFill>

      {/* Vignette 3: Clock ring + cost stat */}
      <AbsoluteFill style={{ opacity: clockOpacity }}>
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
          {/* SVG circular ring */}
          <svg
            width="560"
            height="560"
            viewBox="-280 -280 560 560"
            style={{ position: "absolute" }}
          >
            {/* Track */}
            <circle
              cx="0"
              cy="0"
              r={ringRadius}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="18"
            />
            {/* Progress arc */}
            <circle
              cx="0"
              cy="0"
              r={ringRadius}
              fill="none"
              stroke={COLORS.amber}
              strokeWidth="18"
              strokeLinecap="round"
              strokeDasharray={`${ringDash} ${ringCircumference}`}
              transform="rotate(-90)"
              style={{ filter: `drop-shadow(0 0 16px ${COLORS.amber}80)` }}
            />
            {/* Clock tick marks */}
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
              const innerR = ringRadius - 28;
              const outerR = ringRadius - 10;
              return (
                <line
                  key={i}
                  x1={Math.cos(angle) * innerR}
                  y1={Math.sin(angle) * innerR}
                  x2={Math.cos(angle) * outerR}
                  y2={Math.sin(angle) * outerR}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="3"
                />
              );
            })}
          </svg>

          {/* Center content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 96,
                fontWeight: 800,
                color: COLORS.amber,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                textShadow: `0 0 40px ${COLORS.amber}60`,
              }}
            >
              $340K
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 36,
                fontWeight: 600,
                color: COLORS.foreground,
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              per year lost to
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 36,
                fontWeight: 600,
                color: COLORS.amber,
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              manual work
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
