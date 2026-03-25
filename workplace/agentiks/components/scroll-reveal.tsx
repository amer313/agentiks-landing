"use client"

import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const fadeBlur: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
}

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
}

const variantMap = {
  "fade-up": fadeUp,
  "fade-blur": fadeBlur,
  "scale-up": scaleUp,
} as const

interface ScrollRevealProps {
  children: React.ReactNode
  variant?: keyof typeof variantMap
  delay?: number
  className?: string
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      variants={variantMap[variant]}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
