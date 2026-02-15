import Sec from "./Sec";
import { NAVY, SUBTLE, CREAM, WARM, RED } from "../constants";

const Code = ({ children }) => (
  <div
    style={{
      background: CREAM,
      borderRadius: 8,
      padding: "10px 14px",
      fontFamily: "'DM Mono',monospace",
      fontSize: 11,
      lineHeight: 1.6,
      color: NAVY,
      overflowX: "auto",
      marginBottom: 10,
      whiteSpace: "pre-wrap",
    }}
  >
    {children}
  </div>
);

const P = ({ children, bold, style = {} }) => (
  <p
    style={{
      fontSize: 13,
      color: bold ? NAVY : SUBTLE,
      lineHeight: 1.7,
      fontWeight: bold ? 600 : 400,
      marginBottom: 6,
      ...style,
    }}
  >
    {children}
  </p>
);

export default function ArchTab({ open, setOpen }) {
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: -0.5,
            padding: "4px 4px 6px",
          }}
        >
          Architecture
        </h2>
        <p style={{ fontSize: 13, color: SUBTLE, padding: "0 4px" }}>
          How everything connects.
        </p>
      </div>

      <Sec id="arch-overview" title="System Overview" defaultOpen={true} open={open} setOpen={setOpen}>
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

      <Sec id="arch-robot" title="How Robot Connects" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P bold>XiaoZhi ESP32 → Your Server</P>
          <P>XiaoZhi runs open-source firmware (MIT). Default connects to xiaozhi.me, but you point it to YOUR VPS.</P>
          <P bold style={{ marginTop: 10 }}>Setup:</P>
          <P>1. Flash firmware via ESP Flash Tool (5 min)</P>
          <P>2. Robot boots → WiFi hotspot → configure WiFi</P>
          <P>
            3. Set OTA_URL:{" "}
            <code style={{ background: CREAM, padding: "1px 5px", borderRadius: 4, fontSize: 11, fontFamily: "'DM Mono',monospace" }}>
              http://your-vps:8002
            </code>
          </P>
          <P>4. Robot connects via WebSocket → voice pipeline runs on server</P>
          <P bold style={{ marginTop: 10 }}>Robot handles locally:</P>
          <P>Wake word · Audio record/play · Camera capture · Screen display · LED/servo (V2)</P>
          <P bold style={{ marginTop: 10 }}>Server handles:</P>
          <P>ASR (speech→text) · LLM (reasoning) · TTS (text→speech) · Function calling · MCP tools</P>
        </div>
      </Sec>

      <Sec id="arch-server" title="XiaoZhi Server Setup" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P bold>Docker Install:</P>
          <Code>{`curl -L -o setup.sh \\
  https://raw.githubusercontent.com/xinnan-tech/
  xiaozhi-esp32-server/main/docker-setup.sh
chmod +x setup.sh && ./setup.sh`}</Code>
          <P bold>Voice Pipeline:</P>
          <Code>Speak → VAD → ASR → LLM (your prompt) → TTS → Robot speaks</Code>
          <P bold>LLM Config (GLM 4.5):</P>
          <Code>{`selected_module:
  llm: openai  # GLM uses OpenAI-compat API
llm:
  openai:
    api_key: "your-glm-key"
    base_url: "https://open.bigmodel.cn/api/paas/v4"
    model: "glm-4-flash"
    system_prompt: |
      Kamu adalah OIC Trader...
      [SYSTEM PROMPT LENGKAP]`}</Code>
          <P>Any OpenAI-compatible LLM works: GLM, MiniMax, Kimi, DeepSeek, Qwen</P>
        </div>
      </Sec>

      <Sec id="arch-openclaw" title="OpenClaw Agent Layer" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>Runs ON TOP of xiaozhi-server. Gives OIC superpowers: browser, WhatsApp, email, skills.</P>
          <Code>curl -fsSL https://clawd.bot/install.sh | bash</Code>
          <P>Gateway — always-on, routes messages</P>
          <P>Agent Runtime — reasoning + tool execution</P>
          <P>Skills — browser, WA, email, calendar, MCP</P>
          <P bold style={{ marginTop: 10 }}>Flow example:</P>
          <Code>{`User: "OIC, cek harga iPhone di Tokopedia"
→ ASR → LLM detects intent: search
→ MCP call: browser.open("tokopedia.com")
→ OpenClaw searches, extracts price
→ LLM formats response → TTS
→ "iPhone 16 mulai Rp 15.999.000"`}</Code>
        </div>
      </Sec>

      <Sec id="arch-browser" title="Browser Automation" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>How OIC has its own accounts, browses, buys, posts.</P>
          <P bold style={{ marginTop: 4 }}>Give OIC a Twitter account:</P>
          <Code>{`# Start OIC's isolated browser
openclaw browser --browser-profile openclaw start

# Open Twitter - YOU log in once manually
openclaw browser open https://twitter.com/login
# Session saved! Survives restart.

# Now agent can post anytime:
openclaw browser open https://twitter.com/compose
openclaw browser type 1 "Market update"
openclaw browser click 3  # tweet`}</Code>
          <P bold>Give OIC a Shopee seller account:</P>
          <Code>{`# Same: log in once, OIC remembers
openclaw browser open https://seller.shopee.co.id
# Manual login → OIC can now:
# Check orders, reply chats, update listings`}</Code>
          <P bold style={{ color: RED }}>Safety rules:</P>
          <P>Never auto-pay without confirm · One browser profile per account · Sessions persist but may expire</P>
        </div>
      </Sec>

      <Sec id="arch-wa" title="WhatsApp Bot" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>1. OpenClaw generates QR code</P>
          <P>2. Scan with WA on phone (like WA Web)</P>
          <P>3. Bot intercepts incoming messages</P>
          <P>4. Passes to LLM with system prompt</P>
          <P>5. LLM replies → sends via WA</P>
          <P>6. Can send images, docs, voice notes</P>
          <P style={{ marginTop: 8 }}>Need: Indo SIM card · VPS always-on · Re-scan QR ~every 2 weeks</P>
        </div>
      </Sec>

      <Sec id="arch-skills" title="Skills System" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P bold>Built-in:</P>
          <P>Browser · WhatsApp · Email · Calendar · Files · Shell · Memory</P>
          <P bold style={{ marginTop: 8 }}>Per personality:</P>
          <P>Trader: price data, position calc, chart scan, alerts, exchange API</P>
          <P>Beauty: auto-book, follow-up WA, product recs</P>
          <P>Toko: Shopee orders, reply chats, ongkir, update listings</P>
          <P>Live: read comments, flash sales, post-stream DM</P>
          <P bold style={{ marginTop: 8 }}>Add custom via MCP:</P>
          <Code>{`openclaw mcp install ha-mcp  # home assistant
openclaw mcporter add my-tool  # any custom`}</Code>
        </div>
      </Sec>

      <Sec id="arch-permissions" title="Permission & Safety" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P bold>Auto — Reply WA, answer questions, read data, screenshot, generate text</P>
          <P bold>Notify — Post Twitter, send email, update listings, book appointments</P>
          <P bold style={{ color: RED }}>Approve — Spend money, delete data, change settings, new contacts</P>
          <P bold style={{ marginTop: 10 }}>In system prompt:</P>
          <Code>{`PERMISSION RULES:
- CAN: analyze charts, set alerts, calc size
- NOTIFY: trade signals, WA market updates
- MUST ASK: execute trades, spend money

When asking: send WA to owner:
"BUY BTC @ $98,200. Size 0.01.
Risk 1.5%. Reply OK or NO."`}</Code>
        </div>
      </Sec>

      <Sec id="arch-stack" title="Full Stack" defaultOpen={false} open={open} setOpen={setOpen}>
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
            <div key={i} style={{ padding: "6px 0", borderBottom: i < 10 ? `0.5px solid ${WARM}` : "none" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{r.l}: </span>
              <span style={{ fontSize: 12, color: SUBTLE }}>{r.w}</span>
              <div style={{ fontSize: 11, color: SUBTLE, marginTop: 1 }}>{r.n}</div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec id="arch-cost" title="Monthly Cost" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          {[
            { i: "Hostinger VPS", c: "$14" },
            { i: "GLM API (~50 clients)", c: "~$10" },
            { i: "TTS / ASR / WA / OpenClaw", c: "Free" },
            { i: "Domain (.id + .com)", c: "~$20/yr" },
          ].map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: `0.5px solid ${WARM}`,
                fontSize: 13,
              }}
            >
              <span style={{ color: NAVY }}>{r.i}</span>
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
            <span>Total/month</span>
            <span style={{ fontFamily: "'DM Mono',monospace" }}>~Rp 400K</span>
          </div>
          <P style={{ marginTop: 4 }}>50 clients × Rp 2M = Rp 100M revenue. Margin: 99.6%</P>
        </div>
      </Sec>
    </>
  );
}
