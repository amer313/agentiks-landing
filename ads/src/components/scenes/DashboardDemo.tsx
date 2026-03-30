import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../fonts";

/* ---- Integration data for the dashboard ---- */
const INTEGRATIONS = [
  { name: "Slack", bg: "#4A154B" },
  { name: "Salesforce", bg: "#00A1E0" },
  { name: "HubSpot", bg: "#FF7A59" },
  { name: "Stripe", bg: "#635BFF" },
  { name: "Gmail", bg: "#EA4335" },
  { name: "GitHub", bg: "#24292e" },
  { name: "Jira", bg: "#0052CC" },
  { name: "Notion", bg: "#191919" },
  { name: "Zapier", bg: "#FF4A00" },
  { name: "Sheets", bg: "#0F9D58" },
  { name: "Twilio", bg: "#F22F46" },
  { name: "Discord", bg: "#5865F2" },
  { name: "LinkedIn", bg: "#0A66C2" },
  { name: "Shopify", bg: "#96BF48" },
  { name: "Zendesk", bg: "#03363D" },
  { name: "Airtable", bg: "#18BFFF" },
];

const METRICS = [
  { label: "Active Agents", val: "16", change: "+3", changeColor: "#10B981" },
  { label: "Connected Apps", val: "16", change: "+2", changeColor: "#10B981" },
  { label: "Tasks / 24h", val: "12,847", change: "+847", changeColor: "#10B981" },
  { label: "Avg Response", val: "0.8s", change: "-0.2s", changeColor: "#10B981" },
  { label: "Cost Saved", val: "$284k", change: "+$42k", changeColor: "#10B981" },
  { label: "Error Rate", val: "0.03%", change: "-0.01%", changeColor: "#10B981" },
];

const AGENTS = [
  { name: "Sales Agent", status: "Scoring leads", output: "3,847", health: 98, src: "HubSpot", srcBg: "#FF7A59" },
  { name: "Finance Agent", status: "Invoice batch", output: "$2.4M", health: 100, src: "Stripe", srcBg: "#635BFF" },
  { name: "Support Agent", status: "Routing", output: "238", health: 95, src: "Zendesk", srcBg: "#03363D" },
  { name: "Marketing", status: "Campaign opt.", output: "+340%", health: 100, src: "LinkedIn", srcBg: "#0A66C2" },
  { name: "HR Agent", status: "Screening", output: "142", health: 97, src: "Notion", srcBg: "#191919" },
  { name: "Compliance", status: "SOC2 checks", output: "Pass", health: 100, src: "Jira", srcBg: "#0052CC" },
  { name: "Data Agent", status: "ETL pipeline", output: "12TB", health: 99, src: "Sheets", srcBg: "#0F9D58" },
  { name: "Legal Agent", status: "NDA analysis", output: "12", health: 96, src: "Gmail", srcBg: "#EA4335" },
];

const ACTIVITY_FEED = [
  { t: "2s", e: "Sales Agent scored 127 leads", color: "#10B981" },
  { t: "8s", e: "Slack alert sent to VP (VIP)", color: "#F59E0B" },
  { t: "14s", e: "$2.4M invoice batch approved", color: "#10B981" },
  { t: "45s", e: "Salesforce sync: 340 records", color: "#3B82F6" },
  { t: "1m", e: "12 compliance tasks created", color: "#3B82F6" },
  { t: "3m", e: "47 candidates imported", color: "#10B981" },
  { t: "5m", e: "3 NDAs flagged for review", color: "#F59E0B" },
  { t: "8m", e: "Q3 forecast updated", color: "#10B981" },
  { t: "12m", e: "Onboarding flow started", color: "#3B82F6" },
  { t: "15m", e: "Dev deploy notification sent", color: "#3B82F6" },
];

