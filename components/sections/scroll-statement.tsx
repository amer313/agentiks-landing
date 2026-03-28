"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const lines = [
  { text: "We design, build, and deploy", highlight: false },
  { text: "AI agent systems", highlight: true },
  { text: "that run your business", highlight: false },
  { text: "while you sleep.", highlight: false },
]

export function ScrollStatement() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="text-center px-6">
          {lines.map((line, i) => (
            <Line
              key={i}
              text={line.text}
              highlight={line.highlight}
              index={i}
              total={lines.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Line({ text, highlight, index, total, progress }: {
  text: string
  highlight: boolean
  index: number
  total: number
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const segmentSize = 0.6 / total
  const start = 0.15 + index * segmentSize
  const end = start + segmentSize

  const opacity = useTransform(progress, [start, end], [0, 1])
  const y = useTransform(progress, [start, end], [40, 0])
  const blur = useTransform(progress, [start, end], [12, 0])

  return (
    <motion.div
      className={`text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-tight leading-[1.2] ${
        highlight ? "text-brand" : "text-foreground"
      }`}
      style={{
        opacity,
        y,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      {text}
    </motion.div>
  )
}
