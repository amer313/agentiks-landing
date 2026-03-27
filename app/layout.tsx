import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://agentiks.dev"),
  title: "Agentiks — AI Agent Systems for Every Business",
  description:
    "We design, build, and deploy custom AI agent systems that automate workflows, scale operations, and give your team superpowers. Any industry. Any size.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Agentiks — AI Agent Systems for Every Business",
    description:
      "Custom AI agent systems that automate workflows, scale operations, and give your team superpowers.",
    url: "/",
    siteName: "Agentiks",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentiks — AI Agent Consulting & Development",
    description:
      "Custom AI agent systems that automate workflows, scale operations, and give your team superpowers.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Agentiks",
      url: "https://agentiks.dev",
      email: "team@agentiks.dev",
      description:
        "Custom AI agent systems that automate workflows, scale operations, and give your team superpowers.",
    },
    {
      "@type": "Service",
      provider: { "@type": "Organization", name: "Agentiks" },
      name: "AI Agent Consulting & Development",
      description:
        "End-to-end AI agent systems — strategy, custom development, integration, and ongoing support.",
      url: "https://agentiks.dev",
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
