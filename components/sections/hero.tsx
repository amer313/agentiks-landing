"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { CornerButton } from "@/components/ui/corner-button"
import { HeroBackground } from "@/components/ui/hero-background"
import { AgentiksLogo } from "@/components/ui/agentiks-logo"

export function Hero() {
  return (
    <section className="min-h-[90vh] relative overflow-hidden">
      <HeroBackground />

      {/* Brand mark watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <AgentiksLogo className="w-[45vh] h-[45vh] text-brand/[0.04]" />
      </div>

      <div className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="outline" className="mb-8 font-mono text-xs tracking-widest uppercase border-ag-line-hover text-muted-foreground">
            AI agent systems for every business
          </Badge>
        </motion.div>

        <motion.h1
          className="text-[clamp(2.8rem,5.5vw,5.5rem)] font-medium leading-[1.08] tracking-tight mb-6 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          We make your{" "}
          <br className="hidden md:block" />
          business <span className="text-brand">agentic.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
        >
          Agentiks designs and builds custom AI agent systems that automate workflows, scale operations, and give your team superpowers. Any industry. Any size.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <CornerButton href="https://cal.com/agentiks/strategy-call" external>
            Book a Strategy Call <ArrowRight className="w-4 h-4" />
          </CornerButton>
          <CornerButton href="#capabilities" variant="secondary">
            See What We Build
          </CornerButton>
        </motion.div>
      </div>
    </section>
  )
}
