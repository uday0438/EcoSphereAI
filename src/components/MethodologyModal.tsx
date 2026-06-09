import { X, BookOpen, Compass, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MethodologyModal({ isOpen, onClose }: MethodologyModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] z-10 flex flex-col max-h-[85vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="methodology-modal-title"
          >
            {/* Top design accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-green-400 to-cyan-500" />

            {/* Close Button */}
            <button
              id="close-methodology-btn"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-850 transition-colors cursor-pointer"
              aria-label="Close methodology modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <div className="flex items-center gap-2.5 mb-6">
              <BookOpen className="text-emerald-400 w-6 h-6" />
              <h2 id="methodology-modal-title" className="text-2xl font-display font-bold text-white leading-tight">
                India Localized Math & Methodology
              </h2>
            </div>

            {/* Content Body */}
            <div className="overflow-y-auto flex-1 pr-1 space-y-6 text-sm text-slate-300 leading-relaxed">
              <section className="space-y-2">
                <p>
                  EcoSphereAI uses carbon coefficients specific to the Indian subcontinent, ensuring realistic local telemetry. Factors are sourced from public data databases including India's <strong>Central Electricity Authority (CEA)</strong> and the <strong>Ministry of Power</strong> guidelines (Mission LiFE).
                </p>
              </section>

              {/* Emission Factors Table */}
              <section className="space-y-3">
                <h3 className="font-semibold text-white text-base flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-400" /> Localized Emission Factors
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-xs font-bold text-slate-400 uppercase">
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Indian Average Factor</th>
                        <th className="px-4 py-3">Comparison Context</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 text-xs">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-200">Grid Electricity</td>
                        <td className="px-4 py-3 font-mono text-emerald-400">0.82 kg CO₂ / kWh</td>
                        <td className="px-4 py-3 text-slate-400">CEA Grid Avg (Higher coal ratio)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-200">Petrol Car Transit</td>
                        <td className="px-4 py-3 font-mono text-emerald-400">0.143 kg CO₂ / km</td>
                        <td className="px-4 py-3 text-slate-400">Typical Indian hatchback averages</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-200">Two-Wheeler (Motorcycle)</td>
                        <td className="px-4 py-3 font-mono text-emerald-400">0.044 kg CO₂ / km</td>
                        <td className="px-4 py-3 text-slate-400">Pillion passenger splits excluded</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-200">Auto-Rickshaw (LPG/CNG)</td>
                        <td className="px-4 py-3 font-mono text-emerald-400">0.065 kg CO₂ / km</td>
                        <td className="px-4 py-3 text-slate-400">CNG localized transit standard</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-200">Heavy Meat Diet</td>
                        <td className="px-4 py-3 font-mono text-emerald-400">4.50 kg CO₂ / meal</td>
                        <td className="px-4 py-3 text-slate-400">Beef/Lamb ingredients heavy carbon load</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-200">Vegetarian Diet</td>
                        <td className="px-4 py-3 font-mono text-emerald-400">1.20 kg CO₂ / meal</td>
                        <td className="px-4 py-3 text-slate-400">Grains & locally farmed pulses</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Formula explanation */}
              <section className="space-y-3">
                <h3 className="font-semibold text-white text-base flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-400" /> Emission Calculation Formulas
                </h3>
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                  <p>
                    <strong className="text-white">Annual Driving Footprint:</strong><br />
                    E_car = (Daily_km * 365 * 0.143) / 1000 [tons CO₂]
                  </p>
                  <p>
                    <strong className="text-white">Annual Grid Energy Footprint:</strong><br />
                    E_elec = (Monthly_kWh * 12 * 0.82) / 1000 [tons CO₂]
                  </p>
                  <p>
                    <strong className="text-white">Dietary Carbon Footprint:</strong><br />
                    E_diet = (Meals_per_week * 52 * 4.5) / 1000 [tons CO₂]
                  </p>
                </div>
              </section>

              {/* Mission LiFE Context */}
              <section className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">
                <h4 className="font-semibold text-emerald-400 text-sm mb-1">Mission LiFE Integration</h4>
                <p className="text-xs text-slate-300">
                  Mission LiFE (Lifestyle for Environment) is India's signature global initiative to promote sustainable choices. Our ledger offsets and daily missions follow the 7 thematic sectors of Mission LiFE: Save Energy, Save Water, Say No to Single-Use Plastic, Adopt Sustainable Food Systems, Reduce Waste, Adopt Healthy Lifestyles, and E-Waste reduction.
                </p>
              </section>
            </div>

            {/* Footer buttons */}
            <div className="mt-6 pt-4 border-t border-slate-850 flex justify-end">
              <button
                id="close-methodology-bottom-btn"
                onClick={onClose}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs rounded-xl transition-colors cursor-pointer"
              >
                Understood, close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
