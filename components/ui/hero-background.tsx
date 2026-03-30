"use client"

import { useEffect, useRef } from "react"

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio, 2)
    const GRID = 48
    const GLOW = 220

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    // Track mouse relative to canvas (via document so we don't block clicks)
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }
    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)

    // Particles
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 2000, y: Math.random() * 1200,
      vx: (Math.random() - 0.5) * 0.2, vy: -(0.12 + Math.random() * 0.35),
      size: 1 + Math.random() * 1.2, base: 0.12 + Math.random() * 0.25,
      speed: 0.4 + Math.random() * 0.5,
    }))

    let raf: number
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const mx = mouse.current.x
      const my = mouse.current.y

      // ── Base grid lines (always visible, dim) ──
      ctx.lineWidth = 0.5
      ctx.strokeStyle = "rgba(220, 38, 38, 0.06)"
      for (let x = 0; x <= w; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y <= h; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      // ── Base grid dots at intersections (dim) ──
      for (let x = 0; x <= w; x += GRID) {
        for (let y = 0; y <= h; y += GRID) {
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(220, 38, 38, 0.08)"
          ctx.fill()
        }
      }

      // ── Mouse-reactive glow zone ──
      if (mx > -500) {
        // Bright lines near mouse — only iterate nearby columns/rows
        const colStart = Math.floor(Math.max(0, mx - GLOW) / GRID) * GRID
        const colEnd = Math.ceil(Math.min(w, mx + GLOW) / GRID) * GRID
        const rowStart = Math.floor(Math.max(0, my - GLOW) / GRID) * GRID
        const rowEnd = Math.ceil(Math.min(h, my + GLOW) / GRID) * GRID

        // Vertical lines
        for (let x = colStart; x <= colEnd; x += GRID) {
          const dist = Math.abs(x - mx)
          if (dist < GLOW) {
            const inf = 1 - dist / GLOW
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h)
            ctx.strokeStyle = `rgba(220, 38, 38, ${inf * inf * 0.25})`
            ctx.lineWidth = 0.8 + inf
            ctx.stroke()
          }
        }
        // Horizontal lines
        for (let y = rowStart; y <= rowEnd; y += GRID) {
          const dist = Math.abs(y - my)
          if (dist < GLOW) {
            const inf = 1 - dist / GLOW
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y)
            ctx.strokeStyle = `rgba(220, 38, 38, ${inf * inf * 0.25})`
            ctx.lineWidth = 0.8 + inf
            ctx.stroke()
          }
        }

        // Bright dots near mouse
        for (let x = colStart; x <= colEnd; x += GRID) {
          for (let y = rowStart; y <= rowEnd; y += GRID) {
            const dx = x - mx, dy = y - my
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < GLOW) {
              const inf = 1 - dist / GLOW
              const size = 1.5 + inf * 3
              ctx.beginPath()
              ctx.arc(x, y, size, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(239, 68, 68, ${inf * inf * 0.7})`
              ctx.fill()
            }
          }
        }

        // Soft radial glow following mouse
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, GLOW)
        g.addColorStop(0, "rgba(220, 38, 38, 0.07)")
        g.addColorStop(0.5, "rgba(220, 38, 38, 0.02)")
        g.addColorStop(1, "transparent")
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }

      // ── Floating particles ──
      for (const p of particles) {
        p.x += p.vx * p.speed
        p.y += p.vy * p.speed
        if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w }
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        const pulse = Math.sin(t * 0.0008 * p.speed + p.x * 0.01) * 0.08
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 38, 38, ${p.base + pulse})`
        ctx.fill()
      }

      // Particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < 18000) {
            const d = Math.sqrt(d2)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.05 * (1 - d / 134)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Particle + grid canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Central ember glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,rgba(220,38,38,0.08),rgba(239,68,68,0.02)_50%,transparent_70%)] animate-[pulse-glow_4s_ease-in-out_infinite]" />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/15 to-transparent"
        style={{ animation: "scan 8s linear infinite" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_25%,rgba(5,5,8,0.85)_100%)]" />
    </div>
  )
}
