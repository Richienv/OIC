import { NAVY, SUBTLE, ACCENT, WARM } from "../constants";

export default function Header({ pct, done, total }) {
  return (
    <>
      <div style={{ padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 11,
              background: "linear-gradient(135deg,#0EA5E9,#7DD3FC)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(14,165,233,.2)",
            }}
          >
            <div style={{ display: "flex", gap: 4 }}>
              <div style={{ width: 5, height: 7, background: "rgba(255,255,255,.9)", borderRadius: 3 }} />
              <div style={{ width: 5, height: 7, background: "rgba(255,255,255,.9)", borderRadius: 3 }} />
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 18 }}>OIC</div>
            <div style={{ fontSize: 10, color: SUBTLE, letterSpacing: 1.5 }}>Open Intelligence Companion</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'DM Mono',monospace", color: NAVY }}>{pct}%</div>
          <div style={{ fontSize: 10, color: SUBTLE }}>
            {done}/{total} done
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{ height: 5, background: `${WARM}80`, borderRadius: 3, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: `linear-gradient(90deg,${ACCENT},#7DD3FC)`,
              borderRadius: 3,
              transition: "width .6s",
            }}
          />
        </div>
      </div>
    </>
  );
}
