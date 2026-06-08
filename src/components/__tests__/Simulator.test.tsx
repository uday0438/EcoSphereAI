import { describe, it, expect } from "vitest";
import { calculateEmissions } from "../SimulatorCard";

describe("Emissions Calculation logic (India Localized)", () => {
  it("should calculate correct emissions for default values", () => {
    // car = 15, twoWheeler = 10, auto = 5, energy = 12, diet = 2, baseline = 2.8
    const result = calculateEmissions(15, 10, 5, 12, 2);
    
    // Manual calculation checks:
    // carEmissions = (15 * 365 * 0.143) / 1000 = 0.782925
    // twEmissions = (10 * 365 * 0.044) / 1000 = 0.1606
    // autoEmissions = (5 * 365 * 0.065) / 1000 = 0.118625
    // energyEmissions = (12 * 365 * 0.82) / 1000 = 3.5916
    // dietEmissions = (2 * 52 * 4.5) / 1000 = 0.468
    // Static baseline = 0.8
    // Total = 0.782925 + 0.1606 + 0.118625 + 3.5916 + 0.468 + 0.8 = 5.92115 => 5.9 tons
    expect(result.projectedFootprint).toBe("5.9");
    expect(result.projectedNum).toBe(5.9);
    expect(result.isBetter).toBe(false); // 2.8 baseline vs 5.9 projected => worse
    expect(result.diff).toBeCloseTo(-3.1);
  });

  it("should calculate lower emissions when inputs are minimized", () => {
    // Zero driving of all transit, minimum energy (2), no meat meals (0)
    const result = calculateEmissions(0, 0, 0, 2, 0);
    
    // car = 0, tw = 0, auto = 0
    // energy = (2 * 365 * 0.82) / 1000 = 0.5986
    // diet = 0
    // Static baseline = 0.8
    // Total = 0.5986 + 0.8 = 1.3986 => 1.4 tons
    expect(result.projectedFootprint).toBe("1.4");
    expect(result.isBetter).toBe(true); // 1.4 vs 2.8 baseline => better
    expect(result.diff).toBeCloseTo(1.4);
  });

  it("should handle custom baseline parameters correctly", () => {
    const result = calculateEmissions(5, 5, 2, 5, 1, 5.0);
    
    // car = 5 * 365 * 0.143 / 1000 = 0.260975
    // tw = 5 * 365 * 0.044 / 1000 = 0.0803
    // auto = 2 * 365 * 0.065 / 1000 = 0.04745
    // energy = 5 * 365 * 0.82 / 1000 = 1.4965
    // diet = 1 * 52 * 4.5 / 1000 = 0.234
    // Static baseline = 0.8
    // Total = 0.260975 + 0.0803 + 0.04745 + 1.4965 + 0.234 + 0.8 = 2.919225 => 2.9 tons
    expect(result.projectedFootprint).toBe("2.9");
    expect(result.isBetter).toBe(true); // 2.9 vs 5.0 baseline => better
  });
});
