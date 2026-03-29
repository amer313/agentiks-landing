"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { SectionHeader } from "@/components/section-header"
import { ScrollReveal } from "@/components/scroll-reveal"

// ── Hub cities ──
const HUBS = [
  { lat: 40.7, lng: -74, label: "New York", agents: 24, size: 0.6 },
  { lat: 37.8, lng: -122.4, label: "San Francisco", agents: 18, size: 0.5 },
  { lat: 34.1, lng: -118.2, label: "Los Angeles", agents: 12, size: 0.4 },
  { lat: 51.5, lng: -0.1, label: "London", agents: 21, size: 0.6 },
  { lat: 48.9, lng: 2.35, label: "Paris", agents: 9, size: 0.4 },
  { lat: 52.5, lng: 13.4, label: "Berlin", agents: 11, size: 0.4 },
  { lat: 35.7, lng: 139.7, label: "Tokyo", agents: 16, size: 0.5 },
  { lat: 22.3, lng: 114.2, label: "Hong Kong", agents: 14, size: 0.4 },
  { lat: 1.35, lng: 103.8, label: "Singapore", agents: 19, size: 0.5 },
  { lat: 25.2, lng: 55.3, label: "Dubai", agents: 15, size: 0.5 },
  { lat: -23.5, lng: -46.6, label: "São Paulo", agents: 8, size: 0.4 },
  { lat: -33.9, lng: 151.2, label: "Sydney", agents: 10, size: 0.4 },
  { lat: 30, lng: 31.2, label: "Cairo", agents: 6, size: 0.3 },
  { lat: -33.9, lng: 18.4, label: "Cape Town", agents: 5, size: 0.3 },
  { lat: 19, lng: 72.9, label: "Mumbai", agents: 13, size: 0.4 },
  { lat: 24.5, lng: 54.7, label: "Abu Dhabi", agents: 11, size: 0.4 },
]

// Top hubs get HTML labels
const LABELED_HUBS = HUBS.filter((h) => h.size >= 0.5)

// ── Arc pool for dynamic spawning ──
const ARC_POOL = [
  { startLat: 40.7, startLng: -74, endLat: 51.5, endLng: -0.1 },
  { startLat: 37.8, startLng: -122.4, endLat: 48.9, endLng: 2.35 },
  { startLat: 34.1, startLng: -118.2, endLat: 52.5, endLng: 13.4 },
  { startLat: 51.5, startLng: -0.1, endLat: 35.7, endLng: 139.7 },
  { startLat: 48.9, startLng: 2.35, endLat: 22.3, endLng: 114.2 },
  { startLat: 52.5, startLng: 13.4, endLat: 1.35, endLng: 103.8 },
  { startLat: 35.7, startLng: 139.7, endLat: 25.2, endLng: 55.3 },
  { startLat: 22.3, startLng: 114.2, endLat: 24.5, endLng: 54.7 },
  { startLat: 40.7, startLng: -74, endLat: -23.5, endLng: -46.6 },
  { startLat: 37.8, startLng: -122.4, endLat: -34.6, endLng: -58.4 },
  { startLat: 51.5, startLng: -0.1, endLat: -33.9, endLng: 18.4 },
  { startLat: 48.9, startLng: 2.35, endLat: 30, endLng: 31.2 },
  { startLat: 1.35, startLng: 103.8, endLat: -33.9, endLng: 151.2 },
  { startLat: 35.7, startLng: 139.7, endLat: -37.8, endLng: 145 },
  { startLat: 37.8, startLng: -122.4, endLat: 35.7, endLng: 139.7 },
  { startLat: 34.1, startLng: -118.2, endLat: 22.3, endLng: 114.2 },
  { startLat: 25.2, startLng: 55.3, endLat: 19, endLng: 72.9 },
  { startLat: 24.5, startLng: 54.7, endLat: 13.1, endLng: 80.3 },
  { startLat: 40.7, startLng: -74, endLat: 25.2, endLng: 55.3 },
  { startLat: 51.5, startLng: -0.1, endLat: 1.35, endLng: 103.8 },
  { startLat: -23.5, startLng: -46.6, endLat: 30, endLng: 31.2 },
  { startLat: 19, startLng: 72.9, endLat: 35.7, endLng: 139.7 },
  { startLat: 22.3, startLng: 114.2, endLat: -33.9, endLng: 151.2 },
  { startLat: 37.8, startLng: -122.4, endLat: 25.2, endLng: 55.3 },
]

const COUNTRIES_URL =
  "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson"

