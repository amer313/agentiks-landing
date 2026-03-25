# Agentiks

**AI agent consulting & development agency.** We design and build custom AI agent systems that automate workflows, scale operations, and give your team superpowers.

**Live:** [agentiks.dev](https://agentiks.dev)

## Tech Stack

- **Next.js 16** + React 19
- **Tailwind CSS v4** + shadcn/ui
- **Framer Motion** — scroll reveals, tab animations, rotating hero text
- **Geist** — Sans + Mono font family
- **Vercel** — deployment + domain + SSL

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
app/
  layout.tsx          # Root layout (dark mode, Geist fonts)
  page.tsx            # Home page — assembles all sections
  globals.css         # Theme variables (dark blue palette)

components/
  sections/
    nav.tsx           # Fixed nav with mobile menu
    hero.tsx          # Rotating words + MagnetLogo background
    halftone-divider  # Bayer-matrix dark/light zone transition
    social-proof.tsx  # Testimonial cards
    setup.tsx         # 3-phase how-it-works
    stats-bar.tsx     # Animated counter grid
    capabilities.tsx  # Tabbed showcase panel
    pricing.tsx       # 4-tier pricing cards + ShineBorder
    faq.tsx           # Expandable accordion
    cta.tsx           # Contact section with gradient glow
    footer.tsx        # Link columns + status badges
  ui/
    button, badge, card, separator, shine-border, magnet-logo
  scroll-reveal.tsx   # Viewport animation wrapper
  section-header.tsx  # Mono label + title + separator
```

## Deployment

Pushes to `main` auto-deploy to [agentiks.dev](https://agentiks.dev) via Vercel.
