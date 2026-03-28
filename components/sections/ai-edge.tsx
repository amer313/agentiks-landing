"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Newspaper, Rocket, RefreshCw, Shield } from "lucide-react"

const cards = [
  {
    icon: Newspaper,
    num: "01",
    title: "We track the breakthroughs",
    desc: "New model dropped at 2 AM? We already read the paper, benchmarked it, and know if it matters for you.",
    stat: "24/7",
    statLabel: "monitoring",
  },
  {
    icon: Rocket,
    num: "02",
    title: "We ship it to you — fast",
    desc: "When a new capability unlocks real value, we integrate it into your systems within days, not quarters.",
    stat: "< 72h",
    statLabel: "turnaround",
  },
  {
    icon: RefreshCw,
    num: "03",
    title: "Your stack stays current",
    desc: "No more legacy AI debt. Your agents always run on the best available models, tools, and protocols.",
    stat: "Zero",
    statLabel: "tech debt",
  },
  {
    icon: Shield,
    num: "04",
    title: "Zero risk to your ops",
    desc: "We test, validate, and roll out upgrades with zero downtime. You get the upside without the chaos.",
    stat: "99.9%",
    statLabel: "uptime",
  },
]

function PerspectiveCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })

  const Icon = card.icon

  // Start tilted back in 3D, settle to flat
  const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0])
  const translateZ = useTransform(scrollYProgress, [0, 1], [-200, 0])
  const translateY = useTransform(scrollYProgress, [0, 1], [120, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: "1200px",
      }}
    >
      <motion.div
        className="rounded-2xl border border-ag-line bg-card/90 backdrop-blur-sm p-8 md:p-10 relative overflow-hidden group hover:border-brand/20 transition-colors duration-300"
        style={{
          rotateX,
          translateZ,
          translateY,
          opacity,
          scale,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          translateY: -4,
          rotateX: -2,
          transition: { duration: 0.3 },
        }}
      >
        {/* Big background number */}
        <span className="absolute -top-2 -right-2 font-mono text-[100px] font-bold leading-none text-foreground/[0.03] select-none">
          {card.num}
        </span>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center group-hover:bg-brand/15 transition-colors">
                <Icon className="w-6 h-6 text-brand" strokeWidth={1.5} />
              </div>
              <span className="font-mono text-[10px] text-brand/40 tracking-[0.3em]">
                STEP {card.num}
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-medium text-brand">{card.stat}</div>
              <div className="font-mono text-[9px] text-muted-foreground/50 tracking-wider uppercase">{card.statLabel}</div>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-medium mb-3 tracking-tight">{card.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.06),transparent_70%)] pointer-events-none" />
      </motion.div>
    </motion.div>
  )
}

export function AIEdge() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 1], [80, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  return (
    <section ref={sectionRef} className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 relative overflow-visible">
      {/* Header with its own scroll animation */}
      <motion.div
        className="text-center mb-16"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-brand mb-4">
          always ahead
        </p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
          AI moves fast.{" "}
          <span className="text-brand">You won&apos;t fall behind.</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-[550px] mx-auto mt-5 leading-relaxed">
          We live on the bleeding edge so you don&apos;t have to.
        </p>
      </motion.div>

      {/* 3D perspective grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <PerspectiveCard key={i} card={card} index={i} />
        ))}
      </div>

      {/* Bottom tag */}
      <motion.div
        className="mt-14 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="font-mono text-xs tracking-widest uppercase text-brand/50">
          New AI capabilities deployed to clients weekly
        </p>
      </motion.div>
    </section>
  )
}
