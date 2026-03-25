import { ScrollReveal } from "@/components/scroll-reveal"
import { Separator } from "@/components/ui/separator"

interface SectionHeaderProps {
  title: string
  label: string
  center?: boolean
}

export function SectionHeader({ title, label, center }: SectionHeaderProps) {
  return (
    <ScrollReveal variant="fade-blur">
      <div className={`flex items-baseline gap-8 mb-6 ${center ? "flex-col items-center text-center gap-3" : ""}`}>
        {center && (
          <span className="font-mono text-xs text-brand tracking-widest uppercase">
            {label}
          </span>
        )}
        <h2 className="font-sans text-[clamp(2rem,3.5vw,3.5rem)] font-medium tracking-tight">
          {title}
        </h2>
        {!center && (
          <span className="font-mono text-xs text-brand tracking-widest uppercase">
            {label}
          </span>
        )}
      </div>
      <Separator className="mb-10 bg-border" />
    </ScrollReveal>
  )
}
