import { motion, AnimatePresence } from "motion/react";
import { X, Award, Share2, Calendar, ShieldCheck, Check } from "lucide-react";
import { useState } from "react";

interface GreenCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  streak?: number;
  rank?: string;
}

export function GreenCertificateModal({ 
  isOpen, 
  onClose, 
  userName = "Climate Warrior", 
  streak = 14, 
  rank = "Eco Warrior" 
}: GreenCertificateModalProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const fakeLink = `${window.location.origin}/achievement/warrior-${Date.now()}`;
    navigator.clipboard.writeText(fakeLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Certificate Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg glass-card rounded-3xl overflow-hidden border border-emerald-500/20 shadow-[0_25px_60px_rgba(16,185,129,0.15)] bg-slate-900/90 text-slate-100"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-green-500 via-emerald-400 to-blue-500" />

            {/* Header close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10 text-center flex flex-col items-center">
              {/* Gold/Green Ribbon Seal */}
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-emerald-500/20 rounded-full border-dashed"
                />
                <div className="w-18 h-18 bg-emerald-500/20 rounded-full flex items-center justify-center relative shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <Award className="text-emerald-400 w-10 h-10" />
                </div>
              </div>

              {/* Certificate Title */}
              <h2 className="text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-1">
                EcoSphere AI Climate Network
              </h2>
              <h3 className="text-2xl font-display font-bold text-white tracking-tight mb-6">
                Certificate of Climate Merit
              </h3>

              {/* Certificate Body */}
              <div className="space-y-4 max-w-sm mb-8 border-y border-slate-700/40 py-6">
                <p className="text-sm text-slate-400">
                  This certifies that
                </p>
                <p className="text-xl font-display font-semibold text-white tracking-tight">
                  {userName}
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  has achieved the rank of <strong className="text-emerald-400 font-semibold">{rank}</strong> and maintained a carbon-saving streak of <strong className="text-white font-semibold">{streak} Days</strong>.
                </p>
                <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Verified Carbon Impact
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    June 2026
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={handleShare}
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-98"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-5 h-5" />
                      Share to LinkedIn
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-full font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
