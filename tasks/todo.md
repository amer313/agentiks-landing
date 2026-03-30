# Agentiks Cinematic Product Trailer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single 35-second cinematic product trailer video rendered via Remotion at both 16:9 (1920x1080) and 9:16 (1080x1920) with the updated red brand, fictional dashboard UI, kinetic typography, and ambient soundtrack.

**Architecture:** Fresh-start the `ads/src/compositions/` and `ads/src/components/scenes/` directories (delete old v1/v2/v3 content). Build 6 new scene components (HookScene, ProblemMontage, LogoRevealScene, DashboardDemo, ImpactStats, EndCard) composed into a single `TrailerComposition`. No voiceover -- purely visual with background music. The DashboardDemo is the hero scene: a self-contained fictional agent management UI with sidebar, orchestrator graph, live metrics, and a simulated mouse cursor.

**Tech Stack:** Remotion 4.x, React 19, TypeScript, FFmpeg for final assembly

---

## Frame Budget (30fps, 1050 frames max = 35s)

| Act | Scene Component | Frames | Seconds | Frame Range |
|-----|----------------|--------|---------|-------------|
| 1 - Hook | HookScene | 150 | 5.0s | 0-149 |
| 2 - Problem | ProblemMontage | 210 | 7.0s | 150-359 |
| 3 - Reveal | LogoRevealScene + DashboardDemo | 240 | 8.0s | 360-599 |
| 4 - Impact | ImpactStats | 240 | 8.0s | 600-839 |
| 5 - Close | EndCard | 210 | 7.0s | 840-1049 |
| **Total** | | **1050** | **35.0s** | 0-1049 |

### Scene-by-Scene Frame Timing Detail

**ACT 1 -- HookScene (frames 0-149, 5s)**
- Frames 0-20: Black screen
- Frames 20-50: Text "What if your entire operation" fades in (opacity 0->1)
- Frames 50-80: Second line "ran itself?" fades in below
- Frames 80-110: Hold both lines
- Frames 110-130: Text fades out
- Frames 130-149: Logo glow pulses subtly in background (brand red radial gradient, 0.04 opacity)

**ACT 2 -- ProblemMontage (frames 150-359, 7s)**
- 4 quick-cut panels, ~52 frames each (~1.75s):
  - Panel 1 (frames 0-51 relative): Email inbox counter climbing 47->238, caption "Manual workflows."
  - Panel 2 (frames 52-103 relative): Spreadsheet grid with cells flashing red, caption "Bottlenecks."
  - Panel 3 (frames 104-155 relative): Chat bubbles stacking up, caption "Wasted hours."
  - Panel 4 (frames 156-199 relative): Clock face with hands spinning to 11 PM
- Frames 200-209 relative: Flash white transition (opacity spike then fade)

**ACT 3 -- LogoRevealScene + DashboardDemo (frames 360-599, 8s)**
- Frames 360-419 (2s): Logo reveal -- visor/chevron SVG draws in, "Meet Agentiks." text
- Frames 420-599 (6s): Dashboard demo:
  - Frames 0-30 relative: Dashboard fades in at scale 0.85, zooms to 1.0
  - Frames 30-90 relative: Sidebar agents populate (8 agents stagger)
  - Frames 60-120 relative: Orchestrator graph nodes + edges draw
  - Frames 90-110 relative: Cursor moves to "Deploy Agent" button, clicks
  - Frames 100-150 relative: Metrics animate
  - Frames 120-170 relative: Task queue items slide in
  - Frame 140+ relative: Text overlay "AI agents that run your workflows. 24/7."

**ACT 4 -- ImpactStats (frames 600-839, 8s)**
- Frames 0-60 relative: "60% less manual work" counter + slam
- Frames 60-120 relative: "3x efficiency" spring bounce
- Frames 120-180 relative: "4 weeks to deploy" slide in
- Frames 180-210 relative: Dashboard snippet pan with all-green checkmarks
- Frames 210-240 relative: "Strategy. Development. Orchestration. All of it." fade in/out

