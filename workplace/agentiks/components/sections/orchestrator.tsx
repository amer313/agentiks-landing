"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"

/* ─── Seeded PRNG for deterministic randomness (avoids hydration mismatch) ─── */
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}
const rng = mulberry32(42)

/* ─── Agents with chaotic positions and sub-agents ─── */
const workflows = [
  /* px,py = fraction of size from center. Hand-placed grid — zero overlaps. */
  { label: "Marketing Agent", status: "Campaign ROI +340%", color: "#F43F5E", px: -0.30, py: -0.36, subs: ["Ad Optimizer", "Content Writer"] },
  { label: "QA Agent", status: "2,100 tests passing", color: "#84CC16", px: 0.10, py: -0.38, subs: ["Test Runner"] },
  { label: "Data Agent", status: "12TB processed", color: "#0EA5E9", px: -0.36, py: -0.14, subs: ["ETL Runner"] },
  { label: "Sales Agent", status: "3,847 leads scored", color: "#F59E0B", px: -0.06, py: -0.20, subs: ["Lead Scorer", "CRM Sync"] },
  { label: "Finance Agent", status: "Processing $2.4M batch", color: "#10B981", px: 0.32, py: -0.24, subs: ["Invoice Parser", "AP Matcher"] },
  { label: "Logistics Agent", status: "Optimizing 34 routes", color: "#22D3EE", px: -0.40, py: 0.06, subs: ["Route Optimizer"] },
  { label: "HR Agent", status: "142 apps screened", color: "#A855F7", px: 0.14, py: -0.08, subs: ["Resume Parser"] },
  { label: "Onboarding Agent", status: "47 accounts activated", color: "#3B82F6", px: 0.34, py: 0.02, subs: ["Welcome Mailer"] },
  { label: "Reporting Agent", status: "Board deck generated", color: "#FB923C", px: -0.14, py: 0.00, subs: ["Chart Gen"] },
  { label: "Compliance Agent", status: "SOC2 checks passing", color: "#14B8A6", px: -0.24, py: 0.20, subs: ["Audit Logger"] },
  { label: "Support Agent", status: "Routing 238 tickets", color: "#06B6D4", px: 0.06, py: 0.14, subs: ["Ticket Router"] },
  { label: "Scheduling Agent", status: "892 meetings optimized", color: "#2DD4BF", px: 0.36, py: 0.18, subs: ["Calendar Sync"] },
  { label: "Revenue Agent", status: "$890K flagged", color: "#F97316", px: -0.38, py: 0.34, subs: ["Pipeline Scorer"] },
  { label: "Ops Agent", status: "Q3 predictions generated", color: "#EC4899", px: -0.04, py: 0.40, subs: ["Forecaster"] },
  { label: "Legal Agent", status: "12 NDAs analyzed", color: "#8B5CF6", px: 0.20, py: 0.34, subs: ["Contract Scanner"] },
  { label: "Procurement Agent", status: "17 bids compared", color: "#E879F9", px: 0.40, py: 0.38, subs: ["Bid Comparator"] },
]

/* Deterministic pop-in delays */
const popDelays = workflows.map(() => 0.2 + rng() * 2.2)

/* Deterministic hex positions — accepts cx, cy for proper centering */
function buildHexes(cx: number, cy: number, size: number) {
  const r = mulberry32(99)
  const hexSize = 28
  const hexH = hexSize * Math.sqrt(3)
  const cols = Math.ceil(size / (hexSize * 1.5)) + 1
  const rows = Math.ceil(size / hexH) + 1
  const result: { x: number; y: number; delay: number }[] = []
  for (let row = 0; row < rows; row++) {
    for (let c = 0; c < cols; c++) {
      const x = c * hexSize * 1.5 + (cx - size / 2)
      const y = row * hexH + (c % 2 === 1 ? hexH / 2 : 0) + (cy - size / 2)
      const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
      if (d < size * 0.46 && r() > 0.65) {
        result.push({ x, y, delay: r() * 8 })
      }
    }
  }
  return result
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  }).join(" ")
}

