import { SectionHeader } from "@/components/section-header"
import { ScrollReveal } from "@/components/scroll-reveal"

const steps = [
  {
    num: "1",
    title: "Discovery & strategy",
    code: "Map workflows → identify automation opportunities",
    desc: "We audit your operations, interview key stakeholders, and map every workflow. Then we pinpoint exactly where AI agents will deliver the highest ROI.",
  },
  {
    num: "2",
    title: "Design & build",
    code: "Custom agents → integrated into your stack",
    desc: "Our engineers build bespoke AI agent systems tailored to your business. MCP integrations, tool calling, durable workflows — production-grade from day one.",
  },
  {
    num: "3",
    title: "Deploy & scale",
    code: "Monitor → optimize → expand",
    desc: "We deploy into your infrastructure, train your team, and provide ongoing support. As results compound, we help you expand to new use cases.",
  },
]

export function Setup() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 pb-16" id="how">
      <SectionHeader title="How we work" label="3 phases" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={i * 0.1}>
            <div>
              <div className="font-sans text-6xl font-medium italic text-brand/30 leading-none mb-4">
                {step.num}
              </div>
              <h3 className="font-sans text-xl font-medium mb-3">{step.title}</h3>
              <code className="font-mono text-xs text-foreground bg-ag-dim border border-border px-2.5 py-1 rounded-md inline-block mb-3">
                {step.code}
              </code>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
