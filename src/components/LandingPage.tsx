import { motion } from "motion/react";
import { Leaf, FileScan, TrendingDown, Target, Zap, Medal, Gamepad2, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import { GAMES_META } from "./EcoArcadePage";

const stats = [
  { value: "4.2M kg", label: "CO₂ Slain 💪", color: "from-emerald-400 to-green-500", glow: "rgba(52,211,153,0.18)" },
  { value: "85,201", label: "Eco Gang 🌍", color: "from-blue-400 to-cyan-500", glow: "rgba(96,165,250,0.18)" },
  { value: "1.2M+", label: "W Actions ✅", color: "from-violet-400 to-purple-500", glow: "rgba(167,139,250,0.18)" },
  { value: "95%", label: "Still Going 🔥", color: "from-amber-400 to-orange-500", glow: "rgba(251,191,36,0.18)" },
];

export function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      className="w-full mt-10 mb-28 px-4"
    >
      {/* Glowing separator line */}
      <div className="relative flex items-center justify-center mb-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5" />
        </div>
        <div className="relative px-6">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
            whileHover={{ y: -4, scale: 1.03 }}
            className="relative group flex flex-col items-center justify-center rounded-2xl p-5 border border-white/5 bg-slate-900/40 backdrop-blur-md overflow-hidden cursor-default"
            style={{ boxShadow: `0 0 32px 0 ${stat.glow}` }}
          >
            {/* Glow blob */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br ${stat.color}`}
              style={{ opacity: 0.07 }}
            />
            {/* Animated top accent line */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-12 rounded-full bg-gradient-to-r ${stat.color} group-hover:w-20 transition-all duration-300`} />

            <div className={`text-2xl sm:text-3xl md:text-4xl font-display font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent leading-tight`}>
              {stat.value}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-400 tracking-widest uppercase mt-2 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/** @deprecated use HeroStats inside the hero section instead */
export function StatsStrip() {
  return <HeroStats />;
}

export function FeatureBentoGrid({ onEnterApp }: { onEnterApp: () => void }) {
  return (
    <div className="max-w-none mx-auto px-6 md:px-16">
      {/* Section divider */}
      <div className="relative py-16 flex flex-col items-center">
        <div className="flex items-center gap-4 w-full max-w-4xl">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <span className="text-xs text-slate-500 tracking-[0.25em] uppercase font-medium px-3 py-1.5 rounded-full border border-slate-700/50 bg-slate-900/30">
            Features
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>
      </div>

      <div className="pb-20">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-4 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Your Climate Arc 🌿
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-semibold mb-6 leading-tight">
            The features that{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-cyan-400 bg-clip-text text-transparent">
              actually slap.
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            EcoSphere is the eco app built for people who want real impact — not just a dashboard to feel guilty about. AI-powered, streak-driven, and honestly kind of addictive.
          </p>
        </motion.div>
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
            <h3 className="text-2xl font-semibold mb-2">AI Carbon Twin 🤖</h3>
            <p className="text-slate-400 max-w-md">Your own digital doppelgänger that knows your habits, predicts your footprint with 94% accuracy, and tells you exactly how to glow up — sustainably.</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
            <Zap className="text-blue-400 w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Real-Time Simulator ⚡</h3>
          <p className="text-slate-400">See the exact temp drop and trees saved if you just took the bus instead. Instant gratification, eco edition.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
            <FileScan className="text-emerald-400 w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Smart Logging 📱</h3>
          <p className="text-slate-400">Log your activities without the cringe. AI validates your inputs so your data actually means something.</p>
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
              <h3 className="text-2xl font-semibold mb-2">Daily Eco Missions 🎯</h3>
              <p className="text-slate-400">Quests that actually match your life. Complete them, level up, flex on the leaderboard. It hits different when it's personalized.</p>
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
          Launch Dashboard 🚀 <TrendingDown className="w-5 h-5" />
        </motion.button>
      </div>
      </div>
    </div>
  );
}
/* ══════════════════════════════════════════════════════
   GAMES PREVIEW SECTION — home screen
══════════════════════════════════════════════════════ */
export function GamesPreview({ onGoToGames }: { onGoToGames: () => void }) {
  const preview = GAMES_META.slice(0, 6);
  return (
    <div className="py-16 px-4 sm:px-8 md:px-16 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-500/8 rounded-full blur-[80px] pointer-events-none" />

      {/* Heading */}
      <motion.div className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-violet-400 mb-3 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
          🎮 Eco Games
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-3 leading-tight">
          Play games.{" "}
          <span className="bg-gradient-to-r from-violet-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">
            Earn XP. Save Earth.
          </span>
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
          {GAMES_META.length} eco mini-games that teach sustainability through play. Complete them to earn XP, unlock achievements, and level up your green rank.
        </p>
      </motion.div>

      {/* Games scroll row */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:-mx-8 sm:px-8 md:-mx-16 md:px-16">
        {preview.map((g, i) => (
          <motion.div key={g.id}
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            onClick={onGoToGames}
            className="flex-shrink-0 snap-start w-48 p-4 rounded-2xl glass-card border border-white/8 cursor-pointer group hover:border-violet-500/30 transition-all"
            whileHover={{ y: -4, scale: 1.02 }}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g.grad} flex items-center justify-center text-xl mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
              {g.icon}
            </div>
            <h4 className="text-white font-bold text-sm mb-0.5 leading-snug">{g.title}</h4>
            <p className="text-slate-500 text-[10px] leading-snug mb-2">{g.desc.slice(0, 40)}…</p>
            <div className="flex items-center gap-1.5">
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                g.difficulty === "Easy" ? "bg-emerald-500/15 text-emerald-400" :
                g.difficulty === "Medium" ? "bg-amber-500/15 text-amber-400" :
                "bg-red-500/15 text-red-400"}`}>{g.difficulty}</span>
              <span className="text-amber-400 text-[10px] font-bold">⚡+{g.xp}</span>
            </div>
          </motion.div>
        ))}
        {/* See all card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          onClick={onGoToGames}
          className="flex-shrink-0 snap-start w-48 p-4 rounded-2xl border border-violet-500/25 bg-violet-500/8 cursor-pointer flex flex-col items-center justify-center gap-3 hover:bg-violet-500/15 transition-all"
          whileHover={{ y: -4, scale: 1.02 }}>
          <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-violet-400" />
          </div>
          <div className="text-center">
            <p className="text-violet-300 font-bold text-sm">+{GAMES_META.length - 6} more games</p>
            <p className="text-slate-500 text-[10px]">View All</p>
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div className="flex justify-center mt-8"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        <motion.button onClick={onGoToGames}
          whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(167,139,250,0.35)" }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 text-white font-black text-base shadow-[0_0_24px_rgba(167,139,250,0.2)] cursor-pointer">
          <Gamepad2 className="w-5 h-5" />
          Play All {GAMES_META.length} Games 🎮
        </motion.button>
      </motion.div>
    </div>
  );
}
