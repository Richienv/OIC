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
          fontFamily: "'Playfair Display',serif",
          fontSize: 26,
          fontStyle: "italic",
          fontWeight: 700,
          padding: "4px 4px 14px",
        }}
      >
        Tasks
      </h2>

      {/* Add Task Card */}
      <div
        style={{
          background: WHITE,
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 16,
          boxShadow: "0 1px 2px rgba(0,0,0,.03)",
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
              border: `1px solid ${WARM}`,
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 13,
              fontFamily: "'DM Sans',sans-serif",
              outline: "none",
              background: CREAM,
              color: NAVY,
            }}
          />
          <button
            onClick={handleAdd}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: "none",
              background: ACCENT,
              color: WHITE,
              fontSize: 20,
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
            paddingTop: 10,
            borderTop: `1px solid ${CREAM}`,
          }}
        >
          <select
            value={newTrack}
            onChange={(e) => setNewTrack(e.target.value)}
            style={{
              flex: 1,
              border: `1px solid ${WARM}`,
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
                {v.icon} {v.label}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: SUBTLE }}>Priority:</span>
            {["green", "yellow", "red"].map((p) => (
              <div
                key={p}
                onClick={() => setNewPriority(p)}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: PC[p],
                  cursor: "pointer",
                  border: newPriority === p ? `2px solid ${NAVY}` : "2px solid transparent",
                  opacity: newPriority === p ? 1 : 0.4,
                  transition: "all .15s",
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
                    color: dn === v.items.length && v.items.length > 0 ? GREEN : SUBTLE,
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
                {v.items.length === 0 && (
                  <div
                    style={{
                      padding: "20px 16px",
                      fontSize: 12,
                      color: SUBTLE,
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    No tasks yet — add one above
                  </div>
                )}
                {v.items.map((t) => {
                  const noteOpen = open[`note-${t.id}`];
                  const isEditing = editingId === t.id;
                  return (
                    <div key={t.id} style={{ borderTop: `1px solid ${CREAM}` }}>
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
                                border: `1px solid ${ACCENT}`,
                                borderRadius: 6,
                                padding: "6px 8px",
                                fontSize: 13,
                                fontFamily: "'DM Sans',sans-serif",
                                outline: "none",
                                background: CREAM,
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
                              }}
                            >
                              {t.text}
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  cyclePriority(k, t);
                                }}
                                title="Tap to change priority"
                                style={{
                                  display: "inline-block",
                                  width: 7,
                                  height: 7,
                                  borderRadius: "50%",
                                  background: PC[t.p],
                                  marginLeft: 6,
                                  verticalAlign: "middle",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          )}
                        </div>
                        {!isEditing && (
                          <span
                            onClick={() =>
                              setOpen((p) => ({ ...p, [`note-${t.id}`]: !noteOpen }))
                            }
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
                        )}
                      </div>
                      {noteOpen && (
                        <div style={{ padding: "0 16px 12px 48px" }}>
                          {t.note && (
                            <div
                              style={{
                                fontSize: 12,
                                color: SUBTLE,
                                lineHeight: 1.5,
                                whiteSpace: "pre-line",
                                marginBottom: 8,
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
                                padding: "4px 10px",
                                borderRadius: 6,
                                border: `1px solid ${WARM}`,
                                background: CREAM,
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
                                padding: "4px 10px",
                                borderRadius: 6,
                                border: `1px solid ${RED}30`,
                                background: `${RED}10`,
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