**ACT 5 -- EndCard (frames 840-1049, 7s)**
- Frames 0-30 relative: Fade to black
- Frames 30-80 relative: Logo springs in (scale 0.5->1.0)
- Frames 80-120 relative: "The future is agentic." tagline fades in
- Frames 120-150 relative: "agentiks.dev" URL fades in
- Frames 150-210 relative: Hold with subtle brand glow pulse

---

## File Map

### Files to DELETE (old content)
```
ads/src/compositions/Video1TheProblem.tsx
ads/src/compositions/Video2TheTransformation.tsx
ads/src/compositions/Video3TheEdge.tsx
ads/src/compositions/Still4Orchestrator.tsx
ads/src/compositions/Still5Carousel.tsx
ads/src/components/scenes/*.tsx (all 15 old scene files)
ads/src/components/scenes/index.ts
ads/src/components/phrase-visuals/ (entire directory)
ads/src/components/sync/ (entire directory)
ads/src/timing/ (entire directory)
```

### Files to KEEP (reusable infrastructure)
```
ads/src/fonts.ts
ads/src/components/backgrounds/ (all 6 files)
ads/src/components/typography/ (all 4 files + index)
ads/src/components/brand/AgentCard.tsx
ads/src/components/brand/CTAButton.tsx
ads/src/components/brand/StatsStrip.tsx
ads/src/components/brand/TerminalWindow.tsx
ads/scripts/ (all existing scripts + utils)
ads/remotion.config.ts, package.json, tsconfig.json
ads/public/fonts/, ads/public/audio/
```

### Files to CREATE
```
ads/src/compositions/TrailerComposition.tsx
ads/src/components/scenes/HookScene.tsx
ads/src/components/scenes/ProblemMontage.tsx
ads/src/components/scenes/LogoRevealScene.tsx
ads/src/components/scenes/DashboardDemo.tsx
ads/src/components/scenes/ImpactStats.tsx
ads/src/components/scenes/EndCard.tsx
ads/src/components/scenes/index.ts
ads/src/components/dashboard/DashboardShell.tsx
ads/src/components/dashboard/Sidebar.tsx
ads/src/components/dashboard/OrchestratorGraph.tsx
ads/src/components/dashboard/MetricsPanel.tsx
ads/src/components/dashboard/TaskQueue.tsx
ads/src/components/dashboard/MouseCursor.tsx
ads/src/components/dashboard/index.ts
ads/scripts/render-trailer.ts
ads/scripts/assemble-trailer.ts
```

### Files to REWRITE
```
ads/src/brand.ts (new red palette, remove VO config)
ads/src/types.ts (simplified, no VO types)
ads/src/Root.tsx (single trailer composition at 2 aspect ratios)
ads/src/components/brand/LogoReveal.tsx (visor/chevron instead of 3-ray)
```

### Files to MODIFY
```
ads/src/components/backgrounds/DarkBackground.tsx (purple glow -> red glow)
ads/src/components/brand/OrchestratorCore.tsx (purple/cyan -> red palette)
ads/src/components/brand/index.ts (update exports)
ads/scripts/generate-music.ts (add trailer track)
```

---

## Parallelization Strategy

Tasks 1-2 are sequential (foundation that everything else depends on).
Tasks 3-7 can then be parallelized into 3 groups:

- **Group A (Subagent 1):** Tasks 3+4 -- Scene components: HookScene, ProblemMontage
- **Group B (Subagent 2):** Tasks 5+6 -- Dashboard: all 7 dashboard/ files + DashboardDemo scene
- **Group C (Subagent 3):** Task 7 -- LogoRevealScene, ImpactStats, EndCard

After Groups A/B/C complete:
- **Task 8** (sequential): Composition wiring, Root.tsx, render/assemble scripts
- **Task 9** (sequential): Verify, build, render

