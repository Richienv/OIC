import Sec from "./Sec";
import { NAVY, SUBTLE, CREAM, WARM, WHITE, GREEN, ACCENT, RED, YELLOW } from "../constants";

/* ─── Reusable tiny components ─── */

const P = ({ children, bold, style = {} }) => (
  <p style={{ fontSize: 13, color: bold ? NAVY : SUBTLE, lineHeight: 1.7, fontWeight: bold ? 600 : 400, marginBottom: 6, ...style }}>
    {children}
  </p>
);

const Step = ({ n, title, desc, color = ACCENT }) => (
  <div style={{ display: "flex", gap: 12, padding: "10px 0" }}>
    <div style={{
      width: 32, height: 32, borderRadius: "50%", background: color,
      color: WHITE, fontSize: 14, fontWeight: 700,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2,
    }}>{n}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: NAVY, marginBottom: 3 }}>{title}</div>
      <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.6 }}>{desc}</div>
    </div>
  </div>
);

const Arrow = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: "2px 0 2px 16px" }}>
    <div style={{ width: 2, height: 20, background: WARM }} />
  </div>
);

const Box = ({ label, sub, color = ACCENT, icon }) => (
  <div style={{
    background: `${color}08`, border: `1.5px solid ${color}25`,
    borderRadius: 12, padding: "12px 14px", textAlign: "center",
  }}>
    {icon && <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>}
    <div style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>{label}</div>
    {sub && <div style={{ fontSize: 11, color: SUBTLE, marginTop: 3, lineHeight: 1.5 }}>{sub}</div>}
  </div>
);

const Connector = ({ label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "6px 0" }}>
    <div style={{ width: 2, height: 12, background: WARM }} />
    <div style={{
      fontSize: 10, color: SUBTLE, fontFamily: "'DM Mono',monospace",
      background: CREAM, padding: "2px 8px", borderRadius: 20, margin: "2px 0",
    }}>{label}</div>
    <div style={{ width: 2, height: 12, background: WARM }} />
  </div>
);

const Item = ({ label, value, sub }) => (
  <div style={{ padding: "8px 0", borderBottom: `0.5px solid ${WARM}` }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontSize: 13, fontWeight: 500, color: NAVY }}>{label}</span>
      <span style={{ fontSize: 12, fontFamily: "'DM Mono',monospace", color: NAVY, fontWeight: 600 }}>{value}</span>
    </div>
    {sub && <div style={{ fontSize: 11, color: SUBTLE, marginTop: 2 }}>{sub}</div>}
  </div>
);

const SkillBadge = ({ label, color = ACCENT }) => (
  <span style={{
    display: "inline-block", fontSize: 10, fontFamily: "'DM Mono',monospace", fontWeight: 600,
    color, background: `${color}10`, border: `1px solid ${color}25`,
    borderRadius: 6, padding: "2px 8px", marginRight: 4, marginBottom: 4,
  }}>{label}</span>
);

const RecipeStep = ({ n, text, tool }) => (
  <div style={{ display: "flex", gap: 8, padding: "5px 0", borderBottom: `0.5px solid ${WARM}` }}>
    <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: SUBTLE, minWidth: 20, textAlign: "right", flexShrink: 0 }}>{n}.</span>
    <div style={{ flex: 1, fontSize: 12, color: NAVY, lineHeight: 1.6 }}>
      {text}
      {tool && <>{" "}<SkillBadge label={tool} color={GREEN} /></>}
    </div>
  </div>
);

const FallbackItem = ({ condition, action }) => (
  <div style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: `0.5px solid ${WARM}` }}>
    <span style={{ fontSize: 11, color: RED, fontWeight: 600, flexShrink: 0 }}>IF</span>
    <div style={{ flex: 1 }}>
      <span style={{ fontSize: 11, color: NAVY, fontWeight: 500 }}>{condition}</span>
      <span style={{ fontSize: 11, color: SUBTLE }}> → {action}</span>
    </div>
  </div>
);

/* ─── Skill instruction data ─── */

