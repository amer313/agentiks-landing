"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { AgentiksLogo } from "@/components/ui/agentiks-logo"

const navLinks = [
  { label: "Services", href: "#capabilities" },
  { label: "Process", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 top-[60px] z-50 bg-[#06060A]/98 backdrop-blur-xl overflow-y-auto"
        >
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="block px-3 py-3 text-sm text-foreground/80 hover:bg-white/[0.05] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <Button className="w-full bg-brand hover:bg-brand/90 text-white" asChild>
                <a href="#contact">Get Started</a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "bg-[#06060A]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_20px_rgba(0,0,0,0.4)]" : "bg-transparent border-b border-transparent"}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-[60px]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
            <AgentiksLogo className="w-5 h-5" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Agentiks</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" asChild className="bg-brand hover:bg-brand-dark text-white border-0">
            <a href="#contact" className="font-mono text-xs tracking-wide">
              Get Started
            </a>
          </Button>
          <button
            className="md:hidden text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </nav>
  )
}
