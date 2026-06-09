import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Flame, Zap, Trophy, Star, Target, Users, TrendingUp,
  Award, ChevronRight, Shield, Leaf, Bike, Bus,
  Lightbulb, TreePine, Brain, Crown, Sparkles,
} from "lucide-react";

/* ─────────────────────────── DATA ─────────────────────────── */

const ECO_LEVELS = [
  { level: 1,   title: "Eco Rookie",           color: "from-slate-400 to-slate-500",     ring: "#94a3b8" },
  { level: 5,   title: "Green Explorer",        color: "from-green-400 to-emerald-500",   ring: "#34d399" },
  { level: 10,  title: "Climate Builder",       color: "from-teal-400 to-cyan-500",       ring: "#22d3ee" },
  { level: 20,  title: "Carbon Warrior",        color: "from-blue-400 to-indigo-500",     ring: "#818cf8" },
  { level: 35,  title: "Earth Guardian",        color: "from-violet-400 to-purple-500",   ring: "#a78bfa" },
  { level: 50,  title: "Planet Champion",       color: "from-amber-400 to-orange-500",    ring: "#fbbf24" },
  { level: 100, title: "Sustainability Legend", color: "from-rose-400 to-pink-500",       ring: "#fb7185" },
];

const DEMO_LEVEL = ECO_LEVELS[4]; // Earth Guardian (level 35)
const DEMO_CURRENT_LEVEL = 12;
const DEMO_XP = 4250;
const DEMO_XP_MAX = 5000;
const XP_PCT = DEMO_XP / DEMO_XP_MAX;

const QUESTS = [
  {
    difficulty: "Easy",
    title: "Walk 2km Today",
    desc: "Swap your morning commute for a walk.",
    xp: 50,
    icon: "🚶",
    impact: "1.2kg CO₂",
    time: "Today",
    bar: "from-emerald-400 to-green-500",
    glow: "rgba(52,211,153,0.20)",
    border: "border-emerald-500/20",
    badge: "bg-emerald-500/10 text-emerald-400",
  },
  {
    difficulty: "Medium",
    title: "Reduce Electricity",
    desc: "Keep appliances off for 4 extra hours.",
    xp: 120,
    icon: "⚡",
    impact: "3.8kg CO₂",
    time: "2 Days",
    bar: "from-blue-400 to-cyan-500",
    glow: "rgba(96,165,250,0.20)",
    border: "border-blue-500/20",
    badge: "bg-blue-500/10 text-blue-400",
  },
  {
    difficulty: "Hard",
    title: "No Personal Vehicle",
    desc: "Use public transport or cycle all day.",
    xp: 300,
    icon: "🚌",
    impact: "8.4kg CO₂",
    time: "Today",
    bar: "from-violet-400 to-purple-500",
    glow: "rgba(167,139,250,0.20)",
    border: "border-violet-500/20",
    badge: "bg-violet-500/10 text-violet-400",
  },
];

const XP_ACTIONS = [
  { icon: <Bus className="w-4 h-4" />,       label: "Public Transport",     xp: "+120 XP",  color: "text-blue-400" },
  { icon: <Bike className="w-4 h-4" />,      label: "Cycling",              xp: "+150 XP",  color: "text-emerald-400" },
  { icon: <Lightbulb className="w-4 h-4" />, label: "Electricity Saving",   xp: "+80 XP",   color: "text-amber-400" },
  { icon: <Leaf className="w-4 h-4" />,      label: "Food Waste Reduction", xp: "+100 XP",  color: "text-green-400" },
  { icon: <TreePine className="w-4 h-4" />,  label: "Tree Plantation",      xp: "+300 XP",  color: "text-teal-400" },
  { icon: <Target className="w-4 h-4" />,    label: "Mission Completion",   xp: "+250 XP",  color: "text-violet-400" },
];