/* ---- Orchestrator agent nodes ---- */
const ORCHESTRATOR_AGENTS = [
  { label: "Sales", color: "#F59E0B", angle: 0 },
  { label: "Finance", color: "#10B981", angle: 60 },
  { label: "Support", color: "#06B6D4", angle: 120 },
  { label: "Marketing", color: "#F43F5E", angle: 180 },
  { label: "HR", color: "#A855F7", angle: 240 },
  { label: "Data", color: "#3B82F6", angle: 300 },
];

/* ---- Workflow data ---- */
const WORKFLOWS = [
  { name: "Lead Qualification", progress: 87, steps: 5, current: 4, color: "#F59E0B" },
  { name: "Invoice Processing", progress: 100, steps: 4, current: 4, color: "#10B981" },
  { name: "Customer Onboarding", progress: 60, steps: 6, current: 4, color: "#3B82F6" },
  { name: "Compliance Audit", progress: 45, steps: 8, current: 4, color: "#14B8A6" },
];

/* ---- Terminal log lines ---- */
const TERMINAL_LOG = [
  { text: "$ agentiks deploy --cluster ops.sales", color: COLORS.brand },
  { text: "[14:23:01] Scoring 3,847 inbound leads...", color: "rgba(255,255,255,0.5)" },
  { text: "[14:23:03] Cross-referencing CRM + enrichment data...", color: "rgba(255,255,255,0.5)" },
  { text: "[14:23:04] 127 high-intent leads -> sales queue", color: "#10B981" },
  { text: "[14:23:05] Spawning sub-agent -> finance.invoice.batch", color: COLORS.brand },
  { text: "[14:23:08] Parsing 340 invoices (PDF + email)...", color: "rgba(255,255,255,0.5)" },
  { text: "[14:23:12] $2.4M batch approved, 3 exceptions routed", color: "#10B981" },
  { text: "[14:23:15] Escalation detected -> support.tier3", color: "#F59E0B" },
  { text: "[14:23:16] Sentiment analysis: critical (0.12)", color: "rgba(255,255,255,0.5)" },
  { text: "[14:23:17] VP account manager notified in 0.8s", color: "#10B981" },
];

/* ---- Dashboard caption overlay ---- */
const DashboardCaption: React.FC<{ text: string; opacity: number }> = ({
  text,
  opacity,
}) => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 120,
      background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      paddingBottom: 32,
      opacity,
      zIndex: 50,
    }}
  >
    <div
      style={{
        fontFamily: FONT_FAMILY_SANS,
        fontSize: 42,
        fontWeight: 400,
        color: "#FFFFFF",
        textShadow: "0 2px 20px rgba(0,0,0,0.9)",
        letterSpacing: "-0.01em",
      }}
    >
      {text}
    </div>
  </div>
);

/* ---- Mini chart SVG ---- */
const MiniChart: React.FC<{ frame: number }> = ({ frame }) => {
  const points = [
    12, 18, 15, 22, 28, 25, 35, 30, 38, 42, 36, 45, 50, 48, 55, 52, 60, 58, 65, 62,
    68, 72, 70, 75, 78, 74, 80, 85, 82, 88,
  ];

  const visiblePoints = Math.min(
    points.length,
    Math.floor(interpolate(frame, [0, 120], [0, points.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }))
  );

  const pathD = points
    .slice(0, visiblePoints)
    .map((y, i) => `${i === 0 ? "M" : "L"} ${i * 18} ${100 - y}`)
    .join(" ");

  return (
    <svg width="100%" height={80} viewBox="0 0 540 100" preserveAspectRatio="none">
      <path
        d={pathD}
        fill="none"
        stroke={COLORS.brand}
        strokeWidth={2}
        opacity={0.8}
      />
      {visiblePoints > 1 && (
        <path
          d={`${pathD} L ${(visiblePoints - 1) * 18} 100 L 0 100 Z`}
          fill={`${COLORS.brand}15`}
        />
      )}
    </svg>
  );
};

