"use client"

import { ScrollReveal } from "@/components/scroll-reveal"

const TOOLS = [
  "OpenAI", "Anthropic", "Vercel", "Next.js", "LangChain",
  "Supabase", "PostgreSQL", "Redis", "Slack", "HubSpot",
  "Salesforce", "Zapier", "Stripe", "Twilio", "AWS",
  "Google Cloud", "Azure", "MCP", "AI SDK", "Docker",
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex shrink-0 gap-4 py-2 ${reverse ? "animate-[marquee-reverse_40s_linear_infinite]" : "animate-[marquee_40s_linear_infinite]"}`}
      >
        {[...TOOLS, ...TOOLS].map((tool, i) => (
          <div
            key={`${tool}-${i}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-ag-line bg-ag-surface whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand/40" />
            <span className="text-xs font-mono text-muted-foreground tracking-wide">{tool}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section className="py-12 overflow-hidden">
      <ScrollReveal>
        <MarqueeRow />
        <MarqueeRow reverse />
      </ScrollReveal>
    </section>
  )
}
