"use client"

import { motion } from "framer-motion"
import { Fingerprint, Blocks, ShieldCheck, ArrowRight, Check } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CornerButton } from "@/components/ui/corner-button"

const pillars = [
  {
    icon: Fingerprint,
    title: "Built around your business",
    desc: "No templates. No cookie-cutter bots. We study your operations, your team, and your industry — then design agent systems that fit like they were always there.",
  },
  {
    icon: Blocks,
    title: "Your stack, your rules",
    desc: "We integrate with whatever you already run — CRMs, ERPs, internal tools, legacy systems. You keep full ownership of the code and infrastructure.",
  },
  {
    icon: ShieldCheck,
    title: "Scoped to your goals",
    desc: "Every engagement starts with a free strategy call. We scope work to your goals and constraints — whether that's a single agent or an enterprise-wide system.",
  },
]

export function Pricing() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16" id="pricing">
      <SectionHeader title="Custom solutions, not packages." label="how we engage" center />

      <ScrollReveal>
        <p className="text-center text-lg text-muted-foreground max-w-[600px] mx-auto leading-relaxed mb-14">
          Every company has different workflows, tools, and goals.
          We don&apos;t sell tiers — we build the exact system your business needs.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {pillars.map((p, i) => {
          const Icon = p.icon
          return (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <div className="h-full rounded-xl border border-dashed border-ag-line bg-card p-8 flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-brand" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </ScrollReveal>
          )
        })}
      </div>

      {/* What you get */}
      <ScrollReveal>
        <div className="rounded-xl border border-dashed border-ag-line bg-card p-8 md:p-10 mb-14">
          <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 mb-6">
            Every engagement includes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Full source code + documentation",
              "Deployed to your infrastructure",
              "Monitoring & alerting dashboard",
              "Team training session",
              "Post-launch support period",
              "Knowledge transfer & handoff",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-brand shrink-0" strokeWidth={2} />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <motion.div
          className="rounded-xl border border-brand/15 bg-gradient-to-br from-brand/[0.04] to-transparent p-10 md:p-14 text-center"
          whileHover={{ borderColor: "rgba(220, 38, 38, 0.25)" }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-brand/60 mb-3">
            Start here
          </p>
          <h3 className="text-2xl md:text-3xl font-medium mb-3">
            Free strategy call
          </h3>
          <p className="text-muted-foreground max-w-[500px] mx-auto mb-8 leading-relaxed">
            We&apos;ll audit your operations, identify the highest-impact automation opportunities,
            and give you a clear roadmap — no strings attached.
          </p>
          <CornerButton href="https://cal.com/agentiks/strategy-call" external>
            Book a Call <ArrowRight className="w-4 h-4" />
          </CornerButton>
        </motion.div>
      </ScrollReveal>
    </section>
  )
}
