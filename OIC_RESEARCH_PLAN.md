# OIC Research Plan — What We Need to Actually Build This

> Status: PLANNING → This document tracks what we KNOW vs what we're GUESSING.
> When each section is researched, mark it ✅ and add findings.

---

## THE PROBLEM

We have a great business plan, but it's built on assumptions. Before spending Rp 275M+ and months of effort, we need to validate the critical unknowns. This document lists every research task needed to turn the plan into a firm build guide.

**Rule: No building until the research is done. Research is cheaper than mistakes.**

---

## PHASE 1 — HARDWARE VALIDATION (Week 1-2)
*Priority: CRITICAL — everything depends on this working*

### 1.1 — Buy & Test Actual Hardware

**What we're guessing:** Stack-chan and XiaoZhi work well, are easy to configure, and customers will like them.

**What you need to do:**
- [ ] Order 1x XiaoZhi dev board from Taobao (~$15-25)
  - Which exact model? (there are 10+ variants)
  - Document: exact Taobao link, seller rating, shipping time to your location
  - Take unboxing photos/video
- [ ] Order 1x M5Stack CoreS3 for Stack-chan (~$40-50 for board only)
  - Document: where bought, which variant
  - Do you need the full Stack-chan shell kit or just the board?
- [ ] Order 1x Stack-chan shell (3D printed or kit)
  - Source: Taobao? M5Stack official? 3D print service?

**Data to collect after receiving:**
- [ ] Physical dimensions (mm) and weight (g) of each unit
- [ ] Photos from every angle (for packaging design)
- [ ] Speaker volume test — is it loud enough for a desk? For a shop?
- [ ] Microphone quality — record yourself talking at 1m, 2m, 3m distance
- [ ] Camera quality — take photos of: a document, a face, a product, a chart
- [ ] Screen brightness — readable in bright office lighting?
- [ ] WiFi range — does it work from across a typical Indonesian shop/office?
- [ ] Build quality feel — does it feel like a Rp 5M+ product or a toy?
- [ ] How long does battery last? (XiaoZhi) / Does CoreS3 need constant USB power?
- [ ] Heat — does it get hot after running 1 hour? 4 hours? 8 hours?

**CRITICAL QUESTION:** Which hardware do we actually ship for Batch 1?
Decision needed BEFORE anything else.

---

### 1.2 — Firmware Flashing & Connection Test

**What we're guessing:** We can easily flash custom firmware and connect to our own server.

**What you need to do:**
- [ ] Flash XiaoZhi with default firmware → connect to official xiaozhi.me server
  - Document: exact steps, any problems encountered
  - Test: speak to it in Bahasa Indonesia → does it understand?
  - Test: speak in English → how does it respond?
- [ ] Flash XiaoZhi with CUSTOM WebSocket URL (pointing to your own server)
  - Document: which tools needed (ESP-IDF? M5Burner? ESP-Launchpad web tool?)
  - How long did the whole process take?
  - Any errors? How did you fix them?
- [ ] Same tests for Stack-chan/CoreS3
- [ ] Camera test on XiaoZhi:
  - Hold a trading chart in front → send photo → does server receive it?
  - Hold a document → can it be read?
  - Hold a product → clear enough for listing photo?

**Data to provide me:**
- Screenshot of successful WebSocket connection log
- Audio recording of robot speaking Bahasa Indonesia
- Photo taken by the robot's camera (so we know actual quality)
- List of every tool/software needed to flash firmware
- Time log: how long each step took

---

### 1.3 — Shell & Enclosure Research (Shenzhen/Huaqiangbei)

**What we're guessing:** Custom shells cost <$12/unit at 500 qty.

**What you need to do (when you visit Huaqiangbei):**
- [ ] Visit 3-5 shell/enclosure suppliers
  - Collect: business cards, WeChat contacts, MOQ, price per unit at 100/500/1000/2000
  - Ask: can they do custom colors? Custom logo embossing? What's the tooling cost?
  - Ask: lead time from order to delivery?
  - Take photos of sample shells that could fit our boards
- [ ] Visit 3 packaging suppliers
  - Rigid box samples (magnetic closure)
  - EVA foam cutting service
  - Quote for 500 units of complete package
- [ ] Visit cable/accessory suppliers
  - Braided USB-C cables (with OIC branding possible?)
  - Power adapters (Indonesian plug type C/F)
- [ ] Get 3D printing service quotes for prototype shells
  - 猪八戒 (zhubajie.com) for design: get 3 quotes
  - Local Shenzhen 3D print shops for rapid prototyping

**Data to provide me:**
- Spreadsheet: supplier name, contact, MOQ, unit price at each quantity, lead time
- Photos of all shell samples
- Total BOM (Bill of Materials) cost per unit at 500 qty

---

