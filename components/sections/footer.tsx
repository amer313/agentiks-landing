import { Separator } from "@/components/ui/separator"
import { AgentiksLogo } from "@/components/ui/agentiks-logo"

const footerLinks = {
  Services: [
    { label: "Agent Strategy", href: "#capabilities" },
    { label: "Custom Development", href: "#capabilities" },
    { label: "Integration", href: "#capabilities" },
    { label: "Ongoing Support", href: "#capabilities" },
  ],
  Company: [
    { label: "How We Work", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  Connect: [
    { label: "Email", href: "mailto:team@agentiks.dev" },
    { label: "Book a Call", href: "https://cal.com/agentiks/strategy-call", external: true },
  ],
}

export function Footer() {
  return (
    <footer className="max-w-[1400px] mx-auto px-6 md:px-12">
      <Separator className="bg-ag-line" />

      <div className="grid grid-cols-2 md:grid-cols-[1fr_repeat(3,auto)] gap-8 md:gap-16 py-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <AgentiksLogo className="w-7 h-7" />
            <span className="font-semibold text-base tracking-tight">Agentiks</span>
          </div>
          <p className="text-sm text-muted-foreground/50 max-w-[240px] leading-relaxed">
            Custom AI agent systems that automate workflows, scale operations, and give your team superpowers.
          </p>
        </div>

        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/60 mb-4">{category}</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground/70 transition-colors"
                    >
                      {link.label} <span className="text-[10px]">&#8599;</span>
                    </a>
                  ) : (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground/70 transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator className="bg-ag-line" />
      <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-muted-foreground/40 tracking-wide">
        <span>&copy; 2026 Agentiks. All rights reserved.</span>
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-ag-green/60" />Open Standards</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-brand/60" />You Own the Code</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-ag-cyan/60" />Production-Grade</span>
        </div>
      </div>
    </footer>
  )
}
