import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FPS } from "../../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../../fonts";

interface PhraseVisualProps {
  progress: number;
  durationFrames: number;
}

function CRMIcon({ color }: { color: string }) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="4" y="4" width="20" height="20" rx="3" stroke={color} strokeWidth={2} fill={`${color}18`} />
      <rect x="28" y="4" width="20" height="20" rx="3" stroke={color} strokeWidth={2} fill={`${color}18`} />
      <rect x="4" y="28" width="20" height="20" rx="3" stroke={color} strokeWidth={2} fill={`${color}18`} />
      <rect x="28" y="28" width="20" height="20" rx="3" stroke={color} strokeWidth={2} fill={`${color}18`} />
    </svg>
  );
}

function ERPIcon({ color }: { color: string }) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="6" y="30" width="40" height="16" rx="3" stroke={color} strokeWidth={2} fill={`${color}18`} />
      <rect x="14" y="18" width="24" height="14" rx="2" stroke={color} strokeWidth={2} fill={`${color}18`} />
      <rect x="20" y="8" width="12" height="12" rx="2" stroke={color} strokeWidth={2} fill={`${color}18`} />
    </svg>
  );
}

function DatabaseIcon({ color }: { color: string }) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <ellipse cx="26" cy="14" rx="18" ry="7" stroke={color} strokeWidth={2} fill={`${color}18`} />
      <path d="M8 14 L8 38 C8 42 17 45 26 45 C35 45 44 42 44 38 L44 14" stroke={color} strokeWidth={2} fill="none" />
      <path d="M8 26 C8 30 17 33 26 33 C35 33 44 30 44 26" stroke={color} strokeWidth={2} fill="none" opacity={0.6} />
    </svg>
  );
}

const SYSTEMS = [
  { id: "crm", label: "CRM", sublabel: "Customer Data", color: COLORS.cyan, x: 260, y: 160, Icon: CRMIcon },
  { id: "erp", label: "ERP", sublabel: "Operations", color: COLORS.brand, x: 520, y: 320, Icon: ERPIcon },
  { id: "db", label: "Database", sublabel: "Core Storage", color: COLORS.green, x: 260, y: 480, Icon: DatabaseIcon },
];

const CONNECTIONS = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 0 },
];

export const SystemConnections: React.FC<PhraseVisualProps> = ({ progress, durationFrames }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <div style={{ position: "relative", width: 720, height: 660 }}>
        {/* SVG connections */}
        <svg
          width="720"
          height="660"
          style={{ position: "absolute", inset: 0 }}
        >
          {CONNECTIONS.map(({ from, to }, ci) => {
            const a = SYSTEMS[from];
            const b = SYSTEMS[to];
            const lineProgress = interpolate(
              progress,
              [0.1 + ci * 0.12, 0.35 + ci * 0.12],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );
            const totalLen = Math.hypot(b.x - a.x, b.y - a.y);
            const dashLen = totalLen * lineProgress;

            return (
              <line
                key={ci}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={`url(#grad${ci})`}
                strokeWidth={2.5}
                strokeDasharray={`${dashLen} ${totalLen}`}
                opacity={0.6}
              />
            );
          })}

          {/* Gradient defs */}
          <defs>
            {CONNECTIONS.map(({ from, to }, ci) => (
              <linearGradient
                key={ci}
                id={`grad${ci}`}
                x1={SYSTEMS[from].x}
                y1={SYSTEMS[from].y}
                x2={SYSTEMS[to].x}
                y2={SYSTEMS[to].y}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor={SYSTEMS[from].color} />
                <stop offset="100%" stopColor={SYSTEMS[to].color} />
              </linearGradient>
            ))}
          </defs>
        </svg>

        {/* System nodes */}
        {SYSTEMS.map((sys, i) => {
          const nodeProgress = interpolate(
            progress,
            [i * 0.12, i * 0.12 + 0.2],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          const nodeScale = spring({
            frame: Math.max(0, frame - Math.round(i * 0.12 * durationFrames)),
            fps: FPS,
            config: { damping: 13, stiffness: 110 },
            from: 0,
            to: 1,
          });

          return (
            <div
              key={sys.id}
              style={{
                position: "absolute",
                left: sys.x - 80,
                top: sys.y - 70,
                width: 160,
                opacity: nodeProgress,
                transform: `scale(${nodeScale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  background: COLORS.surface2,
                  border: `2px solid ${sys.color}55`,
                  boxShadow: `0 0 24px ${sys.color}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <sys.Icon color={sys.color} />
              </div>

              {/* Labels */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: FONT_FAMILY_SANS,
                    fontSize: 22,
                    fontWeight: 800,
                    color: sys.color,
                    lineHeight: 1.2,
                  }}
                >
                  {sys.label}
                </div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY_MONO,
                    fontSize: 13,
                    color: COLORS.mutedForeground,
                    marginTop: 2,
                  }}
                >
                  {sys.sublabel}
                </div>
              </div>
            </div>
          );
        })}

        {/* Center label */}
        <div
          style={{
            position: "absolute",
            left: 340,
            top: 310,
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            opacity: interpolate(progress, [0.55, 0.8], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              background: `${COLORS.brand}22`,
              border: `1.5px solid ${COLORS.brand}44`,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY_SANS,
                fontSize: 16,
                fontWeight: 700,
                color: COLORS.brand,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              all talking to each other
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
