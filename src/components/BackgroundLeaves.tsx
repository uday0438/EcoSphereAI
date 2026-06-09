import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

// ─── Realistic Botanical Leaf SVG Variants ─────────────────────────────────
// Each is a distinct, botanically-accurate leaf shape with midrib, secondary
// veins, natural bezier curves, and a petiole (stem).

const OvateLeaf = ({ fill, vein }: { fill: string; vein: string }) => (
  <svg viewBox="0 0 80 125" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    {/* Leaf body – classic ovate shape, pointed tip, rounded base */}
    <path
      d="M 40 5
         C 55 5 70 20 73 44
         C 76 66 67 90 40 108
         C 13 90 4 66 7 44
         C 10 20 25 5 40 5 Z"
      fill={fill}
    />
    {/* Midrib */}
    <line x1="40" y1="8" x2="40" y2="106" stroke={vein} strokeWidth="1.4" strokeLinecap="round" opacity="0.75"/>
    {/* Left secondary veins */}
    <path d="M 40 26 Q 28 31 16 34" stroke={vein} strokeWidth="0.85" fill="none" strokeLinecap="round" opacity="0.55"/>
    <path d="M 40 40 Q 26 46 12 49" stroke={vein} strokeWidth="0.85" fill="none" strokeLinecap="round" opacity="0.5"/>
    <path d="M 40 54 Q 27 59 14 62" stroke={vein} strokeWidth="0.8"  fill="none" strokeLinecap="round" opacity="0.45"/>
    <path d="M 40 68 Q 29 72 18 75" stroke={vein} strokeWidth="0.7"  fill="none" strokeLinecap="round" opacity="0.4"/>
    <path d="M 40 82 Q 32 85 24 87" stroke={vein} strokeWidth="0.6"  fill="none" strokeLinecap="round" opacity="0.35"/>
    {/* Right secondary veins */}
    <path d="M 40 26 Q 52 31 64 34" stroke={vein} strokeWidth="0.85" fill="none" strokeLinecap="round" opacity="0.55"/>
    <path d="M 40 40 Q 54 46 68 49" stroke={vein} strokeWidth="0.85" fill="none" strokeLinecap="round" opacity="0.5"/>
    <path d="M 40 54 Q 53 59 66 62" stroke={vein} strokeWidth="0.8"  fill="none" strokeLinecap="round" opacity="0.45"/>
    <path d="M 40 68 Q 51 72 62 75" stroke={vein} strokeWidth="0.7"  fill="none" strokeLinecap="round" opacity="0.4"/>
    <path d="M 40 82 Q 48 85 56 87" stroke={vein} strokeWidth="0.6"  fill="none" strokeLinecap="round" opacity="0.35"/>
    {/* Petiole (stem) */}
    <path d="M 40 107 Q 40 114 39 122" stroke={vein} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85"/>
  </svg>
);

const MapleLeaf = ({ fill, vein }: { fill: string; vein: string }) => (
  <svg viewBox="0 0 100 118" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    {/* 5-lobed maple leaf outline */}
    <path
      d="M 50 2
         C 48 9 43 11 38 9
         C 36 15 31 16 26 13
         C 28 20 24 25 17 23
         C 20 29 16 35 11 36
         C 16 39 18 44 15 49
         C 21 47 27 49 30 55
         C 24 57 17 58 14 64
         C 21 62 27 64 32 70
         L 36 95 L 44 95 L 44 80 L 56 80 L 56 95 L 64 95
         L 68 70
         C 73 64 79 62 86 64
         C 83 58 76 57 70 55
         C 73 49 79 47 85 49
         C 82 44 84 39 89 36
         C 84 35 80 29 83 23
         C 76 25 72 20 74 13
         C 69 16 64 15 62 9
         C 57 11 52 9 50 2 Z"
      fill={fill}
    />
    {/* Central vein */}
    <line x1="50" y1="5" x2="50" y2="92" stroke={vein} strokeWidth="1.2" strokeLinecap="round" opacity="0.65"/>
    {/* Lobe veins */}
    <path d="M 50 32 Q 36 38 22 42" stroke={vein} strokeWidth="0.85" fill="none" strokeLinecap="round" opacity="0.5"/>
    <path d="M 50 32 Q 64 38 78 42" stroke={vein} strokeWidth="0.85" fill="none" strokeLinecap="round" opacity="0.5"/>
    <path d="M 50 50 Q 38 54 28 58" stroke={vein} strokeWidth="0.75" fill="none" strokeLinecap="round" opacity="0.45"/>
    <path d="M 50 50 Q 62 54 72 58" stroke={vein} strokeWidth="0.75" fill="none" strokeLinecap="round" opacity="0.45"/>
    <path d="M 50 65 Q 42 68 35 70" stroke={vein} strokeWidth="0.65" fill="none" strokeLinecap="round" opacity="0.4"/>
    <path d="M 50 65 Q 58 68 65 70" stroke={vein} strokeWidth="0.65" fill="none" strokeLinecap="round" opacity="0.4"/>
    {/* Stem */}
    <path d="M 50 93 L 50 115" stroke={vein} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.85"/>
  </svg>
);

