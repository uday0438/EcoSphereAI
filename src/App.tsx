import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Header } from "./components/DashboardHeader";
import { AICoachCard } from "./components/AICoachCard";
import { EmissionsChart } from "./components/AnalyticsCharts";
import { EcoMissionsPanel } from "./components/EcoMissionsPanel";
import { SimulatorCard } from "./components/SimulatorCard";
import { OpeningSequence } from "./components/OpeningSequence";
import { FeatureBentoGrid, StatsStrip } from "./components/LandingPage";
import { BottomDock } from "./components/BottomDock";
import { GreenCertificateModal } from "./components/GreenCertificateModal";
import { LeaderboardCard } from "./components/LeaderboardCard";
import { SmartTipsCard } from "./components/SmartTipsCard";
import { BackgroundLeaves } from "./components/BackgroundLeaves";
import { ManifestModal } from "./components/ManifestModal";

export default function App() {
  const [appState, setAppState] = useState<"opening" | "landing" | "dashboard">("opening");
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
            {/* Massive Hero Section */}
            <div className="relative pt-20 pb-32 overflow-hidden flex flex-col items-center text-center px-4">
              
              {/* Abstract CSS Earth Background Element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full blur-[100px] -z-10" />

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-sm font-medium text-emerald-400 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Gemini-Powered Engine Live
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white tracking-tight mb-8 leading-tight">
                  Your Personal <br/>
                  <span className="text-gradient">Climate Operating System</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Go beyond calculators. EcoSphere uses Google's Vertex AI to predict, analyze, and assist you in lowering your environmental impact through real-time telemetry and personalized coaching.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    onClick={() => setAppState("dashboard")}
                    className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-full font-semibold text-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Enter Open Beta
                  </button>
                  <button
                    onClick={() => setIsManifestOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-full font-semibold text-lg transition-colors cursor-pointer"
                  >
                    Read the Manifest
                  </button>
                </div>
              </motion.div>
            </div>

            <StatsStrip />
            <FeatureBentoGrid onEnterApp={() => setAppState("dashboard")} />
          </main>
        </motion.div>
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
          activeTab={appState}
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