---

## Tasks

### Task 1: Clean Slate + Update Brand Foundation

**Files:**
- Delete: All files listed in "Files to DELETE"
- Rewrite: `ads/src/brand.ts`
- Rewrite: `ads/src/types.ts`
- Modify: `ads/src/components/backgrounds/DarkBackground.tsx`
- Modify: `ads/src/components/brand/OrchestratorCore.tsx`

- [x] **Step 1: Delete old compositions and scene files**

```bash
cd /Users/yussefalta/workplace/agentiks/.claude/worktrees/agent-a320c393/ads
rm -f src/compositions/Video1TheProblem.tsx
rm -f src/compositions/Video2TheTransformation.tsx
rm -f src/compositions/Video3TheEdge.tsx
rm -f src/compositions/Still4Orchestrator.tsx
rm -f src/compositions/Still5Carousel.tsx
rm -f src/components/scenes/AfterStateScene.tsx
rm -f src/components/scenes/AgentiksIntroScene.tsx
rm -f src/components/scenes/AvatarScene.tsx
rm -f src/components/scenes/BeforeStateScene.tsx
rm -f src/components/scenes/CarouselCardScene.tsx
rm -f src/components/scenes/CounterOpenScene.tsx
rm -f src/components/scenes/CTAEndCardScene.tsx
rm -f src/components/scenes/HeadlineCascadeScene.tsx
rm -f src/components/scenes/OrchestratorStillScene.tsx
rm -f src/components/scenes/ProblemMontageScene.tsx
rm -f src/components/scenes/ProofScene.tsx
rm -f src/components/scenes/ResultsScene.tsx
rm -f src/components/scenes/StakesScene.tsx
rm -f src/components/scenes/TextSlamScene.tsx
rm -f src/components/scenes/ValuePropsScene.tsx
rm -f src/components/scenes/index.ts
rm -rf src/components/phrase-visuals/
rm -rf src/components/sync/
rm -rf src/timing/
```

- [x] **Step 2: Rewrite brand.ts with new red palette**

Replace entire file. Key changes from old brand.ts:
- `brand` changes from `#B400FF` to `#DC2626`
- `brandLight` from `#CF5FFF` to `#EF4444`
- `brandDark` from `#9000CC` to `#B91C1C`
- `cyan` mapped to `#EF4444` (brand-light, no more cyan)
- `magenta` to `#FCA5A5` (soft red)
- Remove `purple`, `logoCyan` color keys from BrandColors interface and COLORS object
- Add `LOGO_PATHS` constant with 6 SVG path data strings from visor/chevron
- Add `SCENE_TIMING` constant with frame ranges for all 6 scenes
- Add `TRAILER_DURATION_FRAMES = 1050`
- Remove ALL of: `VO_SCRIPTS`, `SentenceConfig`, `VideoSentences`, `DEFAULT_VOICE_SETTINGS`, `VIDEO_VOICE_SETTINGS`, old `LOGO_PATH`
- Remove `VALUE_PROPS`, `CAROUSEL_CARDS`
- Simplify `AGENT_CARDS`: 8 entries (not 16), add `icon` field, remove `px`/`py`/`subs` fields
- Simplify `STATS`: 3 entries matching trailer content
- Keep `TERMINAL_LINES` (trimmed to 7 entries), `FPS`, `mulberry32`

Full brand.ts content:

```typescript
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
  hook:      { from: 0,   duration: 150 },
  problem:   { from: 150, duration: 210 },
  reveal:    { from: 360, duration: 60 },
  dashboard: { from: 420, duration: 180 },
  impact:    { from: 600, duration: 240 },
  endCard:   { from: 840, duration: 210 },
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
```

- [x] **Step 3: Rewrite types.ts (simplified)**

Remove all VO/timing/phrase types. New content:

```typescript
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
```

- [x] **Step 4: Update DarkBackground.tsx -- red glow**

