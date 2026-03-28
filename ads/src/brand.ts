import type { AgentCardData, TerminalLine, BrandColors, ValueProp, Stat, CarouselCard, VoiceSettings } from "./types";

export const COLORS: BrandColors = {
  brand: "#B400FF",       // Primary brand — purple (matches website)
  brandLight: "#CF5FFF",
  brandDark: "#9000CC",
  cyan: "#00F0FF",        // Logo cyan
  magenta: "#FF00AA",     // Logo magenta
  purple: "#B400FF",      // Logo purple (same as brand)
  logoCyan: "#00F0FF",
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

export const AGENT_CARDS: AgentCardData[] = [
  { label: "Marketing Agent", status: "Campaign ROI +340%", color: "#F43F5E", px: -0.30, py: -0.36, subs: ["Ad Optimizer", "Content Writer"] },
  { label: "QA Agent", status: "2,100 tests passing", color: "#84CC16", px: 0.10, py: -0.38, subs: ["Test Runner"] },
  { label: "Data Agent", status: "12TB processed", color: "#0EA5E9", px: -0.36, py: -0.14, subs: ["ETL Runner"] },
  { label: "Sales Agent", status: "3,847 leads scored", color: "#F59E0B", px: -0.06, py: -0.20, subs: ["Lead Scorer", "CRM Sync"] },
  { label: "Finance Agent", status: "Processing $2.4M batch", color: "#10B981", px: 0.32, py: -0.24, subs: ["Invoice Parser", "AP Matcher"] },
  { label: "Logistics Agent", status: "Optimizing 34 routes", color: "#22D3EE", px: -0.40, py: 0.06, subs: ["Route Optimizer"] },
  { label: "HR Agent", status: "142 apps screened", color: "#A855F7", px: 0.14, py: -0.08, subs: ["Resume Parser"] },
  { label: "Onboarding Agent", status: "47 accounts activated", color: "#3B82F6", px: 0.34, py: 0.02, subs: ["Welcome Mailer"] },
  { label: "Reporting Agent", status: "Board deck generated", color: "#FB923C", px: -0.14, py: 0.00, subs: ["Chart Gen"] },
  { label: "Compliance Agent", status: "SOC2 checks passing", color: "#14B8A6", px: -0.24, py: 0.20, subs: ["Audit Logger"] },
  { label: "Support Agent", status: "Routing 238 tickets", color: "#06B6D4", px: 0.06, py: 0.14, subs: ["Ticket Router"] },
  { label: "Scheduling Agent", status: "892 meetings optimized", color: "#2DD4BF", px: 0.36, py: 0.18, subs: ["Calendar Sync"] },
  { label: "Revenue Agent", status: "$890K flagged", color: "#F97316", px: -0.38, py: 0.34, subs: ["Pipeline Scorer"] },
  { label: "Ops Agent", status: "Q3 predictions generated", color: "#EC4899", px: -0.04, py: 0.40, subs: ["Forecaster"] },
  { label: "Legal Agent", status: "12 NDAs analyzed", color: "#8B5CF6", px: 0.20, py: 0.34, subs: ["Contract Scanner"] },
  { label: "Procurement Agent", status: "17 bids compared", color: "#E879F9", px: 0.40, py: 0.38, subs: ["Bid Comparator"] },
];

export const TERMINAL_LINES: TerminalLine[] = [
  { text: "\u25b6 deploying agent cluster \u2192 ops.sales.pipeline" },
  { text: "  \u251c\u2500 scoring 3,847 inbound leads..." },
  { text: "  \u251c\u2500 cross-referencing CRM + enrichment data..." },
  { text: "  \u2514\u2500 127 high-intent leads \u2192 sales queue \u2713" },
  { text: "\u25b6 spawning sub-agent \u2192 finance.invoice.batch" },
  { text: "  \u251c\u2500 parsing 340 invoices (PDF + email)..." },
  { text: "  \u251c\u2500 matching POs, flagging discrepancies..." },
  { text: "  \u2514\u2500 $2.4M batch approved, 3 exceptions routed \u2713" },
  { text: "\u25b6 escalation detected \u2192 support.tier3.routing" },
  { text: "  \u251c\u2500 sentiment analysis: critical (0.12)..." },
  { text: "  \u251c\u2500 customer lifetime value: $340K..." },
  { text: "  \u2514\u2500 VP account manager notified in 0.8s \u2713" },
];

export const VALUE_PROPS: ValueProp[] = [
  { title: "We track the breakthroughs", desc: "New model dropped at 2 AM? We already read the paper, benchmarked it, and know if it matters for you.", iconColor: COLORS.brand },
  { title: "We ship it to you -- fast", desc: "When a new capability unlocks real value, we integrate it into your systems within days, not quarters.", iconColor: COLORS.cyan },
  { title: "Your stack stays current", desc: "No more legacy AI debt. Your agents always run on the best available models, tools, and protocols.", iconColor: COLORS.green },
  { title: "Zero risk to your ops", desc: "We test, validate, and roll out upgrades with zero downtime. You get the upside without the chaos.", iconColor: COLORS.amber },
];

export const STATS: Stat[] = [
  { value: 50, suffix: "+", label: "Agents Deployed" },
  { value: 12, suffix: "", label: "Industries" },
  { value: 3, suffix: "x", label: "Avg. Efficiency Gain" },
  { value: 4, suffix: "wk", label: "Time to Deploy" },
  { value: 0, suffix: "", label: "Vendor Lock-in", override: "Zero" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export const CAROUSEL_CARDS: CarouselCard[] = [
  { id: "cover", heading: "3 Phases to Agentic", subheading: "How we transform your operations", body: "From strategy to deployment to continuous evolution." },
  { id: "phase1", heading: "Phase 1: Strategy", subheading: "Weeks 1-2", body: "We audit your operations, map every workflow, and identify the highest-impact automation opportunities with clear ROI projections.", phaseNumber: 1 },
  { id: "phase2", heading: "Phase 2: Build", subheading: "Weeks 3-6", body: "Custom AI agents built on your stack. Multi-agent orchestration, tool calling, durable workflows. Production-grade from day one.", phaseNumber: 2 },
  { id: "phase3", heading: "Phase 3: Evolve", subheading: "Ongoing", body: "We don't disappear. Your agents get smarter every week as new models drop and your business evolves. Continuous edge.", phaseNumber: 3 },
  { id: "cta", heading: "Ready to go agentic?", subheading: "Book a free strategy call", body: "team@agentiks.dev" },
];

/** Sentence config for per-sentence audio generation and visual sync */
export interface SentenceConfig {
  /** Unique key used for audio filenames (e.g., "v1-s1") */
  key: string;
  /** Text for TTS. null = text-only visual (no audio generated) */
  text: string | null;
  /** Name of the visual component to render during this sentence */
  visual: string;
  /** Fixed duration in frames (only for text-only sentences with no audio) */
  fixedDurationFrames?: number;
  /** Display text for text-only visuals (when text is null) */
  displayText?: string;
}

export interface VideoSentences {
  sentences: SentenceConfig[];
  /** Whether to add a 3s silence leader before the first audio sentence */
  addSilenceLeader: boolean;
}

/** Voiceover scripts -- per-sentence architecture for guaranteed audio-visual sync */
export const VO_SCRIPTS: Record<string, VideoSentences> = {
  video1: {
    addSilenceLeader: true,
    sentences: [
      { key: "v1-s1", text: null, visual: "TextSlam", fixedDurationFrames: 90, displayText: "Your team is drowning." },
      { key: "v1-s2", text: "Your top performer -- six figures -- spends half their day copy-pasting between spreadsheets.", visual: "SpreadsheetCopyPaste" },
      { key: "v1-s3", text: "Your ops lead is routing tickets at 11 PM because nobody else knows how.", visual: "TicketRouting" },
      { key: "v1-s4", text: "Every company has this problem. Nobody talks about it.", visual: "EveryCompany" },
      { key: "v1-s5", text: "Some companies sell you one chatbot and call it a day.", visual: "SadChatbot" },
      { key: "v1-s6", text: "That's... adorable.", visual: "ThatsAdorable" },
      { key: "v1-s7", text: "We're Agentiks. We build entire AI agent ecosystems.", visual: "LogoRevealSync" },
      { key: "v1-s8", text: "Strategy. Development. Multi-agent orchestration. Plugged into every system you use.", visual: "PillarCards" },
      { key: "v1-s9", text: "Forty, fifty, sixty percent of your team's time -- given back.", visual: "PercentCounter" },
      { key: "v1-s10", text: "Book a free strategy call at agentiks dot dev. The future is agentic.", visual: "CTAEndCard" },
    ],
  },
  video2: {
    addSilenceLeader: true,
    sentences: [
      { key: "v2-s1", text: null, visual: "CounterOpen", fixedDurationFrames: 90, displayText: "60%" },
      { key: "v2-s2", text: "It's Thursday. Your team's fried. Pipeline's backed up. Two hundred leads sitting untouched.", visual: "ThursdayBurnout" },
      { key: "v2-s3", text: "That used to be the cost of doing business. Not anymore.", visual: "CostOfBusiness" },
      { key: "v2-s4", text: "AI agents don't follow scripts -- they reason, adapt, and execute. Twenty-four seven.", visual: "AgentsReason" },
      { key: "v2-s5", text: "Done like a teammate who never sleeps, never forgets, and gets faster every day.", visual: "PerfectTeammate" },
      { key: "v2-s6", text: "Forty to sixty percent of your workload -- handled.", visual: "WorkloadCounter" },
      { key: "v2-s7", text: "Revenue goes up. Costs go down. That's what we build at Agentiks.", visual: "RevenueUpCostsDown" },
      { key: "v2-s8", text: "Book a free strategy call. Visit agentiks dot dev.", visual: "CTAEndCard" },
    ],
  },
  video3: {
    addSilenceLeader: false,
    sentences: [
      { key: "v3-s1", text: "Last week, three new AI models dropped. Two new frameworks. Did you catch that?", visual: "ModelDrop" },
      { key: "v3-s2", text: "AI moves faster than any industry in history. Most businesses can't keep up.", visual: "NewModelsWeekly" },
      { key: "v3-s3", text: "That's our job.", visual: "ThatsOurJob" },
      { key: "v3-s4", text: "We track every breakthrough and integrate what matters in days, not quarters.", visual: "TrackBreakthroughs" },
      { key: "v3-s5", text: "Most AI companies build you something and disappear. We make it better every single week.", visual: "BuildAndDisappear" },
      { key: "v3-s6", text: "The companies that figure this out now will be untouchable in two years.", visual: "Untouchable" },
      { key: "v3-s7", text: "The ones that wait... won't.", visual: "CatchUpCost" },
      { key: "v3-s8", text: "Visit agentiks dot dev. Book a free strategy call.", visual: "CTAEndCard" },
    ],
  },
} as const;

/** Frame rate constant */
export const FPS = 30;

/** Default voice settings for ElevenLabs TTS */
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  stability: 0.25,
  similarityBoost: 0.75,
  style: 0.0,
  speed: 1.05,
};

/** Per-video voice settings overrides (if needed) */
export const VIDEO_VOICE_SETTINGS: Record<string, VoiceSettings> = {
  video1: DEFAULT_VOICE_SETTINGS,
  video2: DEFAULT_VOICE_SETTINGS,
  video3: DEFAULT_VOICE_SETTINGS,
};

/** Lightning bolt logo path (from magnet-logo.tsx) */
export const LOGO_PATH = "M60,0 L35,50 L50,50 L25,100 L45,100 L20,150 L100,60 L75,60 L100,0 Z";

/** Seeded PRNG for deterministic randomness across Remotion frames */
export function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
