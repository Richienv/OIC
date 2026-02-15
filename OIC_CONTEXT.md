# OIC — Open Intelligence Companion
## Complete Project Context for Claude Code

> Give this entire document to Claude Code as context when working on the OIC project.
> Last updated: February 15, 2026

---

## 1. WHAT IS OIC?

OIC (pronounced "Oh I See") stands for **Open Intelligence Companion**. It is a physical AI desk robot + WhatsApp bot product for Indonesian small businesses (UMKM).

**The product:** A cute robot (Stack-chan or XiaoZhi ESP32) sits on the client's desk. It has a camera, microphone, speaker, and screen. It connects via WiFi to our cloud server, which runs AI models. Clients also get a WhatsApp bot powered by the same AI brain. The robot handles the owner's tasks; WhatsApp handles customer interactions.

**The pitch:** "teman kerja yang nggak pernah tidur" — a coworker that never sleeps.

**Why it's different from chatbots:**
- Physical hardware you can see and touch (not just an app)
- Camera that can see charts, documents, products, faces
- 6 specialized personalities (not one generic bot)
- Uses Chinese LLMs that are 10-50x cheaper than GPT/Claude
- Built on open-source (OpenClaw, XiaoZhi, Stack-chan)

---

## 2. BRAND IDENTITY

### Name & Meaning
- **OIC** — Open Intelligence Companion
- Pronounced "Oh I See" — the reaction people have when they first see it work
- Logo: Blue gradient rounded square with two white oval eyes (robot face)
- The eyes = robot that can see and understand your world

