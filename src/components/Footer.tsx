import { Leaf } from "lucide-react";

interface FooterProps {
  onNavigate: (tab: "landing" | "dashboard" | "games" | "scan") => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full bg-slate-950/80 border-t border-white/5 pt-16 pb-8 px-6 md:px-16 mt-20 relative z-10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Leftmost Column - Logo & Brand info */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/25">
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xl font-display font-black tracking-tight text-white">
              EcoSphere <span className="shimmer-text">AI</span>
            </span>
          </div>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-sm">
            Empowering individuals to understand and reduce their carbon footprint through awareness, education, and actionable insights.
          </p>
        </div>

        {/* Column 2 - Platform Links */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Platform</h4>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => onNavigate("dashboard")}
                className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm transition-colors cursor-pointer text-left"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate("dashboard")}
                className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm transition-colors cursor-pointer text-left"
              >
                Simulator
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate("scan")}
                className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm transition-colors cursor-pointer text-left"
              >
                Eco Scan
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate("games")}
                className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm transition-colors cursor-pointer text-left"
              >
                Eco Arcade
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3 - Resources Links */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://www.ipcc.ch/" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm transition-colors cursor-pointer"
              >
                Climate Science
              </a>
            </li>
            <li>
              <button 
                onClick={() => onNavigate("dashboard")}
                className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm transition-colors cursor-pointer text-left"
              >
                Carbon Offsets
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate("scan")}
                className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm transition-colors cursor-pointer text-left"
              >
                Green Living Guide
              </button>
            </li>
            <li>
              <a 
                href="https://www.un.org/sustainabledevelopment/climate-change/" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm transition-colors cursor-pointer"
              >
                UN Climate Goals
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 - About Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">About</h4>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://www.carbonbrief.org/" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm transition-colors cursor-pointer"
              >
                Our Mission
              </a>
            </li>
            <li>
              <span className="text-slate-400 text-xs md:text-sm">
                Data Sources: EPA, IPCC, CEA India
              </span>
            </li>
            <li>
              <span className="text-slate-400 text-xs md:text-sm">
                Privacy Policy
              </span>
            </li>
            <li>
              <a 
                href="mailto:support@ecosphereai.com"
                className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm transition-colors cursor-pointer"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="text-slate-500 text-[10px] md:text-xs flex items-center flex-wrap justify-center md:justify-start gap-2">
          <span>&copy; 2026 EcoSphere AI. Built with <span className="text-emerald-400">💚</span> for our planet.</span>
          <span className="hidden md:inline text-white/20">|</span>
          <a 
            href="/presentation.html" 
            target="_blank" 
            rel="noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full cursor-pointer hover:bg-emerald-500/20 transition-all text-[10px]"
          >
            📊 Project PPT Slideshow
          </a>
        </div>
        <div className="text-slate-500 text-[10px] md:text-xs max-w-md">
          Carbon calculations are grounded in localized India CEA grid intensity (~0.82 kg CO₂/kWh) & standard IPCC reports. Individual results may vary.
        </div>
      </div>
    </footer>
  );
}
