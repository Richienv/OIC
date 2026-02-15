import Sec from "./Sec";
import { NAVY, SUBTLE, WARM, ACCENT } from "../constants";

export default function BrandTab({ d, open, setOpen }) {
  return (
    <>
      <div style={{ textAlign: "center", padding: "12px 0 24px" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            margin: "0 auto 14px",
            background: `linear-gradient(135deg, ${ACCENT}, #64B5F6)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 8, height: 12, background: "rgba(255,255,255,.9)", borderRadius: 4 }} />
            <div style={{ width: 8, height: 12, background: "rgba(255,255,255,.9)", borderRadius: 4 }} />
          </div>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1, color: NAVY }}>OIC</h1>
        <p style={{ fontSize: 11, color: SUBTLE, letterSpacing: 2, marginTop: 4 }}>OPEN INTELLIGENCE COMPANION</p>
        <p style={{ fontSize: 14, color: SUBTLE, fontStyle: "italic", marginTop: 8 }}>{d.brand.tagline}</p>
      </div>

      <Sec id="br-colors" title="Color Palette" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ display: "flex", gap: 10, padding: "8px 16px 12px", flexWrap: "wrap" }}>
          {Object.entries(d.brand.colors).map(([n, h]) => (
            <div key={n} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: h,
                  border: h === "#F0F9FF" ? `1px solid ${WARM}` : "none",
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
        <div style={{ padding: "8px 16px 12px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 9, color: SUBTLE, letterSpacing: 2, fontFamily: "'DM Mono',monospace" }}>
              HEADLINES
            </div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontStyle: "italic", fontWeight: 700, marginTop: 2 }}>
              Playfair Display
            </div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: SUBTLE, letterSpacing: 2, fontFamily: "'DM Mono',monospace" }}>BODY</div>
            <div style={{ fontSize: 15, marginTop: 2 }}>DM Sans — clean and readable</div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: SUBTLE, letterSpacing: 2, fontFamily: "'DM Mono',monospace" }}>MONO</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, marginTop: 2 }}>DM Mono — numbers & data</div>
          </div>
        </div>
      </Sec>

      <Sec id="br-tone" title="Tone of Voice" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 12px" }}>
          <p style={{ fontSize: 13, color: SUBTLE, lineHeight: 1.7, marginBottom: 12 }}>{d.brand.tone}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["casual", "friendly", "professional", "Bahasa natural", "relatable", "confident"].map((t) => (
              <span
                key={t}
                style={{
                  padding: "4px 10px",
                  borderRadius: 14,
                  border: `1px solid ${WARM}`,
                  fontSize: 11,
                  color: NAVY,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Sec>

      <Sec id="br-story" title="Brand Story" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px" }}>
          <div style={{ fontSize: 13, color: SUBTLE, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {d.brand.story}
          </div>
        </div>
      </Sec>

      <Sec id="br-name" title="Why OIC?" defaultOpen={false} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px 14px", fontSize: 13, color: SUBTLE, lineHeight: 1.7 }}>
          <p style={{ marginBottom: 8 }}>
            <strong style={{ color: NAVY }}>OIC</strong> — pronounced "Oh I See"
          </p>
          <p style={{ marginBottom: 8 }}>
            Kepanjangan: <strong style={{ color: NAVY }}>Open Intelligence Companion</strong>
          </p>
          <p style={{ marginBottom: 10, color: NAVY, fontWeight: 500 }}>Tiga kata. Tiga janji.</p>
          <p style={{ marginBottom: 6 }}>
            <strong style={{ color: NAVY }}>Open</strong> — Built on open-source. Transparan, bukan black box.
          </p>
          <p style={{ marginBottom: 6 }}>
            <strong style={{ color: NAVY }}>Intelligence</strong> — Punya mata (kamera), telinga (mic), dan otak AI yang di-fine-tune per industri.
          </p>
          <p style={{ marginBottom: 6 }}>
            <strong style={{ color: NAVY }}>Companion</strong> — Bukan tool. Robot fisik yang duduk di meja kamu, selalu siap. 24/7.
          </p>
          <p style={{ marginTop: 10 }}>
            "Oh I See" = reaksi orang pertama kali lihat OIC bekerja.
          </p>
        </div>
      </Sec>
    </>
  );
}