/* Deterministic neural web lines */
function buildNeural(cx: number, cy: number, size: number) {
  const r = mulberry32(77)
  const nodes: { x: number; y: number }[] = []
  for (let i = 0; i < 35; i++) {
    const a = r() * Math.PI * 2
    const d = (r() * 0.32 + 0.1) * size
    nodes.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d })
  }
  const lines: { x1: number; y1: number; x2: number; y2: number; delay: number; color: string }[] = []
  const colors = ["#2563EB", "#06B6D4", "#8B5CF6", "#F59E0B"]
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.sqrt((nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2)
      if (d < size * 0.14 && r() > 0.45) {
        lines.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y, delay: r() * 6, color: colors[Math.floor(r() * 4)] })
      }
    }
  }
  return lines
}

/* Deterministic data stream particles */
function buildStreams(cx: number, cy: number, size: number) {
  const r = mulberry32(55)
  const colors = ["#3B82F6", "#06B6D4", "#8B5CF6", "#10B981", "#F59E0B"]
  return Array.from({ length: 18 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 18 + r() * 0.4
    const dist = size * (0.15 + r() * 0.25)
    return { x: cx + Math.cos(a) * dist, y: cy + Math.sin(a) * dist, color: colors[i % 5], delay: r() * 5, dur: 2 + r() * 2 }
  })
}

const terminalLines = [
  { text: "\u25b6 deploying agent cluster \u2192 ops.sales.pipeline" },
  { text: "  \u251c\u2500 scoring 3,847 inbound leads..." },
  { text: "  \u251c\u2500 cross-referencing CRM + enrichment data..." },
  { text: "  \u2514\u2500 127 high-intent leads \u2192 sales queue \u2713" },
  { text: "\u25b6 spawning sub-agent \u2192 finance.invoice.batch" },
  { text: "  \u251c\u2500 parsing 340 invoices (PDF + email)..." },
  { text: "  \u251c\u2500 matching POs, flagging discrepancies..." },
  { text: "  \u2514\u2500 $2.4M batch approved, 3 exceptions routed \u2713" },
  { text: "\u25b6 escalation detected \u2192 support.tier3.routing" },
  { text: "  \u251c\u2500 sentiment analysis: critical (0.12)..." },
  { text: "  \u251c\u2500 customer lifetime value: $340K..." },
  { text: "  \u2514\u2500 VP account manager notified in 0.8s \u2713" },
]

/* ─── Agent card with sub-agents ─── */
function AgentCard({ workflow, cx, cy, size, index, inView }: {
  workflow: typeof workflows[0]; cx: number; cy: number; size: number; index: number; inView: boolean
}) {
  const x = cx + workflow.px * size
  const y = cy + workflow.py * size
  const cw = size * 0.16
  const ch = size * 0.045
  const delay = popDelays[index]

  // Sub-agents fan outward from center through the parent
  const parentAngle = Math.atan2(workflow.py, workflow.px)
  const parentDist = Math.sqrt(workflow.px ** 2 + workflow.py ** 2)
  const subNodes = workflow.subs.map((sub, si) => {
    const spread = (si - (workflow.subs.length - 1) / 2) * 0.35
    const subAngle = parentAngle + spread
    const subDist = (parentDist + 0.14) * size
    return {
      label: sub,
      x: cx + Math.cos(subAngle) * subDist,
      y: cy + Math.sin(subAngle) * subDist,
      delay: delay + 0.5 + si * 0.2,
    }
  })

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.2 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Line to core */}
      <line x1={cx} y1={cy} x2={x} y2={y} stroke={workflow.color} strokeOpacity={0.1} strokeWidth={0.6} strokeDasharray="3 6" />

      {/* Sub-agents */}
      {subNodes.map((sub, si) => (
        <motion.g
          key={si}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: sub.delay, duration: 0.5 }}
        >
          <line x1={x} y1={y} x2={sub.x} y2={sub.y} stroke={workflow.color} strokeOpacity={0.08} strokeWidth={0.4} strokeDasharray="2 5" />
          <circle cx={sub.x} cy={sub.y} r={size * 0.012} fill={workflow.color} fillOpacity={0.05} stroke={workflow.color} strokeOpacity={0.15} strokeWidth={0.4} />
          <circle cx={sub.x} cy={sub.y} r={size * 0.004} fill={workflow.color} fillOpacity={0.4}>
            <animate attributeName="fill-opacity" values="0.4;0.15;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x={sub.x} y={sub.y + size * 0.024} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={size * 0.013} fontFamily="var(--font-mono)">
            {sub.label}
          </text>
        </motion.g>
      ))}

      {/* Card */}
      <rect x={x - cw / 2} y={y - ch / 2} width={cw} height={ch} rx={4} fill="rgba(10,11,16,0.88)" stroke={workflow.color} strokeOpacity={0.22} strokeWidth={0.5} />
      <circle cx={x - cw / 2 + size * 0.012} cy={y - ch * 0.12} r={size * 0.004} fill={workflow.color} fillOpacity={0.7}>
        <animate attributeName="fill-opacity" values="0.7;0.25;0.7" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <text x={x - cw / 2 + size * 0.02} y={y + ch * 0.05} fill="rgba(255,255,255,0.65)" fontSize={size * 0.015} fontFamily="var(--font-mono)" fontWeight={600}>
        {workflow.label}
      </text>
      <text x={x - cw / 2 + size * 0.012} y={y + ch * 0.35} fill="rgba(255,255,255,0.25)" fontSize={size * 0.011} fontFamily="var(--font-mono)">
        {workflow.status}
      </text>
    </motion.g>
  )
}

