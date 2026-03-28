"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const words = [
  "We", "design,", "build,", "and", "deploy",
  "AI", "agent", "systems",
  "that", "run", "your", "business",
  "while", "you", "sleep.",
]

export function ScrollStatement() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <section ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <p className="text-[clamp(1.8rem,4vw,4rem)] font-medium leading-[1.3] tracking-tight max-w-[900px] mx-auto px-6 md:px-12 text-center">
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />
            )
          })}
        </p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
        >
          <span className="font-mono text-[10px] text-muted-foreground/40 tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            className="w-px h-8 bg-brand/30"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  )
}

function Word({ word, range, progress }: {
  word: string
  range: [number, number]
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const blur = useTransform(progress, range, [4, 0])
  const y = useTransform(progress, range, [8, 0])

  const isHighlight = ["AI", "agent", "systems"].includes(word)

  return (
    <motion.span
      className={`inline-block mr-[0.3em] ${isHighlight ? "text-brand" : ""}`}
      style={{
        opacity,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        y,
      }}
    >
      {word}
    </motion.span>
  )
}
