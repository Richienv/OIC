import { NAVY, SUBTLE, ACCENT, WARM } from "../constants";

export default function Header({ pct, done, total }) {
  return (
    <div style={{ padding: "20px 20px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: -0.5,
              color: NAVY,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            OIC
          </div>
          <div style={{ fontSize: 11, color: SUBTLE, letterSpacing: 0.5, marginTop: 1 }}>
            {done}/{total} completed
          </div>
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            fontFamily: "'DM Mono',monospace",
            color: NAVY,
            letterSpacing: -1,
            lineHeight: 1,
          }}
        >
          {pct}
          <span style={{ fontSize: 16, fontWeight: 500, color: SUBTLE }}>%</span>
        </div>
      </div>

      <div
        style={{
          height: 3,
          background: WARM,
          borderRadius: 2,
          overflow: "hidden",
          marginTop: 14,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: ACCENT,
            borderRadius: 2,
            transition: "width .6s ease",
          }}
        />
      </div>
    </div>
  );
}
