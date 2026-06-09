/// <reference types="@testing-library/jest-dom" />
// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { EcoMissionsPanel } from "../EcoMissionsPanel";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

// Mock Framer Motion
vi.mock("motion/react", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    polyline: (props: any) => <polyline {...props} />,
  },
}));

afterEach(() => {
  cleanup();
});

describe("EcoMissionsPanel Component", () => {
  it("should render daily missions correctly", () => {
    render(
      <EcoMissionsPanel
        completedMissions={[]}
        onCompleteMission={vi.fn()}
      />
    );

    expect(screen.getByText("Daily Eco Missions")).toBeInTheDocument();
    expect(screen.getByText("Take Public Transport to Work")).toBeInTheDocument();
    expect(screen.getByText("Turn off Unused Appliances")).toBeInTheDocument();
  });

  it("should trigger onCompleteMission when complete button is clicked", () => {
    const handleComplete = vi.fn();
    const { container } = render(
      <EcoMissionsPanel
        completedMissions={[]}
        onCompleteMission={handleComplete}
      />
    );

    const completeBtn = container.querySelector("#mission-btn-m1");
    expect(completeBtn).toBeInTheDocument();
    fireEvent.click(completeBtn!);

    expect(handleComplete).toHaveBeenCalledWith("m1", 120, 4.2);
  });

  it("should show completed state and disable the button if mission is in completedMissions", () => {
    const { container } = render(
      <EcoMissionsPanel
        completedMissions={["m2"]}
        onCompleteMission={vi.fn()}
      />
    );

    const completeBtn = container.querySelector("#mission-btn-m2");
    expect(completeBtn).toBeDisabled();
  });
});
