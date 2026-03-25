import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Agentiks — AI Agent Consulting & Development",
  description: "Agentiks designs and builds custom AI agent systems that automate workflows, scale operations, and give your team superpowers. Any industry. Any size.",
  openGraph: {
    title: "Agentiks — AI Agent Consulting & Development",
    description: "Custom AI agent systems that automate workflows, scale operations, and give your team superpowers.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
