"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { AgentiksLogo } from "@/components/ui/agentiks-logo"

export function ScrollStatement() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Logo: starts massive, zooms out and fades
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [8, 0.8])
  const logoOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0.08, 0])
  const logoRotate = useTransform(scrollYProgress, [0, 0.5], [0, -8])

  // Text lines reveal after logo shrinks
  const line1Y = useTransform(scrollYProgress, [0.35, 0.55], [60, 0])
  const line1Opacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1])

  const line2Y = useTransform(scrollYProgress, [0.45, 0.65], [60, 0])
  const line2Opacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1])

  const line3Y = useTransform(scrollYProgress, [0.55, 0.75], [60, 0])
  const line3Opacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1])

  const line4Y = useTransform(scrollYProgress, [0.65, 0.85], [60, 0])
  const line4Opacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1])

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Zooming logo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            scale: logoScale,
            opacity: logoOpacity,
            rotate: logoRotate,
          }}
        >
          <AgentiksLogo className="w-[30vh] h-[30vh] text-brand" />
        </motion.div>

        {/* Text that reveals after logo zooms through */}
        <div className="relative z-10 text-center px-6 max-w-[900px]">
          <motion.div
            className="text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-tight leading-[1.15]"
            style={{ y: line1Y, opacity: line1Opacity }}
          >
            We design, build, and deploy
          </motion.div>
          <motion.div
            className="text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-tight leading-[1.15] text-brand"
            style={{ y: line2Y, opacity: line2Opacity }}
          >
            AI agent systems
          </motion.div>
          <motion.div
            className="text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-tight leading-[1.15]"
            style={{ y: line3Y, opacity: line3Opacity }}
          >
            that run your business
          </motion.div>
          <motion.div
            className="text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-tight leading-[1.15] text-muted-foreground"
            style={{ y: line4Y, opacity: line4Opacity }}
          >
            while you sleep.
          </motion.div>
        </div>

        {/* Radial glow that pulses during zoom */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: useTransform(scrollYProgress, [0.1, 0.4, 0.6], [0, 0.6, 0]),
            background: "radial-gradient(circle at center, rgba(220,38,38,0.06) 0%, transparent 60%)",
          }}
        />
      </div>
    </section>
  )
}
