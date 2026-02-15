import { useState, useEffect, useRef } from "react";
import storage from "./storage";

// ─── OIC: Open Intelligence Companion ───
// Mobile-first dashboard. Collapsible everything. Fast access.

const CREAM = "#F7F3EE";
const NAVY = "#1B2541";
const ACCENT = "#0EA5E9";
const WARM = "#E8E0D4";
const SUBTLE = "#9B917F";
const WHITE = "#FFFFFF";
const RED = "#C0392B";
const YELLOW = "#C89B2A";
const GREEN = "#2D6A4F";

// ═══ ALL DATA ═══
const getDefault = () => ({
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

const PC = { red: RED, yellow: YELLOW, green: GREEN };
const CC = { product:"#1B2541", tech:"#2D6A4F", pricing:"#B8860B", financial:"#8B3A62", marketing:"#5B4A8A", ops:"#8B5E3C", idea:"#2D7D9A" };
const CL = { product:"Product", tech:"Tech", pricing:"Pricing", financial:"Financial", marketing:"Marketing", ops:"Operations", idea:"Ideas" };

export default function App() {
  const [d, setD] = useState(getDefault);
  const [tab, setTab] = useState("home");
  const [open, setOpen] = useState({});
  const [memOpen, setMemOpen] = useState({});
  const [memCat, setMemCat] = useState("all");
  const [search, setSearch] = useState("");
  const [noteText, setNoteText] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await storage.get("oic-dash-v4");
        if (r?.value) setD(JSON.parse(r.value));
      } catch(e) {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => { try { await storage.set("oic-dash-v4", JSON.stringify(d)); } catch(e) {} })();
  }, [d, loaded]);

  const toggle = (track, id) => {
    setD(p => ({...p, todos:{...p.todos, [track]:{...p.todos[track], items: p.todos[track].items.map(t => t.id===id ? {...t,done:!t.done}:t)}}}));
  };
  const toggleMilestone = (id) => {
    setD(p => ({...p, milestones: p.milestones.map(m => m.id===id ? {...m,done:!m.done}:m)}));
  };
  const addNote = () => {
    if (!noteText.trim()) return;
    setD(p => ({...p, notes: [{id:`n${Date.now()}`, text:noteText.trim(), time: new Date().toLocaleString('id-ID',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}, ...p.notes]}));
    setNoteText("");
  };
  const deleteNote = (id) => setD(p => ({...p, notes: p.notes.filter(n => n.id !== id)}));

  const all = Object.entries(d.todos).flatMap(([k,v]) => v.items.map(i=>({...i,track:k})));
  const total = all.length;
  const done = all.filter(t=>t.done).length;
  const pct = total ? Math.round((done/total)*100) : 0;
  const critical = all.filter(t=>!t.done && t.p==="red");

  const filteredMem = d.memory.filter(m =>
    (memCat==="all" || m.cat===memCat) &&
    (!search || m.title.toLowerCase().includes(search.toLowerCase()) || m.text.toLowerCase().includes(search.toLowerCase()))
  );

  const Sec = ({id, title, badge, children, defaultOpen}) => {
    const isOpen = open[id] ?? defaultOpen;
    return (
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => setOpen(p=>({...p,[id]:!isOpen}))} style={{
          width:"100%", padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center",
          background: WHITE, border:"none", borderRadius: isOpen ? "14px 14px 0 0" : 14,
          cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
          boxShadow: "0 1px 2px rgba(0,0,0,.03)",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:15, fontWeight:600, color:NAVY }}>{title}</span>
            {badge !== undefined && <span style={{
              fontSize:11, fontFamily:"'DM Mono',monospace", background:`${NAVY}0A`,
              padding:"2px 8px", borderRadius:8, color:SUBTLE,
            }}>{badge}</span>}
          </div>
          <span style={{ fontSize:18, color:SUBTLE, transition:"transform .2s", transform: isOpen?"rotate(180deg)":"" }}>⌄</span>
        </button>
        {isOpen && (
          <div style={{ background:WHITE, borderRadius:"0 0 14px 14px", padding:"4px 0 8px", boxShadow:"0 1px 2px rgba(0,0,0,.03)" }}>
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ background:CREAM, minHeight:"100vh", color:NAVY, fontFamily:"'DM Sans',sans-serif", paddingBottom:72 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,700;1,400;1,600&family=DM+Mono:wght@400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:${CREAM}}
        ::selection{background:${NAVY};color:${CREAM}}
        input,textarea{font-family:'DM Sans',sans-serif}
      `}</style>

      {/* ═══ HEADER ═══ */}
      <div style={{ padding:"16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{
            width:36, height:36, borderRadius:11,
            background:"linear-gradient(135deg,#0EA5E9,#7DD3FC)",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 2px 8px rgba(14,165,233,.2)",
          }}>
            <div style={{ display:"flex", gap:4 }}>
              <div style={{ width:5, height:7, background:"rgba(255,255,255,.9)", borderRadius:3 }} />
              <div style={{ width:5, height:7, background:"rgba(255,255,255,.9)", borderRadius:3 }} />
            </div>
          </div>
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:18 }}>OIC</div>
            <div style={{ fontSize:10, color:SUBTLE, letterSpacing:1.5 }}>Open Intelligence Companion</div>
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:24, fontWeight:700, fontFamily:"'DM Mono',monospace", color:NAVY }}>{pct}%</div>
          <div style={{ fontSize:10, color:SUBTLE }}>{done}/{total} done</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding:"0 16px 16px" }}>
        <div style={{ height:5, background:`${WARM}80`, borderRadius:3, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${ACCENT},#7DD3FC)`, borderRadius:3, transition:"width .6s" }} />
        </div>
      </div>

      <div style={{ padding:"0 12px" }}>

        {/* ═══ HOME ═══ */}
        {tab === "home" && (
          <>
            {/* Quick Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:12 }}>
              {[
                { n:critical.length, l:"Critical", c:RED },
                { n:d.milestones.filter(m=>!m.done).length, l:"Milestones", c:YELLOW },
                { n:d.notes.length, l:"Notes", c:ACCENT },
              ].map((s,i) => (
                <div key={i} style={{ background:WHITE, borderRadius:14, padding:"14px 12px", textAlign:"center", boxShadow:"0 1px 2px rgba(0,0,0,.03)" }}>
                  <div style={{ fontSize:22, fontWeight:700, fontFamily:"'DM Mono',monospace", color:s.c }}>{s.n}</div>
                  <div style={{ fontSize:10, color:SUBTLE, letterSpacing:1 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Milestones */}
            <Sec id="milestones" title="🎯 Milestones" badge={`${d.milestones.filter(m=>m.done).length}/${d.milestones.length}`} defaultOpen={true}>
              {d.milestones.map(m => (
                <div key={m.id} onClick={() => toggleMilestone(m.id)} style={{
                  display:"flex", gap:12, alignItems:"flex-start", padding:"10px 16px", cursor:"pointer",
                  opacity: m.done ? .45 : 1,
                }}>
                  <div style={{
                    width:20, height:20, borderRadius:"50%", flexShrink:0, marginTop:1,
                    border:`2px solid ${m.done ? GREEN : WARM}`,
                    background: m.done ? GREEN : "transparent",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:10, color:"#fff",
                  }}>{m.done && "✓"}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:500, textDecoration: m.done ? "line-through" : "none" }}>{m.text}</div>
                    <div style={{ fontSize:11, color:SUBTLE, fontFamily:"'DM Mono',monospace" }}>{m.target}</div>
                  </div>
                </div>
              ))}
            </Sec>

            {/* Critical Tasks */}
            <Sec id="critical" title="🔴 Do First" badge={critical.length} defaultOpen={true}>
              {critical.slice(0,6).map(t => (
                <div key={t.id} onClick={() => toggle(t.track, t.id)} style={{
                  display:"flex", gap:10, alignItems:"center", padding:"10px 16px", cursor:"pointer",
                }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${WARM}`, flexShrink:0 }} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:500 }}>{t.text}</div>
                    <div style={{ fontSize:10, color:SUBTLE }}>{d.todos[t.track].label}</div>
                  </div>
                </div>
              ))}
              {critical.length > 6 && <div style={{ padding:"8px 16px", fontSize:12, color:ACCENT, fontWeight:500 }}>+{critical.length - 6} more →</div>}
            </Sec>

            {/* Quick Notes */}
            <Sec id="notes" title="📝 Quick Notes" badge={d.notes.length} defaultOpen={true}>
              <div style={{ padding:"8px 16px" }}>
                <div style={{ display:"flex", gap:8 }}>
                  <input value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Tulis ide, reminder, catatan..."
                    onKeyDown={e => e.key === "Enter" && addNote()}
                    style={{
                      flex:1, padding:"10px 14px", background:CREAM, border:`1px solid ${WARM}`,
                      borderRadius:10, fontSize:13, color:NAVY, outline:"none",
                    }}
                  />
                  <button onClick={addNote} style={{
                    padding:"10px 16px", background:NAVY, color:CREAM, border:"none",
                    borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer",
                  }}>+</button>
                </div>
              </div>
              {d.notes.map(n => (
                <div key={n.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"8px 16px" }}>
                  <div>
                    <div style={{ fontSize:13, color:NAVY }}>{n.text}</div>
                    <div style={{ fontSize:10, color:SUBTLE }}>{n.time}</div>
                  </div>
                  <button onClick={() => deleteNote(n.id)} style={{ background:"none", border:"none", color:SUBTLE, cursor:"pointer", fontSize:14, padding:"2px 6px" }}>×</button>
                </div>
              ))}
              {d.notes.length === 0 && <div style={{ padding:"12px 16px", fontSize:12, color:SUBTLE, fontStyle:"italic" }}>Belum ada catatan</div>}
            </Sec>

            {/* Track Overview */}
            <Sec id="tracks" title="📊 All Tracks" defaultOpen={false}>
              {Object.entries(d.todos).map(([k,v]) => {
                const dn = v.items.filter(t=>t.done).length;
                const p = Math.round((dn/v.items.length)*100);
                return (
                  <div key={k} onClick={() => {setTab("tasks"); setOpen(pr=>({...pr,[k]:true}));}} style={{
                    display:"flex", alignItems:"center", gap:12, padding:"10px 16px", cursor:"pointer",
                  }}>
                    <span style={{ fontSize:14, width:20, textAlign:"center", color:SUBTLE }}>{v.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                        <span style={{ fontSize:13, fontWeight:500 }}>{v.label}</span>
                        <span style={{ fontSize:11, fontFamily:"'DM Mono',monospace", color:SUBTLE }}>{dn}/{v.items.length}</span>
                      </div>
                      <div style={{ height:3, background:`${WARM}60`, borderRadius:2, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${p}%`, background:NAVY, borderRadius:2 }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Sec>
          </>
        )}

        {/* ═══ TASKS ═══ */}
        {tab === "tasks" && (
          <>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontStyle:"italic", fontWeight:700, padding:"4px 4px 14px" }}>Tasks</h2>
            {Object.entries(d.todos).map(([k, v]) => {
              const dn = v.items.filter(t=>t.done).length;
              const isOpen = open[k] ?? false;
              return (
                <div key={k} style={{ marginBottom:8 }}>
                  <button onClick={() => setOpen(p=>({...p,[k]:!isOpen}))} style={{
                    width:"100%", padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center",
                    background:WHITE, border:"none", borderRadius: isOpen ? "14px 14px 0 0" : 14,
                    cursor:"pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 1px 2px rgba(0,0,0,.03)",
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ color:SUBTLE }}>{v.icon}</span>
                      <span style={{ fontSize:14, fontWeight:600 }}>{v.label}</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:11, fontFamily:"'DM Mono',monospace", color: dn===v.items.length ? GREEN : SUBTLE }}>{dn}/{v.items.length}</span>
                      <span style={{ fontSize:18, color:SUBTLE, transition:"transform .2s", transform:isOpen?"rotate(180deg)":"" }}>⌄</span>
                    </div>
                  </button>
                  {isOpen && (
                    <div style={{ background:WHITE, borderRadius:"0 0 14px 14px", boxShadow:"0 1px 2px rgba(0,0,0,.03)" }}>
                      {v.items.map(t => {
                        const noteOpen = open[`note-${t.id}`];
                        return (
                          <div key={t.id} style={{ borderTop:`1px solid ${CREAM}` }}>
                            <div style={{ display:"flex", alignItems:"center", padding:"12px 16px", gap:10 }}>
                              <div onClick={() => toggle(k, t.id)} style={{
                                width:22, height:22, borderRadius:"50%", flexShrink:0, cursor:"pointer",
                                border:`2px solid ${t.done ? GREEN : PC[t.p]+"60"}`,
                                background: t.done ? GREEN : "transparent",
                                display:"flex", alignItems:"center", justifyContent:"center",
                                fontSize:11, color:"#fff", transition:"all .2s",
                              }}>{t.done && "✓"}</div>
                              <div style={{ flex:1, cursor:"pointer" }} onClick={() => setOpen(p=>({...p,[`note-${t.id}`]:!noteOpen}))}>
                                <div style={{ fontSize:13, fontWeight:500, color: t.done ? SUBTLE : NAVY, textDecoration: t.done ? "line-through" : "none" }}>
                                  {t.text}
                                  <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background:PC[t.p], marginLeft:6, verticalAlign:"middle" }} />
                                </div>
                              </div>
                              <span onClick={() => setOpen(p=>({...p,[`note-${t.id}`]:!noteOpen}))} style={{
                                fontSize:16, color:SUBTLE, cursor:"pointer",
                                transform: noteOpen ? "rotate(180deg)" : "", transition:"transform .2s",
                              }}>⌄</span>
                            </div>
                            {noteOpen && t.note && (
                              <div style={{ padding:"0 16px 12px 48px", fontSize:12, color:SUBTLE, lineHeight:1.5, whiteSpace:"pre-line" }}>{t.note}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* ═══ ARCHITECTURE ═══ */}
        {tab === "arch" && (
          <>
            <div style={{ marginBottom:20 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontStyle:"italic", fontWeight:700, padding:"4px 4px 6px" }}>Architecture</h2>
              <p style={{ fontSize:13, color:SUBTLE, padding:"0 4px" }}>How everything connects. Your technical blueprint.</p>
            </div>

            <Sec id="arch-overview" title="🏗️ System Overview" defaultOpen={true}>
              <div style={{ padding:"8px 16px 14px", fontFamily:"'DM Mono',monospace", fontSize:10, lineHeight:1.6, color:NAVY, overflowX:"auto" }}>
                <pre style={{ whiteSpace:"pre", margin:0 }}>{`┌───────────────────────────────────┐
│         USER (Indonesia)          │
│  WhatsApp · Voice · Camera        │
└───────────┬───────────────────────┘
            │
            ▼
┌───────────────────────────────────┐
│    XiaoZhi / Stack-chan ROBOT     │
│  ESP32-S3 · Mic · Speaker · Cam  │
│  Wake word: "Hey OIC" (local)    │
│  WiFi → WebSocket to server      │
└───────────┬───────────────────────┘
            │ WebSocket
            ▼
┌───────────────────────────────────┐
│   YOUR VPS (Hostinger $14/bln)   │
│                                   │
│  ┌─────────────────────────────┐  │
│  │  xiaozhi-esp32-server       │  │
│  │  VAD → ASR → LLM → TTS     │  │
│  │  + MCP + Function Calling   │  │
│  └──────┬──────────────────────┘  │
│         │                         │
│  ┌──────▼──────────────────────┐  │
│  │  OpenClaw Agent Framework   │  │
│  │  • Browser (CDP)            │  │
│  │  • WhatsApp (free QR)       │  │
│  │  • Skills + MCP servers     │  │
│  │  • Persistent memory        │  │
│  └──────┬──────────────────────┘  │
│         │                         │
│  ┌──────▼──────────────────────┐  │
│  │  Managed Browser (Chromium) │  │
│  │  Twitter · Shopee · Tokped  │  │
│  │  Any web app w/ session     │  │
│  └─────────────────────────────┘  │
└───────────┬───────────────────────┘
            │ API calls
            ▼
┌───────────────────────────────────┐
│       CHINESE LLM APIs           │
│  GLM ($0.35) · MiniMax · Kimi    │
│  + TTS (EdgeTTS free)            │
│  + ASR (FunASR local free)       │
└───────────────────────────────────┘`}</pre>
              </div>
            </Sec>

            <Sec id="arch-robot" title="🤖 How Robot Connects" defaultOpen={false}>
              <div style={{ padding:"8px 16px 14px", fontSize:13, color:"#6B6155", lineHeight:1.7 }}>
                <p style={{ marginBottom:8 }}><strong>XiaoZhi ESP32 → Your Server</strong></p>
                <p style={{ marginBottom:8 }}>XiaoZhi runs open-source firmware (MIT). Default connects to xiaozhi.me, but you point it to YOUR VPS.</p>
                <p style={{ marginBottom:4, fontWeight:600, color:NAVY }}>Setup:</p>
                <p style={{ marginBottom:3 }}>1. Flash firmware via ESP Flash Tool (5 min)</p>
                <p style={{ marginBottom:3 }}>2. Robot boots → WiFi hotspot → configure WiFi</p>
                <p style={{ marginBottom:3 }}>3. Set OTA_URL: <code style={{ background:CREAM, padding:"1px 5px", borderRadius:4, fontSize:11, fontFamily:"'DM Mono',monospace" }}>http://your-vps:8002</code></p>
                <p style={{ marginBottom:3 }}>4. Robot connects via WebSocket → voice pipeline runs on server</p>
                <p style={{ marginTop:10, marginBottom:4, fontWeight:600, color:NAVY }}>Robot handles locally:</p>
                <p style={{ marginBottom:2 }}>Wake word "Hey OIC" · Audio record/play · Camera capture · Screen display · LED/servo (V2)</p>
                <p style={{ marginTop:10, marginBottom:4, fontWeight:600, color:NAVY }}>Server handles:</p>
                <p style={{ marginBottom:2 }}>ASR (speech→text) · LLM (reasoning) · TTS (text→speech) · Function calling · MCP tools</p>
              </div>
            </Sec>

            <Sec id="arch-server" title="⚙️ XiaoZhi Server Setup" defaultOpen={false}>
              <div style={{ padding:"8px 16px 14px", fontSize:13, color:"#6B6155", lineHeight:1.7 }}>
                <p style={{ marginBottom:6, fontWeight:600, color:NAVY }}>Docker Install:</p>
                <div style={{ background:CREAM, borderRadius:8, padding:"8px 12px", fontFamily:"'DM Mono',monospace", fontSize:10, marginBottom:10 }}>
                  <div>curl -L -o setup.sh \</div>
                  <div>  https://raw.githubusercontent.com/xinnan-tech/</div>
                  <div>  xiaozhi-esp32-server/main/docker-setup.sh</div>
                  <div>chmod +x setup.sh && ./setup.sh</div>
                </div>
                <p style={{ marginBottom:6, fontWeight:600, color:NAVY }}>Voice Pipeline:</p>
                <div style={{ background:CREAM, borderRadius:8, padding:"6px 12px", fontFamily:"'DM Mono',monospace", fontSize:10, marginBottom:10 }}>
                  Speak → VAD → ASR → LLM (your prompt) → TTS → Robot speaks
                </div>
                <p style={{ marginBottom:6, fontWeight:600, color:NAVY }}>LLM Config (GLM 4.5):</p>
                <div style={{ background:CREAM, borderRadius:8, padding:"8px 12px", fontFamily:"'DM Mono',monospace", fontSize:10, marginBottom:8, whiteSpace:"pre-wrap" }}>{`selected_module:
  llm: openai  # GLM uses OpenAI-compat API
llm:
  openai:
    api_key: "your-glm-key"
    base_url: "https://open.bigmodel.cn/api/paas/v4"
    model: "glm-4-flash"
    system_prompt: |
      Kamu adalah OIC Trader...
      [SYSTEM PROMPT LENGKAP]`}</div>
                <p style={{ fontSize:11, color:SUBTLE }}>Any OpenAI-compatible LLM works: GLM, MiniMax, Kimi, DeepSeek, Qwen</p>
              </div>
            </Sec>

            <Sec id="arch-openclaw" title="🦞 OpenClaw Agent Layer" defaultOpen={false}>
              <div style={{ padding:"8px 16px 14px", fontSize:13, color:"#6B6155", lineHeight:1.7 }}>
                <p style={{ marginBottom:6 }}>Runs ON TOP of xiaozhi-server. Gives OIC superpowers: browser, WhatsApp, email, skills.</p>
                <div style={{ background:CREAM, borderRadius:8, padding:"8px 12px", fontFamily:"'DM Mono',monospace", fontSize:11, marginBottom:10 }}>
                  curl -fsSL https://clawd.bot/install.sh | bash
                </div>
                <p style={{ marginBottom:3 }}>• <strong>Gateway</strong> — always-on, routes messages</p>
                <p style={{ marginBottom:3 }}>• <strong>Agent Runtime</strong> — reasoning + tool execution</p>
                <p style={{ marginBottom:3 }}>• <strong>Skills</strong> — browser, WA, email, calendar, MCP</p>
                <p style={{ marginTop:8, marginBottom:4, fontWeight:600, color:NAVY }}>Flow example:</p>
                <div style={{ background:CREAM, borderRadius:8, padding:"8px 12px", fontFamily:"'DM Mono',monospace", fontSize:10, marginBottom:6, whiteSpace:"pre-wrap" }}>{`User: "OIC, cek harga iPhone di Tokopedia"
→ ASR → LLM detects intent: search
→ MCP call: browser.open("tokopedia.com")
→ OpenClaw searches, extracts price
→ LLM formats response → TTS
→ "iPhone 16 mulai Rp 15.999.000"`}</div>
              </div>
            </Sec>

            <Sec id="arch-browser" title="🌐 Browser Automation (Key!)" defaultOpen={false}>
              <div style={{ padding:"8px 16px 14px", fontSize:13, color:"#6B6155", lineHeight:1.7 }}>
                <p style={{ marginBottom:8 }}>HOW OIC has its own accounts, browses, buys, posts.</p>
                <p style={{ marginBottom:6, fontWeight:600, color:NAVY }}>Give OIC a Twitter account:</p>
                <div style={{ background:CREAM, borderRadius:8, padding:"8px 12px", fontFamily:"'DM Mono',monospace", fontSize:10, marginBottom:10, whiteSpace:"pre-wrap" }}>{`# Start OIC's isolated browser
openclaw browser --browser-profile openclaw start

# Open Twitter - YOU log in once manually
openclaw browser open https://twitter.com/login
# Session saved! Survives restart.

# Now agent can post anytime:
openclaw browser open https://twitter.com/compose
openclaw browser type 1 "Market update 📊"
openclaw browser click 3  # tweet`}</div>
                <p style={{ marginBottom:6, fontWeight:600, color:NAVY }}>Give OIC a Shopee seller account:</p>
                <div style={{ background:CREAM, borderRadius:8, padding:"8px 12px", fontFamily:"'DM Mono',monospace", fontSize:10, marginBottom:10, whiteSpace:"pre-wrap" }}>{`# Same: log in once, OIC remembers
openclaw browser open https://seller.shopee.co.id
# Manual login → OIC can now:
# Check orders, reply chats, update listings`}</div>
                <p style={{ marginBottom:4, fontWeight:600, color:RED }}>⚠️ Safety rules:</p>
                <p style={{ marginBottom:2 }}>• NEVER auto-pay without your confirm</p>
                <p style={{ marginBottom:2 }}>• One browser profile per account</p>
                <p style={{ marginBottom:2 }}>• Twitter anti-bot: use "host" mode for posting</p>
                <p style={{ marginBottom:2 }}>• Sessions persist but may expire → re-login</p>
              </div>
            </Sec>

            <Sec id="arch-wa" title="💬 WhatsApp Bot (Free)" defaultOpen={false}>
              <div style={{ padding:"8px 16px 14px", fontSize:13, color:"#6B6155", lineHeight:1.7 }}>
                <p style={{ marginBottom:3 }}>1. OpenClaw generates QR code</p>
                <p style={{ marginBottom:3 }}>2. Scan with WA on phone (like WA Web)</p>
                <p style={{ marginBottom:3 }}>3. Bot intercepts incoming messages</p>
                <p style={{ marginBottom:3 }}>4. Passes to LLM with system prompt</p>
                <p style={{ marginBottom:3 }}>5. LLM replies → sends via WA</p>
                <p style={{ marginBottom:3 }}>6. Can send images, docs, voice notes</p>
                <p style={{ marginTop:8, fontSize:11, color:SUBTLE }}>Need: Indo SIM card · VPS always-on · Re-scan QR ~every 2 weeks</p>
              </div>
            </Sec>

            <Sec id="arch-skills" title="🧩 Skills System" defaultOpen={false}>
              <div style={{ padding:"8px 16px 14px", fontSize:13, color:"#6B6155", lineHeight:1.7 }}>
                <p style={{ marginBottom:6, fontWeight:600, color:NAVY }}>Built-in:</p>
                <p style={{ marginBottom:2 }}>🌐 Browser · 💬 WhatsApp · 📧 Email · 📅 Calendar · 📂 Files · 🖥️ Shell · 🧠 Memory</p>
                <p style={{ marginTop:8, marginBottom:6, fontWeight:600, color:NAVY }}>Per personality:</p>
                <p style={{ marginBottom:2 }}>📈 Trader: price data, position calc, chart scan, alerts, exchange API</p>
                <p style={{ marginBottom:2 }}>💄 Beauty: auto-book, follow-up WA, product recs</p>
                <p style={{ marginBottom:2 }}>🛒 Toko: Shopee orders, reply chats, ongkir, update listings</p>
                <p style={{ marginBottom:2 }}>🎬 Live: read comments, flash sales, post-stream DM</p>
                <p style={{ marginTop:8, marginBottom:4, fontWeight:600, color:NAVY }}>Add custom via MCP:</p>
                <div style={{ background:CREAM, borderRadius:8, padding:"6px 12px", fontFamily:"'DM Mono',monospace", fontSize:10 }}>{`openclaw mcp install ha-mcp  # home assistant
openclaw mcporter add my-tool  # any custom`}</div>
              </div>
            </Sec>

            <Sec id="arch-permissions" title="🔒 Permission & Safety" defaultOpen={false}>
              <div style={{ padding:"8px 16px 14px", fontSize:13, color:"#6B6155", lineHeight:1.7 }}>
                <p style={{ marginBottom:8 }}>"If it makes money → permission. If it just takes time → no."</p>
                <p style={{ marginBottom:3 }}>🟢 <strong>Auto</strong>: Reply WA, answer questions, read data, screenshot, generate text</p>
                <p style={{ marginBottom:3 }}>🟡 <strong>Notify</strong>: Post Twitter, send email, update listings, book appointments</p>
                <p style={{ marginBottom:3 }}>🔴 <strong>Approve first</strong>: Spend money, delete data, change settings, new contacts</p>
                <p style={{ marginTop:8, marginBottom:4, fontWeight:600, color:NAVY }}>In system prompt:</p>
                <div style={{ background:CREAM, borderRadius:8, padding:"8px 12px", fontFamily:"'DM Mono',monospace", fontSize:10, whiteSpace:"pre-wrap" }}>{`PERMISSION RULES:
- CAN: analyze charts, set alerts, calc size
- NOTIFY: trade signals, WA market updates
- MUST ASK: execute trades, spend money

When asking: send WA to owner:
"🔴 BUY BTC @ $98,200. Size 0.01.
Risk 1.5%. Reply OK or NO."`}</div>
              </div>
            </Sec>

            <Sec id="arch-stack" title="📋 Full Stack Cheat Sheet" defaultOpen={false}>
              <div style={{ padding:"8px 16px 14px" }}>
                {[
                  { l:"Hardware", w:"XiaoZhi ESP32 ($10-25) / Stack-chan ($79)", n:"Mic+Speaker+Cam+Screen+WiFi" },
                  { l:"Firmware", w:"xiaozhi-esp32 (MIT, open-source)", n:"Flash → set OTA_URL to your server" },
                  { l:"Robot Server", w:"xiaozhi-esp32-server (Python/Docker)", n:"VAD+ASR+LLM+TTS. WebSocket" },
                  { l:"Agent", w:"OpenClaw (open-source)", n:"Browser, WA, email, skills, MCP" },
                  { l:"LLM", w:"GLM 4.5 / MiniMax / Kimi K2.5", n:"$0.35-0.78/M tokens" },
                  { l:"STT", w:"FunASR (local, free)", n:"Or Alibaba Cloud for accuracy" },
                  { l:"TTS", w:"EdgeTTS (free)", n:"Bahasa Indonesia supported" },
                  { l:"Vision", w:"Kimi K2.5 multimodal", n:"Charts, faces, products, docs" },
                  { l:"VPS", w:"Hostinger KVM 2 ($14/mo)", n:"Docker, 4GB RAM, 50GB SSD" },
                  { l:"WA", w:"OpenClaw self-hosted (free QR)", n:"Dedicated Indo SIM needed" },
                  { l:"Browser", w:"OpenClaw managed Chromium", n:"Twitter, Shopee, Tokopedia" },
                ].map((r,i) => (
                  <div key={i} style={{ background:CREAM, borderRadius:8, padding:"8px 12px", marginBottom:4 }}>
                    <span style={{ fontSize:11, fontWeight:700, color:NAVY }}>{r.l}: </span>
                    <span style={{ fontSize:11, color:"#6B6155" }}>{r.w}</span>
                    <div style={{ fontSize:10, color:SUBTLE }}>{r.n}</div>
                  </div>
                ))}
              </div>
            </Sec>

            <Sec id="arch-cost" title="💰 Monthly Running Cost" defaultOpen={false}>
              <div style={{ padding:"8px 16px 14px" }}>
                {[
                  { i:"Hostinger VPS", c:"$14 (Rp 224K)" },
                  { i:"GLM API (~50 clients)", c:"~$5-15" },
                  { i:"EdgeTTS / FunASR / WA / OpenClaw", c:"Free" },
                  { i:"Domain (.id + .com)", c:"~$20/year" },
                ].map((r,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${WARM}30`, fontSize:13 }}>
                    <span>{r.i}</span>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:600 }}>{r.c}</span>
                  </div>
                ))}
                <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 4px", fontWeight:700, fontSize:14, color:NAVY }}>
                  <span>TOTAL/month</span>
                  <span style={{ fontFamily:"'DM Mono',monospace" }}>~Rp 400K</span>
                </div>
                <p style={{ fontSize:11, color:SUBTLE, marginTop:4 }}>50 clients × Rp 2M = Rp 100M revenue. Cost Rp 400K. Margin: 99.6%</p>
              </div>
            </Sec>
          </>
        )}

        {/* ═══ MEMORY ═══ */}
        {tab === "memory" && (
          <>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontStyle:"italic", fontWeight:700, padding:"4px 4px 8px" }}>Memory</h2>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..."
              style={{
                width:"100%", padding:"10px 14px", background:WHITE, border:`1px solid ${WARM}`,
                borderRadius:12, fontSize:13, color:NAVY, outline:"none", marginBottom:10,
              }}
            />
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12, overflowX:"auto", paddingBottom:4 }}>
              {["all",...Object.keys(CL)].map(k => {
                const cnt = k==="all" ? d.memory.length : d.memory.filter(m=>m.cat===k).length;
                if (k!=="all" && !cnt) return null;
                const active = memCat === k;
                return (
                  <button key={k} onClick={() => setMemCat(k)} style={{
                    padding:"5px 12px", borderRadius:16, fontSize:11, fontWeight:500, cursor:"pointer",
                    border:`1.5px solid ${active ? (k==="all"?NAVY:CC[k]) : WARM}`,
                    background: active ? (k==="all"?NAVY:CC[k]) : "transparent",
                    color: active ? "#fff" : SUBTLE,
                    fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap",
                  }}>{k==="all" ? "All" : CL[k]} {cnt}</button>
                );
              })}
            </div>

            {filteredMem.map(m => {
              const isO = memOpen[m.id];
              return (
                <div key={m.id} style={{ marginBottom:6 }}>
                  <button onClick={() => setMemOpen(p=>({...p,[m.id]:!isO}))} style={{
                    width:"100%", padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center",
                    background:WHITE, border:"none", borderRadius: isO ? "12px 12px 0 0" : 12,
                    cursor:"pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 1px 2px rgba(0,0,0,.03)",
                    borderLeft:`3px solid ${CC[m.cat]}`,
                  }}>
                    <span style={{ fontSize:13, fontWeight:600, color:NAVY, textAlign:"left" }}>{m.title}</span>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:9, color:CC[m.cat], fontFamily:"'DM Mono',monospace", letterSpacing:1 }}>{CL[m.cat]?.toUpperCase()}</span>
                      <span style={{ fontSize:16, color:SUBTLE, transform:isO?"rotate(180deg)":"", transition:"transform .2s" }}>⌄</span>
                    </div>
                  </button>
                  {isO && (
                    <div style={{
                      background:WHITE, borderRadius:"0 0 12px 12px", padding:"10px 16px 14px",
                      boxShadow:"0 1px 2px rgba(0,0,0,.03)", borderLeft:`3px solid ${CC[m.cat]}`,
                    }}>
                      <p style={{ fontSize:13, color:"#6B6155", lineHeight:1.6, whiteSpace:"pre-line" }}>{m.text}</p>
                    </div>
                  )}
                </div>
              );
            })}
            {filteredMem.length === 0 && <div style={{ padding:40, textAlign:"center", color:SUBTLE, fontStyle:"italic" }}>No results</div>}
          </>
        )}

        {/* ═══ BRAND ═══ */}
        {tab === "brand" && (
          <>
            <div style={{ textAlign:"center", padding:"8px 0 20px" }}>
              <div style={{
                width:72, height:72, borderRadius:22, margin:"0 auto 12px",
                background:"linear-gradient(135deg,#0EA5E9,#7DD3FC)",
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:"0 6px 20px rgba(14,165,233,.2)",
              }}>
                <div style={{ display:"flex", gap:6 }}>
                  <div style={{ width:9, height:13, background:"rgba(255,255,255,.9)", borderRadius:5 }} />
                  <div style={{ width:9, height:13, background:"rgba(255,255,255,.9)", borderRadius:5 }} />
                </div>
              </div>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:38, fontWeight:700 }}>OIC</h1>
              <p style={{ fontSize:12, color:SUBTLE, letterSpacing:2, marginTop:2 }}>OPEN INTELLIGENCE COMPANION</p>
              <p style={{ fontSize:14, color:SUBTLE, fontStyle:"italic", marginTop:6 }}>{d.brand.tagline}</p>
            </div>

            <Sec id="br-colors" title="Color Palette" defaultOpen={false}>
              <div style={{ display:"flex", gap:10, padding:"8px 16px 12px", flexWrap:"wrap" }}>
                {Object.entries(d.brand.colors).map(([n,h]) => (
                  <div key={n} style={{ textAlign:"center" }}>
                    <div style={{ width:50, height:50, borderRadius:14, background:h, border: h==="#F0F9FF"||h==="#060B14"?`1px solid ${WARM}`:"none", marginBottom:4 }} />
                    <div style={{ fontSize:10, color:NAVY, fontWeight:500 }}>{n}</div>
                    <div style={{ fontSize:9, color:SUBTLE, fontFamily:"'DM Mono',monospace" }}>{h}</div>
                  </div>
                ))}
              </div>
            </Sec>

            <Sec id="br-type" title="Typography" defaultOpen={false}>
              <div style={{ padding:"8px 16px 12px", display:"flex", flexDirection:"column", gap:12 }}>
                <div>
                  <div style={{ fontSize:9, color:SUBTLE, letterSpacing:2, fontFamily:"'DM Mono',monospace" }}>HEADLINES</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontStyle:"italic", fontWeight:700 }}>Playfair Display</div>
                </div>
                <div>
                  <div style={{ fontSize:9, color:SUBTLE, letterSpacing:2, fontFamily:"'DM Mono',monospace" }}>BODY</div>
                  <div style={{ fontSize:15 }}>DM Sans — clean and readable</div>
                </div>
                <div>
                  <div style={{ fontSize:9, color:SUBTLE, letterSpacing:2, fontFamily:"'DM Mono',monospace" }}>MONO</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:14 }}>DM Mono — numbers & data</div>
                </div>
              </div>
            </Sec>

            <Sec id="br-tone" title="Tone of Voice" defaultOpen={false}>
              <div style={{ padding:"8px 16px 12px" }}>
                <p style={{ fontSize:13, color:"#6B6155", lineHeight:1.6, marginBottom:10 }}>{d.brand.tone}</p>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {["casual","friendly","professional","Bahasa natural","relatable","confident"].map(t => (
                    <span key={t} style={{ padding:"4px 10px", borderRadius:14, border:`1px solid ${WARM}`, fontSize:11, color:NAVY }}>{t}</span>
                  ))}
                </div>
              </div>
            </Sec>

            <Sec id="br-story" title="Brand Story" defaultOpen={false}>
              <div style={{ padding:"8px 16px 14px" }}>
                <div style={{ fontSize:13, color:"#5A5347", lineHeight:1.8, whiteSpace:"pre-line" }}>{d.brand.story}</div>
              </div>
            </Sec>

            <Sec id="br-name" title="Why 'OIC'?" defaultOpen={false}>
              <div style={{ padding:"8px 16px 14px", fontSize:13, color:"#6B6155", lineHeight:1.7 }}>
                <p style={{ marginBottom:8 }}><strong>OIC</strong> — pronounced "Oh I See"</p>
                <p style={{ marginBottom:8 }}>Kepanjangan: <strong>Open Intelligence Companion</strong></p>
                <p style={{ marginBottom:8 }}>Tiga kata. Tiga janji.</p>
                <p style={{ marginBottom:4 }}>🌐 <strong>Open</strong> — Built on open-source (OpenClaw, XiaoZhi, Stack-chan). Transparan, bukan black box. Kamu tahu persis apa yang OIC lakukan.</p>
                <p style={{ marginBottom:4 }}>🧠 <strong>Intelligence</strong> — Bukan chatbot biasa. OIC punya mata (kamera), telinga (mic), dan otak AI yang di-fine-tune per industri. 6 personality spesialis dengan knowledge base rahasia.</p>
                <p style={{ marginBottom:4 }}>🤝 <strong>Companion</strong> — Bukan tool. Bukan software. OIC adalah teman — robot fisik yang duduk di meja kamu, selalu siap, selalu ada. 24/7.</p>
                <p style={{ marginTop:10, color:SUBTLE }}>Bonus: "Oh I See" = reaksi orang pertama kali lihat OIC bekerja. Mata di logo = robot yang bisa melihat dan memahami dunia kamu.</p>
              </div>
            </Sec>
          </>
        )}
      </div>

      {/* ═══ BOTTOM NAV ═══ */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0,
        background:`${CREAM}F0`, backdropFilter:"blur(16px)",
        borderTop:`1px solid ${WARM}80`,
        display:"flex", justifyContent:"space-around", padding:"8px 0 env(safe-area-inset-bottom, 8px)",
      }}>
        {[
          { id:"home", icon:"◉", label:"Home" },
          { id:"tasks", icon:"☐", label:"Tasks" },
          { id:"arch", icon:"⬡", label:"Arch" },
          { id:"memory", icon:"◈", label:"Memory" },
          { id:"brand", icon:"◎", label:"Brand" },
        ].map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{
            background:"none", border:"none", cursor:"pointer", padding:"6px 16px",
            display:"flex", flexDirection:"column", alignItems:"center", gap:2,
            color: tab===n.id ? NAVY : SUBTLE,
            fontFamily:"'DM Sans',sans-serif", transition:"color .2s",
          }}>
            <span style={{ fontSize:18 }}>{n.icon}</span>
            <span style={{ fontSize:10, fontWeight: tab===n.id ? 600 : 400 }}>{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
