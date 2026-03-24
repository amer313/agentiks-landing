---
name: visual-client-proposal
description: Use when creating a client-facing MVP proposal, workflow diagram, pitch deck, or project scope document that needs to visually sell an idea — especially after a discovery call or meeting transcript
---

# Visual Client Proposal

Create animated, branded, single-page HTML proposals that show clients what their system **could look like** — not just describe it. Self-contained, no dependencies, send as a file or host anywhere.

## When to Use

- After a client discovery call / meeting transcript
- When you need to visualize an MVP workflow for a client
- When creating a pitch document that needs to **sell**, not just inform
- When the client needs to see mockups of features before committing

## Core Principle

**Show, don't tell.** Generic bullet points don't close deals. Realistic mockups of their actual data in their actual workflow do. Every proposal should make the client think "they already built this."

## Process

### 1. Extract Brand Tokens from Agency Website

Use browser automation to pull the exact design system from agentiks.dev (or whatever agency site):

```js
// Extract via browser JS
const body = getComputedStyle(document.body);
const buttons = document.querySelectorAll('button, [class*="btn"]');
// Get: bg color, text color, accent colors, font family, button styles,
// card styles, gradients, border treatments
```

**Required tokens:**
- Background (primary, surface, card)
- Text (primary, secondary, muted)
- Accent colors (primary, secondary + soft/alpha variants)
- Font family + weights
- Border color + radius
- Any gradients or glow effects

### 2. Structure the Page

Every proposal follows this section flow:

```
NAV        — Agency logo + "MVP Proposal — [Date]"
HERO       — Client badge, headline, gradient tagline, key stat counters
PAIN       — 4 cards showing current bottlenecks (numbered, color-coded)
FEATURES   — Alternating two-column layouts (text + mockup), one per feature
SYSTEM     — Architecture diagram (layered nodes with arrows)
COSTS      — Side-by-side pricing cards (MVP vs At Scale)
TIMELINE   — 4-column rollout strip (Week 1-4)
SCOPE      — Two cards: "Included in MVP" vs "Future Phases"
NEXT STEPS — 4 action cards for what client needs to provide
FOOTER     — Agency branding + confidential notice
```

### 3. Build Feature Mockups (The Differentiator)

This is what makes proposals sell. Each feature gets a **realistic mockup** using the client's actual data:

**Phone Mockup** (for mobile features):
- Phone bezel with notch, status bar
- Scan line animation for OCR/camera features
- Extracted data fields appearing one-by-one
- Gentle float animation via `Math.sin(frame)`

**Chat/Messaging Mockup** (WhatsApp, Slack, SMS):
- Platform-accurate colors (WhatsApp: #0b141a bg, #005c4b sent, #1f2c34 received)
- Sequential message bubbles with staggered entrance delays
- Typing indicator (3 pulsing dots)
- Read receipts / checkmarks
- Real personalized message content using client's data

**Email Mockup** (follow-up sequences):
- macOS-style window chrome (3 dots)
- To/From/Subject header rows
- Personalized body referencing real client scenarios
- Signature block

**Dashboard Mockup** (analytics/reporting):
- Top bar with project name + region pill
- Stat cards with animated count-up numbers
- Bar chart with staggered bar growth
- Activity feed with color-coded dots and badges

**Lead/Pipeline Mockup** (CRM features):
- Ranked list with color-coded badges (Critical/High/Medium/Low)
- Animated progress bars filling to score width
- Company names from client's actual industry

**Key rule:** Use the client's **real company names, people, and industry terms** in every mockup. "Apex Construction Group" not "Company A."

### 4. Animation System

All animations use CSS + IntersectionObserver. No JS frameworks needed.

**Scroll reveals** (core animation — every section uses these):
```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* Stagger children */
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }
```

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right')
  .forEach(el => observer.observe(el));
```

**Directional reveals** (for two-column feature layouts):
```css
.reveal-left  { opacity: 0; transform: translateX(-60px); /* same transition */ }
.reveal-right { opacity: 0; transform: translateX(60px);  /* same transition */ }
```

**Hero stat counters** (requestAnimationFrame, not setInterval):
```js
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.textContent.includes('%') ? '%' : '';
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
```

**Gradient text animation:**
```css
.gradient {
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-cyan), var(--accent-blue));
  background-size: 200% 200%;
  animation: gradientShift 4s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Additional animations to include:**
