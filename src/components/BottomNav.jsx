import { CREAM, NAVY, SUBTLE, WARM } from "../constants";

const TABS = [
  { id: "home", icon: "◉", label: "Home" },
  { id: "tasks", icon: "☐", label: "Tasks" },
  { id: "arch", icon: "⬡", label: "Arch" },
  { id: "memory", icon: "◈", label: "Memory" },
  { id: "brand", icon: "◎", label: "Brand" },
];

export default function BottomNav({ tab, setTab }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: `${CREAM}F0`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: `1px solid ${WARM}80`,
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 0 env(safe-area-inset-bottom, 8px)",
      }}
    >
      {TABS.map((n) => (
        <button
          key={n.id}
          onClick={() => setTab(n.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            color: tab === n.id ? NAVY : SUBTLE,
            fontFamily: "'DM Sans',sans-serif",
            transition: "color .2s",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <span style={{ fontSize: 18 }}>{n.icon}</span>
          <span style={{ fontSize: 10, fontWeight: tab === n.id ? 600 : 400 }}>{n.label}</span>
        </button>
      ))}
    </div>
  );
}
