import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// Mock storage to avoid side effects
vi.mock("../storage", () => ({
  default: {
    get: vi.fn().mockResolvedValue(null),
    set: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText("OIC")).toBeInTheDocument();
  });

  it("shows the progress percentage", () => {
    render(<App />);
    // Percentage is split: "0" in one element, "%" in a span
    expect(screen.getByText((_, el) => el?.textContent === "0%")).toBeInTheDocument();
  });

  it("shows done/total count", () => {
    render(<App />);
    expect(screen.getByText("0/42 completed")).toBeInTheDocument();
  });

  it("defaults to home tab", () => {
    render(<App />);
    expect(screen.getByText("Do First")).toBeInTheDocument();
    expect(screen.getByText("All Tracks")).toBeInTheDocument();
  });

  it("switches to tasks tab on click", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("Tasks"));
    expect(screen.getByPlaceholderText("Add a task or idea...")).toBeInTheDocument();
  });

  it("switches to architecture tab on click", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("Arch"));
    expect(screen.getByText("How It Works")).toBeInTheDocument();
  });

  it("switches to memory tab on click", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("Memory"));
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("Hardware Strategy")).toBeInTheDocument();
  });

  it("switches to brand tab on click", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("Brand"));
    expect(screen.getByText("OPEN INTELLIGENCE COMPANION")).toBeInTheDocument();
  });
});