- `@keyframes shimmer` — subtle light sweep across mockup frames
- `@keyframes pulse` — for badge dots and typing indicators
- `@keyframes scanLine` — for OCR/camera scan effects
- `@keyframes slideInMsg` — for chat bubble entrances
- `@keyframes fillBar` — for progress bars and chart bars
- Hover effects: cards lift (`translateY(-4px)`), timeline items reveal underline, system nodes elevate with shadow

### 5. System Architecture Diagram

Layered horizontal rows connected by arrow SVGs:

```
INPUT      → [Node] [Node]
               ↓
PLATFORM   → [Node] [Node] [Node]
               ↓
AI ENGINE  → [Node] [Node] [Node]
               ↓
INTEGRATIONS → [Node] [Node] [Node]
               ↓
OUTPUT     → [Node] [Node] [Node]
```

Each node is a colored pill: `.node-blue`, `.node-cyan`, `.node-green`, `.node-amber`, `.node-purple`, `.node-rose` — using the accent-soft backgrounds with accent text colors. Hover lifts + shadow.

### 6. Cost Section Pattern

Two side-by-side cards:

**MVP card** (featured — has blue gradient top border):
- Price: large bold number range + "/month" muted
- Subtitle: pilot scope description
- Line items: service → price, with green "$0" / "Included" for free items

**At Scale card** (standard):
- Same structure, higher numbers, full scope description

**One-time setup** row below both cards.

### 7. Responsive Considerations

- Max-width 1200px container
- Grid columns collapse to single column at 768px
- Phone mockup stays centered on mobile
- Font sizes use `clamp()` for hero headings
- Sticky nav with backdrop-filter blur

## Agentiks Default Tokens

When building for Agentiks.dev clients, use these exact values:

```css
--bg-primary: rgb(5, 5, 8);
--bg-surface: rgb(14, 15, 18);
--bg-card: rgb(22, 23, 28);
--text-primary: rgb(247, 248, 248);
--text-secondary: rgb(138, 143, 152);
--text-muted: rgba(247, 248, 248, 0.5);
--accent-blue: rgb(37, 99, 235);
--accent-cyan: rgb(6, 182, 212);
--accent-green: rgb(34, 197, 94);
--accent-amber: rgb(245, 158, 11);
--accent-purple: rgb(139, 92, 246);
--accent-rose: rgb(244, 63, 94);
```

Font: `'Inter', -apple-system, system-ui, sans-serif` (loaded from Google Fonts).

## Checklist

Before delivering the proposal:

- [ ] Brand tokens extracted from agency website (not guessed)
- [ ] Client name/company personalized throughout (badge, mockups, footer)
- [ ] All mockups use realistic client data (real names, companies, industry terms)
- [ ] Every section has scroll-reveal animations
- [ ] Feature mockups alternate left-right layout
- [ ] Hero has animated stat counters
- [ ] Cost section has both MVP and Scale pricing
- [ ] "What we need from you" section has clear action items
- [ ] Footer shows "Confidential" + date
- [ ] File is self-contained HTML (no external dependencies except Google Fonts)
- [ ] Tested in browser — all animations trigger on scroll

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Generic placeholder data ("Company A", "John Doe") | Use real names from meeting transcript |
| Static page with no animations | Every section needs reveal animation at minimum |
| Missing mockups — just text descriptions | Build at least one realistic UI mockup per feature |
| Using a JS framework | Keep it vanilla — single HTML file, no build step |
| Forgetting mobile responsiveness | Test at 768px and 375px widths |
| Over-engineering animations | Scroll reveals + stagger is 80% of the wow factor |
| Not matching agency branding | Extract tokens from the actual website first |