const SKILLS = [
  {
    id: "browse", name: "/browse", label: "Core Browser Skill", icon: "🌐", color: YELLOW,
    trigger: "Any skill that needs web interaction calls /browse as a sub-tool",
    tools: ["/playwright", "/session-mgr"],
    steps: [
      { n: 1, text: "Receive target URL and action from parent skill" },
      { n: 2, text: "Check if active Playwright session exists for this domain", tool: "/session-mgr" },
      { n: 3, text: "If no session → launch new Chromium context with saved cookies" },
      { n: 4, text: "Navigate to URL. Wait for page load (networkidle)", tool: "/playwright" },
      { n: 5, text: "Take screenshot of loaded page", tool: "/vision" },
      { n: 6, text: "Send screenshot to vision model: 'describe what you see on this page'" },
      { n: 7, text: "Parse vision response to confirm correct page loaded" },
      { n: 8, text: "Execute action sequence from parent skill (click, type, scroll)", tool: "/playwright" },
      { n: 9, text: "After each action → screenshot + verify state changed", tool: "/vision" },
      { n: 10, text: "Return final page state + screenshot to parent skill" },
    ],
    fallbacks: [
      { condition: "Page timeout (>15s)", action: "Retry once. If still fails, screenshot + send to admin." },
      { condition: "Login wall detected", action: "Load saved credentials from vault. Re-login. Resume." },
      { condition: "CAPTCHA detected", action: "Screenshot CAPTCHA → send to admin via WhatsApp. Wait for manual solve." },
      { condition: "Element not found", action: "Full-page screenshot → visual element search via /vision. If not found, escalate." },
    ],
  },
  {
    id: "vision", name: "/vision", label: "Camera & Screenshot Analysis", icon: "👁️", color: "#AF52DE",
    trigger: 'User says "lihat ini", "analisa foto", or any skill needs to read a screen/image',
    tools: ["/kimi-k2.5", "/camera", "/screenshot"],
    steps: [
      { n: 1, text: "Receive image source: camera capture OR browser screenshot OR user-sent photo" },
      { n: 2, text: "If camera: activate robot camera, capture frame at highest resolution", tool: "/camera" },
      { n: 3, text: "If browser: call Playwright page.screenshot({ fullPage: true })", tool: "/playwright" },
      { n: 4, text: "Resize image to max 2048px width (preserve aspect ratio)" },
      { n: 5, text: "Send to Kimi K2.5 vision model with context prompt from parent skill", tool: "/kimi-k2.5" },
      { n: 6, text: "Kimi returns structured description: text found, UI elements, prices, data" },
      { n: 7, text: "Parse response into structured data (JSON) for parent skill to use" },
      { n: 8, text: "Return parsed data + confidence score to caller" },
    ],
    fallbacks: [
      { condition: "Image too dark/blurry", action: "Ask user to retake. 'Foto kurang jelas, bisa foto ulang?'" },
      { condition: "Vision model timeout", action: "Retry with compressed image. If fails, use fallback OCR." },
      { condition: "Low confidence (<70%)", action: "Return with warning flag. Parent skill decides to retry or ask user." },
    ],
  },
  {
    id: "shop", name: "/shop", label: "Shop on Tokopedia", icon: "🛒", color: "#FF6B00",
    trigger: 'User says "beli", "belikan", "order dari Tokopedia/Shopee"',
    tools: ["/browse", "/vision", "/wallet", "/whatsapp"],
    steps: [
      { n: 1, text: "Extract: product name, platform (Tokopedia/Shopee), criteria (cheapest/best rated/official)" },
      { n: 2, text: "Call /browse → open tokopedia.com or shopee.co.id", tool: "/browse" },
      { n: 3, text: "Find search bar via /vision. Type product name. Press Enter.", tool: "/vision" },
      { n: 4, text: "Wait for results to load. Screenshot results page.", tool: "/vision" },
      { n: 5, text: "Parse results: product name, price, rating, seller type, shipping cost" },
      { n: 6, text: "Filter by criteria. Prefer Official Store. Pick top 3." },
      { n: 7, text: "Format options with price + rating + seller. Send to user.", tool: "/whatsapp" },
      { n: 8, text: "Wait for user to pick (1, 2, or 3)" },
      { n: 9, text: "PERMISSION GATE: Show product + price + wallet balance. Ask OK/NO.", tool: "/wallet" },
      { n: 10, text: "If OK → click product → click 'Beli Langsung' or '+ Keranjang'", tool: "/browse" },
      { n: 11, text: "Verify shipping address (pre-saved). Apply available vouchers." },
      { n: 12, text: "Select payment method: OIC Wallet / linked e-wallet." },
      { n: 13, text: "Complete checkout. Screenshot order confirmation.", tool: "/vision" },
      { n: 14, text: "Send confirmation screenshot + order number + delivery ETA.", tool: "/whatsapp" },
      { n: 15, text: "Log transaction. Set reminder to check delivery status in 2 days." },
    ],
    fallbacks: [
      { condition: "Product out of stock", action: "Notify user. Suggest similar alternatives from results." },
      { condition: "Address not set", action: "Ask user for delivery address via WhatsApp. Save for next time." },
      { condition: "Payment failed", action: "Screenshot error. Check wallet balance. Notify user with reason." },
      { condition: "Voucher popup blocks flow", action: "Close popup via /vision element detection. Continue." },
    ],
  },
  {
    id: "book-flight", name: "/book-flight", label: "Book Flight on Traveloka", icon: "✈️", color: ACCENT,
    trigger: 'User says "book flight", "cari tiket", "pesan pesawat"',
    tools: ["/browse", "/vision", "/wallet", "/whatsapp"],
    steps: [
      { n: 1, text: "Extract: destination, date, class, budget, passenger count" },
      { n: 2, text: "Call /browse → open traveloka.com", tool: "/browse" },
      { n: 3, text: "Find search form — look for 'Dari mana?' input via /vision", tool: "/vision" },
      { n: 4, text: "Type origin city → wait for dropdown → select matching city", tool: "/browse" },
      { n: 5, text: "Type destination city → wait for dropdown → select", tool: "/browse" },
      { n: 6, text: "Click date picker → navigate to correct month → click target date" },
      { n: 7, text: "Set passenger count + class. Click 'Cari Penerbangan'.", tool: "/browse" },
      { n: 8, text: "Wait for results to load (look for flight cards appearing)" },
      { n: 9, text: "Screenshot results page", tool: "/vision" },
      { n: 10, text: "Parse results: airline, departure time, price, duration, stops" },
      { n: 11, text: "Sort by user criteria (cheapest/fastest). Pick top 3." },
      { n: 12, text: "Format as numbered list. Send to user.", tool: "/whatsapp" },
      { n: 13, text: "Wait for user reply (1, 2, or 3)" },
      { n: 14, text: "PERMISSION GATE: Show flight price + wallet balance. Ask OK/NO.", tool: "/wallet" },
      { n: 15, text: "If OK → click selected flight → fill passenger details from saved profile", tool: "/browse" },
      { n: 16, text: "Navigate to payment → select OIC Wallet payment method" },
      { n: 17, text: "Screenshot confirmation page. Send to user.", tool: "/vision" },
      { n: 18, text: "Log transaction: flight details, amount, timestamp, confirmation #" },
    ],
    fallbacks: [
      { condition: "Page layout changed (redesign)", action: "Screenshot + send to admin. Try adaptive nav via /vision." },
      { condition: "Login session expired", action: "Re-login with saved credentials. Resume from last step." },
      { condition: "Price changed during booking", action: "Notify user of new price. Re-ask permission." },
      { condition: "Flight sold out", action: "Inform user. Re-search and offer next best options." },
    ],
  },
  {
    id: "create-invoice", name: "/create-invoice", label: "Create Invoice PDF", icon: "🧾", color: "#AF52DE",
    trigger: 'User says "buat invoice", "create invoice", "faktur untuk..."',
    tools: ["/pdf-gen", "/print", "/whatsapp"],
    steps: [
      { n: 1, text: "Extract: vendor/client name, line items (qty, desc, price), due date, notes" },
      { n: 2, text: "Look up client in server DB. If new → save client details for next time." },
      { n: 3, text: "Auto-generate invoice #: INV-{YEAR}-{SEQ} (e.g. INV-2026-048)" },
      { n: 4, text: "Load invoice template from server (company logo, bank details, footer)" },
      { n: 5, text: "Populate template: header, line items, subtotal, tax, grand total", tool: "/pdf-gen" },
      { n: 6, text: "Render to PDF using server-side generator (Puppeteer/wkhtmltopdf)", tool: "/pdf-gen" },
      { n: 7, text: "Send preview to user: 'Invoice #INV-2026-048, Total Rp X'", tool: "/whatsapp" },
      { n: 8, text: "Ask: 'Kirim ke siapa? WhatsApp / Email / Print / Semua?'" },
      { n: 9, text: "If WhatsApp → send PDF as attachment to specified number", tool: "/whatsapp" },
      { n: 10, text: "If Print → send to network printer via CUPS", tool: "/print" },
      { n: 11, text: "If Email → open email via /browse, compose, attach, send", tool: "/browse" },
      { n: 12, text: "Save invoice to server DB. Update invoice sequence counter." },
      { n: 13, text: "Log to accounting ledger: date, invoice #, amount, client, status=unpaid" },
    ],
    fallbacks: [
      { condition: "Missing required fields", action: "Ask user for missing info via WhatsApp. Don't generate partial." },
      { condition: "Printer offline", action: "Notify: 'Printer tidak tersambung.' Offer WhatsApp/email instead." },
      { condition: "PDF generation fails", action: "Retry once. If fails, send plain text summary + log error." },
    ],
  },
  {
    id: "print", name: "/print", label: "Network Print", icon: "🖨️", color: NAVY,
    trigger: 'User says "print", "cetak", or any skill with print delivery',
    tools: ["/cups", "/pdf-gen"],
    steps: [
      { n: 1, text: "Receive document: PDF file path or URL from parent skill" },
      { n: 2, text: "Check printer status via CUPS API: online? paper loaded?", tool: "/cups" },
      { n: 3, text: "If printer offline → notify user immediately. Abort." },
      { n: 4, text: "Set print options: paper size (A4), orientation, copies, color/BW" },
      { n: 5, text: "Submit print job to CUPS queue", tool: "/cups" },
      { n: 6, text: "Monitor job status: queued → printing → completed" },
      { n: 7, text: "Confirm: 'Dokumen sudah dicetak. 1 halaman.'", tool: "/whatsapp" },
    ],
    fallbacks: [
      { condition: "Paper jam", action: "Notify: 'Printer macet. Mohon cek printer.' Wait and retry." },
      { condition: "CUPS service down", action: "Restart CUPS service. If fails, escalate to admin." },
      { condition: "Wrong paper size", action: "Auto-scale to fit. Notify user of scaling." },
    ],
  },
];

