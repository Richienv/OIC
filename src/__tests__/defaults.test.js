import { describe, it, expect } from "vitest";
import { getDefault } from "../data/defaults";
import { CL, CC } from "../constants";

describe("getDefault", () => {
  const data = getDefault();

  it("returns a fresh object on every call", () => {
    const a = getDefault();
    const b = getDefault();
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });

  describe("brand", () => {
    it("has all required brand fields", () => {
      expect(data.brand).toHaveProperty("name");
      expect(data.brand).toHaveProperty("tagline");
      expect(data.brand).toHaveProperty("colors");
      expect(data.brand).toHaveProperty("fonts");
      expect(data.brand).toHaveProperty("tone");
      expect(data.brand).toHaveProperty("story");
    });
  });

  describe("todos", () => {
    it("has 7 tracks", () => {
      const tracks = Object.keys(data.todos);
      expect(tracks).toHaveLength(7);
      expect(tracks).toEqual(["brand", "digital", "tech", "content", "hardware", "sales", "ideas"]);
    });

    it("has 42 tasks total", () => {
      const total = Object.values(data.todos).reduce((sum, t) => sum + t.items.length, 0);
      expect(total).toBe(42);
    });

    it("all task IDs are unique", () => {
      const ids = Object.values(data.todos).flatMap((t) => t.items.map((i) => i.id));
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("every task has required fields", () => {
      Object.values(data.todos).forEach((track) => {
        expect(track).toHaveProperty("label");
        expect(track).toHaveProperty("icon");
        track.items.forEach((item) => {
          expect(item).toHaveProperty("id");
          expect(item).toHaveProperty("text");
          expect(typeof item.done).toBe("boolean");
          expect(["red", "yellow", "green"]).toContain(item.p);
          expect(item).toHaveProperty("note");
        });
      });
    });

    it("all tasks start as not done", () => {
      Object.values(data.todos).forEach((track) => {
        track.items.forEach((item) => {
          expect(item.done).toBe(false);
        });
      });
    });
  });

  describe("memory", () => {
    it("has 32 memory items", () => {
      expect(data.memory).toHaveLength(32);
    });

    it("all memory IDs are unique", () => {
      const ids = data.memory.map((m) => m.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("every memory item has required fields", () => {
      data.memory.forEach((m) => {
        expect(m).toHaveProperty("id");
        expect(m).toHaveProperty("cat");
        expect(m).toHaveProperty("title");
        expect(m).toHaveProperty("text");
      });
    });

    it("all categories are valid", () => {
      const validCats = Object.keys(CL);
      data.memory.forEach((m) => {
        expect(validCats).toContain(m.cat);
        expect(CC).toHaveProperty(m.cat);
      });
    });
  });

  describe("milestones", () => {
    it("has 5 milestones", () => {
      expect(data.milestones).toHaveLength(5);
    });

    it("every milestone has required fields", () => {
      data.milestones.forEach((m) => {
        expect(m).toHaveProperty("id");
        expect(m).toHaveProperty("text");
        expect(m).toHaveProperty("target");
        expect(typeof m.done).toBe("boolean");
      });
    });

    it("all milestones start as not done", () => {
      data.milestones.forEach((m) => {
        expect(m.done).toBe(false);
      });
    });
  });

  describe("notes", () => {
    it("starts with an empty notes array", () => {
      expect(data.notes).toEqual([]);
    });
  });
});
