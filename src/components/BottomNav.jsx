import { NAVY, SUBTLE, ACCENT, WHITE, WARM } from "../constants";

const TABS = [
  { id: "home", label: "Home" },
  { id: "tasks", label: "Tasks" },
  { id: "arch", label: "Arch" },
  { id: "memory", label: "Memory" },
  { id: "brand", label: "Brand" },
];

export default function BottomNav({ tab, setTab }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: `${WHITE}F2`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: `0.5px solid ${WARM}`,
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0 env(safe-area-inset-bottom, 10px)",
      }}
    >
      {TABS.map((n) => {
        const active = tab === n.id;
        return (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              fontFamily: "'DM Sans',sans-serif",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                background: active ? ACCENT : "transparent",
                transition: "background .2s",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: active ? 600 : 400,
                color: active ? NAVY : SUBTLE,
                transition: "color .2s",
                letterSpacing: 0.2,
              }}
            >
              {n.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
