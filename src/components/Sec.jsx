import { NAVY, SUBTLE, WHITE, WARM } from "../constants";

export default function Sec({ id, title, badge, defaultOpen, open, setOpen, children }) {
  const isOpen = open[id] ?? defaultOpen;
  return (
    <div style={{ marginBottom: 10 }}>
      <button
        onClick={() => setOpen((p) => ({ ...p, [id]: !isOpen }))}
        style={{
          width: "100%",
          padding: "14px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: WHITE,
          border: "none",
          borderRadius: isOpen ? "12px 12px 0 0" : 12,
          cursor: "pointer",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: NAVY }}>{title}</span>
          {badge !== undefined && (
            <span
              style={{
                fontSize: 11,
                fontFamily: "'DM Mono',monospace",
                color: SUBTLE,
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <span
          style={{
            fontSize: 14,
            color: SUBTLE,
            transition: "transform .2s",
            transform: isOpen ? "rotate(90deg)" : "",
          }}
        >
          ›
        </span>
      </button>
      {isOpen && (
        <div
          style={{
            background: WHITE,
            borderRadius: "0 0 12px 12px",
            padding: "4px 0 8px",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
