/// <reference types="@testing-library/jest-dom" />
// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MethodologyModal } from "../MethodologyModal";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("MethodologyModal Component", () => {
  it("should not render when isOpen is false", () => {
    const { container } = render(
      <MethodologyModal isOpen={false} onClose={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render localized factors when isOpen is true", () => {
    render(<MethodologyModal isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText("Grid Electricity")).toBeInTheDocument();
    expect(screen.getByText("0.82 kg CO₂ / kWh")).toBeInTheDocument();
    expect(screen.getByText("Petrol Car Transit")).toBeInTheDocument();
    expect(screen.getByText("0.143 kg CO₂ / km")).toBeInTheDocument();
  });

  it("should trigger onClose when clicking the close button", () => {
    const handleClose = vi.fn();
    const { container } = render(<MethodologyModal isOpen={true} onClose={handleClose} />);

    const closeBtn = container.querySelector("#close-methodology-btn");
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn!);

    expect(handleClose).toHaveBeenCalled();
  });
});