## PHASE 2 — SOFTWARE VALIDATION (Week 1-2, parallel with hardware)
*Priority: CRITICAL — can we actually make it work?*

### 2.1 — Deploy xiaozhi-esp32-server

**What we're guessing:** It deploys easily on a $14/mo VPS and handles our load.

**What you need to do:**
- [ ] Buy Hostinger VPS KVM 2 ($14/mo)
  - Which data center location? (Singapore for lowest latency to Indonesia)
  - Document: exact specs you get (RAM, CPU, storage, bandwidth)
- [ ] SSH in and deploy xiaozhi-esp32-server via Docker
  - Follow: https://github.com/xinnan-tech/xiaozhi-esp32-server
  - Document: every command you run, every error you hit
  - Time it: how long from zero to working?
- [ ] Configure with FREE components first:
  - ASR: FunASR (local, free) — does it work with Bahasa Indonesia?
  - TTS: edge-tts (free) — what Bahasa Indonesian voice options exist?
  - LLM: GLM 4.5 API — sign up, get key, configure
- [ ] Test end-to-end:
  - XiaoZhi/Stack-chan connects to YOUR VPS
  - Speak Bahasa Indonesia → get intelligent reply in Bahasa
  - Measure: latency from speaking to hearing reply (seconds)
  - Test: 10 different questions across different topics

**CRITICAL DATA NEEDED:**
- [ ] Latency measurements (this determines user experience):
  - Time from end of speech to start of reply audio
  - Break it down: STT time + LLM time + TTS time
  - Test at different times of day (morning, evening, peak)
- [ ] Resource usage on VPS:
  - CPU % when idle vs when processing
  - RAM usage
  - Can it handle 2 simultaneous conversations? 5? 10?
- [ ] Cost tracking:
  - How many API tokens per typical conversation? (track for 50 conversations)
  - Monthly API cost estimate per client based on real usage

---

### 2.2 — Chinese LLM Quality Testing (Bahasa Indonesia)

**What we're guessing:** Chinese LLMs work well with Bahasa Indonesia.

**What you need to test (50+ conversations per LLM):**
- [ ] GLM 4.5 — Sign up at bigmodel.cn
  - Test: everyday Bahasa conversations (natural? or stiff?)
  - Test: industry-specific queries (trading jargon, beauty terms, construction terms)
  - Test: switching between Bahasa and English mid-conversation
  - Test: handling Indonesian slang (gak, bgt, dong, sih, loh)
  - Rate: 1-10 on naturalness for each test
- [ ] MiniMax M2.5 — Sign up at minimax.chat
  - Same tests as above
- [ ] Kimi K2.5 — Sign up at kimi.moonshot.cn
  - Same tests PLUS vision:
  - Send photo of trading chart → quality of analysis?
  - Send photo of product → quality of description generated?
  - Send photo of document → accuracy of text extraction?
- [ ] DeepSeek V3/R1 — as comparison baseline
  - Same tests

**Data to provide me:**
- Spreadsheet with all test results, ratings, and example responses
- Winner for each use case (chat, vision, slang handling, speed)
- API pricing confirmation (prices may have changed)
- Any rate limits or geographic restrictions you hit

---

### 2.3 — OpenClaw Deployment & Testing

**What we're guessing:** OpenClaw works for browser automation and WhatsApp.

**What you need to do:**
- [ ] Install OpenClaw on same VPS (or separate one if resources are tight)
  - Follow: https://docs.openclaw.ai
  - Document: installation process, any issues
- [ ] Test WhatsApp integration:
  - Scan QR with test SIM card
  - Send message from another phone → does bot reply?
  - Send voice message → does it transcribe and reply?
  - Send image → does it process?
  - Measure: response latency
  - Test: what happens if WhatsApp disconnects? Auto-reconnect?
  - Test: run for 24 hours straight — any drops?
- [ ] Test browser automation:
  - Start managed browser profile
  - Log into a test Twitter account
  - Automate a tweet via command
  - Log into Tokopedia → navigate to a product → screenshot
  - Test: can it handle Indonesian captchas/verification?
- [ ] Test OpenClaw + xiaozhi-server integration:
  - Can they run on the same VPS?
  - How do they communicate?
  - Can a voice command to the robot trigger a browser action?

---

### 2.4 — System Prompt Development

**What we're guessing:** We can write system prompts that make OIC feel like a specialist.

**What you need to provide me (for EACH personality):**

**OIC Trader:**
- [ ] What trading methodology? (SMC? ICT? Price Action? Wave?)
- [ ] What markets? (Crypto only? Forex? Stocks?)
- [ ] What exchanges popular in Indonesia? (Tokocrypto? Binance? Indodax?)
- [ ] Find 3-5 Indonesian trading Telegram groups → what language/style do traders use?
- [ ] Screenshot 10 typical trading conversations → what questions do traders ask?
- [ ] What are the legal requirements for giving trading advice in Indonesia?

