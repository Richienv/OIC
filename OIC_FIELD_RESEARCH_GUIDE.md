# OIC Field Research Guide
## Every Question to Ask, Who to Ask, What to Expect

> Print this or keep it on your phone. Use it while shopping, visiting suppliers, testing hardware, talking to potential customers.

---

# SECTION 1: HARDWARE RESEARCH
## Buying on Taobao / 1688 / In-Person

---

### 1A. Buying XiaoZhi Units

**Ask the seller (chat on Taobao/1688/WeChat):**

| # | Question (中文) | Question (English) | Expected Good Answer | 🚩 Red Flag |
|---|----------------|-------------------|---------------------|-------------|
| 1 | 这款支持小智固件吗？哪个版本？ | Does this support XiaoZhi firmware? Which version? | "支持v2固件" (supports v2) | "Not sure" or only v1 |
| 2 | 芯片是ESP32-S3还是ESP32？内存多大？ | Is the chip ESP32-S3 or ESP32? How much memory? | ESP32-S3, 16MB flash + 8MB PSRAM | Plain ESP32 (no camera support) |
| 3 | 有摄像头吗？分辨率多少？ | Does it have a camera? What resolution? | Yes, 2MP or 0.3MP OV2640/OV3660 | No camera = can't do vision |
| 4 | 麦克风和喇叭效果怎么样？能在2米外听清吗？ | How's the mic and speaker? Can it hear from 2m away? | "Dual mic, clear at 1-2m, speaker 3W" | Single mic, tiny speaker |
| 5 | 屏幕多大？触摸屏吗？ | How big is the screen? Touchscreen? | 1.28" or 2.4" LCD, touch preferred | No screen at all |
| 6 | 可以改WiFi连接自己的服务器吗？ | Can I change WiFi to connect to my own server? | "可以，刷固件改WebSocket地址" | "Only connects to official server" |
| 7 | 500台批量价多少？ | What's the price for 500 units? | ¥40-80 per unit (significant discount) | No discount or MOQ too high |
| 8 | 发货到印尼可以吗？运费大概多少？ | Can you ship to Indonesia? Roughly how much? | Yes, quotes shipping cost | Refuses international shipping |
| 9 | 有没有外壳定制服务？可以印logo吗？ | Do you offer custom shells? Can you print a logo? | "可以定制颜色和logo" | Only standard white/black |
| 10 | 退货率大概多少？常见问题是什么？ | What's the return rate? Common issues? | "<2%, mostly WiFi config issues" | Avoids the question |

**What I expect you to find:**
- 3-5 viable XiaoZhi models ranging from ¥45 (bare board) to ¥150 (full robot with shell)
- The sweet spot is probably ¥60-90 for a complete unit with screen + mic + speaker + camera
- At 500 units on 1688, price should drop 30-50%

**GREEN LIGHT:** A unit with ESP32-S3, screen, dual mic, speaker, camera, for under ¥100 with custom shell option
**RED LIGHT:** No camera option, no custom firmware support, only ESP32 (not S3)

---

### 1B. Buying M5Stack CoreS3 / Stack-chan

**Ask the seller:**

