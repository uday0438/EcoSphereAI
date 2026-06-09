import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trophy, Zap, RotateCcw, ArrowLeft, Clock, Gamepad2, Star, CheckCircle, Shield, AlertTriangle, Droplets, Trash2, ShieldAlert } from "lucide-react";

/* ══════════════════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════════════════ */
interface GameResult {
  won: boolean;
  xpEarned: number;
  scoreText: string;
  message: string;
  badge?: string;
  celebStyle?: "FloatingLeaves" | "EarthGlow" | "OceanWaves" | "ForestBurst" | "EnergyPulse";
}

interface GameProps {
  onComplete: (r: GameResult) => void;
  onExit: () => void;
}

interface GameMeta {
  id: number;
  title: string;
  desc: string;
  icon: string;
  xp: number;
  difficulty: "Easy" | "Medium" | "Hard";
  time: string;
  grad: string;
  glow: string;
  badge: string;
  celebStyle: "FloatingLeaves" | "EarthGlow" | "OceanWaves" | "ForestBurst" | "EnergyPulse";
}

/* ══════════════════════════════════════════════════════
   GAME METADATA (20 Games)
   ══════════════════════════════════════════════════════ */
export const GAMES_META: GameMeta[] = [
  { id: 1,  title: "Climate Time Machine",  desc: "Control Earth's future over 20 virtual years.", icon: "⏳", xp: 500, difficulty: "Hard",   time: "2m",   grad: "from-blue-500 to-indigo-600",    glow: "rgba(99,102,241,0.25)",   badge: "Climate Visionary", celebStyle: "EarthGlow" },
  { id: 2,  title: "Sustainable City",      desc: "Place clean infrastructure on a 4x4 grid.",     icon: "🏙️", xp: 300, difficulty: "Medium", time: "2m",   grad: "from-emerald-500 to-teal-600",   glow: "rgba(52,211,153,0.25)",  badge: "Eco Mayor", celebStyle: "EarthGlow" },
  { id: 3,  title: "Carbon Detective",      desc: "Find 8 hidden emission sources in the house.",   icon: "🔍", xp: 150, difficulty: "Easy",   time: "40s",  grad: "from-amber-500 to-orange-600",   glow: "rgba(245,158,11,0.25)",  badge: "Carbon Detective", celebStyle: "FloatingLeaves" },
  { id: 4,  title: "Recycling Rush",        desc: "Sort 20 waste items into 4 bins quickly.",       icon: "♻️", xp: 100, difficulty: "Easy",   time: "40s",  grad: "from-green-500 to-emerald-600",  glow: "rgba(74,222,128,0.25)",  badge: "Recycling Hero", celebStyle: "FloatingLeaves" },
  { id: 5,  title: "Eco Decision Sim",      desc: "Make life choices. Balance health and carbon.", icon: "⚖️", xp: 250, difficulty: "Easy",   time: "1m",   grad: "from-purple-500 to-violet-600",  glow: "rgba(167,139,250,0.25)", badge: "Decision Master", celebStyle: "FloatingLeaves" },
  { id: 6,  title: "Earth Rescue Mission",  desc: "Complete 8 tasks to restore planet health.",     icon: "🌍", xp: 200, difficulty: "Medium", time: "1m",   grad: "from-cyan-500 to-blue-600",      glow: "rgba(6,182,212,0.25)",   badge: "Earth Savior", celebStyle: "ForestBurst" },
  { id: 7,  title: "Energy Saver Sim",      desc: "Manage household power under a 1200W target.",   icon: "🔌", xp: 150, difficulty: "Medium", time: "20s",  grad: "from-yellow-500 to-amber-600",   glow: "rgba(251,191,36,0.25)",  badge: "Watt Watcher", celebStyle: "EnergyPulse" },
  { id: 8,  title: "Water Guardian",        desc: "Fix pipe leaks before water drains away.",       icon: "🚰", xp: 150, difficulty: "Easy",   time: "30s",  grad: "from-blue-400 to-cyan-500",      glow: "rgba(96,165,250,0.25)",  badge: "Water Guardian", celebStyle: "OceanWaves" },
  { id: 9,  title: "Carbon Footprint Match", desc: "Match daily actions to their CO2 impact ranges.", icon: "🧩", xp: 200, difficulty: "Medium", time: "1m",   grad: "from-rose-500 to-pink-600",      glow: "rgba(244,63,94,0.25)",    badge: "Carbon Auditor", celebStyle: "FloatingLeaves" },
  { id: 10, title: "Green Transport",       desc: "Plan routes. Pick the lowest-carbon travel.",    icon: "🚲", xp: 100, difficulty: "Easy",   time: "45s",  grad: "from-teal-500 to-emerald-600",   glow: "rgba(45,212,191,0.25)",   badge: "Transit Pro", celebStyle: "FloatingLeaves" },
  { id: 11, title: "Sustainable Shopping",  desc: "Compare choices and select eco-friendly options.", icon: "🛍️", xp: 120, difficulty: "Easy",   time: "45s",  grad: "from-amber-400 to-yellow-500",   glow: "rgba(251,191,36,0.25)",  badge: "Conscious Consumer", celebStyle: "FloatingLeaves" },
  { id: 12, title: "Food Footprint",        desc: "Build a daily menu under a 3.5kg CO2 limit.",    icon: "🥗", xp: 180, difficulty: "Medium", time: "1m",   grad: "from-lime-500 to-green-600",     glow: "rgba(163,230,53,0.25)",  badge: "Eco Chef", celebStyle: "ForestBurst" },
  { id: 13, title: "Climate Quiz Arena",    desc: "Answer trivia across 3 difficulty levels.",      icon: "🧠", xp: 250, difficulty: "Medium", time: "90s",  grad: "from-violet-500 to-fuchsia-600", glow: "rgba(139,92,246,0.25)",  badge: "Climate Scholar", celebStyle: "FloatingLeaves" },
  { id: 14, title: "Forest Restoration",    desc: "Reforest the 5x5 grid and protect from pests.",  icon: "🌳", xp: 200, difficulty: "Hard",   time: "1m",   grad: "from-green-600 to-emerald-700",  glow: "rgba(22,163,74,0.25)",   badge: "Forest Guardian", celebStyle: "ForestBurst" },
  { id: 15, title: "Ocean Cleanup",         desc: "Clean trash from the ocean. Avoid the fish!",    icon: "🌊", xp: 150, difficulty: "Easy",   time: "25s",  grad: "from-sky-500 to-blue-600",       glow: "rgba(14,165,233,0.25)",  badge: "Ocean Protector", celebStyle: "OceanWaves" },
  { id: 16, title: "Energy Tycoon",         desc: "Build a 75% clean energy mix with $100B.",      icon: "⚡", xp: 300, difficulty: "Hard",   time: "2m",   grad: "from-amber-500 to-yellow-600",   glow: "rgba(245,158,11,0.25)",  badge: "Clean Energy Tycoon", celebStyle: "EnergyPulse" },
  { id: 17, title: "Crisis Manager",        desc: "Make key decisions to manage 5 disasters.",      icon: "🚨", xp: 250, difficulty: "Hard",   time: "1m",   grad: "from-red-500 to-rose-600",       glow: "rgba(239,68,68,0.25)",   badge: "Crisis Chief", celebStyle: "EarthGlow" },
  { id: 18, title: "Eco Habit Builder",     desc: "Tick 8+ daily habits to build your green streak.", icon: "📅", xp: 120, difficulty: "Easy",   time: "30s",  grad: "from-indigo-500 to-purple-600",  glow: "rgba(99,102,241,0.25)",  badge: "Habit Hero", celebStyle: "FloatingLeaves" },
  { id: 19, title: "Green Campus",          desc: "Fund green initiatives across 4 campus areas.",  icon: "🏫", xp: 200, difficulty: "Medium", time: "1m",   grad: "from-emerald-600 to-cyan-600",   glow: "rgba(16,185,129,0.25)",  badge: "Campus Pioneer", celebStyle: "ForestBurst" },
  { id: 20, title: "AI Climate Mentor",     desc: "Pitch policies to the AI mentor. Score 80+.",   icon: "🤖", xp: 300, difficulty: "Hard",   time: "90s",  grad: "from-slate-700 to-slate-800",    glow: "rgba(71,85,105,0.25)",   badge: "Policy Master", celebStyle: "EarthGlow" },
];

/* ══════════════════════════════════════════════════════
   CELEBRATION ANIMATIONS
   ══════════════════════════════════════════════════════ */
function FloatingLeaves() {
  const leaves = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.7,
    duration: 2.0 + Math.random() * 1.5,
    size: 15 + Math.random() * 18,
    rotate: Math.random() * 360,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map(l => (
        <motion.div key={l.id} className="absolute"
          style={{ left: `${l.x}%`, bottom: `-10%`, fontSize: l.size }}
          initial={{ y: 0, opacity: 0.8, rotate: l.rotate }}
          animate={{ y: "-120vh", opacity: 0, rotate: l.rotate + 360 }}
          transition={{ duration: l.duration, delay: l.delay, ease: "easeOut" }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  );
}

function EarthGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
      <motion.div className="w-80 h-80 rounded-full bg-emerald-500/10 border border-emerald-500/20 absolute blur-2xl animate-pulse" />
      <motion.div className="w-60 h-60 rounded-full bg-blue-500/10 border border-blue-500/20 absolute blur-xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative">
        {[1, 2, 3, 4].map(i => (
          <motion.div key={i} className="absolute rounded-full border border-emerald-400/25 -translate-x-1/2 -translate-y-1/2"
            style={{ width: 100, height: 100, left: 0, top: 0 }}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 4.2, opacity: 0 }}
            transition={{ duration: 2.5, delay: (i - 1) * 0.6, repeat: Infinity, ease: "easeOut" }} />
        ))}
      </div>
    </div>
  );
}

function OceanWaves() {
  const bubbles = Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 2.2 + Math.random() * 1.8,
    size: 10 + Math.random() * 16,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg className="absolute bottom-0 left-0 w-full h-32 text-blue-500/10" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      {bubbles.map(b => (
        <motion.div key={b.id} className="absolute text-blue-300/40"
          style={{ left: `${b.x}%`, bottom: `-5%`, fontSize: b.size }}
          initial={{ y: 0, opacity: 0.6 }}
          animate={{ y: "-110vh", opacity: 0 }}
          transition={{ duration: b.duration, delay: b.delay, ease: "easeOut" }}
        >
          🫧
        </motion.div>
      ))}
    </div>
  );
}

