import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Leaf } from "lucide-react";

export function OpeningSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      // Step 0: Initial greeting message
      await new Promise(r => setTimeout(r, 1500));
      
      // Step 1: Transition to the falling leaf animation
      setStep(1);
      
      // Stay on the animation for 3.5 seconds to fully complete the falling sequence
      await new Promise(r => setTimeout(r, 3500));
      
      // Transition to main layout
      onComplete();
    };
    sequence();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A] overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-4xl font-display font-medium text-slate-200 tracking-wide">
              Every action leaves a footprint.
            </h1>
          </motion.div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center gap-6">
             {/* Smooth physics gravity drop, leaf sway, and swirling rotation */}
             <motion.div
                initial={{ y: "-110vh", opacity: 0, rotate: -60 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  x: [-70, 60, -35, 15, 0],
                  rotate: [-60, 45, -25, 10, 0]
                }}
                transition={{ 
                  duration: 2.8, 
                  ease: [0.25, 1, 0.5, 1] // Custom ease-out drag curve
                }}
                className="relative flex items-center justify-center"
             >
               <Leaf className="w-16 h-16 text-green-400 z-10 filter drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
             </motion.div>

            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 1.0 }}
              className="text-xl md:text-3xl font-display text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500"
            >
              Transforming awareness into action.
            </motion.h2>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