/* ---- Orchestrator Visualization (center of dashboard) ---- */
const OrchestratorViz: React.FC<{ frame: number; width: number; height: number }> = ({
  frame,
  width,
  height,
}) => {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.32;
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.12);

  // Data stream particles along edges
  const particleProgress = (frame * 0.02) % 1;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <filter id="orchGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={COLORS.brand} stopOpacity="0.8" />
          <stop offset="50%" stopColor={COLORS.brand} stopOpacity="0.3" />
          <stop offset="100%" stopColor={COLORS.brand} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Scan rings */}
      {[0, 2, 4].map((delay) => {
        const ringProgress = ((frame - delay * 15) * 0.008) % 1;
        const ringR = radius * 0.1 + ringProgress * radius * 0.9;
        const ringOpacity = ringProgress < 0.8 ? 0.12 * (1 - ringProgress) : 0;
        return (
          <circle
            key={delay}
            cx={cx}
            cy={cy}
            r={ringR}
            fill="none"
            stroke={COLORS.brand}
            strokeWidth={0.8}
            opacity={ringOpacity}
          />
        );
      })}

      {/* Connection lines from center to agents */}
      {ORCHESTRATOR_AGENTS.map((agent, i) => {
        const angle = (agent.angle * Math.PI) / 180;
        const ax = cx + Math.cos(angle) * radius;
        const ay = cy + Math.sin(angle) * radius;
        const lineOpacity = interpolate(frame, [10 + i * 5, 25 + i * 5], [0, 0.3], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        // Data particle along line
        const pProgress = ((particleProgress + i * 0.15) % 1);
        const px = cx + (ax - cx) * pProgress;
        const py = cy + (ay - cy) * pProgress;

        return (
          <g key={agent.label}>
            <line
              x1={cx}
              y1={cy}
              x2={ax}
              y2={ay}
              stroke={agent.color}
              strokeWidth={1}
              opacity={lineOpacity}
              strokeDasharray="4 3"
            />
            {/* Data particle */}
            <circle
              cx={px}
              cy={py}
              r={2.5}
              fill={agent.color}
              opacity={lineOpacity * 0.8}
            />
          </g>
        );
      })}

      {/* Agent nodes */}
      {ORCHESTRATOR_AGENTS.map((agent, i) => {
        const angle = (agent.angle * Math.PI) / 180;
        const ax = cx + Math.cos(angle) * radius;
        const ay = cy + Math.sin(angle) * radius;
        const nodeOpacity = interpolate(frame, [15 + i * 5, 30 + i * 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const nodeScale = interpolate(frame, [15 + i * 5, 30 + i * 5], [0.3, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <g key={agent.label} opacity={nodeOpacity}>
            {/* Outer glow */}
            <circle
              cx={ax}
              cy={ay}
              r={22 * nodeScale}
              fill={agent.color}
              fillOpacity={0.08 + pulse * 0.04}
            />
            {/* Node circle */}
            <circle
              cx={ax}
              cy={ay}
              r={14 * nodeScale}
              fill="rgba(10,11,16,0.9)"
              stroke={agent.color}
              strokeWidth={1.5}
              strokeOpacity={0.6}
            />
            {/* Inner dot */}
            <circle
              cx={ax}
              cy={ay}
              r={4 * nodeScale}
              fill={agent.color}
              fillOpacity={0.5 + pulse * 0.3}
            />
            {/* Label */}
            <text
              x={ax}
              y={ay + 30}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize={11}
              fontFamily={FONT_FAMILY_MONO}
            >
              {agent.label}
            </text>
          </g>
        );
      })}

      {/* Central core */}
      <circle cx={cx} cy={cy} r={radius * 0.22} fill="url(#coreGrad)" opacity={0.15} />
      <circle
        cx={cx}
        cy={cy}
        r={radius * 0.14}
        fill="url(#coreGrad)"
        opacity={0.25}
        filter="url(#orchGlow)"
      />
      <circle
        cx={cx}
        cy={cy}
        r={radius * 0.07}
        fill={COLORS.brand}
        opacity={0.4 + pulse * 0.2}
      />
      <circle
        cx={cx}
        cy={cy}
        r={radius * 0.03}
        fill={COLORS.brandLight}
        opacity={0.9}
        filter="url(#orchGlow)"
      />

      {/* Rotating ring */}
      <circle
        cx={cx}
        cy={cy}
        r={radius * 0.18}
        fill="none"
        stroke={COLORS.brand}
        strokeWidth={0.8}
        strokeOpacity={0.2}
        strokeDasharray="4 6"
        transform={`rotate(${frame * 1.2} ${cx} ${cy})`}
      />

      {/* "Orchestrator" label */}
      <text
        x={cx}
        y={cy + radius * 0.3}
        textAnchor="middle"
        fill="rgba(255,255,255,0.35)"
        fontSize={10}
        fontFamily={FONT_FAMILY_MONO}
        letterSpacing="0.15em"
      >
        ORCHESTRATOR
      </text>
    </svg>
  );
};

/* ---- The large dashboard panel (rendered at 2x size for zoom) ---- */
const FullDashboard: React.FC<{ frame: number }> = ({ frame }) => {
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.12);

  const counterProgress = interpolate(frame, [30, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const visibleActivities = Math.min(
    ACTIVITY_FEED.length,
    Math.floor(interpolate(frame, [100, 250], [0, ACTIVITY_FEED.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }))
  );

  const visibleTerminal = Math.min(
    TERMINAL_LOG.length,
    Math.floor(interpolate(frame, [60, 220], [0, TERMINAL_LOG.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }))
  );

  return (
    <div
      style={{
        width: 3200,
        height: 1800,
        backgroundColor: "#0a0a0c",
        fontFamily: FONT_FAMILY_MONO,
        fontSize: 14,
        color: "#FFFFFF",
        display: "flex",
        position: "relative",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 80,
          backgroundColor: "#111116",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 0",
          gap: 12,
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: `${COLORS.brand}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.brand,
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          A
        </div>
        <div style={{ width: 30, height: 1, background: "rgba(255,255,255,0.1)" }} />
        {["Dashboard", "Agents", "Integrations", "Workflows", "Logs", "Settings"].map((label, i) => (
          <div
            key={label}
            style={{
              width: 36,
              height: 36,
              borderRadius: 6,
              background: i === 0 ? "rgba(255,255,255,0.1)" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              color: i === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
            }}
          >
            {["O", "A", "I", "W", "L", "S"][i]}
          </div>
        ))}
        <div style={{ width: 30, height: 1, background: "rgba(255,255,255,0.1)", marginTop: 4 }} />
        <div
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Apps
        </div>
        {INTEGRATIONS.slice(0, 6).map((app) => (
          <div
            key={app.name}
            style={{
              width: 28,
              height: 28,
              borderRadius: 5,
              background: app.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "#fff",
              fontWeight: 700,
            }}
          >
            {app.name[0]}
          </div>
        ))}
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>+10</div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "#0e0e12",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span
              style={{
                fontFamily: FONT_FAMILY_SANS,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Agent Operations
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              {["Overview", "Agents", "Integrations", "Workflows", "Logs"].map((tab, i) => (
                <span
                  key={tab}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 4,
                    fontSize: 12,
                    background: i === 0 ? "rgba(255,255,255,0.12)" : "transparent",
                    color: i === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#10B981",
                opacity: 0.5 + pulse * 0.5,
                boxShadow: "0 0 6px rgba(16,185,129,0.4)",
              }}
            />
            <span style={{ color: "rgba(16,185,129,0.8)", fontSize: 12 }}>
              All systems operational
            </span>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: 20, overflow: "hidden" }}>
          {/* Metrics strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 12,
              marginBottom: 16,
            }}
          >
            {METRICS.map((m) => {
              const animVal = m.val.includes(",")
                ? Math.floor(
                    interpolate(counterProgress, [0, 1], [0, parseInt(m.val.replace(",", ""))], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  ).toLocaleString()
                : m.val;

              return (
                <div
                  key={m.label}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 6,
                    padding: "10px 14px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.45)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_FAMILY_SANS,
                      fontSize: 22,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.95)",
                      marginTop: 4,
                    }}
                  >
                    {animVal}
                  </div>
                  <div style={{ fontSize: 10, color: m.changeColor, marginTop: 2 }}>
                    {m.change}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Integration health strip */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 6,
              padding: "8px 14px",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                flexShrink: 0,
              }}
            >
              Connected
            </span>
            <div style={{ display: "flex", gap: 12, flex: 1, overflow: "hidden" }}>
              {INTEGRATIONS.map((app) => (
                <div
                  key={app.name}
                  style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 3,
                      background: app.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {app.name[0]}
                  </div>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{app.name}</span>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "rgba(16,185,129,0.7)",
                    }}
                  />
                </div>
              ))}
            </div>
            <span style={{ fontSize: 10, color: `${COLORS.brand}99`, flexShrink: 0 }}>+ Add</span>
          </div>

          {/* Main grid: orchestrator + table left, activity/terminal/workflows right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 0.6fr",
              gap: 16,
              height: "calc(100% - 140px)",
            }}
          >
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Orchestrator visualization */}
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 6,
                  padding: 14,
                  position: "relative",
                  height: 420,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Agent Orchestrator
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#10B981",
                        opacity: 0.5 + pulse * 0.5,
                      }}
                    />
                    <span style={{ fontSize: 10, color: "rgba(16,185,129,0.6)" }}>Live</span>
                  </div>
                </div>
                <OrchestratorViz frame={frame} width={1700} height={380} />
              </div>

              {/* Bottom row: Agent table + chart + workflow progress */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, flex: 1 }}>
                {/* Agent table */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 6,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 10,
                    }}
                  >
                    Live Agents
                  </div>
                  {/* Table header */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.2fr 0.8fr 0.5fr 0.5fr 0.4fr",
                      gap: 8,
                      fontSize: 10,
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      paddingBottom: 6,
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      marginBottom: 4,
                    }}
                  >
                    <span>Agent</span>
                    <span>Status</span>
                    <span>Output</span>
                    <span>Source</span>
                    <span>Health</span>
                  </div>
                  {/* Table rows */}
                  {AGENTS.map((a, i) => {
                    const rowOpacity = interpolate(frame, [20 + i * 8, 28 + i * 8], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    });
                    return (
                      <div
                        key={a.name}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1.2fr 0.8fr 0.5fr 0.5fr 0.4fr",
                          gap: 8,
                          padding: "6px 0",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                          alignItems: "center",
                          opacity: rowOpacity,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 13,
                            color: "rgba(255,255,255,0.8)",
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <div
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: "rgba(16,185,129,0.8)",
                              opacity: 0.5 + pulse * 0.5,
                            }}
                          />
                          {a.name}
                        </span>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                          {a.status}
                        </span>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                          {a.output}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <div
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: 2,
                              background: a.srcBg,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 8,
                              fontWeight: 700,
                              color: "#fff",
                            }}
                          >
                            {a.src[0]}
                          </div>
                          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                            {a.src}
                          </span>
                        </div>
                        <div
                          style={{
                            height: 5,
                            borderRadius: 3,
                            background: "rgba(255,255,255,0.08)",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              borderRadius: 3,
                              background: "rgba(16,185,129,0.7)",
                              width: `${a.health}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Workflow progress + chart */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Chart */}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 6,
                      padding: 14,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.5)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Task Volume - 30d
                      </span>
                      <div style={{ display: "flex", gap: 6 }}>
                        {["1D", "7D", "30D", "ALL"].map((t, i) => (
                          <span
                            key={t}
                            style={{
                              fontSize: 10,
                              padding: "2px 6px",
                              borderRadius: 3,
                              background: i === 2 ? `${COLORS.brand}40` : "transparent",
                              color: i === 2 ? COLORS.brand : "rgba(255,255,255,0.35)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <MiniChart frame={frame} />
                  </div>

                  {/* Workflow progress bars */}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 6,
                      padding: 14,
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.5)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 10,
                      }}
                    >
                      Active Workflows
                    </div>
                    {WORKFLOWS.map((w, i) => {
                      const wProgress = interpolate(frame, [40 + i * 20, 80 + i * 20], [0, w.progress], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      });
                      return (
                        <div key={w.name} style={{ marginBottom: 12 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: 4,
                            }}
                          >
                            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                              {w.name}
                            </span>
                            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                              {Math.floor(wProgress)}%
                            </span>
                          </div>
                          <div
                            style={{
                              height: 6,
                              borderRadius: 3,
                              background: "rgba(255,255,255,0.08)",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                borderRadius: 3,
                                background: w.color,
                                width: `${wProgress}%`,
                                opacity: 0.7,
                              }}
                            />
                          </div>
                          {/* Step indicators */}
                          <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                            {Array.from({ length: w.steps }).map((_, si) => (
                              <div
                                key={si}
                                style={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  background: si < w.current
                                    ? w.color
                                    : "rgba(255,255,255,0.1)",
                                  opacity: si < w.current ? 0.6 : 0.3,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    {/* Cost savings highlight */}
                    <div
                      style={{
                        marginTop: 8,
                        padding: "10px 12px",
                        background: `${COLORS.brand}12`,
                        border: `1px solid ${COLORS.brand}30`,
                        borderRadius: 6,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        Total Cost Saved
                      </span>
                      <span
                        style={{
                          fontFamily: FONT_FAMILY_SANS,
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#10B981",
                        }}
                      >
                        $284k
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Activity feed + Terminal */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Activity feed */}
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 6,
                  padding: 14,
                  flex: 1,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 10,
                  }}
                >
                  Activity Feed
                </div>
                {ACTIVITY_FEED.map((a, i) => (
                  <div
                    key={`activity-${i}`}
                    style={{
                      display: "flex",
                      gap: 8,
                      padding: "6px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      alignItems: "flex-start",
                      opacity: i < visibleActivities ? 1 : 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.35)",
                        width: 24,
                        flexShrink: 0,
                        textAlign: "right",
                      }}
                    >
                      {a.t}
                    </span>
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: a.color,
                        marginTop: 4,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 12, color: a.color, lineHeight: 1.3 }}>
                      {a.e}
                    </span>
                  </div>
                ))}
              </div>

              {/* Terminal / log view */}
              <div
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                {/* Terminal header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 10px",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(239,68,68,0.5)" }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(245,158,11,0.5)" }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(16,185,129,0.5)" }} />
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginLeft: 6 }}>
                    agentiks -- live ops
                  </span>
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#10B981",
                        opacity: 0.5 + pulse * 0.5,
                      }}
                    />
                    <span style={{ fontSize: 8, color: "rgba(16,185,129,0.6)" }}>LIVE</span>
                  </div>
                </div>
                {/* Terminal content */}
                <div style={{ padding: "8px 10px", minHeight: 180 }}>
                  {TERMINAL_LOG.map((line, i) => (
                    <div
                      key={`term-${i}`}
                      style={{
                        fontSize: 10,
                        lineHeight: 1.6,
                        color: line.color,
                        opacity: i < visibleTerminal ? 1 : 0,
                        fontFamily: FONT_FAMILY_MONO,
                      }}
                    >
                      {line.text}
                    </div>
                  ))}
                  {/* Blinking cursor */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: `${COLORS.brand}60` }}>$</span>
                    <div
                      style={{
                        width: 6,
                        height: 12,
                        background: `${COLORS.brand}60`,
                        opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Integration health section */}
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 6,
                  padding: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 8,
                  }}
                >
                  Integration Health
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 8,
                  }}
                >
                  {INTEGRATIONS.slice(0, 8).map((app) => (
                    <div
                      key={`health-${app.name}`}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                        padding: "4px 0",
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 4,
                          background: app.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#fff",
                        }}
                      >
                        {app.name[0]}
                      </div>
                      <span style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>
                        {app.name}
                      </span>
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "rgba(16,185,129,0.7)",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 8,
                    paddingTop: 6,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
                    API calls / 24h
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    1.2M
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---- Pan-zoom phases (6 phases for 300 frames) ---- */
// Phase 1 (0-40):    Wide shot - "Your operations. One dashboard."
// Phase 2 (40-95):   Zoom to orchestrator center - "Agents working together. Autonomously."
// Phase 3 (95-155):  Zoom to metrics area - "Real-time performance. Zero guesswork."
// Phase 4 (155-210): Pan to agent table - "Every agent. Always running."
// Phase 5 (210-265): Pan to activity feed/terminal - "Every action. Logged and traceable."
// Phase 6 (265-300): Zoom back out - "This is what agentic looks like."

function usePanZoom(frame: number) {
  const scale = interpolate(
    frame,
    [0, 40, 50, 95, 105, 155, 165, 210, 220, 265, 275, 300],
    [0.6, 0.6, 0.95, 0.95, 1.05, 1.05, 1.05, 1.05, 1.05, 1.05, 0.6, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const tx = interpolate(
    frame,
    [0, 40, 50, 95, 105, 155, 165, 210, 220, 265, 275, 300],
    [0, 0, 0, 0, -200, -200, -300, -300, 500, 500, 0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const ty = interpolate(
    frame,
    [0, 40, 50, 95, 105, 155, 165, 210, 220, 265, 275, 300],
    [0, 0, -150, -150, -300, -300, 150, 150, -50, -50, 0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return { scale, tx, ty };
}

/* ---- Captions by phase (6 captions matching pan-zoom) ---- */
function useCaptions(frame: number) {
  // Phase 1 (0-40): "Your operations. One dashboard."
  const c1Opacity = interpolate(frame, [5, 15, 30, 40], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Phase 2 (40-95): "Agents working together. Autonomously."
  const c2Opacity = interpolate(frame, [50, 60, 80, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Phase 3 (95-155): "Real-time performance. Zero guesswork."
  const c3Opacity = interpolate(frame, [105, 115, 140, 150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Phase 4 (155-210): "Every agent. Always running."
  const c4Opacity = interpolate(frame, [165, 175, 195, 205], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Phase 5 (210-265): "Every action. Logged and traceable."
  const c5Opacity = interpolate(frame, [220, 230, 250, 260], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Phase 6 (265-300): "This is what agentic looks like."
  const c6Opacity = interpolate(frame, [275, 285, 295, 300], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return { c1Opacity, c2Opacity, c3Opacity, c4Opacity, c5Opacity, c6Opacity };
}

/* ---- Main exported component ---- */
export const DashboardDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in
  const dashboardOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const { scale, tx, ty } = usePanZoom(frame);
  const { c1Opacity, c2Opacity, c3Opacity, c4Opacity, c5Opacity, c6Opacity } = useCaptions(frame);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Dashboard container with pan-zoom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: dashboardOpacity,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
            transformOrigin: "center center",
          }}
        >
          <FullDashboard frame={frame} />
        </div>
      </div>

      {/* Captions overlay */}
      {c1Opacity > 0 && (
        <DashboardCaption text="Your operations. One dashboard." opacity={c1Opacity} />
      )}
      {c2Opacity > 0 && (
        <DashboardCaption text="Agents working together. Autonomously." opacity={c2Opacity} />
      )}
      {c3Opacity > 0 && (
        <DashboardCaption text="Real-time performance. Zero guesswork." opacity={c3Opacity} />
      )}
      {c4Opacity > 0 && (
        <DashboardCaption text="Every agent. Always running." opacity={c4Opacity} />
      )}
      {c5Opacity > 0 && (
        <DashboardCaption text="Every action. Logged and traceable." opacity={c5Opacity} />
      )}
      {c6Opacity > 0 && (
        <DashboardCaption text="This is what agentic looks like." opacity={c6Opacity} />
      )}
    </AbsoluteFill>
  );
};
