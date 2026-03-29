"use client"

import { MacbookScroll } from "@/components/ui/macbook-scroll"

/* ── Brand SVG paths (Simple Icons, MIT) — 24×24 viewBox ── */
const BRAND_PATHS: Record<string, string> = {
  Slack: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z",
  Salesforce: "M10.006 5.15a4.07 4.07 0 0 1 3.555-2.1c1.673 0 3.11 1.008 3.742 2.453a4.52 4.52 0 0 1 1.837-.39C21.32 5.113 23.2 7 23.2 9.316c0 .136-.006.27-.02.402A3.27 3.27 0 0 1 24 12.057a3.362 3.362 0 0 1-3.2 3.36 3.37 3.37 0 0 1-.59-.037 4.08 4.08 0 0 1-3.63 2.233 4.04 4.04 0 0 1-1.988-.519 4.65 4.65 0 0 1-4.1 2.472 4.66 4.66 0 0 1-4.3-2.89 3.64 3.64 0 0 1-.516.037A3.64 3.64 0 0 1 2.04 13.08c0-.93.35-1.78.926-2.422A4.16 4.16 0 0 1 2.88 9.6a4.15 4.15 0 0 1 3.06-4.008A4.1 4.1 0 0 1 10.006 5.15z",
  HubSpot: "M18.164 7.93V4.862a2.057 2.057 0 0 0 1.194-1.862 2.074 2.074 0 0 0-2.074-2.074 2.074 2.074 0 0 0-2.073 2.074c0 .82.483 1.53 1.178 1.862v3.068a5.469 5.469 0 0 0-2.562 1.315l-6.76-5.259a2.063 2.063 0 0 0 .054-.46A2.074 2.074 0 0 0 5.047 1.45 2.074 2.074 0 0 0 2.974 3.525a2.074 2.074 0 0 0 2.073 2.074c.42 0 .81-.13 1.138-.348l6.64 5.17a5.479 5.479 0 0 0-.058 8.086l-2 2a1.67 1.67 0 0 0-.486-.078 1.68 1.68 0 1 0 1.68 1.68c0-.171-.032-.334-.078-.486l1.977-1.977a5.478 5.478 0 1 0 5.204-13.715z",
  Stripe: "M13.976 9.15c-2.217-.098-3.3.72-3.3 1.935 0 .81.577 1.29 1.508 1.29.805 0 1.545-.382 1.792-.975zm3.03 3.633h-2.735l-.025-.755c-.722.832-1.737 1.003-2.593 1.003-1.717 0-3.03-1.057-3.03-2.906 0-2.237 1.644-3.31 4.253-3.31h1.095V6.6c0-.818-.363-1.262-1.497-1.262-.914 0-1.417.27-1.613.985H8.13C8.39 4.24 10.012 3.19 12 3.19c2.387 0 3.735 1.003 3.735 3.406v4.082c0 .72.05 1.5.13 2.105h.14zM22.417 0H1.583C.71 0 0 .71 0 1.583v20.834C0 23.29.71 24 1.583 24h20.834C23.29 24 24 23.29 24 22.417V1.583C24 .71 23.29 0 22.417 0z",
  Gmail: "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
  GitHub: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  Jira: "M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24.013 12.487V1.005A1.005 1.005 0 0 0 23.013 0z",
  Notion: "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.56 2.35c-.42-.326-.98-.7-2.055-.606L3.598 2.86c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.747-.886l-15.177.886c-.56.047-.746.327-.746.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.747 0-.933-.234-1.494-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.234 4.764 7.28v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM2.24 1.486l13.542-1c1.634-.14 2.054-.047 3.082.7l4.25 2.986c.7.513.933.653.933 1.213V21.19c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.046-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V3.12c0-.838.374-1.54 1.215-1.634z",
  Zapier: "M15.977 10.08L19.61 6.44l-2.057-2.05-3.639 3.64V2.41h-2.9v5.63L7.38 4.4 5.32 6.46l3.64 3.637H3.327v2.9H8.95l-3.63 3.63 2.05 2.058 3.645-3.644v5.636h2.9V15.04l3.636 3.636 2.058-2.057-3.633-3.633h5.633v-2.9h-5.632zM12 13.862a1.863 1.863 0 1 1 0-3.726 1.863 1.863 0 0 1 0 3.726z",
  Sheets: "M19.385 2.009H7.162a2.33 2.33 0 0 0-2.33 2.33v15.322a2.33 2.33 0 0 0 2.33 2.33h12.223a2.33 2.33 0 0 0 2.33-2.33V4.339a2.33 2.33 0 0 0-2.33-2.33zM9.5 18.5h-2v-2h2v2zm0-3.5h-2v-2h2v2zm0-3.5h-2V9.5h2v2zm4 7h-2v-2h2v2zm0-3.5h-2v-2h2v2zm0-3.5h-2V9.5h2v2zm4 7h-2v-2h2v2zm0-3.5h-2v-2h2v2zm0-3.5h-2V9.5h2v2z",
  Twilio: "M12 0C5.381 0 0 5.381 0 12s5.381 12 12 12 12-5.381 12-12S18.619 0 12 0zm0 20.25c-4.556 0-8.25-3.694-8.25-8.25S7.444 3.75 12 3.75s8.25 3.694 8.25 8.25-3.694 8.25-8.25 8.25zm3.075-11.325a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0zm-4.65 0a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0zm4.65 4.65a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0zm-4.65 0a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0z",
  Discord: "M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z",
  LinkedIn: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  Shopify: "M20.812 7.13s-.18-.134-.465-.134c-.285 0-3.623.106-3.623.106s-2.59-2.59-2.893-2.893c-.134-.134-.375-.2-.625-.2h-.001L12.3 23.513l7.33-1.588s.078-.015.12-.05c.043-.035.045-.08.045-.08s.6-4.081.6-4.114c.28-1.89.73-4.09.418-8.551zm-5.843-2.165l-1.394 4.334s-1.274-.67-2.826-.67c-2.282 0-2.397 1.432-2.397 1.794 0 1.97 5.124 2.724 5.124 7.335 0 3.628-2.3 5.963-5.402 5.963-3.724 0-5.63-2.316-5.63-2.316l.996-3.292s1.955 1.68 3.605 1.68c1.077 0 1.518-.848 1.518-1.468 0-2.563-4.206-2.676-4.206-6.904 0-3.552 2.55-6.99 7.698-6.99 1.978 0 2.914.565 2.914.565z",
  Zendesk: "M1.009 13.793h9.15V24L1.01 13.793zM1.009 0a5.153 5.153 0 0 0 0 7.237 5.136 5.136 0 0 0 7.227 0 5.137 5.137 0 0 0 0-7.237H1.009zM13.842 24a5.153 5.153 0 0 0 0-7.237 5.136 5.136 0 0 0-7.227 0 5.137 5.137 0 0 0 0 7.237h7.227zM13.842 10.207h9.149V0l-9.149 10.207z",
  Airtable: "M11.992 1.966L2.469 5.941c-.313.13-.312.574.001.703l9.539 3.928c.614.253 1.307.253 1.921 0l9.541-3.929c.313-.129.314-.573.001-.703l-9.523-3.974a2.463 2.463 0 0 0-1.957 0zM13.1 12.898v8.511c0 .349.37.578.682.42l10.011-5.047c.2-.101.326-.306.326-.53V7.741c0-.349-.37-.578-.682-.42L13.426 12.37a.588.588 0 0 0-.326.53zm-2.2 0a.588.588 0 0 0-.326-.529L.566 7.32c-.312-.158-.682.071-.682.42v8.511c0 .224.126.429.326.53l10.008 5.047c.312.158.682-.071.682-.42V12.898z",
}