Change the radial gradient color from `rgba(180,0,255,...)` to `rgba(220,38,38,...)`.

- [x] **Step 5: Update OrchestratorCore.tsx -- red palette**

Change `COLORS.cyan` references in the gradient to `COLORS.brandLight`. The `COLORS.magenta` reference auto-updates via the new brand.ts mapping.

- [x] **Step 6: Run TypeScript check**

```bash
cd /Users/yussefalta/workplace/agentiks/.claude/worktrees/agent-a320c393/ads && npx tsc --noEmit
```

Expected: Errors about missing imports in Root.tsx (compositions not created yet). brand.ts, types.ts, backgrounds, and brand components should compile clean.

---

### Task 2: Rewrite Logo Reveal Component

**Files:**
- Rewrite: `ads/src/components/brand/LogoReveal.tsx`
- Modify: `ads/src/components/brand/index.ts`

- [x] **Step 1: Rewrite LogoReveal.tsx for visor/chevron logo**

Replace old 3-ray animation with visor/chevron. Animation phases:
1. Visor block via clipPath (0-30% of duration)
2. Slit cutout opacity (20-40%)
3. Three chevrons sweep in with staggered translateY (30-70%)
4. Diamond spring scale (65-85%)
5. "AGENTIKS" text fade (80-100%, conditional on `showText` prop)

Props: `startFrame` (default 0), `durationFrames`, `width` (default 1920), `height` (default 1080), `showText` (default true).

SVG viewBox `0 0 149 157`, scaled up 2.5x. Brand-red glow SVG filter. Uses `LOGO_PATHS` from brand.ts, `interpolate` and `spring` from Remotion.

- [x] **Step 2: Update brand/index.ts exports**

Remove any exports referencing deleted files (e.g., AgentCluster). Keep: LogoReveal, AgentCard, CTAButton, OrchestratorCore, StatsStrip, TerminalWindow.

---

### Task 3: Build HookScene

**Files:**
- Create: `ads/src/components/scenes/HookScene.tsx`

- [x] **Step 1: Create HookScene.tsx**

Self-contained (no props). Duration context: 150 frames. Uses `useCurrentFrame()`.

- `AbsoluteFill` with `COLORS.background`
- Brand-red radial glow pulsing at frames 130-149
- Line 1 "What if your entire operation" -- weight 300, 64px, fade in frames 20-50
- Line 2 "ran itself?" -- weight 700, 72px, fade in frames 50-80
- Both lines fade out frames 110-130
- Uses `FONT_FAMILY_SANS`, `COLORS.foreground`

---

### Task 4: Build ProblemMontage

**Files:**
- Create: `ads/src/components/scenes/ProblemMontage.tsx`

- [x] **Step 1: Create ProblemMontage.tsx**

Duration: 210 frames. Uses `Sequence` from Remotion for 4 panels + flash.

**Panel 1 -- Email Inbox (0-51 relative):**
- Dark card (`COLORS.surface`), 6 email row bars slide in from right (stagger 4 frames)
- Red badge with counter 47->238 (use `interpolate`)
- Caption "Manual workflows." slams in at frame 10 (spring)

**Panel 2 -- Spreadsheet (52-103 relative):**
- 6x8 CSS grid of cells with `COLORS.line` borders
- Random cells flash `COLORS.brand` using `mulberry32(frame)` (3-4 cells red per frame)
- Caption "Bottlenecks."

**Panel 3 -- Chat Messages (104-155 relative):**
- 5 chat bubbles slide in from right, stagger 6 frames
- Notification counter 3->12
- Caption "Wasted hours."

**Panel 4 -- Clock (156-199 relative):**
- SVG clock: circle + 12 ticks + rotating hour hand (0->330 degrees)
- "11 PM" text in `COLORS.brand` appears at frame 24 relative to panel start

**White Flash (200-209 relative):**
- White `AbsoluteFill`, opacity [0, 0.8, 0] over frames 200/203/209

