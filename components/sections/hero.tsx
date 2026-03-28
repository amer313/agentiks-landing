"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import MagnetLogo from "@/components/ui/magnet-logo"

const rotatingWords = ["autonomous.", "intelligent.", "unstoppable.", "agentic."]

export function Hero() {
  const [rotIdx, setRotIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setRotIdx((i) => (i + 1) % rotatingWords.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-16 relative text-center">
      <div className="absolute top-[15%] left-[25%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(180,0,255,0.08),transparent_70%)] animate-[drift_20s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.06),transparent_70%)] animate-[drift_25s_ease-in-out_infinite_reverse] pointer-events-none" />

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
          business{" "}
          <span className="inline-block relative">
            <span className="invisible">
              {rotatingWords.reduce((a, b) => a.length >= b.length ? a : b)}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={rotIdx}
                className="absolute left-0 top-0 text-brand"
                initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {rotatingWords[rotIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
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

      {/* MagnetLogo background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 h-screen">
        <div className="pointer-events-auto opacity-15">
          <MagnetLogo
            size="100vh"
            rows={40}
            columns={40}
            lineColor="rgba(180, 0, 255, 0.8)"
            lineWidth={2}
            lineHeight={16}
            baseAngle={0}
          />
        </div>
      </div>
    </section>
  )
}
