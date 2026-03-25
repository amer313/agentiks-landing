"use client"

import { motion } from "framer-motion"
import { Newspaper, Rocket, RefreshCw, Shield } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { ScrollReveal } from "@/components/scroll-reveal"

const pillars = [
  {
    icon: Newspaper,
    title: "We track the breakthroughs",
    desc: "New model dropped at 2 AM? We already read the paper, benchmarked it, and know if it matters for you.",
  },
  {
    icon: Rocket,
    title: "We ship it to you — fast",
    desc: "When a new capability unlocks real value, we integrate it into your systems within days, not quarters.",
  },
  {
    icon: RefreshCw,
    title: "Your stack stays current",
    desc: "No more legacy AI debt. Your agents always run on the best available models, tools, and protocols.",
  },
  {
    icon: Shield,
    title: "Zero risk to your ops",
    desc: "We test, validate, and roll out upgrades with zero downtime. You get the upside without the chaos.",
  },
]

export function AIEdge() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 relative overflow-visible">
      <div className="relative z-10">
        <SectionHeader
          title="AI moves fast. You won't fall behind."
          label="always ahead"
          center
        />

        <ScrollReveal>
          <div className="max-w-[680px] mx-auto text-center mb-16">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Every week there&apos;s a new model, a new framework, a new breakthrough.{" "}
              <span className="text-foreground font-medium">
                You don&apos;t need to follow any of it.
              </span>{" "}
              We live in the bleeding edge so you can focus on running your business — while your AI systems quietly get smarter, faster, and more capable behind the scenes.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div
                  className="group relative rounded-xl border border-dashed border-ag-line bg-ag-surface p-7 h-full transition-colors hover:border-brand/20"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0 group-hover:bg-brand/15 transition-colors">
                      <Icon className="w-5 h-5 text-brand" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-foreground mb-1.5">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <p className="font-mono text-xs tracking-widest uppercase text-brand/60">
              New AI capabilities deployed to clients weekly
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