Each panel has `AbsoluteFill` with `COLORS.background`, content centered, caption at bottom (FONT_FAMILY_SANS, 40px bold, COLORS.foreground).

---

### Task 5: Build Dashboard Sub-Components

**Files:**
- Create: `ads/src/components/dashboard/DashboardShell.tsx`
- Create: `ads/src/components/dashboard/Sidebar.tsx`
- Create: `ads/src/components/dashboard/OrchestratorGraph.tsx`
- Create: `ads/src/components/dashboard/MetricsPanel.tsx`
- Create: `ads/src/components/dashboard/TaskQueue.tsx`
- Create: `ads/src/components/dashboard/MouseCursor.tsx`
- Create: `ads/src/components/dashboard/index.ts`

- [x] **Step 1: Create DashboardShell.tsx**

Props: `children: React.ReactNode`, `opacity?: number`.

Absolute-positioned layout container (1920x1080 design):
- Top bar: height 56px, `COLORS.surface2`, "Agentiks Dashboard" + breadcrumb
- Sidebar area: left 0, width 280px, `COLORS.surface`, right border
- Main area: left 280px, right 320px, `COLORS.background`
- Right panel: right 0, width 320px, `COLORS.surface`, left border
- Children rendered as overlay

- [x] **Step 2: Create Sidebar.tsx**

Props: `visibleCount: number` (0-8).

Vertical list of `AGENT_CARDS` (8 entries). Each card:
- 64px height, 12px 16px padding
- 3px left colored border
- Label (FONT_FAMILY_SANS 14px bold), status (FONT_FAMILY_MONO 11px muted)
- Green pulsing dot (8px, opacity via `Math.sin`)
- Entry: translateX(-20->0) + opacity 0->1 when index < visibleCount
- Bottom border COLORS.line

- [x] **Step 3: Create OrchestratorGraph.tsx**

Props: `progress: number` (0-1).

SVG visualization:
- Center node: "Orchestrator", COLORS.brand, 40px radius, pulsing ring
- 6 outer nodes hexagonal layout (radius 160px), colored from AGENT_CARDS
- Edges: strokeDashoffset animation based on progress
- Data particles: 2px white circles along edges, cycling via frame
- Node opacity staggered: `interpolate(progress, [i*0.15, i*0.15+0.2], [0, 1])`

- [x] **Step 4: Create MetricsPanel.tsx**

Props: `frame: number`.

4 metric cards (72px each, COLORS.surface2, 8px radius):
- Leads Scored: counter 3847->3849
- Tasks Complete: counter 1204->1207
- Uptime: "99.97%"
- Active Agents: "8/8"

Plus terminal log section: 4 lines typewriter-revealed, stagger 25 frames.

- [x] **Step 5: Create TaskQueue.tsx**

Props: `frame: number`.

5 task items sliding in (translateY 30->0, stagger 12 frames):
- Complete: Pipeline scoring, Invoice batch
- Processing: Route optimization (with animated progress bar 0->75%)
- Queued: Board deck, SOC2 check

Status badges: green check (complete), amber pulse (processing), gray clock (queued).

- [x] **Step 6: Create MouseCursor.tsx**

Props: `path: Array<{x: number, y: number, frame: number}>`, `clickFrame?: number`.

- 12px white circle, subtle drop shadow
- Trail: 3 smaller circles at past positions (decreasing opacity)
- Position: interpolate between path waypoints
- At clickFrame: scale spring 1.0->0.8->1.0, ripple ring expanding

- [x] **Step 7: Create dashboard/index.ts**

Barrel export all 6 components.

---

### Task 6: Build DashboardDemo Scene

**Files:**
- Create: `ads/src/components/scenes/DashboardDemo.tsx`

- [x] **Step 1: Create DashboardDemo.tsx**

Hero scene. Composes all dashboard sub-components. Duration: 180 frames.

