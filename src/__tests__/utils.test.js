import { describe, it, expect } from "vitest";
import { flattenTasks, calcStats, filterMemory } from "../utils";

describe("flattenTasks", () => {
  const todos = {
    brand: {
      label: "Brand",
      items: [
        { id: "b1", text: "Task 1", done: false, p: "red", note: "" },
        { id: "b2", text: "Task 2", done: true, p: "green", note: "" },
      ],
    },
    tech: {
      label: "Tech",
      items: [{ id: "t1", text: "Task 3", done: false, p: "yellow", note: "" }],
    },
  };

  it("flattens all tasks into a single array", () => {
    const result = flattenTasks(todos);
    expect(result).toHaveLength(3);
  });

  it("adds track key to each item", () => {
    const result = flattenTasks(todos);
    expect(result[0].track).toBe("brand");
    expect(result[1].track).toBe("brand");
    expect(result[2].track).toBe("tech");
  });

  it("preserves original item fields", () => {
    const result = flattenTasks(todos);
    expect(result[0].id).toBe("b1");
    expect(result[0].text).toBe("Task 1");
    expect(result[0].done).toBe(false);
  });

  it("handles empty todos", () => {
    expect(flattenTasks({})).toEqual([]);
  });
});

describe("calcStats", () => {
  it("calculates 0% when no tasks are done", () => {
    const tasks = [
      { id: "1", done: false, p: "red" },
      { id: "2", done: false, p: "yellow" },
    ];
    const { total, done, pct, critical } = calcStats(tasks);
    expect(total).toBe(2);
    expect(done).toBe(0);
    expect(pct).toBe(0);
    expect(critical).toHaveLength(1);
  });

  it("calculates 100% when all tasks are done", () => {
    const tasks = [
      { id: "1", done: true, p: "red" },
      { id: "2", done: true, p: "green" },
    ];
    const { pct, done, critical } = calcStats(tasks);
    expect(pct).toBe(100);
    expect(done).toBe(2);
    expect(critical).toHaveLength(0);
  });

  it("rounds percentage correctly", () => {
    const tasks = [
      { id: "1", done: true, p: "green" },
      { id: "2", done: false, p: "green" },
      { id: "3", done: false, p: "green" },
    ];
    // 1/3 = 33.33... → rounds to 33
    expect(calcStats(tasks).pct).toBe(33);
  });

  it("filters critical tasks (undone + red priority)", () => {
    const tasks = [
      { id: "1", done: false, p: "red" },
      { id: "2", done: true, p: "red" },
      { id: "3", done: false, p: "yellow" },
      { id: "4", done: false, p: "red" },
    ];
    const { critical } = calcStats(tasks);
    expect(critical).toHaveLength(2);
    expect(critical.map((t) => t.id)).toEqual(["1", "4"]);
  });

  it("handles empty task list without errors", () => {
    const { total, done, pct, critical } = calcStats([]);
    expect(total).toBe(0);
    expect(done).toBe(0);
    expect(pct).toBe(0);
    expect(critical).toEqual([]);
  });
});

describe("filterMemory", () => {
  const memory = [
    { id: "m1", cat: "product", title: "Hardware Strategy", text: "Stack-chan premium" },
    { id: "m2", cat: "tech", title: "Tech Stack", text: "OpenClaw + Hostinger" },
    { id: "m3", cat: "product", title: "Camera Feature", text: "Kimi multimodal vision" },
    { id: "m4", cat: "pricing", title: "Pricing Tiers", text: "Starter and Professional" },
  ];

  it('returns all items when category is "all" and no search', () => {
    expect(filterMemory(memory, "all", "")).toHaveLength(4);
  });

  it("filters by category", () => {
    const result = filterMemory(memory, "product", "");
    expect(result).toHaveLength(2);
    expect(result.every((m) => m.cat === "product")).toBe(true);
  });

  it("searches in title (case-insensitive)", () => {
    const result = filterMemory(memory, "all", "hardware");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("m1");
  });

  it("searches in text (case-insensitive)", () => {
    const result = filterMemory(memory, "all", "OPENCLAW");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("m2");
  });

  it("combines category and search filter", () => {
    const result = filterMemory(memory, "product", "camera");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("m3");
  });

  it("returns empty array when nothing matches", () => {
    expect(filterMemory(memory, "all", "nonexistent")).toEqual([]);
  });

  it("returns empty array when category and search both miss", () => {
    expect(filterMemory(memory, "tech", "hardware")).toEqual([]);
  });
});
