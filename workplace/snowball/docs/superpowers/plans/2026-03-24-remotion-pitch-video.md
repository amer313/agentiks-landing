# Snowball MVP Pitch Video — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a ~75-second Remotion video that mirrors the workflow.html — a cinematic client pitch video for Snowball Ventures / Renovation Marketing Pros, branded with Agentiks design tokens.

**Architecture:** 7 scenes composed with `TransitionSeries` and `fade()` transitions. Each scene is a standalone React component using `useCurrentFrame()` + `spring()` for all animation. Inter font via `@remotion/google-fonts`. No CSS transitions/animations — all frame-driven. Props via Zod schema for reuse on future clients.

**Tech Stack:** Remotion 4, React, TypeScript, `@remotion/transitions`, `@remotion/google-fonts`, Zod

**Design Tokens (matching agentiks.dev):**
```
BG:        #050508 (rgb 5,5,8)
Surface:   #0e0f12
Card:      #16171c
Text:      #f7f8f8
Muted:     #8a8f98
Blue:      #2563eb
Cyan:      #06b6d4
Green:     #22c55e
Amber:     #f59e0b
Purple:    #8b5cf6
Rose:      #f43f5e
```

**Scene Breakdown (30fps, ~2250 frames total = 75s):**

| Scene | Duration | Content |
|-------|----------|---------|
| 1. Title | 5s (150f) | Agentiks badge, headline, gradient text, stat counters |
| 2. Problem | 8s (240f) | 4 pain-point cards animate in with stagger |
| 3. Card Capture | 12s (360f) | Phone mockup, scan line, OCR fields extracting |
| 4. AI Ranking | 10s (300f) | Lead pipeline list, bars filling, rank badges |
| 5. Follow-Up | 12s (360f) | Email preview + WhatsApp conversation bubbles |
| 6. Dashboard | 10s (300f) | Stat counters, chart bars, activity feed |
| 7. CTA / Close | 8s (240f) | Cost summary, next steps, agentiks.dev logo |

Fade transitions: 15 frames each (0.5s), 6 transitions = -90 frames.
**Total: ~2160 frames = 72s**

---

### Task 1: Scaffold Remotion Project

**Files:**
- Create: `video/package.json`
- Create: `video/tsconfig.json`
- Create: `video/remotion.config.ts`
- Create: `video/src/Root.tsx`
- Create: `video/src/types.ts`
- Create: `video/src/theme.ts`

- [ ] **Step 1: Initialize Remotion project**

```bash
cd /Users/yussefalta/workplace/snowball
npx create-video@latest video --template blank
```

Select TypeScript when prompted. This creates the scaffolding.

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/yussefalta/workplace/snowball/video
npm install @remotion/google-fonts @remotion/transitions zod
```

- [ ] **Step 3: Create theme.ts with Agentiks design tokens**

Create `video/src/theme.ts`:

```ts
export const theme = {
  bg: '#050508',
  surface: '#0e0f12',
  card: '#16171c',
  text: '#f7f8f8',
  muted: '#8a8f98',
  mutedAlpha: 'rgba(247, 248, 248, 0.5)',
  blue: '#2563eb',
  blueSoft: 'rgba(37, 99, 235, 0.12)',
  cyan: '#06b6d4',
  cyanSoft: 'rgba(6, 182, 212, 0.10)',
  green: '#22c55e',
  greenSoft: 'rgba(34, 197, 94, 0.12)',
  amber: '#f59e0b',
  amberSoft: 'rgba(245, 158, 11, 0.12)',
  purple: '#8b5cf6',
  purpleSoft: 'rgba(139, 92, 246, 0.12)',
  rose: '#f43f5e',
  roseSoft: 'rgba(244, 63, 94, 0.12)',
  border: 'rgba(255, 255, 255, 0.06)',
  borderAccent: 'rgba(37, 99, 235, 0.2)',
} as const;
```

- [ ] **Step 4: Create types.ts with Zod schema for video props**

Create `video/src/types.ts`:

```ts
import { z } from 'zod';

