export interface GameMeta {
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
