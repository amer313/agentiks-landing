"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

/* ── Dense dashboard screen ── */
function DashboardScreen() {
  return (
    <div className="w-full h-full bg-[#0a0a0c] text-white overflow-hidden select-none text-[7px] font-mono">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-[42px] bg-[#0e0e11] border-r border-white/[0.04] flex flex-col items-center py-2 gap-2.5 shrink-0">
          <div className="w-5 h-5 rounded-md bg-brand/20 flex items-center justify-center text-[6px] text-brand font-bold">A</div>
          <div className="w-[18px] h-px bg-white/[0.06]" />
          {["◎", "⊞", "⧉", "⬡", "◈", "⊕"].map((icon, i) => (
            <div key={i} className={`w-5 h-5 rounded flex items-center justify-center text-[8px] ${i === 0 ? "bg-white/[0.06] text-white/60" : "text-white/20"}`}>
              {icon}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top nav */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.04] bg-[#0c0c0f]">
            <div className="flex items-center gap-3">
              <span className="text-white/50 font-semibold text-[8px]">Agent Operations</span>
              <div className="flex gap-1">
                {["Overview", "Agents", "Workflows", "Logs"].map((tab, i) => (
                  <span key={tab} className={`px-1.5 py-0.5 rounded text-[6px] ${i === 0 ? "bg-white/[0.08] text-white/70" : "text-white/25"}`}>{tab}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-500/70 text-[6px]">All systems operational</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-2.5 overflow-hidden">
            {/* Metrics */}
            <div className="grid grid-cols-5 gap-1.5 mb-2">
              {[
                { label: "Active Agents", val: "16", change: "+3", up: true },
                { label: "Tasks Completed", val: "12,847", change: "+847", up: true },
                { label: "Avg Response", val: "0.8s", change: "-0.2s", up: true },
                { label: "Cost Saved", val: "$284k", change: "+$42k", up: true },
                { label: "Error Rate", val: "0.03%", change: "-0.01%", up: true },
              ].map((m) => (
                <div key={m.label} className="bg-white/[0.02] border border-white/[0.04] rounded px-1.5 py-1">
                  <div className="text-white/25 text-[5px] uppercase tracking-wider">{m.label}</div>
                  <div className="text-white/90 text-[10px] font-semibold mt-0.5">{m.val}</div>
                  <div className="text-[5px] mt-0.5 text-green-500/70">{m.change}</div>
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-[1.4fr_1fr] gap-1.5 h-[calc(100%-52px)]">
              {/* Left */}
              <div className="flex flex-col gap-1.5">
                {/* Chart */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/30 text-[5px] uppercase tracking-wider">Task Volume — 30d</span>
                    <div className="flex gap-1">
                      {["1D", "7D", "30D", "ALL"].map((t, i) => (
                        <span key={t} className={`text-[5px] px-1 py-px rounded ${i === 2 ? "bg-brand/20 text-brand" : "text-white/20"}`}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <MiniChart />
                </div>

                {/* Agent table */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5 flex-1">
                  <div className="text-white/30 text-[5px] uppercase tracking-wider mb-1">Live Agents</div>
                  <div className="grid grid-cols-[1fr_0.8fr_0.6fr_0.4fr] gap-1 text-[5px] text-white/20 uppercase tracking-wider pb-0.5 border-b border-white/[0.04] mb-0.5">
                    <span>Agent</span><span>Status</span><span>Output</span><span>Health</span>
                  </div>
                  {[
                    { name: "Sales Agent", status: "Scoring leads", output: "3,847", health: 98 },
                    { name: "Finance Agent", status: "Invoice batch", output: "$2.4M", health: 100 },
                    { name: "Support Agent", status: "Routing", output: "238", health: 95 },
                    { name: "Marketing", status: "Campaign opt.", output: "+340%", health: 100 },
                    { name: "HR Agent", status: "Screening", output: "142", health: 97 },
                    { name: "Compliance", status: "SOC2 checks", output: "Pass", health: 100 },
                    { name: "Data Agent", status: "ETL pipeline", output: "12TB", health: 99 },
                    { name: "Legal Agent", status: "NDA analysis", output: "12", health: 96 },
                  ].map((a) => (
                    <div key={a.name} className="grid grid-cols-[1fr_0.8fr_0.6fr_0.4fr] gap-1 py-[3px] border-b border-white/[0.02] items-center">
                      <span className="text-white/60 text-[6px] font-medium flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-green-500/70" />{a.name}
                      </span>
                      <span className="text-white/30 text-[6px]">{a.status}</span>
                      <span className="text-white/50 text-[6px]">{a.output}</span>
                      <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full bg-green-500/60" style={{ width: `${a.health}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col gap-1.5">
                {/* Workflows */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5">
                  <div className="text-white/30 text-[5px] uppercase tracking-wider mb-1">Active Workflows</div>
                  {[
                    { name: "Lead → Score → Route → CRM", steps: 4, at: 3, color: "#EF4444" },
                    { name: "Invoice → Parse → Match → Approve", steps: 4, at: 4, color: "#10B981" },
                    { name: "Ticket → Classify → Route → Resolve", steps: 4, at: 2, color: "#0EA5E9" },
                    { name: "App → Screen → Score → Shortlist", steps: 4, at: 4, color: "#A855F7" },
                  ].map((wf) => (
                    <div key={wf.name} className="py-1 border-b border-white/[0.03] last:border-none">
                      <div className="text-white/50 text-[6px] mb-0.5">{wf.name}</div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: wf.steps }).map((_, i) => (
                          <div key={i} className="flex-1 h-[3px] rounded-full" style={{ background: i < wf.at ? wf.color : "rgba(255,255,255,0.04)" }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5 flex-1">
                  <div className="text-white/30 text-[5px] uppercase tracking-wider mb-1">Activity Feed</div>
                  {[
                    { t: "2s", e: "Sales Agent scored 127 high-intent leads → CRM", c: "text-green-500/50" },
                    { t: "14s", e: "Finance Agent approved $2.4M invoice batch", c: "text-green-500/50" },
                    { t: "1m", e: "Support escalated VIP ticket → VP notified", c: "text-yellow-500/50" },
                    { t: "3m", e: "Marketing optimized ad spend → ROAS +340%", c: "text-green-500/50" },
                    { t: "5m", e: "Compliance completed SOC2 quarterly audit", c: "text-blue-400/50" },
                    { t: "8m", e: "Data Agent processed 12TB ETL — 0 errors", c: "text-blue-400/50" },
                    { t: "12m", e: "Legal flagged non-standard clause in NDA", c: "text-yellow-500/50" },
                    { t: "15m", e: "HR shortlisted 12 from 142 applications", c: "text-green-500/50" },
                  ].map((a, i) => (
                    <div key={i} className="flex gap-1.5 py-[3px] border-b border-white/[0.02] last:border-none">
                      <span className="text-white/15 text-[5px] w-[18px] shrink-0 text-right">{a.t}</span>
                      <span className={`text-[6px] leading-tight ${a.c}`}>{a.e}</span>
                    </div>
                  ))}
                </div>

                {/* Cost chart */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5">
                  <div className="text-white/30 text-[5px] uppercase tracking-wider mb-1">Cost vs. Manual (Monthly)</div>
                  <div className="flex items-end gap-1 h-[28px]">
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-full h-[28px] rounded-sm bg-white/[0.06]" />
                      <span className="text-[5px] text-white/20 mt-0.5">Manual</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-full h-[5px] rounded-sm bg-brand mt-auto" />
                      <span className="text-[5px] text-white/20 mt-0.5">Agents</span>
                    </div>
                  </div>
                  <div className="text-center text-[6px] text-green-500/60 mt-1 font-semibold">82% cost reduction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniChart() {
  const points = [20, 25, 28, 35, 32, 45, 42, 52, 48, 55, 58, 62, 65, 70, 68, 75, 78, 82, 80, 85, 88, 90, 87, 92]
  const w = 200
  const h = 40
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * w} ${h - (p / 100) * h}`).join(" ")

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[32px]">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#cg)" />
      <path d={path} fill="none" stroke="#DC2626" strokeWidth="1" strokeLinecap="round" />
      <circle cx={w} cy={h - (92 / 100) * h} r="1.5" fill="#DC2626" />
    </svg>
  )
}

/* ── Main section — MacBook opens its lid on scroll ── */
export function DashboardShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Lid opens from closed (85deg) to fully open (0deg)
  const lidRotate = useTransform(scrollYProgress, [0.05, 0.6], [85, 0])
  // Screen content fades in as lid opens past ~45deg
  const screenOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1])
  // Whole laptop scales up slightly as lid opens
  const laptopScale = useTransform(scrollYProgress, [0, 0.6], [0.9, 1])
  // Text fades in early
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
  const textY = useTransform(scrollYProgress, [0, 0.15], [30, 0])

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 md:px-8">
        <div className="max-w-[1200px] w-full mx-auto rounded-3xl bg-[#000] border border-white/[0.04] py-12 md:py-20 px-6 md:px-12 overflow-hidden relative">
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.06),transparent_70%)] pointer-events-none" />

          {/* Heading */}
          <motion.div className="text-center mb-10 relative z-10" style={{ opacity: textOpacity, y: textY }}>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-brand/70 mb-3">
              Built for your business
            </p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
              Custom agentic solutions.{" "}
              <span className="text-brand">Real results.</span>
            </h2>
          </motion.div>

          {/* MacBook with opening lid */}
          <motion.div
            className="relative z-10 flex justify-center"
            style={{ scale: laptopScale }}
          >
            {/* 3D scene — perspective on this wrapper, low value = dramatic */}
            <div style={{ perspective: "900px", perspectiveOrigin: "50% 80%" }}>
              <div className="device device-macbook-pro device-spacegray" style={{ transformStyle: "preserve-3d" }}>
                {/* Screen/Lid — rotates from hinge at bottom of screen bezel */}
                <motion.div
                  className="device-frame"
                  style={{
                    rotateX: lidRotate,
                    transformOrigin: "center bottom",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <motion.div className="device-screen" style={{ opacity: screenOpacity }}>
                    <DashboardScreen />
                  </motion.div>
                  <div className="device-header" />
                </motion.div>
                <div className="device-stripe" />
                <div className="device-sensors" />
                <div className="device-btns" />
                {/* Keyboard base — stays flat, always visible */}
                <div className="device-power" />
              </div>
            </div>
          </motion.div>

          {/* Screen glow on the base — appears as lid opens */}
          <motion.div
            className="mx-auto max-w-[500px] h-[40px] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.08),transparent_70%)] rounded-full blur-xl -mt-2 relative z-0"
            style={{ opacity: useTransform(scrollYProgress, [0.4, 0.7], [0, 0.6]) }}
          />
        </div>
      </div>
    </section>
  )
}