Animation orchestration:
- Frames 0-30: Dashboard fade in (opacity 0->1, scale 0.85->1.0 spring)
- Frames 30-90: sidebarCount = `Math.min(8, Math.floor((frame-30)/7.5))`
- Frames 60-120: orchestratorProgress = `interpolate(frame, [60,120], [0,1], clamp)`
- Frames 90-160: MouseCursor active with CURSOR_PATH, clickFrame=100
- Frames 100-150: MetricsPanel (pass frame-100 clamped)
- Frames 120-170: TaskQueue (pass frame-120 clamped)
- Frames 140-180: Text overlay "AI agents that run your workflows. 24/7."

"Deploy Agent" button in main area: COLORS.brand bg, white text, scale(0.95) at click frame 100.

Layout: DashboardShell wrapping Sidebar (left), OrchestratorGraph + TaskQueue (center), MetricsPanel (right). MouseCursor as overlay on top. Text caption at bottom.

---

### Task 7: Build LogoRevealScene + ImpactStats + EndCard

**Files:**
- Create: `ads/src/components/scenes/LogoRevealScene.tsx`
- Create: `ads/src/components/scenes/ImpactStats.tsx`
- Create: `ads/src/components/scenes/EndCard.tsx`

- [x] **Step 1: Create LogoRevealScene.tsx**

Duration: 60 frames. Wraps LogoReveal component.
- `AbsoluteFill` + `COLORS.background`
- `LogoReveal startFrame={0} durationFrames={50} showText={false}`
- "Meet Agentiks." text at bottom 20%, fade in frames 30-50 (weight 300, 48px)

- [x] **Step 2: Create ImpactStats.tsx**

Duration: 240 frames. 4 staggered stat reveals:

1. Frames 0-60: "60%" counts 0->60 (AnimatedCounter), "less manual work" slams in
2. Frames 60-120: "3x" springs in, "efficiency" fades in
3. Frames 120-180: "4 weeks" slides from right, "to deploy" fades in
4. Frames 180-210: Dashboard snippet at 0.3 scale, panning left-to-right

Frames 210-240: "Strategy. Development. Orchestration. All of it." centered, fade in/out.

Each stat: large number (120px, FONT_FAMILY_SANS), label below (32px, COLORS.mutedForeground). Previous stat fades out as next enters.

- [x] **Step 3: Create EndCard.tsx**

Duration: 210 frames. Minimal.
- Frames 0-30: Black
- Frames 30-80: LogoReveal (showText=false, durationFrames=50)
- Frames 80-120: "The future is agentic." (36px, weight 300, COLORS.mutedForeground, fade in)
- Frames 120-150: "agentiks.dev" (FONT_FAMILY_MONO, 24px, COLORS.brand, fade in)
- Frames 150-210: Hold with pulsing brand glow (sin wave opacity 0.03-0.08)

---

### Task 8: Wire Composition + Root + Scripts

**Files:**
- Create: `ads/src/components/scenes/index.ts`
- Create: `ads/src/compositions/TrailerComposition.tsx`
- Rewrite: `ads/src/Root.tsx`
- Modify: `ads/scripts/generate-music.ts`
- Create: `ads/scripts/render-trailer.ts`
- Create: `ads/scripts/assemble-trailer.ts`

- [x] **Step 1: Create scenes/index.ts**

```typescript
export { HookScene } from "./HookScene";
export { ProblemMontage } from "./ProblemMontage";
export { LogoRevealScene } from "./LogoRevealScene";
export { DashboardDemo } from "./DashboardDemo";
export { ImpactStats } from "./ImpactStats";
export { EndCard } from "./EndCard";
```

- [x] **Step 2: Create TrailerComposition.tsx**

Sequences all 6 scenes using SCENE_TIMING from brand.ts. Audio track from `staticFile("audio/music-trailer.wav")` at volume 0.4. DarkBackground as base layer.

- [x] **Step 3: Rewrite Root.tsx**

