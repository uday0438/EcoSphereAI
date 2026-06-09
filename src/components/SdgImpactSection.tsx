import React from "react";
import { motion } from "motion/react";
import { Leaf, ShieldAlert, GraduationCap, Activity, ShoppingCart, Zap, Trees, CheckCircle, Globe } from "lucide-react";

interface SdgCardProps {
  number: number;
  title: string;
  desc: string;
  progress: number;
  features: string[];
  metric: string;
  color: string;
  icon: React.ReactNode;
}

const secondarySdgs: SdgCardProps[] = [
  {
    number: 12,
    title: "Responsible Consumption & Production",
    desc: "Promotes sustainable purchasing decisions, recycling awareness, food sustainability, waste reduction, and responsible consumption habits.",
    progress: 74,
    features: [
      "Sustainable Shopping Challenge",
      "Food Footprint Analyzer",
      "Recycling Rush",
      "Waste Reduction Missions",
      "Receipt Analysis"
    ],
    metric: "12,400 kg waste sorted & reused",
    color: "from-amber-400 to-yellow-500 shadow-amber-500/5",
    icon: <ShoppingCart className="w-5 h-5 text-amber-400" />
  },
  {
    number: 11,
    title: "Sustainable Cities & Communities",
    desc: "Encourages sustainable transportation, greener communities, and environmentally responsible urban lifestyles.",
    progress: 68,
    features: [
      "Green Transport Challenge",
      "Sustainable City Builder",
      "Community Challenges",
      "Green Campus Challenge"
    ],
    metric: "82,500 km clean commutes tracked",
    color: "from-orange-400 to-red-500 shadow-orange-500/5",
    icon: <Trees className="w-5 h-5 text-orange-400" />
  },
  {
    number: 7,
    title: "Affordable & Clean Energy",
    desc: "Educates users about renewable energy resources and energy-efficient living practices.",
    progress: 81,
    features: [
      "Renewable Energy Tycoon",
      "Energy Saver Simulator",
      "Home Energy Insights"
    ],
    metric: "450 MWh energy saved or offset",
    color: "from-yellow-400 to-amber-500 shadow-yellow-500/5",
    icon: <Zap className="w-5 h-5 text-yellow-400" />
  },
  {
    number: 4,
    title: "Quality Education",
    desc: "Provides interactive sustainability education through AI learning experiences and gamified environmental awareness.",
    progress: 92,
    features: [
      "Climate Quiz Arena",
      "AI Climate Mentor",
      "Sustainability Learning Modules",
      "Educational Challenges"
    ],
    metric: "240,000+ learning actions log",
    color: "from-rose-400 to-pink-500 shadow-rose-500/5",
    icon: <GraduationCap className="w-5 h-5 text-rose-400" />
  },
  {
    number: 3,
    title: "Good Health & Well-Being",
    desc: "Encourages healthier and more sustainable lifestyle choices through active transportation and eco-friendly habits.",
    progress: 78,
    features: [
      "Walking Challenges",
      "Cycling Missions",
      "Healthy Food Choices"
    ],
    metric: "1.2M active transport steps",
    color: "from-emerald-400 to-green-500 shadow-emerald-500/5",
    icon: <Activity className="w-5 h-5 text-emerald-400" />
  }
];

