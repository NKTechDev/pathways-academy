import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  className?: string;
  prefix?: string;   // e.g., "Meet "
  highlight?: string; // e.g., "Pathways International School"
  cycleDelay?: number; // delay before restarting (ms)
  typeSpeed?: number;  // per-letter delay (ms)
};

export default function AnimatedMarqueeTitle({
  className = "",
  prefix = "Meet ",
  highlight = "Pathways International School",
  cycleDelay = 900,    // pause after full line
  typeSpeed = 150,      // lower = faster typing
}: Props) {
  const [cycleKey, setCycleKey] = useState(0);

  // Split into spans so each letter animates
  const prefixChars = useMemo(() => prefix.split(""), [prefix]);
  const highlightChars = useMemo(() => highlight.split(""), [highlight]);

  // total duration for one typing cycle
  const totalChars = prefixChars.length + highlightChars.length;
  const totalTypeTime = totalChars * typeSpeed + cycleDelay;

  // re-trigger animation to loop
  useEffect(() => {
    const id = setTimeout(() => setCycleKey((k) => k + 1), totalTypeTime);
    return () => clearTimeout(id);
  }, [totalTypeTime, cycleKey]);

  // container variants to stagger letters
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: typeSpeed / 1000, // seconds between letters
      },
    },
  };

  // each letter animates from transparent + slight up
  const letter = {
    hidden: { opacity: 0, y: -8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" } },
  };

  return (
    <div className="relative">
      {/* aria-live ensures screen readers hear final text without getting spammed */}
      <h1
        className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-center ${className}`}
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={cycleKey}
            className="inline-block"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Prefix (slate-800) */}
            <span className="text-slate-800">
              {prefixChars.map((ch, i) => (
                <motion.span key={`p-${i}`} variants={letter}>
                  {ch}
                </motion.span>
              ))}
            </span>

            {/* Highlight (slate-900) */}
            <span className="text-slate-900">
              {highlightChars.map((ch, i) => (
                <motion.span key={`h-${i}`} variants={letter}>
                  {ch}
                </motion.span>
              ))}
            </span>
          </motion.span>
        </AnimatePresence>
      </h1>
    </div>
  );
}
