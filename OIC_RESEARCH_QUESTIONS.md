# OIC — Research Questions & Expected Answers
## What to ask yourself while researching. What "good" looks like vs "bad."

---

## 1. HARDWARE — "Can I actually get a good robot cheaply?"

### Questions in your head while browsing Taobao/1688:

**Q: Which XiaoZhi model is the one everyone actually uses?**
Expected: The most popular is ESP32-S3 based, with 1.28" round LCD or 2.4" rectangular screen, dual mic, small speaker, optional camera. Search "小智机器人" on Taobao — the ones with 5000+ monthly sales are the proven models. Price should be ¥50-120 for prebuilt. If you're seeing ¥200+, you're looking at premium/niche models. The sweet spot is ¥60-90.

**Q: Does it have a camera? How good is it?**
Expected: Many basic XiaoZhi boards do NOT have a camera. You need to specifically look for boards with OV2640 or OV3660 camera module. If most cheap ones don't have cameras, this is a problem — our vision feature (scan charts, documents, products) is a key selling point. If camera boards are significantly more expensive (2x+), we may need to rethink whether vision is a launch feature or a V2 feature.

**Q: XiaoZhi vs Stack-chan (M5Stack CoreS3) — is the price gap worth it?**
Expected: XiaoZhi ≈ ¥60-100 complete. Stack-chan (CoreS3 + shell) ≈ ¥280-400. That's 3-5x price difference. The quality difference is real — M5Stack has better build, brand recognition, nicer screen — but the question is whether Indonesian UMKM customers care about that or just want it to work. If the answer is "customers won't notice," go XiaoZhi. If you hold both and XiaoZhi feels like a toy, maybe Stack-chan is necessary for the Rp 5M price point.

**Q: Can I get custom shells with our OIC logo?**
Expected: On 1688, many suppliers offer custom injection mold shells but MOQ is usually 1000-3000 units. For Batch 1 (500 units), you'll likely need 3D-printed shells, which are more expensive per unit (¥15-40) but low MOQ. If you can find a seller already making robot shells that fit ESP32 boards, customization (color + logo pad printing) might be ¥5-10 extra per unit at 500 qty.

**Q: What does the total hardware BOM actually look like?**
Expected range per unit at 500 qty:
- ESP32 board: ¥50-80 (~Rp 110-180K)
- Shell: ¥15-40 (~Rp 35-90K)
- USB-C cable: ¥3-5 (~Rp 7-12K)
- Power adapter: ¥5-8 (~Rp 12-18K)
- Packaging (box + foam + cards): ¥15-25 (~Rp 35-55K)
- **Total: ¥88-158 per unit (~Rp 200-350K)**

If total BOM exceeds ¥200 (Rp 450K), margins start getting tight against the Rp 5M implementation fee. If under ¥100 (Rp 225K), margins are excellent.

---

## 2. SOFTWARE — "Do Chinese LLMs actually speak good Bahasa?"

### Questions while testing LLM APIs:

**Q: Does GLM/Kimi/MiniMax handle natural Bahasa Indonesian including slang?**
Expected: DeepSeek and Qwen are generally the best for Bahasa because they have more Southeast Asian training data. GLM might be weaker on slang ("gue", "bgt", "dong"). If a model responds in formal Bahasa ("Saya akan membantu Anda") when you wrote casual ("kak mau nanya dong"), it fails the vibe test. Indonesian customers will feel like they're talking to a stiff corporate bot, not a helpful teman. This is THE critical test.

**Q: Do the APIs work from a Singapore or Indonesian IP?**
Expected: Most Chinese LLM APIs (BigModel, Moonshot, MiniMax) are accessible globally, but some have restrictions or higher latency from outside China. DeepSeek API is generally the most globally accessible. If an API blocks non-China IPs, that's a dealbreaker unless we proxy through a China server (adds latency + complexity + cost). Test by calling the API from a Singapore VPN or directly from an Indonesian IP.

**Q: What's the actual response latency?**
Expected: For voice conversations, total roundtrip needs to be under 3 seconds (STT + LLM + TTS). LLM portion alone should be under 1.5 seconds for first token. From a Singapore VPS to Chinese LLM APIs, expect 200-500ms for first token on fast models (DeepSeek, GLM-4-Flash), 1-3 seconds on larger models (GLM-4, Kimi). If latency exceeds 3 seconds total, the voice experience feels broken — people think the robot is frozen.