const LanceLeaf = ({ fill, vein }: { fill: string; vein: string }) => (
  <svg viewBox="0 0 50 130" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    {/* Narrow lanceolate (willow-like) shape */}
    <path
      d="M 25 3
         C 30 14 36 32 35 56
         C 34 78 30 96 25 108
         C 20 96 16 78 15 56
         C 14 32 20 14 25 3 Z"
      fill={fill}
    />
    {/* Midrib */}
    <line x1="25" y1="5" x2="25" y2="107" stroke={vein} strokeWidth="1.3" strokeLinecap="round" opacity="0.75"/>
    {/* Left veins */}
    <path d="M 25 20 Q 20 24 15 25" stroke={vein} strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.5"/>
    <path d="M 25 34 Q 19 38 14 39" stroke={vein} strokeWidth="0.65" fill="none" strokeLinecap="round" opacity="0.47"/>
    <path d="M 25 50 Q 19 54 14 55" stroke={vein} strokeWidth="0.65" fill="none" strokeLinecap="round" opacity="0.43"/>
    <path d="M 25 66 Q 20 69 15 70" stroke={vein} strokeWidth="0.6"  fill="none" strokeLinecap="round" opacity="0.38"/>
    <path d="M 25 82 Q 21 84 17 85" stroke={vein} strokeWidth="0.55" fill="none" strokeLinecap="round" opacity="0.32"/>
    <path d="M 25 95 Q 22 97 19 98" stroke={vein} strokeWidth="0.5"  fill="none" strokeLinecap="round" opacity="0.28"/>
    {/* Right veins */}
    <path d="M 25 20 Q 30 24 35 25" stroke={vein} strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.5"/>
    <path d="M 25 34 Q 31 38 36 39" stroke={vein} strokeWidth="0.65" fill="none" strokeLinecap="round" opacity="0.47"/>
    <path d="M 25 50 Q 31 54 36 55" stroke={vein} strokeWidth="0.65" fill="none" strokeLinecap="round" opacity="0.43"/>
    <path d="M 25 66 Q 30 69 35 70" stroke={vein} strokeWidth="0.6"  fill="none" strokeLinecap="round" opacity="0.38"/>
    <path d="M 25 82 Q 29 84 33 85" stroke={vein} strokeWidth="0.55" fill="none" strokeLinecap="round" opacity="0.32"/>
    <path d="M 25 95 Q 28 97 31 98" stroke={vein} strokeWidth="0.5"  fill="none" strokeLinecap="round" opacity="0.28"/>
    {/* Stem */}
    <path d="M 25 107 Q 25 117 24 126" stroke={vein} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.85"/>
  </svg>
);

const RoundLeaf = ({ fill, vein }: { fill: string; vein: string }) => (
  <svg viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    {/* Broad orbicular leaf */}
    <path
      d="M 50 8
         C 68 8 84 20 89 38
         C 94 56 88 76 74 86
         C 65 93 58 96 50 97
         C 42 96 35 93 26 86
         C 12 76 6 56 11 38
         C 16 20 32 8 50 8 Z"
      fill={fill}
    />
    {/* Midrib */}
    <line x1="50" y1="10" x2="50" y2="95" stroke={vein} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
    {/* Left veins */}
    <path d="M 50 26 Q 36 31 22 36" stroke={vein} strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.52"/>
    <path d="M 50 42 Q 33 48 17 53" stroke={vein} strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.48"/>
    <path d="M 50 58 Q 35 63 22 67" stroke={vein} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.43"/>
    <path d="M 50 74 Q 38 77 28 80" stroke={vein} strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.38"/>
    <path d="M 50 87 Q 42 89 35 90" stroke={vein} strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.3"/>
    {/* Right veins */}
    <path d="M 50 26 Q 64 31 78 36" stroke={vein} strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.52"/>
    <path d="M 50 42 Q 67 48 83 53" stroke={vein} strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.48"/>
    <path d="M 50 58 Q 65 63 78 67" stroke={vein} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.43"/>
    <path d="M 50 74 Q 62 77 72 80" stroke={vein} strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.38"/>
    <path d="M 50 87 Q 58 89 65 90" stroke={vein} strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.3"/>
    {/* Stem */}
    <path d="M 50 96 Q 50 105 49 113" stroke={vein} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.85"/>
  </svg>
);

