"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Workflow, Plug, HeadphonesIcon } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { ScrollReveal } from "@/components/scroll-reveal"

const capabilities = [
  {
    id: "strategy",
    label: "Agent Strategy",
    title: "Know where AI agents will transform your business",
    desc: "We map your operations end-to-end and identify high-impact automation opportunities. You get a clear roadmap with ROI projections, not a vague pitch deck.",
    icon: Bot,
    details: [
      "Full operational audit and workflow mapping",
      "AI readiness assessment for each team",
      "Prioritized automation opportunities with ROI estimates",
      "Technology stack recommendations",
    ],
  },
  {
    id: "development",
    label: "Custom Development",
    title: "Production-grade AI agents, built for your stack",
    desc: "We design and engineer custom agentic systems using the latest frameworks — AI SDK, MCP, durable workflows. Every agent is built to your specifications and integrated into your existing infrastructure.",
    icon: Workflow,
    details: [
      "Custom tool calling and MCP integrations",
      "Durable workflows that survive failures",
      "Multi-agent orchestration systems",
      "Human-in-the-loop approval flows",
    ],
  },
  {
    id: "integration",
    label: "Integration",
    title: "Connect agents to every system you use",
    desc: "Your agents need access to your data. We build integrations with your CRM, ERP, databases, APIs, and internal tools. Secure, reliable, and maintainable.",
    icon: Plug,
    details: [
      "CRM, ERP, and database connectors",
      "Custom API and webhook integrations",
      "Secure credential management",
      "Real-time data sync and event-driven triggers",
    ],
  },
  {
    id: "support",
    label: "Ongoing Support",
    title: "We don't disappear after launch",
    desc: "Every engagement includes post-launch support, monitoring, and optimization. As your business evolves, we help your agents evolve with it.",
    icon: HeadphonesIcon,
    details: [
      "24/7 monitoring and alerting",
      "Monthly performance reviews and optimization",
      "Priority bug fixes and feature requests",
      "Team training and documentation",
    ],
  },
]

export function Capabilities() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 relative overflow-visible" id="capabilities">
      <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(180,0,255,0.04)_0%,rgba(0,240,255,0.02)_40%,transparent_70%)] rounded-full blur-[80px] animate-[drift_25s_ease-in-out_infinite] pointer-events-none z-0" />

      <div className="relative z-10">
        <SectionHeader title="End-to-end agentic solutions." label="capabilities" />

        <ScrollReveal>
          <p className="text-lg text-muted-foreground max-w-[600px] leading-relaxed mb-12">
            From strategy to deployment to ongoing support — we handle every stage of building AI agent systems for your business.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="scale-up">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-0 border border-dashed border-ag-line rounded-xl overflow-hidden bg-ag-surface">
            <div className="border-r border-dashed border-ag-line md:py-2">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon
                const isActive = activeTab === i
                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveTab(i)}
                    className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all border-b border-dashed border-ag-line last:border-none ${
                      isActive
                        ? "bg-brand/[0.06] text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02]"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-brand" : "text-muted-foreground/50"}`}
                      strokeWidth={1.5}
                    />
                    <div>
                      <span className="text-sm font-medium block">{cap.label}</span>
                      {isActive && (
                        <span className="font-mono text-[9px] text-brand/60 tracking-wide uppercase">Active</span>
                      )}
                    </div>
                    {isActive && (
                      <div className="ml-auto w-1 h-6 rounded-full bg-brand/50" />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="p-8 md:p-10 min-h-[360px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] text-brand/50 tracking-widest">
                      0{activeTab + 1}
                    </span>
                  </div>
                  <h3 className="font-sans text-2xl font-medium mb-4 leading-snug">
                    {capabilities[activeTab].title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[520px] mb-8">
                    {capabilities[activeTab].desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {capabilities[activeTab].details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand/40 mt-1.5 shrink-0" />
                        <span className="text-sm text-muted-foreground/70">{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
