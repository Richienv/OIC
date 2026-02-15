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
