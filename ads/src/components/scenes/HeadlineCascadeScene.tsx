import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { ScanLine } from "../backgrounds/ScanLine";
import { COLORS, mulberry32, FPS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

const POSTS = [
  { username: "@OpenAI", text: "GPT-5 just dropped", avatarColor: "#10B981" },
  { username: "@AnthropicAI", text: "Claude gets computer use", avatarColor: "#00F0FF" },
  { username: "@GoogleAI", text: "Gemini goes multimodal native", avatarColor: "#3B82F6" },
  { username: "@MetaAI", text: "Llama 4 benchmarks are insane", avatarColor: "#0EA5E9" },
  { username: "@xaborai", text: "New MCP protocol changes everything", avatarColor: "#F59E0B" },
  { username: "@nvidia", text: "New framework replaces LangChain", avatarColor: "#84CC16" },
  { username: "@OpenAI", text: "Agents are the new apps", avatarColor: "#10B981" },
  { username: "@AnthropicAI", text: "Fine-tuning is dead, prompting is king", avatarColor: "#00F0FF" },
  { username: "@GoogleAI", text: "Open source catches up to frontier", avatarColor: "#3B82F6" },
  { username: "@MetaAI", text: "RAG is being replaced", avatarColor: "#0EA5E9" },
  { username: "@xaborai", text: "Claude Sonnet 4 is unreal", avatarColor: "#F59E0B" },
  { username: "@nvidia", text: "AI coding agents replace QA teams", avatarColor: "#84CC16" },
  { username: "@OpenAI", text: "Reasoning models get 10x cheaper", avatarColor: "#10B981" },
  { username: "@AnthropicAI", text: "Multimodal is the new baseline", avatarColor: "#00F0FF" },
  { username: "@GoogleAI", text: "Model context windows hit 2M tokens", avatarColor: "#3B82F6" },
  { username: "@MetaAI", text: "Autonomous agents scale in prod", avatarColor: "#0EA5E9" },
  { username: "@xaborai", text: "DeepSeek matches frontier at 1/10th cost", avatarColor: "#F59E0B" },
  { username: "@nvidia", text: "New voice model passes Turing test", avatarColor: "#84CC16" },
  { username: "@OpenAI", text: "AI rewrites its own code now", avatarColor: "#10B981" },
  { username: "@AnthropicAI", text: "Constitutional AI 2.0 launches", avatarColor: "#00F0FF" },
];

// Deterministic layout using seeded PRNG
const rng = mulberry32(77);

// Cards pop in over the first ~170 frames (~2 per 10 frames, accelerating)
// Generate spawn frame and random x/y for each card
const CARD_WIDTH = 300;
const CARD_HEIGHT = 100;
const FRAME_WIDTH = 1080;
const FRAME_HEIGHT = 1920;

const cardConfigs = POSTS.map((_, i) => {
  // Spread out spawn timing: first card at frame 5, then ~1 every 7-8 frames
  const spawnFrame = 5 + i * 8;
  // Random position across the screen (with padding so cards don't go fully off)
  const x = rng() * (FRAME_WIDTH - CARD_WIDTH - 40) + 20;
  const y = rng() * (FRAME_HEIGHT - CARD_HEIGHT - 40) + 20;
  // Slight random rotation for chaos
  const rotation = (rng() - 0.5) * 10;
  // Random z-index ordering
  const zIndex = Math.floor(rng() * 20) + i;
  return { spawnFrame, x, y, rotation, zIndex };
});

// Scan line sweep starts at frame 168 (70% of ~240 total)
const SCAN_START = 168;
const SCAN_DURATION = 30;
// Cards fade out after scan
const FADE_START = SCAN_START + SCAN_DURATION;
const FADE_END = FADE_START + 20;

export const HeadlineCascadeScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Post-scan clear text opacity
  const clearTextOpacity = interpolate(
    frame,
    [FADE_END, FADE_END + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const clearTextScale = interpolate(
    frame,
    [FADE_END, FADE_END + 20],
    [0.92, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow={false} />

      {/* Social media post cards */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        {POSTS.map((post, i) => {
          const config = cardConfigs[i];
          const relativeFrame = frame - config.spawnFrame;

          // Don't render before spawn
          if (relativeFrame < 0) return null;

          // Spring pop-in animation
          const popIn = spring({
            frame: relativeFrame,
            fps: FPS,
            config: { damping: 14, stiffness: 200, mass: 0.8 },
          });

          const scale = interpolate(popIn, [0, 1], [0.4, 1]);
          const cardOpacity = interpolate(
            relativeFrame,
            [0, 3],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          // Fade out after scan line
          const fadeOpacity = interpolate(
            frame,
            [FADE_START, FADE_END],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const finalOpacity = cardOpacity * fadeOpacity;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: config.x,
                top: config.y,
                width: CARD_WIDTH,
                transform: `rotate(${config.rotation}deg) scale(${scale})`,
                transformOrigin: "center center",
                opacity: finalOpacity,
                zIndex: config.zIndex,
                backgroundColor: COLORS.surface,
                border: `1px solid rgba(255,255,255,0.08)`,
                borderRadius: 12,
                padding: "12px 14px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
              }}
            >
              {/* Header row: avatar + username */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: post.avatarColor,
                    flexShrink: 0,
                    opacity: 0.9,
                  }}
                />
                <span
                  style={{
                    fontFamily: FONT_FAMILY_SANS,
                    fontSize: 13,
                    fontWeight: 700,
                    color: COLORS.foreground,
                    opacity: 0.9,
                  }}
                >
                  {post.username}
                </span>
              </div>

              {/* Post text */}
              <div
                style={{
                  fontFamily: FONT_FAMILY_SANS,
                  fontSize: 14,
                  fontWeight: 400,
                  color: COLORS.foreground,
                  opacity: 0.75,
                  lineHeight: 1.4,
                }}
              >
                {post.text}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Scan line sweep */}
      <ScanLine
        startFrame={SCAN_START}
        durationFrames={SCAN_DURATION}
        color={COLORS.brand}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
      />

      {/* Post-scan message */}
      {frame >= FADE_START && (
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: clearTextOpacity,
            transform: `scale(${clearTextScale})`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY_SANS,
              fontSize: 36,
              fontWeight: 600,
              color: COLORS.foreground,
              textAlign: "center",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              padding: "0 80px",
            }}
          >
            We track this.{" "}
            <span style={{ color: COLORS.brand }}>
              So you don&apos;t have to.
            </span>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
