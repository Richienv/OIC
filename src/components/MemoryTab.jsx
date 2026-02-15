import { NAVY, SUBTLE, WHITE, WARM, ACCENT, CC, CL } from "../constants";

export default function MemoryTab({ d, memOpen, setMemOpen, memCat, setMemCat, search, setSearch, filteredMem }) {
  return (
    <>
      <h2
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 26,
          fontStyle: "italic",
          fontWeight: 700,
          padding: "4px 4px 8px",
        }}
      >
        Memory
      </h2>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        style={{
          width: "100%",
          padding: "10px 14px",
          background: WHITE,
          border: `1px solid ${WARM}`,
          borderRadius: 12,
          fontSize: 13,
          color: NAVY,
          outline: "none",
          marginBottom: 10,
        }}
      />
      <div
        style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: 12,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {["all", ...Object.keys(CL)].map((k) => {
          const cnt = k === "all" ? d.memory.length : d.memory.filter((m) => m.cat === k).length;
          if (k !== "all" && !cnt) return null;
          const active = memCat === k;
          return (
            <button
              key={k}
              onClick={() => setMemCat(k)}
              style={{
                padding: "5px 12px",
                borderRadius: 16,
                fontSize: 11,
                fontWeight: 500,
                cursor: "pointer",
                border: `1.5px solid ${active ? (k === "all" ? NAVY : CC[k]) : WARM}`,
                background: active ? (k === "all" ? NAVY : CC[k]) : "transparent",
                color: active ? "#fff" : SUBTLE,
                fontFamily: "'DM Sans',sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {k === "all" ? "All" : CL[k]} {cnt}
            </button>
          );
        })}
      </div>

      {filteredMem.map((m) => {
        const isO = memOpen[m.id];
        return (
          <div key={m.id} style={{ marginBottom: 6 }}>
            <button
              onClick={() => setMemOpen((p) => ({ ...p, [m.id]: !isO }))}
              style={{
                width: "100%",
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: WHITE,
                border: "none",
                borderRadius: isO ? "12px 12px 0 0" : 12,
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                boxShadow: "0 1px 2px rgba(0,0,0,.03)",
                borderLeft: `3px solid ${CC[m.cat]}`,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, textAlign: "left" }}>{m.title}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 9, color: CC[m.cat], fontFamily: "'DM Mono',monospace", letterSpacing: 1 }}>
                  {CL[m.cat]?.toUpperCase()}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    color: SUBTLE,
                    transform: isO ? "rotate(180deg)" : "",
                    transition: "transform .2s",
                  }}
                >
                  ⌄
                </span>
              </div>
            </button>
            {isO && (
              <div
                style={{
                  background: WHITE,
                  borderRadius: "0 0 12px 12px",
                  padding: "10px 16px 14px",
                  boxShadow: "0 1px 2px rgba(0,0,0,.03)",
                  borderLeft: `3px solid ${CC[m.cat]}`,
                }}
              >
                <p style={{ fontSize: 13, color: "#6B6155", lineHeight: 1.6, whiteSpace: "pre-line" }}>{m.text}</p>
              </div>
            )}
          </div>
        );
      })}
      {filteredMem.length === 0 && (
        <div style={{ padding: 40, textAlign: "center", color: SUBTLE, fontStyle: "italic" }}>No results</div>
      )}
    </>
  );
}
