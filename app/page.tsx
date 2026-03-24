import { Nav } from "@/components/sections/nav"
import { Hero } from "@/components/sections/hero"
import { HalftoneDivider } from "@/components/sections/halftone-divider"
import { SocialProof } from "@/components/sections/social-proof"
import { Setup } from "@/components/sections/setup"
import { StatsBar } from "@/components/sections/stats-bar"
import { Capabilities } from "@/components/sections/capabilities"
import { Pricing } from "@/components/sections/pricing"
import { FAQ } from "@/components/sections/faq"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main>
      <Nav />

      {/* Dark: Hero */}
      <Hero />

      {/* Transition: dark -> light */}
      <HalftoneDivider direction="dark-to-light" lightColor="#ffffff" darkColor="#050508" />

      {/* Light: Social proof + how it works + stats */}
      <div className="light-zone">
        <SocialProof />
        <Setup />
        <StatsBar />
      </div>

      {/* Transition: light -> dark */}
      <HalftoneDivider direction="light-to-dark" lightColor="#ffffff" darkColor="#050508" />

      {/* Dark: Capabilities */}
      <Capabilities />

      {/* Transition: dark -> light */}
      <HalftoneDivider direction="dark-to-light" lightColor="#ffffff" darkColor="#050508" />

      {/* Light: Pricing + FAQ */}
      <div className="light-zone">
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