Two Composition entries:
- `agentiks-trailer-16x9`: 1920x1080
- `agentiks-trailer-9x16`: 1080x1920

Both use TrailerComposition, TRAILER_DURATION_FRAMES (1050), FPS (30).

- [x] **Step 4: Add trailer track to generate-music.ts**

Add `{ name: "music-trailer.wav", duration: 38 }` to the tracks array.

- [x] **Step 5: Create render-trailer.ts**

Renders both compositions via `npx remotion render`. Same pattern as existing render-videos.ts.

- [x] **Step 6: Create assemble-trailer.ts**

Meta-optimized export for both aspect ratios using `exportForMeta`.

---

### Task 9: Verify, Generate Music, Render, Assemble

- [x] **Step 1: TypeScript check (0 errors required)**

```bash
cd /Users/yussefalta/workplace/agentiks/.claude/worktrees/agent-a320c393/ads && npx tsc --noEmit
```

- [x] **Step 2: Generate trailer music**

```bash
cd /Users/yussefalta/workplace/agentiks/.claude/worktrees/agent-a320c393/ads && npx tsx scripts/generate-music.ts
```

- [x] **Step 3: Preview in Remotion Studio** (skipped -- CLI mode, verified via render)

```bash
cd /Users/yussefalta/workplace/agentiks/.claude/worktrees/agent-a320c393/ads && npx remotion studio
```

Verify all 5 acts render correctly in sequence.

- [x] **Step 4: Render both aspect ratios**

```bash
cd /Users/yussefalta/workplace/agentiks/.claude/worktrees/agent-a320c393/ads && npx tsx scripts/render-trailer.ts
```

- [x] **Step 5: Assemble Meta-optimized finals**

```bash
cd /Users/yussefalta/workplace/agentiks/.claude/worktrees/agent-a320c393/ads && npx tsx scripts/assemble-trailer.ts
```

- [x] **Step 6: Verify final output specs**

```bash
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of json public/output/trailer-16x9-final.mp4
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of json public/output/trailer-9x16-final.mp4
```

Expected: h264, correct dimensions, ~35s, 30fps for both.

---

## Dashboard UI Visual Specification

### Layout at 1920x1080
```
+--[Top Bar 56px]---------------------------------------------------+
| [Logo] Agentiks Dashboard    Operations > Agent Cluster > Live     |
+--[Sidebar 280px]--+--[Main Area]-------------+--[Right 320px]-----+
|                    |                          |                     |
| Sales Agent    [G] |   [Orchestrator Graph]   | Leads Scored        |
| Finance Agent  [G] |                          |   3,847  +12 today  |
| Support Agent  [G] |         [Center          | Tasks Complete      |
| Marketing...   [G] |          Node]           |   1,204  +34        |
| HR Agent       [G] |                          | Uptime              |
| Data Agent     [G] |    [Deploy Agent btn]    |   99.97%            |
| Compliance     [G] |                          | Active Agents       |
| Ops Agent      [G] |                          |   8/8               |
|                    | [Task Queue]             |                     |
|                    | Complete  Pipeline        | [Activity Log]      |
|                    | Complete  Invoice batch   | > deploying...      |
|                    | Running   Route optim.    | > scoring leads...  |
|                    | Queued    Board deck      | > 127 high-intent   |
+--------------------+--------------------------+---------------------+
```

### Color Assignments
- Top bar: #10111A (COLORS.surface2)
- Sidebar: #0A0B10 (COLORS.surface)
- Main area: #050508 (COLORS.background)
- Right panel: #0A0B10 (COLORS.surface)
- Borders: rgba(255,255,255,0.06) (COLORS.line)
- Status dots: #10B981 (COLORS.green)
- Deploy button: #DC2626 bg (COLORS.brand), white text
- Text primary: #F7F8F8 (COLORS.foreground)
- Text muted: #8A8F98 (COLORS.mutedForeground)
