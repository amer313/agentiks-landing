import type { AgentCardData, TerminalLine, BrandColors, Stat } from "./types";

export const COLORS: BrandColors = {
  brand: "#DC2626",
  brandLight: "#EF4444",
  brandDark: "#B91C1C",
  cyan: "#EF4444",
  magenta: "#FCA5A5",
  green: "#10B981",
  amber: "#F59E0B",
  red: "#EF4444",
  background: "#050508",
  surface: "#0A0B10",
  surface2: "#10111A",
  foreground: "#F7F8F8",
  mutedForeground: "#8A8F98",
  line: "rgba(255, 255, 255, 0.06)",
};

export const LOGO_PATHS = {
  visor: "M32.2 0h84.4l12.4 12.4v34.7H19.8V12.4L32.2 0z",
  visorSlit: "M37.2 27.3h74.4v9.9H37.2v-9.9z",
  chevron1: "M0 64.5l74.4-12.4 74.4 12.4v17.3L74.4 69.4 0 81.8V64.5z",
  chevron2: "M17.4 94.2l57-9.9 57 9.9v14.9l-57-9.9-57 9.9V94.2z",
  chevron3: "M32.2 119.1l42.2-7.5 42.4 7.5v12.4l-42.4-8.5-42.2 8.5v-12.4z",
  diamond: "M44.6 141.4l29.8-7.5 29.8 7.5-29.8 14.9-29.8-14.9z",
};

export const AGENT_CARDS: AgentCardData[] = [
  { label: "Sales Agent", status: "3,847 leads scored", color: "#DC2626", icon: "target" },
  { label: "Finance Agent", status: "$2.4M batch processed", color: "#10B981", icon: "dollar" },
  { label: "Support Agent", status: "238 tickets routed", color: "#3B82F6", icon: "headset" },
  { label: "Marketing Agent", status: "ROI +340%", color: "#F59E0B", icon: "megaphone" },
  { label: "HR Agent", status: "142 apps screened", color: "#8B5CF6", icon: "users" },
  { label: "Data Agent", status: "12TB processed", color: "#06B6D4", icon: "database" },
  { label: "Compliance Agent", status: "SOC2 passing", color: "#14B8A6", icon: "shield" },
  { label: "Ops Agent", status: "Q3 predictions ready", color: "#EC4899", icon: "gear" },
];

export const TERMINAL_LINES: TerminalLine[] = [
  { text: "\u25b6 deploying agent cluster \u2192 ops.sales.pipeline" },
  { text: "  \u251c\u2500 scoring 3,847 inbound leads..." },
  { text: "  \u251c\u2500 cross-referencing CRM + enrichment data..." },
  { text: "  \u2514\u2500 127 high-intent leads \u2192 sales queue \u2713" },
  { text: "\u25b6 spawning sub-agent \u2192 finance.invoice.batch" },
  { text: "  \u251c\u2500 parsing 340 invoices (PDF + email)..." },
  { text: "  \u2514\u2500 $2.4M batch approved \u2713" },
];

export const STATS: Stat[] = [
  { value: 60, suffix: "%", label: "Less Manual Work" },
  { value: 3, suffix: "x", label: "Efficiency" },
  { value: 4, suffix: "wk", label: "Time to Deploy" },
];

export const FPS = 30;

export const TRAILER_DURATION_FRAMES = 1050;

export const SCENE_TIMING = {
  hook:      { from: 0,   duration: 150 },   // 5s
  problem:   { from: 150, duration: 180 },   // 6s
  reveal:    { from: 330, duration: 90 },    // 3s
  dashboard: { from: 420, duration: 300 },   // 10s (HERO)
  impact:    { from: 720, duration: 150 },   // 5s
  endCard:   { from: 870, duration: 180 },   // 6s
} as const;

export function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
