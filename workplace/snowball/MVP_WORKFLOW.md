# Snowball / Renovation Marketing Pros - MVP Workflow
## Agentiks.dev - Agentic Automation System

**Client:** Etka Kaya - Snowball Ventures / Renovation Marketing Pros (construction B2B)
**Date:** March 23, 2026
**MVP Scope:** 20 brand ambassadors in Virginia (DMV area)
**Goal:** 40% labor reduction in lead follow-up process
**Channels:** Email + WhatsApp

> Visual version: `workflow.html` (send to client)

---

## Current State (Manual)

```
Ambassador visits company → Collects business card → Manually enters into Monday CRM
                                                    → Manually sends follow-up email
                                                    → Manually sends WhatsApp message
                                                    → Manager manually checks compliance
                                                    → Repeat for 100+ cards/month
                                                    → 800 cards sitting in a binder unprocessed
```

**Pain:** Follow-up is 80% of closing success, but manual process can't scale past 60 ambassadors.

---

## MVP System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        AGENTIKS MVP SYSTEM                              │
│                                                                         │
│  ┌──────────────┐    ┌──────────────────┐    ┌───────────────────────┐  │
│  │  1. INTAKE    │───▶│  2. AI PROCESSING │───▶│  3. AUTOMATED ACTION  │  │
│  │   PIPELINE    │    │     ENGINE        │    │  ENGINE (Email + WA)  │  │
│  └──────────────┘    └──────────────────┘    └───────────────────────┘  │
│         │                     │                         │               │
│         ▼                     ▼                         ▼               │
│  ┌──────────────┐    ┌──────────────────┐    ┌───────────────────────┐  │
│  │  Monday CRM   │◀──│  Lead Ranking     │──▶│  Email + WhatsApp     │  │
│  │  (existing)   │   │  Agent            │   │  Follow-Up Sequences  │  │
│  └──────────────┘    └──────────────────┘    └───────────────────────┘  │
│                                                         │               │
│                                              ┌───────────────────────┐  │
│                                              │  4. DASHBOARD &       │  │
│                                              │     REPORTING         │  │
│                                              └───────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## End-to-End Flow (Detailed)

### Phase 1: Business Card Intake Pipeline

```
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  AMBASSADOR      │     │  UPLOAD ENDPOINT  │     │  VISION AI (OCR) │
│  photographs     │────▶│  (Vercel Function)│────▶│  (AI Gateway)    │
│  business card   │     │                  │     │                  │
│  via mobile web  │     │  Accepts image   │     │  Extracts:       │
│  form            │     │  + ambassador ID │     │  - Name           │
│                  │     │  + notes         │     │  - Company        │
└─────────────────┘     └──────────────────┘     │  - Title          │
                                                  │  - Phone          │
                                                  │  - Email          │
                                                  │  - Address        │
                                                  └────────┬─────────┘
                                                           │
                                                           ▼
                              ┌──────────────────────────────────────┐
                              │  MONDAY CRM (via Monday API)         │
                              │                                      │
                              │  Auto-creates lead item:             │
                              │  - Contact fields populated          │
                              │  - Ambassador assigned               │
                              │  - Source: "Business Card Scan"      │
                              │  - Date captured                     │
                              │  - Original image attached           │
                              │  - Ambassador notes attached         │
                              └──────────────────────────────────────┘
```

**Backfill:** Bulk-scan existing 800 business cards from binder → PDF → batch OCR → Monday import.

---

### Phase 2: AI Lead Ranking Engine

```
┌──────────────────┐     ┌────────────────────────┐     ┌──────────────────┐
│  MONDAY CRM      │     │  RANKING AGENT          │     │  MONDAY CRM      │
│  (Trigger:       │────▶│  (AI Gateway + Claude)  │────▶│  (Updated)       │
│  new lead added  │     │                         │     │                  │
│  OR notes updated│     │  Analyzes:              │     │  Lead now has:   │
│  OR scheduled    │     │  - Ambassador notes     │     │  - Rank score    │
│  daily batch)    │     │  - Company size/type    │     │  - Priority tier │
│                  │     │  - Industry fit         │     │  - Next action   │
└──────────────────┘     │  - Decision-maker?      │     │  - Follow-up     │
                          │  - Engagement signals   │     │    schedule set  │
                          │                         │     │  - Channel pref  │
                          │  Outputs:               │     │    (email/WA)    │
                          │  - Critical / High /    │     └──────────────────┘
                          │    Medium / Low rank    │
                          │  - Confidence score     │
                          │  - Recommended next     │
                          │    action               │
                          │  - Suggested follow-up  │
                          │    cadence + channel    │
                          └────────────────────────┘
```

**Client's existing ranking system** (critical/high/medium/low by revenue potential) is fed to the AI as context so it learns their scoring criteria.

---

### Phase 3: Automated Follow-Up Engine (Email + WhatsApp)

