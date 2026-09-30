"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { GameLibrary } from "@/components/GameLibrary";
import { RentalCards } from "@/components/RentalCards";
import { BookingCTA } from "@/components/BookingCTA";
import { Footer } from "@/components/Footer";
import { GAMES } from "@/data/games";

export function PS4Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Section 2: Story Reveal
  const storyRef = useRef<HTMLDivElement>(null);
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });

  // Filter games suitable for PS4 (most of them are, but check the platform field we added)
  // Since some might not have platform defined, or it might be 'PS4/PS5', we check for 'PS5' exclusive
  // Or just include anything that includes 'PS4' or has no platform.
  const ps4Games = useMemo(() => {
    return GAMES.filter(game => {
      if (!game.platform) return true; // Default to cross-gen if not specified
      return game.platform.includes('PS4');
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020202] text-white selection:bg-[#3b82f6]/30 font-sans overflow-hidden">
      <Navbar introState="done" />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Parallax */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/images/ps4-hero.jpg"
            alt="PlayStation 4 Console"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-screen"
          />
          {/* Gradients for blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-transparent opacity-80" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 md:px-12 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
              <span className="text-sm font-bold tracking-widest uppercase">The Classic</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase mb-6 relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">STILL A </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#3b82f6] to-[#1e40af]">LEGEND.</span>
            </h1>

            <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10">
              The console that defined a generation. An unbeatable library of masterpieces at an incredible value.
            </p>

            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#3b82f6] text-white rounded-full font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all"
            >
              View PS4 Plans
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* STORYTELLING SECTION */}
      <section ref={storyRef} className="py-32 md:py-48 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#050505]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-tight"
          >
            <span className="text-white/40">Perfect for </span>
            <span className="text-white">party gaming. </span>
            <span className="text-white/40">Proven </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]">reliability. </span>
            <span className="text-white/40">A massive catalog of </span>
            <span className="text-white">unforgettable titles.</span>
          </motion.h2>
        </div>
      </section>

      {/* GAME LIBRARY MARQUEE */}
      <div className="border-t border-white/5 py-24 bg-[#020202]">
        <div className="text-center mb-16 px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">The PS4 Library.</h2>
          <p className="text-white/50 text-lg font-medium">Thousands of hits ready to play.</p>
        </div>
        <GameLibrary games={ps4Games} />
      </div>

      {/* PRICING SECTION */}
      <RentalCards defaultConsole="ps4" hideToggle={true} />

      <BookingCTA showOnly="ps4" />
      <Footer />
    </div>
  );
}
