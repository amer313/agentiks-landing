"use client"

import { cn } from "@/lib/utils"

interface ShineBorderProps {
  children: React.ReactNode
  className?: string
  color?: string
  duration?: number
  borderWidth?: number
  borderRadius?: number
}

export function ShineBorder({
  children,
  className,
  color = "rgba(255, 255, 255, 0.15)",
  duration = 8,
  borderWidth = 1,
  borderRadius = 12,
}: ShineBorderProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ borderRadius }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          borderRadius,
          padding: borderWidth,
          background: `conic-gradient(from 0deg, transparent 60%, ${color} 80%, transparent 100%)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: `shineSpin ${duration}s linear infinite`,
        }}
      />
      <div className="relative z-10" style={{ borderRadius }}>
        {children}
      </div>
      <style>{`
        @keyframes shineSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