export function SdgImpactSection() {
  return (
    <section className="py-24 px-6 md:px-16 relative overflow-hidden max-w-none mx-auto w-full">
      {/* Background soft glowing orbs */}
      <div className="absolute top-1/4 left-1/10 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Title Header */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-emerald-400 mb-4 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Global Goals Alignment
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mb-6 leading-tight">
            🌍 UN Sustainable Development Goals Impact
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            EcoSphere AI contributes to multiple United Nations Sustainable Development Goals by promoting sustainable habits, environmental awareness, responsible consumption, climate action, and community engagement.
          </p>
        </motion.div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
        
        {/* Featured Primary SDG Card (SDG 13 - occupying 2 columns on lg) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 glass-card rounded-3xl p-8 border border-emerald-500/20 bg-slate-900/40 relative overflow-hidden group flex flex-col justify-between shadow-xl shadow-emerald-500/5 min-h-[380px]"
        >
          {/* Top glowing bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />
          
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-xl shadow-md"
                >
                  <Globe className="w-6 h-6 text-emerald-400" />
                </motion.div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                    Goal 13 · Primary Focus
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">Climate Action</h3>
                </div>
              </div>

              {/* Progress ring or percentage */}
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-display font-black text-emerald-400">87%</span>
                <span className="block text-[8px] text-slate-500 font-bold uppercase tracking-wider">Progress Alignment</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              EcoSphere AI helps users understand, track, predict, and reduce their carbon footprint through AI-powered recommendations, personalized missions, sustainability education, and behavior-change mechanisms.
            </p>

            {/* List of features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mb-6">
              {[
                "Carbon Footprint Analysis",
                "AI Sustainability Coach",
                "Climate Time Machine",
                "Carbon Reduction Missions",
                "Environmental Impact Tracking",
                "Eco Challenges"
              ].map((feat, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-auto">
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Estimated Impact Metrics</span>
              <span className="text-sm font-bold text-white font-mono mt-0.5 block">🔥 4.2M kg CO₂ Slain Globally</span>
            </div>
            
            {/* Animated progress bar */}
            <div className="w-full sm:w-48">
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "87%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* SDG 12 Card (occupies 1 column) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-3xl p-8 border border-white/8 bg-slate-900/40 relative overflow-hidden group flex flex-col justify-between shadow-xl min-h-[380px]"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-yellow-500 opacity-60" />
          
          <div>
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-2.5">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center"
                >
                  {secondarySdgs[0].icon}
                </motion.div>
                <div>
                  <span className="text-[8px] uppercase tracking-wider font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    Goal 12
                  </span>
                  <h4 className="text-sm font-display font-bold text-white mt-0.5">Responsible Consumption</h4>
                </div>
              </div>
              <span className="text-xl font-display font-black text-amber-400">{secondarySdgs[0].progress}%</span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed mb-5">{secondarySdgs[0].desc}</p>

            <div className="space-y-1.5 mb-5">
              {secondarySdgs[0].features.map((f, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <CheckCircle className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 mt-auto">
            <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold">Impact Metric</span>
            <span className="text-xs font-bold text-white font-mono mt-0.5 block">{secondarySdgs[0].metric}</span>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mt-3">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${secondarySdgs[0].progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-500"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grid for the remaining secondary goals (SDG 11, 7, 4, 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
        {secondarySdgs.slice(1).map((sdg, index) => (
          <motion.div
            key={sdg.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="glass-card rounded-3xl p-6 border border-white/8 bg-slate-900/40 relative overflow-hidden group flex flex-col justify-between shadow-xl min-h-[350px]"
          >
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${sdg.color} opacity-60`} />
            
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3.2, delay: index * 0.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center"
                  >
                    {sdg.icon}
                  </motion.div>
                  <div>
                    <span className="text-[8px] uppercase tracking-wider font-black text-slate-500 bg-white/4 px-1.5 py-0.5 rounded">
                      Goal {sdg.number}
                    </span>
                    <h4 className="text-xs font-display font-bold text-white mt-0.5 truncate max-w-[120px]">{sdg.title}</h4>
                  </div>
                </div>
                <span className="text-lg font-display font-black text-white/80">{sdg.progress}%</span>
              </div>

              <p className="text-slate-400 text-[11px] leading-relaxed mb-4">{sdg.desc}</p>

              <div className="space-y-1.5 mb-4">
                {sdg.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <CheckCircle className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-3 mt-auto">
              <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold">Impact Metric</span>
              <span className="text-xs font-bold text-white font-mono mt-0.5 block truncate">{sdg.metric}</span>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-3">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${sdg.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${sdg.color}`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Impact Dashboard Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto p-8 rounded-3xl bg-slate-900/60 border border-white/8 backdrop-blur-xl mb-16 shadow-2xl relative overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-6 flex items-center gap-2">
          📊 EcoSphere AI SDG Impact Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col justify-between h-[110px]">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Primary Goal</span>
            <span className="text-2xl mt-1 block">🌿</span>
            <span className="text-xs font-bold text-emerald-400 font-display">SDG 13 - Climate</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/3 border border-white/5 flex flex-col justify-between h-[110px]">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Supporting</span>
            <span className="text-2xl mt-1 block">🛍️</span>
            <span className="text-xs font-bold text-slate-300 font-display">SDG 12 - Consumption</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/3 border border-white/5 flex flex-col justify-between h-[110px]">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Supporting</span>
            <span className="text-2xl mt-1 block">🏙️</span>
            <span className="text-xs font-bold text-slate-300 font-display">SDG 11 - Cities</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/3 border border-white/5 flex flex-col justify-between h-[110px]">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Supporting</span>
            <span className="text-2xl mt-1 block">⚡</span>
            <span className="text-xs font-bold text-slate-300 font-display">SDG 7 - Clean Energy</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/3 border border-white/5 flex flex-col justify-between h-[110px]">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Supporting</span>
            <span className="text-2xl mt-1 block">🎓</span>
            <span className="text-xs font-bold text-slate-300 font-display">SDG 4 - Education</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/3 border border-white/5 flex flex-col justify-between h-[110px]">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Supporting</span>
            <span className="text-2xl mt-1 block">❤️</span>
            <span className="text-xs font-bold text-slate-300 font-display">SDG 3 - Wellbeing</span>
          </div>
        </div>
      </motion.div>

      {/* Mission Statement */}
      <div className="max-w-4xl mx-auto text-center border-t border-white/5 pt-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs sm:text-sm text-slate-500 leading-relaxed italic max-w-2xl mx-auto"
        >
          &ldquo;EcoSphere AI empowers individuals to create measurable environmental impact through AI-powered sustainability guidance, gamified behavior change, and climate-conscious decision making, directly contributing to multiple United Nations Sustainable Development Goals.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
