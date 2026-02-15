import Sec from "./Sec";
import { NAVY, SUBTLE, WARM } from "../constants";

export default function BrandTab({ d, open, setOpen }) {
  return (
    <>
      <div style={{ textAlign: "center", padding: "8px 0 20px" }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 22,
            margin: "0 auto 12px",
            background: "linear-gradient(135deg,#0EA5E9,#7DD3FC)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(14,165,233,.2)",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 9, height: 13, background: "rgba(255,255,255,.9)", borderRadius: 5 }} />
            <div style={{ width: 9, height: 13, background: "rgba(255,255,255,.9)", borderRadius: 5 }} />
          </div>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, fontWeight: 700 }}>OIC</h1>
        <p style={{ fontSize: 12, color: SUBTLE, letterSpacing: 2, marginTop: 2 }}>OPEN INTELLIGENCE COMPANION</p>
        <p style={{ fontSize: 14, color: SUBTLE, fontStyle: "italic", marginTop: 6 }}>{d.brand.tagline}</p>
      </div>

      <Sec id="br-colors" title="Color Palette" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ display: "flex", gap: 10, padding: "8px 16px 12px", flexWrap: "wrap" }}>
          {Object.entries(d.brand.colors).map(([n, h]) => (
            <div key={n} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  background: h,
                  border: h === "#F0F9FF" || h === "#060B14" ? `1px solid ${WARM}` : "none",
                  marginBottom: 4,
                }}
              />
              <div style={{ fontSize: 10, color: NAVY, fontWeight: 500 }}>{n}</div>
              <div style={{ fontSize: 9, color: SUBTLE, fontFamily: "'DM Mono',monospace" }}>{h}</div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec id="br-type" title="Typography" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ fontSize: 9, color: SUBTLE, letterSpacing: 2, fontFamily: "'DM Mono',monospace" }}>
              HEADLINES
            </div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontStyle: "italic", fontWeight: 700 }}>
              Playfair Display
            </div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: SUBTLE, letterSpacing: 2, fontFamily: "'DM Mono',monospace" }}>BODY</div>
            <div style={{ fontSize: 15 }}>DM Sans — clean and readable</div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: SUBTLE, letterSpacing: 2, fontFamily: "'DM Mono',monospace" }}>MONO</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 14 }}>DM Mono — numbers & data</div>
          </div>
        </div>
      </Sec>

      <Sec id="br-tone" title="Tone of Voice" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 12px" }}>
          <p style={{ fontSize: 13, color: "#6B6155", lineHeight: 1.6, marginBottom: 10 }}>{d.brand.tone}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["casual", "friendly", "professional", "Bahasa natural", "relatable", "confident"].map((t) => (
              <span
                key={t}
                style={{ padding: "4px 10px", borderRadius: 14, border: `1px solid ${WARM}`, fontSize: 11, color: NAVY }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Sec>

      <Sec id="br-story" title="Brand Story" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <div style={{ fontSize: 13, color: "#5A5347", lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {d.brand.story}
          </div>
        </div>
      </Sec>

      <Sec id="br-name" title="Why 'OIC'?" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px", fontSize: 13, color: "#6B6155", lineHeight: 1.7 }}>
          <p style={{ marginBottom: 8 }}>
            <strong>OIC</strong> — pronounced "Oh I See"
          </p>
          <p style={{ marginBottom: 8 }}>
            Kepanjangan: <strong>Open Intelligence Companion</strong>
          </p>
          <p style={{ marginBottom: 8 }}>Tiga kata. Tiga janji.</p>
          <p style={{ marginBottom: 4 }}>
            🌐 <strong>Open</strong> — Built on open-source (OpenClaw, XiaoZhi, Stack-chan). Transparan, bukan black
            box. Kamu tahu persis apa yang OIC lakukan.
          </p>
          <p style={{ marginBottom: 4 }}>
            🧠 <strong>Intelligence</strong> — Bukan chatbot biasa. OIC punya mata (kamera), telinga (mic), dan otak AI
            yang di-fine-tune per industri. 6 personality spesialis dengan knowledge base rahasia.
          </p>
          <p style={{ marginBottom: 4 }}>
            🤝 <strong>Companion</strong> — Bukan tool. Bukan software. OIC adalah teman — robot fisik yang duduk di
            meja kamu, selalu siap, selalu ada. 24/7.
          </p>
          <p style={{ marginTop: 10, color: SUBTLE }}>
            Bonus: "Oh I See" = reaksi orang pertama kali lihat OIC bekerja. Mata di logo = robot yang bisa melihat dan
            memahami dunia kamu.
          </p>
        </div>
      </Sec>
    </>
  );
}
