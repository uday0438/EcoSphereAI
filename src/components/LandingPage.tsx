import { motion } from "motion/react";
import { Leaf, FileScan, TrendingDown, Target, Zap, Medal } from "lucide-react";
import { cn } from "../lib/utils";

export function StatsStrip() {
  return (
    <div className="w-full bg-[#1E293B]/80 backdrop-blur-md border-y border-white/5 py-4 overflow-hidden">
      <div className="flex justify-center space-x-4 sm:space-x-12 md:space-x-24 animate-[pulse_10s_ease-in-out_infinite]">
        <Stat label="CO₂ Saved" value="4.2M kg" />
        <Stat label="Active Users" value="85,201" />
        <Stat label="Eco Actions" value="1.2M+" />
        <Stat label="Habit Retention" value="95%" className="hidden sm:block" />
      </div>
    </div>
  );
}

function Stat({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-lg sm:text-2xl md:text-3xl font-display font-medium text-white">{value}</div>
      <div className="text-[10px] sm:text-xs md:text-sm text-slate-400 tracking-wider uppercase mt-1">{label}</div>
    </div>
  );
}

export function FeatureBentoGrid({ onEnterApp }: { onEnterApp: () => void }) {
  return (
    <div className="max-w-none mx-auto px-6 md:px-16 py-20">
      <div className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-semibold mb-6">
          Your Personal Climate Intelligence
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          EcoSphere AI transforms carbon awareness into measurable action by creating a personalized AI sustainability coach that predicts, guides, and rewards eco-friendly behavior in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
            <Target className="w-32 h-32 text-green-500" />
          </div>
          <div className="relative z-10 w-full h-full flex flex-col justify-end">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <Leaf className="text-green-400 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">AI Carbon Twin</h3>
            <p className="text-slate-400 max-w-md">Our intelligence engine creates a digital replica of your habits to predict and simulate your future carbon footprint with 94% confidence.</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
            <Zap className="text-blue-400 w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Real-Time Simulator</h3>
          <p className="text-slate-400">See the exact temperature impact and trees saved if you adjust your transport or diet habits.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
            <FileScan className="text-emerald-400 w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Smart Logging</h3>
          <p className="text-slate-400">Contextual tracking prevents bad inputs and validates your consumption using recognized emission factors.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center h-full">
            <div className="flex-1">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                <Medal className="text-purple-400 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Daily Eco Missions</h3>
              <p className="text-slate-400">Turn intention into action. Complete personalized missions based on your highest emission areas to level up your Climate Rank.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnterApp}
          className="px-8 py-4 bg-white text-slate-900 rounded-full font-semibold text-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-shadow flex items-center gap-3"
        >
          Launch Dashboard <TrendingDown className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
