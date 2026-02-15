// ═══ ALL DEFAULT DATA ═══

export const getDefault = () => ({
  brand: {
    name: "OIC",
    fullName: "OIC — Open Intelligence Companion",
    tagline: "teman kerja yang nggak pernah tidur.",
    origin: "Open Intelligence Companion — 'Oh I See'",
    colors: { primary: "#0EA5E9", secondary: "#38BDF8", light: "#7DD3FC", dark: "#060B14", white: "#F0F9FF" },
    fonts: { headline: "Playfair Display", body: "DM Sans", mono: "DM Mono" },
    tone: "Casual, friendly, tapi profesional. Bahasa Indonesia natural — bukan Google Translate. Seperti teman yang kebetulan jenius.",
    story: `OIC lahir dari pertanyaan sederhana: kenapa bisnis kecil di Indonesia belum punya asisten AI?

Bukan karena teknologinya belum ada — tapi karena nggak ada yang bikin versi yang NYATA. Yang bisa dipegang. Yang duduk di meja. Yang punya kepribadian. Yang ngerti bahasa kita.

Kami bangun OIC supaya setiap pemilik bisnis — dari MUA di Jakarta sampai kontraktor di Balikpapan — punya teman kerja AI yang selalu siap. 24 jam. 7 hari. Nggak pernah izin, nggak pernah minta THR.

OIC bukan chatbot. OIC bukan app yang harus kamu buka. OIC adalah robot fisik yang duduk di meja kamu, dengar kamu ngomong, lihat lewat kamera, dan BERTINDAK. Jawab WhatsApp klien jam 3 pagi. Analisis chart pas kamu ragu. Booking jadwal pas kamu sibuk.

Setiap OIC punya "otak" berbeda — resep rahasia yang di-fine-tune untuk industri spesifik. Trader, Beauty, Tender, Toko, Live, Kampus. Bukan satu ukuran untuk semua — tapi spesialis yang NGERTI dunia kamu.

Batch 1 cuma 500 unit. Karena kami percaya lebih baik sempurna untuk 500 orang daripada setengah-setengah untuk 5000.

OIC. Open Intelligence Companion. Teman kerja yang nggak pernah tidur.`,
  },
  todos: {
    brand: {
      label: "Brand & Identity", icon: "✦",
      items: [
        { id:"b1", text:"Finalize nama → OIC", done:false, p:"red", note:"Domain: oic.ai, getoic.com, oic.id. IG/TikTok: @oic.ai @getoic" },
        { id:"b2", text:"Logo variations (dark/light/icon)", done:false, p:"red", note:"Dari logo mata biru: buat favicon, social profile, watermark video" },
        { id:"b3", text:"Brand guidelines document", done:false, p:"yellow", note:"Colors, fonts, tone, logo rules, social templates" },
        { id:"b4", text:"Social media templates (Canva)", done:false, p:"yellow", note:"IG post, story, TikTok thumbnail. Blue gradient + white text" },
        { id:"b5", text:"Brand story copywriting", done:false, p:"green", note:"Draft ready di Memory tab. Review & finalize." },
      ]
    },
    digital: {
      label: "Landing Page & Digital", icon: "◎",
      items: [
        { id:"d1", text:"Beli domain", done:false, p:"red", note:".id di Niagahoster (Rp 200K). .com Namecheap ($10)" },
        { id:"d2", text:"Claim all social handles", done:false, p:"red", note:"IG + TikTok + YouTube + WA Business. Consistent naming" },
        { id:"d3", text:"Design & build landing page", done:false, p:"red", note:"Kamu yang build. Ref: rabbit.tech, nothing.tech, Artemis" },
        { id:"d4", text:"Deploy ke Vercel + custom domain", done:false, p:"red", note:"Free tier. SSL auto. Connect domain DNS" },
        { id:"d5", text:"Analytics (GA4 + Meta Pixel + TikTok Pixel)", done:false, p:"yellow", note:"10 min each. Essential for retargeting ads later" },
        { id:"d6", text:"Lead capture form (WA / Google Form)", done:false, p:"red", note:"Collect: nama, WA, kota, bisnis, personality interest" },
      ]
    },
    tech: {
      label: "Technical Setup", icon: "⚙",
      items: [
        { id:"t1", text:"Hostinger VPS KVM 2 ($13.99/bln)", done:false, p:"red", note:"One-click Docker. OpenClaw backend host" },
        { id:"t2", text:"Deploy OpenClaw", done:false, p:"red", note:"Hostinger Docker template → configure → test" },
        { id:"t3", text:"Connect GLM 4.5 API", done:false, p:"red", note:"$0.35/M input. Test Bahasa Indonesia quality first" },
        { id:"t4", text:"WhatsApp self-hosted (QR scan)", done:false, p:"red", note:"SIM card Indo needed. OpenClaw QR → bot live" },
        { id:"t5", text:"System Prompt — OIC Trader", done:false, p:"red", note:"Chart patterns, SMC/ICT, risk mgmt. Test 50+ convos" },
        { id:"t6", text:"System Prompt — OIC Toko", done:false, p:"yellow", note:"Marketplace auto-reply, ongkir calc, closing" },
        { id:"t7", text:"System Prompt — OIC Beauty", done:false, p:"yellow", note:"Booking, follow-up, product rec. Bestie tone" },
        { id:"t8", text:"Test multimodal (camera → AI)", done:false, p:"yellow", note:"Kimi K2.5 vision. Chart/product/document scanning" },
        { id:"t9", text:"Record end-to-end demo video", done:false, p:"red", note:"Screen record: WA msg → bot process → smart reply" },
      ]
    },
    content: {
      label: "Content Engine", icon: "✧",
      items: [
        { id:"c1", text:"Seedance 2.0 account setup", done:false, p:"red", note:"ByteDance AI video tool. Free tier available" },
        { id:"c2", text:"Generate OIC character images (Midjourney)", done:false, p:"red", note:"Blue cute robot, round face, white eyes. 20+ angles" },
        { id:"c3", text:"5 'Funny Robot' videos", done:false, p:"red", note:"Seedance + refs. 'Apa OIC lakuin kalau kamu nggak lihat'" },
        { id:"c4", text:"Post 3 videos (TikTok + IG)", done:false, p:"red", note:"7-9 PM WIB. Track metrics. Iterate fast" },
        { id:"c5", text:"Content calendar 30 hari", done:false, p:"yellow", note:"15-20 videos. 80% fun / 15% edu / 5% promo" },
        { id:"c6", text:"10 caption templates (Bahasa)", done:false, p:"yellow", note:"Hook + body + CTA. Ready to paste" },
        { id:"c7", text:"Research trending TikTok formats", done:false, p:"yellow", note:"30 min/day FYP scroll. Note sounds & formats" },
      ]
    },
    hardware: {
      label: "Hardware & Supply", icon: "□",
      items: [
        { id:"h1", text:"Order 3x Stack-chan ($237 total)", done:false, p:"red", note:"1 demo, 1 content, 1 backup. Taobao/M5Stack" },
        { id:"h2", text:"Order 5x XiaoZhi ($75-100)", done:false, p:"red", note:"Test shell models. Compare cuteness + quality" },
        { id:"h3", text:"Visit Huaqiangbei Shenzhen", done:false, p:"yellow", note:"Shell, cables, adapters, foam, box suppliers" },
        { id:"h4", text:"Sample 3 shell suppliers", done:false, p:"yellow", note:"5 units each. Evaluate fit, quality, custom options" },
        { id:"h5", text:"500-unit quote (<$12/unit)", done:false, p:"yellow", note:"Compare 2-3 suppliers: MOQ, price, lead time" },
        { id:"h6", text:"Custom shell design + OIC logo", done:false, p:"yellow", note:"3D designer on 猪八戒 (¥500-2000). Blue accent" },
        { id:"h7", text:"Packaging design & sourcing", done:false, p:"yellow", note:"Rigid box, EVA foam, tissue, cards, stickers" },
      ]
    },
    sales: {
      label: "Sales & Outreach", icon: "→",
      items: [
        { id:"s1", text:"Pitch deck 10 slides", done:false, p:"red", note:"Problem → Solution → Demo → Market → Model → CTA" },
        { id:"s2", text:"2-min demo video", done:false, p:"red", note:"WA conversation screen record + voiceover" },
        { id:"s3", text:"One-pager PDF", done:false, p:"yellow", note:"What/why/pricing/contact. Send via WA" },
        { id:"s4", text:"Partnership proposal template", done:false, p:"yellow", note:"For academies. Revenue share 70:30" },
        { id:"s5", text:"List 20 micro-influencers", done:false, p:"yellow", note:"Tech, biz, MUA, trader. 50-500K followers" },
        { id:"s6", text:"Influencer DM template", done:false, p:"green", note:"Short, genuine, include demo link" },
        { id:"s7", text:"Join 5 Indo business communities", done:false, p:"green", note:"Telegram/WA groups. Add value first" },
        { id:"s8", text:"Collect 50 pre-launch leads", done:false, p:"red", note:"Landing page + social + communities + DMs" },
      ]
    },
  },
  memory: [
    { id:"m1", cat:"product", title:"Hardware Strategy", text:"Stack-chan ($79) premium. XiaoZhi ($10-25) standard. Stack-chan first for quality & branding. XiaoZhi for scale Batch 1." },
    { id:"m2", cat:"product", title:"6 Personalities", text:"Trader 📈, Beauty 💄, Tender 🏗️, Toko 🛒, Live 🎬, Kampus 🎓. Each: system prompt + knowledge base + camera + actions." },
    { id:"m3", cat:"product", title:"Secret Recipe (4 Layers)", text:"L1: Base LLM (GLM/MiniMax/Kimi) → L2: System Prompt (secret) → L3: Embedded Knowledge (proprietary) → L4: Partner Content (licensed). Competitors can only copy L1." },
    { id:"m4", cat:"product", title:"Camera = WOW Feature", text:"Kimi K2.5 multimodal. Trader: scan chart → analyze. Beauty: scan face → recommend. Tender: scan doc → extract. Toko: scan product → generate listing." },
    { id:"m5", cat:"tech", title:"Tech Stack", text:"OpenClaw + Hostinger VPS ($14/bln) + Chinese LLMs (GLM $0.35/M, MiniMax $0.39/M, Kimi $0.78/M) + WA self-hosted (free) + Stack-chan/XiaoZhi hardware." },
    { id:"m6", cat:"tech", title:"LLM Cost Advantage", text:"Chinese LLMs 10-50x cheaper than Claude/GPT. GLM 4.5: $0.35/M input. MiniMax M2.5: 80.2% SWE-bench (beats Claude Opus 4.6). Fraction of cost." },
    { id:"m7", cat:"pricing", title:"Pricing Tiers", text:"STARTER: Rp 5M + Rp 2M/bln\nPROFESSIONAL: Rp 8M + Rp 3.5M/bln\nENTERPRISE: Rp 15M + Rp 5M/bln\nLIVE: Rp 5M + Rp 4M/bln" },
    { id:"m8", cat:"pricing", title:"Unit Economics", text:"Hardware: Rp 160-960K\nCloud: Rp 80-200K/bln\nAPI: Rp 30-100K/bln\nWA: Rp 0\nMargin: 90-95% on Rp 2M sub" },
    { id:"m9", cat:"pricing", title:"Partner Revenue Share", text:"70% OIC : 30% Partner. They supply content (strategy/curriculum/catalog), we embed into personality, they get distribution to 500-2000 clients." },
    { id:"m10", cat:"financial", title:"Batch 1 — 500 Units", text:"Revenue: Rp 4.9B\nCosts: Rp 815M\nProfit: Rp 4.08B (83%)\nTimeline: Month 1-8" },
    { id:"m11", cat:"financial", title:"Batch 2 — 2,000 Units", text:"Revenue: Rp 36B\nCosts: Rp 4.1B\nProfit: Rp 31.9B (89%)\nTimeline: Month 9-18" },
    { id:"m12", cat:"financial", title:"18-Month Total", text:"Revenue: Rp 40.9B (~$2.55M)\nCosts: Rp 4.9B\nProfit: Rp 36B (~$2.25M)\n88% margin, 2,500 clients" },
    { id:"m13", cat:"financial", title:"Startup Capital", text:"~Rp 275 juta ($17K) to reach Rp 100M MRR. Break-even: 15 clients. Self-sustaining: 35 clients." },
    { id:"m14", cat:"marketing", title:"Seedance 2.0 Viral", text:"ByteDance AI video (Feb 12, 2026). Character consistency + motion replication. 30 min/video. Near-zero cost." },
    { id:"m15", cat:"marketing", title:"Funny Cat Formula", text:"Robot does human things when owner isn't watching → acts innocent when caught. 6 concepts: Scroll TikTok, Late Night Snack, Playing Games, Singing in Shower, Fashion Show, Job Interview." },
    { id:"m16", cat:"marketing", title:"Content 80/15/5", text:"80% entertainment (funny robot), 15% education (use cases), 5% conversion (promo + link)." },
    { id:"m17", cat:"marketing", title:"10 Juta Challenge", text:"Give OIC 10M. 7 days. Max 2% risk, BTC/ETH, London+NY session. Daily posts incl losses. Result: 10M → 15.3M. DISCLAIMER wajib." },
    { id:"m18", cat:"marketing", title:"Livestream Co-Host", text:"TikTok Shop: auto-FAQ, flash sales, post-stream DM. Twitch/Kick: chat entertainer, trivia, mod." },
    { id:"m19", cat:"marketing", title:"Influencer 3 Tiers", text:"T1: 50 seed (free unit, 3 content). T2: 10 ambassadors (Rp 5-15M). T3: 3-5 co-branded limited editions." },
    { id:"m20", cat:"marketing", title:"Pop-Up Events", text:"Mall (Rp 15-25M), Streaming Event (Rp 30-50M), UMKM Day (Rp 10-15M). Year 1: Rp 255M budget." },
    { id:"m21", cat:"ops", title:"Packaging", text:"Rigid magnetic box + EVA foam + branded tissue + braided USB-C + adapter + anti-slip pad + Quick Start card + booklet + warranty + stickers + thank you card. Rp 60K/unit." },
    { id:"m22", cat:"ops", title:"Hiring Plan", text:"Phase 1 (M1-3): 4 ppl, Rp 23-36M/bln\nPhase 2 (M4-8): 8 ppl, Rp 60-95M/bln\nPhase 3 (M9-14): 15 ppl, Rp 130-200M/bln" },
    { id:"m23", cat:"ops", title:"V2 Hardware", text:"3.5\" touch, 2MP cam, 3W stereo, dual mic, 2000mAh, WiFi 6+BLE, ESP32-P4 400MHz, injection mold shell. $18-25/unit at 2K." },
    { id:"m24", cat:"idea", title:"Wake Word 'Hey OIC'", text:"V2: local processing on ESP32-P4. No cloud latency. Instant response." },
    { id:"m25", cat:"idea", title:"Multi-OIC Office", text:"Multiple units coordinate. Front desk → routes to sales. More units per client = more revenue." },
    { id:"m26", cat:"idea", title:"OIC Mobile App", text:"iOS/Android companion: remote control, logs, settings, dashboard mirror." },
    { id:"m27", cat:"idea", title:"Future Personalities", text:"Q3: Legal, Klinik\nQ4: Properti, Resto\nQ1 2027: Dealer, Studio" },
    { id:"m28", cat:"ops", title:"Design Refs to Steal", text:"rabbit.tech (hardware vibe), teenage.engineering (industrial-playful), nothing.tech (bold dark), Artemis (editorial light), Apple (cinematic scroll)" },
    { id:"m29", cat:"tech", title:"XiaoZhi → Server Connection", text:"ESP32 firmware connects via WebSocket. Set OTA_URL to your VPS. Voice pipeline: VAD→ASR→LLM→TTS. MCP for function calling. Docker deploy on Hostinger." },
    { id:"m30", cat:"tech", title:"OpenClaw Browser Automation", text:"Managed Chromium profile (isolated from personal). Login manually ONCE, sessions persist. CDP protocol. Can control Twitter, Shopee, Tokopedia, any web app." },
    { id:"m31", cat:"tech", title:"Permission System", text:"🟢 Auto: reply WA, analyze, read. 🟡 Notify: post social, send email. 🔴 Approve: spend money, delete, change settings. Defined in system prompt." },
    { id:"m32", cat:"tech", title:"Monthly COGS for 50 clients", text:"VPS $14 + LLM API ~$10 + everything else FREE. Total ~Rp 400K/month. Revenue: Rp 100M+. Margin: 99.6%." },
  ],
  notes: [],
  milestones: [
    { id:"ms1", text:"OpenClaw running + 3 prototypes in hand + first video posted", target:"Day 7", done:false },
    { id:"ms2", text:"7 videos posted + landing page live + 50 leads", target:"Day 21", done:false },
    { id:"ms3", text:"5 pilot clients + team of 3 + supply chain locked", target:"Day 42", done:false },
    { id:"ms4", text:"20 clients + '10 Juta Challenge' viral + Batch 1 ordered", target:"Day 60", done:false },
    { id:"ms5", text:"50 clients + Rp 100M MRR + Batch 1 shipping + team of 4", target:"Day 90", done:false },
  ],
});