/* ── Tiny brand icon component ── */
function BrandIcon({ name, size = 12, className = "" }: { name: string; size?: number; className?: string }) {
  const path = BRAND_PATHS[name]
  if (!path) return <div className={className} style={{ width: size, height: size, borderRadius: 2, background: "#333" }} />
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path d={path} fill="currentColor" />
    </svg>
  )
}

/* ── Integration data with brand colors ── */
const INTEGRATIONS = [
  { name: "Slack", color: "#E01E5A", bg: "#4A154B" },
  { name: "Salesforce", color: "#fff", bg: "#00A1E0" },
  { name: "HubSpot", color: "#fff", bg: "#FF7A59" },
  { name: "Stripe", color: "#fff", bg: "#635BFF" },
  { name: "Gmail", color: "#fff", bg: "#EA4335" },
  { name: "GitHub", color: "#fff", bg: "#24292e" },
  { name: "Jira", color: "#fff", bg: "#0052CC" },
  { name: "Notion", color: "#fff", bg: "#191919" },
  { name: "Zapier", color: "#fff", bg: "#FF4A00" },
  { name: "Sheets", color: "#fff", bg: "#0F9D58" },
  { name: "Twilio", color: "#fff", bg: "#F22F46" },
  { name: "Discord", color: "#fff", bg: "#5865F2" },
  { name: "LinkedIn", color: "#fff", bg: "#0A66C2" },
  { name: "Shopify", color: "#fff", bg: "#96BF48" },
  { name: "Zendesk", color: "#fff", bg: "#03363D" },
  { name: "Airtable", color: "#fff", bg: "#18BFFF" },
]

