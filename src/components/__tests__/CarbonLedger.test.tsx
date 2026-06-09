/// <reference types="@testing-library/jest-dom" />
// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { CarbonLedger, type LoggedActivity } from "../CarbonLedger";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("CarbonLedger Component", () => {
  const mockLedger: LoggedActivity[] = [
    { id: "1", title: "Metro Ride", category: "transport", co2Saved: 2.5, timestamp: Date.now() },
    { id: "2", title: "Vegan lunch", category: "diet", co2Saved: 1.8, timestamp: Date.now() }
  ];

  it("should render total offset correctly", () => {
    render(
      <CarbonLedger
        ledger={mockLedger}
        onAddActivity={vi.fn()}
        onDeleteActivity={vi.fn()}
      />
    );

    expect(screen.getByText("4.3 kg CO₂")).toBeInTheDocument();
  });

  it("should show default presets and trigger onAddActivity when clicked", () => {
    const handleAdd = vi.fn();
    const { container } = render(
      <CarbonLedger
        ledger={mockLedger}
        onAddActivity={handleAdd}
        onDeleteActivity={vi.fn()}
      />
    );

    const presetBtn = container.querySelector("#preset-btn-0");
    expect(presetBtn).toBeInTheDocument();

    fireEvent.click(presetBtn!);
    expect(handleAdd).toHaveBeenCalledWith(
      "Delhi/Namma Metro Commute",
      "transport",
      2.5
    );
  });

  it("should toggle custom form and allow adding custom activity", () => {
    const handleAdd = vi.fn();
    const { container } = render(
      <CarbonLedger
        ledger={[]}
        onAddActivity={handleAdd}
        onDeleteActivity={vi.fn()}
      />
    );

    const toggleBtn = container.querySelector("#toggle-custom-form-btn");
    expect(toggleBtn).toBeInTheDocument();
    fireEvent.click(toggleBtn!);

    const titleInput = container.querySelector("#custom-title-input");
    const offsetInput = container.querySelector("#custom-offset-input");
    const submitBtn = container.querySelector("#submit-custom-activity-btn");

    expect(titleInput).toBeInTheDocument();
    expect(offsetInput).toBeInTheDocument();

    fireEvent.change(titleInput!, { target: { value: "Planted Neem Tree" } });
    fireEvent.change(offsetInput!, { target: { value: "15" } });
    fireEvent.click(submitBtn!);

    expect(handleAdd).toHaveBeenCalledWith("Planted Neem Tree", "transport", 15);
  });

  it("should show validation error on empty custom activity title", () => {
    const { container } = render(
      <CarbonLedger
        ledger={[]}
        onAddActivity={vi.fn()}
        onDeleteActivity={vi.fn()}
      />
    );

    const toggleBtn = container.querySelector("#toggle-custom-form-btn");
    fireEvent.click(toggleBtn!);

    const submitBtn = container.querySelector("#submit-custom-activity-btn");
    fireEvent.click(submitBtn!);

    expect(screen.getByText("Please enter an activity title.")).toBeInTheDocument();
  });

  it("should trigger onDeleteActivity when trash button is clicked", () => {
    const handleDelete = vi.fn();
    const { container } = render(
      <CarbonLedger
        ledger={mockLedger}
        onAddActivity={vi.fn()}
        onDeleteActivity={handleDelete}
      />
    );

    const deleteBtn = container.querySelector("#delete-ledger-1");
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn!);

    expect(handleDelete).toHaveBeenCalledWith("1");
  });
});