export function GlobeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)
  const [GlobeComponent, setGlobeComponent] = useState<any>(null)
  const [countries, setCountries] = useState<any[]>([])
  const [liveArcs, setLiveArcs] = useState(ARC_POOL.slice(0, 6))

  // Dynamic import
  useEffect(() => {
    import("react-globe.gl").then((mod) => {
      setGlobeComponent(() => mod.default)
      setMounted(true)
    })
  }, [])

  // Fetch country polygons for hex layer
  useEffect(() => {
    fetch(COUNTRIES_URL)
      .then((r) => r.json())
      .then((data) => setCountries(data.features))
      .catch(() => {})
  }, [])

  // Dynamic arc spawning — rotate arcs every 2s to simulate live traffic
  useEffect(() => {
    if (!mounted) return
    let idx = 6
    const interval = setInterval(() => {
      const count = 4 + Math.floor(Math.random() * 4) // 4-7 arcs at a time
      const next: typeof ARC_POOL = []
      for (let i = 0; i < count; i++) {
        next.push(ARC_POOL[(idx + i) % ARC_POOL.length])
      }
      idx = (idx + count) % ARC_POOL.length
      setLiveArcs(next)
    }, 2500)
    return () => clearInterval(interval)
  }, [mounted])

  // Auto-rotate & POV
  const onGlobeReady = useCallback(() => {
    const globe = globeRef.current
    if (!globe) return
    globe.pointOfView({ lat: 20, lng: 10, altitude: 2.2 }, 0)
    globe.controls().autoRotate = true
    globe.controls().autoRotateSpeed = 0.35
    globe.controls().enableZoom = false
  }, [])

  // Responsive sizing
  const [dims, setDims] = useState({ w: 700, h: 700 })
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth
        setDims({ w: Math.min(w, 800), h: Math.min(w, 800) })
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 relative overflow-hidden" id="network">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
        {/* Text */}
        <div>
          <SectionHeader title="Global agent infrastructure." label="network" />
          <ScrollReveal>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-[480px]">
              Your AI agents don&apos;t sleep. They operate across time zones, process data from
              every system you use, and coordinate actions worldwide — all in real time.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              {[
                { value: "24/7", label: "Always-on agent orchestration" },
                { value: "< 200ms", label: "Global response latency" },
                { value: "∞", label: "Scalable to any workload" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-4">
                  <span className="text-2xl font-medium text-brand tabular-nums w-[120px] shrink-0 whitespace-nowrap">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Globe */}
        <div ref={containerRef} className="relative flex items-center justify-center min-h-[500px]">
          {/* Glow behind globe */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.1),transparent_70%)] animate-[pulse-glow_4s_ease-in-out_infinite]" />
          </div>

          {mounted && GlobeComponent && (
            <GlobeComponent
              ref={globeRef}
              width={dims.w}
              height={dims.h}
              backgroundColor="rgba(0,0,0,0)"
              showGlobe={true}
              showAtmosphere={true}
              atmosphereColor="#DC2626"
              atmosphereAltitude={0.15}
              onGlobeReady={onGlobeReady}
              // ── Hex polygons: dark country tiles with ember edges ──
              hexPolygonsData={countries}
              hexPolygonResolution={3}
              hexPolygonMargin={0.35}
              hexPolygonUseDots={false}
              hexPolygonColor={() => "rgba(220, 38, 38, 0.18)"}
              hexPolygonAltitude={0.005}
              // ── Dynamic arcs: cycle through pool ──
              arcsData={liveArcs}
              arcColor={() => ["rgba(239, 68, 68, 1)", "rgba(252, 165, 165, 0.6)"]}
              arcStroke={0.8}
              arcDashLength={0.5}
              arcDashGap={0.15}
              arcDashAnimateTime={2200}
              arcAltitudeAutoScale={0.35}
              // ── Hub points ──
              pointsData={HUBS}
              pointColor={() => "#FCA5A5"}
              pointAltitude={0.01}
              pointRadius="size"
              pointsMerge={true}
              // ── Pulsing rings from major hubs ──
              ringsData={LABELED_HUBS}
              ringColor={() => (t: number) => `rgba(252, 165, 165, ${1 - t})`}
              ringMaxRadius={3}
              ringPropagationSpeed={2}
              ringRepeatPeriod={1200}
              // ── HTML markers on top hubs ──
              htmlElementsData={LABELED_HUBS}
              htmlLat="lat"
              htmlLng="lng"
              htmlAltitude={0.04}
              htmlElement={(d: any) => {
                const el = document.createElement("div")
                el.innerHTML = `
                  <div style="
                    font-family: ui-monospace, monospace;
                    font-size: 9px;
                    color: rgba(255, 255, 255, 0.9);
                    background: rgba(10, 10, 15, 0.8);
                    backdrop-filter: blur(6px);
                    border: 1px solid rgba(239, 68, 68, 0.4);
                    border-radius: 6px;
                    padding: 3px 7px;
                    white-space: nowrap;
                    pointer-events: none;
                    transform: translate(-50%, -100%);
                    letter-spacing: 0.05em;
                  ">
                    <span style="color: #fff;">${d.label}</span>
                    <span style="color: rgba(255,255,255,0.35); margin: 0 3px;">·</span>
                    <span style="color: #FCA5A5;">${d.agents} agents</span>
                  </div>
                `
                el.style.pointerEvents = "none"
                return el
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
}
