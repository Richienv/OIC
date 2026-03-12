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
        { id:"b1", text:"Finalize nama → OIC", done:false, p:"red", note:"Pick the domain: oic.ai, getoic.com, or oic.id. Register IG/TikTok handles: @oic.ai or @getoic. Need first: nothing — just decide and buy.\n\nDone when: domain purchased, social handles claimed." },
        { id:"b2", text:"Logo variations (dark/light/icon)", done:false, p:"red", note:"From the blue-eye logo: make a favicon (32x32), social profile pic (square), and watermark for videos. Need first: b1 (final name).\n\nDone when: 3 logo files exported (dark bg, light bg, icon-only)." },
        { id:"b3", text:"Brand guidelines document", done:false, p:"yellow", note:"One PDF with colors, fonts, tone rules, logo do/don't, social post templates. This is your 'brand bible' — give it to anyone making content for you. Need first: b1, b2.\n\nDone when: PDF saved, shared with team." },
        { id:"b4", text:"Social media templates (Canva)", done:false, p:"yellow", note:"Make reusable Canva templates for: IG post, IG story, TikTok thumbnail. Blue gradient + white text. Need first: b2, b3.\n\nDone when: 3 templates in Canva, team can duplicate and edit." },
        { id:"b5", text:"Brand story copywriting", done:false, p:"green", note:"Draft is already in the Memory tab. Review it, polish the language, finalize. This goes on the landing page 'About' section.\n\nDone when: final copy approved, ready to paste into landing page." },
      ]
    },
    digital: {
      label: "Landing Page & Digital", icon: "◎",
      items: [
        { id:"d1", text:"Beli domain", done:false, p:"red", note:"For .id domain: Niagahoster (~Rp 200K/year). For .com: Namecheap (~$10/year). Buy both if budget allows.\n\nDone when: domain purchased and DNS accessible." },
        { id:"d2", text:"Claim all social handles", done:false, p:"red", note:"Register on: Instagram, TikTok, YouTube, WhatsApp Business. Use the same username everywhere for consistency. Need first: b1 (final name).\n\nDone when: all 4 accounts created with profile picture." },
        { id:"d3", text:"Design & build landing page", done:false, p:"red", note:"You build this yourself. Study these references: rabbit.tech (hardware vibe), nothing.tech (bold & dark), Artemis (editorial). Key sections: Hero → What is OIC → How it works → Personalities → Pricing → CTA.\n\nDone when: landing page live with all sections." },
        { id:"d4", text:"Deploy ke Vercel + custom domain", done:false, p:"red", note:"Vercel free tier. Steps: connect GitHub repo → import project → add custom domain in Vercel dashboard → update DNS records at your registrar. SSL is automatic.\n\nDone when: yoursite.com loads the landing page with HTTPS." },
        { id:"d5", text:"Pricing section on landing page", done:false, p:"red", note:"Show the 3 tiers clearly: Starter (Rp 5M + Rp 2M/bln), Professional (Rp 8M + Rp 3.5M/bln), Enterprise (Rp 15M + Rp 5M/bln). Include what's in each tier. Need first: d3.\n\nDone when: pricing section visible on landing page." },
        { id:"d6", text:"Analytics (GA4 + Meta Pixel + TikTok Pixel)", done:false, p:"yellow", note:"Each takes ~10 minutes. GA4: create property at analytics.google.com, paste script tag. Meta Pixel: create at business.facebook.com. TikTok: ads.tiktok.com. These let you retarget visitors with ads later.\n\nDone when: all 3 tracking codes installed and verified." },
        { id:"d7", text:"Lead capture form", done:false, p:"red", note:"Add a form to landing page collecting: name, WhatsApp number, city, business type, which personality interests them. Can use Google Forms or build directly into landing page. Need first: d3.\n\nDone when: form submissions arrive in your inbox or spreadsheet." },
        { id:"d8", text:"FAQ section on landing page", done:false, p:"yellow", note:"Answer the 5-10 most common questions people will have: What is OIC? Does it need internet? What language? How much? Can I try first? Write in Bahasa Indonesia, casual tone. Need first: d3.\n\nDone when: FAQ section added to landing page." },
        { id:"d9", text:"Email/WA list for updates", done:false, p:"yellow", note:"Set up a simple way to send updates to leads. Can be a WhatsApp broadcast list or a free email tool like Mailchimp (free up to 500 contacts). Need first: d7 (leads flowing in).\n\nDone when: first test message sent successfully to list." },
      ]
    },
    tech: {
      label: "Server & AI Brain", icon: "⚙",
      items: [
        { id:"t1", text:"Buy Hostinger VPS KVM 2", done:false, p:"red", note:"This is OIC's brain — the cloud computer that runs 24/7. $13.99/month. Pick Singapore location for low latency to Indonesia. Comes with Docker pre-installed.\n\nDone when: VPS is running, you can SSH into it." },
        { id:"t2", text:"Install xiaozhi-server on VPS", done:false, p:"red", note:"xiaozhi-server is the open-source software that connects robots to AI. Steps: SSH into VPS → clone repo → docker compose up. This is the core of everything. Need first: t1.\n\nDone when: xiaozhi-server is running and accessible." },
        { id:"t3", text:"Connect GLM 4.5 API", done:false, p:"red", note:"GLM is the Chinese AI model that does the thinking. $0.35/M tokens (50x cheaper than ChatGPT). Sign up at bigmodel.cn, get API key, paste into xiaozhi-server config. Need first: t2.\n\nDone when: you can send a test message and get a response." },
        { id:"t4", text:"Set up voice engine (FunASR + EdgeTTS)", done:false, p:"red", note:"FunASR converts speech to text (what the robot hears). EdgeTTS converts text to speech (what the robot says). Both are free open-source tools. Install via Docker on same VPS. Need first: t1.\n\nDone when: you can send audio → get text, and send text → get audio." },
        { id:"t5", text:"Get Indonesian SIM card for WhatsApp", done:false, p:"red", note:"You need a real Indonesian phone number to run the WhatsApp bot. Buy a prepaid SIM (Telkomsel/XL). Keep it active with minimum top-up. This number becomes the bot's number.\n\nDone when: SIM card active, WhatsApp installed on a phone with this number." },
        { id:"t6", text:"WhatsApp bot setup (QR scan)", done:false, p:"red", note:"Connect WhatsApp to xiaozhi-server. Open the server dashboard → scan QR code with the bot's WhatsApp → bot goes live. Need first: t2, t5.\n\nDone when: send a test message to the bot number → get AI reply." },
        { id:"t7", text:"System Prompt — OIC Trader", done:false, p:"red", note:"This is the 'personality recipe' for the trading robot. Write instructions for: chart analysis (SMC/ICT patterns), risk management rules, Bahasa Indonesia responses, what it can/can't do. Test with 50+ conversations. Need first: t3.\n\nDone when: trader bot gives consistently good answers in testing." },
        { id:"t8", text:"System Prompt — OIC Toko", done:false, p:"yellow", note:"Personality for online shop owners. Covers: marketplace auto-reply, shipping cost calculator, product recommendations, closing techniques. Need first: t3.\n\nDone when: toko bot handles common customer questions correctly." },
        { id:"t9", text:"System Prompt — OIC Beauty", done:false, p:"yellow", note:"Personality for beauty businesses (MUA, salon, skincare). Covers: appointment booking, skincare recommendations, follow-up messages. Bestie tone. Need first: t3.\n\nDone when: beauty bot handles booking and product questions correctly." },
        { id:"t10", text:"Test camera → AI (multimodal)", done:false, p:"yellow", note:"The robot's camera can see things and the AI can analyze what it sees. Use Kimi K2.5 vision model ($0.78/M tokens). Test: point camera at chart → AI reads patterns. Point at product → AI describes it. Need first: t2, t3.\n\nDone when: camera sends image to AI, AI returns useful analysis." },
        { id:"t11", text:"End-to-end robot voice test", done:false, p:"red", note:"The full loop: speak to robot → robot sends audio to server → server converts to text → AI thinks → server converts response to speech → robot speaks back. This is the moment of truth. Need first: t2, t3, t4, and a robot (h1 or h2).\n\nDone when: you speak to the robot and it answers correctly out loud." },
        { id:"t12", text:"Record end-to-end demo video", done:false, p:"red", note:"Screen record showing the full flow: someone sends a WhatsApp message → the bot processes it → sends a smart reply. This video is for your pitch deck and landing page. Need first: t6, t7.\n\nDone when: 2-minute video recorded and saved." },
        { id:"t13", text:"Server monitoring & alerts", done:false, p:"yellow", note:"Set up basic monitoring so you know if the server goes down. Simple option: UptimeRobot (free, checks every 5 min, sends email/WA alert). Need first: t2.\n\nDone when: you get an alert when server is manually stopped, and an 'up' alert when it restarts." },
      ]
    },
    content: {
      label: "Content & Marketing", icon: "✧",
      items: [
        { id:"c1", text:"Seedance 2.0 account setup", done:false, p:"red", note:"ByteDance's AI video generator (released Feb 12, 2026). Create account, explore free tier. This tool makes near-zero-cost video content with consistent characters.\n\nDone when: account created, first test video generated." },
        { id:"c2", text:"Generate OIC character images", done:false, p:"red", note:"Use Midjourney or similar AI image tool. Generate 20+ images of the blue cute robot character from different angles and scenarios. This becomes your visual identity across all content.\n\nDone when: 20+ character images saved, consistent look across all." },
        { id:"c3", text:"Record real robot demo video", done:false, p:"red", note:"Film the actual physical robot in action: someone talks to it, it responds. Show it on a desk, in a shop, at home. This proves it's REAL, not just animation. Need first: t11 (working robot).\n\nDone when: 60-second video of real robot conversation recorded." },
        { id:"c4", text:"5 'Funny Robot' videos", done:false, p:"red", note:"Short fun videos using Seedance + character images. Concept: 'What OIC does when you're not looking.' Robot scrolling TikTok, doing fashion show, singing, etc. Need first: c1, c2.\n\nDone when: 5 videos rendered and ready to post." },
        { id:"c5", text:"Post first 3 videos (TikTok + IG)", done:false, p:"red", note:"Post between 7-9 PM WIB (peak Indonesia social media time). Track views, likes, shares. Learn what works, iterate fast. Need first: c4, d2.\n\nDone when: 3 videos posted, initial metrics recorded." },
        { id:"c6", text:"Content calendar 30 hari", done:false, p:"yellow", note:"Plan 15-20 videos for the first month. Mix: 80% entertainment (funny robot), 15% education (how OIC helps businesses), 5% promo (link to landing page). Need first: c5 (learn from first posts).\n\nDone when: 30-day calendar in spreadsheet with dates, topics, formats." },
        { id:"c7", text:"10 caption templates (Bahasa)", done:false, p:"yellow", note:"Pre-written captions you can reuse. Each has: hook (first line that stops scrolling), body (the value), CTA (what to do next). In natural Bahasa Indonesia.\n\nDone when: 10 templates saved, ready to copy-paste." },
        { id:"c8", text:"Research trending TikTok formats", done:false, p:"yellow", note:"Spend 30 min/day scrolling FYP. Note which sounds are trending, which video formats get views in Indonesia. Save examples. This keeps your content fresh and relevant.\n\nDone when: ongoing habit, but start with 10 saved references." },
      ]
    },
    hardware: {
      label: "Robot & Assembly", icon: "□",
      items: [
        { id:"h1", text:"Order 3x Stack-chan ($237 total)", done:false, p:"red", note:"Stack-chan is the premium robot body ($79 each). Order 3: one for demos, one for content/filming, one as backup. Buy from Taobao or M5Stack official store.\n\nDone when: order confirmed, tracking number received." },
        { id:"h2", text:"Order 5x XiaoZhi ($75-100 total)", done:false, p:"red", note:"XiaoZhi is the budget robot body ($15-20 each). Same brain, simpler body. For testing shell options and scaling later. Buy from Taobao.\n\nDone when: order confirmed, tracking number received." },
        { id:"h3", text:"Flash firmware to robot", done:false, p:"red", note:"When robots arrive, you need to install the xiaozhi firmware on them. Steps: connect robot to computer via USB → download flash tool → select firmware file → flash. Detailed guide on xiaozhi GitHub wiki. Need first: h1 or h2 (robot arrived), t2 (server ready).\n\nDone when: robot turns on and connects to your server." },
        { id:"h4", text:"Full QA checklist per robot", done:false, p:"yellow", note:"Before giving a robot to any client, test everything: microphone works, speaker works, camera works, WiFi connects, voice response works, WhatsApp integration works. Create a checklist you can reuse. Need first: h3, t11.\n\nDone when: written checklist with pass/fail for each feature, tested on one robot." },
        { id:"h5", text:"Write Quick Start guide for clients", done:false, p:"yellow", note:"A simple card or booklet that goes in the box. Steps for client: 1. Plug in, 2. Connect to WiFi (how), 3. Say 'Hello OIC', 4. Done. No technical jargon. Include QR code to support WhatsApp. Need first: h3 (you've done it yourself first).\n\nDone when: one-page guide designed, ready to print." },
        { id:"h6", text:"Visit Huaqiangbei Shenzhen", done:false, p:"yellow", note:"The world's biggest electronics market. Go in person to find suppliers for: custom shells, USB-C cables, power adapters, packaging foam, boxes. Compare prices, get samples. Budget for trip: ~$500.\n\nDone when: 3+ supplier contacts saved, sample orders placed." },
        { id:"h7", text:"Sample 3 shell suppliers", done:false, p:"yellow", note:"Order 5 units from each of 3 different shell suppliers. Compare: how well they fit the robot, build quality, color accuracy, custom logo options. Need first: h6.\n\nDone when: 15 sample shells received, best supplier chosen." },
        { id:"h8", text:"500-unit quote (<$12/unit)", done:false, p:"yellow", note:"Get a bulk price quote from your chosen supplier for 500 custom shells with OIC logo. Compare 2-3 suppliers on: price per unit, minimum order, lead time, payment terms. Need first: h7.\n\nDone when: written quotes from 2+ suppliers, best one selected." },
        { id:"h9", text:"Packaging design & sourcing", done:false, p:"yellow", note:"Design the unboxing experience: rigid magnetic box, EVA foam insert, branded tissue paper, braided USB-C cable, power adapter, anti-slip pad, Quick Start card, warranty card, stickers. Target: ~Rp 60K/unit at volume. Need first: h5 (Quick Start content).\n\nDone when: packaging prototype assembled, cost per unit calculated." },
        { id:"h10", text:"Shipping & logistics plan", done:false, p:"yellow", note:"Figure out how robots get from you to clients. Options: JNE/J&T for domestic Indonesia, personal delivery for Jakarta area, freight shipping from China if ordering bulk. Calculate shipping cost per unit. Need first: h9 (know the box size/weight).\n\nDone when: shipping partners selected, cost per unit known, tracking system decided." },
      ]
    },
    sales: {
      label: "Sales & Clients", icon: "→",
      items: [
        { id:"s1", text:"Validate pricing with 10 people", done:false, p:"red", note:"Before building everything, ask 10 real business owners: 'Would you pay Rp 5M + Rp 2M/month for this?' Show them the demo video. Listen to objections. Adjust if needed. This prevents building something nobody will buy.\n\nDone when: 10 conversations done, pricing confirmed or adjusted." },
        { id:"s2", text:"Pitch deck 10 slides", done:false, p:"red", note:"Slides: 1. Problem, 2. Solution (OIC), 3. Demo video, 4. How it works, 5. Personalities, 6. Market size, 7. Business model, 8. Traction, 9. Team, 10. CTA. Keep it visual, minimal text.\n\nDone when: deck exported as PDF, ready to present." },
        { id:"s3", text:"2-min demo video", done:false, p:"red", note:"Screen record showing: WhatsApp message comes in → bot processes → sends smart reply. Add voiceover explaining what's happening. This is your #1 sales tool. Need first: t12.\n\nDone when: polished 2-min video with voiceover saved." },
        { id:"s4", text:"One-pager PDF", done:false, p:"yellow", note:"Single page with: what OIC is, why it matters, pricing, your contact info. Send via WhatsApp to potential clients after first conversation.\n\nDone when: PDF designed and ready to share." },
        { id:"s5", text:"Set up payment method", done:false, p:"red", note:"How will clients pay you? Options: bank transfer (BCA/Mandiri), QRIS, or payment link (Xendit/Midtrans — Indonesian payment gateways). Set up at least bank transfer + one digital option.\n\nDone when: payment details ready to share with clients, test payment received." },
        { id:"s6", text:"Client contract template", done:false, p:"yellow", note:"Simple agreement covering: what client gets, pricing, payment terms, cancellation policy, what's not included. Doesn't need to be fancy — even a clean Google Doc works. Protects both sides.\n\nDone when: template reviewed, ready to fill in client name and send." },
        { id:"s7", text:"Client onboarding flow", done:false, p:"red", note:"Step-by-step process after client pays: 1. Collect their business info, 2. Set up their personality, 3. Configure WhatsApp, 4. Ship/deliver robot, 5. Help them connect to WiFi, 6. First call to confirm working. Write this down so it's repeatable.\n\nDone when: onboarding checklist written, tested with first client." },
        { id:"s8", text:"Partnership proposal template", done:false, p:"yellow", note:"For industry experts/academies. They provide content (trading strategies, beauty routines, etc.), you embed it into OIC personality, they get 30% of revenue from that personality. Win-win.\n\nDone when: proposal template ready with revenue share terms." },
        { id:"s9", text:"List 20 micro-influencers", done:false, p:"yellow", note:"Find 20 Indonesian influencers (50K-500K followers) in: tech, business, beauty, trading. These are potential seed users or ambassadors. Note their handle, follower count, niche.\n\nDone when: spreadsheet with 20 influencers and contact info." },
        { id:"s10", text:"Join 5 Indo business communities", done:false, p:"green", note:"Find active Telegram/WhatsApp groups for Indonesian entrepreneurs, traders, UMKM owners. Join and add value first (help people, share insights) before promoting OIC.\n\nDone when: active member in 5 groups, people know your name." },
        { id:"s11", text:"Collect 50 pre-launch leads", done:false, p:"red", note:"Get 50 people who say 'I'm interested.' From: landing page form, social media DMs, community posts, influencer referrals. These are your first potential clients. Need first: d3, d7.\n\nDone when: 50 names + WhatsApp numbers in your spreadsheet." },
        { id:"s12", text:"Set up client support channel", done:false, p:"yellow", note:"How will clients reach you when something breaks? Options: dedicated WhatsApp number, WhatsApp group per client, or simple ticketing (Google Forms → Sheet). Start simple, upgrade later.\n\nDone when: support process documented, test message handled successfully." },
      ]
    },
    ideas: {
      label: "Ideas & Backlog", icon: "💡",
      items: []
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
