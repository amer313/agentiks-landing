"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Newspaper, Rocket, RefreshCw, Shield } from "lucide-react"
import { AgentiksLogo } from "@/components/ui/agentiks-logo"

const cards = [
  {
    icon: Newspaper,
    num: "01",
    title: "We track the breakthroughs",
    desc: "New model dropped at 2 AM? We already read the paper, benchmarked it, and know if it matters for you.",
    stat: "24/7",
    statLabel: "AI landscape monitoring",
  },
  {
    icon: Rocket,
    num: "02",
    title: "We ship it to you — fast",
    desc: "When a new capability unlocks real value, we integrate it into your systems within days, not quarters.",
    stat: "< 72h",
    statLabel: "Integration turnaround",
  },
  {
    icon: RefreshCw,
    num: "03",
    title: "Your stack stays current",
    desc: "No more legacy AI debt. Your agents always run on the best available models, tools, and protocols.",
    stat: "0",
    statLabel: "Technical debt",
  },
  {
    icon: Shield,
    num: "04",
    title: "Zero risk to your ops",
    desc: "We test, validate, and roll out upgrades with zero downtime. You get the upside without the chaos.",
    stat: "99.9%",
    statLabel: "Uptime guarantee",
  },
]

function Card({ card, index, total }: {
  card: typeof cards[0]
  index: number
  total: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  })

  const Icon = card.icon
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const borderOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 0.2])

  return (
    <div
      ref={cardRef}
      className="h-screen flex items-center justify-center sticky top-0"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        className="w-full max-w-[1000px] mx-auto px-6 md:px-12"
        style={{ scale, opacity }}
      >
        <motion.div
          className="rounded-3xl bg-card border p-10 md:p-16 relative overflow-hidden"
          style={{
            borderColor: useTransform(borderOpacity, (v) => `rgba(220, 38, 38, ${v})`),
          }}
        >
          {/* Background number */}
          <span className="absolute top-6 right-8 font-mono text-[120px] md:text-[180px] font-bold leading-none text-foreground/[0.03] select-none">
            {card.num}
          </span>

          {/* Subtle logo watermark */}
          <div className="absolute -bottom-8 -right-8 pointer-events-none opacity-[0.02]">
            <AgentiksLogo className="w-[200px] h-[200px] text-brand" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                <Icon className="w-7 h-7 text-brand" strokeWidth={1.5} />
              </div>
              <div>
                <span className="font-mono text-[10px] text-brand/50 tracking-[0.3em] uppercase block">
                  Step {card.num}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground/40 tracking-wide">
                  {index + 1} of {total}
                </span>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
              {card.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-[600px] mb-10">
              {card.desc}
            </p>

            <div className="flex items-baseline gap-3 border-t border-ag-line pt-6">
              <span className="text-4xl md:text-5xl font-medium text-brand">{card.stat}</span>
              <span className="font-mono text-xs text-muted-foreground/60 tracking-wide uppercase">{card.statLabel}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export function AIEdge() {
  return (
    <section className="relative">
      {/* Section header -- pinned briefly */}
      <div className="h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-brand mb-4">
          always ahead
        </p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight max-w-[700px]">
          AI moves fast.{" "}
          <span className="text-brand">You won&apos;t fall behind.</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-[550px] mt-5 leading-relaxed">
          We live on the bleeding edge so you don&apos;t have to.
        </p>
      </div>

      {/* Stacked cards */}
      {cards.map((card, i) => (
        <Card key={i} card={card} index={i} total={cards.length} />
      ))}
    </section>
  )
}
