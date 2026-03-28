"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { CornerButton } from "@/components/ui/corner-button"
import { AgentiksLogo } from "@/components/ui/agentiks-logo"

export function CTA() {
  return (
    <section id="contact" className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/[0.06] via-ag-surface to-ag-cyan/[0.03] p-12 md:p-20 text-center overflow-hidden"
      >
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 pointer-events-none">
          <AgentiksLogo className="w-[250px] h-[250px] text-white/[0.03]" />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
            Ready to go agentic?
          </h2>
          <p className="text-lg text-muted-foreground max-w-[520px] mx-auto mb-10">
            Book a free strategy call. We&apos;ll audit your operations and show you exactly where AI agents will drive the most value.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CornerButton href="https://cal.com/agentiks/strategy-call" external>
              Book a Free Call <ArrowRight className="w-4 h-4" />
            </CornerButton>
            <a
              href="mailto:team@agentiks.dev"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
            >
              team@agentiks.dev
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