| # | Question | Expected Good Answer | 🚩 Red Flag |
|---|---------|---------------------|-------------|
| 1 | CoreS3 和 CoreS3 SE 有什么区别？ | SE is cheaper, no IMU sensor, same mic+speaker+screen | "Same thing" (they're not) |
| 2 | 支持小智固件吗？ | "Yes, flash via M5Burner or ESP-IDF" | "Only works with UIFlow" |
| 3 | Stack-chan外壳有吗？什么材质？ | "3D printed PLA/resin, fits CoreS3" | No shell available |
| 4 | 500台的价格？ | Should be ¥200-300/unit even at bulk | Over ¥350/unit at bulk |
| 5 | 和普通小智板比，优势在哪？ | "Better build quality, brand recognition, better screen" | Can't explain difference |

**What I expect:**
- CoreS3 ≈ ¥250-350 retail, ¥200-280 at bulk
- CoreS3 SE ≈ ¥180-250 retail
- Stack-chan shell ≈ ¥30-80 per unit
- Total Stack-chan unit: ¥230-380 (significantly more expensive than XiaoZhi)

**KEY DECISION THIS ANSWERS:** Is Stack-chan worth 3-5x the price of XiaoZhi? Or do we go XiaoZhi for Batch 1 and save Stack-chan for premium tier?

---

### 1C. Packaging Suppliers

**Ask packaging suppliers (Huaqiangbei or 1688):**

| # | Question (中文) | Expected Good Answer | 🚩 Red Flag |
|---|----------------|---------------------|-------------|
| 1 | 磁吸翻盖礼品盒，尺寸大概15x12x8cm，500个多少钱？ | ¥8-15/unit at 500 qty | Over ¥25/unit |
| 2 | 可以印logo和彩色图案吗？起印量多少？ | "Yes, 300+ MOQ for custom print" | MOQ 5000+ |
| 3 | 打样费多少？多久能出样？ | ¥200-500 for sample, 3-5 days | Over ¥2000 or 2+ weeks |
| 4 | EVA内衬定制，按我的产品形状开模，多少钱？ | ¥500-1500 mold fee + ¥2-5/piece | Over ¥5000 mold fee |
| 5 | 整套包装（盒+内衬+卡片+贴纸）能一起做吗？ | "Yes, we do full packaging solutions" | "We only do boxes" |
| 6 | 从下单到500套交付，大概多久？ | 10-15 working days | Over 30 days |

**What I expect for complete packaging per unit (500 qty):**
- Rigid magnetic box: ¥8-15
- EVA foam insert: ¥3-5
- Printed cards (Quick Start + warranty): ¥1-2
- Stickers: ¥0.5-1
- Tissue paper + ribbon: ¥1-2
- **Total packaging: ¥15-25 per unit (≈ Rp 35-55K)**

---

### 1D. Cables & Accessories

**Ask cable suppliers:**

| # | Question | Expected Good Answer |
|---|---------|---------------------|
| 1 | 编织USB-C数据线，30cm，可以印logo吗？500条多少？ | ¥3-6/piece, logo printing possible at 500+ |
| 2 | 5V2A充电头，印尼插头标准（Type C/F），500个多少？ | ¥5-10/piece |
| 3 | 防滑硅胶垫，圆形3cm，定制颜色，500个？ | ¥0.5-2/piece |

---

# SECTION 2: SOFTWARE & LLM RESEARCH
## Testing AI Models for Bahasa Indonesia

---

### 2A. LLM Quality Testing

**For EACH model (GLM, Kimi, MiniMax, DeepSeek, Qwen), run these 10 test prompts and rate 1-10:**

**Test 1 — Natural Bahasa (Slang)**
```
Pelanggan: "Kak mau nanya dong, barang yg kemarin gue pesen udh sampe mana ya? Kok lama bgt sih"
Balas sebagai admin toko yang ramah.
```
✅ Expected good: Uses "kak", informal tone, empathetic, gives tracking info request
🚩 Red flag: Stiff/formal response, mixing English randomly, sounds like Google Translate

**Test 2 — Product Recommendation**
```
Seorang pelanggan salon bertanya: "Kak, kulit aku kombinasi, agak berminyak di T-zone tapi kering di pipi. Cocok pakai skincare apa ya?"
Balas sebagai beauty consultant profesional.
```
✅ Expected good: Specific product category recommendations, understands skin terms in Bahasa
🚩 Red flag: Generic advice, wrong terminology, suggests products not available in Indonesia

**Test 3 — Trading Analysis**
```
Seorang trader bertanya: "BTC lagi di 95000, ada FVG di 93500-94000, sama OB di 92000. Menurutmu entry di mana yang paling aman?"
Balas sebagai trading analyst yang paham SMC/ICT.
```
✅ Expected good: Understands FVG, OB, SMC concepts, gives structured analysis with risk management
🚩 Red flag: Doesn't know SMC terminology, gives generic "be careful" advice

**Test 4 — Marketplace Auto-Reply**
```
Pembeli di Shopee bertanya: "Min, ready stock ga? Bisa COD ga ke Bekasi? Ongkirnya berapa?"
Balas sebagai admin marketplace yang profesional tapi friendly.
```
✅ Expected good: Confirms stock, explains COD policy, mentions shipping estimate
🚩 Red flag: Doesn't understand COD, Shopee context, or Indonesian shipping

**Test 5 — Construction/Tender**
```
Seorang kontraktor bilang: "Tolong buatkan RAB untuk renovasi kamar mandi 2x3 meter, ganti keramik, closet duduk, dan shower. Area Jakarta Selatan."
Balas dengan estimasi biaya.
```
✅ Expected good: Structured RAB with realistic Jakarta pricing, material + labor breakdown
🚩 Red flag: Prices way off Indonesian market, missing common items

**Test 6 — Multi-turn Memory**
```
Message 1: "Nama saya Budi, saya punya toko baju di Tanah Abang"
Message 2: "Biasanya pelanggan saya nanya soal ukuran dan ready stock"
Message 3: "Kalau ada pelanggan nanya 'size L ready ga?', jawab gimana?"
```
✅ Expected good: Remembers Budi, Tanah Abang, clothing context across messages
🚩 Red flag: Forgets context, asks again what the business is

**Test 7 — Code Switching (Bahasa + English)**
```
"Gue lagi analyze chart BTC/USDT di timeframe 4H. Ada bearish divergence di RSI sama double top di resistance 96000. What do you think, hold or cut loss?"
```
✅ Expected good: Handles mixed language naturally, technical analysis in response
🚩 Red flag: Responds in only one language, confused by the mix

**Test 8 — Emotional Intelligence**
```
"Kak, bisnis aku lagi sepi banget 😢 udah 3 hari ga ada orderan. Bingung mau gimana lagi..."
```
✅ Expected good: Empathetic first, then actionable suggestions for increasing sales
🚩 Red flag: Jumps straight to advice without acknowledging feelings, or too generic

**Test 9 — Vision/Camera (Kimi only)**
Send a photo of:
- A trading chart screenshot
- A product photo
- A handwritten document/receipt

Ask: "Apa yang kamu lihat? Jelaskan dalam Bahasa Indonesia."
✅ Expected good: Accurate description, relevant analysis, Bahasa response
🚩 Red flag: Hallucinating details, can't read text in image

**Test 10 — System Prompt Adherence**
Set system prompt:
```
Kamu adalah OIC Trader, asisten AI spesialis trading crypto. Rules:
1. Selalu ingatkan risk management
2. Jangan pernah bilang "pasti profit"
3. Gunakan bahasa campuran Bahasa-English seperti trader Indonesia
4. Kalau ditanya soal hal di luar trading, bilang "Wah itu di luar keahlian gue, fokus trading aja ya bro"
```
Then ask: "Kak, recommend dong restoran enak di Jakarta"
✅ Expected good: Deflects politely per system prompt, stays in character
🚩 Red flag: Answers the restaurant question, ignores system prompt

**SCORING SHEET:**

| Model | Test 1 | Test 2 | Test 3 | Test 4 | Test 5 | Test 6 | Test 7 | Test 8 | Test 9 | Test 10 | AVG | Cost/M tokens |
|-------|--------|--------|--------|--------|--------|--------|--------|--------|--------|---------|-----|--------------|
| GLM 4.5 | /10 | /10 | /10 | /10 | /10 | /10 | /10 | /10 | N/A | /10 | | $ |
| Kimi K2.5 | /10 | /10 | /10 | /10 | /10 | /10 | /10 | /10 | /10 | /10 | | $ |
| MiniMax | /10 | /10 | /10 | /10 | /10 | /10 | /10 | /10 | N/A | /10 | | $ |
| DeepSeek | /10 | /10 | /10 | /10 | /10 | /10 | /10 | /10 | N/A | /10 | | $ |
| Qwen | /10 | /10 | /10 | /10 | /10 | /10 | /10 | /10 | N/A | /10 | | $ |

---

### 2B. API Practical Questions

**For each LLM provider, find out:**

| # | Question | Why It Matters | Where to Find |
|---|---------|---------------|---------------|
| 1 | Exact price per 1M input tokens + 1M output tokens | Cost model | Pricing page |
| 2 | Free credits for new users? How much? | Reduces testing cost | Sign-up page |
| 3 | Rate limit (requests per minute) | Can we handle 50 concurrent clients? | API docs |
| 4 | Max context window (tokens) | Determines conversation memory length | Model specs |
| 5 | Does it work from non-China IP (Singapore/Indonesia)? | Critical — our VPS is in Singapore | Test it: set VPN to Singapore, make API call |
| 6 | Is there a streaming API? | Needed for real-time voice response | API docs |
| 7 | Latency from Singapore to their API endpoint? | User experience | Ping test or first-token timing |
| 8 | Vision API available? What models? Price? | Camera feature | API docs, only some models have this |
| 9 | Function calling / tool use supported? | MCP integration | API docs |
| 10 | Any content filtering that blocks trading/financial advice? | OIC Trader might get filtered | Test with trading prompts |

---

# SECTION 3: INDONESIAN MARKET RESEARCH
## Talking to Real Business Owners

---

### 3A. Customer Discovery Interviews (Target: 10 people)

**Who to ask:**
- 2-3 online sellers (Shopee/Tokopedia)
- 2-3 beauty/salon owners
- 1-2 crypto traders
- 1-2 contractors/tender businesses
- 1-2 any other small business (café, laundry, etc.)

**The conversation flow (adjust naturally, this isn't a rigid script):**

**Opening (build rapport first):**
"Hei [nama], lagi riset buat project baru nih. Boleh tanya-tanya sebentar soal bisnismu? Cuma 5-10 menit."

**Block 1 — Current Pain:**
| # | Question | What You're Looking For |
|---|---------|----------------------|
| 1 | "Sehari-hari yang paling makan waktu di bisnis apa sih?" | The TOP time-waster = our product opportunity |
| 2 | "Bales chat/WA pelanggan biasanya berapa kali sehari? Pernah kelewat ga?" | Volume + missed opportunities = pain we solve |
| 3 | "Pernah kehilangan pelanggan gara-gara telat bales?" | Emotional pain point, this sells the product |
| 4 | "Jam berapa biasanya pelanggan paling banyak chat? Ada yang chat malam/weekend?" | Proves 24/7 value proposition |

**Block 2 — Current Tools:**
| # | Question | What You're Looking For |
|---|---------|----------------------|
| 5 | "Pakai tools apa aja buat bantu bisnis? (app, software, dll)" | What they already pay for |
| 6 | "Per bulan habis berapa buat tools/software itu?" | Their spending capacity = our pricing ceiling |
| 7 | "Pernah coba chatbot/auto-reply? Pengalaman gimana?" | If bad = "we're different because..."; if never tried = education needed |
| 8 | "Pernah denger soal AI buat bisnis? Pendapat gimana?" | AI awareness level = marketing approach |

**Block 3 — Product Validation (show concept):**
| # | Question | What You're Looking For |
|---|---------|----------------------|
| 9 | "Kalau ada robot AI yang duduk di meja kamu, bisa jawab WA 24 jam, bisa lihat produk pakai kamera, bisa analisis data — tertarik ga?" | First reaction = gut feeling about product-market fit |
| 10 | "Fitur mana yang paling menarik: (a) auto-reply WA, (b) camera yang bisa scan, (c) robot fisik di meja, (d) spesialis per industri?" | Priority feature = what we highlight in marketing |
| 11 | "Kalau implementasi Rp 5 juta + langganan Rp 2 juta per bulan, worth it ga menurutmu?" | Price sensitivity. If "mahal" = need cheaper tier |
| 12 | "Berapa maksimal yang mau kamu bayar per bulan buat asisten AI kayak gini?" | Real willingness to pay |
| 13 | "Lebih prefer robot fisik di meja, atau cukup bot WA aja?" | Validates hardware strategy vs software-only |

**Block 4 — Decision Making:**
| # | Question | What You're Looking For |
|---|---------|----------------------|
| 14 | "Kalau mau beli tools baru, biasanya cari info di mana? (IG, TikTok, teman, Google?)" | Marketing channel priority |
| 15 | "Siapa yang biasanya decide soal tools/pengeluaran bisnis? Kamu sendiri atau ada partner?" | Decision maker mapping |
| 16 | "Kalau ada trial gratis 7 hari, mau coba ga?" | Conversion lever, also early leads list |

**EXPECTED RESPONSES & WHAT THEY MEAN:**

| Response Pattern | What It Means | Action |
|-----------------|---------------|--------|
| "Wah keren, mau dong!" | Polite interest, NOT validation | Dig deeper: "Kalau harganya segitu, beneran mau beli?" |
| "Mahal sih, tapi kalau beneran works..." | Price-sensitive but interested | Consider Rp 3jt impl + Rp 1.5jt/bln tier |
| "Gue cukup bales sendiri aja" | Not our customer | Move on, this segment doesn't need us |
| "Bot WA aja cukup, ga perlu robot" | Software-only might be enough | Consider software-only tier as entry |
| "Camera bisa scan apa aja?" | Feature hook! They want vision | Emphasize camera in marketing |
| "Temen gue juga butuh nih" | Network effect potential | Ask for intro immediately |
| Exact number for Q12 (e.g. "maks Rp 1 juta/bulan") | Real pricing data point | Record exactly |

---

### 3B. Competitor Screenshots Needed

**For each competitor, I need:**

**Mekari Qontak (qontak.com):**
- [ ] Screenshot pricing page (all tiers)
- [ ] Screenshot features list
- [ ] What's the cheapest plan?
- [ ] Do they have WhatsApp auto-reply?
- [ ] Any AI features?

**SleekFlow (sleekflow.io/id):**
- [ ] Screenshot pricing page
- [ ] Do they serve Indonesian market?
- [ ] WhatsApp integration features

**Kata.ai:**
- [ ] Screenshot their product page
- [ ] Any public pricing?
- [ ] What industries do they serve?

**Any auto-reply tools on Shopee/Tokopedia:**
- [ ] Screenshot the built-in auto-reply settings on Shopee Seller Center
- [ ] What can it do? What can't it do?
- [ ] Are sellers satisfied with it?

**Search Google: "chatbot UMKM Indonesia" / "AI assistant bisnis kecil":**
- [ ] Screenshot top 5 results — what products exist?
- [ ] Any of them have physical hardware?

---

### 3C. Logistics Questions

**Ask JNE/J&T/SiCepat (check their website or app):**

| # | Question | Expected Answer |
|---|---------|----------------|
| 1 | Rate for 500g package, 20x15x10cm, Jakarta → Surabaya (REG) | Rp 15-25K |
| 2 | Same package Jakarta → Balikpapan | Rp 25-40K |
| 3 | Same package Jakarta → Medan | Rp 25-40K |
| 4 | Insurance for package worth Rp 5 juta? | 0.2-0.5% of declared value |
| 5 | Bulk shipping discount for 50+ packages/month? | Some carriers offer corporate rates |

**Import from China to Indonesia:**
| # | Question | Where to Find |
|---|---------|---------------|
| 1 | HS Code for "electronic consumer device with WiFi" | Google: "HS code Indonesia electronic device" |
| 2 | Import duty rate for that HS code | insw.go.id (Indonesian customs portal) |
| 3 | PPN (VAT) on imported electronics? | Should be 11% |
| 4 | Any POSTEL/SDPPI certification needed for WiFi device? | kominfo.go.id — this could be a BLOCKER |
| 5 | Forwarder quote: 500 units (each ~200g) Shenzhen → Jakarta | Ask on 1688 or a freight forwarder |

**🚩 CRITICAL RED FLAG:** If Indonesia requires POSTEL/SDPPI certification for WiFi devices (which it likely does), this could add months and significant cost. FIND THIS OUT EARLY.

---

# SECTION 4: LEGAL RESEARCH
## Quick Questions to Answer

---

**Business Registration:**
| # | Question | Where to Find | Expected Answer |
|---|---------|---------------|----------------|
| 1 | Cheapest legal entity to start? PT or CV? | Google: "perbedaan PT CV Indonesia 2025" | CV is cheaper/faster, but PT better for investment |
| 2 | How much does PT registration cost? | oss.go.id or ask a notaris | Rp 5-15 juta all-in with notaris |
| 3 | How long does PT registration take? | Same sources | 2-4 weeks |
| 4 | KBLI code for "AI technology service" | oss.go.id KBLI search | Probably 62029 (Other IT services) |

**Data Privacy:**
| # | Question | Expected Answer |
|---|---------|----------------|
| 1 | Does UU PDP require consent to store customer chat data? | Yes — need consent mechanism |
| 2 | Can we store data on Singapore VPS or must it be in Indonesia? | Currently no data localization requirement (as of 2025) but check |
| 3 | Do we need to appoint a Data Protection Officer? | Only for large-scale processing, probably not for <500 clients |

**Financial Advice (OIC Trader):**
| # | Question | Expected Answer |
|---|---------|----------------|
| 1 | Does providing AI trading analysis require OJK license? | Probably not IF we add disclaimers and don't manage funds |
| 2 | What disclaimers are legally required? | "Bukan nasihat keuangan", "keputusan trading tanggung jawab pengguna" |
| 3 | Can we run the "10 Juta Challenge" publicly? | Need to check advertising rules for financial content |

---

# SECTION 5: INFRASTRUCTURE QUESTIONS
## (For when you set up the VPS)

---

**When you buy Hostinger VPS, document:**

| # | What to Record | Why |
|---|---------------|-----|
| 1 | Exact plan name + price paid | Budget tracking |
| 2 | Data center location chosen | Latency to Indonesia |
| 3 | IP address of your VPS | For DNS setup later |
| 4 | SSH access working? (screenshot terminal) | Confirms access |
| 5 | Run: `free -m` → screenshot | Actual RAM available |
| 6 | Run: `nproc` → screenshot | Actual CPU cores |
| 7 | Run: `df -h` → screenshot | Actual disk space |
| 8 | Run: `ping api.openai.com` → screenshot | Network connectivity test |
| 9 | Run: `ping open.bigmodel.cn` → screenshot | Can reach Chinese LLM APIs? |
| 10 | Run: `docker --version` → screenshot | Docker pre-installed? |

---

# SECTION 6: CONTENT RESEARCH
## (For when you set up Seedance / AI video tools)

---

**Seedance 2.0 Testing:**
| # | What to Test | Expected Result |
|---|-------------|----------------|
| 1 | Can you create account? (may need Chinese phone) | Should work with email |
| 2 | Upload OIC robot image → generate video | Robot should animate |
| 3 | Quality of output — screenshot or screen record | Should be TikTok-worthy |
| 4 | Time per video generation | Under 5 minutes ideally |
| 5 | Free tier limits? | How many videos/month for free |

**TikTok/IG Research:**
| # | What to Search | What to Record |
|---|---------------|----------------|
| 1 | Search TikTok: "robot AI Indonesia" | Top 5 videos, view counts, style |
| 2 | Search TikTok: "小智机器人" | Chinese XiaoZhi videos, what gets views |
| 3 | Search IG: "#AIbisnis #chatbotindonesia" | Who's posting? How many followers? |
| 4 | Search YouTube: "XiaoZhi ESP32 review" | English reviews, what people think |

---

# MASTER TIMELINE

| Day | Your Tasks | What to Send Me |
|-----|-----------|----------------|
| **1** | Search Taobao for XiaoZhi + M5Stack (10 min). Sign up for 2 LLM APIs (20 min) | Screenshots + links + prices |
| **2** | Run 10 LLM test prompts on 2 models (30 min). WA 3 business owners (15 min) | Screenshot responses + scoring |
| **3** | Search 1688 for bulk pricing + packaging (15 min). Sign up for remaining LLM APIs (15 min) | Screenshots + bulk prices |
| **4** | Run remaining LLM tests (30 min). WA 3 more business owners (15 min) | Complete scoring sheet |
| **5** | Screenshot competitor websites (10 min). Check shipping rates (10 min) | All competitor screenshots |
| **6** | Legal research — Google search + screenshot key findings (20 min) | Screenshots of regulations |
| **7** | (If possible) Buy VPS + run basic commands (30 min) | Terminal screenshots |
| **7** | (If possible) Order 1x XiaoZhi from Taobao | Order confirmation screenshot |

**Total time: ~4-5 hours spread across 7 days.**

After Day 7, send me everything. I build THE PLAN.

---

# QUICK REFERENCE CARD
## (Screenshot this for your phone)

**Taobao searches:**
- 小智机器人 ESP32
- M5Stack CoreS3
- AI机器人外壳
- 礼品盒 磁吸翻盖 定制
- 编织USB-C数据线 短

**LLM signups:**
- open.bigmodel.cn (GLM)
- platform.moonshot.cn (Kimi)
- platform.minimaxi.com (MiniMax)
- platform.deepseek.com (DeepSeek)

**Bahasa test prompt (copy-paste this):**
```
Kamu adalah asisten AI untuk toko online di Indonesia. Pelanggan bertanya: "Kak, masih ada stok tas warna hitam ga? Mau pesen 2, bisa COD ga ke daerah Kemang?" Balas seperti admin toko yang ramah dan profesional.
```

**Indonesian market questions (copy-paste to WA):**
```
Hei [nama]! Lagi riset project baru. Boleh tanya 3 hal cepet?
1. Sehari biasanya berapa kali bales chat pelanggan?
2. Pernah pakai chatbot/auto-reply? Gimana pengalamannya?
3. Kalau ada AI yang bisa jawab WA pelanggan 24 jam, mau bayar berapa per bulan?
```
