import { describe, it, expect, beforeEach, vi } from "vitest";

// We re-import fresh for each test to pick up the mock state
let storage;

describe("storage (localStorage path)", () => {
  beforeEach(async () => {
    // Clear any window.storage to ensure localStorage path
    delete window.storage;
    localStorage.clear();
    // Re-import fresh module
    vi.resetModules();
    const mod = await import("../storage");
    storage = mod.default;
  });

  it("get returns null for missing key", async () => {
    const result = await storage.get("nonexistent");
    expect(result).toBeNull();
  });

  it("set writes to localStorage and returns { key, value }", async () => {
    const result = await storage.set("test-key", "test-value");
    expect(result).toEqual({ key: "test-key", value: "test-value" });
    expect(localStorage.getItem("test-key")).toBe("test-value");
  });

  it("get retrieves stored value", async () => {
    localStorage.setItem("my-key", "my-value");
    const result = await storage.get("my-key");
    expect(result).toEqual({ key: "my-key", value: "my-value" });
  });

  it("delete removes from localStorage", async () => {
    localStorage.setItem("del-key", "some-value");
    const result = await storage.delete("del-key");
    expect(result).toEqual({ key: "del-key", deleted: true });
    expect(localStorage.getItem("del-key")).toBeNull();
  });
});

describe("storage (window.storage path)", () => {
  beforeEach(async () => {
    vi.resetModules();
    // Mock window.storage API
    window.storage = {
      get: vi.fn(),
      set: vi.fn(),
      delete: vi.fn(),
    };
    const mod = await import("../storage");
    storage = mod.default;
  });

  afterEach(() => {
    delete window.storage;
  });

  it("get delegates to window.storage.get", async () => {
    window.storage.get.mockResolvedValue({ key: "k", value: "v" });
    const result = await storage.get("k");
    expect(window.storage.get).toHaveBeenCalledWith("k");
    expect(result).toEqual({ key: "k", value: "v" });
  });

  it("set delegates to window.storage.set", async () => {
    window.storage.set.mockResolvedValue({ key: "k", value: "v" });
    await storage.set("k", "v");
    expect(window.storage.set).toHaveBeenCalledWith("k", "v");
  });

  it("delete delegates to window.storage.delete", async () => {
    window.storage.delete.mockResolvedValue({ key: "k", deleted: true });
    await storage.delete("k");
    expect(window.storage.delete).toHaveBeenCalledWith("k");
  });
});
