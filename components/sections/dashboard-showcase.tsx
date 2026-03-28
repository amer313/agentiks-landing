"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

/* ── Dense dashboard screen (financial terminal style) ── */
function DashboardScreen() {
  return (
    <div className="w-full h-full bg-[#0a0a0c] text-white overflow-hidden select-none text-[7px] font-mono">
      {/* Sidebar + main */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-[42px] bg-[#0e0e11] border-r border-white/[0.04] flex flex-col items-center py-2 gap-2.5 shrink-0">
          <div className="w-5 h-5 rounded-md bg-brand/20 flex items-center justify-center text-[6px] text-brand font-bold">A</div>
          <div className="w-[18px] h-px bg-white/[0.06]" />
          {["◎", "⊞", "⧉", "⬡", "◈", "⊕"].map((icon, i) => (
            <div key={i} className={`w-5 h-5 rounded flex items-center justify-center text-[8px] ${i === 0 ? "bg-white/[0.06] text-white/60" : "text-white/20 hover:text-white/40"}`}>
              {icon}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top nav bar */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.04] bg-[#0c0c0f]">
            <div className="flex items-center gap-3">
              <span className="text-white/50 font-semibold text-[8px]">Agent Operations</span>
              <div className="flex gap-1">
                {["Overview", "Agents", "Workflows", "Logs"].map((tab, i) => (
                  <span key={tab} className={`px-1.5 py-0.5 rounded text-[6px] ${i === 0 ? "bg-white/[0.08] text-white/70" : "text-white/25"}`}>{tab}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" /><span className="text-green-500/70 text-[6px]">All systems operational</span></span>
            </div>
          </div>

          {/* Dashboard body */}
          <div className="flex-1 p-2.5 overflow-hidden">
            {/* Top metrics row */}
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
                  <div className={`text-[5px] mt-0.5 ${m.up ? "text-green-500/70" : "text-red-500/70"}`}>{m.change}</div>
                </div>
              ))}
            </div>

            {/* Main grid: chart + table + activity */}
            <div className="grid grid-cols-[1.4fr_1fr] gap-1.5 h-[calc(100%-52px)]">
              {/* Left column */}
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
                  <div className="flex justify-between mt-0.5">
                    <span className="text-white/15 text-[5px]">Feb 28</span>
                    <span className="text-white/15 text-[5px]">Mar 28</span>
                  </div>
                </div>

                {/* Agent table */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5 flex-1">
                  <div className="text-white/30 text-[5px] uppercase tracking-wider mb-1">Live Agents</div>
                  {/* Header */}
                  <div className="grid grid-cols-[1fr_0.8fr_0.6fr_0.4fr] gap-1 text-[5px] text-white/20 uppercase tracking-wider pb-0.5 border-b border-white/[0.04] mb-0.5">
                    <span>Agent</span><span>Status</span><span>Output</span><span>Health</span>
                  </div>
                  {[
                    { name: "Sales Agent", status: "Scoring leads", output: "3,847 leads", health: 98 },
                    { name: "Finance Agent", status: "Invoice batch", output: "$2.4M", health: 100 },
                    { name: "Support Agent", status: "Routing tickets", output: "238 tickets", health: 95 },
                    { name: "Marketing Agent", status: "Campaign opt.", output: "ROI +340%", health: 100 },
                    { name: "HR Agent", status: "Screening", output: "142 apps", health: 97 },
                    { name: "Compliance Agent", status: "SOC2 checks", output: "All passing", health: 100 },
                    { name: "Data Agent", status: "ETL pipeline", output: "12TB", health: 99 },
                    { name: "Legal Agent", status: "NDA analysis", output: "12 contracts", health: 96 },
                  ].map((a) => (
                    <div key={a.name} className="grid grid-cols-[1fr_0.8fr_0.6fr_0.4fr] gap-1 py-[3px] border-b border-white/[0.02] items-center">
                      <span className="text-white/60 text-[6px] font-medium flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-green-500/70" />
                        {a.name}
                      </span>
                      <span className="text-white/30 text-[6px]">{a.status}</span>
                      <span className="text-white/50 text-[6px]">{a.output}</span>
                      <div className="flex items-center gap-0.5">
                        <div className="flex-1 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                          <div className="h-full rounded-full bg-green-500/60" style={{ width: `${a.health}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-1.5">
                {/* Workflow status */}
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

                {/* Activity feed */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5 flex-1">
                  <div className="text-white/30 text-[5px] uppercase tracking-wider mb-1">Activity Feed</div>
                  {[
                    { t: "2s", e: "Sales Agent scored 127 high-intent leads → CRM queue", c: "text-green-500/50" },
                    { t: "14s", e: "Finance Agent approved $2.4M invoice batch (3 exceptions)", c: "text-green-500/50" },
                    { t: "1m", e: "Support Agent escalated VIP ticket → VP account mgr notified", c: "text-yellow-500/50" },
                    { t: "3m", e: "Marketing Agent optimized ad spend → ROAS +340%", c: "text-green-500/50" },
                    { t: "5m", e: "Compliance Agent completed SOC2 quarterly audit", c: "text-blue-400/50" },
                    { t: "8m", e: "Data Agent processed 12TB ETL pipeline — 0 errors", c: "text-blue-400/50" },
                    { t: "12m", e: "Legal Agent flagged non-standard clause in vendor NDA", c: "text-yellow-500/50" },
                    { t: "15m", e: "HR Agent shortlisted 12 candidates from 142 applications", c: "text-green-500/50" },
                  ].map((a, i) => (
                    <div key={i} className="flex gap-1.5 py-[3px] border-b border-white/[0.02] last:border-none">
                      <span className="text-white/15 text-[5px] w-[18px] shrink-0 text-right">{a.t}</span>
                      <span className={`text-[6px] leading-tight ${a.c}`}>{a.e}</span>
                    </div>
                  ))}
                </div>

                {/* Mini cost breakdown */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5">
                  <div className="text-white/30 text-[5px] uppercase tracking-wider mb-1">Cost vs. Manual (Monthly)</div>
                  <div className="flex items-end gap-0.5 h-[30px]">
                    {[
                      { label: "Manual", h: "100%", color: "rgba(255,255,255,0.06)" },
                      { label: "Agents", h: "18%", color: "#DC2626" },
                    ].map((b) => (
                      <div key={b.label} className="flex-1 flex flex-col items-center">
                        <div className="w-full rounded-sm" style={{ height: b.h, background: b.color }} />
                        <span className="text-[5px] text-white/20 mt-0.5">{b.label}</span>
                      </div>
                    ))}
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

/* ── Realistic MacBook frame with Fey-style shadows ── */
function MacBookFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[860px] mx-auto relative">
      {/* Screen glow on keyboard */}
      <div className="absolute -bottom-[10%] left-[10%] right-[10%] h-[30%] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.04),transparent_70%)] blur-xl pointer-events-none z-10" />

      {/* Screen */}
      <div
        className="relative rounded-t-[14px] bg-[#1c1c1e] p-[5px] pt-[14px] border border-white/[0.08]"
        style={{
          boxShadow: "0 30px 16px rgba(0,0,0,0.12), 0 16px 8px rgba(0,0,0,0.07), 0 6px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Camera */}
        <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[52px] h-[10px] bg-[#0a0a0c] rounded-b-md flex items-center justify-center">
          <div className="w-[3.5px] h-[3.5px] rounded-full bg-[#1a1a22] border border-white/[0.06]" />
        </div>
        {/* Screen content */}
        <div className="rounded-[4px] overflow-hidden aspect-[16/10] bg-[#0a0a0c]">
          {children}
        </div>
      </div>

      {/* Hinge */}
      <div className="h-[3px] mx-[3px] bg-gradient-to-b from-[#3a3a3e] to-[#2a2a2e]" />

      {/* Keyboard deck */}
      <div
        className="bg-gradient-to-b from-[#2e2e32] to-[#1e1e22] rounded-b-[14px] border-x border-b border-white/[0.06] px-[16px] pt-[8px] pb-[10px] relative overflow-hidden"
        style={{
          boxShadow: "0 8px 30px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        {/* Keyboard rows */}
        <div className="flex flex-col gap-[2.5px] mb-[8px]">
          {[14, 14, 13, 12, 10].map((keys, row) => (
            <div key={row} className="flex gap-[2px] justify-center">
              {Array.from({ length: keys }).map((_, i) => {
                const isWide = (row === 2 && (i === 0 || i === keys - 1)) ||
                               (row === 3 && (i === 0 || i === keys - 1)) ||
                               (row === 4 && (i === 0 || i === keys - 1 || i === Math.floor(keys / 2)))
                return (
                  <div
                    key={i}
                    className={`h-[7px] rounded-[2px] bg-[#1c1c1e] border border-white/[0.03] ${
                      isWide ? "w-[16px]" : row === 4 && i === Math.floor(keys / 2) ? "w-[48px]" : "w-[10px]"
                    }`}
                  />
                )
              })}
            </div>
          ))}
        </div>

        {/* Trackpad */}
        <div className="mx-auto w-[42%] h-[45px] rounded-lg bg-[#1c1c1e] border border-white/[0.05]" />
      </div>
    </div>
  )
}

/* ── Main section — sits in a dark container like Fey ── */
export function DashboardShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [50, 0])
  const translateZ = useTransform(scrollYProgress, [0, 1], [-250, 0])
  const translateY = useTransform(scrollYProgress, [0, 1], [180, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.75, 1])

  return (
    <section ref={sectionRef} className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto rounded-3xl bg-[#000] border border-white/[0.04] py-16 md:py-24 px-6 md:px-12 overflow-hidden relative">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.06),transparent_70%)] pointer-events-none" />

        <div className="text-center mb-12 relative z-10">
          <motion.p
            className="font-mono text-xs tracking-[0.2em] uppercase text-brand/70 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Built for your business
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-medium tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Custom agentic solutions.{" "}
            <span className="text-brand">Real results.</span>
          </motion.h2>
        </div>

        <div style={{ perspective: "2200px" }} className="relative z-10">
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
        </div>
      </div>
    </section>
  )
}
