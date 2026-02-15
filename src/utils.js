// ─── Pure utility functions (easily testable) ───

export function flattenTasks(todos) {
  return Object.entries(todos).flatMap(([k, v]) =>
    v.items.map((i) => ({ ...i, track: k }))
  );
}

export function calcStats(allTasks) {
  const total = allTasks.length;
  const done = allTasks.filter((t) => t.done).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const critical = allTasks.filter((t) => !t.done && t.p === "red");
  return { total, done, pct, critical };
}

export function filterMemory(memory, cat, search) {
  return memory.filter(
    (m) =>
      (cat === "all" || m.cat === cat) &&
      (!search ||
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.text.toLowerCase().includes(search.toLowerCase()))
  );
}
