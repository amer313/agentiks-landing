"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { ScrollReveal } from "@/components/scroll-reveal"

const faqs = [
  {
    q: "What exactly is an AI agent?",
    a: "An AI agent is software that can autonomously perform tasks — reading data, making decisions, calling APIs, writing content, and executing multi-step workflows. Unlike chatbots, agents take action. They connect to your real systems and do real work, with human oversight where needed.",
  },
  {
    q: "What industries do you work with?",
    a: "Any industry. We've built agent systems for home services, logistics, healthcare operations, legal firms, e-commerce, and SaaS companies. If your business has repetitive workflows, data entry, customer communication, or operational bottlenecks, AI agents can help.",
  },
  {
    q: "Do we need to change our existing tech stack?",
    a: "No. We build agents that integrate with your current tools — CRMs, databases, APIs, email systems, whatever you use. We don't replace your stack, we augment it.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "A single-agent sprint takes about 4 weeks from kickoff to deployment. Multi-agent systems typically take 8-12 weeks depending on complexity. Every engagement starts with a 1-week discovery phase.",
  },
  {
    q: "Who owns the code?",
    a: "You do. 100%. Every line of code we write belongs to you. No vendor lock-in, no proprietary platforms, no recurring licensing fees for the agents themselves. We build on open standards and open-source frameworks.",
  },
  {
    q: "What happens after launch?",
    a: "Every engagement includes post-launch support (30-90 days depending on tier). We monitor agent performance, fix issues, and optimize. After support ends, we offer optional ongoing retainers for teams that want continuous improvement.",
  },
  {
    q: "How do you ensure agents are safe and reliable?",
    a: "We build in guardrails by default: structured outputs, input validation, human-in-the-loop approval for sensitive actions, comprehensive logging, and automated testing. Every agent system includes monitoring and alerting.",
  },
  {
    q: "Can you work with our internal engineering team?",
    a: "Absolutely. We can operate as a standalone team or embed with your engineers. We provide full documentation, training, and knowledge transfer so your team can maintain and extend the system after we're done.",
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="border-b border-border last:border-none">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-5 text-left group"
        >
          <span className="text-[15px] font-medium text-foreground/90 group-hover:text-foreground transition-colors pr-4">
            {q}
          </span>
          <ChevronRight
            className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="text-sm text-muted-foreground leading-relaxed pb-5 max-w-[700px]">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  )
}

export function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section id="faq" className="max-w-[800px] mx-auto px-6 md:px-12 py-16">
        <SectionHeader title="Frequently Asked Questions" label="FAQ" />
        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