export const pitchVideoSchema = z.object({
  clientName: z.string().default('Snowball Ventures'),
  projectName: z.string().default('Renovation Marketing Pros'),
  laborReduction: z.number().default(40),
  ambassadorCount: z.number().default(20),
  leadsPerMonth: z.string().default('100+'),
  channels: z.number().default(2),
  mvpCostLow: z.number().default(95),
  mvpCostHigh: z.number().default(140),
});

export type PitchVideoProps = z.infer<typeof pitchVideoSchema>;
```

- [ ] **Step 5: Create Root.tsx composition entry**

Create `video/src/Root.tsx`:

```tsx
import { Composition } from 'remotion';
import { PitchVideo } from './PitchVideo';
import { pitchVideoSchema } from './types';

export const RemotionRoot = () => {
  return (
    <Composition
      id="SnowballPitch"
      component={PitchVideo}
      durationInFrames={2160}
      fps={30}
      width={1920}
      height={1080}
      schema={pitchVideoSchema}
      defaultProps={{
        clientName: 'Snowball Ventures',
        projectName: 'Renovation Marketing Pros',
        laborReduction: 40,
        ambassadorCount: 20,
        leadsPerMonth: '100+',
        channels: 2,
        mvpCostLow: 95,
        mvpCostHigh: 140,
      }}
    />
  );
};
```

- [ ] **Step 6: Create PitchVideo.tsx shell with TransitionSeries**

Create `video/src/PitchVideo.tsx`:

```tsx
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { loadFont } from '@remotion/google-fonts/Inter';
import { theme } from './theme';
import type { PitchVideoProps } from './types';

// Scenes — will be created in subsequent tasks
import { TitleScene } from './scenes/TitleScene';
import { ProblemScene } from './scenes/ProblemScene';
import { CardCaptureScene } from './scenes/CardCaptureScene';
import { RankingScene } from './scenes/RankingScene';
import { FollowUpScene } from './scenes/FollowUpScene';
import { DashboardScene } from './scenes/DashboardScene';
import { CtaScene } from './scenes/CtaScene';

