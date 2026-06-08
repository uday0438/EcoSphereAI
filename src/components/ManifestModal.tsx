import { motion, AnimatePresence } from "motion/react";
import { X, Leaf, Globe, Zap, Heart, Shield, ArrowRight } from "lucide-react";
import { useEffect } from "react";

interface ManifestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterApp?: () => void;
}

const PRINCIPLES = [
  {
    icon: Globe,
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    border: "border-blue-500/20",
    title: "Radical Transparency",
    body:
      "Every gram of CO₂ you produce is visible, measurable, and actionable. We believe awareness is the first step toward meaningful change — no greenwashing, no vague pledges.",
  },
  {
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
    border: "border-amber-500/20",
    title: "AI as Your Ally",
    body:
      "We harness Google's Gemini to act as your personal climate coach — not to judge, but to guide. Intelligent suggestions, tailored to your life, delivered in real time.",
  },
  {
    icon: Heart,
    color: "text-rose-400",
    bg: "bg-rose-500/15",
    border: "border-rose-500/20",
    title: "People-First Design",
    body:
      "Sustainability cannot be a privilege. Our tools are built to be accessible, inclusive, and frictionless — because the planet needs everyone, not just the eco-elite.",
  },
  {
    icon: Shield,
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/20",
    title: "Accountability Over Aesthetics",
    body:
      "Pretty dashboards mean nothing without real impact. We track, measure, and celebrate genuine reductions — because the Earth doesn't care about optics.",
  },
  {
    icon: Leaf,
    color: "text-green-400",
    bg: "bg-green-500/15",
    border: "border-green-500/20",
    title: "Every Action Compounds",
    body:
      "A single meatless meal, a skipped flight, a solar panel installed — these ripple outward. EcoSphere exists to make those ripples visible, rewarding, and contagious.",
  },
];

export function ManifestModal({ isOpen, onClose, onEnterApp }: ManifestModalProps) {
  const handleReadyClick = () => {
    onClose();
    if (onEnterApp) onEnterApp();
  };
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="manifest-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            key="manifest-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="manifest-title"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
          >
            <div
              className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl
                         bg-slate-900/95 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]
                         backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header gradient bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 rounded-t-3xl" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white
                           hover:bg-white/10 transition-all cursor-pointer active:scale-95
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label="Close manifest"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-10">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                                bg-emerald-500/15 border border-emerald-500/25 mb-6">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">
                    The EcoSphere Manifesto
                  </span>
                </div>

                {/* Title */}
                <h2
                  id="manifest-title"
                  className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight"
                >
                  We believe the future{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-500">
                    is still worth fighting for.
                  </span>
                </h2>

                {/* Opening paragraph */}
                <p className="text-slate-400 text-base leading-relaxed mb-10">
                  The climate crisis is not a distant headline. It is the rising thermometer
                  in your city, the dying reef your children will never see, and the wildfires
                  rewriting maps in real time. EcoSphere AI was built on a single conviction:{" "}
                  <span className="text-slate-200 font-medium">
                    technology, in the right hands, can bend the curve.
                  </span>
                </p>

                {/* Divider */}
                <div className="border-t border-white/8 mb-10" />

                {/* Principles */}
                <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-6">
                  Our Five Principles
                </h3>

                <div className="flex flex-col gap-5">
                  {PRINCIPLES.map((p, i) => {
                    const Icon = p.icon;
                    return (
                      <motion.div
                        key={p.title}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
                        className={`flex gap-4 p-5 rounded-2xl ${p.bg} border ${p.border}`}
                      >
                        <div className={`w-10 h-10 shrink-0 rounded-xl ${p.bg} border ${p.border}
                                        flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${p.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{p.title}</h4>
                          <p className="text-sm text-slate-400 leading-relaxed">{p.body}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Closing CTA */}
                <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-600/5
                                border border-emerald-500/20 text-center">
                  <p className="text-slate-300 text-sm leading-relaxed mb-1">
                    "The greatest threat to our planet is the belief that someone else will save it."
                  </p>
                  <p className="text-xs text-slate-500 mb-5">— Robert Swan</p>
                  <button
                    type="button"
                    onClick={handleReadyClick}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400
                               text-slate-900 rounded-full font-semibold text-sm transition-all
                               cursor-pointer active:scale-95 hover:scale-105 shadow-lg shadow-emerald-500/20"
                  >
                    I&#x27;m ready to act <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