function ForestBurst() {
  const petals = Array.from({ length: 32 }).map((_, i) => {
    const angle = (i / 32) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
    const distance = 120 + Math.random() * 200;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 14 + Math.random() * 16,
      delay: Math.random() * 0.15,
      duration: 1.2 + Math.random() * 0.7,
      emoji: ["🌸", "🍃", "🌿", "🌱", "🍀", "🌼"][i % 6],
    };
  });
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
      {petals.map(p => (
        <motion.div key={p.id} className="absolute"
          style={{ fontSize: p.size }}
          initial={{ x: 0, y: 0, scale: 0.1, opacity: 1 }}
          animate={{ x: p.x, y: p.y, scale: 1.1, opacity: 0 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}

function EnergyPulse() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
      {[1, 2, 3, 4].map(i => (
        <motion.div key={i} className="absolute rounded-full border-2 border-yellow-400/35"
          style={{ width: 80, height: 80 }}
          initial={{ scale: 0.4, opacity: 1 }}
          animate={{ scale: 4.5, opacity: 0 }}
          transition={{ duration: 1.6, delay: (i - 1) * 0.4, repeat: Infinity, ease: "easeOut" }} />
      ))}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const tx = Math.cos(angle) * 250;
        const ty = Math.sin(angle) * 250;
        return (
          <motion.div key={i} className="absolute text-yellow-400 font-bold"
            style={{ fontSize: 20 }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
            animate={{ x: tx, y: ty, opacity: 0, scale: 1.3, rotate: 360 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          >
            ⚡
          </motion.div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TIMER BAR & CELEBRATION OVERLAY
   ══════════════════════════════════════════════════════ */
function TimerBar({ timeLeft, maxTime }: { timeLeft: number; maxTime: number }) {
  const pct = (timeLeft / maxTime) * 100;
  const color = pct > 60 ? "from-emerald-400 to-green-500" : pct > 30 ? "from-amber-400 to-yellow-500" : "from-red-500 to-rose-500";
  return (
    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
      <motion.div className={`h-full rounded-full bg-gradient-to-r ${color}`}
        animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
    </div>
  );
}

function CelebrationOverlay({ result, onRetry, onBack }: { result: GameResult; onRetry: () => void; onBack: () => void }) {
  const renderCelebration = () => {
    if (!result.won) return null;
    switch (result.celebStyle) {
      case "EarthGlow": return <EarthGlow />;
      case "OceanWaves": return <OceanWaves />;
      case "ForestBurst": return <ForestBurst />;
      case "EnergyPulse": return <EnergyPulse />;
      default: return <FloatingLeaves />;
    }
  };

  return (
    <>
      {renderCelebration()}
      <motion.div className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl overflow-hidden"
          initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}>
          {result.won && (
            <motion.div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none"
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
          )}
          <motion.div className="text-7xl mb-4 leading-none animate-bounce"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200 }}>
            {result.won ? "🏆" : "💪"}
          </motion.div>
          <h3 className="text-2xl font-display font-black text-white mb-2">
            {result.won ? "You slayed it! 🔥" : "Almost there!"}
          </h3>
          <p className="text-slate-400 mb-5 text-sm leading-relaxed">{result.message}</p>
          <div className="flex justify-center gap-3 mb-5">
            <div className="flex flex-col items-center px-4 py-2.5 rounded-xl bg-white/4 border border-white/8">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">Score</span>
              <span className="text-base font-bold text-white">{result.scoreText}</span>
            </div>
            <div className="flex flex-col items-center px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">XP Earned</span>
              <span className="text-base font-bold text-amber-400">+{result.xpEarned} ⚡</span>
            </div>
          </div>
          {result.won && result.badge && (
            <motion.div className="mb-5 py-2 px-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2"
              animate={{ boxShadow: ["0 0 0 rgba(52,211,153,0)", "0 0 20px rgba(52,211,153,0.3)", "0 0 0 rgba(52,211,153,0)"] }}
              transition={{ duration: 2, repeat: Infinity }}>
              <span>🎖️ Badge unlocked:</span>
              <span className="text-white underline">{result.badge}</span>
            </motion.div>
          )}
          <div className="flex gap-3">
            <button onClick={onRetry}
              className="flex-1 py-3 rounded-full border border-white/10 text-white text-sm font-semibold hover:bg-white/5 transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5" /> Retry
            </button>
            <button onClick={onBack}
              className="flex-1 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-sm font-black transition-colors cursor-pointer">
              Back to Hub
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

function GameShell({ meta, children, onExit }: { meta: GameMeta; children: React.ReactNode; onExit: () => void }) {
  return (
    <div className="fixed inset-0 z-[9980] bg-slate-950/95 backdrop-blur-xl flex flex-col">
      {/* Header */}
      <div className={`flex items-center justify-between px-5 py-4 border-b border-white/8 bg-gradient-to-r ${meta.grad} bg-clip-padding`}
        style={{ background: `linear-gradient(135deg, ${meta.glow.replace("0.25","0.12")}, transparent)`, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <button onClick={onExit} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Hub</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xl">{meta.icon}</span>
          <span className="font-display font-bold text-white">{meta.title}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/8 border border-white/10">
          <Zap className="w-3 h-3 text-amber-400" />
          <span className="text-xs font-bold text-amber-400">+{meta.xp} XP</span>
        </div>
      </div>
      {/* Game area */}
      <div className="flex-1 overflow-hidden p-5 flex items-center justify-center">{children}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 1 — CLIMATE TIME MACHINE
   ══════════════════════════════════════════════════════ */
const TIME_MACHINE_ROUNDS = [
  { year: 2026, q: "A crucial election year. How will we steer national electricity budgets?", opt1: "Subsidize solar & wind grid development ($15B cost, +10 energy, -15% emissions)", opt2: "Subsidize traditional coal/gas plants for short-term economic booster (+15 economy, +5 energy, +10% emissions)", ans: 1 },
  { year: 2029, q: "Urban transport congestion is peaking. What is our primary transport policy?", opt1: "Ban combustion engine vehicle manufacturing by 2035 (+8 environment, -10% emissions)", opt2: "Build a massive network of highway bypasses (+10 economy, -5 environment, +8% emissions)", ans: 1 },
  { year: 2032, q: "Base-load energy demand is rising rapidly. How do we power our tech sectors?", opt1: "Invest heavily in Nuclear & Geothermal power plants (+18 energy, -12% emissions)", opt2: "Fast-track natural gas fracking permits (+10 energy, +8 economy, +8% emissions)", ans: 1 },
  { year: 2035, q: "Agricultural land demands are clashing with ancient national parks. Policy direction?", opt1: "Implement absolute deforestation bans & wildlife corridors (+15 environment, -8% emissions)", opt2: "Clear land for soy & livestock farming expansion (+15 food, +10 economy, +12% emissions)", ans: 1 },
  { year: 2038, q: "Household insulation is lagging. Heating costs are soaring in winter.", opt1: "Fund smart thermostats & insulation retrofits for all low-income homes (+12 environment, -6% emissions)", opt2: "Provide utility subsidies to keep burning gas heating cheap (+8 economy, +10% emissions)", ans: 1 },
  { year: 2041, q: "National dietary carbon footprint remains among the highest globally.", opt1: "Subsidize plant-based food production & place a carbon tax on red meat (+12 food, -10% emissions)", opt2: "Protect agricultural beef lobbies and subsidize cattle feed (+8 food, +8 economy, +10% emissions)", ans: 1 },
  { year: 2044, q: "Global Climate Alliance requests a funding contribution from our budget.", opt1: "Contribute $50B to global adaptation funds (+12 environment, -5% emissions globally)", opt2: "Prioritize local industrial tax cuts to stimulate domestic manufacturing (+12 economy, +6% emissions)", ans: 1 },
  { year: 2047, q: "Microplastic pollution has reached the highest mountain peaks and deepest seas.", opt1: "Ban all single-use plastics & fund ocean cleanup fleets (+15 environment, -4% emissions)", opt2: "Deregulate plastic manufacturing to maintain packaging cost-efficiency (+10 economy, +5% emissions)", ans: 1 },
];

function ClimateTimeMachine({ onComplete }: GameProps) {
  const [round, setRound] = useState(0);
  const [tempRise, setTempRise] = useState(1.15);
  const [economy, setEconomy] = useState(60);
  const [energy, setEnergy] = useState(50);
  const [emissions, setEmissions] = useState(80);
  const [environment, setEnvironment] = useState(50);
  const [done, setDone] = useState(false);

  const selectPolicy = (optIdx: number) => {
    if (done) return;
    
    let nextTemp = tempRise;
    let nextEconomy = economy;
    let nextEnergy = energy;
    let nextEmissions = emissions;
    let nextEnvironment = environment;

    if (round === 0) {
      if (optIdx === 1) { nextEnvironment += 10; nextEmissions -= 15; nextEconomy -= 5; }
      else { nextEconomy += 15; nextEnergy += 10; nextEmissions += 10; }
    } else if (round === 1) {
      if (optIdx === 1) { nextEnvironment += 12; nextEmissions -= 12; }
      else { nextEconomy += 12; nextEnvironment -= 8; nextEmissions += 8; }
    } else if (round === 2) {
      if (optIdx === 1) { nextEnergy += 18; nextEmissions -= 10; nextEnvironment += 5; }
      else { nextEnergy += 12; nextEconomy += 10; nextEmissions += 12; }
    } else if (round === 3) {
      if (optIdx === 1) { nextEnvironment += 15; nextEmissions -= 8; }
      else { nextEconomy += 12; nextEmissions += 12; nextEnvironment -= 12; }
    } else if (round === 4) {
      if (optIdx === 1) { nextEnvironment += 10; nextEmissions -= 8; }
      else { nextEconomy += 10; nextEmissions += 8; nextEnvironment -= 5; }
    } else if (round === 5) {
      if (optIdx === 1) { nextEnvironment += 8; nextEmissions -= 10; }
      else { nextEconomy += 8; nextEmissions += 10; nextEnvironment -= 6; }
    } else if (round === 6) {
      if (optIdx === 1) { nextEnvironment += 12; nextEmissions -= 8; nextEconomy -= 5; }
      else { nextEconomy += 12; nextEmissions += 8; nextEnvironment -= 8; }
    } else {
      if (optIdx === 1) { nextEnvironment += 15; nextEmissions -= 8; }
      else { nextEconomy += 10; nextEmissions += 10; nextEnvironment -= 10; }
    }

    // Ensure range limits
    nextEconomy = Math.min(100, Math.max(10, nextEconomy));
    nextEnergy = Math.min(100, Math.max(10, nextEnergy));
    nextEmissions = Math.min(150, Math.max(10, nextEmissions));
    nextEnvironment = Math.min(100, Math.max(10, nextEnvironment));

    // Calculate temp rise factor based on emissions vs environment
    const tempChange = (nextEmissions * 0.005) - (nextEnvironment * 0.003);
    nextTemp = Math.round((nextTemp + Math.max(-0.02, tempChange)) * 100) / 100;

    setTempRise(nextTemp);
    setEconomy(nextEconomy);
    setEnergy(nextEnergy);
    setEmissions(nextEmissions);
    setEnvironment(nextEnvironment);

    if (round < TIME_MACHINE_ROUNDS.length - 1) {
      setRound(round + 1);
    } else {
      setDone(true);
      const won = nextTemp < 1.5;
      onComplete({
        won,
        xpEarned: won ? 500 : 120,
        scoreText: `Temp Rise: ${nextTemp}°C`,
        message: won 
          ? "Amazing! You kept Earth's temperature rise under 1.5°C. Earth is thriving! 🌿" 
          : "Warming exceeded 1.5°C. Unstable climate tipping points triggered.",
        badge: "Climate Visionary",
        celebStyle: "EarthGlow"
      });
    }
  };

  const curr = TIME_MACHINE_ROUNDS[round];

  return (
    <div className="flex flex-col gap-5 w-full max-w-xl mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>Round {round + 1} / 8</span>
        <span className="font-bold text-lg font-mono text-white">Year {curr.year}</span>
        <span className={`px-2 py-0.5 rounded font-black text-sm ${tempRise < 1.5 ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}>
          🌡️ {tempRise}°C
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-[10px] uppercase font-bold text-slate-400">
        <div className="p-1.5 rounded-lg bg-white/3 border border-white/5">
          <div>💼 Economy</div>
          <div className="text-white text-sm mt-1">{economy}%</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/3 border border-white/5">
          <div>⚡ Energy</div>
          <div className="text-white text-sm mt-1">{energy}%</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/3 border border-white/5">
          <div>💨 Emissions</div>
          <div className="text-red-400 text-sm mt-1">{emissions} ppm</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/3 border border-white/5">
          <div>🌳 Env Health</div>
          <div className="text-emerald-400 text-sm mt-1">{environment}%</div>
        </div>
      </div>

      <div className="min-h-[90px] flex items-center justify-center text-center px-2">
        <p className="text-slate-200 text-sm md:text-base font-semibold leading-relaxed">{curr.q}</p>
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={() => selectPolicy(1)}
          className="p-3 text-xs md:text-sm text-left rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-300 transition-all cursor-pointer">
          🌱 <span className="font-bold">Eco Action:</span> {curr.opt1}
        </button>
        <button onClick={() => selectPolicy(2)}
          className="p-3 text-xs md:text-sm text-left rounded-xl border border-slate-500/20 bg-slate-500/5 hover:bg-slate-500/15 text-slate-300 transition-all cursor-pointer">
          💼 <span className="font-bold">Economic Priority:</span> {curr.opt2}
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 2 — SUSTAINABLE CITY BUILDER
   ══════════════════════════════════════════════════════ */
interface GridCell {
  id: number;
  type: "empty" | "solar" | "park" | "metro" | "wind" | "coal" | "industry";
}

const CITY_BUILDING_TYPES = [
  { type: "solar" as const, label: "Solar Plant", icon: "☀️", cost: 10, sus: 15 },
  { type: "park" as const, label: "Eco Park", icon: "🌳", cost: 5, sus: 10 },
  { type: "metro" as const, label: "Metro System", icon: "🚊", cost: 15, sus: 20 },
  { type: "wind" as const, label: "Wind Turbine", icon: "💨", cost: 8, sus: 12 },
];

function SustainableCityBuilder({ onComplete }: GameProps) {
  const [grid, setGrid] = useState<GridCell[]>(() => {
    // Generate initial grid: 16 cells, with 2 random coal plants and 2 industry blocks
    const items: GridCell[] = Array.from({ length: 16 }).map((_, i) => ({ id: i, type: "empty" as const }));
    items[2] = { id: 2, type: "coal" };
    items[8] = { id: 8, type: "industry" };
    items[13] = { id: 13, type: "coal" };
    return items;
  });
  const [budget, setBudget] = useState(55); // $55B
  const [selectedTool, setSelectedTool] = useState<"solar" | "park" | "metro" | "wind" | "demolish">("solar");
  
  // Calculate sustainability score
  const calculateSusScore = (g: GridCell[]) => {
    let score = 50;
    g.forEach(c => {
      if (c.type === "solar") score += 15;
      else if (c.type === "park") score += 10;
      else if (c.type === "metro") score += 20;
      else if (c.type === "wind") score += 12;
      else if (c.type === "coal") score -= 25;
      else if (c.type === "industry") score -= 15;
    });
    return Math.max(0, Math.min(100, score));
  };

  const score = calculateSusScore(grid);

  const placeBuilding = (cellId: number) => {
    const cell = grid[cellId];
    if (selectedTool === "demolish") {
      if (cell.type === "empty") return;
      if (budget < 8) return; // Cost $8 to clear
      const newGrid = grid.map(c => c.id === cellId ? { ...c, type: "empty" as const } : c);
      setGrid(newGrid);
      setBudget(b => b - 8);
      return;
    }

    if (cell.type !== "empty") return; // Spot taken
    const tool = CITY_BUILDING_TYPES.find(t => t.type === selectedTool)!;
    if (budget < tool.cost) return; // Insufficient budget

    const newGrid = grid.map(c => c.id === cellId ? { ...c, type: selectedTool } : c);
    setGrid(newGrid);
    setBudget(b => b - tool.cost);
  };

  const handleFinish = () => {
    const won = score >= 75;
    onComplete({
      won,
      xpEarned: won ? 300 : 75,
      scoreText: `Sus Score: ${score}/100`,
      message: won 
        ? "Excellent job, Mayor! You built a clean, green, sustainable city! 🏙️" 
        : "City sustainability is too low. Smog and traffic are paralyzing the population.",
      badge: "Eco Mayor",
      celebStyle: "EarthGlow"
    });
  };

  const getCellEmoji = (type: string) => {
    if (type === "empty") return "🟫";
    if (type === "solar") return "☀️";
    if (type === "park") return "🌳";
    if (type === "metro") return "🚊";
    if (type === "wind") return "💨";
    if (type === "coal") return "🏭";
    return "🛢️";
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-sm">
        <span className="text-amber-400 font-bold">💰 Budget: ${budget}B</span>
        <span className={`font-mono font-bold text-sm px-2 py-0.5 rounded ${score >= 75 ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"}`}>
          🏙️ Sustainability: {score}%
        </span>
      </div>

      {/* 4x4 Grid */}
      <div className="grid grid-cols-4 gap-2 aspect-square max-w-[280px] mx-auto w-full">
        {grid.map(cell => (
          <button
            key={cell.id}
            onClick={() => placeBuilding(cell.id)}
            className={`rounded-xl flex items-center justify-center text-3xl border transition-all cursor-pointer aspect-square
              ${cell.type === "empty" ? "bg-amber-950/10 border-white/5 hover:bg-white/5 hover:border-white/15" :
                cell.type === "coal" || cell.type === "industry" ? "bg-red-500/10 border-red-500/30" : "bg-emerald-500/10 border-emerald-500/30"}`}
          >
            {getCellEmoji(cell.type)}
          </button>
        ))}
      </div>

      {/* Buildings Palette */}
      <div className="grid grid-cols-5 gap-1.5 text-center">
        {CITY_BUILDING_TYPES.map(tool => (
          <button
            key={tool.type}
            onClick={() => setSelectedTool(tool.type)}
            className={`p-1.5 rounded-lg border flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
              selectedTool === tool.type ? "border-emerald-500 bg-emerald-500/20 text-white" : "border-white/5 bg-white/2 text-slate-400 hover:bg-white/5"
            }`}
          >
            <span className="text-xl">{tool.icon}</span>
            <span className="text-[8px] font-bold leading-none">{tool.label}</span>
            <span className="text-[7px] text-amber-400 font-black">${tool.cost}B</span>
          </button>
        ))}
        <button
          onClick={() => setSelectedTool("demolish")}
          className={`p-1.5 rounded-lg border flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
            selectedTool === "demolish" ? "border-red-500 bg-red-500/20 text-white" : "border-white/5 bg-white/2 text-slate-400 hover:bg-white/5"
          }`}
        >
          <span className="text-xl">💣</span>
          <span className="text-[8px] font-bold leading-none">Demolish</span>
          <span className="text-[7px] text-red-400 font-black">$8B</span>
        </button>
      </div>

      <div className="text-center text-[10px] text-slate-500">
        Click a build tool, then click on grid cells. Demolish cost is $8B. Clear 🏭 and build clean plants! Target: Sus score &gt;= 75%
      </div>

      <button onClick={handleFinish}
        className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm cursor-pointer shadow-md">
        Submit City Plan 🚀
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 3 — CARBON DETECTIVE
   ══════════════════════════════════════════════════════ */
interface Hotspot {
  id: number;
  name: string;
  room: string;
  co2: string;
  icon: string;
  solved: boolean;
  desc: string;
}

function CarbonDetective({ onComplete }: GameProps) {
  const [hotspots, setHotspots] = useState<Hotspot[]>([
    { id: 1, name: "Standby TV", room: "Living Room", co2: "45kg", icon: "📺", solved: false, desc: "Left on standby drawing phantom power." },
    { id: 2, name: "Preheating Oven", room: "Kitchen", co2: "120kg", icon: "🍳", solved: false, desc: "Oven preheating with nothing inside." },
    { id: 3, name: "Incandescent Lights", room: "Bedroom", co2: "90kg", icon: "💡", solved: false, desc: "Old incandescent bulb wasting electricity." },
    { id: 4, name: "AC set to 16°C", room: "Living Room", co2: "350kg", icon: "❄️", solved: false, desc: "AC drawing maximum power; raise to 24°C." },
    { id: 5, name: "Running Tap", room: "Bathroom", co2: "30kg", icon: "🚰", solved: false, desc: "Faucets leaking hot water continuously." },
    { id: 6, name: "Unplugged chargers", room: "Bedroom", co2: "15kg", icon: "🔌", solved: false, desc: "Empty phone charger plugged in wasting standby." },
    { id: 7, name: "Drafty Windows", room: "Living Room", co2: "220kg", icon: "🪟", solved: false, desc: "Single-pane window leaking heat outdoors." },
    { id: 8, name: "Full tumble dryer", room: "Laundry Room", co2: "180kg", icon: "👕", solved: false, desc: "Running a dryer half empty instead of air-drying." },
  ]);
  const [timeLeft, setTimeLeft] = useState(40);
  const [done, setDone] = useState(false);
  const onRef = useRef(onComplete); useEffect(() => { onRef.current = onComplete; });

  useEffect(() => {
    if (done) return;
    if (timeLeft === 0) {
      setDone(true);
      onRef.current({ won: false, xpEarned: 40, scoreText: "Failed", message: "Time is up! The carbon leaks were not solved in time." });
      return;
    }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done]);

  const solveHotspot = (id: number) => {
    const next = hotspots.map(h => h.id === id ? { ...h, solved: true } : h);
    setHotspots(next);

    if (next.every(h => h.solved)) {
      setDone(true);
      onRef.current({
        won: true,
        xpEarned: 150,
        scoreText: "8/8 Solved",
        message: "You detected and neutralized all carbon hotspots! Absolute carbon detective. 🔍",
        badge: "Carbon Detective",
        celebStyle: "FloatingLeaves"
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400">Carbon hotspots remaining: {hotspots.filter(h => !h.solved).length}</span>
        <span className="flex items-center gap-1 text-amber-400 font-bold"><Clock className="w-3.5 h-3.5" />{timeLeft}s</span>
      </div>
      <TimerBar timeLeft={timeLeft} maxTime={40} />

      <div className="grid grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-1">
        {hotspots.map(h => (
          <button
            key={h.id}
            disabled={h.solved || done}
            onClick={() => solveHotspot(h.id)}
            className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between h-[110px] relative overflow-hidden group ${
              h.solved ? "border-emerald-500/40 bg-emerald-500/10 opacity-70 cursor-default" : "border-white/5 bg-slate-900/60 hover:border-violet-500/40"
            }`}
          >
            <div className="flex justify-between items-start w-full">
              <span className="text-2xl">{h.icon}</span>
              <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${h.solved ? "bg-emerald-500/25 text-emerald-300" : "bg-red-500/15 text-red-400"}`}>
                {h.solved ? "SAVED" : `-${h.co2}`}
              </span>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs leading-none mb-1">{h.name}</h4>
              <p className="text-slate-400 text-[8px] uppercase tracking-wider">{h.room}</p>
            </div>
            {h.solved && <div className="absolute inset-0 bg-emerald-500/5 flex items-center justify-center font-bold text-xs text-emerald-400 select-none">SOLVED ✓</div>}
          </button>
        ))}
      </div>
      <p className="text-center text-[10px] text-slate-500">Tap every appliance to solve its carbon waste and save CO₂!</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 4 — RECYCLING RUSH
   ══════════════════════════════════════════════════════ */
const RECYCLE_RUSH_ITEMS = [
  { name: "Plastic Drink Bottle", bin: 0, icon: "🥤" },
  { name: "Soda Aluminum Can", bin: 1, icon: "🥫" },
  { name: "Corrugated Cardboard", bin: 2, icon: "📦" },
  { name: "Apple Core scraps", bin: 3, icon: "🍎" },
  { name: "Shredded Office Paper", bin: 2, icon: "📰" },
  { name: "Banana Skin", bin: 3, icon: "🍌" },
  { name: "Glass Dressing Jar", bin: 0, icon: "🫙" },
  { name: "Steel Food Can", bin: 1, icon: "🥫" },
  { name: "Cracked Coffee Mug", bin: 0, icon: "☕" },
  { name: "Egg Shell remnants", bin: 3, icon: "🥚" },
  { name: "Coffee Grounds", bin: 3, icon: "☕" },
  { name: "Old Newspaper", bin: 2, icon: "🗞️" },
  { name: "Rotten Salad Leaves", bin: 3, icon: "🥬" },
  { name: "Clean Glass Bottle", bin: 0, icon: "🍾" },
  { name: "Empty Deodorant Can", bin: 1, icon: "💨" },
  { name: "Mailing Envelope", bin: 2, icon: "✉️" },
  { name: "Avocado Pit", bin: 3, icon: "🥑" },
  { name: "Plastic Detergent Jug", bin: 0, icon: "🧴" },
  { name: "Metal Keys", bin: 1, icon: "🔑" },
  { name: "Cardboard Egg Carton", bin: 2, icon: "📦" },
];

const RECYCLE_BINS = [
  { label: "Glass/Plastics 🧴", color: "border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300" },
  { label: "Metals 🥫", color: "border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300" },
  { label: "Paper/Cardboard 📰", color: "border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300" },
  { label: "Organic/Compost 🌱", color: "border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-green-300" },
];

function RecyclingRush({ onComplete }: GameProps) {
  const itemsList = useRef([...RECYCLE_RUSH_ITEMS].sort(() => Math.random() - 0.5)).current;
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const [done, setDone] = useState(false);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);

  const scoreRef = useRef(0);
  const onRef = useRef(onComplete); useEffect(() => { onRef.current = onComplete; });

  const finish = useCallback((s: number) => {
    if (done) return; setDone(true);
    const won = s >= 15;
    onRef.current({
      won,
      xpEarned: won ? 100 : 35,
      scoreText: `${s}/20 sorted`,
      message: won ? "Recycling rush completed perfectly! Absolute sorting legend. ♻️" : "We need cleaner sorting. Aim for 15+ correct!",
      badge: "Recycling Hero",
      celebStyle: "FloatingLeaves"
    });
  }, [done]);

  useEffect(() => {
    if (done) return;
    if (timeLeft === 0) { finish(scoreRef.current); return; }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, finish]);

  const sortItem = (binIdx: number) => {
    if (done || flash) return;
    const correct = itemsList[idx].bin === binIdx;
    const ns = correct ? score + 1 : score;
    if (correct) { scoreRef.current = ns; setScore(ns); }
    setFlash(correct ? "correct" : "wrong");

    setTimeout(() => {
      setFlash(null);
      const next = idx + 1;
      if (next >= itemsList.length) {
        finish(ns);
      } else {
        setIdx(next);
      }
    }, 450);
  };

  const currItem = itemsList[Math.min(idx, itemsList.length - 1)];

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400">Progress: {idx + 1}/20</span>
        <span className="flex items-center gap-1 text-amber-400 font-bold"><Clock className="w-3.5 h-3.5" />{timeLeft}s</span>
        <span className="text-emerald-400 font-bold">Score: {score}</span>
      </div>
      <TimerBar timeLeft={timeLeft} maxTime={40} />

      <motion.div key={idx} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1, 
        backgroundColor: flash === "correct" ? "rgba(52,211,153,0.1)" : flash === "wrong" ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.02)" }}
        className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/8 py-6 flex-1 min-h-[140px]">
        <span className="text-5xl">{currItem.icon}</span>
        <span className="text-white font-bold text-base">{currItem.name}</span>
        {flash && <span className={`text-xs font-bold ${flash === "correct" ? "text-emerald-400 animate-pulse" : "text-red-400"}`}>
          {flash === "correct" ? "✓ CORRECT!" : "❌ WRONG BIN"}
        </span>}
      </motion.div>

      <div className="grid grid-cols-2 gap-2">
        {RECYCLE_BINS.map((bin, i) => (
          <button
            key={i}
            onClick={() => sortItem(i)}
            className={`py-3 px-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${bin.color}`}
          >
            {bin.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 5 — ECO DECISION SIMULATOR
   ══════════════════════════════════════════════════════ */
const SIMULATOR_ROUNDS = [
  {
    title: "1. Campus Commute",
    q: "You are traveling to the campus 10 miles away. How will you commute?",
    opts: [
      { text: "Solo gasoline SUV drive (Fast, convenient)", carbon: 5, health: -5, money: -15 },
      { text: "Take the electric metro train (Medium speed)", carbon: 1, health: 5, money: -3 },
      { text: "Cycle all the way (High physical effort)", carbon: 0, health: 15, money: 0 }
    ]
  },
  {
    title: "2. Grocery Diet",
    q: "You are planning meals for the week. What is your food cart design?",
    opts: [
      { text: "Steak and beef-heavy diet (High protein focus)", carbon: 6, health: -8, money: -20 },
      { text: "Chicken & dairy mixed basket (Balanced diet)", carbon: 3, health: 5, money: -12 },
      { text: "Local seasonal plant-based basket (Veg focused)", carbon: 0.5, health: 12, money: -8 }
    ]
  },
  {
    title: "3. Wardrobe Refresher",
    q: "You need a fresh outfit for a presentation. Where do you shop?",
    opts: [
      { text: "Buy trendy fast-fashion items online", carbon: 4, health: 0, money: -10 },
      { text: "Browse local vintage/thrift clothing racks", carbon: 0.5, health: 5, money: -4 },
      { text: "Borrow/mend/re-style what you have", carbon: 0, health: 2, money: 0 }
    ]
  },
  {
    title: "4. Summer Vacation",
    q: "Summer break is here! You want to refresh yourself. What is the destination?",
    opts: [
      { text: "Short flight to beach resort across borders", carbon: 8, health: 10, money: -40 },
      { text: "Scenic train trip to forest camp (Carbon light)", carbon: 1.5, health: 15, money: -15 },
      { text: "Local backyard exploration & camping (Zero travel)", carbon: 0.2, health: 8, money: -2 }
    ]
  },
  {
    title: "5. Home Heating & Cooling",
    q: "Temperatures are reaching 95°F in summer. How do you stay cool?",
    opts: [
      { text: "Set AC thermostat to a chilly 65°F (On 24/7)", carbon: 5, health: -4, money: -18 },
      { text: "Use smart thermostat set to 78°F with fans", carbon: 1.8, health: 5, money: -8 },
      { text: "Natural cross-ventilation, shades & cool showers", carbon: 0.2, health: 2, money: 0 }
    ]
  }
];

function EcoDecisionSimulator({ onComplete }: GameProps) {
  const [shuffledRounds] = useState(() => {
    return [...SIMULATOR_ROUNDS]
      .sort(() => Math.random() - 0.5)
      .map(r => {
        return {
          ...r,
          opts: [...r.opts].sort(() => Math.random() - 0.5)
        };
      });
  });
  const [currRound, setCurrRound] = useState(0);
  const [carbon, setCarbon] = useState(0);
  const [health, setHealth] = useState(50);
  const [money, setMoney] = useState(100);
  const [done, setDone] = useState(false);

  const makeChoice = (opt: { carbon: number; health: number; money: number }) => {
    if (done) return;
    const nextCarbon = Math.round((carbon + opt.carbon) * 10) / 10;
    const nextHealth = Math.min(100, Math.max(0, health + opt.health));
    const nextMoney = Math.min(150, Math.max(0, money + opt.money));

    setCarbon(nextCarbon);
    setHealth(nextHealth);
    setMoney(nextMoney);

    if (currRound < shuffledRounds.length - 1) {
      setCurrRound(currRound + 1);
    } else {
      setDone(true);
      const won = nextCarbon <= 12 && nextHealth >= 60 && nextMoney >= 40;
      onComplete({
        won,
        xpEarned: won ? 250 : 80,
        scoreText: `CO2: ${nextCarbon}kg`,
        message: won 
          ? "You balanced your life metrics perfectly while saving Earth! ⚖️" 
          : `Balance failed. Carbon footprint too high (${nextCarbon}kg) or economy/health drained.`,
        badge: "Decision Master",
        celebStyle: "FloatingLeaves"
      });
    }
  };

  const currentScenario = shuffledRounds[currRound];

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="text-center font-display font-black text-white text-base">
        {currentScenario.title}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase font-bold text-slate-400">
        <div className="p-1 rounded bg-white/3">
          <div>💨 Carbon</div>
          <div className="text-red-400 text-sm mt-0.5">{carbon} kg</div>
        </div>
        <div className="p-1 rounded bg-white/3">
          <div>❤️ Health</div>
          <div className="text-emerald-400 text-sm mt-0.5">{health}%</div>
        </div>
        <div className="p-1 rounded bg-white/3">
          <div>💰 Money</div>
          <div className="text-amber-400 text-sm mt-0.5">${money}</div>
        </div>
      </div>

      <p className="text-slate-200 text-xs text-center py-2 min-h-[50px]">{currentScenario.q}</p>

      <div className="flex flex-col gap-2">
        {currentScenario.opts.map((opt, i) => (
          <button
            key={i}
            onClick={() => makeChoice(opt)}
            className="p-3 rounded-xl border border-white/5 bg-slate-900/60 hover:bg-slate-800/80 hover:border-violet-500/30 text-white text-xs text-left cursor-pointer transition-all flex flex-col gap-1"
          >
            <span className="font-semibold text-slate-200">{opt.text}</span>
            <span className="flex gap-3 text-[9px] text-slate-500 font-bold uppercase">
              <span>CO2: +{opt.carbon}kg</span>
              <span>Health: {opt.health > 0 ? `+${opt.health}` : opt.health}%</span>
              <span>Cost: {opt.money > 0 ? `+${opt.money}` : opt.money}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 6 — EARTH RESCUE MISSION
   ══════════════════════════════════════════════════════ */
interface RescueTask {
  id: number;
  name: string;
  cost: number;
  healthAdded: number;
  completed: boolean;
  timeCost: number; // seconds
}

function EarthRescueMission({ onComplete }: GameProps) {
  const [tasks, setTasks] = useState<RescueTask[]>([
    { id: 1, name: "Plant Mangroves", cost: 10, healthAdded: 8, completed: false, timeCost: 2 },
    { id: 2, name: "Ban Single-use Plastic", cost: 8, healthAdded: 7, completed: false, timeCost: 2 },
    { id: 3, name: "EV Subsidies", cost: 15, healthAdded: 10, completed: false, timeCost: 3 },
    { id: 4, name: "Restore Wetlands", cost: 12, healthAdded: 8, completed: false, timeCost: 2 },
    { id: 5, name: "Build Wind/Solar Farms", cost: 20, healthAdded: 12, completed: false, timeCost: 3 },
    { id: 6, name: "Implement Carbon Tax", cost: 5, healthAdded: 9, completed: false, timeCost: 1 },
    { id: 7, name: "Insulate Buildings", cost: 14, healthAdded: 7, completed: false, timeCost: 2 },
    { id: 8, name: "Protect Coral Reefs", cost: 18, healthAdded: 9, completed: false, timeCost: 3 }
  ]);
  const [earthHealth, setEarthHealth] = useState(50); // Starts at 50%
  const [funds, setFunds] = useState(70); // Starts with $70M
  const [timeLeft, setTimeLeft] = useState(60);
  const [activeTask, setActiveTask] = useState<number | null>(null);
  const [taskProgress, setTaskProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [crisis, setCrisis] = useState<{ name: string; healthLoss: number } | null>(null);

  const onRef = useRef(onComplete); useEffect(() => { onRef.current = onComplete; });

  // Timer loop
  useEffect(() => {
    if (done) return;
    if (timeLeft === 0) {
      setDone(true);
      onRef.current({ won: false, xpEarned: 50, scoreText: `${earthHealth}% Health`, message: "Earth collapsed before the mission completed." });
      return;
    }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, earthHealth]);

  // Funds accumulator and random crisis spawner
  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      setFunds(f => Math.min(100, f + 3));
      
      // 15% chance of random crisis if no active crisis
      if (Math.random() < 0.15 && !crisis) {
        const crisesList = [
          { name: "Forest Fire in Amazon", healthLoss: 10 },
          { name: "Oil Tanker Leak in Ocean", healthLoss: 8 },
          { name: "Extreme Urban Smog Crisis", healthLoss: 6 }
        ];
        const randomCrisis = crisesList[Math.floor(Math.random() * crisesList.length)];
        setCrisis(randomCrisis);
        setEarthHealth(h => Math.max(10, h - randomCrisis.healthLoss));
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [done, crisis]);

  // Active task progress worker
  useEffect(() => {
    if (activeTask === null || done) return;
    const task = tasks.find(t => t.id === activeTask);
    if (!task) return;
    const duration = task.timeCost * 1000;
    const intervalTime = 100;
    const increment = (intervalTime / duration) * 100;

    const interval = setInterval(() => {
      setTaskProgress(prev => {
        if (prev + increment >= 100) {
          clearInterval(interval);
          setActiveTask(null);
          setTaskProgress(0);
          setTasks(ts => ts.map(t => t.id === activeTask ? { ...t, completed: true } : t));
          setEarthHealth(h => {
            const nextHealth = Math.min(100, h + task.healthAdded);
            if (nextHealth >= 100 && tasks.filter(t => t.id !== activeTask && !t.completed).length === 0) {
              setDone(true);
              setTimeout(() => {
                onRef.current({
                  won: true,
                  xpEarned: 200,
                  scoreText: "100% Health",
                  message: "Earth is saved and biodiversity has fully rebounded! 🌍🌳",
                  badge: "Earth Savior",
                  celebStyle: "ForestBurst"
                });
              }, 50);
            }
            return nextHealth;
          });
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [activeTask, tasks, done]);

  const startTask = (id: number) => {
    if (activeTask !== null || done) return;
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    if (funds < task.cost) return; // Insufficient funds

    setFunds(f => f - task.cost);
    setActiveTask(id);
    setTaskProgress(0);
  };

  const resolveCrisis = () => {
    setCrisis(null);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span className="font-bold text-amber-400">💵 Funds: ${funds}M</span>
        <span className="flex items-center gap-1 text-slate-400 font-bold"><Clock className="w-3.5 h-3.5" />{timeLeft}s</span>
        <span className="font-bold text-emerald-400">🌍 Health: {earthHealth}%</span>
      </div>
      
      {/* Earth Health bar */}
      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500"
          animate={{ width: `${earthHealth}%` }} transition={{ duration: 0.5 }} />
      </div>

      {/* active crisis display */}
      <AnimatePresence>
        {crisis && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between p-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs">
            <span className="flex items-center gap-1.5 font-bold"><AlertTriangle className="w-4 h-4" /> CRISIS: {crisis.name} (-{crisis.healthLoss}%!)</span>
            <button onClick={resolveCrisis} className="px-2.5 py-1 bg-red-500 text-slate-950 rounded font-black cursor-pointer text-[10px]">TAP TO HELP</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task status */}
      {activeTask !== null && (
        <div className="p-2.5 rounded-xl border border-violet-500/20 bg-violet-500/5 text-xs text-violet-300 flex flex-col gap-1.5">
          <div className="flex justify-between font-bold">
            <span>Progress: {tasks.find(t => t.id === activeTask)!.name}</span>
            <span>{Math.round(taskProgress)}%</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-violet-400" style={{ width: `${taskProgress}%` }} />
          </div>
        </div>
      )}

      {/* Tasks Grid */}
      <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-1">
        {tasks.map(t => (
          <button
            key={t.id}
            disabled={t.completed || activeTask !== null || done || funds < t.cost}
            onClick={() => startTask(t.id)}
            className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between h-[70px] relative ${
              t.completed ? "border-emerald-500/40 bg-emerald-500/10 opacity-70 cursor-default" :
              activeTask !== null || funds < t.cost ? "border-white/5 bg-slate-900/30 opacity-40 cursor-not-allowed" :
              "border-white/5 bg-slate-900/60 hover:border-emerald-500/40"
            }`}
          >
            <div className="flex justify-between items-center w-full">
              <span className="text-white font-bold text-[10px] truncate max-w-[85px]">{t.name}</span>
              <span className="text-emerald-400 text-[8px] font-black font-mono">+{t.healthAdded}%</span>
            </div>
            <div className="flex justify-between items-center w-full mt-2 text-[8px] font-bold">
              <span className="text-amber-400">${t.cost}M</span>
              <span className="text-slate-500">⏱ {t.timeCost}s</span>
            </div>
            {t.completed && <div className="absolute inset-0 bg-emerald-500/5 flex items-center justify-center font-bold text-[10px] text-emerald-400 select-none">DONE ✓</div>}
          </button>
        ))}
      </div>
      <p className="text-center text-[10px] text-slate-500">Complete tasks to restore Earth's health. Funds grow automatically. Neutralize disasters!</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 7 — ENERGY SAVER SIMULATOR
   ══════════════════════════════════════════════════════ */
interface Appliance {
  id: number;
  name: string;
  wattage: number;
  comfort: number; // how much comfort it gives
  isOn: boolean;
  icon: string;
}

function EnergySaverSimulator({ onComplete }: GameProps) {
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: 1, name: "Air Conditioner", wattage: 500, comfort: 15, isOn: true, icon: "❄️" },
    { id: 2, name: "Space Heater", wattage: 600, comfort: 15, isOn: true, icon: "🔥" },
    { id: 3, name: "Electric Boiler", wattage: 400, comfort: 10, isOn: true, icon: "🚰" },
    { id: 4, name: "Clothes Dryer", wattage: 350, comfort: 10, isOn: false, icon: "👕" },
    { id: 5, name: "Oven / Cooker", wattage: 300, comfort: 12, isOn: false, icon: "🍳" },
    { id: 6, name: "Living Room TV", wattage: 100, comfort: 10, isOn: true, icon: "📺" },
    { id: 7, name: "Incandescent Lights", wattage: 80, comfort: 5, isOn: true, icon: "💡" },
    { id: 8, name: "Fast Laptop Charger", wattage: 60, comfort: 8, isOn: true, icon: "🔌" },
  ]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [energyLimitExceeded, setEnergyLimitExceeded] = useState(0); // seconds exceeding limit
  const [done, setDone] = useState(false);

  const onRef = useRef(onComplete); useEffect(() => { onRef.current = onComplete; });

  const totalWattage = appliances.reduce((sum, a) => sum + (a.isOn ? a.wattage : 0), 0);
  const totalComfort = appliances.reduce((sum, a) => sum + (a.isOn ? a.comfort : 0), 0);
  const comfortTarget = 40; // Must stay above 40% comfort
  const energyTarget = 1200; // Must stay below 1200W usage

  // Simulation tick loop
  useEffect(() => {
    if (done) return;
    if (timeLeft === 0) {
      setDone(true);
      const won = energyLimitExceeded <= 4; // Allowed to exceed for at most 4 seconds
      onRef.current({
        won,
        xpEarned: won ? 150 : 35,
        scoreText: `Usage: ${totalWattage}W`,
        message: won 
          ? "Excellent electricity auditing! Power bill minimized, planet saved. 🔌" 
          : "Grid overloaded. Blackouts triggered or family comfort fell to zero.",
        badge: "Watt Watcher",
        celebStyle: "EnergyPulse"
      });
      return;
    }

    const t = setTimeout(() => {
      setTimeLeft(p => p - 1);
      if (totalWattage > energyTarget || totalComfort < comfortTarget) {
        setEnergyLimitExceeded(e => e + 1);
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, totalWattage, totalComfort, energyLimitExceeded]);

  const toggleAppliance = (id: number) => {
    setAppliances(prev => prev.map(a => a.id === id ? { ...a, isOn: !a.isOn } : a));
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span className="font-bold flex items-center gap-1 text-slate-400"><Clock className="w-3.5 h-3.5" />{timeLeft}s</span>
        <span className={`font-black text-sm px-2 py-0.5 rounded ${totalWattage <= energyTarget ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}>
          ⚡ Power: {totalWattage}W / {energyTarget}W
        </span>
        <span className={`font-black text-sm px-2 py-0.5 rounded ${totalComfort >= comfortTarget ? "text-blue-400 bg-blue-500/10" : "text-red-400 bg-red-500/10"}`}>
          ❤️ Comfort: {totalComfort}%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {appliances.map(a => (
          <button
            key={a.id}
            onClick={() => toggleAppliance(a.id)}
            className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex justify-between items-center relative overflow-hidden ${
              a.isOn ? "border-amber-500 bg-amber-500/10 text-white" : "border-white/5 bg-slate-900/40 text-slate-500"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{a.icon}</span>
              <div className="flex flex-col">
                <span className="font-bold text-[10px] leading-tight">{a.name}</span>
                <span className="text-[8px] opacity-70 font-mono">{a.wattage}W · {a.comfort}% comfort</span>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${a.isOn ? "bg-amber-400 animate-pulse" : "bg-slate-700"}`} />
          </button>
        ))}
      </div>

      <div className="text-center text-[10px] text-slate-500">
        Keep total power under {energyTarget}W and comfort above {comfortTarget}%! Warning count (limit exceeded): {energyLimitExceeded}s
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 8 — WATER GUARDIAN
   ══════════════════════════════════════════════════════ */
interface Leak {
  id: number;
  x: number;
  y: number;
  size: number;
  severity: number; // Liters lost per second
}

function WaterGuardian({ onComplete }: GameProps) {
  const [leaks, setLeaks] = useState<Leak[]>([]);
  const [waterLost, setWaterLost] = useState(0); // Liters
  const [timeLeft, setTimeLeft] = useState(30);
  const [done, setDone] = useState(false);
  
  const scoreRef = useRef(0);
  const lostRef = useRef(0);
  const onRef = useRef(onComplete); useEffect(() => { onRef.current = onComplete; });

  // Game timer loop
  useEffect(() => {
    if (done) return;
    if (timeLeft === 0) {
      setDone(true);
      const won = lostRef.current < 50;
      onRef.current({
        won,
        xpEarned: won ? 150 : 40,
        scoreText: `${Math.round(lostRef.current)}L lost`,
        message: won ? "You protected our precious aquifers! Water guardian badge earned. 🚰" : "Drought crisis! Over 50L of fresh water wasted.",
        badge: "Water Guardian",
        celebStyle: "OceanWaves"
      });
      return;
    }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done]);

  // Water lost calculation tick
  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      setLeaks(prev => {
        let loss = 0;
        prev.forEach(l => { loss += l.severity * 0.1; });
        lostRef.current = Math.round((lostRef.current + loss) * 10) / 10;
        setWaterLost(lostRef.current);
        if (lostRef.current >= 50) {
          setDone(true);
          setTimeout(() => {
            onRef.current({ won: false, xpEarned: 30, scoreText: `${lostRef.current}L lost`, message: "Too much leakage! Water supply drained." });
          }, 50);
        }
        return prev;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [done]);

  // Leak spawner
  useEffect(() => {
    if (done) return;
    let leakId = 0;
    const interval = setInterval(() => {
      setLeaks(prev => {
        if (prev.length >= 6) return prev;
        return [
          ...prev,
          {
            id: ++leakId,
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80,
            size: 28 + Math.random() * 18,
            severity: 1.5 + Math.random() * 2.5
          }
        ];
      });
    }, 900);
    return () => clearInterval(interval);
  }, [done]);

  const tapLeak = (id: number) => {
    setLeaks(prev => prev.filter(l => l.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-sm">
        <span className={`font-mono font-bold text-sm px-2 py-0.5 rounded ${waterLost < 50 ? "text-blue-400 bg-blue-500/10" : "text-red-400 bg-red-500/10"}`}>
          💧 Water Lost: {waterLost} L / 50 L
        </span>
        <span className="flex items-center gap-1 text-amber-400 font-bold"><Clock className="w-3.5 h-3.5" />{timeLeft}s</span>
      </div>
      <TimerBar timeLeft={timeLeft} maxTime={30} />

      <div className="relative flex-1 min-h-[220px] rounded-2xl bg-blue-950/20 border border-blue-500/10 overflow-hidden">
        {/* Animated pipe background */}
        <div className="absolute top-1/2 left-0 right-0 h-10 bg-slate-800 border-y-2 border-slate-700 flex items-center justify-around overflow-hidden -translate-y-1/2">
          <div className="w-full h-2 bg-cyan-500/40 animate-pulse" />
        </div>

        {leaks.map(l => (
          <motion.button
            key={l.id}
            onClick={() => tapLeak(l.id)}
            className="absolute rounded-full bg-cyan-400/30 border border-cyan-400/80 flex items-center justify-center cursor-pointer select-none active:scale-95"
            style={{ left: `${l.x}%`, top: `${l.y}%`, width: l.size, height: l.size }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
          >
            <span className="text-base select-none">💦</span>
          </motion.button>
        ))}

        {leaks.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xs pointer-events-none">
            No leaks detected. Keep watch!
          </div>
        )}
      </div>

      <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
        Tap the leaking water drops before we waste 50 Liters!
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 9 — CARBON FOOTPRINT PUZZLE
   ══════════════════════════════════════════════════════ */
interface PuzzleCard {
  id: number;
  activity: string;
  icon: string;
  category: "Low" | "Medium" | "High" | "EcoPositive";
  desc: string;
}

const PUZZLE_CARDS: PuzzleCard[] = [
  { id: 1, activity: "Planting a Pine Tree", icon: "🌲", category: "EcoPositive", desc: "Absorbs ~22kg of CO2 per year." },
  { id: 2, activity: "Solo commute in SUV for 10 miles", icon: "🚗", category: "Medium", desc: "Produces ~4.5kg of carbon emissions." },
  { id: 3, activity: "Transatlantic 8h Flight", icon: "✈️", category: "High", desc: "Produces ~800kg of greenhouse gases." },
  { id: 4, activity: "Replacing all bulbs with LEDs", icon: "💡", category: "EcoPositive", desc: "Saves ~150W of power consumption." },
  { id: 5, activity: "Tofu stir-fry dinner", icon: "🥗", category: "Low", desc: "Has ~0.2kg carbon footprint." },
  { id: 6, activity: "Leaving air conditioning on all day", icon: "❄️", category: "High", desc: "Consumes 12kWh of fossil-fuel grid power." },
  { id: 7, activity: "Commuting by electric train", icon: "🚊", category: "Low", desc: "Averages 0.15kg emissions per user." },
  { id: 8, activity: "Beef Ribeye Steak Dinner", icon: "🥩", category: "High", desc: "Generates ~12kg of CO2 footprint." }
];

function CarbonFootprintPuzzle({ onComplete }: GameProps) {
  const [shuffledCards] = useState(() => [...PUZZLE_CARDS].sort(() => Math.random() - 0.5));
  const [currCardIdx, setCurrCardIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onRef = useRef(onComplete); useEffect(() => { onRef.current = onComplete; });

  const classifyCard = (category: "Low" | "Medium" | "High" | "EcoPositive") => {
    if (done || selectedCat) return;
    
    const correct = shuffledCards[currCardIdx].category === category;
    const nextScore = correct ? score + 1 : score;
    setSelectedCat(category);

    setTimeout(() => {
      setSelectedCat(null);
      if (currCardIdx < shuffledCards.length - 1) {
        setCurrCardIdx(c => c + 1);
        setScore(nextScore);
      } else {
        setDone(true);
        const won = nextScore >= 6;
        onRef.current({
          won,
          xpEarned: won ? 200 : 50,
          scoreText: `${nextScore}/8 correct`,
          message: won ? "You have a great sense of carbon emissions scale! Carbon auditor card unlocked. 🧩" : "Re-read the carbon scales! Target: 6+ correct.",
          badge: "Carbon Auditor",
          celebStyle: "FloatingLeaves"
        });
      }
    }, 700);
  };

  const curr = shuffledCards[currCardIdx];

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>Activity {currCardIdx + 1} / 8</span>
        <span className="text-emerald-400 font-bold">Correct: {score}</span>
      </div>

      <motion.div key={currCardIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        className="flex flex-col items-center justify-center p-6 border border-white/10 rounded-2xl bg-slate-900/60 min-h-[130px] text-center">
        <span className="text-4xl mb-2">{curr.icon}</span>
        <h4 className="text-white font-bold text-sm leading-tight mb-1">{curr.activity}</h4>
        {selectedCat && (
          <p className="text-[10px] text-slate-400 italic mt-1.5">{curr.desc}</p>
        )}
      </motion.div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <button
          onClick={() => classifyCard("EcoPositive")}
          className={`py-3.5 rounded-xl border font-bold cursor-pointer transition-all flex flex-col items-center gap-1 ${
            selectedCat === "EcoPositive" 
              ? (curr.category === "EcoPositive" ? "border-emerald-500 bg-emerald-500/25 text-emerald-300" : "border-red-500 bg-red-500/25 text-red-300")
              : "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-300"
          }`}
        >
          <span>💚 Eco Positive</span>
          <span className="text-[8px] opacity-75">Saves / Absorbs CO2</span>
        </button>

        <button
          onClick={() => classifyCard("Low")}
          className={`py-3.5 rounded-xl border font-bold cursor-pointer transition-all flex flex-col items-center gap-1 ${
            selectedCat === "Low" 
              ? (curr.category === "Low" ? "border-green-500 bg-green-500/25 text-green-300" : "border-red-500 bg-red-500/25 text-red-300")
              : "border-green-500/20 bg-green-500/5 hover:bg-green-500/15 text-green-300"
          }`}
        >
          <span>🌱 Low Carbon</span>
          <span className="text-[8px] opacity-75">&lt; 1 kg CO2</span>
        </button>

        <button
          onClick={() => classifyCard("Medium")}
          className={`py-3.5 rounded-xl border font-bold cursor-pointer transition-all flex flex-col items-center gap-1 ${
            selectedCat === "Medium" 
              ? (curr.category === "Medium" ? "border-amber-500 bg-amber-500/25 text-amber-300" : "border-red-500 bg-red-500/25 text-red-300")
              : "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/15 text-amber-300"
          }`}
        >
          <span>🚗 Medium Carbon</span>
          <span className="text-[8px] opacity-75">1 - 10 kg CO2</span>
        </button>

        <button
          onClick={() => classifyCard("High")}
          className={`py-3.5 rounded-xl border font-bold cursor-pointer transition-all flex flex-col items-center gap-1 ${
            selectedCat === "High" 
              ? (curr.category === "High" ? "border-rose-500 bg-rose-500/25 text-rose-300" : "border-red-500 bg-red-500/25 text-red-300")
              : "border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/15 text-rose-300"
          }`}
        >
          <span>🏭 High Carbon</span>
          <span className="text-[8px] opacity-75">&gt; 10 kg CO2</span>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 10 — GREEN TRANSPORT
   ══════════════════════════════════════════════════════ */
const TRANSPORT_SCENARIOS = [
  {
    trip: "1. Cross-Country Trip (500 miles)",
    opts: [
      { text: "Solo Driver Gasoline Car (35mpg)", co2: "128 kg CO2", correct: false },
      { text: "Commercial Jet Flight", co2: "185 kg CO2", correct: false },
      { text: "Electric Train Commute", co2: "12 kg CO2", correct: true }
    ]
  },
  {
    trip: "2. Daily Commute to Work (15 miles)",
    opts: [
      { text: "Solo Driving EV", co2: "2.1 kg CO2", correct: false },
      { text: "Electric Bicycle / Walking", co2: "0.0 kg CO2", correct: true },
      { text: "Hybrid Bus Commute", co2: "1.2 kg CO2", correct: false }
    ]
  },
  {
    trip: "3. Weekend Getaway (120 miles)",
    opts: [
      { text: "Electric Train Tour", co2: "4.5 kg CO2", correct: true },
      { text: "Standard Gas Sedan Drive", co2: "32 kg CO2", correct: false },
      { text: "EV Rideshare Pool", co2: "7.8 kg CO2", correct: false }
    ]
  },
  {
    trip: "4. Package Delivery Route (30 parcels)",
    opts: [
      { text: "Diesel Delivery Van", co2: "18.5 kg CO2", correct: false },
      { text: "Electric Cargo Bike fleet", co2: "0.2 kg CO2", correct: true },
      { text: "Standard Petrol SUV Courier", co2: "14.0 kg CO2", correct: false }
    ]
  },
  {
    trip: "5. Kids School Run (4 miles total)",
    opts: [
      { text: "School Walking Bus / walking together", co2: "0.0 kg CO2", correct: true },
      { text: "Gas SUV idling in pickup lane", co2: "1.8 kg CO2", correct: false },
      { text: "Electric SUV drop off", co2: "0.6 kg CO2", correct: false }
    ]
  }
];

function GreenTransport({ onComplete }: GameProps) {
  const [shuffledScenarios] = useState(() => {
    return [...TRANSPORT_SCENARIOS]
      .sort(() => Math.random() - 0.5)
      .map(s => {
        return {
          ...s,
          opts: [...s.opts].sort(() => Math.random() - 0.5)
        };
      });
  });
  const [currRound, setCurrRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const onRef = useRef(onComplete); useEffect(() => { onRef.current = onComplete; });

  const chooseTransport = (optIdx: number) => {
    if (done || selectedOpt !== null) return;
    setSelectedOpt(optIdx);

    const isCorrect = shuffledScenarios[currRound].opts[optIdx].correct;
    const nextScore = isCorrect ? score + 1 : score;

    setTimeout(() => {
      setSelectedOpt(null);
      if (currRound < shuffledScenarios.length - 1) {
        setCurrRound(currRound + 1);
        setScore(nextScore);
      } else {
        setDone(true);
        const won = nextScore >= 4;
        onRef.current({
          won,
          xpEarned: won ? 100 : 30,
          scoreText: `${nextScore}/5 correct`,
          message: won ? "Transit options optimized correctly! You slayed carbon emissions. 🚲" : "Try prioritizing electric/active transport next time.",
          badge: "Transit Pro",
          celebStyle: "FloatingLeaves"
        });
      }
    }, 800);
  };

  const curr = shuffledScenarios[currRound];

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>Scenario {currRound + 1} / 5</span>
        <span className="text-emerald-400 font-bold">Correct: {score}</span>
      </div>

      <div className="text-center py-2 border-b border-white/5">
        <h4 className="text-white font-bold text-sm leading-tight">{curr.trip}</h4>
        <p className="text-[10px] text-slate-500 mt-1">Pick the option with the lowest environmental carbon impact!</p>
      </div>

      <div className="flex flex-col gap-2.5">
        {curr.opts.map((opt, i) => {
          let buttonClass = "border-white/5 bg-slate-900/50 hover:bg-slate-800/80 hover:border-violet-500/20 text-slate-200";
          if (selectedOpt !== null) {
            if (opt.correct) {
              buttonClass = "border-emerald-500 bg-emerald-500/10 text-emerald-300";
            } else if (i === selectedOpt) {
              buttonClass = "border-red-500 bg-red-500/10 text-red-300";
            } else {
              buttonClass = "border-white/2 bg-slate-900/10 text-slate-600";
            }
          }
          return (
            <button
              key={i}
              onClick={() => chooseTransport(i)}
              className={`p-3 rounded-xl border text-xs text-left cursor-pointer transition-all flex justify-between items-center ${buttonClass}`}
            >
              <span className="font-semibold">{opt.text}</span>
              {selectedOpt !== null && (
                <span className="font-mono text-[9px] font-bold">{opt.co2}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 11 — SUSTAINABLE SHOPPING
   ══════════════════════════════════════════════════════ */
const SHOPPING_DECISIONS = [
  {
    desc: "1. Grocery Bag Selection",
    opt1: { name: "Single-use Plastic Bag", stats: "Water: 0.1L | CO2: 30g | Waste: Non-biodegradable", correct: false, comment: "Requires petroleum and never decays." },
    opt2: { name: "Reusable Canvas Tote (Used 200+ times)", stats: "Water: 2L | CO2: 8g (per use) | Waste: Recyclable", correct: true, comment: "Amortized carbon footprint over many uses is lowest." }
  },
  {
    desc: "2. Diner protein options",
    opt1: { name: "Grain-fed Beef Burger Pattie", stats: "Water: 1500L | CO2: 7.2kg | Waste: high methane", correct: false, comment: "Livestock takes extreme land and water resources." },
    opt2: { name: "Local Organic Soy Tofu Burger", stats: "Water: 80L | CO2: 0.3kg | Waste: Minimal packaging", correct: true, comment: "Very low carbon and water footprint." }
  },
  {
    desc: "3. Apple Shopping",
    opt1: { name: "Organic Apple imported from Chile", stats: "Water: 10L | CO2: 180g (Flight) | Waste: wrapped", correct: false, comment: "Transport emissions degrade organic benefits." },
    opt2: { name: "Non-organic Apple from local orchard", stats: "Water: 8L | CO2: 15g (Local truck) | Waste: Loose", correct: true, comment: "Local apples have extremely small transit footprints." }
  }
];

function SustainableShopping({ onComplete }: GameProps) {
  const [shuffledDecisions] = useState(() => {
    return [...SHOPPING_DECISIONS]
      .sort(() => Math.random() - 0.5)
      .map(d => {
        const swap = Math.random() < 0.5;
        return {
          ...d,
          options: swap ? [d.opt2, d.opt1] : [d.opt1, d.opt2]
        };
      });
  });
  const [currRound, setCurrRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const onRef = useRef(onComplete); useEffect(() => { onRef.current = onComplete; });

  const chooseOption = (optIdx: number) => {
    if (done || selectedOpt !== null) return;
    setSelectedOpt(optIdx);
    const roundData = shuffledDecisions[currRound];
    const isCorrect = roundData.options[optIdx].correct;
    const nextScore = isCorrect ? score + 1 : score;

    setTimeout(() => {
      setSelectedOpt(null);
      if (currRound < shuffledDecisions.length - 1) {
        setCurrRound(currRound + 1);
        setScore(nextScore);
      } else {
        setDone(true);
        const won = nextScore === 3;
        onRef.current({
          won,
          xpEarned: won ? 120 : 30,
          scoreText: `${nextScore}/3 correct`,
          message: won ? "Conscious shopper verified! You pick local, reusable products! 🛍️" : "Read the statistics. Local and reusable is better.",
          badge: "Conscious Consumer",
          celebStyle: "FloatingLeaves"
        });
      }
    }, 1200);
  };

  const curr = shuffledDecisions[currRound];

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>Decision {currRound + 1} / 3</span>
        <span className="text-emerald-400 font-bold">Correct: {score}</span>
      </div>

      <div className="text-center py-1">
        <h4 className="text-white font-bold text-sm leading-tight">{curr.desc}</h4>
        <p className="text-[10px] text-slate-500 mt-1">Pick the item with the lower overall eco impact!</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {curr.options.map((opt, idx) => {
          let containerClass = "border-white/5 bg-slate-900/50 hover:bg-slate-800/80 hover:border-violet-500/20";
          if (selectedOpt !== null) {
            if (opt.correct) {
              containerClass = "border-emerald-500 bg-emerald-500/10 text-emerald-300";
            } else if (idx === selectedOpt) {
              containerClass = "border-red-500 bg-red-500/10 text-red-300";
            } else {
              containerClass = "border-white/2 bg-slate-900/10 text-slate-600";
            }
          }
          return (
            <button
              key={idx}
              onClick={() => chooseOption(idx)}
              className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between h-[155px] ${containerClass}`}
            >
              <div className="text-white font-bold text-xs leading-snug">{opt.name}</div>
              <div className="text-[8px] text-slate-400 mt-2 font-mono leading-relaxed">{opt.stats}</div>
              {selectedOpt !== null && (
                <div className="text-[8px] text-slate-500 italic mt-2 leading-tight border-t border-white/5 pt-1">
                  {opt.comment}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 12 — FOOD FOOTPRINT CHALLENGE
   ══════════════════════════════════════════════════════ */
interface FoodItem {
  id: number;
  name: string;
  co2: number; // kg CO2
  icon: string;
}

const FOOD_MEALS = {
  breakfast: [
    { id: 101, name: "Bacon & Eggs", co2: 2.2, icon: "🥓" },
    { id: 102, name: "Avocado Toast", co2: 0.6, icon: "🥑" },
    { id: 103, name: "Oatmeal with Almonds", co2: 0.2, icon: "🥣" }
  ],
  lunch: [
    { id: 201, name: "Ribeye Beef Burger", co2: 7.5, icon: "🍔" },
    { id: 202, name: "Grilled Chicken Salad", co2: 1.8, icon: "🥗" },
    { id: 203, name: "Lentil Vegetable Soup", co2: 0.4, icon: "🍲" }
  ],
  dinner: [
    { id: 301, name: "Steak & Baked Potato", co2: 12.0, icon: "🥩" },
    { id: 302, name: "Salmon with Brown Rice", co2: 2.8, icon: "🍣" },
    { id: 303, name: "Tofu Vegetable Stir Fry", co2: 0.5, icon: "🍱" }
  ]
};

function FoodFootprintChallenge({ onComplete }: GameProps) {
  const [breakfast, setBreakfast] = useState<FoodItem | null>(null);
  const [lunch, setLunch] = useState<FoodItem | null>(null);
  const [dinner, setDinner] = useState<FoodItem | null>(null);
  const [done, setDone] = useState(false);

  const totalCO2 = Math.round(((breakfast?.co2 || 0) + (lunch?.co2 || 0) + (dinner?.co2 || 0)) * 10) / 10;
  const limit = 3.5;

  const handleSubmit = () => {
    if (!breakfast || !lunch || !dinner) return;
    setDone(true);
    const won = totalCO2 <= limit;
    onComplete({
      won,
      xpEarned: won ? 180 : 45,
      scoreText: `${totalCO2}kg CO2`,
      message: won 
        ? "Delicious and sustainable! You planned a full day's menu with minimal emissions! 🥗" 
        : `Footprint exceeded ${limit}kg. Livestock meat generates too much greenhouse gas.`,
      badge: "Eco Chef",
      celebStyle: "ForestBurst"
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400">Total day carbon footprint:</span>
        <span className={`font-mono font-bold text-sm px-2 py-0.5 rounded ${totalCO2 <= limit ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}>
          🥗 {totalCO2} kg / {limit} kg CO₂
        </span>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-[260px] pr-1">
        {/* Breakfast */}
        <div>
          <h4 className="text-white text-xs font-bold mb-1.5 uppercase tracking-wide">🍳 Breakfast</h4>
          <div className="grid grid-cols-3 gap-1.5">
            {FOOD_MEALS.breakfast.map(f => (
              <button
                key={f.id}
                onClick={() => setBreakfast(f)}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                  breakfast?.id === f.id ? "border-emerald-500 bg-emerald-500/20 text-white" : "border-white/5 bg-slate-900/50 text-slate-400"
                }`}
              >
                <span className="text-xl">{f.icon}</span>
                <span className="text-[8px] font-bold leading-tight truncate w-full">{f.name}</span>
                <span className="text-[7px] opacity-75">{f.co2}kg</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lunch */}
        <div>
          <h4 className="text-white text-xs font-bold mb-1.5 uppercase tracking-wide">🥗 Lunch</h4>
          <div className="grid grid-cols-3 gap-1.5">
            {FOOD_MEALS.lunch.map(f => (
              <button
                key={f.id}
                onClick={() => setLunch(f)}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                  lunch?.id === f.id ? "border-emerald-500 bg-emerald-500/20 text-white" : "border-white/5 bg-slate-900/50 text-slate-400"
                }`}
              >
                <span className="text-xl">{f.icon}</span>
                <span className="text-[8px] font-bold leading-tight truncate w-full">{f.name}</span>
                <span className="text-[7px] opacity-75">{f.co2}kg</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dinner */}
        <div>
          <h4 className="text-white text-xs font-bold mb-1.5 uppercase tracking-wide">🥩 Dinner</h4>
          <div className="grid grid-cols-3 gap-1.5">
            {FOOD_MEALS.dinner.map(f => (
              <button
                key={f.id}
                onClick={() => setDinner(f)}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                  dinner?.id === f.id ? "border-emerald-500 bg-emerald-500/20 text-white" : "border-white/5 bg-slate-900/50 text-slate-400"
                }`}
              >
                <span className="text-xl">{f.icon}</span>
                <span className="text-[8px] font-bold leading-tight truncate w-full">{f.name}</span>
                <span className="text-[7px] opacity-75">{f.co2}kg</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        disabled={!breakfast || !lunch || !dinner || done}
        onClick={handleSubmit}
        className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Submit Meal Plan 🍽️
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 13 — CLIMATE QUIZ ARENA
   ══════════════════════════════════════════════════════ */
const ARENA_QUIZ_QUESTIONS = [
  // Beginner Level (1-4)
  { level: 1, q: "Which gas represents the largest share of global human greenhouse emissions?", opts: ["Carbon Dioxide (CO2)", "Methane", "Water Vapor", "Argon"], ans: 0 },
  { level: 1, q: "Which energy generator relies on 100% renewable resources?", opts: ["Natural Gas Combined Cycle", "Nuclear Fission", "Solar Photovoltaic", "Petroleum Generator"], ans: 2 },
  { level: 1, q: "What is the primary objective of waste recycling?", opts: ["Burn waste efficiently", "Re-process materials into new goods", "Clean ocean harbors", "Landfill space expansions"], ans: 1 },
  { level: 1, q: "Which habit generally yields the lowest individual carbon footprint?", opts: ["Driving a hybrid SUV alone", "Eating steak regularly", "Taking transit and eating plant-based", "Flying instead of driving train"], ans: 2 },

  // Intermediate Level (5-8)
  { level: 2, q: "What was the core target warming limit of the UN Paris Agreement?", opts: ["Below 1.0°C", "Preferably below 1.5°C", "Below 2.5°C", "Zero temperature rise"], ans: 1 },
  { level: 2, q: "Which ecosystem absorbs and stores the most carbon per acre (blue carbon)?", opts: ["Grassland Prairies", "Mangrove Forests & Salt Marshes", "Temperate Pine Forests", "Desert Shrublands"], ans: 1 },
  { level: 2, q: "What does the term 'Circular Economy' mean?", opts: ["Recycling paper exclusively", "Eliminating waste by designing products to be reused", "Buying goods on credit", "Global trade agreements"], ans: 1 },
  { level: 2, q: "How much carbon dioxide does a single mature tree absorb per year on average?", opts: ["About 5 kg", "About 22 kg", "About 150 kg", "Over 1000 kg"], ans: 1 },

  // Expert Level (9-12)
  { level: 3, q: "What is the warming feedback loop when polar ice sheets melt?", opts: ["Albedo drops: ocean absorbs more solar heat", "Albedo rises: reflection increases", "Methane is absorbed by ice sheets", "Salinity rises cooling polar streams"], ans: 0 },
  { level: 3, q: "Which economic policy charges fossil fuel users based on their greenhouse output?", opts: ["Subsidization", "Carbon Tax / Cap and Trade", "Utility Deregulation", "Fossil Tariff Caps"], ans: 1 },
  { level: 3, q: "What proportion of global food production is wasted or lost along the supply chain?", opts: ["Roughly 5%", "Roughly 12%", "Roughly 33%", "Over 60%"], ans: 2 },
  { level: 3, q: "What atmospheric concentration of CO2 did we exceed in recent years?", opts: ["280 ppm", "350 ppm", "420 ppm", "600 ppm"], ans: 2 }
];

function ClimateQuizArena({ onComplete }: GameProps) {
  const [shuffledQuestions] = useState(() => {
    return [...ARENA_QUIZ_QUESTIONS]
      .sort(() => Math.random() - 0.5)
      .map(q => {
        const originalCorrectOpt = q.opts[q.ans];
        const shuffledOpts = [...q.opts].sort(() => Math.random() - 0.5);
        const newAns = shuffledOpts.indexOf(originalCorrectOpt);
        return {
          ...q,
          opts: shuffledOpts,
          ans: newAns
        };
      });
  });
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(90);
  const [done, setDone] = useState(false);

  const scoreRef = useRef(0);
  const onRef = useRef(onComplete); useEffect(() => { onRef.current = onComplete; });

  const finish = useCallback((s: number) => {
    if (done) return; setDone(true);
    const won = s >= 9;
    onRef.current({
      won,
      xpEarned: won ? 250 : 60,
      scoreText: `${s}/12 correct`,
      message: won ? "Incredible climate expertise! Scholar level confirmed. 🧠" : "We need 9+ correct to pass. Review and try again!",
      badge: "Climate Scholar",
      celebStyle: "FloatingLeaves"
    });
  }, [done]);

  useEffect(() => {
    if (done) return;
    if (timeLeft === 0) { finish(scoreRef.current); return; }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, finish]);

  const selectAnswer = (ansIdx: number) => {
    if (selectedOpt !== null || done) return;
    setSelectedOpt(ansIdx);

    const isCorrect = shuffledQuestions[idx].ans === ansIdx;
    const nextScore = isCorrect ? score + 1 : score;
    if (isCorrect) { scoreRef.current = nextScore; setScore(nextScore); }

    setTimeout(() => {
      setSelectedOpt(null);
      if (idx < shuffledQuestions.length - 1) {
        setIdx(i => i + 1);
      } else {
        finish(nextScore);
      }
    }, 950);
  };

  const curr = shuffledQuestions[idx];

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span className="font-bold uppercase tracking-wider text-violet-400">
          Level {curr.level === 1 ? "Beginner" : curr.level === 2 ? "Intermediate" : "Expert"}
        </span>
        <span className="flex items-center gap-1 text-amber-400 font-bold"><Clock className="w-3.5 h-3.5" />{timeLeft}s</span>
        <span className="text-emerald-400 font-bold">Score: {score} / 12</span>
      </div>
      <TimerBar timeLeft={timeLeft} maxTime={90} />

      <motion.p key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="text-slate-100 font-semibold text-center text-sm md:text-base leading-relaxed py-4 min-h-[90px] flex items-center justify-center">
        {curr.q}
      </motion.p>

      <div className="grid grid-cols-1 gap-2 text-xs md:text-sm">
        {curr.opts.map((opt, i) => {
          let btnClass = "border-white/5 bg-slate-900/50 hover:bg-slate-800/80 hover:border-violet-500/20 text-slate-200";
          if (selectedOpt !== null) {
            if (i === curr.ans) {
              btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-300";
            } else if (i === selectedOpt) {
              btnClass = "border-red-500 bg-red-500/10 text-red-300";
            } else {
              btnClass = "border-white/2 bg-slate-900/10 text-slate-600";
            }
          }
          return (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${btnClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 14 — FOREST RESTORATION
   ══════════════════════════════════════════════════════ */
interface ForestCell {
  id: number;
  planted: "empty" | "tree" | "flower" | "shrub";
  pestActive: boolean;
}

function ForestRestoration({ onComplete }: GameProps) {
  const [grid, setGrid] = useState<ForestCell[]>(() => 
    Array.from({ length: 25 }).map((_, i) => ({ id: i, planted: "empty", pestActive: false }))
  );
  const [selectedSeed, setSelectedSeed] = useState<"tree" | "flower" | "shrub">("tree");
  const [pestWarning, setPestWarning] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const [done, setDone] = useState(false);

  const onRef = useRef(onComplete); useEffect(() => { onRef.current = onComplete; });

  // Game timer loop
  useEffect(() => {
    if (done) return;
    if (timeLeft === 0) {
      setDone(true);
      const plantCount = grid.filter(c => c.planted !== "empty" && !c.pestActive).length;
      const won = plantCount >= 15;
      onRef.current({
        won,
        xpEarned: won ? 200 : 40,
        scoreText: `${plantCount} plants`,
        message: won ? "Forest ecosystem restored and pests defeated! 🌳🦊" : "Fewer than 15 healthy plants remain. Pest infection spread.",
        badge: "Forest Guardian",
        celebStyle: "ForestBurst"
      });
      return;
    }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, grid]);

  // Pest infestation spawner
  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      // Find a random cell with a plant but no active pest
      const eligibleIds = grid.filter(c => c.planted !== "empty" && !c.pestActive).map(c => c.id);
      if (eligibleIds.length === 0) return;

      const pestTargetId = eligibleIds[Math.floor(Math.random() * eligibleIds.length)];
      setGrid(prev => prev.map(c => c.id === pestTargetId ? { ...c, pestActive: true } : c));
      setPestWarning("⚠️ PEST INVASION DETECTED! Clear it quickly!");
      setTimeout(() => setPestWarning(null), 2500);
    }, 4500);

    return () => clearInterval(interval);
  }, [done, grid]);

  // Pest plant-killer tick (eats plant if left untreated for 4 seconds)
  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      setGrid(prev => prev.map(c => {
        if (c.pestActive) {
          // 25% chance pest eats the plant in this tick
          if (Math.random() < 0.25) {
            return { ...c, planted: "empty" as const, pestActive: false };
          }
        }
        return c;
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [done]);

  const interactCell = (cellId: number) => {
    const cell = grid[cellId];
    if (cell.pestActive) {
      // Remove pest
      setGrid(prev => prev.map(c => c.id === cellId ? { ...c, pestActive: false } : c));
      return;
    }

    if (cell.planted !== "empty") return; // Spot filled
    // Plant selected seed
    setGrid(prev => prev.map(c => c.id === cellId ? { ...c, planted: selectedSeed } : c));
  };

  const getCellLabel = (c: ForestCell) => {
    if (c.pestActive) return "🐛";
    if (c.planted === "empty") return "🟫";
    if (c.planted === "tree") return "🌳";
    if (c.planted === "flower") return "🌸";
    return "🌿";
  };

  const healthyCount = grid.filter(c => c.planted !== "empty" && !c.pestActive).length;

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span className="font-bold text-emerald-400">🌱 Healthy: {healthyCount} / 15</span>
        <span className="flex items-center gap-1 text-amber-400 font-bold"><Clock className="w-3.5 h-3.5" />{timeLeft}s</span>
      </div>
      <TimerBar timeLeft={timeLeft} maxTime={45} />

      <AnimatePresence>
        {pestWarning && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] text-center font-bold">
            {pestWarning}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-5 gap-1.5 aspect-square max-w-[250px] mx-auto w-full">
        {grid.map(c => (
          <button
            key={c.id}
            onClick={() => interactCell(c.id)}
            className={`rounded-lg flex items-center justify-center text-2xl border transition-all cursor-pointer aspect-square ${
              c.pestActive ? "bg-red-500/15 border-red-500/50 animate-pulse" :
              c.planted === "empty" ? "bg-amber-950/10 border-white/5 hover:bg-emerald-500/5" : "bg-emerald-500/10 border-emerald-500/20"
            }`}
          >
            {getCellLabel(c)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <button
          onClick={() => setSelectedSeed("tree")}
          className={`py-2 rounded-lg border cursor-pointer transition-all ${
            selectedSeed === "tree" ? "border-emerald-500 bg-emerald-500/20" : "border-white/5 bg-white/2"
          }`}
        >
          🌳 Tree
        </button>
        <button
          onClick={() => setSelectedSeed("flower")}
          className={`py-2 rounded-lg border cursor-pointer transition-all ${
            selectedSeed === "flower" ? "border-emerald-500 bg-emerald-500/20" : "border-white/5 bg-white/2"
          }`}
        >
          🌸 Flower
        </button>
        <button
          onClick={() => setSelectedSeed("shrub")}
          className={`py-2 rounded-lg border cursor-pointer transition-all ${
            selectedSeed === "shrub" ? "border-emerald-500 bg-emerald-500/20" : "border-white/5 bg-white/2"
          }`}
        >
          🌿 Shrub
        </button>
      </div>

      <div className="text-center text-[9px] text-slate-500">
        Choose a seed, then click empty brown cells to plant. Tap 🐛 pests immediately before they destroy your plants! Target: 15+ plants.
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 15 — OCEAN CLEANUP MISSION
   ══════════════════════════════════════════════════════ */
interface MarineItem {
  id: number;
  x: number;
  y: number;
  type: "bottle" | "bag" | "net" | "fish" | "turtle";
  size: number;
}

function OceanCleanupMission({ onComplete }: GameProps) {
  const [items, setItems] = useState<MarineItem[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [done, setDone] = useState(false);

  const scoreRef = useRef(0);
  const onRef = useRef(onComplete); useEffect(() => { onRef.current = onComplete; });

  // Game timer
  useEffect(() => {
    if (done) return;
    if (timeLeft === 0) {
      setDone(true);
      const won = scoreRef.current >= 15;
      onRef.current({
        won,
        xpEarned: won ? 150 : 35,
        scoreText: `${scoreRef.current} trash cleaned`,
        message: won ? "Strait is pristine again! Ocean life thanks you. 🌊🐢" : "Ocean still heavily littered. Aim for 15+ cleaned!",
        badge: "Ocean Protector",
        celebStyle: "OceanWaves"
      });
      return;
    }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done]);

  // Item spawner loop
  useEffect(() => {
    if (done) return;
    let itemId = 0;
    const interval = setInterval(() => {
      setItems(prev => {
        // Clear items that are too numerous
        const filtered = prev.slice(-12);
        const rand = Math.random();
        let type: "bottle" | "bag" | "net" | "fish" | "turtle" = "bottle";
        if (rand < 0.2) type = "bag";
        else if (rand < 0.4) type = "net";
        else if (rand < 0.75) type = "fish";
        else if (rand < 0.9) type = "turtle";

        return [
          ...filtered,
          {
            id: ++itemId,
            x: 5 + Math.random() * 85,
            y: 10 + Math.random() * 75,
            type,
            size: 32 + Math.random() * 20
          }
        ];
      });
    }, 700);

    return () => clearInterval(interval);
  }, [done]);

  const cleanItem = (id: number, type: string) => {
    if (done) return;
    
    // Remove item
    setItems(prev => prev.filter(it => it.id !== id));

    const isTrash = type === "bottle" || type === "bag" || type === "net";
    let change = isTrash ? 1 : -2;
    scoreRef.current = Math.max(0, scoreRef.current + change);
    setScore(scoreRef.current);

    if (!isTrash) {
      // Penalty: deduct 2 seconds from timer for bothering marine life
      setTimeLeft(t => Math.max(1, t - 2));
    }
  };

  const getItemEmoji = (type: string) => {
    if (type === "bottle") return "🧴";
    if (type === "bag") return "🛍️";
    if (type === "net") return "🕸️";
    if (type === "fish") return "🐠";
    return "🐢";
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400">Clean up trash!</span>
        <span className="flex items-center gap-1 text-amber-400 font-bold"><Clock className="w-3.5 h-3.5" />{timeLeft}s</span>
        <span className="text-emerald-400 font-bold">🧹 cleaned: {score} / 15</span>
      </div>
      <TimerBar timeLeft={timeLeft} maxTime={25} />

      <div className="relative flex-1 min-h-[220px] rounded-2xl bg-sky-950/20 border border-sky-500/10 overflow-hidden">
        {items.map(it => (
          <motion.button
            key={it.id}
            onClick={() => cleanItem(it.id, it.type)}
            className="absolute rounded-full flex items-center justify-center cursor-pointer select-none active:scale-75"
            style={{ left: `${it.x}%`, top: `${it.y}%`, width: it.size, height: it.size }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
          >
            <span style={{ fontSize: it.size * 0.5 }}>{getItemEmoji(it.type)}</span>
          </motion.button>
        ))}
        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xs pointer-events-none">
            Trash appearing soon...
          </div>
        )}
      </div>

      <div className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
        Tap plastics 🧴🛍️🕸️! Avoid animals 🐠🐢 (-2 score, -2s)! Target: 15+ score.
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 16 — RENEWABLE ENERGY TYCOON
   ══════════════════════════════════════════════════════ */
interface EnergySource {
  id: number;
  name: string;
  cost: number; // Billions
  output: number; // MW
  clean: boolean;
  icon: string;
  count: number;
}

function RenewableEnergyTycoon({ onComplete }: GameProps) {
  const [sources, setSources] = useState<EnergySource[]>([
    { id: 1, name: "Solar Farm Block", cost: 12, output: 150, clean: true, icon: "☀️", count: 1 },
    { id: 2, name: "Wind Turbine Field", cost: 10, output: 120, clean: true, icon: "💨", count: 1 },
    { id: 3, name: "Geothermal Plant", cost: 20, output: 250, clean: true, icon: "🔥", count: 0 },
    { id: 4, name: "Hydroelectric Dam", cost: 30, output: 400, clean: true, icon: "🌊", count: 0 },
    { id: 5, name: "Coal Plant Boiler", cost: 15, output: 350, clean: false, icon: "🏭", count: 2 },
  ]);
  const [budget, setBudget] = useState(100); // $100 Billion
  const [done, setDone] = useState(false);

  const totalOutput = sources.reduce((sum, s) => sum + s.output * s.count, 0);
  const cleanOutput = sources.reduce((sum, s) => sum + (s.clean ? s.output * s.count : 0), 0);
  const cleanPercentage = totalOutput > 0 ? Math.round((cleanOutput / totalOutput) * 100) : 0;

  const buildSource = (id: number) => {
    if (done) return;
    const source = sources.find(s => s.id === id)!;
    if (budget < source.cost) return; // Insufficient funds

    setBudget(b => b - source.cost);
    setSources(prev => prev.map(s => s.id === id ? { ...s, count: s.count + 1 } : s));
  };

  const decommissionCoal = () => {
    if (done) return;
    const coal = sources.find(s => s.id === 5)!;
    if (coal.count <= 0) return;
    if (budget < 5) return; // Cost $5B to decommission safely

    setBudget(b => b - 5);
    setSources(prev => prev.map(s => s.id === 5 ? { ...s, count: s.count - 1 } : s));
  };

  const submitTycoonPlan = () => {
    setDone(true);
    const won = cleanPercentage >= 75;
    onComplete({
      won,
      xpEarned: won ? 300 : 80,
      scoreText: `Clean: ${cleanPercentage}%`,
      message: won 
        ? "Incredible energy mix restructure! Renewable Energy Tycoon verified! ⚡" 
        : `Mix fell short. Renewable energy share is only ${cleanPercentage}% (Target: 75%).`,
      badge: "Clean Energy Tycoon",
      celebStyle: "EnergyPulse"
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span className="font-bold text-amber-400">💰 Budget: ${budget}B</span>
        <span className="font-bold text-slate-300">Mix: {cleanOutput} / {totalOutput} MW</span>
        <span className={`font-black text-sm px-2 py-0.5 rounded ${cleanPercentage >= 75 ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}>
          ⚡ Clean: {cleanPercentage}%
        </span>
      </div>

      <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[220px] pr-1">
        {sources.map(s => (
          <div key={s.id} className="p-2 rounded-xl border border-white/5 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{s.icon}</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-tight">{s.name} ({s.count})</span>
                <span className={`text-[8px] font-bold font-mono ${s.clean ? "text-emerald-400" : "text-red-400"}`}>
                  +{s.output} MW · {s.clean ? "RENEWABLE" : "FOSSIL FUEL"}
                </span>
              </div>
            </div>
            
            <button
              disabled={budget < s.cost || done}
              onClick={() => buildSource(s.id)}
              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 rounded text-[10px] font-black cursor-pointer transition-colors"
            >
              BUILD (-${s.cost}B)
            </button>
          </div>
        ))}

        {/* Decommission button */}
        <div className="p-2 rounded-xl border border-red-500/20 bg-red-500/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💣</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-red-400 leading-tight">Decommission Coal</span>
              <span className="text-[8px] text-slate-400">Remove 1 coal boiler to clean the grid mix</span>
            </div>
          </div>
          <button
            disabled={budget < 5 || sources.find(s => s.id === 5)!.count <= 0 || done}
            onClick={decommissionCoal}
            className="px-2.5 py-1 bg-red-500 hover:bg-red-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 rounded text-[10px] font-black cursor-pointer transition-colors"
          >
            DEMOLISH (-$5B)
          </button>
        </div>
      </div>

      <button onClick={submitTycoonPlan}
        className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-colors cursor-pointer">
        Submit Power Mix ⚡
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 17 — CLIMATE CRISIS MANAGER
   ══════════════════════════════════════════════════════ */
const CRISIS_SCENARIOS = [
  {
    crisis: "1. Coastal Flood Surge",
    desc: "Sea levels have breached the port walls. High tides are coming.",
    opts: [
      { text: "Deploy temporary inflatable sea barriers ($10B cost)", survival: 15, cost: 10 },
      { text: "Evacuate lower sectors & build permanent seawall ($25B)", survival: 25, cost: 25 },
      { text: "Ignore: rely on drainage pumps ($0B)", survival: -15, cost: 0 }
    ]
  },
  {
    crisis: "2. Forest Wildfire",
    desc: "Dry seasons trigger brush fires heading towards residential towns.",
    opts: [
      { text: "Mobilize aerial retardant drop planes ($8B)", survival: 20, cost: 8 },
      { text: "Establish bulldozed firebreaks near suburbs ($15B)", survival: 22, cost: 15 },
      { text: "Order self-evacuation, fire department stays in base ($2B)", survival: -5, cost: 2 }
    ]
  },
  {
    crisis: "3. Extreme Heatwave",
    desc: "Temperatures reach 115°F. The electrical grid is nearing overload.",
    opts: [
      { text: "Initiate brownouts & open cooling hubs ($4B)", survival: 18, cost: 4 },
      { text: "Subsidize AC operations & request grid boost ($12B)", survival: 15, cost: 12 },
      { text: "Do nothing: rely on private AC setups ($0B)", survival: -20, cost: 0 }
    ]
  },
  {
    crisis: "4. Severe Hurricane",
    desc: "A Category 4 storm is making landfall. Storm surges are imminent.",
    opts: [
      { text: "Mandatory coastal evacuation & emergency shelters ($10B)", survival: 25, cost: 10 },
      { text: "Reinforce emergency center basements ($6B)", survival: 12, cost: 6 },
      { text: "Recommend voluntary evacuation ($0B)", survival: -10, cost: 0 }
    ]
  },
  {
    crisis: "5. Long-term Agricultural Drought",
    desc: "Farms dry out. Water reservoirs have depleted below 20%.",
    opts: [
      { text: "Enforce domestic water rationing & buy imports ($15B)", survival: 18, cost: 15 },
      { text: "Install regional desalination plants ($35B)", survival: 28, cost: 35 },
      { text: "Request voluntary agricultural water cutbacks ($2B)", survival: -8, cost: 2 }
    ]
  }
];

function ClimateCrisisManager({ onComplete }: GameProps) {
  const [shuffledScenarios] = useState(() => {
    return [...CRISIS_SCENARIOS]
      .sort(() => Math.random() - 0.5)
      .map(s => {
        return {
          ...s,
          opts: [...s.opts].sort(() => Math.random() - 0.5)
        };
      });
  });
  const [currRound, setCurrRound] = useState(0);
  const [survivalRate, setSurvivalRate] = useState(60); // Starts at 60%
  const [funds, setFunds] = useState(60); // Starts with $60B budget
  const [done, setDone] = useState(false);

  const handleDecision = (opt: { survival: number; cost: number }) => {
    if (done) return;
    
    const nextSurvival = Math.min(100, Math.max(0, survivalRate + opt.survival));
    const nextFunds = Math.max(0, funds - opt.cost);

    setSurvivalRate(nextSurvival);
    setFunds(nextFunds);

    if (currRound < shuffledScenarios.length - 1) {
      setCurrRound(currRound + 1);
    } else {
      setDone(true);
      const won = nextSurvival >= 75;
      onComplete({
        won,
        xpEarned: won ? 250 : 60,
        scoreText: `Survival: ${nextSurvival}%`,
        message: won 
          ? "Outstanding crisis deployment! You saved lives and built resilient cities! 🚨" 
          : `Mitigation failed. Final survival index is too low (${nextSurvival}%).`,
        badge: "Crisis Chief",
        celebStyle: "EarthGlow"
      });
    }
  };

  const curr = shuffledScenarios[currRound];

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>Disaster {currRound + 1} / 5</span>
        <span className="font-bold text-amber-400">💵 Budget: ${funds}B</span>
        <span className={`font-black text-sm px-2 py-0.5 rounded ${survivalRate >= 75 ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}>
          Survival: {survivalRate}%
        </span>
      </div>

      <div className="text-center py-1">
        <h4 className="text-red-400 font-bold text-sm leading-tight flex items-center gap-1.5 justify-center">
          <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" /> {curr.crisis}
        </h4>
        <p className="text-slate-200 text-xs mt-2 leading-relaxed">{curr.desc}</p>
      </div>

      <div className="flex flex-col gap-2.5">
        {curr.opts.map((opt, i) => (
          <button
            key={i}
            disabled={funds < opt.cost}
            onClick={() => handleDecision(opt)}
            className={`p-3 rounded-xl border text-xs text-left cursor-pointer transition-all flex flex-col gap-1.5 ${
              funds < opt.cost ? "border-white/5 bg-slate-900/20 opacity-30 cursor-not-allowed" : "border-white/5 bg-slate-900/60 hover:bg-slate-800/80 hover:border-violet-500/30 text-white"
            }`}
          >
            <span className="font-semibold">{opt.text}</span>
            <span className="flex gap-4 text-[9px] text-slate-500 font-bold uppercase">
              <span className={opt.survival > 0 ? "text-emerald-400" : "text-red-400"}>Survival: {opt.survival > 0 ? `+${opt.survival}` : opt.survival}%</span>
              <span>Cost: ${opt.cost}B</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 18 — ECO HABIT BUILDER
   ══════════════════════════════════════════════════════ */
interface EcoHabit {
  id: number;
  habit: string;
  co2Saved: number;
  checked: boolean;
}

function EcoHabitBuilder({ onComplete }: GameProps) {
  const [habits, setHabits] = useState<EcoHabit[]>([
    { id: 1, habit: "Brought reusable grocery shopping bags", co2Saved: 0.1, checked: false },
    { id: 2, habit: "Commuted to campus by walking/bicycle", co2Saved: 2.5, checked: false },
    { id: 3, habit: "Unplugged phone charger when finished", co2Saved: 0.05, checked: false },
    { id: 4, habit: "Opted out of printed receipts / statements", co2Saved: 0.02, checked: false },
    { id: 5, habit: "Took a quick 5-minute shower", co2Saved: 0.6, checked: false },
    { id: 6, habit: "Pre-sorted garbage scraps correctly", co2Saved: 0.2, checked: false },
    { id: 7, habit: "Ate plant-based lunch / dinner", co2Saved: 1.5, checked: false },
    { id: 8, habit: "Washed laundry using cold water cycle", co2Saved: 0.4, checked: false },
    { id: 9, habit: "Turned off TV & computer standbys", co2Saved: 0.12, checked: false },
    { id: 10, habit: "Air-dried clothes instead of dry tumbler", co2Saved: 0.8, checked: false },
    { id: 11, habit: "Used natural windows for ventilation", co2Saved: 1.2, checked: false },
    { id: 12, habit: "Avoided disposable plastic coffee cups", co2Saved: 0.15, checked: false },
  ]);
  const [done, setDone] = useState(false);

  const checkedCount = habits.filter(h => h.checked).length;
  const carbonSaved = Math.round(habits.reduce((sum, h) => sum + (h.checked ? h.co2Saved : 0), 0) * 100) / 100;

  const toggleHabit = (id: number) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, checked: !h.checked } : h));
  };

  const handleFinish = () => {
    setDone(true);
    const won = checkedCount >= 8;
    onComplete({
      won,
      xpEarned: won ? 120 : 35,
      scoreText: `${checkedCount} habits`,
      message: won 
        ? "Habit builder checklist completed! Your daily carbon savings are massive! 📅" 
        : "Complete at least 8 positive habits to check off your day.",
      badge: "Habit Hero",
      celebStyle: "FloatingLeaves"
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span className="font-bold text-emerald-400">✅ Checked: {checkedCount} / 8</span>
        <span className="font-bold text-amber-400">🌱 CO₂ Saved: {carbonSaved} kg</span>
      </div>

      <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[220px] pr-1">
        {habits.map(h => (
          <button
            key={h.id}
            onClick={() => toggleHabit(h.id)}
            className={`w-full p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
              h.checked ? "border-emerald-500 bg-emerald-500/10 text-white" : "border-white/5 bg-slate-900/40 text-slate-400"
            }`}
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold leading-tight">{h.habit}</span>
              <span className="text-[8px] text-emerald-400 font-bold font-mono">Saves {h.co2Saved} kg CO₂</span>
            </div>
            <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
              h.checked ? "border-emerald-500 bg-emerald-500 text-slate-950 font-black" : "border-slate-700 bg-transparent"
            }`}>
              {h.checked && "✓"}
            </div>
          </button>
        ))}
      </div>

      <button onClick={handleFinish}
        className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-colors cursor-pointer">
        Complete Habits Check 📅
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 19 — GREEN CAMPUS CHALLENGE
   ══════════════════════════════════════════════════════ */
interface CampusInitiative {
  id: number;
  area: string;
  name: string;
  cost: number; // $k
  impact: number;
  selected: boolean;
}

function GreenCampusChallenge({ onComplete }: GameProps) {
  const [initiatives, setInitiatives] = useState<CampusInitiative[]>([
    // Cafeteria
    { id: 1, area: "Cafeteria", name: "Ban single-use cutlery", cost: 4, impact: 15, selected: false },
    { id: 2, area: "Cafeteria", name: "Install compost waste bins", cost: 6, impact: 20, selected: false },
    { id: 3, area: "Cafeteria", name: "Source food locally", cost: 12, impact: 25, selected: false },
    // Classrooms
    { id: 4, area: "Classrooms", name: "Motion lights sensors", cost: 5, impact: 18, selected: false },
    { id: 5, area: "Classrooms", name: "Insulate windows", cost: 15, impact: 22, selected: false },
    { id: 6, area: "Classrooms", name: "Adopt digital textbook policy", cost: 3, impact: 12, selected: false },
    // Energy Grid
    { id: 7, area: "Energy Grid", name: "Roof Solar Array", cost: 25, impact: 40, selected: false },
    { id: 8, area: "Energy Grid", name: "Battery backup system", cost: 18, impact: 28, selected: false },
    { id: 9, area: "Energy Grid", name: "High efficiency HVAC filters", cost: 8, impact: 16, selected: false },
    // Gardens
    { id: 10, area: "Gardens", name: "Rainwater harvesting tanks", cost: 10, impact: 22, selected: false },
    { id: 11, area: "Gardens", name: "Wild pollinator fields", cost: 4, impact: 14, selected: false },
    { id: 12, area: "Gardens", name: "Drip irrigation systems", cost: 7, impact: 16, selected: false },
  ]);
  const [budget, setBudget] = useState(50); // $50k
  const [done, setDone] = useState(false);

  const totalCost = initiatives.reduce((sum, init) => sum + (init.selected ? init.cost : 0), 0);
  const totalImpact = initiatives.reduce((sum, init) => sum + (init.selected ? init.impact : 0), 0);
  const budgetLimit = 50;
  const targetImpact = 120;

  const toggleInitiative = (id: number) => {
    if (done) return;
    const init = initiatives.find(i => i.id === id);
    if (!init) return;
    if (!init.selected && totalCost + init.cost > budgetLimit) return; // Exceeds budget

    setInitiatives(prev => prev.map(i => i.id === id ? { ...i, selected: !i.selected } : i));
  };

  const handleFinish = () => {
    setDone(true);
    const won = totalImpact >= targetImpact && totalCost <= budgetLimit;
    onComplete({
      won,
      xpEarned: won ? 200 : 45,
      scoreText: `${totalImpact} impact`,
      message: won 
        ? "Excellent budget allocation! Campus has been successfully modernized! 🏫" 
        : `Mitigation failed. Impact score must be at least ${targetImpact} within budget.`,
      badge: "Campus Pioneer",
      celebStyle: "ForestBurst"
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span className={`font-bold ${totalCost <= budgetLimit ? "text-amber-400" : "text-red-400"}`}>
          💰 Cost: ${totalCost}k / ${budgetLimit}k
        </span>
        <span className={`font-black text-sm px-2 py-0.5 rounded ${totalImpact >= targetImpact ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"}`}>
          🏫 Impact: {totalImpact} / {targetImpact} pts
        </span>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-[240px] pr-1">
        {["Cafeteria", "Classrooms", "Energy Grid", "Gardens"].map(area => (
          <div key={area}>
            <h4 className="text-white font-bold text-[10px] mb-1.5 uppercase tracking-wider text-slate-500">{area}</h4>
            <div className="grid grid-cols-3 gap-1.5">
              {initiatives.filter(i => i.area === area).map(i => (
                <button
                  key={i.id}
                  disabled={done || (!i.selected && totalCost + i.cost > budgetLimit)}
                  onClick={() => toggleInitiative(i.id)}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-between h-[95px] ${
                    i.selected ? "border-emerald-500 bg-emerald-500/20 text-white" : "border-white/5 bg-slate-900/50 text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed"
                  }`}
                >
                  <span className="text-[9px] font-bold leading-tight block mb-1">{i.name}</span>
                  <div className="w-full flex justify-between items-center text-[7.5px] font-bold mt-auto border-t border-white/5 pt-1">
                    <span className="text-amber-400">${i.cost}k</span>
                    <span className="text-emerald-400">+{i.impact}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleFinish}
        className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-colors cursor-pointer">
        Deploy Initiative Plan 🚀
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME 20 — AI CLIMATE MENTOR
   ══════════════════════════════════════════════════════ */
const AI_MENTOR_SCENARIOS = [
  {
    topic: "1. Steel Manufacturing Emissions",
    q: "Heavy steel production releases massive industrial emissions. What is your proposed regulation?",
    opts: [
      { text: "Enforce a strict shift to clean Hydrogen-based steel processing (-35% emissions)", feedback: "AI Mentor: 'Highly ambitious! Carbon footprint drops severely, though steel costs rise 20% in the short term. Verified.'", score: 95 },
      { text: "Subsidize carbon capture scrubbers on existing coal blast furnaces (-12% emissions)", feedback: "AI Mentor: 'Pragmatic but holds back the real technological transition. Better than nothing.'", score: 70 },
      { text: "Rely on voluntary corporate sustainability emission reporting targets (-1% emissions)", feedback: "AI Mentor: 'Ineffective greenwashing. Corporate pledges without mandates fail to reduce emissions.'", score: 35 }
    ]
  },
  {
    topic: "2. Aviation Fuel Mandates",
    q: "Airlines generate roughly 2.5% of carbon emissions globally. What is your policy option?",
    opts: [
      { text: "Mandate a progressive blend of 30% Sustainable Aviation Fuel (SAF) by 2035", feedback: "AI Mentor: 'A strong regulatory signal. Accelerates SAF refinement, though ticket prices rise slightly. Approved.'", score: 90 },
      { text: "Allow airlines to offset emissions by purchasing forestry credit bonds", feedback: "AI Mentor: 'Offsets are frequently unverified and lead to delayed internal technological mitigation.'", score: 50 },
      { text: "Fund a research study to analyze fuel cell viability without targets", feedback: "AI Mentor: 'Research is fine, but direct regulatory mandates are needed immediately to address current emissions.'", score: 40 }
    ]
  },
  {
    topic: "3. Urban Transport Gridlock",
    q: "Our largest metro city faces severe congestion, air pollution, and carbon issues.",
    opts: [
      { text: "Introduce Congestion Pricing zones & make bus transit entirely free", feedback: "AI Mentor: 'Excellent policy combination. Car traffic drops 25% while bus ridership spikes. 98 score.'", score: 98 },
      { text: "Subsidize EV purchases & build charging stations", feedback: "AI Mentor: 'Clean cars are useful, but they do not solve the severe gridlock and road space constraints.'", score: 75 },
      { text: "Repave city streets to reduce vehicle rolling resistance", feedback: "AI Mentor: 'Trivial impact. Fails to address the core volume of combustion cars.'", score: 30 }
    ]
  },
  {
    topic: "4. Fashion Supply Chain Waste",
    q: "Fast-fashion brands produce huge quantities of polyester textile landfill waste.",
    opts: [
      { text: "Enforce Extended Producer Responsibility (EPR) laws: brands pay for textile collection/recycling", feedback: "AI Mentor: 'An industry-changing policy. Places the cost of lifecycle waste back on the manufacturer. Approved!'", score: 92 },
      { text: "Launch a consumer awareness campaign recommending clothing care", feedback: "AI Mentor: 'Shifts blame onto individuals, ignoring fast fashion's built-in obsolescence. Weak policy score.'", score: 45 },
      { text: "Introduce tax breaks for mending shops", feedback: "AI Mentor: 'Helpful for local tailors, but does not curb the global flood of cheap garments.'", score: 55 }
    ]
  },
  {
    topic: "5. Data Center Power Demands",
    q: "AI data center expansions are placing heavy loads on fossil-fuel power grids.",
    opts: [
      { text: "Mandate that all data centers secure 100% hourly-matched clean energy power contracts locally", feedback: "AI Mentor: 'Brilliant. Force-multiplies green energy development. A model policy. 95 score.'", score: 95 },
      { text: "Permit carbon offsets for database operations", feedback: "AI Mentor: 'Allows data centers to keep burning local coal while funding offsets elsewhere. Ineffective.'", score: 40 },
      { text: "Request voluntary off-peak scheduling of heavy processing workloads", feedback: "AI Mentor: 'Unlikely to hold back data centers during commercial peak hours. Too weak.'", score: 50 }
    ]
  }
];

function AIClimateMentor({ onComplete }: GameProps) {
  const [currRound, setCurrRound] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const averageScore = scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length) : 0;

  const pitchPolicy = (optIdx: number) => {
    if (done || selectedOpt !== null) return;
    setSelectedOpt(optIdx);
    
    const scenarioScore = AI_MENTOR_SCENARIOS[currRound].opts[optIdx].score;
    const nextScores = [...scores, scenarioScore];
    setScores(nextScores);

    setTimeout(() => {
      setSelectedOpt(null);
      if (currRound < AI_MENTOR_SCENARIOS.length - 1) {
        setCurrRound(currRound + 1);
      } else {
        setDone(true);
        const finalAvg = Math.round(nextScores.reduce((sum, s) => sum + s, 0) / nextScores.length);
        const won = finalAvg >= 80;
        onComplete({
          won,
          xpEarned: won ? 300 : 75,
          scoreText: `Mentor Score: ${finalAvg}/100`,
          message: won 
            ? "Your regulatory strategies have been validated by the Climate Council! Policy Master! 🤖" 
            : `Policy proposals rejected. Average score fell below 80/100 (${finalAvg}/100).`,
          badge: "Policy Master",
          celebStyle: "EarthGlow"
        });
      }
    }, 3800); // Give user time to read the AI feedback
  };

  const curr = AI_MENTOR_SCENARIOS[currRound];

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>Policy Pitch {currRound + 1} / 5</span>
        <span className={`font-black text-sm px-2 py-0.5 rounded ${averageScore >= 80 ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"}`}>
          🤖 AI Score: {averageScore} / 100
        </span>
      </div>

      <div className="text-center py-1 border-b border-white/5">
        <h4 className="text-white font-bold text-xs leading-tight">{curr.topic}</h4>
        <p className="text-slate-200 text-xs mt-2 leading-relaxed">{curr.q}</p>
      </div>

      <div className="flex flex-col gap-2">
        {curr.opts.map((opt, i) => (
          <button
            key={i}
            disabled={selectedOpt !== null || done}
            onClick={() => pitchPolicy(i)}
            className={`p-3 rounded-xl border text-xs text-left cursor-pointer transition-all flex flex-col gap-1.5 ${
              selectedOpt !== null ? (i === selectedOpt ? "border-violet-500 bg-violet-500/10 text-violet-300" : "border-white/2 bg-slate-900/10 text-slate-600") : "border-white/5 bg-slate-900/50 hover:bg-slate-800/80 hover:border-violet-500/30 text-white"
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {selectedOpt !== null && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-300 text-xs italic mt-2 text-center">
          {curr.opts[selectedOpt].feedback}
        </motion.div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GAME COMPONENT MAP (20 Games)
   ══════════════════════════════════════════════════════ */
const GAME_MAP: Record<number, React.FC<GameProps>> = {
  1: ClimateTimeMachine,
  2: SustainableCityBuilder,
  3: CarbonDetective,
  4: RecyclingRush,
  5: EcoDecisionSimulator,
  6: EarthRescueMission,
  7: EnergySaverSimulator,
  8: WaterGuardian,
  9: CarbonFootprintPuzzle,
  10: GreenTransport,
  11: SustainableShopping,
  12: FoodFootprintChallenge,
  13: ClimateQuizArena,
  14: ForestRestoration,
  15: OceanCleanupMission,
  16: RenewableEnergyTycoon,
  17: ClimateCrisisManager,
  18: EcoHabitBuilder,
  19: GreenCampusChallenge,
  20: AIClimateMentor
};

/* ══════════════════════════════════════════════════════
   ECO ARCADE PAGE HUB
   ══════════════════════════════════════════════════════ */
export function GamesPage({ onBack }: { onBack: () => void }) {
  const [activeGame, setActiveGame] = useState<number | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [gameKey, setGameKey] = useState(0);
  const [shuffledGames, setShuffledGames] = useState<GameMeta[]>(() => {
    return [...GAMES_META].sort(() => Math.random() - 0.5);
  });
  const [completed, setCompleted] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem("eco_arcade_completed_games");
      return saved ? new Set(JSON.parse(saved).map(Number)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [totalXP, setTotalXP] = useState(() => {
    try {
      const saved = localStorage.getItem("eco_arcade_total_xp");
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("eco_arcade_badges");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleShuffle = () => {
    setShuffledGames([...GAMES_META].sort(() => Math.random() - 0.5));
  };

  const meta = activeGame ? GAMES_META.find(g => g.id === activeGame)! : null;
  const GameComponent = activeGame ? GAME_MAP[activeGame] : null;

  const handleComplete = (r: GameResult) => {
    const nextResult = { ...r, celebStyle: meta?.celebStyle };
    setResult(nextResult);

    if (r.won && activeGame) {
      setCompleted(prev => {
        const next = new Set([...prev, activeGame]);
        localStorage.setItem("eco_arcade_completed_games", JSON.stringify(Array.from(next)));
        return next;
      });

      setTotalXP(prev => {
        const next = prev + r.xpEarned;
        localStorage.setItem("eco_arcade_total_xp", String(next));
        return next;
      });

      if (meta?.badge && !unlockedBadges.includes(meta.badge)) {
        setUnlockedBadges(prev => {
          const next = [...prev, meta.badge];
          localStorage.setItem("eco_arcade_badges", JSON.stringify(next));
          return next;
        });
      }
    }
  };

  const retry = () => { setResult(null); setGameKey(k => k + 1); };
  const backToHub = () => { setResult(null); setActiveGame(null); setGameKey(k => k + 1); };

  if (activeGame && meta && GameComponent) {
    return (
      <>
        <GameShell meta={meta} onExit={backToHub}>
          <GameComponent key={gameKey} onComplete={handleComplete} onExit={backToHub} />
        </GameShell>
        <AnimatePresence>
          {result && <CelebrationOverlay result={result} onRetry={retry} onBack={backToHub} />}
        </AnimatePresence>
      </>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen pb-32 px-4 sm:px-6 md:px-12 pt-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 w-full max-w-none">
        <div className="flex flex-col items-start gap-2">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm font-semibold">Home</span>
          </button>
          <button onClick={handleShuffle} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300 text-[9px] font-black hover:bg-violet-500/20 transition-all cursor-pointer shadow-md uppercase tracking-wider">
            🔀 Shuffle List
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-display font-black text-white flex items-center gap-2 justify-center">
            <Gamepad2 className="w-7 h-7 text-emerald-400" /> Eco Arcade
          </h1>
          <p className="text-xs text-slate-500">20 Premium Gamified Missions · Win Badges & XP</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Total Session XP</span>
          <span className="text-xl font-display font-black text-amber-400 flex items-center gap-1">⚡ {totalXP}</span>
        </div>
      </div>

      {/* Progress Banner */}
      <div className="mb-8 p-5 rounded-3xl bg-slate-900/60 border border-white/8 backdrop-blur-xl w-full max-w-none flex flex-col md:flex-row gap-6 justify-between items-center shadow-lg">
        <div className="flex-1 w-full">
          <div className="flex justify-between text-xs text-slate-400 mb-2 font-bold">
            <span>Arcade Completion</span>
            <span className="text-emerald-400">{completed.size} / 20 Games Completed</span>
          </div>
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-violet-500"
              animate={{ width: `${(completed.size / 20) * 100}%` }} transition={{ duration: 0.6 }} />
          </div>
          {completed.size === 20 && (
            <p className="text-center text-emerald-400 text-xs font-black mt-3 animate-pulse">
              🏆 ULTIMATE ARCADE CHAMPION! You've conquered all 20 eco games!
            </p>
          )}
        </div>
        
        {/* Badges unlocked showcase */}
        <div className="w-full md:w-auto shrink-0 flex flex-col items-center md:items-end gap-1.5 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Badges Unlocked ({unlockedBadges.length})</span>
          <div className="flex flex-wrap gap-1 max-w-[200px] justify-center md:justify-end">
            {unlockedBadges.length === 0 ? (
              <span className="text-[10px] text-slate-500 italic">No badges unlocked yet.</span>
            ) : (
              unlockedBadges.map(b => (
                <span key={b} className="text-[8px] font-black bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full text-emerald-400" title={b}>
                  🎖️ {b.slice(0, 12)}..
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Games list grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-none">
        {shuffledGames.map((g, i) => {
          const isCompleted = completed.has(g.id);
          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -5, scale: 1.01 }}
              onClick={() => { setResult(null); setGameKey(k => k + 1); setActiveGame(g.id); }}
              className="glass-card rounded-3xl p-6 cursor-pointer relative overflow-hidden border border-white/8 group flex flex-col justify-between min-h-[185px]"
              style={{ boxShadow: isCompleted ? `0 0 24px ${g.glow}` : "none" }}
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${g.grad} opacity-70`} />
              
              {/* Completed badge */}
              {isCompleted && (
                <div className="absolute top-4 right-4 w-5.5 h-5.5 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
              )}

              <div className="flex items-start gap-4 flex-1 mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${g.grad} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
                  {g.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <h3 className="font-display font-bold text-white text-sm md:text-base truncate max-w-[150px]" title={g.title}>{g.title}</h3>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider ${
                      g.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400" :
                      g.difficulty === "Medium" ? "bg-amber-500/10 text-amber-500" :
                      "bg-rose-500/10 text-rose-400"
                    }`}>
                      {g.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mt-1.5">{g.desc}</p>
                </div>
              </div>

              <div className="w-full flex items-center justify-between text-[11px] text-slate-500 border-t border-white/5 pt-3.5 mt-auto">
                <span className="flex items-center gap-0.5 font-medium">⏱ {g.time}</span>
                <span className="text-amber-400 font-bold font-mono">⚡ +{g.xp} XP</span>
              </div>

              <motion.div
                className={`mt-3 py-2 rounded-xl text-center text-xs font-black bg-gradient-to-r ${g.grad} text-white opacity-0 group-hover:opacity-100 transition-opacity`}>
                {isCompleted ? "Play Again 🔄" : "Play Now →"}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
