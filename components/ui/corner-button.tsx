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
      className={`group relative inline-flex items-center gap-2 text-sm font-semibold px-8 py-3.5 transition-all duration-200 overflow-hidden ${
        isPrimary
          ? "bg-transparent text-brand group-hover:text-white border border-brand/40"
          : "bg-transparent text-foreground/70 hover:text-foreground border border-white/[0.08] hover:border-brand/30"
      } ${className}`}
    >
      {/* Corner fills — four quadrants that expand from corners to fill the entire button */}
      <span className="pointer-events-none absolute inset-0">
        {/* Top-left */}
        <span className={`absolute top-0 left-0 w-2 h-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-[calc(50%+1px)] group-hover:h-[calc(50%+1px)] ${
          isPrimary
            ? "border-t-2 border-l-2 border-white/30 group-hover:border-white/0 bg-brand/0 group-hover:bg-brand"
            : "border-t border-l border-brand/0 group-hover:border-brand/50 bg-brand/0 group-hover:bg-brand/20"
        }`} />
        {/* Top-right */}
        <span className={`absolute top-0 right-0 w-2 h-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-[calc(50%+1px)] group-hover:h-[calc(50%+1px)] ${
          isPrimary
            ? "border-t-2 border-r-2 border-white/30 group-hover:border-white/0 bg-brand/0 group-hover:bg-brand"
            : "border-t border-r border-brand/0 group-hover:border-brand/50 bg-brand/0 group-hover:bg-brand/20"
        }`} />
        {/* Bottom-left */}
        <span className={`absolute bottom-0 left-0 w-2 h-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-[calc(50%+1px)] group-hover:h-[calc(50%+1px)] ${
          isPrimary
            ? "border-b-2 border-l-2 border-white/30 group-hover:border-white/0 bg-brand/0 group-hover:bg-brand"
            : "border-b border-l border-brand/0 group-hover:border-brand/50 bg-brand/0 group-hover:bg-brand/20"
        }`} />
        {/* Bottom-right */}
        <span className={`absolute bottom-0 right-0 w-2 h-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-[calc(50%+1px)] group-hover:h-[calc(50%+1px)] ${
          isPrimary
            ? "border-b-2 border-r-2 border-white/30 group-hover:border-white/0 bg-brand/0 group-hover:bg-brand"
            : "border-b border-r border-brand/0 group-hover:border-brand/50 bg-brand/0 group-hover:bg-brand/20"
        }`} />
      </span>

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  )
}