const GinkgoLeaf = ({ fill, vein }: { fill: string; vein: string }) => (
  <svg viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    {/* Ginkgo / fan-shaped leaf – two-lobed with notch at top */}
    <path
      d="M 50 82
         C 35 80 16 68 10 52
         C 4 36 10 18 20 12
         C 26 8 32 10 36 16
         C 38 12 42 8 46 6
         C 48 5 50 5 50 5
         C 50 5 52 5 54 6
         C 58 8 62 12 64 16
         C 68 10 74 8 80 12
         C 90 18 96 36 90 52
         C 84 68 65 80 50 82 Z"
      fill={fill}
    />
    {/* Fan veins radiating from base */}
    <path d="M 50 80 L 50 8"  stroke={vein} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.65"/>
    <path d="M 50 80 L 28 14" stroke={vein} strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.55"/>
    <path d="M 50 80 L 72 14" stroke={vein} strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.55"/>
    <path d="M 50 80 L 12 34" stroke={vein} strokeWidth="0.75" fill="none" strokeLinecap="round" opacity="0.45"/>
    <path d="M 50 80 L 88 34" stroke={vein} strokeWidth="0.75" fill="none" strokeLinecap="round" opacity="0.45"/>
    <path d="M 50 80 L 8 54"  stroke={vein} strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.38"/>
    <path d="M 50 80 L 92 54" stroke={vein} strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.38"/>
    {/* Stem */}
    <path d="M 50 81 Q 50 94 49 112" stroke={vein} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.88"/>
  </svg>
);

// ─── Types ─────────────────────────────────────────────────────────────────

type LeafComponent = (props: { fill: string; vein: string }) => React.ReactNode;

const LEAF_VARIANTS: LeafComponent[] = [
  OvateLeaf,
  MapleLeaf,
  LanceLeaf,
  RoundLeaf,
  GinkgoLeaf,
];

// Natural green palette: [leaf fill, vein color]
const LEAF_PALETTE = [
  { fill: "rgba(52, 211, 153, 0.55)",  vein: "rgba(5, 80, 55, 0.9)"  },
  { fill: "rgba(74, 222, 128, 0.50)",  vein: "rgba(20, 83, 45, 0.85)" },
  { fill: "rgba(34, 197, 94, 0.52)",   vein: "rgba(22, 101, 52, 0.88)"},
  { fill: "rgba(16, 185, 129, 0.50)",  vein: "rgba(6, 78, 59, 0.9)"   },
  { fill: "rgba(110, 231, 183, 0.46)", vein: "rgba(6, 95, 70, 0.82)"  },
  { fill: "rgba(21, 128, 61, 0.48)",   vein: "rgba(10, 60, 30, 0.88)" },
];

interface LeafItem {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  swayAmount: number;
  variant: number;
  colorIdx: number;
}

export function BackgroundLeaves() {
  const [leaves, setLeaves] = useState<LeafItem[]>([]);

  useEffect(() => {
    const leafList: LeafItem[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: 2 + Math.random() * 94,
      delay: Math.random() * 24,
      // Base 16–30px × 1.15 size boost = ~18–35px
      size: Math.round((16 + Math.random() * 19) * 1.15),
      duration: 22 + Math.random() * 26,
      rotate: Math.random() * 360,
      swayAmount: 4 + Math.random() * 9,
      variant: i % LEAF_VARIANTS.length,
      colorIdx: i % LEAF_PALETTE.length,
    }));
    setLeaves(leafList);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {leaves.map((leaf) => {
        const { fill, vein } = LEAF_PALETTE[leaf.colorIdx];
        const LeafShape = LEAF_VARIANTS[leaf.variant];

        return (
          <motion.div
            key={leaf.id}
            initial={{
              y: "-6vh",
              x: `${leaf.left}vw`,
              rotate: leaf.rotate,
              opacity: 0,
            }}
            animate={{
              y: "106vh",
              x: [
                `${leaf.left}vw`,
                `${leaf.left + leaf.swayAmount}vw`,
                `${leaf.left - leaf.swayAmount * 0.8}vw`,
                `${leaf.left + leaf.swayAmount * 0.4}vw`,
                `${leaf.left - leaf.swayAmount * 0.15}vw`,
                `${leaf.left}vw`,
              ],
              rotate: [
                leaf.rotate,
                leaf.rotate + 55,
                leaf.rotate + 120,
                leaf.rotate + 200,
                leaf.rotate + 290,
                leaf.rotate + 360,
              ],
              opacity: [0, 0.92, 0.92, 0.92, 0.92, 0],
            }}
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: leaf.size,
              height: leaf.size,
              filter: "drop-shadow(0 2px 5px rgba(16,185,129,0.22))",
            }}
          >
            <LeafShape fill={fill} vein={vein} />
          </motion.div>
        );
      })}
    </div>
  );
}
