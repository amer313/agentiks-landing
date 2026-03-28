import { type ReactNode } from "react"

interface CornerButtonProps {
  href: string
  children: ReactNode
  external?: boolean
  variant?: "primary" | "secondary"
  className?: string
}

export function CornerButton({ href, children, external, variant = "primary", className = "" }: CornerButtonProps) {
  const isPrimary = variant === "primary"

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex items-center gap-2 text-sm font-semibold px-8 py-3.5 transition-all duration-200 ${
        isPrimary
          ? "bg-brand text-white hover:bg-brand-dark"
          : "bg-transparent text-foreground/70 hover:text-foreground border border-white/[0.08] hover:border-white/[0.15]"
      } ${className}`}
    >
      {/* Corner brackets */}
      <span className="pointer-events-none absolute inset-0">
        {/* Top-left */}
        <span className={`absolute top-0 left-0 w-2.5 h-2.5 transition-all duration-200 group-hover:w-1/2 group-hover:h-1/2 ${
          isPrimary
            ? "border-t-2 border-l-2 border-white/40 group-hover:border-white/60"
            : "border-t border-l border-brand/0 group-hover:border-brand/50"
        }`} />
        {/* Top-right */}
        <span className={`absolute top-0 right-0 w-2.5 h-2.5 transition-all duration-200 group-hover:w-1/2 group-hover:h-1/2 ${
          isPrimary
            ? "border-t-2 border-r-2 border-white/40 group-hover:border-white/60"
            : "border-t border-r border-brand/0 group-hover:border-brand/50"
        }`} />
        {/* Bottom-left */}
        <span className={`absolute bottom-0 left-0 w-2.5 h-2.5 transition-all duration-200 group-hover:w-1/2 group-hover:h-1/2 ${
          isPrimary
            ? "border-b-2 border-l-2 border-white/40 group-hover:border-white/60"
            : "border-b border-l border-brand/0 group-hover:border-brand/50"
        }`} />
        {/* Bottom-right */}
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 transition-all duration-200 group-hover:w-1/2 group-hover:h-1/2 ${
          isPrimary
            ? "border-b-2 border-r-2 border-white/40 group-hover:border-white/60"
            : "border-b border-r border-brand/0 group-hover:border-brand/50"
        }`} />
      </span>
      {children}
    </a>
  )
}
