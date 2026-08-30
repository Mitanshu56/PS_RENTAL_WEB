"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function Navbar({ introState }: { introState: "playing" | "fading" | "done" }) {
  const isVisible = introState === "fading" || introState === "done";
  
  // Guard flag for the one-time PlayStation 5 power-on light sweep
  const [shouldSweep, setShouldSweep] = useState(false);
  const sweepHasPlayed = useRef(false);

  useEffect(() => {
    // Trigger the sweep exactly ONCE, slightly delayed after the header starts fading in
    if (isVisible && !sweepHasPlayed.current) {
      sweepHasPlayed.current = true;
      const timer = setTimeout(() => {
        setShouldSweep(true);
      }, 200); // 0.2s delay so it feels like a sequence
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 h-16 z-50 flex items-center justify-between px-6 md:px-12 bg-[#050505]/70 backdrop-blur-lg border-b border-white/5 ${
        introState === "playing" ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {/* 
        ONE-TIME PS5 POWER-ON SWEEP 
        Sits on top of the steady ambient glow and slides across exactly once.
      */}
      {shouldSweep && (
        <motion.div
          initial={{ left: "-25%", opacity: 0 }}
          animate={{ left: "125%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1, ease: [0.45, 0, 0.55, 1], times: [0, 0.2, 0.8, 1] }} // power2.inOut
          onAnimationComplete={() => setShouldSweep(false)} // Completely unmounts when done!
          className="absolute bottom-[0px] w-[25%] h-[1px] z-20 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.8) 30%, rgba(255,255,255,1) 50%, rgba(59,130,246,0.8) 70%, transparent 100%)",
            boxShadow: "0 0 10px rgba(59,130,246,1), 0 0 20px rgba(59,130,246,0.8)"
          }}
        />
      )}
      {/* 
        PS5 Signature Glowing Edge Light 
        Outer div handles the 0.5s synchronized entrance fade.
        Inner div handles the continuous breathing pulse.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-[#0070CC]/80"
        style={{
          boxShadow: "0 0 8px rgba(0,112,204,0.6), 0 0 20px rgba(0,112,204,0.3), 0 0 40px rgba(0,112,204,0.15)"
        }}
      >
        <motion.div
          animate={{ opacity: [0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="w-full h-full bg-[#3b82f6]"
          style={{
            boxShadow: "0 0 10px rgba(59,130,246,0.8), 0 0 25px rgba(59,130,246,0.5), inset 0 0 4px rgba(255,255,255,0.3)"
          }}
        />
      </motion.div>

      <div className="flex items-center relative z-10">
        <span className="font-bold text-xl tracking-tighter text-white">PLAY RENT</span>
      </div>

      <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-white/70">
        <Link href="#home" className="hover:text-white transition-colors">Home</Link>
        <Link href="#ps5" className="hover:text-white transition-colors">PS5</Link>
        <Link href="#ps4" className="hover:text-white transition-colors">PS4</Link>
        <Link href="#games" className="hover:text-white transition-colors">Games</Link>
        <Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
        <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
      </nav>

      <div className="flex items-center">
        <Link href="#book" className="relative px-6 py-2 text-sm font-bold rounded-full overflow-hidden group bg-brand-accent-blue hover:bg-brand-accent-cyan transition-colors duration-300">
          <span className="relative text-white z-10 shadow-sm">Rent Now</span>
        </Link>
      </div>
    </motion.header>
  );
}