**OIC Beauty:**
- [ ] Visit 3 MUA/salon Instagram accounts → what questions do customers ask?
- [ ] Screenshot 10 typical DM conversations between MUA and client
- [ ] What booking systems do Indonesian beauty businesses use?
- [ ] What are popular product brands they recommend?
- [ ] What's the typical customer journey? (inquiry → booking → service → follow-up)

**OIC Toko:**
- [ ] What marketplaces? (Shopee, Tokopedia, Bukalapak, TikTok Shop?)
- [ ] Screenshot 10 typical buyer questions on marketplace chat
- [ ] What shipping providers? (JNE, J&T, SiCepat, Anteraja?)
- [ ] What's the typical response time expectation?
- [ ] What auto-reply features do marketplaces already have?

**OIC Tender:**
- [ ] What documents do contractors deal with daily?
- [ ] What's the quotation/RAB process?
- [ ] What software do they currently use? (Excel? Manual?)
- [ ] What are the biggest pain points?

**OIC Live:**
- [ ] How do Indonesian TikTok Live sellers currently manage chat?
- [ ] What are the top-selling categories on TikTok Shop Indonesia?
- [ ] What tools do they use for live streaming?

**OIC Kampus:**
- [ ] What type of courses? (Trading? Business? Beauty? Tech?)
- [ ] How do course creators currently handle enrollment?
- [ ] What platforms? (WhatsApp groups? Telegram? Custom LMS?)

---

## PHASE 3 — COMPETITOR DEEP DIVE (Week 2-3)
*Priority: HIGH — know what already exists*

### 3.1 — Direct Competitors in Indonesia

**Research each. For each, document:**
- What exactly they sell
- Pricing
- How many clients (check social media followers, reviews)
- What technology they use
- Their biggest weakness
- Screenshots of their product/marketing

**Companies to research:**
- [ ] Kata.ai — Indonesia's biggest chatbot company ($11.4M revenue)
- [ ] Mekari Qontak — CRM + WhatsApp automation
- [ ] ChatWoot — open-source WA bot platform
- [ ] Wootric / SleekFlow — WA business tools
- [ ] Any other "AI assistant" services targeting Indonesian UMKM
- [ ] Survey: ask 5 small business owners what AI tools they currently use (if any)

### 3.2 — Global AI Hardware Competitors

- [ ] Rabbit R1 — what happened to it? Reviews? Still selling?
- [ ] Humane AI Pin — same questions
- [ ] Friend.com — AI wearable
- [ ] Tab by Brilliant Labs — AI glasses
- [ ] Any Chinese AI hardware products (Baidu, Alibaba voice devices)

**Key question:** Why did hardware AI products fail globally? What can we learn?

### 3.3 — Pricing Validation

- [ ] Survey 10 Indonesian UMKM owners (WA survey):
  - "Would you pay Rp 5M for an AI robot that answers your WhatsApp 24/7?"
  - "What's the maximum monthly fee you'd pay?"
  - "What task takes most of your time that you wish was automated?"
  - "Would you rather have: (a) physical robot, (b) phone app, (c) WhatsApp bot only?"
- [ ] Check: what do Indonesian businesses pay for existing tools?
  - Mekari subscription cost
  - Shopee auto-reply tools cost
  - Virtual assistant services cost (per hour/month)

---

## PHASE 4 — LEGAL & BUSINESS SETUP (Week 3-4)
*Priority: MEDIUM — needed before taking money*

### 4.1 — Business Registration

- [ ] PT (Perseroan Terbatas) requirements for tech company
- [ ] Minimum capital requirements
- [ ] Can a foreigner be involved? (if relevant)
- [ ] Timeline and cost to register
- [ ] NIB (business identification number) process
- [ ] NPWP (tax registration)

### 4.2 — Data Privacy & AI Regulations

- [ ] UU PDP (Undang-Undang Pelindungan Data Pribadi) — Indonesia's data protection law
  - What are our obligations for storing customer chat data?
  - Do we need consent for recording conversations?
  - Where must data be stored? (Indonesian servers required?)
- [ ] OJK regulations (if OIC Trader gives financial advice)
  - Is it legal to provide AI-generated trading analysis?
  - What disclaimers are required?
  - Do we need any financial advisory license?
- [ ] BRTI / Kominfo regulations for AI/chatbot services
- [ ] Terms of Service template needed
- [ ] Privacy Policy template needed

### 4.3 — WhatsApp Business Policy

- [ ] WhatsApp Business API vs self-hosted (QR scan) — legal difference?
- [ ] Can we get banned for using self-hosted WA automation?
- [ ] What's the message volume limit before WA flags the number?
- [ ] WhatsApp Business Platform pricing (if we need to go official)
- [ ] Meta's policy on automated responses

