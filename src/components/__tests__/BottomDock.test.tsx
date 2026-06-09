/// <reference types="@testing-library/jest-dom" />
// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import { BottomDock } from "../BottomDock";

// Mock Framer Motion
vi.mock("motion/react", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

afterEach(() => {
  cleanup();
});

describe("BottomDock Component", () => {
  it("should render navigation tabs and quick action buttons", () => {
    render(
      <BottomDock
        activeTab="landing"
        onTabChange={vi.fn()}
        onReplayIntro={vi.fn()}
        theme="dark"
        onThemeToggle={vi.fn()}
      />
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("My Arc ⚡")).toBeInTheDocument();
    expect(screen.getByText("Eco Scan")).toBeInTheDocument();
    expect(screen.getByText("Games")).toBeInTheDocument();
  });

  it("should trigger onTabChange when navigation tab is clicked", () => {
    const handleTabChange = vi.fn();
    const { container } = render(
      <BottomDock
        activeTab="landing"
        onTabChange={handleTabChange}
        onReplayIntro={vi.fn()}
        theme="dark"
        onThemeToggle={vi.fn()}
      />
    );

    const dashboardTab = container.querySelector("#dock-tab-dashboard");
    expect(dashboardTab).toBeInTheDocument();
    fireEvent.click(dashboardTab!);

    expect(handleTabChange).toHaveBeenCalledWith("dashboard");
  });

  it("should trigger onThemeToggle when theme button is clicked", () => {
    const handleThemeToggle = vi.fn();
    const { container } = render(
      <BottomDock
        activeTab="landing"
        onTabChange={vi.fn()}
        onReplayIntro={vi.fn()}
        theme="dark"
        onThemeToggle={handleThemeToggle}
      />
    );

    const themeToggleBtn = container.querySelector("#dock-theme-toggle");
    expect(themeToggleBtn).toBeInTheDocument();
    fireEvent.click(themeToggleBtn!);

    expect(handleThemeToggle).toHaveBeenCalled();
  });

  it("should trigger onReplayIntro when replay button is clicked", () => {
    const handleReplayIntro = vi.fn();
    const { container } = render(
      <BottomDock
        activeTab="landing"
        onTabChange={vi.fn()}
        onReplayIntro={handleReplayIntro}
        theme="dark"
        onThemeToggle={vi.fn()}
      />
    );

    const replayBtn = container.querySelector("#dock-replay-intro");
    expect(replayBtn).toBeInTheDocument();
    fireEvent.click(replayBtn!);

    expect(handleReplayIntro).toHaveBeenCalled();
  });
});
