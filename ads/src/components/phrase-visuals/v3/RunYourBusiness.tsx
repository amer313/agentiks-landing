import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

export const RunYourBusiness: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  const sceneIn = spring({ frame, fps: FPS, config: { damping: 22, stiffness: 100 } });
  const deskIn = spring({ frame: Math.max(0, frame - 8), fps: FPS, config: { damping: 18, stiffness: 90 } });

  const textOpacity = interpolate(progress, [0.5, 0.8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Dashboard metric pulse
  const metricPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.85, 1]);

  // Dashboard values that update
  const revenueVal = interpolate(progress, [0, 1], [847000, 912000], { extrapolateRight: "clamp" });
  const agentsVal = Math.round(interpolate(progress, [0, 1], [48, 56], { extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 40,
        padding: "0 60px",
        opacity: sceneIn,
      }}
    >
      {/* Desk scene SVG */}
      <div
        style={{
          opacity: deskIn,
          transform: `translateY(${interpolate(deskIn, [0, 1], [30, 0])}px)`,
        }}
      >
        <svg width="560" height="360" viewBox="0 0 560 360">
          {/* Desk surface */}
          <rect x={20} y={290} width={520} height={12} rx={4} fill={COLORS.surface2} />
          <rect x={0} y={302} width={560} height={40} rx={4} fill={COLORS.surface} opacity={0.5} />

          {/* Laptop */}
          <rect x={140} y={160} width={280} height={130} rx={8} fill={COLORS.surface2} stroke={COLORS.surface} strokeWidth={2} />
          {/* Screen */}
          <rect x={152} y={170} width={256} height={110} rx={4} fill="#050508" />

          {/* Dashboard on screen */}
          {/* Header bar */}
          <rect x={152} y={170} width={256} height={18} rx={0} fill={COLORS.surface} />
          <text x={162} y={182} fontFamily={FONT_FAMILY_MONO} fontSize={9} fill={COLORS.brand}>
            agentiks dashboard
          </text>

          {/* Metric cards */}
          <rect x={156} y={193} width={72} height={36} rx={4} fill={COLORS.surface} />
          <text x={161} y={205} fontFamily={FONT_FAMILY_SANS} fontSize={7} fill={COLORS.mutedForeground}>Revenue</text>
          <text x={161} y={218} fontFamily={FONT_FAMILY_MONO} fontSize={9} fontWeight={700} fill={COLORS.green} opacity={metricPulse}>
            {`$${Math.round(revenueVal / 1000)}K`}
          </text>

          <rect x={234} y={193} width={72} height={36} rx={4} fill={COLORS.surface} />
          <text x={239} y={205} fontFamily={FONT_FAMILY_SANS} fontSize={7} fill={COLORS.mutedForeground}>Agents</text>
          <text x={239} y={218} fontFamily={FONT_FAMILY_MONO} fontSize={9} fontWeight={700} fill={COLORS.cyan} opacity={metricPulse}>
            {agentsVal} active
          </text>

          <rect x={312} y={193} width={88} height={36} rx={4} fill={COLORS.surface} />
          <text x={317} y={205} fontFamily={FONT_FAMILY_SANS} fontSize={7} fill={COLORS.mutedForeground}>Tasks Done</text>
          <text x={317} y={218} fontFamily={FONT_FAMILY_MONO} fontSize={9} fontWeight={700} fill={COLORS.amber} opacity={metricPulse}>
            2,847 today
          </text>

          {/* Mini chart */}
          <polyline
            points="156,260 178,248 200,252 222,238 244,244 266,230 288,235 310,220 332,215 354,210 376,205 398,200"
            fill="none"
            stroke={COLORS.green}
            strokeWidth={2}
            opacity={0.7}
          />
          <polyline
            points="156,260 398,260"
            fill="none"
            stroke={COLORS.surface}
            strokeWidth={1}
            opacity={0.3}
          />

          {/* Green status dot */}
          <circle cx={392} cy={177} r={4} fill={COLORS.green} opacity={0.9} />

          {/* Laptop base */}
          <rect x={100} y={288} width={360} height={6} rx={3} fill={COLORS.surface2} />

          {/* Coffee cup */}
          <rect x={460} y={250} width={44} height={44} rx={6} fill={COLORS.surface2} stroke={COLORS.surface} strokeWidth={2} />
          <rect x={466} y={256} width={32} height={28} rx={3} fill="#3B1810" opacity={0.7} />
          {/* Steam */}
          {[0, 1, 2].map(i => (
            <path
              key={i}
              d={`M ${474 + i * 8} 248 Q ${476 + i * 8} 238 ${472 + i * 8} 228`}
              fill="none"
              stroke={COLORS.mutedForeground}
              strokeWidth={1.5}
              opacity={interpolate(Math.sin(frame * 0.08 + i * 1.2), [-1, 1], [0.1, 0.4])}
            />
          ))}

          {/* Handle */}
          <path d="M 504 262 Q 514 270 504 278" fill="none" stroke={COLORS.surface2} strokeWidth={4} />
        </svg>
      </div>

      {/* Text */}
      <div
        style={{
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 40,
          fontWeight: 700,
          color: COLORS.foreground,
          textAlign: "center",
          opacity: textOpacity,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          maxWidth: 520,
        }}
      >
        Focus on what you do best.{" "}
        <span style={{ color: COLORS.green }}>Run your business.</span>
      </div>
    </AbsoluteFill>
  );
};