/* ── Dense dashboard screen ── */
function DashboardScreen() {
  return (
    <div className="w-full h-full bg-[#0a0a0c] text-white overflow-hidden select-none text-[7px] font-mono">
      <div className="flex h-full">
        {/* Sidebar — with integration quick-access */}
        <div className="w-[42px] bg-[#0e0e11] border-r border-white/[0.04] flex flex-col items-center py-2 gap-1.5 shrink-0">
          <div className="w-5 h-5 rounded-md bg-brand/20 flex items-center justify-center text-[6px] text-brand font-bold">A</div>
          <div className="w-[18px] h-px bg-white/[0.06]" />
          {["◎", "⊞", "⧉", "⬡", "◈", "⊕"].map((icon, i) => (
            <div key={i} className={`w-5 h-5 rounded flex items-center justify-center text-[8px] ${i === 0 ? "bg-white/[0.06] text-white/60" : "text-white/20"}`}>
              {icon}
            </div>
          ))}
          <div className="w-[18px] h-px bg-white/[0.06] mt-0.5" />
          <div className="text-[4px] text-white/15 uppercase tracking-wider">Apps</div>
          {INTEGRATIONS.slice(0, 5).map((app) => (
            <div key={app.name} className="w-4 h-4 rounded-[3px] flex items-center justify-center shrink-0" style={{ background: app.bg, color: app.color }}>
              <BrandIcon name={app.name} size={10} />
            </div>
          ))}
          <div className="text-[5px] text-white/15">+11</div>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top nav */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.04] bg-[#0c0c0f]">
            <div className="flex items-center gap-3">
              <span className="text-white/50 font-semibold text-[8px]">Agent Operations</span>
              <div className="flex gap-1">
                {["Overview", "Agents", "Integrations", "Workflows", "Logs"].map((tab, i) => (
                  <span key={tab} className={`px-1.5 py-0.5 rounded text-[6px] ${i === 0 ? "bg-white/[0.08] text-white/70" : "text-white/25"}`}>{tab}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <span className="text-white/20 text-[5px]">16 apps</span>
                <div className="flex -space-x-0.5">
                  {INTEGRATIONS.slice(0, 4).map((app) => (
                    <div key={app.name} className="w-2.5 h-2.5 rounded-full border border-[#0c0c0f]" style={{ background: app.bg }} />
                  ))}
                </div>
              </div>
              <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-500/70 text-[6px]">All systems operational</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-2.5 overflow-hidden">
            {/* Metrics */}
            <div className="grid grid-cols-6 gap-1.5 mb-1.5">
              {[
                { label: "Active Agents", val: "16", change: "+3" },
                { label: "Connected Apps", val: "16", change: "+2" },
                { label: "Tasks / 24h", val: "12,847", change: "+847" },
                { label: "Avg Response", val: "0.8s", change: "-0.2s" },
                { label: "Cost Saved", val: "$284k", change: "+$42k" },
                { label: "Error Rate", val: "0.03%", change: "-0.01%" },
              ].map((m) => (
                <div key={m.label} className="bg-white/[0.02] border border-white/[0.04] rounded px-1.5 py-1">
                  <div className="text-white/25 text-[5px] uppercase tracking-wider">{m.label}</div>
                  <div className="text-white/90 text-[10px] font-semibold mt-0.5">{m.val}</div>
                  <div className="text-[5px] mt-0.5 text-green-500/70">{m.change}</div>
                </div>
              ))}
            </div>

            {/* Connected integrations strip */}
            <div className="bg-white/[0.02] border border-white/[0.04] rounded px-2 py-1 mb-1.5 flex items-center gap-2">
              <span className="text-white/20 text-[5px] uppercase tracking-wider shrink-0">Connected</span>
              <div className="flex gap-1.5 flex-1 overflow-hidden">
                {INTEGRATIONS.map((app) => (
                  <div key={app.name} className="flex items-center gap-0.5 shrink-0">
                    <div className="w-3 h-3 rounded-[2px] flex items-center justify-center" style={{ background: app.bg, color: app.color }}>
                      <BrandIcon name={app.name} size={8} />
                    </div>
                    <span className="text-white/30 text-[5px]">{app.name}</span>
                    <span className="w-1 h-1 rounded-full bg-green-500/60" />
                  </div>
                ))}
              </div>
              <span className="text-brand/50 text-[5px] shrink-0">+ Add</span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-[1fr_0.7fr_0.7fr] gap-1.5 h-[calc(100%-72px)]">
              {/* Left — chart + agent table */}
              <div className="flex flex-col gap-1.5">
                {/* Chart */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/30 text-[5px] uppercase tracking-wider">Task Volume — 30d</span>
                    <div className="flex gap-1">
                      {["1D", "7D", "30D", "ALL"].map((t, i) => (
                        <span key={t} className={`text-[5px] px-1 py-px rounded ${i === 2 ? "bg-brand/20 text-brand" : "text-white/20"}`}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <MiniChart />
                </div>

                {/* Agent table with integration sources */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5 flex-1">
                  <div className="text-white/30 text-[5px] uppercase tracking-wider mb-1">Live Agents</div>
                  <div className="grid grid-cols-[1fr_0.7fr_0.5fr_0.3fr_0.3fr] gap-1 text-[5px] text-white/20 uppercase tracking-wider pb-0.5 border-b border-white/[0.04] mb-0.5">
                    <span>Agent</span><span>Status</span><span>Output</span><span>Source</span><span>HP</span>
                  </div>
                  {[
                    { name: "Sales Agent", status: "Scoring leads", output: "3,847", health: 98, src: "HubSpot", srcBg: "#FF7A59" },
                    { name: "Finance Agent", status: "Invoice batch", output: "$2.4M", health: 100, src: "Stripe", srcBg: "#635BFF" },
                    { name: "Support Agent", status: "Routing", output: "238", health: 95, src: "Zendesk", srcBg: "#03363D" },
                    { name: "Marketing", status: "Campaign opt.", output: "+340%", health: 100, src: "LinkedIn", srcBg: "#0A66C2" },
                    { name: "HR Agent", status: "Screening", output: "142", health: 97, src: "Notion", srcBg: "#191919" },
                    { name: "Compliance", status: "SOC2 checks", output: "Pass", health: 100, src: "Jira", srcBg: "#0052CC" },
                    { name: "Data Agent", status: "ETL pipeline", output: "12TB", health: 99, src: "Sheets", srcBg: "#0F9D58" },
                    { name: "Legal Agent", status: "NDA analysis", output: "12", health: 96, src: "Gmail", srcBg: "#EA4335" },
                  ].map((a) => (
                    <div key={a.name} className="grid grid-cols-[1fr_0.7fr_0.5fr_0.3fr_0.3fr] gap-1 py-[3px] border-b border-white/[0.02] items-center">
                      <span className="text-white/60 text-[6px] font-medium flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-green-500/70" />{a.name}
                      </span>
                      <span className="text-white/30 text-[6px]">{a.status}</span>
                      <span className="text-white/50 text-[6px]">{a.output}</span>
                      <div className="flex items-center gap-0.5">
                        <div className="w-2.5 h-2.5 rounded-[1px] flex items-center justify-center" style={{ background: a.srcBg, color: "#fff" }}>
                          <BrandIcon name={a.src} size={6} />
                        </div>
                        <span className="text-white/25 text-[5px]">{a.src}</span>
                      </div>
                      <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full bg-green-500/60" style={{ width: `${a.health}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle — Workflows + Data Flow */}
              <div className="flex flex-col gap-1.5">
                {/* Integration data flow */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5">
                  <div className="text-white/30 text-[5px] uppercase tracking-wider mb-1">Data Flow — Live</div>
                  {[
                    { from: "HubSpot", fromBg: "#FF7A59", to: "Sales Agent", arrow: "→", msg: "1,240 contacts synced", rate: "2.1k/hr" },
                    { from: "Stripe", fromBg: "#635BFF", to: "Finance Agent", arrow: "→", msg: "340 invoices queued", rate: "890/hr" },
                    { from: "Slack", fromBg: "#4A154B", to: "Support Agent", arrow: "↔", msg: "Real-time routing", rate: "24/min" },
                    { from: "Salesforce", fromBg: "#00A1E0", to: "CRM Sync", arrow: "↔", msg: "Bi-directional sync", rate: "500/hr" },
                    { from: "GitHub", fromBg: "#24292e", to: "QA Agent", arrow: "→", msg: "PR checks active", rate: "47/hr" },
                    { from: "Gmail", fromBg: "#EA4335", to: "Legal Agent", arrow: "→", msg: "Contract inbox scan", rate: "12/hr" },
                  ].map((flow, i) => (
                    <div key={i} className="flex items-center gap-1 py-[3px] border-b border-white/[0.02] last:border-none">
                      <div className="w-2.5 h-2.5 rounded-[2px] shrink-0 flex items-center justify-center text-white" style={{ background: flow.fromBg }}>
                        <BrandIcon name={flow.from} size={7} />
                      </div>
                      <span className="text-white/40 text-[5px] w-[32px] shrink-0 truncate">{flow.from}</span>
                      <span className="text-brand/40 text-[6px]">{flow.arrow}</span>
                      <span className="text-white/30 text-[5px] flex-1 truncate">{flow.to}</span>
                      <span className="text-white/15 text-[4px] shrink-0">{flow.rate}</span>
                    </div>
                  ))}
                </div>

                {/* Workflows with integration labels */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5 flex-1">
                  <div className="text-white/30 text-[5px] uppercase tracking-wider mb-1">Active Workflows</div>
                  {[
                    { name: "HubSpot → Score → Route → Salesforce", steps: 4, at: 3, color: "#EF4444", apps: [{ n: "HubSpot", bg: "#FF7A59" }, { n: "Salesforce", bg: "#00A1E0" }] },
                    { name: "Stripe → Parse → Match → Slack notify", steps: 4, at: 4, color: "#10B981", apps: [{ n: "Stripe", bg: "#635BFF" }, { n: "Slack", bg: "#4A154B" }] },
                    { name: "Zendesk → Classify → Route → Resolve", steps: 4, at: 2, color: "#0EA5E9", apps: [{ n: "Zendesk", bg: "#03363D" }] },
                    { name: "LinkedIn → Screen → Score → Notion", steps: 4, at: 4, color: "#A855F7", apps: [{ n: "LinkedIn", bg: "#0A66C2" }, { n: "Notion", bg: "#191919" }] },
                    { name: "Gmail → Extract → Jira → Slack alert", steps: 4, at: 1, color: "#F59E0B", apps: [{ n: "Gmail", bg: "#EA4335" }, { n: "Jira", bg: "#0052CC" }, { n: "Slack", bg: "#4A154B" }] },
                  ].map((wf) => (
                    <div key={wf.name} className="py-1 border-b border-white/[0.03] last:border-none">
                      <div className="flex items-center gap-1 mb-0.5">
                        <div className="flex -space-x-0.5">
                          {wf.apps.map((app, i) => (
                            <div key={i} className="w-2.5 h-2.5 rounded-full border border-[#0a0a0c] flex items-center justify-center text-white" style={{ background: app.bg }}>
                              <BrandIcon name={app.n} size={5} />
                            </div>
                          ))}
                        </div>
                        <span className="text-white/50 text-[5px] truncate">{wf.name}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: wf.steps }).map((_, i) => (
                          <div key={i} className="flex-1 h-[3px] rounded-full" style={{ background: i < wf.at ? wf.color : "rgba(255,255,255,0.04)" }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Activity + Integration Health */}
              <div className="flex flex-col gap-1.5">
                {/* Activity feed with app references */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5 flex-1">
                  <div className="text-white/30 text-[5px] uppercase tracking-wider mb-1">Activity Feed</div>
                  {[
                    { t: "2s", app: "HubSpot", bg: "#FF7A59", e: "HubSpot → Sales Agent scored 127 leads", c: "text-green-500/50" },
                    { t: "8s", app: "Slack", bg: "#4A154B", e: "Slack alert sent → VP notified (VIP)", c: "text-yellow-500/50" },
                    { t: "14s", app: "Stripe", bg: "#635BFF", e: "Stripe webhook → $2.4M batch approved", c: "text-green-500/50" },
                    { t: "45s", app: "Salesforce", bg: "#00A1E0", e: "Salesforce sync → 340 records updated", c: "text-blue-400/50" },
                    { t: "1m", app: "Jira", bg: "#0052CC", e: "Jira → 12 compliance tasks created", c: "text-blue-400/50" },
                    { t: "3m", app: "LinkedIn", bg: "#0A66C2", e: "LinkedIn → 47 candidates imported", c: "text-green-500/50" },
                    { t: "5m", app: "Gmail", bg: "#EA4335", e: "Gmail → 3 NDAs flagged for review", c: "text-yellow-500/50" },
                    { t: "8m", app: "Sheets", bg: "#0F9D58", e: "Sheets → Q3 forecast updated", c: "text-green-500/50" },
                    { t: "12m", app: "Zapier", bg: "#FF4A00", e: "Zapier trigger → onboarding flow started", c: "text-blue-400/50" },
                    { t: "15m", app: "Discord", bg: "#5865F2", e: "Discord bot → dev deploy notification", c: "text-blue-400/50" },
                  ].map((a, i) => (
                    <div key={i} className="flex gap-1 py-[3px] border-b border-white/[0.02] last:border-none items-start">
                      <span className="text-white/15 text-[5px] w-[16px] shrink-0 text-right">{a.t}</span>
                      <div className="w-2.5 h-2.5 rounded-[1px] shrink-0 mt-px flex items-center justify-center text-white" style={{ background: a.bg }}>
                        <BrandIcon name={a.app} size={6} />
                      </div>
                      <span className={`text-[5px] leading-tight ${a.c}`}>{a.e}</span>
                    </div>
                  ))}
                </div>

                {/* Integration health grid */}
                <div className="bg-white/[0.02] border border-white/[0.04] rounded p-1.5">
                  <div className="text-white/30 text-[5px] uppercase tracking-wider mb-1">Integration Health</div>
                  <div className="grid grid-cols-4 gap-1">
                    {INTEGRATIONS.slice(0, 12).map((app) => (
                      <div key={app.name} className="flex flex-col items-center gap-0.5 py-0.5">
                        <div className="w-3.5 h-3.5 rounded-[2px] flex items-center justify-center" style={{ background: app.bg, color: app.color }}>
                          <BrandIcon name={app.name} size={9} />
                        </div>
                        <span className="text-white/20 text-[4px]">{app.name}</span>
                        <span className="w-1 h-1 rounded-full bg-green-500/60" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/[0.03]">
                    <span className="text-white/15 text-[5px]">API calls / 24h</span>
                    <span className="text-white/40 text-[6px] font-semibold">1.2M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/15 text-[5px]">Avg latency</span>
                    <span className="text-green-500/60 text-[6px] font-semibold">142ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/15 text-[5px]">Success rate</span>
                    <span className="text-green-500/60 text-[6px] font-semibold">99.98%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniChart() {
  const points = [20, 25, 28, 35, 32, 45, 42, 52, 48, 55, 58, 62, 65, 70, 68, 75, 78, 82, 80, 85, 88, 90, 87, 92]
  const w = 200
  const h = 40
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * w} ${h - (p / 100) * h}`).join(" ")

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[32px]">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#cg)" />
      <path d={path} fill="none" stroke="#DC2626" strokeWidth="1" strokeLinecap="round" />
      <circle cx={w} cy={h - (92 / 100) * h} r="1.5" fill="#DC2626" />
    </svg>
  )
}

/* ── Main section — Aceternity MacBook lid-opening on scroll ── */
export function DashboardShowcase() {
  return (
    <section className="bg-[#000] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.06),transparent_70%)] pointer-events-none" />
      <MacbookScroll
        title={
          <>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand/70 block mb-4 font-normal">
              Built for your business
            </span>
            Custom agentic solutions.{" "}
            <span className="text-brand">Real results.</span>
          </>
        }
        showGradient={false}
      >
        <DashboardScreen />
      </MacbookScroll>
    </section>
  )
}
