"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { HeroBackground } from "@/components/ui/hero-background"
import { AgentiksLogo } from "@/components/ui/agentiks-logo"

export function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-16 relative text-center overflow-hidden">
      <HeroBackground />

      {/* Brand mark watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <AgentiksLogo className="w-[45vh] h-[45vh] text-brand/[0.04]" />
      </div>

      <div className="relative z-10">
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
          <a
            href="https://cal.com/agentiks/strategy-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-3.5 rounded-xl bg-brand hover:bg-brand-dark text-white transition-colors"
          >
            Book a Strategy Call <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#capabilities"
            className="inline-flex items-center gap-2 text-sm font-medium px-8 py-3.5 rounded-xl border border-white/[0.1] text-foreground/70 hover:text-foreground hover:border-white/[0.2] transition-all"
          >
            See What We Build
          </a>
        </motion.div>
      </div>

    </section>
  )
}
