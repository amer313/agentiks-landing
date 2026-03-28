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
          className="fixed inset-0 top-[64px] z-50 bg-[#0A0A0A]/98 backdrop-blur-xl overflow-y-auto"
        >
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="block px-4 py-3.5 text-sm text-foreground/80 hover:text-foreground hover:bg-brand/[0.06] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <Button className="w-full bg-brand hover:bg-brand-dark text-white" asChild>
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/85 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      {/* Subtle brand accent line on scroll */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 bg-gradient-to-r from-transparent via-brand/30 to-transparent ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <AgentiksLogo className="w-7 h-7 text-brand transition-colors group-hover:text-brand-light" />
          <span className="font-semibold text-lg tracking-tight">Agentiks</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm text-muted-foreground hover:text-foreground transition-colors font-medium py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-brand/50 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" asChild className="bg-brand hover:bg-brand-dark text-white border-0 shadow-[0_0_12px_rgba(220,38,38,0.15)]">
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
