import { Nav } from "@/components/sections/nav"
import { Hero } from "@/components/sections/hero"
import { HalftoneDivider } from "@/components/sections/halftone-divider"
import { Setup } from "@/components/sections/setup"
import { StatsBar } from "@/components/sections/stats-bar"
import { Orchestrator } from "@/components/sections/orchestrator"
import { DashboardShowcase } from "@/components/sections/dashboard-showcase"
import { AIEdge } from "@/components/sections/ai-edge"
import { Capabilities } from "@/components/sections/capabilities"
import { Pricing } from "@/components/sections/pricing"
import { FAQ } from "@/components/sections/faq"
import { GlobeSection } from "@/components/sections/globe-section"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main>
      <Nav />

      {/* Dark: Hero */}
      <Hero />

      {/* Dark: Dashboard showcase — Fey-style 3D MacBook reveal */}
      <DashboardShowcase />

      {/* Dark: Orchestrator animation */}
      <Orchestrator />

      {/* Transition: dark -> light */}
      <HalftoneDivider direction="dark-to-light" lightColor="#ffffff" darkColor="#050508" />

      {/* Light: How it works + stats */}
      <div className="light-zone">
        <Setup />
        <StatsBar />
      </div>

      {/* Transition: light -> dark */}
      <HalftoneDivider direction="light-to-dark" lightColor="#ffffff" darkColor="#050508" />

      {/* Dark: Capabilities */}
      <Capabilities />

      {/* Dark: Globe network visualization */}
      <GlobeSection />

      {/* Transition: dark -> light */}
      <HalftoneDivider direction="dark-to-light" lightColor="#ffffff" darkColor="#050508" />

      {/* Light: AI Edge + Pricing + FAQ */}
      <div className="light-zone">
        <AIEdge />
        <Pricing />
        <FAQ />
      </div>

      {/* Transition: light -> dark */}
      <HalftoneDivider direction="light-to-dark" lightColor="#ffffff" darkColor="#050508" />

      {/* Dark: CTA + footer */}
      <CTA />
      <Footer />
    </main>
  )
}