const ACHIEVEMENTS = [
  { icon: "🌱", title: "First Green Action",  subtitle: "Day 1",       unlocked: true  },
  { icon: "🔥", title: "7 Day Streak",         subtitle: "Streak",      unlocked: true  },
  { icon: "🌍", title: "100kg Saved",          subtitle: "CO₂",         unlocked: true  },
  { icon: "⚡", title: "Speed Runner",         subtitle: "Mission",     unlocked: false },
  { icon: "🏆", title: "50 Missions",          subtitle: "Complete",    unlocked: false },
  { icon: "🛡️", title: "Earth Protector",      subtitle: "Level 50",    unlocked: false },
];

const LEADERBOARD = [
  { rank: 1, name: "Priya S.",  level: 42, xp: "18.2k", avatar: "🌿", delta: "+3" },
  { rank: 2, name: "Alex M.",   level: 38, xp: "15.7k", avatar: "🌎", delta: "—"  },
  { rank: 3, name: "You",       level: 12, xp: "4.2k",  avatar: "⭐", delta: "+5", isUser: true },
  { rank: 4, name: "Jamie L.",  level: 11, xp: "3.9k",  avatar: "🌱", delta: "-1" },
];

const WEEKLY = [
  { label: "XP Earned",            value: "1,840",  icon: <Zap className="w-4 h-4 text-amber-400" />,    color: "text-amber-400" },
  { label: "Missions Done",        value: "7",      icon: <Target className="w-4 h-4 text-emerald-400" />, color: "text-emerald-400" },
  { label: "CO₂ Reduced",          value: "12.4kg", icon: <Leaf className="w-4 h-4 text-green-400" />,    color: "text-green-400" },
  { label: "Money Saved",          value: "₹680",   icon: <TrendingUp className="w-4 h-4 text-cyan-400" />, color: "text-cyan-400" },
  { label: "Achievements",         value: "3",      icon: <Trophy className="w-4 h-4 text-violet-400" />,  color: "text-violet-400" },
  { label: "Streak Progress",      value: "18d 🔥", icon: <Flame className="w-4 h-4 text-orange-400" />,  color: "text-orange-400" },
];

/* ─────────────────────────── HELPERS ─────────────────────────── */

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 w-full mb-12">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <span className="text-xs text-slate-500 tracking-[0.25em] uppercase font-medium px-3 py-1.5 rounded-full border border-slate-700/50 bg-slate-900/30 whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
    </div>
  );
}

/* ─────────────────────── XP RING CARD ─────────────────────── */