---

## PHASE 5 — SUPPLY CHAIN DOCUMENTATION (Week 4-5)
*Priority: MEDIUM — needed before ordering Batch 1*

### 5.1 — Full BOM (Bill of Materials)

Need exact cost for every component of one shipped unit:

| Component | Supplier | Unit Cost | MOQ | Lead Time |
|-----------|----------|-----------|-----|-----------|
| ESP32 board (which model?) | ? | ? | ? | ? |
| Shell/enclosure | ? | ? | ? | ? |
| USB-C cable (braided) | ? | ? | ? | ? |
| Power adapter (Type C/F) | ? | ? | ? | ? |
| Anti-slip pad | ? | ? | ? | ? |
| Rigid box | ? | ? | ? | ? |
| EVA foam insert | ? | ? | ? | ? |
| Quick Start card (print) | ? | ? | ? | ? |
| Booklet (print) | ? | ? | ? | ? |
| Stickers | ? | ? | ? | ? |
| Tissue paper | ? | ? | ? | ? |
| Thank you card | ? | ? | ? | ? |
| **TOTAL per unit** | | **?** | | |

### 5.2 — Logistics

- [ ] Shipping from Shenzhen to Indonesia warehouse — cost per kg? Per unit?
- [ ] Import duties/taxes on electronics in Indonesia
- [ ] Customs clearance process
- [ ] Indonesian warehouse location (Jakarta? Surabaya?)
- [ ] Last-mile shipping to customers — JNE/J&T pricing for box this size
- [ ] Insurance per unit?

### 5.3 — Quality Control

- [ ] How to test each unit before shipping?
- [ ] What's the expected failure rate?
- [ ] Warranty policy — how long? What's covered?
- [ ] Return/replacement process

---

## PHASE 6 — CONTENT & MARKETING PREP (Week 3-5)
*Priority: MEDIUM — needed before launch*

### 6.1 — Video Content Research

- [ ] Seedance 2.0 — create account, test with OIC robot images
  - Can it animate our blue robot character?
  - Quality of output — good enough for TikTok?
  - Document: exact workflow from idea to posted video
- [ ] Midjourney/AI image gen — generate 20+ OIC character images
  - Different poses, expressions, situations
  - Consistent character across images?
  - Document: best prompts that work
- [ ] Study top 10 viral robot/AI TikToks in Indonesia
  - What format? What hook? What music?
  - Link to each video + view count + what made it work

### 6.2 — Landing Page Content

- [ ] Copywriting in Bahasa Indonesia for each section
- [ ] Product photos/renders needed
- [ ] Demo video script
- [ ] FAQ list (from real questions people ask about AI tools)
- [ ] Social proof strategy (since we have zero customers initially)

---

## WHAT TO DO RIGHT NOW — PRIORITY ORDER

### This Week (Do Immediately):
1. **Order hardware** — 1x XiaoZhi + 1x M5Stack CoreS3 (can't do anything without physical devices)
2. **Buy Hostinger VPS** — deploy xiaozhi-esp32-server in Docker
3. **Sign up for Chinese LLM APIs** — GLM, Kimi, MiniMax (get API keys)
4. **Create Seedance 2.0 account** — test video generation

### Next Week:
5. **Flash firmware** on received hardware → connect to your server
6. **Test end-to-end** — speak to robot → get intelligent Bahasa reply
7. **Test LLMs** — 50+ Bahasa conversations per model, spreadsheet results
8. **Test WhatsApp** — OpenClaw + WA integration on your VPS

### Week 3:
9. **Competitor research** — deep dive on Kata.ai, Mekari, pricing survey
10. **System prompts** — draft first OIC Trader prompt, test extensively
11. **Content creation** — first 5 robot videos via Seedance
12. **Huaqiangbei visit** (if possible) — shell + packaging suppliers

### Week 4-5:
13. **Legal research** — PT registration, data privacy, trading regulations
14. **BOM finalization** — exact cost per unit with real supplier quotes
15. **Landing page** — build and deploy
16. **Pilot outreach** — find first 5 test clients

---

## HOW TO REPORT BACK

For each research task, send me:

1. **Screenshots** — of everything (dashboards, products, conversations, errors)
2. **Numbers** — exact pricing, latency measurements, dimensions, costs
3. **Links** — to products, suppliers, competitors, tools
4. **Problems** — what didn't work, what was harder than expected
5. **Recordings** — audio/video of robot speaking, demos, tests

I'll then compile everything into a firm build guide with exact steps, real costs, and proven architecture.

---

*Don't boil the ocean. Start with Phase 1 & 2 in parallel. The rest can wait until we have a working prototype.*
