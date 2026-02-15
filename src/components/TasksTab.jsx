import { useState } from "react";
import { NAVY, SUBTLE, WHITE, CREAM, WARM, GREEN, RED, ACCENT, PC } from "../constants";

export default function TasksTab({ d, open, setOpen, toggle, addTask, editTask, deleteTask }) {
  const [newText, setNewText] = useState("");
  const [newTrack, setNewTrack] = useState("ideas");
  const [newPriority, setNewPriority] = useState("yellow");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (!newText.trim()) return;
    addTask(newTrack, newText, newPriority);
    setNewText("");
    setOpen((p) => ({ ...p, [newTrack]: true }));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (track, id) => {
    if (editText.trim()) {
      editTask(track, id, { text: editText.trim() });
    }
    setEditingId(null);
    setEditText("");
  };

  const cyclePriority = (track, task) => {
    const order = ["green", "yellow", "red"];
    const next = order[(order.indexOf(task.p) + 1) % 3];
    editTask(track, task.id, { p: next });
  };

  const trackEntries = Object.entries(d.todos);

  return (
    <>
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: -0.5,
          padding: "4px 4px 16px",
        }}
      >
        Tasks
      </h2>

      {/* Add Task */}
      <div
        style={{
          background: WHITE,
          borderRadius: 12,
          padding: "12px 16px",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a task or idea..."
            style={{
              flex: 1,
              border: "none",
              borderBottom: `1px solid ${WARM}`,
              borderRadius: 0,
              padding: "8px 0",
              fontSize: 14,
              fontFamily: "'DM Sans',sans-serif",
              outline: "none",
              background: "transparent",
              color: NAVY,
            }}
          />
          <button
            onClick={handleAdd}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "none",
              background: ACCENT,
              color: WHITE,
              fontSize: 18,
              fontWeight: 300,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            +
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 10,
          }}
        >
          <select
            value={newTrack}
            onChange={(e) => setNewTrack(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              borderRadius: 6,
              padding: "6px 8px",
              fontSize: 12,
              fontFamily: "'DM Sans',sans-serif",
              background: CREAM,
              color: NAVY,
              outline: "none",
              cursor: "pointer",
            }}
          >
            {trackEntries.map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {["green", "yellow", "red"].map((p) => (
              <div
                key={p}
                onClick={() => setNewPriority(p)}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: PC[p],
                  cursor: "pointer",
                  opacity: newPriority === p ? 1 : 0.25,
                  transition: "opacity .15s",
                  border: newPriority === p ? `2px solid ${NAVY}20` : "2px solid transparent",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Task Tracks */}
      {trackEntries.map(([k, v]) => {
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
                borderRadius: isOpen ? "12px 12px 0 0" : 12,
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>{v.label}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "'DM Mono',monospace",
                    color: dn === v.items.length && v.items.length > 0 ? GREEN : SUBTLE,
                  }}
                >
                  {dn}/{v.items.length}
                </span>
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
              </div>
            </button>
            {isOpen && (
              <div
                style={{
                  background: WHITE,
                  borderRadius: "0 0 12px 12px",
                }}
              >
                {v.items.length === 0 && (
                  <div
                    style={{
                      padding: "20px 16px",
                      fontSize: 13,
                      color: SUBTLE,
                      textAlign: "center",
                    }}
                  >
                    No tasks yet
                  </div>
                )}
                {v.items.map((t) => {
                  const noteOpen = open[`note-${t.id}`];
                  const isEditing = editingId === t.id;
                  return (
                    <div key={t.id} style={{ borderTop: `0.5px solid ${WARM}` }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "12px 16px",
                          gap: 10,
                        }}
                      >
                        <div
                          onClick={() => toggle(k, t.id)}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            flexShrink: 0,
                            cursor: "pointer",
                            border: `1.5px solid ${t.done ? GREEN : WARM}`,
                            background: t.done ? GREEN : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            color: "#fff",
                            transition: "all .2s",
                          }}
                        >
                          {t.done && "✓"}
                        </div>
                        <div
                          style={{ flex: 1, cursor: "pointer" }}
                          onClick={() =>
                            !isEditing && setOpen((p) => ({ ...p, [`note-${t.id}`]: !noteOpen }))
                          }
                        >
                          {isEditing ? (
                            <input
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEdit(k, t.id);
                                if (e.key === "Escape") {
                                  setEditingId(null);
                                  setEditText("");
                                }
                              }}
                              onBlur={() => saveEdit(k, t.id)}
                              autoFocus
                              style={{
                                width: "100%",
                                border: "none",
                                borderBottom: `1px solid ${ACCENT}`,
                                borderRadius: 0,
                                padding: "4px 0",
                                fontSize: 13,
                                fontFamily: "'DM Sans',sans-serif",
                                outline: "none",
                                background: "transparent",
                                color: NAVY,
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: t.done ? SUBTLE : NAVY,
                                textDecoration: t.done ? "line-through" : "none",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                              }}
                            >
                              {t.text}
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  cyclePriority(k, t);
                                }}
                                style={{
                                  display: "inline-block",
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: PC[t.p],
                                  cursor: "pointer",
                                  flexShrink: 0,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      {noteOpen && (
                        <div style={{ padding: "0 16px 12px 46px" }}>
                          {t.note && (
                            <div
                              style={{
                                fontSize: 12,
                                color: SUBTLE,
                                lineHeight: 1.6,
                                whiteSpace: "pre-line",
                                marginBottom: 10,
                              }}
                            >
                              {t.note}
                            </div>
                          )}
                          <div style={{ display: "flex", gap: 8 }}>
                            <button
                              onClick={() => startEdit(t)}
                              style={{
                                fontSize: 11,
                                padding: "4px 12px",
                                borderRadius: 6,
                                border: `1px solid ${WARM}`,
                                background: "transparent",
                                color: NAVY,
                                cursor: "pointer",
                                fontFamily: "'DM Sans',sans-serif",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteTask(k, t.id)}
                              style={{
                                fontSize: 11,
                                padding: "4px 12px",
                                borderRadius: 6,
                                border: "none",
                                background: `${RED}12`,
                                color: RED,
                                cursor: "pointer",
                                fontFamily: "'DM Sans',sans-serif",
                              }}
                            >
                              Delete
                            </button>
                          </div>
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
