"use client"

import { useRef, useEffect, useState } from "react"

interface MagnetLogoProps {
  size?: number | string
  lineColor?: string
  lineWidth?: number
  lineHeight?: number
  rows?: number
  columns?: number
  baseAngle?: number
  className?: string
}

// Lightning bolt / "A" shape SVG path for Agentiks
const AGENTIKS_PATH =
  "M60,0 L35,50 L50,50 L25,100 L45,100 L20,150 L100,60 L75,60 L100,0 Z"

export default function MagnetLogo({
  size = 300,
  lineColor = "rgba(139, 92, 246, 0.7)",
  lineWidth = 2,
  lineHeight = 12,
  rows = 28,
  columns = 28,
  baseAngle = -10,
  className = "",
}: MagnetLogoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [mask, setMask] = useState<boolean[]>([])

  useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.width = columns
    canvas.height = rows
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const sx = columns / 120
    const sy = rows / 150
    ctx.scale(sx, sy)

    const path = new Path2D(AGENTIKS_PATH)
    ctx.fill(path)

    const imageData = ctx.getImageData(0, 0, columns, rows)
    const hits: boolean[] = []
    for (let i = 0; i < rows * columns; i++) {
      hits.push(imageData.data[i * 4 + 3] > 20)
    }
    setMask(hits)
  }, [rows, columns])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll<HTMLSpanElement>("[data-line]")

    const onPointerMove = (pointer: { x: number; y: number }) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const centerX = rect.x + rect.width / 2
        const centerY = rect.y + rect.height / 2
        const b = pointer.x - centerX
        const a = pointer.y - centerY
        const c = Math.sqrt(a * a + b * b) || 1
        const r =
          ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1)
        item.style.setProperty("--rotate", `${r}deg`)
      })
    }

    const handlePointerMove = (e: PointerEvent) => {
      onPointerMove({ x: e.x, y: e.y })
    }

    window.addEventListener("pointermove", handlePointerMove)

    if (items.length) {
      const mid = Math.floor(items.length / 2)
      const rect = items[mid].getBoundingClientRect()
      onPointerMove({ x: rect.x, y: rect.y })
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [mask])

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: size,
        height: size,
      }}
    >
      {Array.from({ length: rows * columns }, (_, i) => {
        const visible = mask[i]
        return visible ? (
          <span
            key={i}
            data-line
            className="block origin-center"
            style={{
              backgroundColor: lineColor,
              width: lineWidth,
              height: lineHeight,
              borderRadius: lineWidth,
              // @ts-expect-error CSS custom property
              "--rotate": `${baseAngle}deg`,
              transform: "rotate(var(--rotate))",
              willChange: "transform",
              transition: "transform 0.2s ease-out",
            }}
          />
        ) : (
          <span key={i} className="block" style={{ width: lineWidth, height: lineHeight }} />
        )
      })}
    </div>
  )
}
