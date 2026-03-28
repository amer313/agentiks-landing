import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { DarkBackground } from "../backgrounds/DarkBackground";
import { ScanLine } from "../backgrounds/ScanLine";
import { COLORS, mulberry32 } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

const headlines = [
  { text: "GPT-5 Benchmarks Leaked", tag: "BREAKING", tagColor: COLORS.red },
  { text: "Claude Gets Computer Use", tag: "UPDATE", tagColor: COLORS.cyan },
  { text: "Gemini Goes Multimodal", tag: "LAUNCH", tagColor: COLORS.brand },
  { text: "LLaMA-4 Open-Sourced", tag: "OPEN SOURCE", tagColor: COLORS.green },
  { text: "AI Agents Pass Bar Exam", tag: "MILESTONE", tagColor: COLORS.amber },
  { text: "Mistral Raises $2B", tag: "FUNDING", tagColor: COLORS.brand },
  { text: "Sora Generates 4K Video", tag: "DEMO", tagColor: COLORS.cyan },
  { text: "DeepSeek Matches GPT-4", tag: "BENCHMARK", tagColor: COLORS.green },
  { text: "Apple Intelligence Ships", tag: "LAUNCH", tagColor: COLORS.mutedForeground },
  { text: "OpenAI Hits $10B Revenue", tag: "BUSINESS", tagColor: COLORS.amber },
  { text: "xAI Grok-3 Released", tag: "MODEL", tagColor: COLORS.brand },
  { text: "Claude Sonnet 4 Drops", tag: "UPDATE", tagColor: COLORS.cyan },
  { text: "AI Coding Agents Replace QA", tag: "INDUSTRY", tagColor: COLORS.red },
  { text: "Meta Releases Llama-5", tag: "OPEN SOURCE", tagColor: COLORS.green },
  { text: "Autonomous AI Agents Scale", tag: "TREND", tagColor: COLORS.brand },
  { text: "MCP Protocol Goes Viral", tag: "PROTOCOL", tagColor: COLORS.cyan },
  { text: "AI Chip Shortage Worsens", tag: "SUPPLY", tagColor: COLORS.red },
  { text: "Perplexity Valued at $18B", tag: "FUNDING", tagColor: COLORS.amber },
  { text: "AI Writes Better Code", tag: "RESEARCH", tagColor: COLORS.green },
  { text: "New Reasoning Model Drops", tag: "BREAKING", tagColor: COLORS.red },
];

// Deterministic positions for headlines
const rng = mulberry32(44);
const headlinePositions = headlines.map(() => ({
  x: rng() * 800 + 100,
  startY: -80 - rng() * 400,
  speed: 3 + rng() * 5,
  fontSize: 18 + Math.floor(rng() * 18),
  angle: (rng() - 0.5) * 8,
}));

export const HeadlineCascadeScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Scan line sweep (frames 180-210)
  const scanActive = frame >= 180 && frame <= 210;

  // Post-scan clear (frames 210-270)
  const clearOpacity = interpolate(
    frame,
    [210, 240],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <DarkBackground showBrandGlow={false} />

      {/* Headlines cascade (frames 0-210) */}
      {frame < 240 && (
        <AbsoluteFill style={{ overflow: "hidden", opacity: frame > 210 ? clearOpacity : 1 }}>
          {headlines.map((headline, i) => {
            const pos = headlinePositions[i];
            const yPos = pos.startY + frame * pos.speed;

            // Only render if on screen
            if (yPos < -100 || yPos > 2020) return null;

            const headlineOpacity = interpolate(
              yPos,
              [-100, 0, 1800, 1920],
              [0, 0.8, 0.8, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: pos.x,
                  top: yPos,
                  transform: `rotate(${pos.angle}deg)`,
                  opacity: headlineOpacity,
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY_SANS,
                    fontSize: 10,
                    fontWeight: 700,
                    color: headline.tagColor,
                    backgroundColor: `${headline.tagColor}15`,
                    padding: "2px 6px",
                    borderRadius: 3,
                    letterSpacing: "0.05em",
                  }}
                >
                  {headline.tag}
                </span>
                <span
                  style={{
                    fontFamily: FONT_FAMILY_SANS,
                    fontSize: pos.fontSize,
                    fontWeight: 600,
                    color: COLORS.foreground,
                    opacity: 0.7,
                  }}
                >
                  {headline.text}
                </span>
              </div>
            );
          })}
        </AbsoluteFill>
      )}

      {/* Scan line sweep */}
      {scanActive && (
        <ScanLine
          startFrame={180}
          durationFrames={30}
          color={COLORS.brand}
          width={1080}
          height={1920}
        />
      )}
    </AbsoluteFill>
  );
};
