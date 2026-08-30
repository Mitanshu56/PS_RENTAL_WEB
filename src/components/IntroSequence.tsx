"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<"text" | "video">("text");

  useEffect(() => {
    // Sequence timing
    const textTimer = setTimeout(() => {
      setStep("video");
    }, 2500); // Show text for 2.5s before transitioning to video

    return () => clearTimeout(textTimer);
  }, []);

  return (
    <motion.div
      key="intro-sequence"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }} // Simple 0.6s fade out on unmount
      className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center pointer-events-auto"
    >
      <AnimatePresence mode="wait">
        
        {/* STEP 1: TEXT */}
        {step === "text" && (
          <motion.div
            key="text"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-widest text-white mb-4 uppercase">
              PS Rental
            </h1>
            <p className="text-white/60 font-medium tracking-widest uppercase text-sm">
              Press Play on Reality.
            </p>
          </motion.div>
        )}

        {/* STEP 2: VIDEO */}
        {step === "video" && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full bg-[#050505]"
          >
            <video
              src="/test_3.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center"
              onEnded={() => {
                onComplete();
              }}
            />
            
            {/* Skip Button */}
            <button
              onClick={() => {
                onComplete();
              }}
              className="absolute bottom-8 right-8 px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase rounded-full transition-colors border border-white/10 z-10"
            >
              Skip Intro
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
}
