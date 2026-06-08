import { motion } from "motion/react";
import { Home, LayoutDashboard, RotateCcw, Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";

interface BottomDockProps {
  activeTab: "landing" | "dashboard";
  onTabChange: (tab: "landing" | "dashboard") => void;
  onReplayIntro: () => void;
  theme: "dark" | "light";
  onThemeToggle: () => void;
}

export function BottomDock({ activeTab, onTabChange, onReplayIntro, theme, onThemeToggle }: BottomDockProps) {
  const navItems = [
    {
      id: "landing" as const,
      label: "Manifesto",
      icon: Home,
      action: () => onTabChange("landing"),
    },
    {
      id: "dashboard" as const,
      label: "Climate OS",
      icon: LayoutDashboard,
      action: () => onTabChange("dashboard"),
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
      {/* Outer liquid-glass wrapper */}
      <nav 
        className={cn(
          "relative flex items-center justify-between px-4 py-2.5",
          "bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-full",
          "shadow-[0_20px_50px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.1)]",
          "transition-all duration-300 hover:border-white/15"
        )}
      >
        {/* Navigation Items */}
        <div className="flex items-center gap-1.5 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={item.action}
                className={cn(
                  "relative flex-1 py-2 rounded-full flex flex-col items-center justify-center gap-0.5",
                  "text-slate-400 hover:text-slate-200 transition-colors cursor-pointer",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                )}
                aria-label={`Navigate to ${item.label}`}
              >
                {/* Active fluid pill background */}
                {isActive && (
                  <motion.div
                    layoutId="liquid-pill"
                    className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/25 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {/* Floating active droplet indicator */}
                {isActive && (
                  <motion.span
                    layoutId="liquid-droplet"
                    className="absolute -bottom-1 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  />
                )}

                <Icon className={cn("w-5 h-5 relative z-10 transition-transform duration-200", isActive && "scale-105 text-emerald-400")} />
                <span className={cn("text-[10px] font-medium relative z-10", isActive ? "text-emerald-400 font-semibold" : "text-slate-400")}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Vertical divider */}
        <div className="w-[1px] h-8 bg-white/10 mx-2" aria-hidden="true" />

        {/* Quick Actions (Theme Switcher + Replay Onboarding Sequence) */}
        <div className="flex items-center gap-1">
          <button
            onClick={onThemeToggle}
            className={cn(
              "p-2.5 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-white/5",
              "transition-all duration-200 cursor-pointer active:scale-95",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            )}
            title={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={onReplayIntro}
            className={cn(
              "p-2.5 rounded-full text-slate-400 hover:text-emerald-400 hover:bg-white/5",
              "transition-all duration-200 cursor-pointer active:scale-95",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            )}
            title="Replay Intro Sequence"
            aria-label="Replay intro onboarding sequence"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </div>
  );
}
