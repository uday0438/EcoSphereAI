import { Lightbulb, AlertCircle, TrendingDown, Sun, Shield } from "lucide-react";
import { motion } from "motion/react";

interface GridAlert {
  id: string;
  type: "warning" | "info" | "success";
  message: string;
  source: string;
}

const activeAlerts: GridAlert[] = [
  { id: "a1", type: "warning", message: "BESCOM Peak Grid Load: Expect solar/wind power drop. Postpone heavy loads (geysers, EV charging) past 9 PM.", source: "BESCOM Grid Dispatch" },
  { id: "a2", type: "info", message: "Karnataka PM-KUSUM Subsidy Open: Claim up to 60% solar pump support.", source: "Ministry of New & Renewable Energy" },
];

export function SmartTipsCard() {
  return (
    <section aria-labelledby="tips-title" className="glass-card rounded-3xl p-6 h-full flex flex-col relative overflow-hidden group">
      {/* Background radial highlight */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/15 transition-all" />

      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="text-amber-400 w-5 h-5 animate-pulse" />
          <h3 id="tips-title" className="font-semibold text-lg text-white">Smart Grid Telemetry</h3>
        </div>
        <span className="text-xs text-amber-400 font-medium bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">Live Grid</span>
      </div>

      <div className="space-y-4 flex-1">
        {activeAlerts.map((alert, idx) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-2xl border flex gap-3.5 ${
              alert.type === "warning"
                ? "bg-red-500/5 border-red-500/20"
                : "bg-blue-500/5 border-blue-500/20"
            }`}
          >
            {alert.type === "warning" ? (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <Sun className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            )}

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                {alert.source}
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">
                {alert.message}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Dynamic Tip Banner */}
        <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl flex items-center gap-3.5 mt-2">
          <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs text-slate-300 leading-relaxed">
            Your current carbon offset rate has planted the equivalent of <strong className="text-white">12 young Neem trees</strong> in Karnataka this month.
          </p>
        </div>
      </div>
    </section>
  );
}
