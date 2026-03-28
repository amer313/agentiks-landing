export interface AgentCardData {
  label: string;
  status: string;
  color: string;
  px: number;
  py: number;
  subs: string[];
}

export interface TerminalLine {
  text: string;
}

export interface BrandColors {
  brand: string;
  brandLight: string;
  brandDark: string;
  cyan: string;
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

export interface ValueProp {
  title: string;
  desc: string;
  iconColor: string;
}

export interface CarouselCard {
  id: string;
  heading: string;
  subheading: string;
  body: string;
  phaseNumber?: number;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  override?: string;
}
