import Sec from "./Sec";
import { NAVY, SUBTLE, CREAM, WARM, GREEN, ACCENT, RED, YELLOW } from "../constants";

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
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: -0.5,
            padding: "4px 4px 6px",
          }}
        >
          How It Works
        </h2>
        <p style={{ fontSize: 13, color: SUBTLE, padding: "0 4px" }}>
          The big picture — what you need, what it costs, how it all connects.
        </p>
      </div>

      {/* THE BIG PICTURE */}
      <Sec id="arch-bigpic" title="The Big Picture" defaultOpen={true} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>OIC has three pieces that work together:</P>

          <div style={{ margin: "12px 0", display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              {
                n: "1",
                t: "The Robot",
                d: "Sits on client's desk. Has a camera, mic, speaker, and screen. Connects to WiFi.",
                c: ACCENT,
              },
              {
                n: "2",
                t: "The Brain (Cloud Server)",
                d: "Your server in the cloud. Receives what the robot hears and sees, thinks using AI, sends back a response.",
                c: GREEN,
              },
              {
                n: "3",
                t: "The AI Models",
                d: "Chinese AI services (10-50x cheaper than ChatGPT). They do the actual thinking, seeing, and speaking.",
                c: YELLOW,
              },
            ].map((p) => (
              <div
                key={p.n}
                style={{
                  background: CREAM,
                  borderRadius: 10,
                  padding: "12px 14px",
                  borderLeft: `3px solid ${p.c}`,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 2 }}>
                  {p.t}
                </div>
                <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.6 }}>{p.d}</div>
              </div>
            ))}
          </div>

          <P bold style={{ marginTop: 14 }}>How they connect:</P>
          <div
            style={{
              background: CREAM,
              borderRadius: 10,
              padding: "14px",
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              lineHeight: 1.8,
              color: NAVY,
              marginTop: 4,
            }}
          >
            Client speaks to robot
            <br />
            &nbsp;&nbsp;↓ WiFi
            <br />
            Your cloud server receives audio
            <br />
            &nbsp;&nbsp;↓
            <br />
            AI converts speech → text
            <br />
            AI thinks + generates response
            <br />
            AI converts text → speech
            <br />
            &nbsp;&nbsp;↓ WiFi
            <br />
            Robot speaks the answer out loud
          </div>

          <P style={{ marginTop: 12 }}>
            Same AI brain also powers WhatsApp — robot is for the business owner, WhatsApp is for their
            customers.
          </P>
        </div>
      </Sec>

      {/* WHAT HAPPENS WHEN... */}
      <Sec id="arch-scenarios" title="What OIC Actually Does" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          {[
            {
              q: "Client asks OIC a question out loud",
              a: "Robot hears it, sends to your server, AI answers, robot speaks back. Like talking to a smart assistant.",
            },
            {
              q: "Customer sends a WhatsApp message at 3am",
              a: "Your server receives it, AI reads the message, writes a smart reply, sends it back via WhatsApp. Instantly. Client never wakes up.",
            },
            {
              q: "Trader asks OIC to analyze a chart",
              a: 'Robot takes a photo with its camera, sends to AI vision model, AI reads the chart patterns, gives analysis. "I see a bullish engulfing pattern at support."',
            },
            {
              q: "Beauty client wants to book an appointment",
              a: "OIC checks the calendar, finds available slots, books it, sends confirmation via WhatsApp. All automatic.",
            },
            {
              q: "OIC needs to check Shopee orders",
              a: "Your server has its own browser (like a virtual computer). It logs into Shopee, checks new orders, and reports back. You log in once, OIC remembers forever.",
            },
            {
              q: "OIC wants to spend money or delete something",
              a: "It stops and asks YOU first via WhatsApp. You reply OK or NO. OIC never touches money without permission.",
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                padding: "10px 0",
                borderBottom: i < 5 ? `0.5px solid ${WARM}` : "none",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 4 }}>
                {s.q}
              </div>
              <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.6 }}>{s.a}</div>
            </div>
          ))}
        </div>
      </Sec>

      {/* SHOPPING LIST */}
      <Sec id="arch-shopping" title="What You Need to Buy" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P bold>One-time purchases:</P>
          <Item label="Robot hardware (Stack-chan)" value="~$79/unit" sub="Premium option. Cute, high quality. For demos and first clients." />
          <Item label="Robot hardware (XiaoZhi)" value="~$15/unit" sub="Budget option. Same brain, simpler body. For scale." />
          <Item label="Custom shell + OIC logo" value="~$5-12/unit" sub="At 500 units. Visit Huaqiangbei for suppliers." />
          <Item label="Packaging per unit" value="~Rp 60K" sub="Box, foam, cables, cards, stickers — the unboxing experience." />

          <P bold style={{ marginTop: 16 }}>Monthly subscriptions:</P>
          <Item label="Cloud server (Hostinger VPS)" value="$14/mo" sub="This is OIC's brain. Runs 24/7. Handles up to ~50 clients." />
          <Item label="AI models (GLM, Kimi)" value="~$10/mo" sub="Pay per use. Scales with number of clients. Very cheap." />
          <Item label="WhatsApp bot" value="Free" sub="Self-hosted. Just need an Indonesian SIM card." />
          <Item label="Voice (speech-to-text, text-to-speech)" value="Free" sub="Open-source tools. Run on your own server." />
          <Item label="Domain name" value="~$20/yr" sub="oic.id or getoic.com" />

          <div
            style={{
              background: `${GREEN}10`,
              borderRadius: 10,
              padding: "12px 14px",
              marginTop: 16,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: GREEN }}>
              Total to start: ~Rp 275 juta ($17K)
            </div>
            <div style={{ fontSize: 12, color: SUBTLE, marginTop: 4, lineHeight: 1.5 }}>
              Break-even at 15 clients. Self-sustaining at 35 clients. Target: 50 clients by Day 90.
            </div>
          </div>
        </div>
      </Sec>

      {/* SAFETY */}
      <Sec id="arch-safety" title="Safety & Control" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>You decide what OIC can do on its own vs what needs your OK.</P>

          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ background: `${GREEN}10`, borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: GREEN, marginBottom: 4 }}>
                Does automatically
              </div>
              <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.6 }}>
                Reply to WhatsApp messages, answer questions, read and analyze data, take screenshots, generate text and reports
              </div>
            </div>
            <div style={{ background: `${YELLOW}10`, borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: YELLOW, marginBottom: 4 }}>
                Does it, then tells you
              </div>
              <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.6 }}>
                Post to social media, send emails, update product listings, book appointments
              </div>
            </div>
            <div style={{ background: `${RED}10`, borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: RED, marginBottom: 4 }}>
                Asks your permission first
              </div>
              <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.6 }}>
                Anything involving money, deleting data, changing settings, contacting new people. OIC sends you a WhatsApp asking "OK or NO?" and waits.
              </div>
            </div>
          </div>

          <P style={{ marginTop: 12 }}>
            These rules are baked into each personality. You set them once, OIC follows them forever.
          </P>
        </div>
      </Sec>

      {/* YOUR MOAT */}
      <Sec id="arch-moat" title="Why Competitors Can't Copy You" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>OIC's value has 4 layers. Competitors can only see Layer 1.</P>

          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              {
                n: "Layer 1",
                t: "Base AI Model",
                d: "GLM, MiniMax, Kimi — anyone can use these. This is NOT your advantage.",
                o: 0.3,
              },
              {
                n: "Layer 2",
                t: "System Prompt (Secret)",
                d: "Your custom personality, rules, and behavior. This is your recipe — never shared, never published.",
                o: 0.55,
              },
              {
                n: "Layer 3",
                t: "Embedded Knowledge (Proprietary)",
                d: "Industry-specific data and expertise baked into each personality. Trader knows SMC/ICT, Beauty knows skincare routines.",
                o: 0.8,
              },
              {
                n: "Layer 4",
                t: "Partner Content (Licensed)",
                d: "Expert strategies and curriculum from real professionals. They get 30% revenue share, you get unbeatable content.",
                o: 1,
              },
            ].map((l) => (
              <div
                key={l.n}
                style={{
                  background: CREAM,
                  borderRadius: 10,
                  padding: "10px 14px",
                  borderLeft: `3px solid ${ACCENT}`,
                  opacity: l.o + 0.15,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>{l.t}</span>
                  <span style={{ fontSize: 10, color: SUBTLE, fontFamily: "'DM Mono',monospace" }}>{l.n}</span>
                </div>
                <div style={{ fontSize: 12, color: SUBTLE, marginTop: 2, lineHeight: 1.5 }}>{l.d}</div>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* RUNNING COSTS */}
      <Sec id="arch-cost" title="Running Costs per Month" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P bold>Your costs (for up to 50 clients):</P>
          <Item label="Cloud server" value="$14" sub="Hostinger VPS — OIC's brain, always on" />
          <Item label="AI usage" value="~$10" sub="Pay per conversation. Chinese AI = 10-50x cheaper than ChatGPT" />
          <Item label="WhatsApp, voice, browser" value="Free" sub="All open-source, self-hosted" />
          <Item label="Domain" value="~$2" sub="Annualized monthly" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0 4px",
              fontWeight: 700,
              fontSize: 15,
              color: NAVY,
              borderTop: `0.5px solid ${WARM}`,
              marginTop: 4,
            }}
          >
            <span>Total</span>
            <span style={{ fontFamily: "'DM Mono',monospace" }}>~Rp 400K/mo</span>
          </div>

          <div
            style={{
              background: CREAM,
              borderRadius: 10,
              padding: "12px 14px",
              marginTop: 12,
            }}
          >
            <P bold style={{ marginBottom: 2 }}>The math:</P>
            <P>50 clients x Rp 2M/month = Rp 100M revenue</P>
            <P>Your cost = Rp 400K</P>
            <P bold style={{ color: GREEN }}>Margin: 99.6%</P>
          </div>
        </div>
      </Sec>

      {/* WHAT TO DO FIRST */}
      <Sec id="arch-next" title="What to Do First" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <P>You don't need to understand the tech. You need to make these decisions:</P>

          {[
            {
              n: "1",
              q: "Which personality first?",
              a: "Start with OIC Trader — it's the most visual (chart scanning) and has the clearest wow-factor for demos.",
            },
            {
              n: "2",
              q: "Stack-chan or XiaoZhi?",
              a: "Start with 3x Stack-chan ($237 total) for demos and content. They look better on camera. Switch to XiaoZhi for batch orders.",
            },
            {
              n: "3",
              q: "Who sets up the server?",
              a: "You (with AI help) or hire a freelancer. It's a one-time setup — install 2 open-source tools on a $14/month server. Half a day of work.",
            },
            {
              n: "4",
              q: "Which AI model?",
              a: "GLM 4.5 for daily chat ($0.35/M tokens). Kimi K2.5 for camera/vision ($0.78/M). Both speak great Bahasa Indonesia.",
            },
            {
              n: "5",
              q: "When can clients start using it?",
              a: "Once the server is running and a robot is connected, you can demo the same day. First pilot client can start within a week.",
            },
          ].map((s) => (
            <div
              key={s.n}
              style={{
                padding: "10px 0",
                borderBottom: `0.5px solid ${WARM}`,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 4 }}>{s.q}</div>
              <div style={{ fontSize: 12, color: SUBTLE, lineHeight: 1.6 }}>{s.a}</div>
            </div>
          ))}
        </div>
      </Sec>
    </>
  );
}