**Q: Can the vision models actually analyze a trading chart?**
Expected: Kimi K2.5 and Qwen-VL are the main contenders. Send a candlestick chart screenshot. A good response identifies: timeframe, trend direction, key levels, pattern names. A bad response gives generic "this is a stock chart" without analysis. If vision quality is poor, OIC Trader loses its "camera scans your chart" feature — which is a major selling point.

**Q: What does it actually cost per conversation?**
Expected: A typical 10-turn conversation uses ~2000-4000 tokens. At GLM's $0.35/M input + $0.70/M output, that's roughly $0.002-0.004 per conversation. If a client has 50 conversations/day, that's $0.10-0.20/day or $3-6/month in API costs. Against a Rp 2M/month subscription (~$125), API costs are trivial (<5%). If costs are 10x higher than expected, recalculate.

---

## 3. INFRASTRUCTURE — "Can one VPS handle everything?"

### Questions while setting up server:

**Q: Can xiaozhi-server + OpenClaw + Chromium all run on one KVM 2 VPS?**
Expected: KVM 2 has 2 vCPU + 8GB RAM. xiaozhi-server with FunASR (local speech recognition) needs ~2-3GB RAM. OpenClaw Gateway needs ~1-2GB. Headless Chromium needs ~500MB-1GB per instance. Total: ~4-6GB. This MIGHT fit on KVM 2, but will be tight. If you're running FunASR locally (which eats CPU), you might need KVM 4 (4 vCPU, 16GB RAM, ~$12/mo). If you use cloud ASR APIs instead of local FunASR, KVM 2 should be fine.

**Q: How many concurrent clients can one VPS handle?**
Expected: Each active WebSocket connection (one robot talking) uses minimal resources when idle but spikes during voice processing. Realistically, one KVM 2 can handle 5-10 simultaneous voice conversations. Since not all 500 clients talk at the same time, even with 100 clients, you likely only have 3-5 concurrent at any moment. One VPS should handle Batch 1 (500 clients) comfortably. When you hit 200+ active daily users, start planning for a second server.

**Q: Docker or Kubernetes?**
Expected: For Batch 1 with one VPS — Docker Compose. Period. Kubernetes is overkill until you have 1000+ clients and multiple servers. Docker Compose with 3 services (xiaozhi-server, openclaw, chromium) is simple, debuggable, and cheap. If someone tells you to use Kubernetes at this stage, they're over-engineering. Kubernetes makes sense at Batch 2 (2000 clients, 3+ servers).

**Q: What about redundancy/backup?**
Expected: Hostinger offers weekly auto-backups free. For Batch 1, that's fine. Daily backups are an extra $2-4/month. No need for multi-region failover at 500 clients. If the server goes down, clients lose AI for a few hours — annoying but not catastrophic. WhatsApp messages queue and process when server comes back.

---

## 4. INDONESIAN MARKET — "Will people actually pay for this?"

### Questions while talking to business owners:

**Q: What do Indonesian UMKM currently spend on business tools per month?**
Expected: Most micro businesses (warung, small online sellers) spend Rp 0-200K/month on tools. Small-medium (established Shopee sellers, salons with 3+ staff) spend Rp 200K-1M/month. The ones who spend Rp 1M+ are the real target — they already understand paying for tools that save time. If most people you talk to spend Rp 0, we need a much cheaper entry tier or we're targeting the wrong segment.

**Q: Do they want a physical robot or just a WA bot?**
Expected: This is the existential question. If 8 out of 10 say "bot WA aja cukup" (WA bot is enough), the hardware strategy is wrong and we should launch as software-only first. If 5+ say "wah keren, robot di meja" (cool, robot on desk) and show genuine excitement (not just politeness), the hardware differentiator is real. The honest answer is probably mixed — some want the robot for the novelty/status, most just want the functionality. Consider: robot as premium tier, WA-only as entry tier.

**Q: Is Rp 5M implementation + Rp 2M/month realistic?**
Expected: For a solo seller making Rp 10-20M/month, Rp 5M upfront is steep. For an established business making Rp 50M+/month, it's reasonable. The monthly Rp 2M is the harder sell — that's an ongoing commitment. If most people say "mahal" (expensive), test Rp 2M implementation + Rp 500K/month as an entry tier. The worst case is that nobody will pay Rp 2M/month — then the entire subscription model needs rethinking.