export function Orchestrator() {
  const [lineIdx, setLineIdx] = useState(0)
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: "-100px" })
  const [size, setSize] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () => {
      if (containerRef.current) {
        setSize(Math.min(containerRef.current.offsetWidth, 700))
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setLineIdx((prev) => {
        const next = (prev + 1) % terminalLines.length
        if (next === 0) setVisibleLines([0])
        else setVisibleLines((lines) => [...lines.slice(-7), next])
        return next
      })
    }, 1200)
    setVisibleLines([0])
    return () => clearInterval(timer)
  }, [])

  /* ─── ViewBox padding for breathing room ─── */
  const pad = size * 0.18
  const vbSize = size + pad * 2
  const cx = vbSize / 2
  const cy = vbSize / 2

  const hexes = buildHexes(cx, cy, size)
  const neural = buildNeural(cx, cy, size)
  const streams = buildStreams(cx, cy, size)

  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 relative overflow-hidden">
      <ScrollReveal>
        <div className="text-center mb-4">
          <motion.span
            className="inline-block font-mono text-sm md:text-base text-brand tracking-[0.3em] uppercase font-semibold"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            While you sleep, we deploy
          </motion.span>
          <h2 className="font-sans text-[clamp(2rem,4vw,3.8rem)] font-medium tracking-tight mt-3 leading-[1.1]">
            Your entire operation.{" "}
            <span className="text-brand">Automated.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-[620px] mx-auto mt-5 leading-relaxed">
            We build AI systems that run your workflows 24/7 — qualifying leads, drafting proposals, processing invoices, onboarding customers, resolving support tickets, analyzing contracts, forecasting inventory, generating reports, scheduling operations, and closing deals — so your team focuses on what humans do best.
          </p>
        </div>
      </ScrollReveal>

      {/* Side-by-side grid layout */}
      <ScrollReveal variant="scale-up" delay={0.15}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 mx-auto w-full max-w-[1100px] items-center">
          {/* SVG visualization column — client-only to avoid hydration mismatches */}
          <div ref={containerRef} className="relative w-full max-w-[700px] aspect-square mx-auto lg:mx-0">
            {!mounted ? null : <>
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.06)_0%,transparent_60%)]" />
            <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.04)_0%,transparent_70%)] animate-[pulse-glow_6s_ease-in-out_infinite]" />
            <div className="absolute inset-[35%] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06)_0%,transparent_70%)] animate-[pulse-glow_4s_ease-in-out_infinite_1s]" />

            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl opacity-[0.03]"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)" }}
            />

            <svg viewBox={`0 0 ${vbSize} ${vbSize}`} className="w-full h-full relative z-10">
              <defs>
                <filter id="glow2">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                  <stop offset="30%" stopColor="#2563EB" stopOpacity="0.6" />
                  <stop offset="60%" stopColor="#1D4ED8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Hex grid */}
              {hexes.map((h, i) => (
                <motion.polygon
                  key={i}
                  points={hexPoints(h.x, h.y, 10)}
                  fill="none" stroke="rgba(37,99,235,0.08)" strokeWidth={0.5}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.35, 0] }}
                  transition={{ duration: 4, delay: h.delay, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}

              {/* Neural web */}
              {neural.map((l, i) => (
                <motion.line
                  key={i}
                  x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                  stroke={l.color} strokeWidth={0.4}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.25, 0.25, 0] }}
                  transition={{ duration: 3.5, delay: l.delay, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                />
              ))}

              {/* Scan rings */}
              {[0, 3, 6].map((d) => (
                <motion.circle
                  key={d} cx={cx} cy={cy} fill="none" stroke="#2563EB" strokeWidth={0.5}
                  initial={{ r: size * 0.04, opacity: 0 }}
                  animate={{ r: size * 0.45, opacity: [0, 0.15, 0] }}
                  transition={{ duration: 5, delay: d, repeat: Infinity, ease: "easeOut" }}
                />
              ))}

              {/* Data streams */}
              {streams.map((s, i) => (
                <motion.circle
                  key={i} r={1.5} fill={s.color}
                  initial={{ cx: s.x, cy: s.y, opacity: 0 }}
                  animate={{ cx: [s.x, cx + (s.x - cx) * 0.15], cy: [s.y, cy + (s.y - cy) * 0.15], opacity: [0, 0.7, 0] }}
                  transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, repeatDelay: 3, ease: "easeIn" }}
                />
              ))}

              {/* Agent cards */}
              {workflows.map((w, i) => (
                <AgentCard key={w.label} workflow={w} cx={cx} cy={cy} size={size} index={i} inView={inView} />
              ))}

              {/* Central core */}
              <circle cx={cx} cy={cy} r={size * 0.1} fill="url(#coreGlow)" fillOpacity={0.08} />
              <circle cx={cx} cy={cy} r={size * 0.065} fill="url(#coreGlow)" fillOpacity={0.12} filter="url(#glow2)">
                <animate attributeName="r" values={`${size * 0.065};${size * 0.073};${size * 0.065}`} dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={cy} r={size * 0.038} fill="#2563EB" fillOpacity={0.5}>
                <animate attributeName="fill-opacity" values="0.5;0.25;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={cy} r={size * 0.016} fill="#60A5FA" fillOpacity={0.9} filter="url(#glow2)" />

              {/* Rotating rings */}
              <circle cx={cx} cy={cy} r={size * 0.055} fill="none" stroke="#2563EB" strokeWidth={0.8} strokeOpacity={0.2} strokeDasharray="4 3">
                <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="30s" repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={cy} r={size * 0.085} fill="none" stroke="#06B6D4" strokeWidth={0.4} strokeOpacity={0.1} strokeDasharray="2 8">
                <animateTransform attributeName="transform" type="rotate" from={`360 ${cx} ${cy}`} to={`0 ${cx} ${cy}`} dur="45s" repeatCount="indefinite" />
              </circle>
            </svg>
            </>}
          </div>

          {/* Terminal column — visible on all screen sizes */}
          <div className="w-full lg:self-center max-h-[300px] lg:max-h-none">
            <div className="rounded-lg border border-ag-line bg-[#07080D]/95 backdrop-blur-md overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-ag-line bg-[#0A0B10]">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500/50" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <span className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <span className="font-mono text-[9px] text-muted-foreground/40 ml-1">agentiks — live ops</span>
                <span className="ml-auto flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-ag-green animate-pulse" />
                  <span className="font-mono text-[8px] text-ag-green/70">LIVE</span>
                </span>
              </div>
              <div className="p-3 h-[200px] overflow-hidden flex flex-col justify-end">
                <AnimatePresence>
                  {visibleLines.map((idx) => (
                    <motion.div
                      key={`${idx}-${Math.floor(lineIdx / terminalLines.length)}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mb-0.5"
                    >
                      <span
                        className="font-mono text-[10px] leading-relaxed"
                        style={{
                          color: terminalLines[idx].text.includes("\u2713")
                            ? "#10B981"
                            : terminalLines[idx].text.startsWith("\u25b6")
                              ? "#3B82F6"
                              : "rgba(255,255,255,0.35)",
                        }}
                      >
                        {terminalLines[idx].text}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="mt-1.5 flex items-center gap-1">
                  <span className="font-mono text-[10px] text-brand/40">$</span>
                  <motion.span className="w-[5px] h-[12px] bg-brand/50" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                </div>
              </div>
              <div className="px-3 py-1.5 border-t border-ag-line bg-[#0A0B10] flex justify-between">
                <span className="font-mono text-[8px] text-muted-foreground/30">16 agents</span>
                <span className="font-mono text-[8px] text-muted-foreground/30">48 sub-agents</span>
                <span className="font-mono text-[8px] text-ag-green/50">99.97% uptime</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
