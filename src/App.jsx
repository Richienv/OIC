import { useState, useEffect } from "react";
import storage from "./storage";
import { getDefault } from "./data/defaults";
import { flattenTasks, calcStats, filterMemory } from "./utils";
import { CREAM, NAVY } from "./constants";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import HomeTab from "./components/HomeTab";
import TasksTab from "./components/TasksTab";
import ArchTab from "./components/ArchTab";
import MemoryTab from "./components/MemoryTab";
import BrandTab from "./components/BrandTab";

export default function App() {
  const [d, setD] = useState(getDefault);
  const [tab, setTab] = useState("home");
  const [open, setOpen] = useState({});
  const [memOpen, setMemOpen] = useState({});
  const [memCat, setMemCat] = useState("all");
  const [search, setSearch] = useState("");
  const [noteText, setNoteText] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await storage.get("oic-dash-v4");
        if (r?.value) {
          const stored = JSON.parse(r.value);
          if (!stored.todos.ideas) {
            stored.todos.ideas = { label: "Ideas & Backlog", icon: "💡", items: [] };
          }
          setD(stored);
        }
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await storage.set("oic-dash-v4", JSON.stringify(d));
      } catch (e) {}
    })();
  }, [d, loaded]);

  const toggle = (track, id) => {
    setD((p) => ({
      ...p,
      todos: {
        ...p.todos,
        [track]: {
          ...p.todos[track],
          items: p.todos[track].items.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        },
      },
    }));
  };

  const toggleMilestone = (id) => {
    setD((p) => ({
      ...p,
      milestones: p.milestones.map((m) => (m.id === id ? { ...m, done: !m.done } : m)),
    }));
  };

  const addNote = () => {
    if (!noteText.trim()) return;
    setD((p) => ({
      ...p,
      notes: [
        {
          id: `n${Date.now()}`,
          text: noteText.trim(),
          time: new Date().toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...p.notes,
      ],
    }));
    setNoteText("");
  };

  const deleteNote = (id) => setD((p) => ({ ...p, notes: p.notes.filter((n) => n.id !== id) }));

  const addTask = (track, text, priority = "yellow", note = "") => {
    if (!text.trim()) return;
    setD((p) => ({
      ...p,
      todos: {
        ...p.todos,
        [track]: {
          ...p.todos[track],
          items: [
            ...p.todos[track].items,
            { id: `i${Date.now()}`, text: text.trim(), done: false, p: priority, note: note.trim() },
          ],
        },
      },
    }));
  };

  const editTask = (track, id, updates) => {
    setD((p) => ({
      ...p,
      todos: {
        ...p.todos,
        [track]: {
          ...p.todos[track],
          items: p.todos[track].items.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        },
      },
    }));
  };

  const deleteTask = (track, id) => {
    setD((p) => ({
      ...p,
      todos: {
        ...p.todos,
        [track]: {
          ...p.todos[track],
          items: p.todos[track].items.filter((t) => t.id !== id),
        },
      },
    }));
  };

  const all = flattenTasks(d.todos);
  const { total, done, pct, critical } = calcStats(all);
  const filteredMem = filterMemory(d.memory, memCat, search);

  return (
    <div
      style={{
        background: CREAM,
        minHeight: "100vh",
        color: NAVY,
        fontFamily: "'DM Sans',sans-serif",
        paddingBottom: 72,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,700;1,400;1,600&family=DM+Mono:wght@400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:${CREAM};-webkit-font-smoothing:antialiased}
        ::selection{background:${NAVY};color:#fff}
        input,textarea,select{font-family:'DM Sans',sans-serif}
      `}</style>

      <Header pct={pct} done={done} total={total} />

      <div style={{ padding: "0 16px" }}>
        {tab === "home" && (
          <HomeTab
            d={d}
            open={open}
            setOpen={setOpen}
            critical={critical}
            toggle={toggle}
            toggleMilestone={toggleMilestone}
            noteText={noteText}
            setNoteText={setNoteText}
            addNote={addNote}
            deleteNote={deleteNote}
            setTab={setTab}
          />
        )}

        {tab === "tasks" && (
          <TasksTab
            d={d}
            open={open}
            setOpen={setOpen}
            toggle={toggle}
            addTask={addTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        )}

        {tab === "arch" && <ArchTab open={open} setOpen={setOpen} />}

        {tab === "memory" && (
          <MemoryTab
            d={d}
            memOpen={memOpen}
            setMemOpen={setMemOpen}
            memCat={memCat}
            setMemCat={setMemCat}
            search={search}
            setSearch={setSearch}
            filteredMem={filteredMem}
          />
        )}

        {tab === "brand" && <BrandTab d={d} open={open} setOpen={setOpen} />}
      </div>

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}
