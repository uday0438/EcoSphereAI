import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Header } from "./components/DashboardHeader";
import { AICoachCard } from "./components/AICoachCard";
import { EmissionsChart } from "./components/AnalyticsCharts";
import { EcoMissionsPanel } from "./components/EcoMissionsPanel";
import { SimulatorCard } from "./components/SimulatorCard";
import { OpeningSequence } from "./components/OpeningSequence";
import { FeatureBentoGrid, HeroStats, GamesPreview } from "./components/LandingPage";
import { GamificationShowcase } from "./components/GamificationShowcase";
import { SdgImpactSection } from "./components/SdgImpactSection";
import { GamesPage } from "./components/EcoArcadePage";
import { BottomDock } from "./components/BottomDock";
import { GreenCertificateModal } from "./components/GreenCertificateModal";
import { LeaderboardCard } from "./components/LeaderboardCard";
import { SmartTipsCard } from "./components/SmartTipsCard";
import { BackgroundLeaves } from "./components/BackgroundLeaves";
import { ManifestModal } from "./components/ManifestModal";

export default function App() {
  const [appState, setAppState] = useState<"opening" | "landing" | "dashboard" | "games">("opening");
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  
  // Theme state persisted to localStorage (defaulting to dark mode)
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    return (localStorage.getItem("theme") as "dark" | "light") || "dark";
  });

  // Native Tailwind CSS dark mode configuration.
  // Adds or removes class 'dark' on the root element.
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <BackgroundLeaves />

      {appState === "opening" && (
        <OpeningSequence onComplete={() => setAppState("landing")} />
      )}

      {appState === "landing" && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="min-h-screen hero-bg flex flex-col"
        >


          <main className="flex-1 overflow-y-auto pb-32">
            {/* ── Gen Z Hero Section ── */}
            <div className="relative pt-16 pb-24 overflow-hidden flex flex-col items-center text-center px-4">

              {/* Multi-orb vivid background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-emerald-500/15 via-violet-500/10 to-blue-500/15 rounded-full blur-[130px] -z-10" />
              <div className="absolute top-16 left-[5%] w-80 h-80 bg-violet-500/8 rounded-full blur-[90px] -z-10" />
              <div className="absolute bottom-10 right-[5%] w-60 h-60 bg-amber-500/8 rounded-full blur-[70px] -z-10" />

              {/* Floating emoji decorations */}
              <motion.span className="absolute top-14 left-[6%] text-4xl select-none pointer-events-none"
                animate={{ y: [0,-12,0], rotate: [-3,3,-3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>🌿</motion.span>
              <motion.span className="absolute top-28 right-[7%] text-3xl select-none pointer-events-none"
                animate={{ y: [0,-9,0], rotate: [3,-3,3] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>✨</motion.span>
              <motion.span className="absolute bottom-28 left-[10%] text-3xl select-none pointer-events-none hidden md:block"
                animate={{ y: [0,-11,0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>⚡</motion.span>
              <motion.span className="absolute bottom-36 right-[9%] text-4xl select-none pointer-events-none hidden md:block"
                animate={{ y: [0,-14,0], rotate: [-2,2,-2] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>🌍</motion.span>
              <motion.span className="absolute top-1/2 left-[2%] text-2xl select-none pointer-events-none hidden lg:block"
                animate={{ y: [0,-8,0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}>🔋</motion.span>
              <motion.span className="absolute top-1/3 right-[2%] text-2xl select-none pointer-events-none hidden lg:block"
                animate={{ y: [0,-10,0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>🌱</motion.span>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-5xl mx-auto"
              >
                {/* Viral badge */}
                <motion.div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-violet-500/12 border border-violet-500/30 text-sm font-bold text-violet-300 mb-8 cursor-default"
                  animate={{ boxShadow: ["0 0 16px rgba(167,139,250,0.15)","0 0 36px rgba(167,139,250,0.40)","0 0 16px rgba(167,139,250,0.15)"] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
                  </span>
                  <span>85k+ people living their Planet Era rn</span>
                  <span className="text-base">🔥</span>
                </motion.div>

                {/* Main headline */}
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black text-white tracking-tight mb-5 leading-[0.92]">
                  Slay sustainably.<br />
                  <span className="shimmer-text">Save the planet.</span>
                </h1>

                {/* Sub-headline pill */}
                <div className="flex justify-center mb-4">
                  <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-sm font-semibold text-emerald-400 tracking-wide">
                    ✦ Main character energy — but make it eco ✦
                  </span>
                </div>

                {/* Subtext */}
                <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-3 leading-relaxed">
                  Not your parents' climate app.{" "}
                  <span className="text-white font-semibold">EcoSphere turns your daily life into a sustainability flex</span>{" "}
                  — with AI, XP rewards & real impact.
                </p>
                <p className="text-sm text-slate-500 mb-10">
                  Powered by Google Gemini &nbsp;·&nbsp; Set up in 2 min &nbsp;·&nbsp; Zero guilt trips &nbsp;·&nbsp; Totally free
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
                  <motion.button
                    onClick={() => setAppState("dashboard")}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-9 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-full font-black text-lg cursor-pointer animate-neon-pulse"
                  >
                    Let&apos;s Go 🚀
                  </motion.button>
                  <motion.button
                    onClick={() => setIsManifestOpen(true)}
                    whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.08)" }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full sm:w-auto px-9 py-4 bg-white/4 text-white border border-white/12 rounded-full font-semibold text-lg cursor-pointer backdrop-blur-sm"
                  >
                    Read the Lore ✨
                  </motion.button>
                </div>

                {/* Live Activity Ticker */}
                <div className="mb-2">
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-semibold mb-3">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1.5 mb-0.5" />
                    Live Activity
                  </p>
                  <div className="overflow-hidden relative">
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0b111e] to-transparent z-10" />
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0b111e] to-transparent z-10" />
                    <div className="flex gap-3 animate-marquee whitespace-nowrap">
                      {[
                        "🌿 @priya_s just hit Level 13",
                        "🔥 @alex_m — 21 day streak! No way",
                        "💚 @jay saved 2.4 kg CO₂ today",
                        "🏆 @sam unlocked Earth Guardian",
                        "⚡ @riya completed the No-Car challenge",
                        "🚲 @dev cycled 8km this morning",
                        "♻️ @nina sorted 30 items this week",
                        "🌍 @raj planted a tree IRL fr",
                      ].concat([
                        "🌿 @priya_s just hit Level 13",
                        "🔥 @alex_m — 21 day streak! No way",
                        "💚 @jay saved 2.4 kg CO₂ today",
                        "🏆 @sam unlocked Earth Guardian",
                        "⚡ @riya completed the No-Car challenge",
                        "🚲 @dev cycled 8km this morning",
                        "♻️ @nina sorted 30 items this week",
                        "🌍 @raj planted a tree IRL fr",
                      ]).map((t, i) => (
                        <span key={i} className="text-xs text-slate-400 px-3 py-1.5 rounded-full bg-white/4 border border-white/7 flex-shrink-0">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hero Stats */}
                <HeroStats />
              </motion.div>
            </div>

            <FeatureBentoGrid onEnterApp={() => setAppState("dashboard")} />
            <GamificationShowcase onEnterApp={() => setAppState("dashboard")} />
            <SdgImpactSection />
            <GamesPreview onGoToGames={() => setAppState("games")} />
          </main>
        </motion.div>
      )}

      {appState === "games" && (
        <GamesPage onBack={() => setAppState("landing")} />
      )}

      {appState === "dashboard" && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="min-h-screen p-4 md:p-8 pb-32 max-w-none px-6 md:px-16 mx-auto"
        >
          {/* Header displays verified badges and achievement modals */}
          <Header onOpenCertificate={() => setIsCertOpen(true)} />
          
          <main className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
            
            {/* Top Row */}
            <div className="md:col-span-8">
              <AICoachCard />
            </div>
            <div className="md:col-span-4 h-full">
              <section aria-labelledby="eco-score-title" className="glass-card rounded-3xl p-6 h-[450px] relative overflow-hidden flex flex-col justify-center items-center">
                <div className="text-center">
                  <h3 id="eco-score-title" className="font-semibold text-slate-400 uppercase tracking-widest text-xs mb-8">Eco Score Confidence</h3>
                  
                  {/* SVG Circular Progress */}
                  <div className="relative w-48 h-48 mx-auto">
                    <svg 
                      className="w-full h-full -rotate-90 transform" 
                      viewBox="0 0 100 100"
                      role="img"
                      aria-label="Circular graph displaying Eco Score of 85 out of 100, indicating Excellent standing"
                    >
                      
                      <circle cx="50" cy="50" r="40" className="stroke-slate-800 fill-none" strokeWidth="8" />
                      
                      <motion.circle 
                        cx="50" cy="50" r="40" 
                        className="stroke-emerald-400 fill-none" 
                        strokeWidth="8" 
                        strokeLinecap="round"
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 - (251.2 * 0.85) }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-display font-bold text-white">85</span>
                      <span className="text-sm text-emerald-400 font-medium mt-1">Excellent</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left w-full border-t border-slate-700/50 pt-6">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">DATA CONFIDENCE</div>
                      <div className="font-mono text-white flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> 94%</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">ACTIVE SOURCES</div>
                      <div className="font-mono text-white items-center gap-1">3 Integrations</div>
                    </div>
                  </div>

                </div>
              </section>
            </div>

            {/* Bottom Row */}
            <div className="md:col-span-4">
              <EmissionsChart />
            </div>
            <div className="md:col-span-4">
              <SimulatorCard />
            </div>
            <div className="md:col-span-4">
              <EcoMissionsPanel />
            </div>

            {/* Community & Alerts Row (Added for Product-grade value) */}
            <div className="md:col-span-6">
              <LeaderboardCard />
            </div>
            <div className="md:col-span-6">
              <SmartTipsCard />
            </div>

          </main>
        </motion.div>
      )}

      {/* Floating Glassmorphic Bottom Navigation Dock - Transparency increased by 40% */}
      {appState !== "opening" && (
        <BottomDock
          activeTab={appState === "games" ? "games" : appState === "dashboard" ? "dashboard" : "landing"}
          onTabChange={(tab) => setAppState(tab)}
          onReplayIntro={() => setAppState("opening")}
          theme={theme}
          onThemeToggle={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
        />
      )}

      {/* Manifest Modal */}
      <ManifestModal
        isOpen={isManifestOpen}
        onClose={() => setIsManifestOpen(false)}
      />

      {/* Verified Achievement Certificate Modal */}
      <GreenCertificateModal 
        isOpen={isCertOpen} 
        onClose={() => setIsCertOpen(false)} 
      />
    </>
  );
}