const { fontFamily } = loadFont('normal', {
  weights: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

const FADE_DURATION = 15;
const fadeTiming = linearTiming({ durationInFrames: FADE_DURATION });

export const PitchVideo: React.FC<PitchVideoProps> = (props) => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg, fontFamily }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={150}>
          <TitleScene {...props} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence durationInFrames={240}>
          <ProblemScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence durationInFrames={360}>
          <CardCaptureScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence durationInFrames={300}>
          <RankingScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence durationInFrames={360}>
          <FollowUpScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence durationInFrames={300}>
          <DashboardScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />
        <TransitionSeries.Sequence durationInFrames={240}>
          <CtaScene {...props} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 7: Create placeholder scene files**

Create empty placeholder components for each scene so the project compiles:

`video/src/scenes/TitleScene.tsx`
`video/src/scenes/ProblemScene.tsx`
`video/src/scenes/CardCaptureScene.tsx`
`video/src/scenes/RankingScene.tsx`
`video/src/scenes/FollowUpScene.tsx`
`video/src/scenes/DashboardScene.tsx`
`video/src/scenes/CtaScene.tsx`

Each placeholder:
```tsx
import { AbsoluteFill } from 'remotion';
import { theme } from '../theme';

export const SceneName: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ color: theme.text, fontSize: 48, fontWeight: 700 }}>Scene Placeholder</div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 8: Verify project compiles and opens in Remotion Studio**

```bash
cd /Users/yussefalta/workplace/snowball/video
npx remotion studio
```

Expected: Remotion Studio opens in browser, shows "SnowballPitch" composition with placeholder scenes and fade transitions.

- [ ] **Step 9: Commit**

```bash
git add video/
git commit -m "feat: scaffold Remotion project with scene structure and Agentiks theme"
```

---

### Task 2: Title Scene (Scene 1)

**Files:**
- Create: `video/src/scenes/TitleScene.tsx`
- Create: `video/src/components/AnimatedCounter.tsx`
- Create: `video/src/components/GradientText.tsx`

- [ ] **Step 1: Create GradientText component**

Create `video/src/components/GradientText.tsx`:

```tsx
import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const GradientText: React.FC<{
  children: React.ReactNode;
  colors: string[];
  fontSize: number;
  fontWeight?: number;
  delay?: number;
}> = ({ children, colors, fontSize, fontWeight = 800, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame - delay, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame - delay, [0, 0.5 * fps], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const gradientPosition = interpolate(frame, [0, 4 * fps], [0, 100]);

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        letterSpacing: '-0.04em',
        lineHeight: 1.05,
        background: `linear-gradient(135deg, ${colors.join(', ')})`,
        backgroundSize: '200% 200%',
        backgroundPosition: `${gradientPosition}% 50%`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
};
```

- [ ] **Step 2: Create AnimatedCounter component**

Create `video/src/components/AnimatedCounter.tsx`:

```tsx
import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { theme } from '../theme';

export const AnimatedCounter: React.FC<{
  value: number | string;
  label: string;
  suffix?: string;
  delay?: number;
}> = ({ value, label, suffix = '', delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const numericValue = typeof value === 'number' ? value : 0;
  const displayValue = typeof value === 'string'
    ? value
    : Math.round(interpolate(entrance, [0, 1], [0, numericValue])) + suffix;

  return (
    <div style={{ textAlign: 'center', opacity: entrance, transform: `translateY(${(1 - entrance) * 20}px)` }}>
      <div style={{ fontSize: 56, fontWeight: 800, color: theme.text, fontVariantNumeric: 'tabular-nums' }}>
        {displayValue}
      </div>
      <div style={{ fontSize: 18, color: theme.muted, marginTop: 4 }}>{label}</div>
    </div>
  );
};
```

- [ ] **Step 3: Build TitleScene**

Replace `video/src/scenes/TitleScene.tsx`:

```tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { theme } from '../theme';
import { GradientText } from '../components/GradientText';
import { AnimatedCounter } from '../components/AnimatedCounter';
import type { PitchVideoProps } from '../types';

export const TitleScene: React.FC<PitchVideoProps> = ({
  clientName,
  laborReduction,
  ambassadorCount,
  leadsPerMonth,
  channels,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeEntrance = spring({ frame, fps, config: { damping: 200 } });
  const headlineEntrance = spring({ frame: frame - 10, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 900,
          height: 900,
          background: `radial-gradient(circle, rgba(37,99,235,0.08), transparent 60%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Badge */}
      <div
        style={{
          padding: '8px 24px',
          background: theme.blueSoft,
          border: `1px solid ${theme.borderAccent}`,
          borderRadius: 100,
          fontSize: 18,
          fontWeight: 500,
          color: theme.blue,
          marginBottom: 40,
          opacity: badgeEntrance,
          transform: `translateY(${(1 - badgeEntrance) * 20}px)`,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: theme.blue }} />
        Prepared for {clientName}
      </div>

      {/* Headline */}
      <div
        style={{
          textAlign: 'center',
          opacity: headlineEntrance,
          transform: `translateY(${(1 - headlineEntrance) * 30}px)`,
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, color: theme.text, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
          Automated lead follow-up.
        </div>
        <GradientText colors={[theme.blue, theme.cyan, theme.blue]} fontSize={72} delay={15}>
          Intelligent. Autonomous.
        </GradientText>
      </div>

      {/* Stat counters */}
      <div style={{ display: 'flex', gap: 80, marginTop: 64 }}>
        <AnimatedCounter value={laborReduction} suffix="%" label="Labor reduction" delay={30} />
        <AnimatedCounter value={ambassadorCount} label="Ambassadors (VA)" delay={40} />
        <AnimatedCounter value={leadsPerMonth} label="Leads / month" delay={50} />
        <AnimatedCounter value={channels} label="Channels" delay={60} />
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 4: Preview in Remotion Studio, verify counter + gradient animations**

```bash
cd /Users/yussefalta/workplace/snowball/video && npx remotion studio
```

- [ ] **Step 5: Commit**

```bash
git add video/src/scenes/TitleScene.tsx video/src/components/
git commit -m "feat: add title scene with animated counters and gradient text"
```

---

### Task 3: Problem Scene (Scene 2)

**Files:**
- Create: `video/src/scenes/ProblemScene.tsx`
- Create: `video/src/components/PainCard.tsx`

- [ ] **Step 1: Create PainCard component**

Create `video/src/components/PainCard.tsx`:

```tsx
import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { theme } from '../theme';

export const PainCard: React.FC<{
  number: string;
  title: string;
  description: string;
  accentColor: string;
  accentBg: string;
  delay: number;
}> = ({ number, title, description, accentColor, accentBg, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame: frame - delay, fps, config: { damping: 200 } });

  return (
    <div
      style={{
        background: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: 16,
        padding: 32,
        flex: 1,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 40}px)`,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: accentBg,
          color: accentColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        {number}
      </div>
      <div style={{ fontSize: 20, fontWeight: 600, color: theme.text, marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 15, color: theme.muted, lineHeight: 1.6 }}>{description}</div>
    </div>
  );
};
```

- [ ] **Step 2: Build ProblemScene**

Replace `video/src/scenes/ProblemScene.tsx`:

```tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { theme } from '../theme';
import { PainCard } from '../components/PainCard';

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelEntrance = spring({ frame, fps, config: { damping: 200 } });
  const headingEntrance = spring({ frame: frame - 8, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg, padding: 80 }}>
      <div style={{ opacity: labelEntrance, transform: `translateY(${(1 - labelEntrance) * 20}px)` }}>
        <div style={{ fontSize: 14, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: theme.blue, marginBottom: 12 }}>
          Current state
        </div>
      </div>
      <div style={{ opacity: headingEntrance, transform: `translateY(${(1 - headingEntrance) * 20}px)` }}>
        <div style={{ fontSize: 52, fontWeight: 700, color: theme.text, letterSpacing: '-0.03em', marginBottom: 48 }}>
          What we're solving
        </div>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <PainCard number="01" title="Manual card entry" description="800+ business cards in a binder. Manual CRM entry is slow and error-prone." accentColor={theme.rose} accentBg={theme.roseSoft} delay={20} />
        <PainCard number="02" title="Follow-up bottleneck" description="Ambassadors manually send follow-ups. 80% of closing success — but it gets dropped." accentColor={theme.amber} accentBg={theme.amberSoft} delay={30} />
        <PainCard number="03" title="No lead intelligence" description="Prioritization is gut-feel. No automated ranking for highest-value opportunities." accentColor={theme.purple} accentBg={theme.purpleSoft} delay={40} />
        <PainCard number="04" title="Can't scale" description="Growing from 60 to 150 ambassadors. Manual process breaks at this scale." accentColor={theme.blue} accentBg={theme.blueSoft} delay={50} />
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 3: Preview, verify staggered card animation**

- [ ] **Step 4: Commit**

```bash
git add video/src/scenes/ProblemScene.tsx video/src/components/PainCard.tsx
git commit -m "feat: add problem scene with staggered pain cards"
```

---

### Task 4: Card Capture Scene (Scene 3)

**Files:**
- Create: `video/src/scenes/CardCaptureScene.tsx`
- Create: `video/src/components/PhoneMockup.tsx`

- [ ] **Step 1: Create PhoneMockup component**

Create `video/src/components/PhoneMockup.tsx` — a phone frame with a scan line animation, business card rendering, and OCR field extraction that animates field-by-field using staggered springs.

Key elements:
- Phone bezel with rounded corners (borderRadius 40)
- Notch at top
- "Scan Business Card" header
- Dashed scan area with animated scan line (frame-driven Y position via interpolate)
- Mini business card (white bg, dark text: "Michael Rivera, VP of Operations, Apex Construction Group")
- Extracted fields list appearing one-by-one with spring delays: Name, Title, Company, Email, Phone — each in green monospace text

All animation driven by `useCurrentFrame()` + `spring()`.

- [ ] **Step 2: Build CardCaptureScene**

Replace `video/src/scenes/CardCaptureScene.tsx`:

Two-column layout:
- Left: section label "Intake" (blue tag), heading "Business Card Capture", description text, 4 bullet points fading in with stagger
- Right: PhoneMockup component floating with subtle Y oscillation via `interpolate(frame, [0, 180], [0, -8])` (NOT CSS animation)

- [ ] **Step 3: Preview scan line + field extraction animation**

- [ ] **Step 4: Commit**

```bash
git add video/src/scenes/CardCaptureScene.tsx video/src/components/PhoneMockup.tsx
git commit -m "feat: add card capture scene with phone mockup and OCR animation"
```

---

### Task 5: Ranking Scene (Scene 4)

**Files:**
- Create: `video/src/scenes/RankingScene.tsx`
- Create: `video/src/components/RankPipeline.tsx`

- [ ] **Step 1: Create RankPipeline component**

Create `video/src/components/RankPipeline.tsx`:

Desktop mockup frame (macOS-style dots) containing a list of leads:
- Each row: rank badge (Critical/High/Medium/Low with color), company name, score number, animated bar
- Bars animate with `spring()` + staggered delay (i * 8 frames)
- Bar width = `spring() * (score / 100) * maxWidth`
- Rows slide in from bottom with stagger

Data:
```
Critical | Apex Construction Group | 98 | rose
Critical | Metro Builders LLC      | 94 | rose
High     | BuildRight Industries   | 81 | amber
High     | Nova Renovations        | 76 | amber
Medium   | Cornerstone Homes       | 54 | blue
Low      | Sunrise Interiors        | 29 | muted
```

- [ ] **Step 2: Build RankingScene**

Two-column layout (same pattern as CardCaptureScene but reversed):
- Left: RankPipeline mockup
- Right: "Intelligence" tag (cyan), "AI Lead Ranking" heading, description, 4 bullet points

- [ ] **Step 3: Preview bar fill animations**

- [ ] **Step 4: Commit**

```bash
git add video/src/scenes/RankingScene.tsx video/src/components/RankPipeline.tsx
git commit -m "feat: add ranking scene with animated lead pipeline"
```

---

### Task 6: Follow-Up Scene (Scene 5)

**Files:**
- Create: `video/src/scenes/FollowUpScene.tsx`
- Create: `video/src/components/EmailPreview.tsx`
- Create: `video/src/components/WhatsAppChat.tsx`

- [ ] **Step 1: Create EmailPreview component**

Desktop mockup frame with:
- Header rows: To, From, Subject
- Email body with personalized text
- Fade in with spring entrance

- [ ] **Step 2: Create WhatsAppChat component**

Dark WhatsApp-styled container:
- Header: avatar circle (gradient bg, "MR" initials), name, "online" status
- 3 chat bubbles appearing sequentially with spring delays:
  - Sent (green bg): "Hey Michael! Great meeting you..."
  - Sent: "Would you be open to a quick lunch..."
  - Received (dark bg): "Hey! Absolutely, that sounds great..."
- Typing indicator (3 dots) after last message — opacity oscillates via `interpolate(frame % 30, ...)`

- [ ] **Step 3: Build FollowUpScene**

Two-column layout:
- Left: "Outreach" tag (green), heading, description, follow-up cadence mini-table, bullet points
- Right: EmailPreview stacked above WhatsAppChat, both with entrance delays

- [ ] **Step 4: Preview message sequence animation**

- [ ] **Step 5: Commit**

```bash
git add video/src/scenes/FollowUpScene.tsx video/src/components/EmailPreview.tsx video/src/components/WhatsAppChat.tsx
git commit -m "feat: add follow-up scene with email and WhatsApp mockups"
```

---

### Task 7: Dashboard Scene (Scene 6)

**Files:**
- Create: `video/src/scenes/DashboardScene.tsx`
- Create: `video/src/components/DashMockup.tsx`

- [ ] **Step 1: Create DashMockup component**

Full-width dashboard mockup:
- Top bar: "Renovation Marketing Pros" title + "Virginia (DMV)" pill
- 4 stat cards in a row: Total Leads (152), Emails Sent (340), WA Messages (95), Appts Booked (18) — each with animated count-up using spring
- Bar chart: 7 bars (Mon-Sun) growing with staggered springs
- Activity feed: 4 items fading in sequentially with color-coded dots and badges

- [ ] **Step 2: Build DashboardScene**

Two-column layout:
- Left: "Visibility" tag (purple), heading, description, bullets
- Right: DashMockup (wider — takes ~60% of the space)

- [ ] **Step 3: Preview stat counter + bar chart animations**

- [ ] **Step 4: Commit**

```bash
git add video/src/scenes/DashboardScene.tsx video/src/components/DashMockup.tsx
git commit -m "feat: add dashboard scene with animated stats and chart"
```

---

### Task 8: CTA / Close Scene (Scene 7)

**Files:**
- Create: `video/src/scenes/CtaScene.tsx`

- [ ] **Step 1: Build CtaScene**

Replace `video/src/scenes/CtaScene.tsx`:

Centered layout with staged reveals:
1. Cost summary: "$95-140/month" large text with "/month" muted, "Virginia pilot — 100 leads/month" subtitle
2. 4 next-step items in a row (same PainCard component, numbered 1-4): Requirements doc, Example emails, Monday CRM access, Signed NDA
3. Agentiks logo: "agentiks.dev" with blue dot, fading in last
4. "Prepared March 2026 - Confidential" footer text

All entrances driven by `spring()` with increasing delays.

- [ ] **Step 2: Preview full close sequence**

- [ ] **Step 3: Commit**

```bash
git add video/src/scenes/CtaScene.tsx
git commit -m "feat: add CTA close scene with cost summary and next steps"
```

---

### Task 9: Final Polish & Render

**Files:**
- Modify: `video/src/PitchVideo.tsx` (timing adjustments if needed)

- [ ] **Step 1: Preview full video end-to-end in Remotion Studio**

```bash
cd /Users/yussefalta/workplace/snowball/video && npx remotion studio
```

Play through all 7 scenes. Check:
- Fade transitions feel smooth
- No scene feels too long or too short
- Counter animations complete before scene transitions
- All text is readable at 1920x1080

- [ ] **Step 2: Adjust any scene durations if needed**

If a scene feels too long/short, adjust `durationInFrames` in `PitchVideo.tsx` and update the `<Composition>` total in `Root.tsx`.

- [ ] **Step 3: Render final MP4**

```bash
cd /Users/yussefalta/workplace/snowball/video
npx remotion render SnowballPitch out/snowball-pitch.mp4
```

Expected: MP4 file at `video/out/snowball-pitch.mp4`, ~72 seconds, 1920x1080, 30fps.

- [ ] **Step 4: Commit final version**

```bash
git add -A
git commit -m "feat: complete Snowball MVP pitch video — 72s Remotion render"
```

---

## File Structure Summary

```
video/
├── package.json
├── tsconfig.json
├── remotion.config.ts
├── src/
│   ├── Root.tsx                    # Composition entry
│   ├── PitchVideo.tsx              # TransitionSeries orchestrator
│   ├── theme.ts                    # Agentiks design tokens
│   ├── types.ts                    # Zod schema for props
│   ├── scenes/
│   │   ├── TitleScene.tsx          # Scene 1: Hero
│   │   ├── ProblemScene.tsx        # Scene 2: Pain points
│   │   ├── CardCaptureScene.tsx    # Scene 3: OCR pipeline
│   │   ├── RankingScene.tsx        # Scene 4: Lead ranking
│   │   ├── FollowUpScene.tsx       # Scene 5: Email + WhatsApp
│   │   ├── DashboardScene.tsx      # Scene 6: Dashboard
│   │   └── CtaScene.tsx            # Scene 7: CTA / Close
│   └── components/
│       ├── AnimatedCounter.tsx     # Count-up stat
│       ├── GradientText.tsx        # Animated gradient text
│       ├── PainCard.tsx            # Problem card with spring entrance
│       ├── PhoneMockup.tsx         # Phone frame + scan animation
│       ├── RankPipeline.tsx        # Lead ranking list + bars
│       ├── EmailPreview.tsx        # Email mockup
│       ├── WhatsAppChat.tsx        # WhatsApp conversation
│       └── DashMockup.tsx          # Dashboard with stats + chart
└── out/
    └── snowball-pitch.mp4          # Final rendered video
```
