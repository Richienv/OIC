import { NAVY, SUBTLE, WHITE, WARM, ACCENT, CREAM, CC, CL } from "../constants";

export default function MemoryTab({ d, memOpen, setMemOpen, memCat, setMemCat, search, setSearch, filteredMem }) {
  return (
    <>
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: -0.5,
          padding: "4px 4px 12px",
        }}
      >
        Memory
      </h2>

      {/* Search */}
      <div
        style={{
          background: WHITE,
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: SUBTLE, fontSize: 14 }}>&#x2315;</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          style={{
            flex: 1,
            border: "none",
            fontSize: 14,
            color: NAVY,
            outline: "none",
            background: "transparent",
            fontFamily: "'DM Sans',sans-serif",
          }}
        />
        {search && (
          <span
            onClick={() => setSearch("")}
            style={{ color: SUBTLE, cursor: "pointer", fontSize: 14 }}
          >
            ×
          </span>
        )}
      </div>

      {/* Category Filters */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 14,
          overflowX: "auto",
          paddingBottom: 2,
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
                border: "none",
                background: active ? NAVY : CREAM,
                color: active ? "#fff" : SUBTLE,
                fontFamily: "'DM Sans',sans-serif",
                whiteSpace: "nowrap",
                transition: "all .15s",
              }}
            >
              {k === "all" ? "All" : CL[k]} {cnt}
            </button>
          );
        })}
      </div>

      {/* Memory Items */}
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
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, textAlign: "left" }}>{m.title}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 10,
                    color: SUBTLE,
                    fontFamily: "'DM Mono',monospace",
                  }}
                >
                  {CL[m.cat]}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: SUBTLE,
                    transform: isO ? "rotate(90deg)" : "",
                    transition: "transform .2s",
                  }}
                >
                  ›
                </span>
              </div>
            </button>
            {isO && (
              <div
                style={{
                  background: WHITE,
                  borderRadius: "0 0 12px 12px",
                  padding: "10px 16px 14px",
                }}
              >
                <p style={{ fontSize: 13, color: SUBTLE, lineHeight: 1.7, whiteSpace: "pre-line" }}>{m.text}</p>
              </div>
            )}
          </div>
        );
      })}
      {filteredMem.length === 0 && (
        <div style={{ padding: 40, textAlign: "center", color: SUBTLE }}>No results</div>
      )}
    </>
  );
}
