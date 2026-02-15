import { NAVY, SUBTLE, WHITE, CREAM, WARM, GREEN, PC } from "../constants";

export default function TasksTab({ d, open, setOpen, toggle }) {
  return (
    <>
      <h2
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 26,
          fontStyle: "italic",
          fontWeight: 700,
          padding: "4px 4px 14px",
        }}
      >
        Tasks
      </h2>
      {Object.entries(d.todos).map(([k, v]) => {
        const dn = v.items.filter((t) => t.done).length;
        const isOpen = open[k] ?? false;
        return (
          <div key={k} style={{ marginBottom: 8 }}>
            <button
              onClick={() => setOpen((p) => ({ ...p, [k]: !isOpen }))}
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
                <span style={{ color: SUBTLE }}>{v.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{v.label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "'DM Mono',monospace",
                    color: dn === v.items.length ? GREEN : SUBTLE,
                  }}
                >
                  {dn}/{v.items.length}
                </span>
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
              </div>
            </button>
            {isOpen && (
              <div
                style={{
                  background: WHITE,
                  borderRadius: "0 0 14px 14px",
                  boxShadow: "0 1px 2px rgba(0,0,0,.03)",
                }}
              >
                {v.items.map((t) => {
                  const noteOpen = open[`note-${t.id}`];
                  return (
                    <div key={t.id} style={{ borderTop: `1px solid ${CREAM}` }}>
                      <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", gap: 10 }}>
                        <div
                          onClick={() => toggle(k, t.id)}
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            flexShrink: 0,
                            cursor: "pointer",
                            border: `2px solid ${t.done ? GREEN : PC[t.p] + "60"}`,
                            background: t.done ? GREEN : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            color: "#fff",
                            transition: "all .2s",
                          }}
                        >
                          {t.done && "✓"}
                        </div>
                        <div
                          style={{ flex: 1, cursor: "pointer" }}
                          onClick={() => setOpen((p) => ({ ...p, [`note-${t.id}`]: !noteOpen }))}
                        >
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: t.done ? SUBTLE : NAVY,
                              textDecoration: t.done ? "line-through" : "none",
                            }}
                          >
                            {t.text}
                            <span
                              style={{
                                display: "inline-block",
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: PC[t.p],
                                marginLeft: 6,
                                verticalAlign: "middle",
                              }}
                            />
                          </div>
                        </div>
                        <span
                          onClick={() => setOpen((p) => ({ ...p, [`note-${t.id}`]: !noteOpen }))}
                          style={{
                            fontSize: 16,
                            color: SUBTLE,
                            cursor: "pointer",
                            transform: noteOpen ? "rotate(180deg)" : "",
                            transition: "transform .2s",
                          }}
                        >
                          ⌄
                        </span>
                      </div>
                      {noteOpen && t.note && (
                        <div
                          style={{
                            padding: "0 16px 12px 48px",
                            fontSize: 12,
                            color: SUBTLE,
                            lineHeight: 1.5,
                            whiteSpace: "pre-line",
                          }}
                        >
                          {t.note}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
