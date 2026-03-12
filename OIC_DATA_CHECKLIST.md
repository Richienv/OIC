# OIC — DATA I NEED FROM YOU
## So I Can Write the Definitive Build Plan

> **How this works:** You gather the raw data below. I'll handle ALL the research, analysis, cost modeling, Docker/infra architecture, competitor mapping, and documentation.
> 
> Just send me screenshots, links, prices, and notes. I turn it into the plan.

---

## 🔴 PRIORITY 1 — Hardware (Only YOU can do this from China)

### A. Taobao/1688 Screenshots & Links

I need you to search Taobao (淘宝) and 1688.com for these items. For EACH, send me:
- Screenshot of the product listing
- Price (in ¥)
- Taobao/1688 link
- Seller rating & monthly sales volume
- Shipping cost to your address

**Search terms to use:**

| Item | Search Term (中文) | What to Look For |
|------|-------------------|-----------------|
| XiaoZhi prebuilt robot | 小智机器人 ESP32 | Prebuilt units with screen+mic+speaker, ~¥50-150 |
| XiaoZhi dev board only | 小智AI ESP32-S3 开发板 | Bare boards, cheapest option |
| M5Stack CoreS3 | M5Stack CoreS3 | Official M5Stack store preferred |
| M5Stack CoreS3 SE | M5Stack CoreS3 SE | Cheaper variant, still has mic+speaker+screen |
| Stack-chan kit/shell | Stack-chan 机器人外壳 | 3D printed shell that fits CoreS3 |
| ESP32-S3-BOX-3 | ESP32-S3-BOX-3 乐鑫 | Espressif official, another option |
| Robot shell/case | AI机器人外壳 桌面 可爱 | Cute desktop robot shells, various styles |
| Braided USB-C cable (short) | 编织USB-C数据线 短 OEM | 30cm braided, for packaging |
| Gift box rigid magnetic | 礼品盒 磁吸翻盖 定制 | Rigid boxes similar to Apple packaging |
| EVA foam insert custom | EVA内衬 定制 电子产品 | Custom cut foam for hardware |

**I need at least 3 options per item so I can compare.**

### B. Bulk Pricing (1688.com specifically)

1688 is the wholesale platform. Search the same items there for bulk pricing:
- [ ] XiaoZhi boards — price at 10/50/100/500 units
- [ ] USB-C cables — price at 100/500/1000
- [ ] Gift boxes — price at 100/500/1000 (include customization/printing cost)
- [ ] EVA foam — price at 100/500

### C. If You Can Visit Huaqiangbei (华强北)

Take photos of:
- [ ] Any store selling ESP32 dev boards — ask for bulk pricing
- [ ] Packaging/gift box shops — get business cards, ask for samples
- [ ] 3D printing service shops — ask how much per unit for a robot shell
- [ ] Get at least 3 business cards from shell/case suppliers

---

## 🔴 PRIORITY 2 — Chinese LLM API Access (Only YOU can do this easily from China)

### A. Sign Up & Get API Keys

