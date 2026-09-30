'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BookingCTA } from '@/components/BookingCTA';
import { pricingPlans } from '@/data/pricing';
import { CheckCircle2, Shield, Truck, Clock } from 'lucide-react';
import Link from 'next/link';

// A reusable component for Apple-style masked text reveals
const MaskedReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <div className="overflow-hidden inline-block align-bottom leading-[1.0]">
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block"
    >
      {children}
    </motion.div>
  </div>
);

const GlowAccent = ({ children }: { children: React.ReactNode }) => (
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#0070CC] drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse">
    {children}
  </span>
);

export function PricingPage() {
  const [activeConsole, setActiveConsole] = useState<"ps5" | "ps4">("ps5");

  const currentData = pricingPlans[activeConsole];
  const plans = currentData.plans;

  return (
    <main className="bg-[#020202] min-h-screen text-white font-sans overflow-x-hidden selection:bg-blue-600/30 selection:text-white relative">
      {/* Background Particle Field / Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] bg-brand-accent-blue/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[60%] right-[10%] w-[40vw] h-[40vw] bg-[#a855f7]/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <Navbar introState="done" />
      <div className="h-24 md:h-32" />

      {/* 1. HERO */}
      <section className="relative z-10 px-6 max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-[clamp(40px,6vw,80px)] font-black tracking-tighter mb-4 text-white leading-[0.92] flex flex-col items-center">
          <MaskedReveal>GAME ON.</MaskedReveal>
          <MaskedReveal delay={0.1}><GlowAccent>YOUR WAY.</GlowAccent></MaskedReveal>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[16px] md:text-[20px] text-white/60 font-semibold max-w-2xl mx-auto"
        >
          Choose your console. Choose your plan. No commitments, no hidden fees.
        </motion.p>
      </section>

      {/* 2. CONSOLE TOGGLE */}
      <section className="relative z-10 flex justify-center mb-12 px-6">
        <div className="inline-flex items-center p-1.5 bg-[#111] rounded-full border border-white/10 shadow-xl backdrop-blur-sm relative">
          {/* Animated Selection Pill */}
          <motion.div
            className="absolute top-1.5 bottom-1.5 w-[120px] bg-white/10 border border-white/10 rounded-full z-0"
            animate={{ left: activeConsole === "ps5" ? 6 : 130 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => setActiveConsole("ps5")}
            className={`relative z-10 w-[120px] py-3 rounded-full font-bold text-sm tracking-widest transition-colors ${activeConsole === "ps5" ? "text-white" : "text-white/40 hover:text-white/70"}`}
          >
            PS5
          </button>
          <button
            onClick={() => setActiveConsole("ps4")}
            className={`relative z-10 w-[120px] py-3 rounded-full font-bold text-sm tracking-widest transition-colors ${activeConsole === "ps4" ? "text-white" : "text-white/40 hover:text-white/70"}`}
          >
            PS4
          </button>
        </div>
      </section>

      {/* 3. PRICING CARDS */}
      <section className="relative z-10 px-6 max-w-6xl mx-auto mb-20 min-h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeConsole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col md:flex-row justify-center items-stretch gap-6"
          >
            {plans.map((plan, index) => {
              // Determine if this is the "Best Value" plan. 
              // For PS4 (which has 4 plans), the 24-hour plan (index 1) is best value.
              // For PS5 (which has 1 plan currently), it is the only plan, so we can make it best value.
              const isBestValue = (activeConsole === "ps4" && index === 1) || (activeConsole === "ps5" && index === 0);

              return (
                <div
                  key={plan.duration}
                  className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 w-full md:w-[320px] group cursor-default hover:-translate-y-1 ${isBestValue
                      ? "bg-gradient-to-b from-[#3b82f6]/10 to-[#111] border-[#3b82f6]/50 shadow-[0_0_30px_rgba(59,130,246,0.15)] md:-mt-4 md:mb-4"
                      : "bg-[#111] border-white/10 hover:border-white/20 hover:bg-[#1a1a1a]"
                    }`}
                >
                  {isBestValue && (
                    <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                      <span className="bg-[#3b82f6] text-white text-[10px] font-black tracking-widest uppercase py-1 px-4 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]">
                        Best Value
                      </span>
                    </div>
                  )}

                  <div className="mb-6 flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-wider">{plan.duration}</h3>
                      <p className="text-sm font-medium text-[#3b82f6]">{currentData.name} Plan</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                  </div>

                  <ul className="flex-1 space-y-4 mb-8">
                    {currentData.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" />
                        <span className="text-white/70 font-medium text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/${activeConsole}`}
                    className={`w-full py-4 text-center font-bold rounded-lg text-sm tracking-widest uppercase transition-all ${isBestValue
                        ? "bg-[#3b82f6] hover:bg-[#4ea0ff] text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                        : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                  >
                    {currentData.ctaText}
                  </Link>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 4. TRUST STRIP */}
      <section className="relative z-10 px-6 max-w-4xl mx-auto mb-24 border-t border-white/10 pt-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3 text-white/60 text-left">
            <Truck className="w-6 h-6 text-[#3b82f6]" />
            <div className="flex flex-col">
              <span className="font-bold tracking-widest uppercase text-xs text-white/90">Free Delivery</span>
              <span className="text-[10px] tracking-wider uppercase">Up to 3km • Pickup Available</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <Shield className="w-6 h-6 text-[#3b82f6]" />
            <span className="font-bold tracking-widest uppercase text-xs">No Hidden Fees</span>
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <Clock className="w-6 h-6 text-[#3b82f6]" />
            <span className="font-bold tracking-widest uppercase text-xs">Flexible Returns</span>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#3b82f6]/30 to-transparent" />

      {/* 5. BOOKING CTA */}
      <BookingCTA />

      {/* 6. FOOTER */}
      <Footer />
    </main>
  );
}
