'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IntroSequence } from '@/components/IntroSequence';
import { Navbar } from '@/components/Navbar';
import { ScrollyTelling } from '@/components/ScrollyTelling';
import { RentalCards } from '@/components/RentalCards';
import { TrustSection } from '@/components/TrustSection';
import { BookingCTA } from '@/components/BookingCTA';
import { Footer } from '@/components/Footer';

const INTRO_PLAYED_KEY = 'playrent_intro_played';

export function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [introState, setIntroState] = useState<'playing' | 'fading' | 'done'>('playing');

  useEffect(() => {
    setIsMounted(true);
    if (sessionStorage.getItem(INTRO_PLAYED_KEY)) {
      setIntroState('done');
    }
  }, []);

  // Lock scrolling during the intro
  useEffect(() => {
    if (!isMounted) return;
    document.body.style.overflow = introState !== 'done' ? 'hidden' : 'auto';
  }, [introState, isMounted]);

  if (!isMounted) return null; // Skip hydration mismatch

  return (
    <main className="bg-brand-bg-primary min-h-screen text-white font-sans selection:bg-brand-accent-blue/30 selection:text-white">
      <AnimatePresence onExitComplete={() => setIntroState('done')}>
        {introState === 'playing' && (
          <IntroSequence
            onComplete={() => {
              sessionStorage.setItem(INTRO_PLAYED_KEY, '1');
              setIntroState('fading');
            }}
          />
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
