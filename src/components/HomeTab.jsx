import Sec from "./Sec";
import { RED, YELLOW, ACCENT, NAVY, SUBTLE, WHITE, CREAM, WARM, GREEN } from "../constants";

export default function HomeTab({
  d,
  open,
  setOpen,
  critical,
  toggle,
  toggleMilestone,
  noteText,
  setNoteText,
  addNote,
  deleteNote,
  setTab,
}) {
  return (
    <>
      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[
          { n: critical.length, l: "Critical", c: RED },
          { n: d.milestones.filter((m) => !m.done).length, l: "Milestones", c: YELLOW },
          { n: d.notes.length, l: "Notes", c: ACCENT },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: WHITE,
              borderRadius: 12,
              padding: "16px 12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'DM Mono',monospace", color: s.c }}>
              {s.n}
            </div>
            <div style={{ fontSize: 10, color: SUBTLE, marginTop: 2, letterSpacing: 0.5 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <Sec
        id="milestones"
        title="Milestones"
        badge={`${d.milestones.filter((m) => m.done).length}/${d.milestones.length}`}
        defaultOpen={true}
        open={open}
        setOpen={setOpen}
      >
        {d.milestones.map((m) => (
          <div
            key={m.id}
            onClick={() => toggleMilestone(m.id)}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              padding: "10px 16px",
              cursor: "pointer",
              opacity: m.done ? 0.4 : 1,
              transition: "opacity .2s",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                flexShrink: 0,
                marginTop: 1,
                border: `1.5px solid ${m.done ? GREEN : WARM}`,
                background: m.done ? GREEN : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: "#fff",
                transition: "all .2s",
              }}
            >
              {m.done && "✓"}
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: NAVY,
                  textDecoration: m.done ? "line-through" : "none",
                }}
              >
                {m.text}
              </div>
              <div style={{ fontSize: 11, color: SUBTLE, fontFamily: "'DM Mono',monospace", marginTop: 2 }}>
                {m.target}
              </div>
            </div>
          </div>
        ))}
      </Sec>

      {/* Critical Tasks */}
      <Sec id="critical" title="Do First" badge={critical.length} defaultOpen={true} open={open} setOpen={setOpen}>
        {critical.slice(0, 6).map((t) => (
          <div
            key={t.id}
            onClick={() => toggle(t.track, t.id)}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              padding: "10px 16px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: `1.5px solid ${WARM}`,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: NAVY }}>{t.text}</div>
              <div style={{ fontSize: 10, color: SUBTLE, marginTop: 1 }}>{d.todos[t.track].label}</div>
            </div>
          </div>
        ))}
        {critical.length > 6 && (
          <div
            style={{
              padding: "8px 16px",
              fontSize: 12,
              color: ACCENT,
              fontWeight: 500,
              cursor: "pointer",
            }}
            onClick={() => setTab("tasks")}
          >
            +{critical.length - 6} more
          </div>
        )}
      </Sec>

      {/* Quick Notes */}
      <Sec id="notes" title="Notes" badge={d.notes.length} defaultOpen={true} open={open} setOpen={setOpen}>
        <div style={{ padding: "8px 16px" }}>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write a note..."
              onKeyDown={(e) => e.key === "Enter" && addNote()}
              style={{
                flex: 1,
                padding: "10px 14px",
                background: CREAM,
                border: `1px solid ${WARM}`,
                borderRadius: 10,
                fontSize: 13,
                color: NAVY,
                outline: "none",
              }}
            />
            <button
              onClick={addNote}
              style={{
                padding: "10px 16px",
                background: NAVY,
                color: WHITE,
                border: "none",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
        </div>
        {d.notes.map((n) => (
          <div
            key={n.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "8px 16px",
            }}
          >
            <div>
              <div style={{ fontSize: 13, color: NAVY }}>{n.text}</div>
              <div style={{ fontSize: 10, color: SUBTLE, marginTop: 2 }}>{n.time}</div>
            </div>
            <button
              onClick={() => deleteNote(n.id)}
              style={{
                background: "none",
                border: "none",
                color: SUBTLE,
                cursor: "pointer",
                fontSize: 14,
                padding: "2px 6px",
              }}
            >
              ×
            </button>
          </div>
        ))}
        {d.notes.length === 0 && (
          <div style={{ padding: "12px 16px", fontSize: 12, color: SUBTLE, fontStyle: "italic" }}>
            No notes yet
          </div>
        )}
      </Sec>

      {/* Track Overview */}
      <Sec id="tracks" title="All Tracks" defaultOpen={false} open={open} setOpen={setOpen}>
        {Object.entries(d.todos).map(([k, v]) => {
          const dn = v.items.filter((t) => t.done).length;
          const p = v.items.length ? Math.round((dn / v.items.length) * 100) : 0;
          return (
            <div
              key={k}
              onClick={() => {
                setTab("tasks");
                setOpen((pr) => ({ ...pr, [k]: true }));
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
                cursor: "pointer",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: NAVY }}>{v.label}</span>
                  <span style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", color: SUBTLE }}>
                    {dn}/{v.items.length}
                  </span>
                </div>
                <div style={{ height: 3, background: WARM, borderRadius: 2, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${p}%`,
                      background: NAVY,
                      borderRadius: 2,
                      transition: "width .3s",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Sec>
    </>
  );
}