**Q: Which personality has the most demand?**
Expected: OIC Toko (online seller auto-reply) probably has the widest market because there are millions of Shopee/Tokopedia sellers. OIC Trader has the highest willingness to pay (traders spend money on tools). OIC Beauty has strong emotional connection (MUA/salon lifestyle). If your research confirms Toko as the biggest market, launch with Toko first, not Trader.

---

## 5. REGULATORY — "Can we legally sell this?"

### Questions while researching regulations:

**Q: Does our ESP32 robot need SDPPI/POSTEL certification to be sold in Indonesia?**
Expected: **YES.** This is now confirmed. Under Ministerial Decree No. 469 of 2025, ANY device with WiFi, Bluetooth, or other radio frequency features needs DJID/SDPPI certification before import, distribution, or sale in Indonesia. The ESP32 has WiFi + Bluetooth = mandatory certification.

This is a MAJOR timeline and cost factor:
- Process: Submit test reports + documentation → lab testing → evaluation → certificate
- Timeline: 4-12 weeks depending on complexity
- Cost: Rp 15-50 juta through a certification agency (like Cerapproval)
- Validity: 3 years
- Requirement: Local importer/distributor entity needed

**WORKAROUNDS TO INVESTIGATE:**
1. Does the ESP32 module (ESP32-S3-WROOM) already have SDPPI certification? Espressif may have already certified the module. If so, our final product may need simplified certification.
2. Can we use an already-certified dev board (like ESP32-S3-BOX-3 which is sold in Indonesia) as our base?
3. Is there a "small batch" or "R&D" exemption for <100 units?
4. Can we start with software-only (WA bot) while hardware certification is in process?

If certification takes 3+ months and costs Rp 50M+, this pushes hardware launch significantly. Software (WA bot) can launch immediately with zero certification.

**Q: Do we need a PT or CV to operate?**
Expected: For importing electronics and running a subscription service, PT (Perseroan Terbatas) is the right entity. CV works for simpler businesses but lacks credibility for B2B sales. PT registration: Rp 5-15M via notaris, 2-4 weeks. You need PT to apply for SDPPI certification as the local importer.

**Q: Can OIC Trader legally give trading analysis?**
Expected: Providing "educational" or "informational" analysis is generally fine with disclaimers. Managing client funds or giving personalized investment advice requires OJK licensing. As long as OIC Trader says "ini bukan nasihat keuangan" (this is not financial advice) and doesn't execute trades on behalf of clients, it should be legal. The "10 Juta Challenge" content needs careful disclaimer wording to avoid being classified as investment promotion. Consult a lawyer before running that campaign.

**Q: UU PDP (data privacy) — do we need anything special?**
Expected: Yes, you need user consent to store and process their conversation data. This means: Terms of Service agreement during onboarding, clear explanation of what data is stored, option to delete data. You probably don't need a full Data Protection Officer for <500 clients. Data can be stored on Singapore VPS (no data localization requirement as of 2025). But the law is relatively new — enforcement is still evolving.

---

## 6. PACKAGING & PRODUCTION — "How do we make it feel premium?"

### Questions while sourcing packaging:

**Q: What's the packaging reference we're targeting?**
Expected: Think Apple AirPods or Nothing Ear — small rigid box, magnetic closure, pull tab, device nestled in molded foam, minimal printed cards. NOT a generic brown box with bubble wrap. The unboxing experience IS the first impression. If the packaging doesn't make them go "ooh" when opening, we've failed at the Rp 5M price point.

**Q: Can we do full custom packaging at 500 units?**
Expected: Yes, but at a premium. Custom rigid boxes at 500 qty on 1688 run ¥8-15/unit (vs ¥3-5 at 5000 qty). Custom EVA foam inserts at 500 qty need a mold (¥500-1500 one-time) plus ¥3-5/piece. Total custom packaging at 500 qty: ¥15-25/unit. This is acceptable given the Rp 5M price point. At 2000+ units (Batch 2), packaging cost drops to ¥8-12/unit.

**Q: How does QC work for 500 units?**
Expected: Each unit needs to be tested before packaging: power on, WiFi connect, mic test, speaker test, camera test (if equipped), screen test. At 500 units, this is ~2-3 days of work for 2 people. Build a simple QC checklist: 8 tests per unit, 3 minutes each, mark pass/fail. Expected failure rate for ESP32 dev boards: 1-3%. Budget for 510-515 units to account for defects.