function XPRingCard() {
  const r = 58;
  const circ = 2 * Math.PI * r;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="md:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        {/* Ring */}
        <div className="relative w-44 h-44 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
            {/* Track */}
            <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
            {/* Progress */}
            <motion.circle
              cx="70" cy="70" r={r}
              fill="none"
              stroke="url(#xpGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              whileInView={{ strokeDashoffset: circ * (1 - XP_PCT) }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
            />
            <defs>
              <linearGradient id="xpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-slate-400 uppercase tracking-widest mb-1">Level</span>
            <span className="text-4xl font-display font-bold text-white leading-none">{DEMO_CURRENT_LEVEL}</span>
            <span className="text-xs text-violet-400 font-semibold mt-1">Earth Guardian</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-1">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-400 uppercase tracking-widest font-medium">Green XP Progress</span>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-display font-bold text-white">{DEMO_XP.toLocaleString()}</span>
            <span className="text-slate-500 text-sm">/ {DEMO_XP_MAX.toLocaleString()} XP</span>
          </div>
          {/* Bar */}
          <div className="w-full h-2 rounded-full bg-white/5 mb-6 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-400 to-emerald-400"
              initial={{ width: 0 }}
              whileInView={{ width: `${XP_PCT * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            />
          </div>
          {/* Level milestones */}
          <div className="grid grid-cols-3 gap-2">
            {ECO_LEVELS.slice(0, 3).map((l) => (
              <div key={l.level} className="flex flex-col items-start p-2.5 rounded-xl bg-white/3 border border-white/5">
                <span className={`text-xs font-bold bg-gradient-to-r ${l.color} bg-clip-text text-transparent`}>Lv {l.level}</span>
                <span className="text-[10px] text-slate-500 mt-0.5 leading-tight">{l.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── STREAK CARD ─────────────────────── */

function StreakCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="glass-card rounded-3xl p-8 relative overflow-hidden"
      style={{ boxShadow: "0 0 40px rgba(251,146,60,0.10)" }}
    >
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <Flame className="w-24 h-24 text-orange-400" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-orange-500/15 rounded-2xl flex items-center justify-center">
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-widest">Active Streak</div>
            <div className="text-sm font-semibold text-orange-400">Never Miss a Day</div>
          </div>
        </div>

        {/* Main streak number */}
        <div className="flex items-baseline gap-2 mb-6">
          <motion.span
            className="text-6xl font-display font-bold text-white"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          >
            18
          </motion.span>
          <span className="text-xl text-orange-400 font-semibold">Days 🔥</span>
        </div>

        {/* Mini streaks */}
        <div className="space-y-2">
          {[
            { label: "Daily Streak",   val: "18d", filled: 18, total: 30, color: "bg-orange-400" },
            { label: "Weekly Streak",  val: "3w",  filled: 3,  total: 4,  color: "bg-amber-400" },
            { label: "Monthly Streak", val: "1m",  filled: 1,  total: 3,  color: "bg-yellow-400" },
          ].map((s) => (
            <div key={s.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{s.label}</span>
                <span className="text-white font-semibold">{s.val}</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: s.total }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`flex-1 h-1.5 rounded-full ${i < s.filled ? s.color : "bg-white/8"}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.04, duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recovery note */}
        <div className="mt-5 px-3 py-2 rounded-xl bg-orange-500/8 border border-orange-500/15 text-xs text-orange-300">
          🛡️ Streak Shield active — miss once, keep your streak
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── QUEST BOARD ─────────────────────── */

function QuestBoard() {
  const [claimed, setClaimed] = useState<number | null>(null);
  const [floating, setFloating] = useState<{ id: number; xp: string } | null>(null);

  function handleClaim(i: number, xp: string) {
    if (claimed !== null) return;
    setClaimed(i);
    setFloating({ id: i, xp });
    setTimeout(() => setFloating(null), 1400);
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {QUESTS.map((q, i) => (
          <motion.div
            key={q.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={{ y: -5 }}
            className={`relative glass-card rounded-3xl p-6 overflow-hidden border ${q.border} cursor-pointer group`}
            style={{ boxShadow: `0 0 28px 0 ${q.glow}` }}
            onClick={() => handleClaim(i, q.xp.toString())}
          >
            {/* Glow bg */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${q.bar} blur-2xl`} style={{ opacity: 0.04 }} />

            {/* Top accent */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${q.bar} opacity-60`} />

            {/* Floating XP */}
            <AnimatePresence>
              {floating?.id === i && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -40, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <span className={`text-2xl font-display font-bold bg-gradient-to-r ${q.bar} bg-clip-text text-transparent`}>
                    +{q.xp} XP ✨
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${q.badge}`}>
                  {q.difficulty}
                </span>
                <span className="text-2xl">{q.icon}</span>
              </div>

              <h4 className="text-base font-display font-semibold text-white mb-1">{q.title}</h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">{q.desc}</p>

              <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
                <span>🌍 {q.impact}</span>
                <span>⏱ {q.time}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.94 }}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r ${q.bar} text-slate-900 transition-opacity ${claimed === i ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
              >
                {claimed === i ? "✓ Claimed" : `Accept +${q.xp} XP`}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── XP ACTIONS CARD ─────────────────────── */

function XPActionsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-3xl p-8 h-full"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 bg-amber-500/15 rounded-xl flex items-center justify-center">
          <Zap className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Green XP Actions</div>
          <div className="text-xs text-slate-400">Every action earns XP</div>
        </div>
      </div>
      <div className="space-y-3">
        {XP_ACTIONS.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`${a.color}`}>{a.icon}</span>
              <span className="text-sm text-slate-300">{a.label}</span>
            </div>
            <span className={`text-xs font-bold font-display ${a.color}`}>{a.xp}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────── ACHIEVEMENTS ─────────────────────── */

function AchievementsCard() {
  const [pop, setPop] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="md:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/4 to-transparent pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 bg-violet-500/15 rounded-xl flex items-center justify-center">
            <Trophy className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Achievements</div>
            <div className="text-xs text-slate-400">3 / 6 Unlocked</div>
          </div>
          <div className="ml-auto text-xs text-violet-400 font-semibold">View All →</div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 180 }}
              whileHover={a.unlocked ? { scale: 1.1 } : {}}
              onClick={() => a.unlocked && setPop(pop === i ? null : i)}
              className="relative flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border transition-all duration-300 ${
                  a.unlocked
                    ? "bg-gradient-to-br from-violet-500/20 to-emerald-500/20 border-violet-500/30 shadow-[0_0_20px_rgba(167,139,250,0.2)]"
                    : "bg-slate-800/50 border-slate-700/30 grayscale opacity-40"
                }`}
              >
                {a.icon}
              </div>

              {/* Glow ring on unlock */}
              {a.unlocked && (
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-violet-400/40 pointer-events-none"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              )}

              <span className="text-[9px] text-center text-slate-400 leading-tight font-medium">{a.title}</span>

              {/* Tooltip */}
              <AnimatePresence>
                {pop === i && (
                  <motion.div
                    className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 px-3 py-1.5 bg-slate-800 border border-violet-500/30 rounded-xl text-xs text-white whitespace-nowrap shadow-xl"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                  >
                    🏆 {a.title} · {a.subtitle}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── LEADERBOARD ─────────────────────── */

function LeaderboardCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass-card rounded-3xl p-8 h-full"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 bg-cyan-500/15 rounded-xl flex items-center justify-center">
          <Users className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">City Leaderboard</div>
          <div className="text-xs text-slate-400">This Week</div>
        </div>
        <div className="ml-auto flex gap-1.5">
          {["Friends", "City", "Global"].map((tab, i) => (
            <span
              key={tab}
              className={`text-[10px] px-2 py-0.5 rounded-full cursor-pointer ${i === 1 ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-slate-500"}`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {LEADERBOARD.map((u, i) => (
          <motion.div
            key={u.name}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.09 }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-colors ${
              u.isUser
                ? "bg-emerald-500/8 border-emerald-500/20"
                : "bg-white/2 border-white/5 hover:bg-white/4"
            }`}
          >
            {/* Rank */}
            <span
              className={`text-xs font-bold w-5 text-center ${
                u.rank === 1 ? "text-amber-400" : u.rank === 2 ? "text-slate-300" : u.rank === 3 ? "text-orange-400" : "text-slate-500"
              }`}
            >
              {u.rank === 1 ? "👑" : u.rank}
            </span>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-slate-700/60 border border-white/10 flex items-center justify-center text-base">
              {u.avatar}
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium truncate ${u.isUser ? "text-emerald-400" : "text-white"}`}>
                {u.name} {u.isUser && <span className="text-xs text-slate-500">(you)</span>}
              </div>
              <div className="text-[10px] text-slate-500">Level {u.level}</div>
            </div>

            {/* XP */}
            <div className="text-right">
              <div className="text-xs font-bold text-white">{u.xp}</div>
              <div className="text-[10px] text-slate-500">XP</div>
            </div>

            {/* Delta */}
            <span className={`text-[10px] font-semibold ml-1 ${u.delta.startsWith("+") ? "text-emerald-400" : u.delta === "—" ? "text-slate-500" : "text-red-400"}`}>
              {u.delta}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────── WEEKLY REVIEW ─────────────────────── */

function WeeklyReviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      className="glass-card rounded-3xl p-8 relative overflow-hidden"
      style={{ boxShadow: "0 0 48px rgba(52,211,153,0.06)" }}
    >
      {/* Gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/6 via-transparent to-violet-500/6 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 uppercase tracking-widest font-semibold">Weekly Review</span>
            </div>
            <h3 className="text-xl font-display font-semibold text-white">
              Your best week yet — up <span className="text-emerald-400">+14%</span>
            </h3>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <div className="text-2xl font-display font-bold text-emerald-400">A+</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">Grade</div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {WEEKLY.map((w, i) => (
            <motion.div
              key={w.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center p-4 rounded-2xl bg-white/3 border border-white/5 text-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                {w.icon}
              </div>
              <div className={`text-lg font-display font-bold ${w.color}`}>{w.value}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider leading-tight">{w.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── AI MENTOR CARD ─────────────────────── */

function AIMentorCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-card rounded-3xl p-8 relative overflow-hidden"
      style={{ boxShadow: "0 0 40px rgba(96,165,250,0.08)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-blue-500/15 rounded-2xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">AI Climate Mentor</div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400">Gemini Powered</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-white/6 rounded-2xl p-4 mb-5">
          <p className="text-sm text-slate-300 leading-relaxed">
            <span className="text-white font-medium">Hey! 👋</span> Transportation contributes{" "}
            <span className="text-orange-400 font-semibold">42%</span> of your emissions this week.{" "}
            Completing the{" "}
            <span className="text-violet-400 font-semibold">Public Transport Challenge</span> could
            earn <span className="text-amber-400 font-semibold">+250 XP</span> and reduce your
            footprint by <span className="text-emerald-400 font-semibold">8.4kg CO₂</span>.
          </p>
        </div>

        {/* Suggested mission */}
        <div className="border border-violet-500/20 bg-violet-500/5 rounded-2xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] text-violet-400 uppercase tracking-widest font-semibold mb-1">Suggested Mission</div>
              <div className="text-sm font-semibold text-white mb-1">Use public transport twice this week</div>
              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">+250 XP</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">8.4kg CO₂</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400">Easy · 2 Days</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 px-3 py-1.5 bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-xl text-xs font-semibold"
            >
              Accept
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── LEVEL ROADMAP ─────────────────────── */

function LevelRoadmapCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass-card rounded-3xl p-8 relative overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 bg-emerald-500/15 rounded-xl flex items-center justify-center">
          <Star className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Level Roadmap</div>
          <div className="text-xs text-slate-400">Your journey ahead</div>
        </div>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-slate-700/30 to-transparent" />

        <div className="space-y-4 pl-12">
          {ECO_LEVELS.map((l, i) => {
            const isPast = l.level < DEMO_CURRENT_LEVEL;
            const isCurrent = l.level <= DEMO_CURRENT_LEVEL && (ECO_LEVELS[i + 1]?.level ?? 999) > DEMO_CURRENT_LEVEL;
            return (
              <motion.div
                key={l.level}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`relative flex items-center gap-3 ${isPast || isCurrent ? "opacity-100" : "opacity-40"}`}
              >
                {/* Dot */}
                <div
                  className={`absolute -left-[2.1rem] w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                    isCurrent
                      ? "border-emerald-400 bg-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                      : isPast
                      ? "border-slate-500 bg-slate-700"
                      : "border-slate-700 bg-transparent"
                  }`}
                >
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                </div>

                <div className="flex items-center gap-3 flex-1">
                  <span className={`text-xs font-bold bg-gradient-to-r ${l.color} bg-clip-text text-transparent w-10`}>Lv {l.level}</span>
                  <span className={`text-sm ${isCurrent ? "text-white font-semibold" : isPast ? "text-slate-400" : "text-slate-500"}`}>
                    {l.title}
                  </span>
                  {isCurrent && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 font-semibold">
                      YOU
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── MAIN EXPORT ─────────────────────── */

export function GamificationShowcase({ onEnterApp }: { onEnterApp: () => void }) {
  return (
    <div className="max-w-none mx-auto px-6 md:px-16 pb-32">
      {/* ── Section intro ── */}
      <div className="relative py-16 flex flex-col items-center">
        <div className="flex items-center gap-4 w-full max-w-4xl mb-0">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <span className="text-xs text-slate-500 tracking-[0.25em] uppercase font-medium px-3 py-1.5 rounded-full border border-slate-700/50 bg-slate-900/30 whitespace-nowrap">
            Gamification
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>
      </div>

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            Duolingo x Strava x Climate 🔥
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-semibold mb-6 leading-tight">
            Era activated.{" "}
            <span className="bg-gradient-to-r from-violet-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">
              Grind for the planet.
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We turned sustainability into a whole vibe. Streaks. XP. Leaderboards. Achievements. If Duolingo and Strava had a baby and it cared about the planet — this is it. No cap.
          </p>
        </motion.div>
      </div>

      {/* ── ROW 1: XP Ring + Streak + AI Mentor ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <XPRingCard />
        <StreakCard />
      </div>

      {/* ── ROW 2: Level Roadmap + AI Mentor ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <LevelRoadmapCard />
        <AIMentorCard />
      </div>

      {/* ── QUEST BOARD ── */}
      <div className="mb-6">
        <SectionDivider label="Daily Quest Board" />
        <QuestBoard />
      </div>

      {/* ── ROW 3: XP Actions + Leaderboard ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <XPActionsCard />
        <LeaderboardCard />
      </div>

      {/* ── ROW 4: Achievements (wide) ── */}
      <div className="mb-6">
        <SectionDivider label="Achievements" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AchievementsCard />
          {/* Evolving Earth teaser */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between"
            style={{ boxShadow: "0 0 40px rgba(52,211,153,0.07)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/6 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-teal-500/15 rounded-xl flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-teal-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Evolving Earth</div>
                  <div className="text-xs text-slate-400">Grows with your level</div>
                </div>
              </div>
              <div className="space-y-2.5 mt-4">
                {[
                  { lv: 1, label: "Basic Earth", active: false },
                  { lv: 10, label: "Greener Earth", active: false },
                  { lv: 25, label: "Forests Expand", active: true },
                  { lv: 50, label: "Healthy Planet", active: false },
                  { lv: 100, label: "Thriving Ecosystem", active: false },
                ].map((e) => (
                  <div key={e.lv} className={`flex items-center gap-3 text-xs ${e.active ? "text-teal-400 font-semibold" : "text-slate-500"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${e.active ? "bg-teal-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" : "bg-slate-700"}`} />
                    <span className="w-10 opacity-60">Lv {e.lv}</span>
                    <span>{e.label}</span>
                    {e.active && <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-teal-500/15 border border-teal-500/25">LIVE</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── WEEKLY REVIEW ── */}
      <div className="mb-14">
        <SectionDivider label="Weekly Review" />
        <WeeklyReviewCard />
      </div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <p className="text-slate-400 text-sm">Join 85,000+ people grinding for the planet 🌍</p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 48px rgba(167,139,250,0.35)" }}
          whileTap={{ scale: 0.96 }}
          onClick={onEnterApp}
          className="px-10 py-4 bg-gradient-to-r from-violet-500 to-emerald-500 text-white rounded-full font-black text-lg shadow-[0_0_30px_rgba(167,139,250,0.20)] flex items-center gap-3"
        >
          <Zap className="w-5 h-5" />
          Start Earning XP — It&apos;s Free ✨
        </motion.button>
        <p className="text-xs text-slate-500">No credit card · Instant access · Your planet era starts NOW</p>
      </motion.div>
    </div>
  );
}
