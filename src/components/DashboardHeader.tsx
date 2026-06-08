import { motion } from "motion/react";
import { Award } from "lucide-react";

interface HeaderProps {
  userName?: string;
  onOpenCertificate?: () => void;
}

export function Header({ userName = "Climate Warrior", onOpenCertificate }: HeaderProps) {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between w-full pb-8 border-b border-white/5 mb-8">
      <div>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-display font-medium text-white tracking-tight"
        >
          Good Morning, {userName} <span className="inline-block animate-bounce ml-2">👋</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 mt-1"
        >
          You can reduce <span className="text-green-400 font-medium">12% emissions</span> this month.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 md:mt-0 flex items-center gap-5 bg-slate-800/50 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-white/10"
      >
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Streak</span>
          <span className="text-lg font-display text-white font-medium">14 Days</span>
        </div>
        <div className="w-[1px] h-8 bg-slate-700"></div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Rank</span>
          <span className="text-lg font-display text-emerald-400 font-medium">Eco Warrior</span>
        </div>
        
        {onOpenCertificate && (
          <>
            <div className="w-[1px] h-8 bg-slate-700"></div>
            <button
              onClick={onOpenCertificate}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-md shadow-emerald-500/10"
            >
              <Award className="w-3.5 h-3.5" />
              Certificate
            </button>
          </>
        )}
      </motion.div>
    </header>
  );
}
