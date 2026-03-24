import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Agentiks — AI-Powered Digital Marketing Agency",
  description: "We build AI-driven marketing strategies that grow renovation and home services businesses. Data-backed campaigns, stunning websites, and measurable results.",
  openGraph: {
    title: "Agentiks — AI-Powered Digital Marketing Agency",
    description: "AI-driven marketing strategies that grow renovation and home services businesses.",
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
