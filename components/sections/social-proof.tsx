import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionHeader } from "@/components/section-header"

const testimonials = [
  {
    quote:
      "Agentiks built us an AI agent system that handles 80% of our customer intake. Our team went from drowning in admin to closing deals.",
    name: "Marcus Rivera",
    title: "CEO",
    company: "Renovation Marketing Pros",
    initials: "MR",
  },
  {
    quote:
      "We had no idea AI agents could be applied to our workflow. Agentiks mapped our entire operation and automated the bottlenecks in 3 weeks.",
    name: "Elena Vasquez",
    title: "COO",
    company: "Summit Logistics",
    initials: "EV",
  },
  {
    quote:
      "Their team doesn't just build bots. They understand the business problem first, then design agents that actually solve it.",
    name: "David Park",
    title: "VP Operations",
    company: "Clearpath Health",
    initials: "DP",
  },
]

export function SocialProof() {
  return (
    <section className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 py-24">
      <SectionHeader
        title="Trusted by forward-thinking teams."
        label="social proof"
        center
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="flex flex-col justify-between h-full rounded-xl border border-dashed border-ag-line bg-ag-surface p-6">
              <div>
                <span className="font-mono text-sm font-semibold text-foreground/70 tracking-wide">
                  {t.company}
                </span>
              </div>

              <p className="text-base text-foreground/80 leading-relaxed mt-4">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 pt-4 border-t border-dashed border-ag-line flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                  <span className="font-mono text-xs font-semibold text-brand">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="font-mono text-xs text-muted-foreground/60">{t.title}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