export default function ArchTab({ open, setOpen }) {
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, padding: "4px 4px 6px" }}>
          How It Works
        </h2>
        <p style={{ fontSize: 13, color: SUBTLE, padding: "0 4px" }}>
          Build guide — like LEGO instructions. Follow the steps, everything connects.
        </p>
      </div>

      {/* ─── ARCHITECTURE MAP ─── */}
      <Sec id="arch-map" title="The Architecture Map" defaultOpen={true} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>Three pieces. The robot is just the face — the brain lives on your server.</P>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "16px 0 8px" }}>
            <Box icon="🤖" label="The Robot" sub="Mic, speaker, camera, screen. Sits on desk. Connects to WiFi." color={ACCENT} />
            <Connector label="WebSocket via WiFi" />
            <Box icon="🧠" label="Your Server (VPS)" sub="xiaozhi-server + OpenClaw. Runs 24/7. This is the brain." color={GREEN} />
            <Connector label="API calls" />
            <Box icon="⚡" label="AI Models" sub="GLM 4.5 (chat) + Kimi K2.5 (vision) + FunASR (ears) + EdgeTTS (voice)" color={YELLOW} />
          </div>

          <div style={{
            background: CREAM, borderRadius: 12, padding: "14px 16px", margin: "16px 0 8px",
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 8 }}>Two channels, same brain:</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ background: WHITE, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>🗣️</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: NAVY }}>Voice</div>
                <div style={{ fontSize: 10, color: SUBTLE, marginTop: 2 }}>Robot on desk</div>
                <div style={{ fontSize: 10, color: SUBTLE }}>For business owner</div>
              </div>
              <div style={{ background: WHITE, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>💬</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: NAVY }}>WhatsApp</div>
                <div style={{ fontSize: 10, color: SUBTLE, marginTop: 2 }}>Auto-reply bot</div>
                <div style={{ fontSize: 10, color: SUBTLE }}>For their customers</div>
              </div>
            </div>
          </div>
        </div>
      </Sec>

      {/* ─── VOICE FLOW ─── */}
      <Sec id="arch-voice" title="Voice Flow" badge="robot → answer" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>When someone speaks to the robot, this is what happens behind the scenes:</P>

          <div style={{ margin: "12px 0 4px" }}>
            <Step n="1" title="You speak to the robot" desc="The microphone picks up your voice." color={ACCENT} />
            <Arrow />
            <Step n="2" title="Audio sent to your server" desc="Via WiFi → WebSocket. Instant." color={ACCENT} />
            <Arrow />
            <Step n="3" title="FunASR converts speech → text" desc="Free open-source tool on your server. Understands Bahasa Indonesia." color={GREEN} />
            <Arrow />
            <Step n="4" title="GLM 4.5 reads + thinks" desc="The AI model reads the text, uses your system prompt (secret recipe), and generates a smart response." color={GREEN} />
            <Arrow />
            <Step n="5" title="EdgeTTS converts text → speech" desc="Free open-source tool. Turns the AI's answer into natural audio." color={GREEN} />
            <Arrow />
            <Step n="6" title="Robot speaks the answer" desc="Audio sent back via WiFi. The robot talks back within 1-2 seconds." color={ACCENT} />
          </div>
        </div>
      </Sec>

      {/* ─── WHATSAPP FLOW ─── */}
      <Sec id="arch-wa" title="WhatsApp Flow" badge="message → reply" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>When a customer sends a WhatsApp message to your bot number:</P>

          <div style={{ margin: "12px 0 4px" }}>
            <Step n="1" title="Customer sends WhatsApp message" desc="To your bot's phone number (Indonesian SIM card)." color="#25D366" />
            <Arrow />
            <Step n="2" title="Your server receives it" desc="OpenClaw is connected to WhatsApp via QR scan (done once on your laptop)." color={GREEN} />
            <Arrow />
            <Step n="3" title="AI reads + thinks + replies" desc="Same AI brain as the robot. Uses the same system prompt. Sends reply back via WhatsApp." color={GREEN} />
            <Arrow />
            <Step n="4" title="Customer gets smart reply" desc="Instantly. 24/7. Even at 3am. The business owner never wakes up." color="#25D366" />
          </div>

          <div style={{
            background: `${ACCENT}08`, borderRadius: 10, padding: "12px 14px", marginTop: 12,
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 4 }}>
              How do I scan the QR code?
            </div>
            <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.6 }}>
              Open xiaozhi-server's web dashboard on your laptop (not the robot screen — it's too small). The QR code shows full-size in your browser. Scan it with the phone that has the bot's SIM card. Done once, stays connected.
            </div>
          </div>
        </div>
      </Sec>

      {/* ─── AUTOMATION ENGINE (MASTER DIAGRAM) ─── */}
      <Sec id="arch-auto" title="Automation Engine" badge="the superpower" defaultOpen={true} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>This is what makes OIC more than a chatbot. Your server has a <span style={{ fontWeight: 600, color: NAVY }}>virtual browser</span> (Playwright) — it can use any website like a human does.</P>

          {/* Master architecture */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "16px 0 8px" }}>
            <Box icon="🗣️" label="User Command" sub={`"OIC, beli toner Skintific di Tokopedia"`} color={ACCENT} />
            <Connector label="voice or WhatsApp" />
            <Box icon="🧠" label="AI Brain" sub="Understands intent → picks the right skill" color={GREEN} />
            <Connector label="triggers" />

            {/* Skill router */}
            <div style={{
              background: CREAM, borderRadius: 14, padding: "14px 16px", width: "100%",
              border: `1.5px dashed ${ACCENT}40`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT, marginBottom: 10, textAlign: "center", textTransform: "uppercase", letterSpacing: 1 }}>
                Skill Router
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                {[
                  { icon: "🛒", label: "Shop", color: "#FF6B00" },
                  { icon: "🧾", label: "Invoice", color: "#AF52DE" },
                  { icon: "✈️", label: "Book", color: ACCENT },
                  { icon: "📊", label: "Report", color: GREEN },
                  { icon: "🖨️", label: "Print", color: NAVY },
                  { icon: "📱", label: "Social", color: "#25D366" },
                ].map((s) => (
                  <div key={s.label} style={{
                    background: WHITE, borderRadius: 8, padding: "8px 6px", textAlign: "center",
                    border: `1px solid ${s.color}20`,
                  }}>
                    <div style={{ fontSize: 16 }}>{s.icon}</div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: s.color, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <Connector label="executes via" />

            {/* Browser + tools layer */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%" }}>
              <div style={{
                background: `${YELLOW}10`, border: `1.5px solid ${YELLOW}30`, borderRadius: 12,
                padding: "12px 10px", textAlign: "center",
              }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>🌐</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>Playwright</div>
                <div style={{ fontSize: 10, color: SUBTLE, marginTop: 2, lineHeight: 1.4 }}>
                  Headless browser on your server. Opens websites, clicks, types, screenshots. Like a human.
                </div>
              </div>
              <div style={{
                background: `${GREEN}10`, border: `1.5px solid ${GREEN}30`, borderRadius: 12,
                padding: "12px 10px", textAlign: "center",
              }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>💰</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>OIC Wallet</div>
                <div style={{ fontSize: 10, color: SUBTLE, marginTop: 2, lineHeight: 1.4 }}>
                  Pre-loaded e-money balance. User tops up. OIC pays from here (with permission).
                </div>
              </div>
            </div>

            <Connector label="permission gate" />

            <div style={{
              background: `${RED}08`, border: `1.5px solid ${RED}25`, borderRadius: 12,
              padding: "10px 14px", width: "100%", textAlign: "center",
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: RED }}>
                Money action? → WhatsApp asks "OK / NO?" → waits
              </div>
            </div>

            <Connector label="result" />
            <Box icon="✅" label="Done" sub="Sends confirmation + screenshot + receipt via WhatsApp" color={GREEN} />
          </div>
        </div>
      </Sec>

      {/* ─── SHOPPING AUTOMATION ─── */}
      <Sec id="arch-shop" title="Shopping Automation" badge="Tokopedia" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>User says <span style={{ fontWeight: 600, color: NAVY }}>"OIC, belikan toner Skintific dari Tokopedia"</span> — this is what happens:</P>

          <div style={{ margin: "12px 0 4px" }}>
            <Step n="1" title={`User gives command`} desc={`Voice to robot or WhatsApp message. "Buy Skintific toner from Tokopedia, cheapest one."`} color={ACCENT} />
            <Arrow />
            <Step n="2" title="AI parses intent" desc={`Brain extracts: action=BUY, product="Skintific toner", platform=Tokopedia, criteria=cheapest.`} color={GREEN} />
            <Arrow />
            <Step n="3" title="Playwright opens Tokopedia" desc="Server's virtual browser opens Tokopedia. Already logged into the user's account (login saved from first setup)." color={YELLOW} />
            <Arrow />
            <Step n="4" title="Searches + compares" desc="Types search query → scrolls results → reads prices, ratings, seller reputation. AI vision model sees the page like a human." color={YELLOW} />
            <Arrow />
            <Step n="5" title="Picks best option" desc={`Finds "Skintific Toner 100ml — Rp 89.000" from Official Store, 4.9 rating, free shipping.`} color={YELLOW} />
            <Arrow />

            {/* PERMISSION GATE */}
            <div style={{
              background: `${RED}06`, border: `1.5px solid ${RED}20`, borderRadius: 14,
              padding: "14px 16px", margin: "4px 0",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", background: RED,
                  color: WHITE, fontSize: 14, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>6</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: RED }}>Permission Gate</div>
                  <div style={{ fontSize: 11, color: SUBTLE }}>OIC NEVER spends money without asking</div>
                </div>
              </div>
              <div style={{
                background: WHITE, borderRadius: 10, padding: "12px 14px",
                fontFamily: "'DM Mono',monospace", fontSize: 11, lineHeight: 1.8, color: NAVY,
              }}>
                <span style={{ color: GREEN, fontWeight: 600 }}>OIC:</span> Saya menemukan produk ini:<br />
                <br />
                Skintific Toner 100ml<br />
                Rp 89.000 — Official Store<br />
                Rating 4.9 — Free ongkir<br />
                <br />
                Bayar dari OIC Wallet (saldo: Rp 500.000)?<br />
                <br />
                Balas <span style={{ fontWeight: 700, color: GREEN }}>OK</span> untuk checkout<br />
                Balas <span style={{ fontWeight: 700, color: RED }}>NO</span> untuk batal
              </div>
            </div>

            <Arrow />
            <Step n="7" title="User replies OK" desc="Via WhatsApp. Simple one-word reply." color="#25D366" />
            <Arrow />
            <Step n="8" title="Playwright checks out" desc="Adds to cart → selects address → applies voucher if any → pays from linked e-wallet (GoPay/OVO/Dana)." color={YELLOW} />
            <Arrow />
            <Step n="9" title="Confirmation sent" desc="OIC sends WhatsApp: order screenshot + tracking number + expected delivery date. Done." color={GREEN} />
          </div>

          {/* OIC Wallet explainer */}
          <div style={{
            background: CREAM, borderRadius: 12, padding: "14px 16px", marginTop: 12,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 8 }}>How OIC Wallet works:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { icon: "1.", t: "User tops up", d: "Transfer to a dedicated OIC e-wallet (GoPay/OVO/Dana linked to the bot's account). Like topping up a prepaid card." },
                { icon: "2.", t: "Balance tracked", d: "OIC always knows the balance. Won't attempt purchase if insufficient. Tells user to top up." },
                { icon: "3.", t: "Every purchase needs OK", d: "OIC sends product + price + balance via WhatsApp. User replies OK. Only then it buys." },
                { icon: "4.", t: "Receipt + audit trail", d: "Every transaction logged: what, when, how much, screenshot proof. User can review anytime." },
              ].map((s) => (
                <div key={s.icon} style={{ display: "flex", gap: 10, padding: "4px 0" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, minWidth: 18 }}>{s.icon}</span>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{s.t}: </span>
                    <span style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.5 }}>{s.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sec>

      {/* ─── INVOICE & ACCOUNTING AUTOMATION ─── */}
      <Sec id="arch-invoice" title="Invoice & Accounting" badge="PDF + print" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>User says <span style={{ fontWeight: 600, color: NAVY }}>"OIC, buat invoice untuk Vendor A, 50 unit widget @Rp 100K"</span></P>

          <div style={{ margin: "12px 0 4px" }}>
            <Step n="1" title="User gives command" desc={`Voice or WhatsApp. "Create invoice for Vendor A, 50 widgets at Rp 100K each."`} color="#AF52DE" />
            <Arrow />
            <Step n="2" title="AI parses the data" desc={`Extracts: type=INVOICE, vendor="Vendor A", items=[{qty:50, desc:"Widget", price:100000}], total=Rp 5.000.000`} color={GREEN} />
            <Arrow />
            <Step n="3" title="Server generates PDF" desc="Uses invoice template on your server. Auto-fills: company logo, date, invoice number (auto-increment), line items, total, bank details." color="#AF52DE" />
            <Arrow />

            {/* Delivery options - branching */}
            <div style={{
              background: `#AF52DE08`, border: `1.5px solid #AF52DE25`, borderRadius: 14,
              padding: "14px 16px", margin: "4px 0",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", background: "#AF52DE",
                  color: WHITE, fontSize: 14, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>4</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#AF52DE" }}>Delivery Options</div>
                  <div style={{ fontSize: 11, color: SUBTLE }}>OIC asks how you want it</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { icon: "📱", label: "Send PDF via WhatsApp", desc: "OIC sends the invoice as a PDF attachment in WhatsApp — you can forward it to the vendor.", color: "#25D366" },
                  { icon: "🖨️", label: "Print it", desc: "Server sends to your network printer via CUPS. Invoice prints at your office. No computer needed.", color: NAVY },
                  { icon: "📧", label: "Email to vendor", desc: "Playwright opens your email, attaches PDF, sends to vendor's email address.", color: ACCENT },
                  { icon: "📊", label: "Log to accounting", desc: "Auto-records in your spreadsheet or accounting system (Jurnal.id / BukuKas). Entry created automatically.", color: GREEN },
                ].map((o) => (
                  <div key={o.label} style={{
                    background: WHITE, borderRadius: 10, padding: "10px 12px",
                    display: "flex", gap: 10, alignItems: "flex-start",
                  }}>
                    <span style={{ fontSize: 16 }}>{o.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: o.color }}>{o.label}</div>
                      <div style={{ fontSize: 11, color: SUBTLE, lineHeight: 1.5, marginTop: 2 }}>{o.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Arrow />
            <Step n="5" title="Auto-logged + numbered" desc="Invoice saved to server. Invoice number auto-incremented. Searchable history. End-of-month report auto-generated." color="#AF52DE" />
          </div>

          {/* Monthly auto-report */}
          <div style={{
            background: CREAM, borderRadius: 12, padding: "14px 16px", marginTop: 12,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 8 }}>End-of-month autopilot:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { t: "Day 28-30", d: "OIC auto-generates monthly financial summary: total invoices, total revenue, outstanding payments, expenses." },
                { t: "Report to board", d: `OIC compiles a PDF report → sends to you via WhatsApp. "Laporan bulan ini sudah siap, Pak."` },
                { t: "Purchase orders", d: "OIC can also generate POs using the same template system. User says \"buat PO untuk supplier B\" → done." },
                { t: "Recurring invoices", d: "Set it once: \"kirim invoice Rp 2M ke Client X setiap tanggal 1.\" OIC remembers and does it every month." },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#AF52DE", minWidth: 70 }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.5 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation example */}
          <div style={{
            background: `${ACCENT}06`, border: `1.5px solid ${ACCENT}15`, borderRadius: 12,
            padding: "14px 16px", marginTop: 12,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: ACCENT, marginBottom: 8 }}>Example conversation:</div>
            <div style={{
              fontFamily: "'DM Mono',monospace", fontSize: 11, lineHeight: 2, color: NAVY,
            }}>
              <span style={{ color: ACCENT }}>You:</span> OIC, kirim invoice ke Vendor A<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dan kasih PDF-nya di WhatsApp<br />
              <br />
              <span style={{ color: GREEN }}>OIC:</span> Siap. Invoice #INV-2026-047<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vendor A — 50x Widget<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total: Rp 5.000.000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📎 INV-2026-047.pdf<br />
              <br />
              <span style={{ color: ACCENT }}>You:</span> Print juga ya<br />
              <br />
              <span style={{ color: GREEN }}>OIC:</span> Sudah dikirim ke printer. ✓
            </div>
          </div>
        </div>
      </Sec>

      {/* ─── BOOKING AUTOMATION ─── */}
      <Sec id="arch-book" title="Booking Automation" badge="flights + hotels" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>User says <span style={{ fontWeight: 600, color: NAVY }}>"OIC, carikan tiket Jakarta-Bali tanggal 20 Maret"</span></P>

          <div style={{ margin: "12px 0 4px" }}>
            <Step n="1" title="User gives command" desc={`"Find me a flight Jakarta to Bali, March 20, cheapest economy."`} color={ACCENT} />
            <Arrow />
            <Step n="2" title="AI parses intent" desc={`Extracts: action=BOOK_FLIGHT, from=CGK, to=DPS, date=2026-03-20, class=economy, criteria=cheapest.`} color={GREEN} />
            <Arrow />
            <Step n="3" title="Playwright opens Traveloka" desc="Server's virtual browser opens Traveloka (or Tiket.com). Already logged in." color={YELLOW} />
            <Arrow />
            <Step n="4" title="Searches + compares" desc="Enters route + date → reads all results → compares prices, airlines, departure times. AI vision reads the page." color={YELLOW} />
            <Arrow />

            {/* Options presentation */}
            <div style={{
              background: `${ACCENT}06`, border: `1.5px solid ${ACCENT}20`, borderRadius: 14,
              padding: "14px 16px", margin: "4px 0",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", background: ACCENT,
                  color: WHITE, fontSize: 14, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>5</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: ACCENT }}>Presents Options</div>
                  <div style={{ fontSize: 11, color: SUBTLE }}>OIC sends top 3 via WhatsApp</div>
                </div>
              </div>

              <div style={{
                background: WHITE, borderRadius: 10, padding: "12px 14px",
                fontFamily: "'DM Mono',monospace", fontSize: 11, lineHeight: 1.8, color: NAVY,
              }}>
                <span style={{ color: GREEN, fontWeight: 600 }}>OIC:</span> 3 pilihan terbaik CGK→DPS<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20 Mar 2026:<br />
                <br />
                1️⃣ Lion Air 06:15 — Rp 650K<br />
                &nbsp;&nbsp;&nbsp;&nbsp;Direct • 1h 45m<br />
                <br />
                2️⃣ Citilink 09:30 — Rp 720K<br />
                &nbsp;&nbsp;&nbsp;&nbsp;Direct • 1h 50m<br />
                <br />
                3️⃣ Garuda 14:00 — Rp 1.2M<br />
                &nbsp;&nbsp;&nbsp;&nbsp;Direct • 1h 40m • Baggage 20kg<br />
                <br />
                Balas 1, 2, atau 3.
              </div>
            </div>

            <Arrow />
            <Step n="6" title="User replies: 2" desc="Simple number reply via WhatsApp." color="#25D366" />
            <Arrow />

            {/* Permission for payment */}
            <div style={{
              background: `${RED}06`, border: `1.5px solid ${RED}20`, borderRadius: 14,
              padding: "14px 16px", margin: "4px 0",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", background: RED,
                  color: WHITE, fontSize: 14, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>7</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: RED }}>Payment Confirmation</div>
                  <div style={{ fontSize: 11, color: SUBTLE }}>Final check before spending money</div>
                </div>
              </div>
              <div style={{
                background: WHITE, borderRadius: 10, padding: "10px 14px",
                fontFamily: "'DM Mono',monospace", fontSize: 11, lineHeight: 1.8, color: NAVY,
              }}>
                <span style={{ color: GREEN, fontWeight: 600 }}>OIC:</span> Citilink 09:30 — Rp 720.000<br />
                Saldo OIC Wallet: Rp 2.500.000<br />
                <br />
                Bayar dan booking? <span style={{ fontWeight: 700, color: GREEN }}>OK</span> / <span style={{ fontWeight: 700, color: RED }}>NO</span>
              </div>
            </div>

            <Arrow />
            <Step n="8" title="Playwright books + pays" desc="Fills passenger details (saved on server) → selects seat → pays from OIC Wallet → completes booking." color={YELLOW} />
            <Arrow />
            <Step n="9" title="E-ticket delivered" desc="OIC sends: booking confirmation screenshot + e-ticket PDF via WhatsApp. Also saves to booking history on server." color={GREEN} />
          </div>
        </div>
      </Sec>

      {/* ─── AUTOMATION CAPABILITY TREE ─── */}
      <Sec id="arch-tree" title="Automation Capabilities" badge="full tree" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>Everything OIC can automate, organized by category. All use the same engine: AI brain + Playwright browser + OIC Wallet.</P>

          {[
            {
              cat: "Shopping & Commerce",
              icon: "🛒",
              color: "#FF6B00",
              items: [
                { t: "Buy products", d: "Tokopedia, Shopee, Bukalapak — search, compare, checkout" },
                { t: "Track orders", d: "Check delivery status, notify when arriving" },
                { t: "Reorder supplies", d: `"Restock toner setiap bulan" — recurring auto-purchase` },
                { t: "Price monitoring", d: "Watch a product, notify when price drops below target" },
              ],
            },
            {
              cat: "Finance & Accounting",
              icon: "🧾",
              color: "#AF52DE",
              items: [
                { t: "Create invoices", d: "Generate PDF, send via WhatsApp/email, auto-number" },
                { t: "Purchase orders", d: "Generate PO, send to supplier, track status" },
                { t: "Monthly reports", d: "Auto-generate financial summary at end of month" },
                { t: "Expense tracking", d: "Log every OIC Wallet transaction automatically" },
                { t: "Recurring billing", d: "Auto-send invoice to client X every 1st of month" },
              ],
            },
            {
              cat: "Travel & Booking",
              icon: "✈️",
              color: ACCENT,
              items: [
                { t: "Book flights", d: "Traveloka, Tiket.com — search, compare, book, pay" },
                { t: "Book hotels", d: "Same flow — find best deal, present options, book" },
                { t: "Book restaurants", d: "Reserve via platform or WhatsApp to restaurant" },
                { t: "Calendar scheduling", d: "Check availability, book appointments, send reminders" },
              ],
            },
            {
              cat: "Documents & Printing",
              icon: "🖨️",
              color: NAVY,
              items: [
                { t: "Generate PDFs", d: "Invoices, reports, letters — from template or freeform" },
                { t: "Print documents", d: "Send to network printer via CUPS. Zero-touch." },
                { t: "Send via WhatsApp", d: "Attach PDF in WhatsApp chat. User can forward/print" },
                { t: "Create spreadsheets", d: "Auto-generate Excel/CSV reports for accounting" },
              ],
            },
            {
              cat: "Communication",
              icon: "📱",
              color: "#25D366",
              items: [
                { t: "Reply WhatsApp", d: "Auto-reply to customer messages 24/7" },
                { t: "Send bulk messages", d: "Broadcast promotions to customer list (with permission)" },
                { t: "Send emails", d: "Playwright opens Gmail/email client, composes, sends" },
                { t: "Post social media", d: "Compose post, add image, publish to IG/FB/TikTok" },
              ],
            },
          ].map((cat) => (
            <div key={cat.cat} style={{ marginBottom: 12 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 0 6px", borderBottom: `1.5px solid ${cat.color}20`,
              }}>
                <span style={{ fontSize: 18 }}>{cat.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: cat.color }}>{cat.cat}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {cat.items.map((item) => (
                  <div key={item.t} style={{
                    display: "flex", gap: 10, padding: "8px 0 8px 30px",
                    borderBottom: `0.5px solid ${WARM}`,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: cat.color, flexShrink: 0, marginTop: 5, opacity: 0.6 }} />
                    <div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{item.t}</span>
                      <span style={{ fontSize: 12, color: SUBTLE }}> — {item.d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* The differentiator callout */}
          <div style={{
            background: `${ACCENT}08`, border: `2px solid ${ACCENT}25`, borderRadius: 14,
            padding: "16px", marginTop: 16,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT, marginBottom: 8 }}>
              This is your moat
            </div>
            <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.7 }}>
              Anyone can make a chatbot that answers questions. But a robot that can <span style={{ fontWeight: 600, color: NAVY }}>actually shop, create invoices, book flights, print documents, and handle money</span> — that's an AI employee. That's what clients pay Rp 2M/month for. The more automations you build, the stickier the product becomes.
            </div>
          </div>
        </div>
      </Sec>

      {/* ─── SKILL ARCHITECTURE ─── */}
      <Sec id="arch-skills" title="Skill Architecture" badge="why 98%" defaultOpen={true} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>The automations above show <span style={{ fontWeight: 600, color: NAVY }}>what</span> OIC can do. This section shows <span style={{ fontWeight: 600, color: NAVY }}>how</span> — the exact instruction files that make it reliable.</P>

          {/* Core concept */}
          <div style={{
            background: CREAM, borderRadius: 14, padding: "16px",
            border: `1.5px dashed ${ACCENT}40`, margin: "14px 0",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1, textAlign: "center" }}>
              What is a Skill?
            </div>
            <P>A skill is a <span style={{ fontWeight: 600, color: NAVY }}>.md file</span> on your server that tells the AI <span style={{ fontWeight: 600, color: NAVY }}>exactly</span> what to do, step by step. Like a recipe card.</P>
            <P>Without a skill, the AI guesses. With a skill, it follows a script.</P>
          </div>

          {/* Visual: skill pipeline */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "16px 0 8px" }}>
            <Box icon="📝" label="skill-book-flight.md" sub="Pre-written instruction set. Lives on your server." color={ACCENT} />
            <Connector label="loaded into" />
            <Box icon="🧠" label="AI Brain (GLM 4.5)" sub="Reads the skill file. Follows instructions literally." color={GREEN} />
            <Connector label="executes via" />
            <Box icon="🌐" label="OpenClaw + Playwright" sub="Headless browser. AI controls it step by step." color={YELLOW} />
            <Connector label="verified by" />
            <Box icon="👁️" label="Vision Model (Kimi K2.5)" sub="Screenshots after each step. AI checks: did it work?" color="#AF52DE" />
          </div>

          {/* Without vs With */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "14px 0" }}>
            <div style={{
              background: `${RED}08`, border: `1.5px solid ${RED}25`, borderRadius: 12,
              padding: "12px 10px", textAlign: "center",
            }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>🎲</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: RED }}>Without Skills</div>
              <div style={{ fontSize: 11, color: SUBTLE, marginTop: 4, lineHeight: 1.5 }}>
                AI improvises each step. Different every time. Breaks when website changes. ~40% success.
              </div>
            </div>
            <div style={{
              background: `${GREEN}08`, border: `1.5px solid ${GREEN}25`, borderRadius: 12,
              padding: "12px 10px", textAlign: "center",
            }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>📋</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: GREEN }}>With Skills</div>
              <div style={{ fontSize: 11, color: SUBTLE, marginTop: 4, lineHeight: 1.5 }}>
                AI follows exact script. Same steps every time. Fallbacks for edge cases. 98% success.
              </div>
            </div>
          </div>

          {/* File tree */}
          <div style={{ fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 8, marginTop: 16 }}>
            Skills live alongside the system prompt:
          </div>
          <div style={{
            background: CREAM, borderRadius: 12, padding: "14px 16px",
            fontFamily: "'DM Mono',monospace", fontSize: 11, lineHeight: 1.8, color: NAVY,
          }}>
            /server/prompts/<br />
            ├── system-prompt-trader.md<br />
            ├── system-prompt-beauty.md<br />
            ├── system-prompt-toko.md<br />
            ├── skills/<br />
            │&nbsp;&nbsp; ├── browse.md<br />
            │&nbsp;&nbsp; ├── vision.md<br />
            │&nbsp;&nbsp; ├── shop-tokopedia.md<br />
            │&nbsp;&nbsp; ├── book-flight.md<br />
            │&nbsp;&nbsp; ├── create-invoice.md<br />
            │&nbsp;&nbsp; └── print.md<br />
          </div>
        </div>
      </Sec>

      {/* ─── PERSONA SKILL MAP ─── */}
      <Sec id="arch-personas" title="Persona Skill Map" badge="who needs what" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>Each persona gets a tailored set of skills. The system prompt defines <span style={{ fontWeight: 600, color: NAVY }}>personality</span>. Skills define what it can <span style={{ fontWeight: 600, color: NAVY }}>do</span>.</P>

          {[
            {
              name: "OIC Trader", icon: "📈", color: GREEN,
              desc: "For forex/crypto traders. Analyzes charts, looks up market data, journals trades.",
              skills: [
                { skill: "/analyze-chart", tools: ["/vision", "/camera"] },
                { skill: "/market-data", tools: ["/browse"] },
                { skill: "/trade-journal", tools: ["/pdf-gen"] },
                { skill: "/alert-price", tools: ["/browse", "/whatsapp"] },
              ],
            },
            {
              name: "OIC Beauty", icon: "💄", color: "#AF52DE",
              desc: "For beauty salons. Recommends products, books appointments, analyzes skin.",
              skills: [
                { skill: "/recommend", tools: ["/browse", "/vision"] },
                { skill: "/book-appt", tools: ["/browse", "/whatsapp"] },
                { skill: "/skin-analysis", tools: ["/vision", "/camera"] },
                { skill: "/shop-beauty", tools: ["/browse", "/wallet"] },
              ],
            },
            {
              name: "OIC Toko", icon: "🏪", color: "#FF6B00",
              desc: "For online sellers. Manages Tokopedia/Shopee orders, tracks inventory, replies to customers.",
              skills: [
                { skill: "/manage-orders", tools: ["/browse", "/vision"] },
                { skill: "/check-inventory", tools: ["/browse"] },
                { skill: "/reply-customer", tools: ["/whatsapp"] },
                { skill: "/shop", tools: ["/browse", "/wallet"] },
                { skill: "/create-invoice", tools: ["/pdf-gen", "/print"] },
              ],
            },
            {
              name: "OIC Tender", icon: "📑", color: NAVY,
              desc: "For construction/procurement. Finds tenders, prepares documents, tracks deadlines.",
              skills: [
                { skill: "/find-tender", tools: ["/browse", "/vision"] },
                { skill: "/prepare-docs", tools: ["/pdf-gen"] },
                { skill: "/track-deadline", tools: ["/whatsapp"] },
                { skill: "/create-invoice", tools: ["/pdf-gen", "/print"] },
              ],
            },
          ].map((persona) => (
            <div key={persona.name} style={{
              background: `${persona.color}06`, border: `1.5px solid ${persona.color}20`,
              borderRadius: 14, padding: "14px 16px", marginBottom: 10,
            }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, background: `${persona.color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                }}>{persona.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: persona.color }}>{persona.name}</div>
                  <div style={{ fontSize: 11, color: SUBTLE, lineHeight: 1.4 }}>{persona.desc}</div>
                </div>
              </div>

              {/* Skills list */}
              <div style={{ fontSize: 10, fontWeight: 600, color: SUBTLE, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Required Skills:
              </div>
              {persona.skills.map((s) => (
                <div key={s.skill} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "6px 0", borderBottom: `0.5px solid ${WARM}`,
                }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: NAVY, fontFamily: "'DM Mono',monospace" }}>{s.skill}</span>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {s.tools.map((t) => <SkillBadge key={t} label={t} color={persona.color} />)}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Shared foundation */}
          <div style={{
            background: `${ACCENT}08`, border: `1.5px solid ${ACCENT}25`,
            borderRadius: 12, padding: "12px 14px", marginTop: 6,
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: ACCENT, marginBottom: 6 }}>
              Shared foundation skills (every persona uses):
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <SkillBadge label="/browse" color={ACCENT} />
              <SkillBadge label="/vision" color={ACCENT} />
              <SkillBadge label="/whatsapp" color={ACCENT} />
            </div>
            <div style={{ fontSize: 11, color: SUBTLE, marginTop: 6, lineHeight: 1.5 }}>
              These are the core tools. Persona-specific skills build on top of them.
            </div>
          </div>
        </div>
      </Sec>

      {/* ─── SKILL DEEP-DIVES ─── */}
      <Sec id="arch-dives" title="Skill Deep-Dives" badge="the scripts" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>These are the <span style={{ fontWeight: 600, color: NAVY }}>exact instruction sets</span> loaded into the AI brain. Each skill is a recipe — follow the steps, get consistent results.</P>

          {SKILLS.map((skill) => (
            <div key={skill.id} style={{
              background: WHITE, border: `1.5px solid ${skill.color}20`,
              borderRadius: 14, marginBottom: 12, overflow: "hidden",
            }}>
              {/* Card header */}
              <div style={{
                background: `${skill.color}08`, padding: "12px 16px",
                borderBottom: `1px solid ${skill.color}15`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{skill.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: skill.color, fontFamily: "'DM Mono',monospace" }}>
                      {skill.name}
                    </div>
                    <div style={{ fontSize: 11, color: SUBTLE }}>{skill.label}</div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "12px 16px" }}>
                {/* Trigger */}
                <div style={{ background: CREAM, borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: SUBTLE, textTransform: "uppercase", letterSpacing: 0.5 }}>Trigger: </span>
                  <span style={{ fontSize: 11, color: NAVY, fontStyle: "italic" }}>{skill.trigger}</span>
                </div>

                {/* Tools used */}
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: SUBTLE, textTransform: "uppercase", letterSpacing: 0.5 }}>Tools: </span>
                  {skill.tools.map((t) => <SkillBadge key={t} label={t} color={skill.color} />)}
                </div>

                {/* Instruction steps */}
                <div style={{ fontSize: 10, fontWeight: 700, color: skill.color, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                  Instruction Set
                </div>
                {skill.steps.map((step) => (
                  <RecipeStep key={step.n} n={step.n} text={step.text} tool={step.tool} />
                ))}

                {/* Fallbacks */}
                <div style={{ background: `${RED}06`, borderRadius: 10, padding: "10px 14px", marginTop: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: RED, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                    Fallbacks
                  </div>
                  {skill.fallbacks.map((fb, i) => (
                    <FallbackItem key={i} condition={fb.condition} action={fb.action} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      {/* ─── RELIABILITY PATTERNS ─── */}
      <Sec id="arch-reliable" title="Reliability Patterns" badge="98% accuracy" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>Skills alone get you to ~80%. These five patterns push accuracy to <span style={{ fontWeight: 600, color: GREEN }}>98%</span>.</P>

          {[
            {
              n: "1", icon: "📸", title: "Screenshot Verification", color: "#AF52DE",
              desc: "After EVERY action (click, type, navigate), take a screenshot and send to the vision model. Ask: 'Did the expected change happen?' If not, retry or fallback.",
              example: "Click 'Cari Penerbangan' → Screenshot → Vision: 'Flight results loaded, 15 results.' → Continue.",
            },
            {
              n: "2", icon: "🔄", title: "Fallback Chains", color: YELLOW,
              desc: "Every step has a Plan B. If Plan B fails, Plan C. If all fail, ask a human. The AI never gets stuck — it always has a next move.",
              example: "Can't find button by text → Try visual position → Scroll down → Full screenshot + ask admin.",
            },
            {
              n: "3", icon: "🎯", title: "Visual Element Detection", color: GREEN,
              desc: "Never rely on CSS selectors or coordinates (these break when websites update). Use the vision model to find elements by what they LOOK like: 'Find the blue checkout button'.",
              example: "Instead of click('#btn-checkout') → /vision 'find checkout button' → returns (x,y) → click.",
            },
            {
              n: "4", icon: "🔐", title: "Login Persistence", color: ACCENT,
              desc: "Playwright saves browser sessions (cookies, localStorage). Login once → stays logged in for weeks. No re-login each time a skill runs.",
              example: "First run: login to Tokopedia → save context. Next 100 runs: opens already logged in.",
            },
            {
              n: "5", icon: "🆘", title: "Human Escalation", color: RED,
              desc: "If stuck after all fallbacks, the AI does NOT guess or force through. It screenshots the problem and sends it to admin via WhatsApp, then waits.",
              example: "CAPTCHA → AI can't solve → Sends: 'Stuck di CAPTCHA. Tolong solve manual.' → Waits → Resumes.",
            },
          ].map((p) => (
            <div key={p.n} style={{
              background: `${p.color}06`, border: `1.5px solid ${p.color}20`,
              borderRadius: 14, padding: "14px 16px", marginBottom: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", background: p.color,
                  color: WHITE, fontSize: 14, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>{p.n}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: p.color }}>{p.title}</div>
              </div>
              <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.7, marginBottom: 8 }}>{p.desc}</div>
              <div style={{
                background: CREAM, borderRadius: 8, padding: "8px 12px",
                fontFamily: "'DM Mono',monospace", fontSize: 10, color: NAVY, lineHeight: 1.7,
              }}>{p.example}</div>
            </div>
          ))}

          {/* Accuracy progression */}
          <div style={{
            background: `${GREEN}10`, border: `2px solid ${GREEN}25`,
            borderRadius: 14, padding: "16px", marginTop: 6,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: GREEN, marginBottom: 10 }}>
              Accuracy builds in layers
            </div>
            {[
              { level: "Raw AI (no skill)", pct: "~40%", bar: 40 },
              { level: "+ Skill script", pct: "~75%", bar: 75 },
              { level: "+ Screenshot verify", pct: "~85%", bar: 85 },
              { level: "+ Fallback chains", pct: "~92%", bar: 92 },
              { level: "+ Visual detection", pct: "~96%", bar: 96 },
              { level: "+ Human escalation", pct: "98%+", bar: 98 },
            ].map((l) => (
              <div key={l.level} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ fontSize: 10, color: SUBTLE, minWidth: 38, textAlign: "right", flexShrink: 0, fontFamily: "'DM Mono',monospace" }}>{l.pct}</div>
                <div style={{ flex: 1, height: 6, background: WARM, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    width: `${l.bar}%`, height: "100%", borderRadius: 3,
                    background: l.bar >= 96 ? GREEN : l.bar >= 85 ? YELLOW : l.bar >= 75 ? "#FF6B00" : RED,
                  }} />
                </div>
                <div style={{ fontSize: 10, color: NAVY, minWidth: 105, flexShrink: 0 }}>{l.level}</div>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* ─── BUILD STEPS (LEGO) ─── */}
      <Sec id="arch-build" title="Build Steps" badge="1 → 8" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P bold>Follow these in order. Each step unlocks the next one.</P>

          <div style={{ margin: "12px 0 4px" }}>
            <Step n="1" title="Buy server" desc="Hostinger VPS KVM 2, $14/month, Singapore location. This is OIC's brain." color={NAVY} />
            <Arrow />
            <Step n="2" title="Install xiaozhi-server + OpenClaw" desc="SSH into VPS → clone repos → docker compose up. Two commands. The core software is now running." color={NAVY} />
            <Arrow />
            <Step n="3" title="Plug in the AI" desc="Sign up at bigmodel.cn → get API key → paste into xiaozhi-server config. Also install FunASR + EdgeTTS (voice) on same server." color={NAVY} />
            <Arrow />
            <Step n="4" title="Write your secret recipe" desc="Create an .md file with your system prompt — personality, rules, knowledge. Upload to server. This is your competitive edge." color={NAVY} />
            <Arrow />
            <Step n="5" title="Connect WhatsApp" desc="Buy Indonesian SIM → install WhatsApp on a phone → open server dashboard on your laptop → scan QR code. Bot goes live." color={NAVY} />
            <Arrow />
            <Step n="6" title="Order robots" desc="3x Stack-chan from Taobao/M5Stack ($237). When they arrive, connect via USB → flash xiaozhi firmware. One-time." color={NAVY} />
            <Arrow />
            <Step n="7" title="Configure robot → server" desc="On the robot: set WiFi + server address (your VPS IP). Robot connects. Speak to it — if it answers, you're done." color={NAVY} />
            <Arrow />
            <Step n="8" title="Test everything" desc="Full test: speak to robot → it replies. Send WhatsApp → bot replies. Point camera → AI analyzes. All three work? Ship it." color={GREEN} />
          </div>

          <div style={{
            background: `${GREEN}10`, borderRadius: 10, padding: "12px 14px", marginTop: 12,
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: GREEN, marginBottom: 4 }}>
              Steps 1-5 can be done TODAY
            </div>
            <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.6 }}>
              No hardware needed. By end of day you can have WhatsApp bot live and answering messages. Order robots in parallel — when they arrive, just flash + connect.
            </div>
          </div>
        </div>
      </Sec>

      {/* ─── YOUR SECRET RECIPE ─── */}
      <Sec id="arch-recipe" title="Your Secret Recipe" badge=".md file" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>The system prompt is what makes OIC different from generic AI. It's a text file on your server.</P>

          <div style={{
            background: CREAM, borderRadius: 12, padding: "14px 16px", margin: "12px 0", fontFamily: "'DM Mono',monospace",
            fontSize: 11, lineHeight: 1.8, color: NAVY,
          }}>
            <div style={{ fontSize: 10, color: SUBTLE, marginBottom: 8, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>
              Example: system-prompt-trader.md
            </div>
            # OIC Trader Personality<br />
            <br />
            You are OIC, a trading assistant...<br />
            <br />
            ## Rules<br />
            - Always use Bahasa Indonesia<br />
            - Max risk per trade: 2%<br />
            - Never give financial advice<br />
            <br />
            ## Knowledge<br />
            - SMC/ICT patterns<br />
            - Support & resistance levels<br />
            - ...your secret strategies here
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { q: "Where does this file live?", a: "On your server, in the xiaozhi-server config folder. You edit it via SSH or a simple text editor." },
              { q: "How to update it?", a: "Just edit the .md file on your server. Save. Next conversation uses the new version instantly. No need to touch the robot." },
              { q: "One file per personality?", a: "Yes. OIC Trader has one, OIC Beauty has another. Each client's robot loads the right personality from your server." },
              { q: "Can competitors see it?", a: "No. It lives only on YOUR server. The robot never stores it. Clients never see it. This is Layer 2 of your moat." },
            ].map((s, i) => (
              <div key={i} style={{
                background: WHITE, border: `0.5px solid ${WARM}`, borderRadius: 10, padding: "10px 14px",
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 3 }}>{s.q}</div>
                <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.5 }}>{s.a}</div>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* ─── PUSHING UPDATES ─── */}
      <Sec id="arch-updates" title="Pushing Updates" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>Two types of updates. One is instant, one requires a push to robots.</P>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
            <div style={{ background: `${GREEN}08`, border: `1.5px solid ${GREEN}25`, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: GREEN, marginBottom: 6 }}>Brain updates — instant</div>
              <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.7 }}>
                Change the system prompt, add knowledge, tweak personality, update rules. Just edit the .md file on your server. Takes effect immediately. No robot restart needed.
              </div>
              <div style={{ fontSize: 11, color: NAVY, fontWeight: 500, marginTop: 8, padding: "6px 10px", background: WHITE, borderRadius: 8 }}>
                Edit .md → Save → Done
              </div>
            </div>

            <div style={{ background: `${ACCENT}08`, border: `1.5px solid ${ACCENT}25`, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginBottom: 6 }}>Firmware updates — OTA</div>
              <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.7 }}>
                New robot features (wake word, new screen UI, etc). Push via OTA (Over The Air). Set OTA_URL in firmware config → robots auto-download the update next time they're on WiFi.
              </div>
              <div style={{ fontSize: 11, color: NAVY, fontWeight: 500, marginTop: 8, padding: "6px 10px", background: WHITE, borderRadius: 8 }}>
                Upload firmware to server → Robots auto-update
              </div>
            </div>
          </div>

          <P style={{ marginTop: 14 }}>
            90% of improvements are brain updates (instant). Firmware updates are rare — maybe once a month.
          </P>
        </div>
      </Sec>

      {/* ─── SHOPPING LIST ─── */}
      <Sec id="arch-shopping" title="Shopping List" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P bold>One-time purchases:</P>
          <Item label="3x Stack-chan (demo units)" value="$237" sub="Premium robot body. For demos and content." />
          <Item label="5x XiaoZhi (test units)" value="$75-100" sub="Budget robot body. For testing and scaling." />
          <Item label="Indonesian SIM card" value="~Rp 50K" sub="For WhatsApp bot number." />
          <Item label="Custom shell + logo (at scale)" value="~$5-12/unit" sub="At 500 units from Huaqiangbei supplier." />
          <Item label="Packaging per unit" value="~Rp 60K" sub="Box, foam, cables, cards, stickers." />

          <P bold style={{ marginTop: 16 }}>Monthly costs:</P>
          <Item label="Cloud server (Hostinger VPS)" value="$14/mo" sub="OIC's brain. Handles ~50 clients." />
          <Item label="AI models (GLM, Kimi)" value="~$10/mo" sub="Pay per use. Scales with clients." />
          <Item label="WhatsApp + Voice" value="Free" sub="Self-hosted on your server." />

          <div style={{
            display: "flex", justifyContent: "space-between", padding: "12px 0 4px",
            fontWeight: 700, fontSize: 15, color: NAVY, borderTop: `0.5px solid ${WARM}`, marginTop: 4,
          }}>
            <span>Monthly cost</span>
            <span style={{ fontFamily: "'DM Mono',monospace" }}>~Rp 400K</span>
          </div>

          <div style={{ background: `${GREEN}10`, borderRadius: 10, padding: "12px 14px", marginTop: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: GREEN }}>50 clients = Rp 100M/month revenue</div>
            <div style={{ fontSize: 12, color: SUBTLE, marginTop: 4 }}>
              Your cost: Rp 400K. Margin: 99.6%. Break-even at just 15 clients.
            </div>
          </div>
        </div>
      </Sec>

      {/* ─── SAFETY ─── */}
      <Sec id="arch-safety" title="Safety & Permissions" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>Defined in your system prompt. You set these rules once.</P>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ background: `${GREEN}10`, borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: GREEN, marginBottom: 4 }}>Does automatically</div>
              <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.6 }}>
                Reply to WhatsApp, answer questions, analyze data, take screenshots, generate reports
              </div>
            </div>
            <div style={{ background: `${YELLOW}10`, borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: YELLOW, marginBottom: 4 }}>Does it, then tells you</div>
              <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.6 }}>
                Post social media, send emails, update listings, book appointments
              </div>
            </div>
            <div style={{ background: `${RED}10`, borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: RED, marginBottom: 4 }}>Asks permission first</div>
              <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.6 }}>
                Anything with money, deleting data, changing settings. Sends WhatsApp asking "OK or NO?" and waits.
              </div>
            </div>
          </div>
        </div>
      </Sec>

      {/* ─── COMPETITIVE MOAT ─── */}
      <Sec id="arch-moat" title="Why Competitors Can't Copy You" open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>Your value has 4 layers. Competitors can only see Layer 1.</P>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { n: "1", t: "Base AI Model", d: "GLM, Kimi — anyone can use these. NOT your advantage.", bg: `${WARM}40` },
              { n: "2", t: "System Prompt (Secret)", d: "Your .md file with personality, rules, behavior. Never shared, never published.", bg: `${ACCENT}10` },
              { n: "3", t: "Embedded Knowledge", d: "Industry-specific data baked into each personality. Trader knows SMC/ICT, Beauty knows skincare.", bg: `${ACCENT}15` },
              { n: "4", t: "Partner Content (Licensed)", d: "Expert strategies from real professionals. 30% rev share. Unbeatable content moat.", bg: `${ACCENT}20` },
            ].map((l) => (
              <div key={l.n} style={{ background: l.bg, borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>{l.t}</span>
                  <span style={{ fontSize: 10, color: SUBTLE, fontFamily: "'DM Mono',monospace" }}>Layer {l.n}</span>
                </div>
                <div style={{ fontSize: 12, color: SUBTLE, marginTop: 2, lineHeight: 1.5 }}>{l.d}</div>
              </div>
            ))}
          </div>
        </div>
      </Sec>
    </>
  );
}
