import { BookOpen, TreePine, Zap, Target } from "lucide-react";
import { type EcoMission } from "../types";
import { motion } from "motion/react";
import { useState } from "react";

const initialMissions: EcoMission[] = [
  { id: "m1", title: "Take Public Transport to Work", difficulty: "Medium", impactCo2: 4.2, xp: 120, completed: false },
  { id: "m2", title: "Turn off Unused Appliances", difficulty: "Easy", impactCo2: 0.8, xp: 40, completed: false },
  { id: "m3", title: "Meatless Dinner", difficulty: "Medium", impactCo2: 3.5, xp: 150, completed: false },
];

export function EcoMissionsPanel() {
  const [missions, setMissions] = useState(initialMissions);

  const toggleMission = (id: string, currentlyCompleted: boolean) => {
    // Only allow completing
    if (currentlyCompleted) return;
    
    setMissions(prev => prev.map(m => m.id === id ? { ...m, completed: true } : m));
    
    // Simulate celebration API call & effect
    const btn = document.getElementById(`mission-btn-${id}`);
    if (btn) {
      const rect = btn.getBoundingClientRect();
      createCelebration(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  return (
    <section aria-labelledby="eco-missions-title" className="glass-card rounded-3xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Target className="text-purple-400 w-5 h-5" />
        <h3 id="eco-missions-title" className="font-semibold text-lg text-white">Daily Eco Missions</h3>
        <span className="ml-auto bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full font-medium">Today</span>
      </div>

      <div className="space-y-4 flex-1">
        {missions.map((mission, i) => (
          <motion.div 
            key={mission.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative overflow-hidden rounded-2xl p-4 border transition-all ${
              mission.completed 
                ? "bg-slate-800/40 border-slate-700/50 opacity-60 grayscale" 
                : "bg-slate-800/80 border-slate-700 hover:border-slate-600"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className={`font-medium text-sm md:text-base ${mission.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                {mission.title}
              </h4>
              <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${
                mission.difficulty === "Easy" ? "bg-green-500/10 text-green-400" :
                mission.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-500" :
                "bg-orange-500/10 text-orange-400"
              }`}>
                {mission.difficulty}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <TreePine className="w-3 h-3 text-emerald-400" />
                  -{mission.impactCo2} kg
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-blue-400" />
                  +{mission.xp} XP
                </span>
              </div>
              
              <button 
                id={`mission-btn-${mission.id}`}
                onClick={() => toggleMission(mission.id, mission.completed)}
                disabled={mission.completed}
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2 ${
                  mission.completed 
                    ? "bg-green-500 border-green-500 text-white" 
                    : "border-slate-500 hover:border-green-400 hover:text-green-400 text-transparent"
                }`}
                aria-label={mission.completed ? `Completed: ${mission.title}` : `Complete mission: ${mission.title}`}
              >
                <motion.svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4"
                  initial={false}
                  animate={mission.completed ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                >
                  <motion.polyline points="20 6 9 17 4 12" />
                </motion.svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Lightweight celebration effect substituting an external library to save overhead
function createCelebration(x: number, y: number) {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  for (let i = 0; i < 30; i++) {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = '8px';
    el.style.height = '8px';
    el.style.backgroundColor = ['#22c55e', '#3b82f6', '#f59e0b', '#eab308'][Math.floor(Math.random() * 4)];
    el.style.borderRadius = '50%';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 50 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity - 50; // Bias upward
    
    el.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
    ], {
      duration: 600 + Math.random() * 400,
      easing: 'cubic-bezier(.17,.67,.83,.67)'
    });
    
    container.appendChild(el);
  }
  
  // Safe cleanup: check if parentNode exists before removing to prevent DOM errors
  setTimeout(() => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }, 1200);
}
