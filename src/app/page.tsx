"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { IntroSequence } from "@/components/IntroSequence";
import { Navbar } from "@/components/Navbar";
import { ScrollyTelling } from "@/components/ScrollyTelling";
import { RentalCards } from "@/components/RentalCards";
import { TrustSection } from "@/components/TrustSection";
import { BookingCTA } from "@/components/BookingCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [introState, setIntroState] = useState<"playing" | "fading" | "done">("playing");

  // Lock scrolling during the intro
  useEffect(() => {
    if (introState !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [introState]);

  return (
    <main className="bg-brand-bg-primary min-h-screen text-white font-sans selection:bg-brand-accent-blue/30 selection:text-white">
      {/* 
        AnimatePresence gracefully handles the fade out.
        When introState becomes "fading", IntroSequence unmounts and fires its exit animation.
        When the exit animation completes, onExitComplete fires to clean up.
      */}
      <AnimatePresence onExitComplete={() => setIntroState("done")}>
        {introState === "playing" && (
          <IntroSequence onComplete={() => setIntroState("fading")} />
        )}
      </AnimatePresence>
      
      <Navbar introState={introState} />
      <ScrollyTelling />
      
      <RentalCards />
      <TrustSection />
      <BookingCTA />
      <Footer />
    </main>
  );
}