---

## 7. COMPETITOR LANDSCAPE — "What already exists that we're up against?"

### Questions while researching competitors:

**Q: Is there ANY physical AI robot product sold in Indonesia right now?**
Expected: Almost certainly not for the UMKM market. There are Chinese AI robot toys (Alibaba's Tmall Genie, Baidu Xiaodu) but none positioned as business tools for Indonesian small businesses. This means we'd be first-to-market for physical AI business assistants in Indonesia. First-mover advantage is real, but also means we need to educate the market (longer sales cycle).

**Q: How much does Kata.ai charge?**
Expected: Kata.ai targets enterprises, not UMKM. Their pricing is custom/quote-based, likely Rp 10-50M/month for enterprise chatbot solutions. We're not competing with them directly — different segment. But their existence validates that Indonesian businesses will pay for AI chat solutions.

**Q: What about cheap WA auto-reply tools?**
Expected: Tools like SleekFlow, Qontak, and WATI charge Rp 500K-3M/month for WhatsApp automation. Shopee/Tokopedia have built-in basic auto-reply (free but very limited). If a basic WA bot costs Rp 500K/month, our Rp 2M/month needs to be dramatically better — the physical robot + camera + specialized personality is that differentiator. If customers see us as "just another WA bot but more expensive," we lose.

**Q: Why did global AI hardware (Rabbit R1, Humane Pin) fail?**
Expected: They failed because: (1) too general — tried to replace phones, (2) no clear use case — cool demo but no daily utility, (3) poor execution — slow, buggy, limited. OIC avoids all three: (1) specialized per industry, (2) clear use case — answers your WhatsApp 24/7, (3) built on proven open-source (XiaoZhi/OpenClaw). But the cautionary lesson is real: hardware is HARD. Software-first, hardware-second might be the safer path.

---

## 8. CONTENT & MARKETING — "Can we actually make viral content cheaply?"

### Questions while testing content tools:

**Q: Can Seedance 2.0 animate our OIC robot character convincingly?**
Expected: Seedance excels at character-consistent short videos (5-15 seconds). If you feed it a reference image of our blue robot, it should generate cute animations. Quality should be "good enough for TikTok" — not Pixar quality but engaging. If the output looks janky or uncanny, we fall back to stop-motion with physical robot (more effort but more authentic).

**Q: What kind of Indonesian TikTok content gets views?**
Expected: Indonesian TikTok trends toward: humor/comedy skits, relatable daily life content, before/after transformations, "POV" style videos, and educational content with personality. Pure tech demos don't go viral — the robot needs a PERSONALITY. The "robot does funny things when owner isn't looking" concept aligns perfectly with what works on Indonesian TikTok.

---

## SUMMARY: THE 5 MAKE-OR-BREAK QUESTIONS

After all research, you should be able to answer these definitively:

| # | Question | Good Answer (Go!) | Bad Answer (Pivot!) |
|---|---------|-------------------|-------------------|
| 1 | Do Chinese LLMs speak natural Bahasa? | 7+/10 on slang test, feels like a real Indonesian | Stiff, formal, sounds translated |
| 2 | Will UMKM pay Rp 2M/month? | 3+ out of 10 interviewees say "worth it" | Everyone says "mahal" |
| 3 | Can we get SDPPI certification in <3 months? | Yes, module already certified or fast-track possible | 6+ months, Rp 50M+ cost |
| 4 | Does the hardware feel premium at Rp 5M? | Solid build, good speaker, responsive | Cheap plastic, tinny speaker, laggy |
| 5 | End-to-end latency under 3 seconds? | Speak → reply in 2-3 seconds | 5+ seconds = feels broken |

If all 5 are "Go" → full speed ahead with hardware + software.
If #1 is bad → switch LLM provider or fine-tune.
If #2 is bad → launch software-only at Rp 500K/month first.
If #3 is bad → launch WA bot first while hardware certification processes.
If #4 is bad → upgrade to Stack-chan or redesign shell.
If #5 is bad → upgrade VPS, switch to cloud ASR, optimize pipeline.

No single "bad" answer kills the project. Each one has a pivot path. But you need to know WHICH pivots are needed before building.