```
┌──────────────────┐     ┌────────────────────────┐     ┌──────────────────┐
│  WORKFLOW TRIGGER │     │  MESSAGE GENERATION     │     │  DELIVERY         │
│                  │     │  AGENT                  │     │                  │
│  Based on rank:  │     │  (AI Gateway + Claude)  │     │  EMAIL:          │
│                  │     │                         │     │  Resend API      │
│  EMAIL CADENCE:  │     │  Generates personalized │     │  - Custom domain │
│  CRITICAL:       │────▶│  follow-ups using:       │────▶│  - Open tracking │
│  Day 1,3,7,14   │     │                         │     │  - Click tracking│
│  HIGH:           │     │  - Lead's business info │     │                  │
│  Day 1,5,14,30  │     │  - Ambassador's notes   │     │  WHATSAPP:       │
│  MEDIUM:         │     │  - Previous touchpoints │     │  WhatsApp Biz API│
│  Day 3,14,30    │     │  - Client's email/WA    │     │  - Read receipts │
│  LOW:            │     │    examples (trained)   │     │  - Reply tracking│
│  Day 7,30       │     │  - "Human touch" tone   │     │                  │
│                  │     │                         │     └──────────────────┘
│  WHATSAPP:       │     │  Adapts message for     │               │
│  CRITICAL:       │     │  channel (formal email  │               ▼
│  Day 1,5,10     │     │  vs conversational WA)  │     ┌──────────────────┐
│  HIGH:           │     │                         │     │  MONDAY CRM      │
│  Day 2,10       │     │  Maintains client's     │     │  (Status Update)  │
│  MEDIUM:         │     │  voice and branding     │     │                  │
│  Day 7           │     │                         │     │  - Message sent  │
│                  │     └────────────────────────┘     │  - Open/read     │
└──────────────────┘                                     │  - Reply events  │
                                                         │  - Auto-upgrade  │
                                                         │    lead rank on  │
                                                         │    engagement    │
                                                         └──────────────────┘
```

**Training:** Client provides example follow-up emails and WhatsApp messages to fine-tune the AI's writing style per channel.

---

### Phase 4: Dashboard & Reporting

```
┌────────────────────────────────────────────────────────────────┐
│  ADMIN DASHBOARD (Next.js on Vercel)                           │
│                                                                │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────────┐ │
│  │ Lead Pipeline│  │ Follow-Up   │  │ Ambassador Performance │ │
│  │             │  │ Status      │  │                        │ │
│  │ Critical: 12│  │ Emails: 340 │  │ Cards submitted: 23   │ │
│  │ High:     28│  │ WhatsApp: 95│  │ Appts booked: 4       │ │
│  │ Medium:   45│  │ Opened: 210 │  │ Avg response: 2.1 days│ │
│  │ Low:      67│  │ Replied: 38 │  │                        │ │
│  │             │  │ WA Read: 82 │  │ Top: Sarah K. (VA)     │ │
│  └─────────────┘  └─────────────┘  └────────────────────────┘ │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Recent Activity Feed                                    │   │
│  │ - [2min ago] New card scanned by Mike T. → ACME Corp   │   │
│  │ - [1hr ago]  Follow-up email #2 sent to BuildRight LLC │   │
│  │ - [2hr ago]  WhatsApp reply from Metro Construction     │   │
│  │ - [5hr ago]  Lead upgraded: Apex Builders → CRITICAL   │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
```

---

## System Interaction Map

```
                    ┌───────────────┐
                    │  AMBASSADORS  │
                    │  (20 in VA)   │
                    └───────┬───────┘
                            │ Photo upload (mobile web)
                            ▼
┌───────────────────────────────────────────────────────────┐
│                   VERCEL PLATFORM                          │
│                                                           │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │ Next.js App  │  │ Vercel       │  │ Vercel Workflow  │  │
│  │ (Dashboard + │  │ Functions    │  │ DevKit           │  │
│  │  Upload UI)  │  │ (API routes) │  │ (Follow-up       │  │
│  │             │  │              │  │  sequences)      │  │
│  └──────┬──────┘  └──────┬───────┘  └────────┬────────┘  │
│         │                │                    │           │
│         └────────────────┼────────────────────┘           │
│                          │                                │
│                   ┌──────▼───────┐                        │
│                   │ AI Gateway   │                        │
│                   │ (Claude)     │                        │
│                   │              │                        │
│                   │ - OCR        │                        │
│                   │ - Ranking    │                        │
│                   │ - Email gen  │                        │
│                   │ - WA msg gen │                        │
│                   └──────────────┘                        │
└──────────┬──────────────────┬──────────────┬─────────────┘
           │                  │              │
   ┌───────▼───────┐  ┌──────▼──────┐  ┌────▼────────────┐
   │  MONDAY.COM   │  │   RESEND    │  │  WHATSAPP       │
   │  CRM (API)    │  │ (Email API) │  │  BUSINESS API   │
   │               │  │             │  │                 │
   │  - Leads      │  │  - Send     │  │  - Send msgs   │
   │  - Contacts   │  │  - Track    │  │  - Read receipt │
   │  - Notes      │  │  - Analytics│  │  - Reply track  │
   │  - Rankings   │  │             │  │                 │
   └───────────────┘  └─────────────┘  └─────────────────┘
```

