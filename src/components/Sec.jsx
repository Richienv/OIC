import { NAVY, SUBTLE, WHITE, CREAM } from "../constants";

export default function Sec({ id, title, badge, defaultOpen, open, setOpen, children }) {
  const isOpen = open[id] ?? defaultOpen;
  return (
    <div style={{ marginBottom: 8 }}>
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
          borderRadius: isOpen ? "14px 14px 0 0" : 14,
          cursor: "pointer",
          fontFamily: "'DM Sans',sans-serif",
          boxShadow: "0 1px 2px rgba(0,0,0,.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: NAVY }}>{title}</span>
          {badge !== undefined && (
            <span
              style={{
                fontSize: 11,
                fontFamily: "'DM Mono',monospace",
                background: `${NAVY}0A`,
                padding: "2px 8px",
                borderRadius: 8,
                color: SUBTLE,
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <span
          style={{
            fontSize: 18,
            color: SUBTLE,
            transition: "transform .2s",
            transform: isOpen ? "rotate(180deg)" : "",
          }}
        >
          ⌄
        </span>
      </button>
      {isOpen && (
        <div
          style={{
            background: WHITE,
            borderRadius: "0 0 14px 14px",
            padding: "4px 0 8px",
            boxShadow: "0 1px 2px rgba(0,0,0,.03)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