### Visual Identity
- **Primary Color:** #0EA5E9 (deep sky blue)
- **Secondary:** #38BDF8 (mid blue)
- **Light:** #7DD3FC (light blue)
- **Dark:** #060B14 (dark navy)
- **White:** #F0F9FF
- **Logo gradient:** linear-gradient(135deg, #0EA5E9, #7DD3FC)

### Typography
- **Headlines:** Playfair Display (italic, weight 700) — editorial, elegant
- **Body:** DM Sans (weights 300-700) — clean, readable
- **Monospace/Data:** DM Mono — numbers, code, technical info

### Dashboard Typography (current implementation)
The dashboard uses the above fonts loaded via Google Fonts import.

### Tone of Voice
- Casual, friendly, but professional
- Bahasa Indonesia natural — NOT Google Translate style
- Like a friend who happens to be a genius
- Relatable, confident, never arrogant
- Tags: casual, friendly, professional, Bahasa natural, relatable, confident

### Tagline
"teman kerja yang nggak pernah tidur."

### Brand Story (Bahasa Indonesia)
OIC lahir dari pertanyaan sederhana: kenapa bisnis kecil di Indonesia belum punya asisten AI?

Bukan karena teknologinya belum ada — tapi karena nggak ada yang bikin versi yang NYATA. Yang bisa dipegang. Yang duduk di meja. Yang punya kepribadian. Yang ngerti bahasa kita.

Kami bangun OIC supaya setiap pemilik bisnis — dari MUA di Jakarta sampai kontraktor di Balikpapan — punya teman kerja AI yang selalu siap. 24 jam. 7 hari. Nggak pernah izin, nggak pernah minta THR.

OIC bukan chatbot. OIC bukan app yang harus kamu buka. OIC adalah robot fisik yang duduk di meja kamu, dengar kamu ngomong, lihat lewat kamera, dan BERTINDAK. Jawab WhatsApp klien jam 3 pagi. Analisis chart pas kamu ragu. Booking jadwal pas kamu sibuk.

Setiap OIC punya "otak" berbeda — resep rahasia yang di-fine-tune untuk industri spesifik. Trader, Beauty, Tender, Toko, Live, Kampus. Bukan satu ukuran untuk semua — tapi spesialis yang NGERTI dunia kamu.

Batch 1 cuma 500 unit. Karena kami percaya lebih baik sempurna untuk 500 orang daripada setengah-setengah untuk 5000.

OIC. Open Intelligence Companion. Teman kerja yang nggak pernah tidur.

### Design References
- rabbit.tech (hardware product vibe)
- teenage.engineering (industrial-playful aesthetic)
- nothing.tech (bold dark branding)
- Artemis & Artemis / artemis1.framer.website (editorial light aesthetic — THIS is the current dashboard style)
- Apple (cinematic scroll, product storytelling)

---

## 3. THE 6 PERSONALITIES

Each OIC unit comes with ONE specialized personality. Each has its own system prompt, knowledge base, and camera capabilities.

| Personality | Icon | Target | What It Does |
|-------------|------|--------|-------------|
| **OIC Trader** | 📈 | Crypto/forex traders | Chart analysis (SMC/ICT), risk management, trade alerts, market scanning via camera |
| **OIC Beauty** | 💄 | MUA, salons, skincare | Booking, follow-up, product recommendations, face scanning via camera, "bestie" tone |
| **OIC Tender** | 🏗️ | Contractors, builders | Document scanning, quote generation, project tracking, procurement |
| **OIC Toko** | 🛒 | Online sellers (Shopee/Tokopedia) | Auto-reply marketplace, shipping calculator, product listing generation, closing |
| **OIC Live** | 🎬 | TikTok/streaming sellers | Live stream co-host, auto-FAQ, flash sales, post-stream DM follow-up |
| **OIC Kampus** | 🎓 | Tutors, course creators | Enrollment, scheduling, student follow-up, curriculum delivery |

---

## 4. TECHNICAL ARCHITECTURE

### 3-Layer System

```
┌─────────────────────────────────────┐
│  LAYER 1 — HARDWARE (On Client Desk)│
│  Stack-chan or XiaoZhi ESP32 robot   │
│  Mic + Speaker + Camera + WiFi      │
│  Captures voice → sends via WebSocket│
│  Receives audio → speaks out loud   │
└──────────────┬──────────────────────┘
               │ WebSocket (wss://)
┌──────────────┴──────────────────────┐
│  LAYER 2 — OUR SERVER (Hostinger VPS)│
│                                      │
│  ┌────────────────────────────────┐  │
│  │  xiaozhi-esp32-server (Python) │  │
│  │  Port 8000                     │  │
│  │  - WebSocket handler           │  │
│  │  - ASR: FunASR (free, local)   │  │
│  │  - TTS: edge-tts (free)        │  │
│  │  - LLM router                  │  │
│  └────────────┬───────────────────┘  │
│               │                      │
│  ┌────────────┴───────────────────┐  │
│  │  OpenClaw Gateway              │  │
│  │  Port 18789                    │  │
│  │  - Browser automation (CDP)    │  │
│  │  - WhatsApp channel            │  │
│  │  - MCP tool server             │  │
│  │  - Skills engine               │  │
│  │  - Persistent memory           │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │  Chromium (headless, isolated) │  │
│  │  Profile: "oic"               │  │
│  │  - Logged-in sessions          │  │
│  │  - CDP port 18792              │  │
│  └────────────────────────────────┘  │
└──────────────┬──────────────────────┘
               │ API calls
┌──────────────┴──────────────────────┐
│  LAYER 3 — AI MODELS (External APIs) │
│  GLM 4.5: $0.35/M input (daily chat)│
│  Kimi K2.5: $0.78/M (vision/camera) │
│  MiniMax M2.5: $0.39/M (backup)     │
└──────────────────────────────────────┘
```

### Hardware → Server Connection

**XiaoZhi:** Connects via WebSocket protocol. Flash firmware with custom WEBSOCKET_URL pointing to our VPS. Robot boots → connects WiFi → opens WebSocket → streams raw audio (PCM/Opus). Server processes and replies.

```
WEBSOCKET_URL = "wss://ourserver.com/xiaozhi/v1/"
```

**Stack-chan (M5Stack CoreS3):** Same as XiaoZhi — flash firmware that connects via WebSocket. CoreS3 has ESP32-S3, fully compatible with xiaozhi-esp32-server.

### Browser Automation (OIC's Own Computer)

OpenClaw runs an isolated Chromium instance on the VPS. NOT the user's personal browser. OIC has its own browser profile with its own logged-in sessions.

```bash
# Start OIC's browser
openclaw browser --browser-profile oic start

# Open a URL
openclaw browser --browser-profile oic open https://twitter.com

# Browser capabilities:
openclaw browser click 12           # click element #12
openclaw browser type 23 "text"     # type into field
openclaw browser fill --field "email:[email protected]"
openclaw browser snapshot            # get page structure
```

Log into accounts (Twitter, Shopee, Tokopedia, etc.) ONCE manually → session persists → OIC can use those accounts autonomously.

### WhatsApp Integration

OpenClaw has native WhatsApp support:
1. Configure WhatsApp channel in OpenClaw dashboard
2. Scan QR code with dedicated WhatsApp number (separate SIM)
3. OIC receives and sends WA messages automatically

The robot on desk = for the OWNER. WhatsApp = for the CUSTOMERS. Same AI brain, two interfaces.

### MCP (Model Context Protocol)

Universal plug system for AI tools. Both XiaoZhi and OpenClaw support MCP natively. Install any MCP tool and OIC gains that capability:
- Browser automation (Playwright)
- Email (send/receive/search)
- Calendar management
- Home Assistant (smart home)
- Database queries
- Web search
- E-commerce APIs
- Trading APIs

### Permission System (3 Tiers)

🟢 **AUTO** — No approval needed:
- Answer WhatsApp messages
- Post content to social media
- Read/analyze data
- Book appointments
- Generate reports

🟡 **NOTIFY** — Does it, tells you:
- Send emails
- Modify schedules
- Update product listings

🔴 **APPROVE** — Asks permission first via WA, waits for "YES":
- Anything involving MONEY
- Deleting data
- Posting to client accounts
- Changing passwords

### Trading Permission Levels (OIC Trader)
1. **Analysis Only** (default) — OIC analyzes, you execute
2. **Paper Trading** — OIC trades on demo account, track 30 days
3. **Auto-Trade with Limits** — Exchange API with hard limits (2% max position, 5 trades/day, -3% kill switch, NO withdrawal permission)
4. **Full Auto** — Only after 90+ days proven track record

---

## 5. TECH STACK

| Component | Technology | Cost |
|-----------|-----------|------|
| VPS | Hostinger KVM 2 | $14/month |
| Backend | xiaozhi-esp32-server (Python) | Free (open-source) |
| Agent Framework | OpenClaw | Free (open-source) |
| LLM (chat) | GLM 4.5 | $0.35/M input tokens |
| LLM (vision) | Kimi K2.5 | $0.78/M input tokens |
| LLM (backup) | MiniMax M2.5 | $0.39/M input tokens |
| STT | FunASR | Free (runs locally) |
| TTS | edge-tts | Free (Microsoft) |
| WhatsApp | OpenClaw self-hosted | Free (QR scan) |
| Browser | Chromium (headless) | Free |
| Hardware (premium) | Stack-chan M5Stack | ~$79/unit |
| Hardware (standard) | XiaoZhi ESP32 | ~$10-25/unit |

### The Secret Recipe (4 Layers of Moat)
- **L1:** Base LLM (GLM/MiniMax/Kimi) — anyone can copy
- **L2:** System Prompt (SECRET) — personality + rules + behavior
- **L3:** Embedded Knowledge (PROPRIETARY) — industry-specific data
- **L4:** Partner Content (LICENSED) — expert strategies/curriculum

Competitors can only copy L1. The real value is L2-L4.

---

## 6. PRICING

| Tier | Implementation | Monthly | Target |
|------|---------------|---------|--------|
| STARTER | Rp 5M | Rp 2M/bln | Solo businesses |
| PROFESSIONAL | Rp 8M | Rp 3.5M/bln | Small teams |
| ENTERPRISE | Rp 15M | Rp 5M/bln | Growing businesses |
| LIVE | Rp 5M | Rp 4M/bln | Live streamers |

### Unit Economics
- Hardware cost: Rp 160-960K per unit
- Cloud/hosting: Rp 80-200K/month per client
- API cost: Rp 30-100K/month per client
- WhatsApp: Rp 0
- **Margin: 90-95% on monthly subscription**

### Partner Revenue Share
70% OIC : 30% Partner. Partners supply content (trading strategies, beauty curriculum, business processes). We embed into personality. They get distribution to our client base.

---

## 7. FINANCIAL MODEL

### Batch 1 — 500 Units (Month 1-8)
- Revenue: Rp 4.9B
- Costs: Rp 815M
- Profit: Rp 4.08B (83%)

### Batch 2 — 2,000 Units (Month 9-18)
- Revenue: Rp 36B
- Costs: Rp 4.1B
- Profit: Rp 31.9B (89%)

### 18-Month Total
- Revenue: Rp 40.9B (~$2.55M USD)
- Costs: Rp 4.9B
- Profit: Rp 36B (~$2.25M USD)
- Margin: 88%
- Total clients: 2,500

### Startup Capital
- ~Rp 275 juta (~$17K USD)
- Break-even: 15 clients
- Self-sustaining: 35 clients
- Target: Rp 100M MRR by Day 90

---

## 8. MARKETING STRATEGY

### Content Formula: 80/15/5
- 80% entertainment (funny robot videos)
- 15% education (use cases, demos)
- 5% conversion (promo + link)

### Seedance 2.0 Viral Strategy
ByteDance AI video tool (launched Feb 12, 2026). Character consistency + motion replication. ~30 min per video. Near-zero cost. Generate OIC robot character doing funny human things.

### "Funny Cat" Formula
Robot does human things when owner isn't watching → acts innocent when caught. 6 concepts: Scroll TikTok, Late Night Snack, Playing Games, Singing in Shower, Fashion Show, Job Interview.

### 10 Juta Challenge (Viral Campaign)
Give OIC Trader 10M IDR. 7 days trading. Max 2% risk. BTC/ETH only. London+NY session. Daily posts including losses. Target result: 10M → 15.3M. DISCLAIMER wajib (mandatory).

### Influencer 3 Tiers
- T1: 50 seed users (free unit, 3 content minimum)
- T2: 10 ambassadors (Rp 5-15M fee)
- T3: 3-5 co-branded limited editions

### Pop-Up Events (Year 1)
- Mall events: Rp 15-25M each
- Streaming events: Rp 30-50M each
- UMKM Day: Rp 10-15M each
- Total Year 1 budget: Rp 255M

---

## 9. HARDWARE & PACKAGING

### Hardware V1
- **Premium:** Stack-chan M5Stack CoreS3 (~$79)
- **Standard:** XiaoZhi ESP32 (~$10-25)
- Strategy: Stack-chan first for quality & branding, XiaoZhi for scale

### Hardware V2 (Future)
- 3.5" touch screen
- 2MP camera
- 3W stereo speakers
- Dual microphone
- 2000mAh battery
- WiFi 6 + BLE
- ESP32-P4 400MHz
- Custom injection mold shell
- Target: $18-25/unit at 2K volume

### Packaging (Rp 60K/unit)
Rigid magnetic box + EVA foam + branded tissue paper + braided USB-C cable + power adapter + anti-slip pad + Quick Start card + personality booklet + warranty card + OIC stickers + thank you card

---

## 10. EXECUTION — 90 DAY PLAN

### Milestones
1. **Day 7:** OpenClaw running + 3 prototypes in hand + first video posted
2. **Day 21:** 7 videos posted + landing page live + 50 leads
3. **Day 42:** 5 pilot clients + team of 3 + supply chain locked
4. **Day 60:** 20 clients + '10 Juta Challenge' viral + Batch 1 ordered
5. **Day 90:** 50 clients + Rp 100M MRR + Batch 1 shipping + team of 4

### Hiring Plan
- Phase 1 (M1-3): 4 people, Rp 23-36M/month
- Phase 2 (M4-8): 8 people, Rp 60-95M/month
- Phase 3 (M9-14): 15 people, Rp 130-200M/month

---

## 11. FUTURE IDEAS

- **Wake Word "Hey OIC"** — V2 local processing on ESP32-P4
- **Multi-OIC Office** — Multiple units coordinate (front desk → routes to sales)
- **OIC Mobile App** — iOS/Android companion: remote control, logs, settings
- **Future Personalities:** Q3: Legal, Klinik | Q4: Properti, Resto | Q1 2027: Dealer, Studio
- **Livestream Co-Host** — TikTok Shop auto-FAQ, flash sales, Twitch chat entertainer

---

## 12. CURRENT PROJECT STATE

### GitHub Repository
**https://github.com/Richienv/OIC.git**

### Project Structure
```
OIC/
├── index.html          # Entry point with OIC favicon
├── package.json        # Vite + React 19
├── vite.config.js      # Vite config with React plugin
├── .gitignore
├── README.md
└── src/
    ├── main.jsx        # React mount point
    ├── App.jsx         # Full dashboard (~990 lines)
    └── storage.js      # localStorage adapter
```

### Tech Stack
- React 19 + Vite 6
- Zero external UI dependencies
- Google Fonts (Playfair Display, DM Sans, DM Mono)
- Persistent storage via localStorage (with fallback to Claude artifact window.storage)

### Dashboard Tabs
1. **Home** — Quick stats, milestones, critical tasks, quick notes, track overview
2. **Tasks** — 40+ tasks across 6 collapsible tracks with priority dots and expandable notes
3. **Arch** — Full architecture documentation in collapsible Q&A format
4. **Memory** — 28 searchable items with category filters
5. **Brand** — Logo, colors, typography, tone, brand story, "Why OIC?" explanation

### Design System (Current Dashboard)
- Mobile-first, single column layout
- Cream background: #F7F3EE
- White cards: #FFFFFF with subtle shadows
- Navy text: #1B2541
- Warm accents: #E8E0D4, #9B917F
- Collapsible accordion sections everywhere
- Bottom tab navigation with 5 tabs
- Priority colors: Red #C0392B, Yellow #C89B2A, Green #2D6A4F
- 14px border-radius on cards
- Safe-area padding for iPhone

### Data Persistence
All data (tasks, notes, milestones) saves to localStorage under key "oic-dash-v4". Data loads on mount, auto-saves on any state change.

---

## 13. QUICK START FOR DEVELOPERS

```bash
# Clone
git clone https://github.com/Richienv/OIC.git
cd OIC

# Install
npm install

# Dev server (hot reload)
npm run dev
# → http://localhost:5173

# Build for production
npm run build
# → outputs to dist/

# Deploy to Vercel
npx vercel
```

---

## 14. WHAT NEEDS TO BE BUILT NEXT

### Immediate (Dashboard Improvements)
- [ ] Break App.jsx into smaller components (TaskList, MemoryBank, ArchView, BrandView, etc.)
- [ ] Add data export/import (JSON backup)
- [ ] Add drag-and-drop task reordering
- [ ] Add due dates to tasks
- [ ] Dark mode toggle
- [ ] PWA manifest for "Add to Home Screen"

### Landing Page (Separate Project)
- [ ] Marketing landing page at oic.id or getoic.com
- [ ] Refs: rabbit.tech, nothing.tech, Artemis
- [ ] Sections: Hero, Problem, Solution, Demo video, Personalities, Pricing, Lead capture
- [ ] Lead form: nama, WA number, kota, bisnis type, personality interest

### Technical Infrastructure
- [ ] Set up Hostinger VPS with Docker
- [ ] Deploy xiaozhi-esp32-server
- [ ] Deploy OpenClaw Gateway
- [ ] Configure GLM 4.5 API
- [ ] Build system prompts for each personality
- [ ] WhatsApp bot setup

---

## 15. IMPORTANT CONTEXT & DECISIONS

- The founder is based in Indonesia (currently in China area with access to Shenzhen/Huaqiangbei for hardware sourcing)
- All customer-facing content should be in Bahasa Indonesia
- The dashboard is a personal project management tool, NOT a customer-facing product
- Chinese LLMs chosen specifically for cost advantage (10-50x cheaper) AND good Bahasa Indonesia support
- Open-source stack (OpenClaw, XiaoZhi) chosen for control and zero licensing cost
- Physical hardware is the KEY differentiator — this is NOT just another chatbot SaaS
- The camera/vision capability is the WOW factor that sells the product
- Batch 1 is intentionally limited to 500 units for quality control and FOMO
- Domain options: oic.ai, getoic.com, oic.id
- Social handles: @oic.ai or @getoic on IG/TikTok

---

*This document contains ALL decisions, data, and context from the OIC project planning sessions. Use it as the source of truth when building.*
