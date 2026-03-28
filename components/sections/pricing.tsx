import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ShineBorder } from "@/components/ui/shine-border"
import { cn } from "@/lib/utils"

const tiers = [
  {
    name: "Discovery",
    price: "Free",
    note: "1-hour strategy call",
    features: [
      "Operational workflow audit",
      "AI opportunity assessment",
      "High-level roadmap",
      "No commitment",
      "ROI ballpark estimates",
    ],
    cta: { label: "Book a Call", href: "#contact", variant: "outline" as const },
    highlight: false,
  },
  {
    name: "Sprint",
    price: "$15k",
    note: "single agent, 4 weeks",
    features: [
      "One custom AI agent",
      "Tool calling & integrations",
      "Deployed to your infra",
      "30 days post-launch support",
      "Full source code ownership",
    ],
    cta: { label: "Get Started", href: "#contact", variant: "default" as const },
    highlight: false,
  },
  {
    name: "Scale",
    price: "$40k",
    priceSuffix: "+",
    note: "multi-agent system",
    features: [
      "Everything in Sprint",
      "Multi-agent orchestration",
      "Durable workflows",
      "Human-in-the-loop approvals",
      "90 days support & optimization",
    ],
    cta: { label: "Get Started", href: "#contact", variant: "default" as const },
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "ongoing partnership",
    features: [
      "Everything in Scale",
      "Dedicated engineering team",
      "Unlimited agents & workflows",
      "SLA & priority support",
      "On-prem / air-gapped options",
    ],
    cta: { label: "Contact Us", href: "#contact", variant: "outline" as const },
    highlight: false,
  },
]

export function Pricing() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 pb-16" id="pricing">
      <SectionHeader title="Pricing" label="pricing" center />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((tier, i) => {
            const card = (
              <Card
                key={tier.name}
                className={cn(
                  "bg-card border-border h-full flex flex-col",
                  tier.highlight && "border-brand/20"
                )}
              >
                <CardHeader>
                  <div className={cn(
                    "font-mono text-xs tracking-[0.15em] uppercase mb-4",
                    tier.highlight ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {tier.name}
                  </div>
                  <CardTitle className="text-4xl font-medium">
                    {tier.price}
                    {tier.priceSuffix && (
                      <span className="text-sm text-muted-foreground ml-1">{tier.priceSuffix}</span>
                    )}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground font-mono">{tier.note}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-0">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-muted-foreground py-2.5 border-b border-border last:border-none"
                      >
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          tier.highlight ? "bg-foreground" : "bg-foreground/20"
                        )} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto">
                  <Button variant={tier.cta.variant} className="w-full py-5 text-sm font-semibold rounded-xl" asChild>
                    <a href={tier.cta.href}>{tier.cta.label}</a>
                  </Button>
                </CardFooter>
              </Card>
            )
            return (
              <ScrollReveal key={tier.name} variant="pop-in" delay={i * 0.12}>
                {tier.highlight ? (
                  <ShineBorder color="rgba(220, 38, 38, 0.4)" duration={6} borderRadius={12} className="h-full">
                    {card}
                  </ShineBorder>
                ) : (
                  <div className="h-full">{card}</div>
                )}
              </ScrollReveal>
            )
          })}
        </div>
    </section>
  )
}
