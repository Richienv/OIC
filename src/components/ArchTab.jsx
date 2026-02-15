import Sec from "./Sec";
import { NAVY, SUBTLE, CREAM, WARM, RED } from "../constants";

export default function ArchTab({ open, setOpen }) {
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 26,
            fontStyle: "italic",
            fontWeight: 700,
            padding: "4px 4px 6px",
          }}
        >
          Architecture
        </h2>
        <p style={{ fontSize: 13, color: SUBTLE, padding: "0 4px" }}>
          How everything connects. Your technical blueprint.
        </p>
      </div>

      <Sec id="arch-overview" title="🏗️ System Overview" defaultOpen={true} open={open} setOpen={setOpen}>
        <div
          style={{
            padding: "8px 16px 14px",
            fontFamily: "'DM Mono',monospace",
            fontSize: 10,
            lineHeight: 1.6,
            color: NAVY,
            overflowX: "auto",
          }}
        >
          <pre style={{ whiteSpace: "pre", margin: 0 }}>{`┌───────────────────────────────────┐
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

      <Sec id="arch-robot" title="🤖 How Robot Connects" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px", fontSize: 13, color: "#6B6155", lineHeight: 1.7 }}>
          <p style={{ marginBottom: 8 }}>
            <strong>XiaoZhi ESP32 → Your Server</strong>
          </p>
          <p style={{ marginBottom: 8 }}>
            XiaoZhi runs open-source firmware (MIT). Default connects to xiaozhi.me, but you point it to YOUR VPS.
          </p>
          <p style={{ marginBottom: 4, fontWeight: 600, color: NAVY }}>Setup:</p>
          <p style={{ marginBottom: 3 }}>1. Flash firmware via ESP Flash Tool (5 min)</p>
          <p style={{ marginBottom: 3 }}>2. Robot boots → WiFi hotspot → configure WiFi</p>
          <p style={{ marginBottom: 3 }}>
            3. Set OTA_URL:{" "}
            <code
              style={{
                background: CREAM,
                padding: "1px 5px",
                borderRadius: 4,
                fontSize: 11,
                fontFamily: "'DM Mono',monospace",
              }}
            >
              http://your-vps:8002
            </code>
          </p>
          <p style={{ marginBottom: 3 }}>
            4. Robot connects via WebSocket → voice pipeline runs on server
          </p>
          <p style={{ marginTop: 10, marginBottom: 4, fontWeight: 600, color: NAVY }}>Robot handles locally:</p>
          <p style={{ marginBottom: 2 }}>
            Wake word "Hey OIC" · Audio record/play · Camera capture · Screen display · LED/servo (V2)
          </p>
          <p style={{ marginTop: 10, marginBottom: 4, fontWeight: 600, color: NAVY }}>Server handles:</p>
          <p style={{ marginBottom: 2 }}>
            ASR (speech→text) · LLM (reasoning) · TTS (text→speech) · Function calling · MCP tools
          </p>
        </div>
      </Sec>

      <Sec id="arch-server" title="⚙️ XiaoZhi Server Setup" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px", fontSize: 13, color: "#6B6155", lineHeight: 1.7 }}>
          <p style={{ marginBottom: 6, fontWeight: 600, color: NAVY }}>Docker Install:</p>
          <div
            style={{
              background: CREAM,
              borderRadius: 8,
              padding: "8px 12px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              marginBottom: 10,
            }}
          >
            <div>curl -L -o setup.sh \</div>
            <div>  https://raw.githubusercontent.com/xinnan-tech/</div>
            <div>  xiaozhi-esp32-server/main/docker-setup.sh</div>
            <div>chmod +x setup.sh && ./setup.sh</div>
          </div>
          <p style={{ marginBottom: 6, fontWeight: 600, color: NAVY }}>Voice Pipeline:</p>
          <div
            style={{
              background: CREAM,
              borderRadius: 8,
              padding: "6px 12px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              marginBottom: 10,
            }}
          >
            Speak → VAD → ASR → LLM (your prompt) → TTS → Robot speaks
          </div>
          <p style={{ marginBottom: 6, fontWeight: 600, color: NAVY }}>LLM Config (GLM 4.5):</p>
          <div
            style={{
              background: CREAM,
              borderRadius: 8,
              padding: "8px 12px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              marginBottom: 8,
              whiteSpace: "pre-wrap",
            }}
          >{`selected_module:
  llm: openai  # GLM uses OpenAI-compat API
llm:
  openai:
    api_key: "your-glm-key"
    base_url: "https://open.bigmodel.cn/api/paas/v4"
    model: "glm-4-flash"
    system_prompt: |
      Kamu adalah OIC Trader...
      [SYSTEM PROMPT LENGKAP]`}</div>
          <p style={{ fontSize: 11, color: SUBTLE }}>
            Any OpenAI-compatible LLM works: GLM, MiniMax, Kimi, DeepSeek, Qwen
          </p>
        </div>
      </Sec>

      <Sec id="arch-openclaw" title="🦞 OpenClaw Agent Layer" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px", fontSize: 13, color: "#6B6155", lineHeight: 1.7 }}>
          <p style={{ marginBottom: 6 }}>
            Runs ON TOP of xiaozhi-server. Gives OIC superpowers: browser, WhatsApp, email, skills.
          </p>
          <div
            style={{
              background: CREAM,
              borderRadius: 8,
              padding: "8px 12px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              marginBottom: 10,
            }}
          >
            curl -fsSL https://clawd.bot/install.sh | bash
          </div>
          <p style={{ marginBottom: 3 }}>
            • <strong>Gateway</strong> — always-on, routes messages
          </p>
          <p style={{ marginBottom: 3 }}>
            • <strong>Agent Runtime</strong> — reasoning + tool execution
          </p>
          <p style={{ marginBottom: 3 }}>
            • <strong>Skills</strong> — browser, WA, email, calendar, MCP
          </p>
          <p style={{ marginTop: 8, marginBottom: 4, fontWeight: 600, color: NAVY }}>Flow example:</p>
          <div
            style={{
              background: CREAM,
              borderRadius: 8,
              padding: "8px 12px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              marginBottom: 6,
              whiteSpace: "pre-wrap",
            }}
          >{`User: "OIC, cek harga iPhone di Tokopedia"
→ ASR → LLM detects intent: search
→ MCP call: browser.open("tokopedia.com")
→ OpenClaw searches, extracts price
→ LLM formats response → TTS
→ "iPhone 16 mulai Rp 15.999.000"`}</div>
        </div>
      </Sec>

      <Sec id="arch-browser" title="🌐 Browser Automation (Key!)" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px", fontSize: 13, color: "#6B6155", lineHeight: 1.7 }}>
          <p style={{ marginBottom: 8 }}>HOW OIC has its own accounts, browses, buys, posts.</p>
          <p style={{ marginBottom: 6, fontWeight: 600, color: NAVY }}>Give OIC a Twitter account:</p>
          <div
            style={{
              background: CREAM,
              borderRadius: 8,
              padding: "8px 12px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              marginBottom: 10,
              whiteSpace: "pre-wrap",
            }}
          >{`# Start OIC's isolated browser
openclaw browser --browser-profile openclaw start

# Open Twitter - YOU log in once manually
openclaw browser open https://twitter.com/login
# Session saved! Survives restart.

# Now agent can post anytime:
openclaw browser open https://twitter.com/compose
openclaw browser type 1 "Market update 📊"
openclaw browser click 3  # tweet`}</div>
          <p style={{ marginBottom: 6, fontWeight: 600, color: NAVY }}>Give OIC a Shopee seller account:</p>
          <div
            style={{
              background: CREAM,
              borderRadius: 8,
              padding: "8px 12px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              marginBottom: 10,
              whiteSpace: "pre-wrap",
            }}
          >{`# Same: log in once, OIC remembers
openclaw browser open https://seller.shopee.co.id
# Manual login → OIC can now:
# Check orders, reply chats, update listings`}</div>
          <p style={{ marginBottom: 4, fontWeight: 600, color: RED }}>⚠️ Safety rules:</p>
          <p style={{ marginBottom: 2 }}>• NEVER auto-pay without your confirm</p>
          <p style={{ marginBottom: 2 }}>• One browser profile per account</p>
          <p style={{ marginBottom: 2 }}>• Twitter anti-bot: use "host" mode for posting</p>
          <p style={{ marginBottom: 2 }}>• Sessions persist but may expire → re-login</p>
        </div>
      </Sec>

      <Sec id="arch-wa" title="💬 WhatsApp Bot (Free)" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px", fontSize: 13, color: "#6B6155", lineHeight: 1.7 }}>
          <p style={{ marginBottom: 3 }}>1. OpenClaw generates QR code</p>
          <p style={{ marginBottom: 3 }}>2. Scan with WA on phone (like WA Web)</p>
          <p style={{ marginBottom: 3 }}>3. Bot intercepts incoming messages</p>
          <p style={{ marginBottom: 3 }}>4. Passes to LLM with system prompt</p>
          <p style={{ marginBottom: 3 }}>5. LLM replies → sends via WA</p>
          <p style={{ marginBottom: 3 }}>6. Can send images, docs, voice notes</p>
          <p style={{ marginTop: 8, fontSize: 11, color: SUBTLE }}>
            Need: Indo SIM card · VPS always-on · Re-scan QR ~every 2 weeks
          </p>
        </div>
      </Sec>

      <Sec id="arch-skills" title="🧩 Skills System" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px", fontSize: 13, color: "#6B6155", lineHeight: 1.7 }}>
          <p style={{ marginBottom: 6, fontWeight: 600, color: NAVY }}>Built-in:</p>
          <p style={{ marginBottom: 2 }}>
            🌐 Browser · 💬 WhatsApp · 📧 Email · 📅 Calendar · 📂 Files · 🖥️ Shell · 🧠 Memory
          </p>
          <p style={{ marginTop: 8, marginBottom: 6, fontWeight: 600, color: NAVY }}>Per personality:</p>
          <p style={{ marginBottom: 2 }}>
            📈 Trader: price data, position calc, chart scan, alerts, exchange API
          </p>
          <p style={{ marginBottom: 2 }}>💄 Beauty: auto-book, follow-up WA, product recs</p>
          <p style={{ marginBottom: 2 }}>🛒 Toko: Shopee orders, reply chats, ongkir, update listings</p>
          <p style={{ marginBottom: 2 }}>🎬 Live: read comments, flash sales, post-stream DM</p>
          <p style={{ marginTop: 8, marginBottom: 4, fontWeight: 600, color: NAVY }}>Add custom via MCP:</p>
          <div
            style={{
              background: CREAM,
              borderRadius: 8,
              padding: "6px 12px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
            }}
          >{`openclaw mcp install ha-mcp  # home assistant
openclaw mcporter add my-tool  # any custom`}</div>
        </div>
      </Sec>

      <Sec id="arch-permissions" title="🔒 Permission & Safety" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px", fontSize: 13, color: "#6B6155", lineHeight: 1.7 }}>
          <p style={{ marginBottom: 8 }}>
            "If it makes money → permission. If it just takes time → no."
          </p>
          <p style={{ marginBottom: 3 }}>
            🟢 <strong>Auto</strong>: Reply WA, answer questions, read data, screenshot, generate text
          </p>
          <p style={{ marginBottom: 3 }}>
            🟡 <strong>Notify</strong>: Post Twitter, send email, update listings, book appointments
          </p>
          <p style={{ marginBottom: 3 }}>
            🔴 <strong>Approve first</strong>: Spend money, delete data, change settings, new contacts
          </p>
          <p style={{ marginTop: 8, marginBottom: 4, fontWeight: 600, color: NAVY }}>In system prompt:</p>
          <div
            style={{
              background: CREAM,
              borderRadius: 8,
              padding: "8px 12px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              whiteSpace: "pre-wrap",
            }}
          >{`PERMISSION RULES:
- CAN: analyze charts, set alerts, calc size
- NOTIFY: trade signals, WA market updates
- MUST ASK: execute trades, spend money

When asking: send WA to owner:
"🔴 BUY BTC @ $98,200. Size 0.01.
Risk 1.5%. Reply OK or NO."`}</div>
        </div>
      </Sec>

      <Sec id="arch-stack" title="📋 Full Stack Cheat Sheet" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          {[
            { l: "Hardware", w: "XiaoZhi ESP32 ($10-25) / Stack-chan ($79)", n: "Mic+Speaker+Cam+Screen+WiFi" },
            { l: "Firmware", w: "xiaozhi-esp32 (MIT, open-source)", n: "Flash → set OTA_URL to your server" },
            { l: "Robot Server", w: "xiaozhi-esp32-server (Python/Docker)", n: "VAD+ASR+LLM+TTS. WebSocket" },
            { l: "Agent", w: "OpenClaw (open-source)", n: "Browser, WA, email, skills, MCP" },
            { l: "LLM", w: "GLM 4.5 / MiniMax / Kimi K2.5", n: "$0.35-0.78/M tokens" },
            { l: "STT", w: "FunASR (local, free)", n: "Or Alibaba Cloud for accuracy" },
            { l: "TTS", w: "EdgeTTS (free)", n: "Bahasa Indonesia supported" },
            { l: "Vision", w: "Kimi K2.5 multimodal", n: "Charts, faces, products, docs" },
            { l: "VPS", w: "Hostinger KVM 2 ($14/mo)", n: "Docker, 4GB RAM, 50GB SSD" },
            { l: "WA", w: "OpenClaw self-hosted (free QR)", n: "Dedicated Indo SIM needed" },
            { l: "Browser", w: "OpenClaw managed Chromium", n: "Twitter, Shopee, Tokopedia" },
          ].map((r, i) => (
            <div key={i} style={{ background: CREAM, borderRadius: 8, padding: "8px 12px", marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>{r.l}: </span>
              <span style={{ fontSize: 11, color: "#6B6155" }}>{r.w}</span>
              <div style={{ fontSize: 10, color: SUBTLE }}>{r.n}</div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec id="arch-cost" title="💰 Monthly Running Cost" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          {[
            { i: "Hostinger VPS", c: "$14 (Rp 224K)" },
            { i: "GLM API (~50 clients)", c: "~$5-15" },
            { i: "EdgeTTS / FunASR / WA / OpenClaw", c: "Free" },
            { i: "Domain (.id + .com)", c: "~$20/year" },
          ].map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
                borderBottom: `1px solid ${WARM}30`,
                fontSize: 13,
              }}
            >
              <span>{r.i}</span>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 600 }}>{r.c}</span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0 4px",
              fontWeight: 700,
              fontSize: 14,
              color: NAVY,
            }}
          >
            <span>TOTAL/month</span>
            <span style={{ fontFamily: "'DM Mono',monospace" }}>~Rp 400K</span>
          </div>
          <p style={{ fontSize: 11, color: SUBTLE, marginTop: 4 }}>
            50 clients × Rp 2M = Rp 100M revenue. Cost Rp 400K. Margin: 99.6%
          </p>
        </div>
      </Sec>
    </>
  );
}
