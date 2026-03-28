"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

/* ── Fake dashboard content ── */
function AgentRow({ name, status, metric, color }: { name: string; status: string; metric: string; color: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-none">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
        <span className="text-[8px] text-white/70 font-medium">{name}</span>
      </div>
      <span className="text-[7px] text-white/40 font-mono">{status}</span>
      <span className="text-[8px] text-white/60 font-mono font-medium">{metric}</span>
    </div>
  )
}

function MiniChart() {
  const points = [20, 35, 28, 45, 38, 52, 48, 62, 55, 70, 65, 78, 72, 85, 80, 90]
  const w = 200
  const h = 60
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * w} ${h - (p / 100) * h}`)
    .join(" ")

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#chartGrad)" />
      <path d={path} fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx={w} cy={h - (90 / 100) * h} r="2" fill="#DC2626" />
    </svg>
  )
}

function DashboardScreen() {
  return (
    <div className="w-full h-full bg-[#0C0C0F] text-white p-3 overflow-hidden select-none">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[7px] text-white/30 font-mono">agentiks.app — command center</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[7px] text-green-500/70 font-mono">16 agents online</span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1.2fr] gap-3 h-[calc(100%-24px)]">
        {/* Left: Agent list + metrics */}
        <div className="flex flex-col gap-2.5">
          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: "Active Agents", value: "16", sub: "+3 today" },
              { label: "Tasks/hr", value: "2.4k", sub: "+12%" },
              { label: "Uptime", value: "99.97%", sub: "30d avg" },
            ].map((m) => (
              <div key={m.label} className="bg-white/[0.03] rounded-md px-2 py-1.5 border border-white/[0.04]">
                <div className="text-[6px] text-white/30 font-mono uppercase tracking-wider">{m.label}</div>
                <div className="text-[11px] font-semibold text-white/90 mt-0.5">{m.value}</div>
                <div className="text-[6px] text-green-500/60 font-mono">{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Agent list */}
          <div className="bg-white/[0.02] rounded-md border border-white/[0.04] p-2 flex-1">
            <div className="text-[7px] text-white/30 font-mono uppercase tracking-wider mb-2">Live Agents</div>
            <AgentRow name="Sales Agent" status="scoring leads" metric="3,847" color="#EF4444" />
            <AgentRow name="Finance Agent" status="processing batch" metric="$2.4M" color="#10B981" />
            <AgentRow name="Support Agent" status="routing tickets" metric="238" color="#0EA5E9" />
            <AgentRow name="Marketing Agent" status="campaign opt." metric="+340%" color="#F59E0B" />
            <AgentRow name="HR Agent" status="screening apps" metric="142" color="#A855F7" />
            <AgentRow name="Compliance Agent" status="SOC2 checks" metric="passing" color="#14B8A6" />
            <AgentRow name="Data Agent" status="ETL pipeline" metric="12TB" color="#3B82F6" />
            <AgentRow name="Legal Agent" status="NDA analysis" metric="12" color="#EC4899" />
          </div>
        </div>

        {/* Right: Chart + activity */}
        <div className="flex flex-col gap-2.5">
          {/* Chart */}
          <div className="bg-white/[0.02] rounded-md border border-white/[0.04] p-2 flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[7px] text-white/30 font-mono uppercase tracking-wider">Agent Performance</span>
              <span className="text-[7px] text-white/20 font-mono">Last 30 days</span>
            </div>
            <div className="h-[50px] mt-1">
              <MiniChart />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[6px] text-white/20 font-mono">Mar 1</span>
              <span className="text-[6px] text-white/20 font-mono">Mar 28</span>
            </div>
          </div>

          {/* Activity feed */}
          <div className="bg-white/[0.02] rounded-md border border-white/[0.04] p-2 flex-1">
            <div className="text-[7px] text-white/30 font-mono uppercase tracking-wider mb-2">Activity Feed</div>
            {[
              { time: "2s ago", event: "Sales Agent scored 127 high-intent leads", type: "success" },
              { time: "14s ago", event: "Finance Agent approved $2.4M invoice batch", type: "success" },
              { time: "1m ago", event: "Support Agent escalated VIP ticket → VP notified", type: "warning" },
              { time: "3m ago", event: "Marketing Agent optimized ad spend → ROI +340%", type: "success" },
              { time: "8m ago", event: "Compliance Agent completed SOC2 audit checks", type: "info" },
              { time: "12m ago", event: "Data Agent processed 12TB ETL pipeline", type: "info" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-2 py-1 border-b border-white/[0.03] last:border-none">
                <span className={`w-1 h-1 rounded-full mt-1 shrink-0 ${
                  a.type === "success" ? "bg-green-500/60" : a.type === "warning" ? "bg-yellow-500/60" : "bg-blue-500/40"
                }`} />
                <div>
                  <span className="text-[7px] text-white/50 leading-tight block">{a.event}</span>
                  <span className="text-[6px] text-white/20 font-mono">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── MacBook frame ── */
function KeyRow({ keys, wide }: { keys: number; wide?: boolean }) {
  return (
    <div className="flex gap-[2px] justify-center">
      {Array.from({ length: keys }).map((_, i) => (
        <div
          key={i}
          className={`h-[8px] rounded-[1.5px] bg-[#1a1a1c] border border-white/[0.03] ${
            wide && (i === 0 || i === keys - 1) ? "w-[18px]" : "w-[11px]"
          }`}
        />
      ))}
    </div>
  )
}

function MacBookFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[800px] mx-auto">
      {/* Screen lid */}
      <div className="relative bg-[#1c1c1e] rounded-t-[12px] p-[5px] pt-[14px] border border-white/[0.06] shadow-[0_-2px_40px_rgba(0,0,0,0.5)]">
        {/* Camera notch */}
        <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[56px] h-[10px] bg-[#0C0C0F] rounded-b-md flex items-center justify-center">
          <div className="w-[4px] h-[4px] rounded-full bg-[#2a2a2e] border border-white/[0.05]" />
        </div>
        {/* Screen */}
        <div className="rounded-[3px] overflow-hidden aspect-[16/10] bg-[#0C0C0F]">
          {children}
        </div>
      </div>

      {/* Hinge */}
      <div className="h-[3px] mx-[4px] bg-gradient-to-b from-[#333] to-[#222] rounded-[1px]" />

      {/* Keyboard deck */}
      <div className="bg-gradient-to-b from-[#2a2a2d] to-[#1e1e20] rounded-b-[12px] border-x border-b border-white/[0.05] px-[14px] py-[8px] shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        {/* Keyboard rows */}
        <div className="flex flex-col gap-[2px] mb-[6px]">
          <KeyRow keys={14} />
          <KeyRow keys={13} wide />
          <KeyRow keys={12} wide />
          <KeyRow keys={11} wide />
          <KeyRow keys={13} />
        </div>

        {/* Trackpad */}
        <div className="mx-auto w-[45%] h-[50px] rounded-md bg-[#1a1a1c] border border-white/[0.04] shadow-inner" />
      </div>
    </div>
  )
}

/* ── Main section ── */
export function DashboardShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [55, 0])
  const translateZ = useTransform(scrollYProgress, [0, 1], [-300, 0])
  const translateY = useTransform(scrollYProgress, [0, 1], [200, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1])

  return (
    <section
      ref={sectionRef}
      className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32"
      style={{ perspective: "2200px" }}
    >
      <div className="text-center mb-12">
        <motion.p
          className="font-mono text-xs tracking-[0.2em] uppercase text-brand mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Built for your business
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-medium tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Custom agentic solutions.{" "}
          <span className="text-brand">Real results.</span>
        </motion.h2>
      </div>

      <motion.div
        style={{
          rotateX,
          translateZ,
          translateY,
          opacity,
          scale,
          transformStyle: "preserve-3d",
        }}
      >
        <MacBookFrame>
          <DashboardScreen />
        </MacBookFrame>
      </motion.div>

      {/* Reflection / shadow */}
      <motion.div
        className="mt-4 mx-auto max-w-[600px] h-[80px] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.08),transparent_70%)] rounded-full blur-xl"
        style={{
          opacity: useTransform(scrollYProgress, [0.5, 1], [0, 0.6]),
        }}
      />
    </section>
  )
}
