export interface AgentCardData {
  label: string;
  status: string;
  color: string;
  icon: string;
}

export interface TerminalLine {
  text: string;
}

export interface BrandColors {
  brand: string;
  brandLight: string;
  brandDark: string;
  cyan: string;
  magenta: string;
  green: string;
  amber: string;
  red: string;
  background: string;
  surface: string;
  surface2: string;
  foreground: string;
  mutedForeground: string;
  line: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface TaskItem {
  id: string;
  agent: string;
  task: string;
  status: "queued" | "processing" | "complete";
}

export interface DashboardMetric {
  label: string;
  value: number;
  suffix: string;
  trend: "up" | "down" | "flat";
}
