import { motion } from "motion/react";
import { LayoutDashboard, RotateCcw, Sun, Moon, Gamepad2 } from "lucide-react";
import { cn } from "../lib/utils";

interface BottomDockProps {
  activeTab: "landing" | "dashboard" | "games" | "scan";
  onTabChange: (tab: "landing" | "dashboard" | "games" | "scan") => void;
  onReplayIntro: () => void;
  theme: "dark" | "light";
  onThemeToggle: () => void;
}

export function BottomDock({ activeTab, onTabChange, onReplayIntro, theme, onThemeToggle }: BottomDockProps) {
  const isLanding   = activeTab === "landing";
  const isDashboard = activeTab === "dashboard";
  const isGames     = activeTab === "games";
  const isScan      = activeTab === "scan";

  const navItems = [
    { id: "landing" as const,   label: "Home",      isActive: isLanding },
    { id: "dashboard" as const, label: "My Arc ⚡", isActive: isDashboard },
    { id: "scan" as const,      label: "Eco Scan 🔍", isActive: isScan },
    { id: "games" as const,     label: "Games 🎮",  isActive: isGames },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg">
      <nav className={cn(
        "relative flex items-center justify-between px-3 py-2",
        "bg-slate-900/55 backdrop-blur-2xl border border-white/10 rounded-full",
        "shadow-[0_20px_50px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.1)]",
        "transition-all duration-300 hover:border-white/15"
      )}>

        <div className="flex items-center gap-1 w-full">

          {/* ── Home — 🌍 Earth Globe ── */}
          <button
            onClick={() => onTabChange("landing")}
            className={cn(
              "relative flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5",
              "transition-colors cursor-pointer",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            )}
            aria-label="Navigate to Home"
          >
            {isLanding && (
              <motion.div layoutId="liquid-pill"
                className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/25 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
            {isLanding && (
              <motion.span layoutId="liquid-droplet"
                className="absolute -bottom-1 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"
                transition={{ type: "spring", stiffness: 300, damping: 20 }} />
            )}
            <motion.span className="relative z-10 leading-none select-none"
              animate={isLanding
                ? { scale: 1.22, filter: "drop-shadow(0 0 8px rgba(52,211,153,0.7)) drop-shadow(0 0 20px rgba(52,211,153,0.35))" }
                : { scale: 1,    filter: "drop-shadow(0 0 0px transparent)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              style={{ fontSize: "21px" }}>
              🌍
            </motion.span>
            <span className={cn("text-[10px] font-medium relative z-10", isLanding ? "text-emerald-400 font-semibold" : "text-slate-400")}>
              Home
            </span>
          </button>

          {/* ── Dashboard ── */}
          <button
            onClick={() => onTabChange("dashboard")}
            className={cn(
              "relative flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5",
              "text-slate-400 hover:text-slate-200 transition-colors cursor-pointer",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            )}
            aria-label="Navigate to Dashboard"
          >
            {isDashboard && (
              <motion.div layoutId="liquid-pill"
                className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/25 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
            {isDashboard && (
              <motion.span layoutId="liquid-droplet"
                className="absolute -bottom-1 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"
                transition={{ type: "spring", stiffness: 300, damping: 20 }} />
            )}
            <LayoutDashboard className={cn("w-5 h-5 relative z-10 transition-transform duration-200", isDashboard && "scale-105 text-emerald-400")} />
            <span className={cn("text-[10px] font-medium relative z-10", isDashboard ? "text-emerald-400 font-semibold" : "text-slate-400")}>
              My Arc ⚡
            </span>
          </button>

          {/* ── Eco Scan ── */}
          <button
            onClick={() => onTabChange("scan")}
            className={cn(
              "relative flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5",
              "text-slate-400 hover:text-slate-200 transition-colors cursor-pointer",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            )}
            aria-label="Navigate to Eco Scan"
          >
            {isScan && (
              <motion.div layoutId="liquid-pill"
                className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/25 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
            {isScan && (
              <motion.span layoutId="liquid-droplet"
                className="absolute -bottom-1 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"
                transition={{ type: "spring", stiffness: 300, damping: 20 }} />
            )}
            <motion.span className="relative z-10 leading-none select-none"
              animate={isScan
                ? { scale: 1.2, filter: "drop-shadow(0 0 8px rgba(52,211,153,0.7)) drop-shadow(0 0 20px rgba(52,211,153,0.35))" }
                : { scale: 1,   filter: "drop-shadow(0 0 0px transparent)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              style={{ fontSize: "21px" }}>
              🔍
            </motion.span>
            <span className={cn("text-[10px] font-medium relative z-10", isScan ? "text-emerald-400 font-semibold" : "text-slate-400")}>
              Eco Scan
            </span>
          </button>

          {/* ── Games ── */}
          <button
            onClick={() => onTabChange("games")}
            className={cn(
              "relative flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5",
              "text-slate-400 hover:text-slate-200 transition-colors cursor-pointer",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            )}
            aria-label="Navigate to Games"
          >
            {isGames && (
              <motion.div layoutId="liquid-pill"
                className="absolute inset-0 bg-violet-500/10 border border-violet-500/25 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
            {isGames && (
              <motion.span layoutId="liquid-droplet"
                className="absolute -bottom-1 w-1.5 h-1.5 bg-violet-400 rounded-full shadow-[0_0_10px_#a78bfa]"
                transition={{ type: "spring", stiffness: 300, damping: 20 }} />
            )}
            <motion.span className="relative z-10 leading-none select-none"
              animate={isGames
                ? { scale: 1.2, filter: "drop-shadow(0 0 8px rgba(167,139,250,0.7)) drop-shadow(0 0 20px rgba(167,139,250,0.35))" }
                : { scale: 1,   filter: "drop-shadow(0 0 0px transparent)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              style={{ fontSize: "21px" }}>
              🎮
            </motion.span>
            <span className={cn("text-[10px] font-medium relative z-10", isGames ? "text-violet-400 font-semibold" : "text-slate-400")}>
              Games
            </span>
          </button>

        </div>

        {/* Vertical divider */}
        <div className="w-[1px] h-8 bg-white/10 mx-2 flex-shrink-0" aria-hidden="true" />

        {/* Quick Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={onThemeToggle}
            className={cn("p-2.5 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-white/5", "transition-all duration-200 cursor-pointer active:scale-95")}
            title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={onReplayIntro}
            className={cn("p-2.5 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-white/5", "transition-all duration-200 cursor-pointer active:scale-95")}
            title="Replay Intro" aria-label="Replay intro sequence">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

      </nav>
    </div>
  );
}
