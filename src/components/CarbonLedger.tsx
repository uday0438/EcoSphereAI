import React, { useState } from "react";
import { Plus, Trash2, Leaf, Car, Zap, Utensils, ShoppingBag, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface LoggedActivity {
  id: string;
  title: string;
  category: "transport" | "energy" | "diet" | "waste";
  co2Saved: number; // in kg
  timestamp: number;
}

interface CarbonLedgerProps {
  ledger: LoggedActivity[];
  onAddActivity: (title: string, category: "transport" | "energy" | "diet" | "waste", co2Saved: number) => void;
  onDeleteActivity: (id: string) => void;
}

const PRESETS = [
  { title: "Delhi/Namma Metro Commute", category: "transport" as const, co2Saved: 2.5, description: "Metro vs personal car" },
  { title: "Vegetarian Meals (Daily)", category: "diet" as const, co2Saved: 1.8, description: "No meat consumed today" },
  { title: "Bypassed AC (2 Hours)", category: "energy" as const, co2Saved: 1.0, description: "Flipped to ceiling fan" },
  { title: "Avoided Single-Use Plastics", category: "waste" as const, co2Saved: 0.5, description: "Reusable bag & bottle" }
];

export function CarbonLedger({ ledger, onAddActivity, onDeleteActivity }: CarbonLedgerProps) {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customCategory, setCustomCategory] = useState<"transport" | "energy" | "diet" | "waste">("transport");
  const [customOffset, setCustomOffset] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedTitle = customTitle.trim();
    if (!trimmedTitle) {
      setErrorMsg("Please enter an activity title.");
      return;
    }

    const parsedOffset = parseFloat(customOffset);
    if (isNaN(parsedOffset) || parsedOffset <= 0) {
      setErrorMsg("Offset must be a valid positive number.");
      return;
    }

    onAddActivity(trimmedTitle, customCategory, parsedOffset);
    setCustomTitle("");
    setCustomOffset("");
    setShowCustomForm(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "transport":
        return <Car className="w-4 h-4 text-cyan-400" />;
      case "energy":
        return <Zap className="w-4 h-4 text-amber-400" />;
      case "diet":
        return <Utensils className="w-4 h-4 text-violet-400" />;
      default:
        return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
    }
  };

  const totalOffset = ledger.reduce((acc, curr) => acc + curr.co2Saved, 0);

  return (
    <section aria-labelledby="ledger-title" className="glass-card rounded-3xl p-6 h-full flex flex-col relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all" />

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="text-emerald-400 w-5 h-5 animate-pulse" />
          <h3 id="ledger-title" className="font-semibold text-lg text-white">Carbon Ledger</h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block tracking-widest uppercase">Total Offset</span>
          <span className="text-lg font-display font-bold text-emerald-400">{totalOffset.toFixed(1)} kg CO₂</span>
        </div>
      </div>

      {/* Quick Logging Presets */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Log Activity</h4>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              id={`preset-btn-${idx}`}
              onClick={() => onAddActivity(preset.title, preset.category, preset.co2Saved)}
              className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800 transition-all text-left flex flex-col justify-between group/btn cursor-pointer active:scale-[0.98]"
              aria-label={`Log preset: ${preset.title} saving ${preset.co2Saved} kilograms of CO2`}
            >
              <div className="flex justify-between items-center w-full mb-1">
                {getCategoryIcon(preset.category)}
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                  -{preset.co2Saved} kg
                </span>
              </div>
              <span className="text-xs font-medium text-slate-200 group-hover/btn:text-white line-clamp-1">{preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Logger Toggle */}
      <div className="mb-6">
        {!showCustomForm ? (
          <button
            id="toggle-custom-form-btn"
            onClick={() => setShowCustomForm(true)}
            className="w-full py-2.5 rounded-2xl border-2 border-dashed border-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            aria-expanded="false"
          >
            <Plus className="w-4 h-4" /> Log Custom Activity
          </button>
        ) : (
          <form onSubmit={handleCustomSubmit} className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-2xl space-y-3">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Custom Activity Details</h5>
            
            {errorMsg && (
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label htmlFor="custom-title-input" className="sr-only">Activity Title</label>
              <input
                id="custom-title-input"
                type="text"
                placeholder="What did you do?"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="custom-category-select" className="sr-only">Category</label>
                <select
                  id="custom-category-select"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="transport">Transport</option>
                  <option value="energy">Home Energy</option>
                  <option value="diet">Diet</option>
                  <option value="waste">Purchases/Waste</option>
                </select>
              </div>
              <div>
                <label htmlFor="custom-offset-input" className="sr-only">CO2 Offset in kilograms</label>
                <input
                  id="custom-offset-input"
                  type="number"
                  step="0.1"
                  placeholder="Offset (kg CO2)"
                  value={customOffset}
                  onChange={(e) => setCustomOffset(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                id="cancel-custom-form-btn"
                onClick={() => {
                  setShowCustomForm(false);
                  setErrorMsg("");
                }}
                className="px-3 py-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-custom-activity-btn"
                className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Log Activity
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Ledger History List */}
      <div className="flex-1 flex flex-col min-h-0">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">History Ledger</h4>
        <div className="flex-1 overflow-y-auto max-h-[180px] space-y-2 pr-1">
          <AnimatePresence initial={false}>
            {ledger.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
                No activities logged yet. Get started above!
              </div>
            ) : (
              ledger.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 border border-slate-700/30 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-200 line-clamp-1">{item.title}</p>
                      <p className="text-[10px] text-slate-500">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400">-{item.co2Saved.toFixed(1)} kg</span>
                    <button
                      id={`delete-ledger-${item.id}`}
                      onClick={() => onDeleteActivity(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer active:scale-90"
                      aria-label={`Delete ${item.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
