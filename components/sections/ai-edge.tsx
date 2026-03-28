"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Newspaper, Rocket, RefreshCw, Shield } from "lucide-react"

const pillars = [
  {
    icon: Newspaper,
    num: "01",
    title: "We track the breakthroughs",
    desc: "New model dropped at 2 AM? We already read the paper, benchmarked it, and know if it matters for you.",
  },
  {
    icon: Rocket,
    num: "02",
    title: "We ship it to you — fast",
    desc: "When a new capability unlocks real value, we integrate it into your systems within days, not quarters.",
  },
  {
    icon: RefreshCw,
    num: "03",
    title: "Your stack stays current",
    desc: "No more legacy AI debt. Your agents always run on the best available models, tools, and protocols.",
  },
  {
    icon: Shield,
    num: "04",
    title: "Zero risk to your ops",
    desc: "We test, validate, and roll out upgrades with zero downtime. You get the upside without the chaos.",
  },
]

export function AIEdge() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Map vertical scroll to horizontal translation
  // 4 cards, each ~380px + gap, minus viewport width
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"])

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-10">
          <motion.p
            className="font-mono text-xs tracking-[0.2em] uppercase text-brand mb-3"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
          >
            always ahead
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-medium tracking-tight"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [0, 1]) }}
          >
            AI moves fast.{" "}
            <span className="text-brand">You won&apos;t fall behind.</span>
          </motion.h2>
        </div>

        {/* Horizontal scroll track */}
        <motion.div className="flex gap-6 pl-6 md:pl-12" style={{ x }}>
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={i}
                className="shrink-0 w-[340px] md:w-[400px] rounded-2xl border border-ag-line bg-card/80 backdrop-blur-sm p-8 flex flex-col"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [i * 0.1, i * 0.1 + 0.12],
                    [0, 1]
                  ),
                  scale: useTransform(
                    scrollYProgress,
                    [i * 0.1, i * 0.1 + 0.12],
                    [0.9, 1]
                  ),
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs text-brand/50 tracking-widest">{p.num}</span>
                </div>
                <h3 className="text-xl font-medium mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            )
          })}

          {/* Final card: CTA */}
          <motion.div
            className="shrink-0 w-[340px] md:w-[400px] rounded-2xl border border-brand/20 bg-brand/[0.06] p-8 flex flex-col items-center justify-center text-center"
            style={{
              opacity: useTransform(scrollYProgress, [0.5, 0.65], [0, 1]),
              scale: useTransform(scrollYProgress, [0.5, 0.65], [0.9, 1]),
            }}
          >
            <p className="font-mono text-xs tracking-widest text-brand/60 uppercase mb-3">Every week</p>
            <p className="text-lg font-medium">New AI capabilities deployed to clients</p>
          </motion.div>
        </motion.div>

        {/* Scroll progress bar */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-10 w-full">
          <div className="h-px bg-ag-line rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand/50 origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <span className="font-mono text-[10px] text-muted-foreground/40">Scroll to explore</span>
            <motion.span
              className="font-mono text-[10px] text-muted-foreground/40"
              style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]) }}
            >
              Keep scrolling ↓
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  )
}
