import { Trophy, TrendingDown, ArrowUp, Star } from "lucide-react";
import { motion } from "motion/react";

interface LeaderboardItem {
  rank: number;
  name: string;
  location: string;
  co2SavedKg: number;
  trend: "up" | "stable";
}

const leaderboardData: LeaderboardItem[] = [
  { rank: 1, name: "Palm Meadows Society", location: "Whitefield, Bangalore", co2SavedKg: 2840, trend: "up" },
  { rank: 2, name: "DLF Phase 5 Green Alliance", location: "Gurugram, Delhi NCR", co2SavedKg: 2610, trend: "up" },
  { rank: 3, name: "HSR Sector 3 Guild", location: "HSR Layout, Bangalore", co2SavedKg: 2450, trend: "stable" },
  { rank: 4, name: "Hiranandani Gardens Green Block", location: "Powai, Mumbai", co2SavedKg: 2120, trend: "up" },
];

export function LeaderboardCard() {
  return (
    <section aria-labelledby="leaderboard-title" className="glass-card rounded-3xl p-6 h-full flex flex-col relative overflow-hidden group">
      {/* Visual backdrop glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/15 transition-all" />

      <div className="mb-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Trophy className="text-purple-400 w-5 h-5" />
          <h3 id="leaderboard-title" className="font-semibold text-lg text-white">Community Leaderboard</h3>
        </div>
        <span className="text-xs text-slate-400 font-medium bg-slate-800/60 px-2.5 py-1 rounded-full border border-white/5">National Grid</span>
      </div>

      <div className="space-y-3 flex-1 z-10">
        {leaderboardData.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
              item.rank === 1 
                ? "bg-purple-500/5 border-purple-500/20 shadow-md"
                : "bg-slate-800/40 border-slate-700/50"
            }`}
          >
            <div className="flex items-center gap-3.5">
              {/* Rank Badge */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                item.rank === 1 ? "bg-purple-500 text-white" :
                item.rank === 2 ? "bg-slate-700 text-slate-200" :
                item.rank === 3 ? "bg-slate-800 text-slate-400 border border-slate-700" :
                "bg-transparent text-slate-400"
              }`}>
                {item.rank}
              </div>

              <div>
                <h4 className="font-semibold text-sm text-slate-100 flex items-center gap-1.5">
                  {item.name}
                  {item.rank === 1 && <Star className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />}
                </h4>
                <p className="text-xs text-slate-400">{item.location}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="font-mono font-bold text-sm text-purple-400 flex items-center gap-1 justify-end">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                {item.co2SavedKg} kg
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Avoided CO₂ / mo</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
