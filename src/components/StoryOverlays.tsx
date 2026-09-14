"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import Link from "next/link";

interface StoryOverlaysProps {
  scrollYProgress: MotionValue<number>;
  debug?: boolean;
}

// A reusable component for Apple-style masked text reveals
const MaskedReveal = ({
  children,
  yTransform
}: {
  children: React.ReactNode,
  yTransform: MotionValue<string>
}) => (
  <div className="overflow-hidden inline-block align-bottom leading-[1.0]">
    <motion.div style={{ y: yTransform }} className="inline-block">
      {children}
    </motion.div>
  </div>
);

// Reusable glowing action word
const GlowAccent = ({ children }: { children: React.ReactNode }) => (
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#0070CC] drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse">
    {children}
  </span>
);

export function StoryOverlays({ scrollYProgress, debug = false }: StoryOverlaysProps) {

  // Base Opacity transitions
  const beat1_opacity = useTransform(scrollYProgress, [0, 0.13, 0.15], [1, 1, 0]);
  const beat2_opacity = useTransform(scrollYProgress, [0.15, 0.17, 0.28, 0.30], [0, 1, 1, 0]);
  const beat3_opacity = useTransform(scrollYProgress, [0.30, 0.32, 0.48, 0.50], [0, 1, 1, 0]);
  const beat4_opacity = useTransform(scrollYProgress, [0.50, 0.52, 0.63, 0.65], [0, 1, 1, 0]);
  const beat5_opacity = useTransform(scrollYProgress, [0.65, 0.67, 0.78, 0.80], [0, 1, 1, 0]);
  const beat6_opacity = useTransform(scrollYProgress, [0.80, 0.82, 0.88, 0.90], [0, 1, 1, 0]);
  const beat7_opacity = useTransform(scrollYProgress, [0.90, 0.92, 1.0], [0, 1, 1]);

  // Masked Y transitions ("100%" -> "0%" -> "-100%")
  const beat1_y = useTransform(scrollYProgress, [0, 0.13, 0.15], ["0%", "0%", "-100%"]);
  const beat2_y = useTransform(scrollYProgress, [0.15, 0.17, 0.28, 0.30], ["100%", "0%", "0%", "-100%"]);
  const beat3_y = useTransform(scrollYProgress, [0.30, 0.32, 0.48, 0.50], ["100%", "0%", "0%", "-100%"]);
  const beat4_y = useTransform(scrollYProgress, [0.50, 0.52, 0.63, 0.65], ["100%", "0%", "0%", "-100%"]);
  const beat5_y = useTransform(scrollYProgress, [0.65, 0.67, 0.78, 0.80], ["100%", "0%", "0%", "-100%"]);
  const beat6_y = useTransform(scrollYProgress, [0.80, 0.82, 0.88, 0.90], ["100%", "0%", "0%", "-100%"]);
  const beat7_y = useTransform(scrollYProgress, [0.90, 0.92, 1.0], ["100%", "0%", "0%"]);

  // Visibility toggling to eliminate pointer-event overlaps
  const beat1_visibility = useTransform(beat1_opacity, (v) => (v > 0 ? "visible" : "hidden"));
  const beat2_visibility = useTransform(beat2_opacity, (v) => (v > 0 ? "visible" : "hidden"));
  const beat3_visibility = useTransform(beat3_opacity, (v) => (v > 0 ? "visible" : "hidden"));
  const beat4_visibility = useTransform(beat4_opacity, (v) => (v > 0 ? "visible" : "hidden"));
  const beat5_visibility = useTransform(beat5_opacity, (v) => (v > 0 ? "visible" : "hidden"));
  const beat6_visibility = useTransform(beat6_opacity, (v) => (v > 0 ? "visible" : "hidden"));
  const beat7_visibility = useTransform(beat7_opacity, (v) => (v > 0 ? "visible" : "hidden"));

  const debugStyle = debug ? "border-2 border-red-500 bg-red-500/10" : "";

  const CTAButtons = () => (
    <div className="flex flex-wrap gap-4 pt-2">
      <Link href="/ps5" className="px-8 py-4 bg-[#0070CC] hover:bg-[#00A8FF] text-white text-center font-bold rounded-full transition-all shadow-xl shadow-[#0070CC]/30 hover:shadow-[#0070CC]/60 hover:scale-105">
        RENT PS5
      </Link>
      <Link href="/games" className="px-8 py-4 bg-transparent hover:bg-white/5 text-white text-center font-bold rounded-full transition-colors border border-white/10">
        EXPLORE GAMES
      </Link>
    </div>
  );

  return (
    <div className="relative w-full h-full pointer-events-none overflow-hidden">

      {/* Dark Readability Backdrop */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-3/5 pointer-events-none z-20 
        bg-gradient-to-b md:bg-gradient-to-r 
        from-[#050505]/95 via-[#050505]/70 to-transparent"
      />

      {/* Grid Stack Container */}
      <div className="absolute top-12 left-6 md:top-24 md:left-24 lg:left-32 w-full max-w-[460px] pr-6 pointer-events-auto z-30 grid">

        {/* 1. HERO */}
        <motion.div
          style={{ opacity: beat1_opacity, visibility: beat1_visibility }}
          className={`col-start-1 row-start-1 flex flex-col gap-6 ${debugStyle}`}
        >
          <div>
            <p className="text-white/60 font-bold tracking-[0.18em] text-[11px] md:text-[13px] uppercase mb-4 md:mb-6">
              PS5 RENTAL
            </p>
            <h1 className="text-[clamp(48px,6vw,92px)] font-extrabold tracking-tighter mb-4 text-white leading-[0.92] flex flex-col">
              <MaskedReveal yTransform={beat1_y}>GAME NIGHT.</MaskedReveal>
              <MaskedReveal yTransform={beat1_y}><GlowAccent>DELIVERED.</GlowAccent></MaskedReveal>
            </h1>
            <motion.p style={{ y: beat1_y }} className="text-[16px] md:text-[20px] text-white/70 font-semibold leading-relaxed">
              Premium PS5 gaming without the price of buying a console.
            </motion.p>
          </div>
          <CTAButtons />
        </motion.div>

        {/* 2. WHY BUY? */}
        <motion.div
          style={{ opacity: beat2_opacity, visibility: beat2_visibility }}
          className={`col-start-1 row-start-1 flex flex-col gap-6 ${debugStyle}`}
        >
          <div>
            <p className="text-white/60 font-bold tracking-[0.18em] text-[11px] md:text-[13px] uppercase mb-4 md:mb-6">
              WHY BUY THE CONSOLE?
            </p>
            <h2 className="text-[clamp(48px,6vw,92px)] font-extrabold tracking-tighter mb-4 text-white leading-[0.92] flex flex-col">
              <MaskedReveal yTransform={beat2_y}><GlowAccent>PLAY MORE.</GlowAccent></MaskedReveal>
              <MaskedReveal yTransform={beat2_y}>OWN LESS.</MaskedReveal>
            </h2>
            <motion.p style={{ y: beat2_y }} className="text-[16px] md:text-[20px] text-white/70 font-semibold leading-relaxed">
              Get the PS5 experience whenever you want it — without committing to the full console price.
            </motion.p>
          </div>
          <CTAButtons />
          <motion.div style={{ y: beat2_y }} className="flex flex-wrap items-center gap-4 text-[10px] md:text-xs font-bold tracking-widest text-white/40 uppercase pt-2">
            <span>Flexible</span>
            <span>•</span>
            <span>Affordable</span>
            <span>•</span>
            <span>On-Demand</span>
          </motion.div>
        </motion.div>

        {/* 3. CHOOSE YOUR GAME */}
        <motion.div
          style={{ opacity: beat3_opacity, visibility: beat3_visibility }}
          className={`col-start-1 row-start-1 flex flex-col gap-6 ${debugStyle}`}
        >
          <div>
            <p className="text-white/60 font-bold tracking-[0.18em] text-[11px] md:text-[13px] uppercase mb-4 md:mb-6">
              YOUR NIGHT. YOUR GAME.
            </p>
            <h2 className="text-[clamp(48px,6vw,92px)] font-extrabold tracking-tighter mb-4 text-white leading-[0.92] flex flex-col">
              <MaskedReveal yTransform={beat3_y}>PICK YOUR</MaskedReveal>
              <MaskedReveal yTransform={beat3_y}><GlowAccent>PLAY.</GlowAccent></MaskedReveal>
            </h2>
            <motion.p style={{ y: beat3_y }} className="text-[16px] md:text-[20px] text-white/70 font-semibold leading-relaxed">
              From competitive matches to story-driven adventures, choose the games that make your night.
            </motion.p>
          </div>
          <motion.div style={{ y: beat3_y }} className="flex flex-wrap gap-2 pt-2">
            {["EA FC", "GTA V", "RDR 2", "TEKKEN", "MORTAL KOMBAT"].map((game) => (
              <span key={game} className="px-4 py-2 border border-white/10 rounded-full text-xs font-bold tracking-wider text-white/60 backdrop-blur-md">
                {game}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* 4. FULL EXPLODED */}
        <motion.div
          style={{ opacity: beat4_opacity, visibility: beat4_visibility }}
          className={`col-start-1 row-start-1 flex flex-col gap-6 ${debugStyle}`}
        >
          <div>
            <h2 className="text-[clamp(36px,4vw,64px)] font-extrabold tracking-tighter mb-4 text-white leading-[0.92] flex flex-col">
              <MaskedReveal yTransform={beat4_y}><GlowAccent>EVERYTHING</GlowAccent></MaskedReveal>
              <MaskedReveal yTransform={beat4_y}>YOU NEED.</MaskedReveal>
            </h2>
            <motion.p style={{ y: beat4_y }} className="text-[16px] md:text-[20px] text-white/70 font-semibold leading-relaxed">
              One premium setup. Hours of gaming. No long-term commitment.
            </motion.p>
          </div>
        </motion.div>

        {/* 5. EASY RENTAL */}
        <motion.div
          style={{ opacity: beat5_opacity, visibility: beat5_visibility }}
          className={`col-start-1 row-start-1 flex flex-col gap-6 ${debugStyle}`}
        >
          <div>
            <p className="text-white/60 font-bold tracking-[0.18em] text-[11px] md:text-[13px] uppercase mb-4 md:mb-6">
              FROM SCROLL TO PLAY
            </p>
            <h2 className="text-[clamp(48px,6vw,92px)] font-extrabold tracking-tighter mb-8 md:mb-10 text-white leading-[0.92] flex flex-col">
              <MaskedReveal yTransform={beat5_y}>RENTING</MaskedReveal>
              <MaskedReveal yTransform={beat5_y}>SHOULD BE</MaskedReveal>
              <MaskedReveal yTransform={beat5_y}><GlowAccent>EASY.</GlowAccent></MaskedReveal>
            </h2>
          </div>
          <motion.div style={{ y: beat5_y }} className="flex flex-col gap-6">
            <div className="flex gap-4 items-start">
              <span className="text-xs font-bold text-[#0070CC] tracking-widest pt-1">01</span>
              <div>
                <h4 className="font-bold text-white tracking-widest text-sm mb-1 uppercase">Choose</h4>
                <p className="text-white/60 text-sm">Pick your PS5 and games.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-xs font-bold text-[#0070CC] tracking-widest pt-1">02</span>
              <div>
                <h4 className="font-bold text-white tracking-widest text-sm mb-1 uppercase">Book</h4>
                <p className="text-white/60 text-sm">Choose your preferred time.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-xs font-bold text-[#0070CC] tracking-widest pt-1">03</span>
              <div>
                <h4 className="font-bold text-white tracking-widest text-sm mb-1 uppercase">Play</h4>
                <p className="text-white/60 text-sm">Get ready for game night.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 6. DELIVERY */}
        <motion.div
          style={{ opacity: beat6_opacity, visibility: beat6_visibility }}
          className={`col-start-1 row-start-1 flex flex-col gap-6 ${debugStyle}`}
        >
          <div>
            <h2 className="text-[clamp(48px,6vw,92px)] font-extrabold tracking-tighter mb-4 text-white leading-[0.92] flex flex-col">
              <MaskedReveal yTransform={beat6_y}>WE BRING</MaskedReveal>
              <MaskedReveal yTransform={beat6_y}>THE GAME</MaskedReveal>
              <MaskedReveal yTransform={beat6_y}><GlowAccent>TO YOU.</GlowAccent></MaskedReveal>
            </h2>
            <motion.p style={{ y: beat6_y }} className="text-[16px] md:text-[20px] text-white/70 font-semibold leading-relaxed">
              Your PS5, delivered straight to your doorstep. No store visit. No hassle.
            </motion.p>
          </div>
        </motion.div>

        {/* 7. FINAL */}
        <motion.div
          style={{ opacity: beat7_opacity, visibility: beat7_visibility }}
          className={`col-start-1 row-start-1 flex flex-col gap-6 ${debugStyle}`}
        >
          <div>
            <h2 className="text-[clamp(48px,6vw,92px)] font-extrabold tracking-tighter mb-4 text-white leading-[0.92] flex flex-col">
              <MaskedReveal yTransform={beat7_y}>READY</MaskedReveal>
              <MaskedReveal yTransform={beat7_y}>WHEN YOU</MaskedReveal>
              <MaskedReveal yTransform={beat7_y}><GlowAccent>ARE.</GlowAccent></MaskedReveal>
            </h2>
            <motion.p style={{ y: beat7_y }} className="text-[16px] md:text-[20px] text-white/70 font-semibold leading-relaxed">
              Pick your game. Book your PS5. Make tonight a gaming night.
            </motion.p>
          </div>
          <motion.div style={{ y: beat7_y }}>
            <CTAButtons />
            <p className="text-white/40 font-bold tracking-[0.18em] text-[11px] uppercase pt-4">
              Premium gaming. Delivered.
            </p>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll Down Indicator (Fades out as soon as user starts scrolling) */}
      <motion.div 
        style={{ opacity: beat1_opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/50 text-xs font-bold tracking-widest uppercase shadow-black drop-shadow-md">Scroll to Assemble</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Subtle Cinematic Progress Indicator */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex flex-col items-center gap-4 opacity-50">
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent relative">
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#0070CC] rounded-full drop-shadow-[0_0_10px_rgba(0,112,204,1)]"
            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>
      </div>
    </div>
  );
}
