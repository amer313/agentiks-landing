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

/** Voiceover scripts for ElevenLabs TTS -- FINALIZED APPROVED VERSIONS */
export const VO_SCRIPTS = {
  video1: {
    /** 0:03-0:16 Problem + sneak-diss */
    scene1: "You ever watch your top performer -- the one you pay six figures -- spend half their day copy-pasting between spreadsheets? Or your ops lead manually routing tickets at 11 PM because nobody else knows how? Yeah. Every company has that. And nobody talks about it because... what's the alternative, right? And sure, some companies will sell you one chatbot, or one prompt template, and call it a day. That's... adorable.",
    /** 0:16-0:28 Agentiks intro */
    scene2: "So that's where we come in. We're Agentiks -- and we don't do one thing. We build entire AI agent ecosystems. Strategy. Custom development. Multi-agent orchestration. Plugged into every system you already use. Your CRM, your ERP, your databases -- all of it, talking to each other, running on autopilot.",
    /** 0:28-0:38 Proof */
    scene3: "We're talking forty, fifty, sixty percent of your team's time -- given back. Not by cutting corners. By putting intelligent agents on the work that used to need a human at every step. Your people go back to doing what actually grows the business.",
    /** 0:38-0:45 CTA */
    scene4: "We start every engagement with a free strategy call. No pitch, no commitment -- just a map of where agents will hit hardest for your business. Agentiks dot dev. The future is agentic.",
  },
  video2: {
    /** 0:03-0:16 Before state */
    scene1: "You know that feeling when it's Thursday and your team's already fried -- but the pipeline's backed up, reports are due, and someone still has to qualify those two hundred leads sitting in the CRM? That used to just be... the cost of doing business. It's not anymore.",
    /** 0:16-0:26 After state */
    scene2: "AI agents don't follow scripts -- they reason, they adapt, they execute. Twenty-four seven. Lead scoring, invoicing, customer intake, reporting -- done. And not done like a half-baked automation that breaks every other week. Done like a teammate who never sleeps, never forgets, and gets faster the longer it works.",
    /** 0:26-0:34 Results */
    scene3: "That's what our clients see. Forty, fifty, sixty percent of their workload -- handled. Their teams stop firefighting and start scaling. Revenue goes up. Costs go down. That's not a pitch -- that's what we build at Agentiks.",
    /** 0:34-0:42 CTA */
    scene4: "Book a free strategy call. We'll map your workflows and show you the ROI before you spend a dollar. Visit agentiks.dev.",
  },
  video3: {
    /** 0:00-0:03 Avatar open */
    scene1: "Last week, three new AI models dropped. Two new frameworks. One new protocol that changes everything. Did you catch that?",
    /** 0:03-0:12 Headline cascade */
    scene2: "AI moves faster than any industry in history. New models every week. New capabilities every day. Most businesses can't keep up -- and they shouldn't have to. That's our job.",
    /** 0:12-0:24 Value props */
    scene3: "We track every breakthrough. When something matters for your business, we integrate it in days -- not quarters. Your AI systems get smarter behind the scenes while you focus on what you do best. Running your business.",
    /** 0:24-0:34 Avatar return */
    scene4: "Most AI companies build you something and disappear. We build you something and then make it better. Every single week. Your agents evolve as the technology evolves. You'll never fall behind.",
    /** 0:34-0:42 Stakes */
    scene5: "And here's the thing nobody wants to say out loud -- the companies that figure this out now are going to be untouchable in two years. The ones that wait? They're going to spend twice as much trying to catch up. That's just how this works.",
    /** 0:42-0:48 CTA */
    scene6: "Visit agentiks.dev and book a free strategy call. Let us show you what's possible.",
  },
} as const;

/** Frame rate constant */
export const FPS = 30;

/** Default voice settings for ElevenLabs TTS */
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  stability: 0.38,
  similarityBoost: 0.75,
  style: 0.0,
  speed: 1.0,
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
