"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"

const stats = [
  { value: 847, suffix: "+", label: "Hours Saved Monthly" },
  { value: 4, suffix: "wk", label: "Avg. Time to Deploy" },
  { value: 0, suffix: "", label: "Vendor Lock-in", override: "Zero" },
  { value: 100, suffix: "%", label: "Code Ownership" },
]

function Counter({ target, prefix, suffix, active, override }: { target: number; prefix?: string; suffix: string; active: boolean; override?: string }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) return
    const duration = 1500
    const start = performance.now()
    let raf: number

    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setDone(true)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target])

  if (override) return <span className={done ? "text-brand transition-colors duration-500" : ""}>{override}</span>

  return (
    <span className={`tabular-nums transition-colors duration-500 ${done ? "text-brand" : ""}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-12" ref={ref}>
      <ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-dashed border-ag-line rounded-xl overflow-hidden">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center border-r border-b border-dashed border-ag-line last:border-r-0 p-6">
              <div className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-1">
                <Counter target={stat.value} prefix={(stat as typeof stats[number] & { prefix?: string }).prefix} suffix={stat.suffix} active={inView} override={(stat as typeof stats[number] & { override?: string }).override} />
              </div>
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