---

## Monthly Cost Estimate (MVP - 20 Ambassadors, ~100 leads/mo)

| Service | Tier | Monthly Cost | Notes |
|---------|------|-------------|-------|
| **Vercel Pro** | Pro plan | $20 | Hosting, functions, workflow |
| **AI Gateway** (Claude Sonnet) | Pay-per-use | $30-50 | OCR + ranking + email/WA generation |
| **Resend** | Pro | $20 | Up to 50k emails/mo, custom domain, tracking |
| **WhatsApp Business API** | Pay-per-conversation | $25-50 | ~100-200 conversations/mo |
| **Monday.com** | Already paid by client | $0 | API usage included in their plan |
| **Vercel Blob** | Included in Pro | $0 | Business card image storage |
| | | | |
| **TOTAL RECURRING** | | **$95-140/mo** | |

### One-Time Costs

| Item | Estimated Cost | Notes |
|------|---------------|-------|
| **Business card scanner** (for 800 backfill) | $0-100 (hardware) | Or use phone scan app to PDF |
| **Backfill OCR processing** (800 cards) | ~$5 | One-time AI Gateway usage |
| **WhatsApp Business verification** | Included | Setup and verification of business number |
| **Development** (Agentiks.dev) | Per agreement | Build + 1-month trial |

### Cost at Scale (100-150 ambassadors, ~500+ leads/mo)

| Service | Monthly Cost |
|---------|-------------|
| Vercel Pro | $20 |
| AI Gateway | $150-250 |
| Resend | $20-50 |
| WhatsApp Business API | $60-100 |
| **TOTAL** | **$250-420/mo** |

---

## Follow-Up Cadence by Rank

| Rank | Email | WhatsApp |
|------|-------|----------|
| **Critical** | Day 1, 3, 7, 14 | Day 1, 5, 10 |
| **High** | Day 1, 5, 14, 30 | Day 2, 10 |
| **Medium** | Day 3, 14, 30 | Day 7 |
| **Low** | Day 7, 30 | -- |

---

## Data Flow Summary

```
INPUT                    PROCESSING                 OUTPUT
─────                    ──────────                 ──────

Business card photo  ──▶ Vision AI OCR          ──▶ Monday CRM lead record
Ambassador notes     ──▶ Lead Ranking Agent     ──▶ Priority score + next action + channel
Lead rank + context  ──▶ Email Generation Agent ──▶ Personalized follow-up email
Lead rank + context  ──▶ WA Message Agent       ──▶ Personalized WhatsApp message
Engagement events    ──▶ Re-ranking logic       ──▶ Updated lead score
All activity         ──▶ Aggregation            ──▶ Dashboard metrics
```

---

## MVP Rollout Plan

| Phase | What | When |
|-------|------|------|
| **Week 1** | NDA signed, requirements doc finalized, Monday CRM access granted, example emails/WA provided | After client delivers requirements |
| **Week 2** | Business card OCR pipeline + Monday integration + WhatsApp Business API setup | Development sprint |
| **Week 3** | Lead ranking agent + email/WhatsApp follow-up engine built, AI trained on client voice | Development sprint |
| **Week 4** | Dashboard, testing with VA ambassadors, backfill 800 cards | Testing + launch |
| **Month 2** | 1-month trial period - client tests, requests tweaks, system learns | Trial / iteration |
| **Month 3+** | Expand to other states, onboard remaining 40+ ambassadors | Scale |

---

## What's in MVP

- Business card photo upload (mobile)
- Vision AI text extraction (OCR)
- Monday CRM auto-sync
- AI lead ranking (critical/high/med/low)
- Automated email follow-up sequences
- Automated WhatsApp follow-up messages
- Engagement tracking (opens, replies, read receipts)
- Real-time dashboard & reporting
- Backfill existing 800 business cards
- 1-month trial & iteration period

## Future Phases

- Expand to all 10 states (40+ ambassadors)
- Online marketing automation (Meta/Google ads - Jamal returning May 2026)
- Internal WhatsApp group automation
- Website revamp (offered as care package)
- Ambassador performance gamification
- Externalize to Snowball Ventures parent
- Client self-service portal

---

## Key Assumptions (Pending Client Requirements Doc)

1. Monday CRM API access is available on their plan
2. Client will provide example follow-up emails AND WhatsApp messages for AI training
3. Follow-up emails sent from client's domain (need DNS access for Resend)
4. WhatsApp Business account can be set up under client's business number
5. Ambassadors have smartphones for card photo upload
6. Client's criticality ranking criteria can be documented as rules for the AI
7. Email + WhatsApp follow-up cadence to be confirmed by client

---

## What We Need From Client

1. **Requirements document** - DMV area processes, organized by priority (due within 1 week)
2. **Example emails + WhatsApp messages** - 5-10 real follow-ups to train AI voice
3. **Monday CRM admin access** - integrate the lead pipeline
4. **Signed NDA** - proceed with full system access