Go to each platform, create account, and send me:
- API pricing page screenshot (current prices, not old blog data)
- Your API key (or confirm you have one — I won't store it)
- Any free credits they give new users
- Whether it works from Indonesia (some Chinese APIs block non-China IPs)

| Platform | URL | What to Get |
|----------|-----|-------------|
| 智谱AI (GLM) | open.bigmodel.cn | GLM-4 / GLM-4V API key + pricing |
| MiniMax | platform.minimaxi.com | MiniMax API key + pricing |
| Moonshot (Kimi) | platform.moonshot.cn | Kimi API key + pricing (esp. vision) |
| DeepSeek | platform.deepseek.com | DeepSeek API key + pricing |
| 百川 (Baichuan) | platform.baichuan-ai.com | Backup option, check Bahasa support |
| 通义千问 (Qwen) | dashscope.aliyuncs.com | Alibaba's model, used by XiaoZhi default |

### B. Quick Language Test (5 min per model)

For each API you sign up for, just paste this ONE prompt and screenshot the response:

```
Kamu adalah asisten AI untuk bisnis kecil di Indonesia. Seorang pelanggan bertanya via WhatsApp: "Kak, masih ada stok tas warna hitam ga? Mau pesen 2, bisa COD ga ke daerah Kemang?"

Balas seperti admin toko online yang ramah dan profesional.
```

This tells me instantly if the model handles natural Bahasa + slang + marketplace context. Screenshot each response.

---

## 🟡 PRIORITY 3 — Indonesian Market Data (You know this better than me)

### A. Pricing Reality Check

Ask 5-10 Indonesian small business owners (via WA, friends, family, anyone):

**Questions:**
1. "Per bulan, kamu bayar berapa untuk tools bisnis (software, aplikasi, dll)?"
2. "Kalau ada robot AI yang bisa jawab WA pelanggan 24 jam, maksimal bayar berapa per bulan?"
3. "Pernah pakai chatbot/auto-reply? Yang mana? Puas ga?"
4. "Kalau harus pilih: (a) robot fisik di meja Rp 5jt, (b) app HP Rp 500rb/bln, (c) bot WA aja Rp 200rb/bln — pilih mana?"

Just screenshot the WA conversations and send them to me raw. I'll analyze.

### B. Existing Tools They Use

- [ ] Screenshot pricing page of Mekari Qontak (qontak.com)
- [ ] Screenshot pricing page of SleekFlow Indonesia (sleekflow.io)
- [ ] Screenshot any "auto-reply Shopee/Tokopedia" tools you find
- [ ] Check: is there ANY physical AI robot product sold in Indonesia right now?

### C. Shipping & Logistics Costs

- [ ] JNE regular rate for a 500g package (Jakarta → Surabaya, Jakarta → Balikpapan, Jakarta → Medan)
- [ ] J&T same routes
- [ ] SiCepat same routes
- [ ] Can you find import duty rate for "electronic consumer device" from China to Indonesia? (HS code)

---

## 🟡 PRIORITY 4 — Legal Basics (Quick research)

- [ ] Screenshot of UU PDP (data privacy law) key points — or a summary article link
- [ ] Is there any regulation about AI chatbots handling customer data in Indonesia?
- [ ] OJK rules: can an AI give "trading analysis" or does it need a financial advisor license?
- [ ] What's the simplest business entity to start with? (PT, CV, or just personal?)
- [ ] BPOM or SNI certification needed for importing electronics?

---

## 🟢 PRIORITY 5 — Things I CAN Research Myself (Don't worry about these)

I'll handle all of this when you give me the raw data above:

- ✅ Docker + Kubernetes architecture design
- ✅ xiaozhi-esp32-server deployment guide
- ✅ OpenClaw configuration & integration docs
- ✅ Multi-tenant architecture for scaling to 500+ clients
- ✅ System prompt engineering for each personality
- ✅ Full competitor analysis (Kata.ai, global AI hardware)
- ✅ Complete BOM spreadsheet with cost modeling
- ✅ Financial model with real numbers
- ✅ Infrastructure scaling plan (1 client → 10 → 100 → 500)
- ✅ CI/CD pipeline setup
- ✅ Monitoring & alerting architecture
- ✅ Backup & disaster recovery plan
- ✅ WhatsApp integration architecture
- ✅ MCP tool configuration guide
- ✅ Security hardening guide
- ✅ Full packaging design spec
- ✅ Landing page content & wireframe
- ✅ Content marketing calendar
- ✅ Pitch deck structure
- ✅ Partnership proposal template
- ✅ Complete operations manual

---

## HOW TO SEND ME THE DATA

**Best format:** Just dump everything in one conversation with me. I'll sort it.

For each item:
1. **Screenshot** (paste directly into chat)
2. **Link** (copy-paste URL)
3. **Price** (just type the number + currency)
4. **Your notes** ("this one looks good because..." or "seller said...")

Example:
> "Here's XiaoZhi from Taobao, ¥89, seller has 5000+ sales, link: [url]. Looks like the popular model. Also found a cheaper one at ¥45 but no screen."

That's all I need. Don't format it. Don't organize it. Just send raw data and I'll build the plan.

---

## TIMELINE

| When | What You Gather | What I Build |
|------|----------------|-------------|
| Day 1-3 | Taobao screenshots, LLM signups | Infrastructure architecture doc |
| Day 3-5 | LLM test results, bulk pricing | Software deployment guide |
| Day 5-7 | Market survey responses, competitor screenshots | Full competitor analysis |
| Day 7-10 | Legal basics, shipping costs | Complete BOM + financial model |
| Day 10-14 | (Optional) Huaqiangbei visit data | **THE COMPLETE BUILD PLAN** |

After Day 14, I deliver:
- 📘 Full Technical Build Guide (Docker, infra, deployment, scaling)
- 📊 Real BOM with real prices
- 📋 Production + Packaging Spec
- 🏪 Competitor Analysis
- 💰 Updated Financial Model with real numbers
- 🗺️ 90-Day Execution Plan (updated with real constraints)
- 📝 System Prompts for all 6 personalities
- 🎨 Landing Page wireframe + copy

---

## START HERE → TOP 3 THINGS TO DO TODAY

1. **Open Taobao** → search "小智机器人 ESP32" → screenshot the top 5 results with prices
2. **Open open.bigmodel.cn** → sign up → get API key → test the Bahasa prompt above
3. **WhatsApp 3 business owners** → ask the 4 pricing questions above

That's it. Send me what you find and I'll start building.
