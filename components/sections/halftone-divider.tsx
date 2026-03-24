"use client"

import { useRef, useEffect } from "react"

const BAYER_8 = [
  [ 0/64,32/64, 8/64,40/64, 2/64,34/64,10/64,42/64],
  [48/64,16/64,56/64,24/64,50/64,18/64,58/64,26/64],
  [12/64,44/64, 4/64,36/64,14/64,46/64, 6/64,38/64],
  [60/64,28/64,52/64,20/64,62/64,30/64,54/64,22/64],
  [ 3/64,35/64,11/64,43/64, 1/64,33/64, 9/64,41/64],
  [51/64,19/64,59/64,27/64,49/64,17/64,57/64,25/64],
  [15/64,47/64, 7/64,39/64,13/64,45/64, 5/64,37/64],
  [63/64,31/64,55/64,23/64,61/64,29/64,53/64,21/64],
]

export function HalftoneDivider({
  direction = "dark-to-light",
  height = 200,
  darkColor = "#06060A",
  lightColor = "#ffffff",
}: {
  direction?: "dark-to-light" | "light-to-dark"
  height?: number
  darkColor?: string
  lightColor?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cw = 960

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, cw, height)

    const isDarkToLight = direction === "dark-to-light"
    const topColor = isDarkToLight ? darkColor : lightColor
    const bottomColor = isDarkToLight ? lightColor : darkColor

    for (let y = 0; y < height; y++) {
      const t = y / height
      for (let x = 0; x < cw; x++) {
        const threshold = BAYER_8[y % 8][x % 8]
        ctx.fillStyle = t > threshold ? bottomColor : topColor
        ctx.fillRect(x, y, 1, 1)
      }
    }
  }, [direction, height, darkColor, lightColor])

  return (
    <canvas
      ref={canvasRef}
      width={cw}
      height={height}
      className="w-full pointer-events-none select-none"
      style={{ height: `${height}px`, imageRendering: "pixelated", display: "block" }}
      aria-hidden
    />
  )
}
