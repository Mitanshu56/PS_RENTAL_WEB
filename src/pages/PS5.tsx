'use client';

import { Navbar } from '@/components/Navbar';
import { PS5Hero } from '@/components/PS5Hero';
import { GameLibrary } from '@/components/GameLibrary';
import { PS5Pricing } from '@/components/PS5Pricing';
import { BookingCTA } from '@/components/BookingCTA';
import { Footer } from '@/components/Footer';

export function PS5Page() {
  return (
    <main className="bg-[#020202] min-h-screen text-white font-sans overflow-x-hidden selection:bg-blue-600/30 selection:text-white">
      {/*
        Reuse the shared Navbar with introState="done" — on the PS5 page there's no
        intro sequence, so the header should appear immediately in its final revealed state.
      */}
      <Navbar introState="done" />

      {/* Spacer for fixed header */}
      <div className="h-16" />

      {/* Section 1 — Hero + Story Video */}
      <PS5Hero />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#3b82f6]/30 to-transparent" />

      {/* Section 2 — Game Library Carousel */}
      <section id="games">
        <GameLibrary />
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#3b82f6]/30 to-transparent" />

      {/* Section 3 — PS5 Pricing (3D device, PS5-only, no toggle) */}
      <PS5Pricing />

      {/* 4. CROSS-SELL / CTA */}
      <BookingCTA showOnly="ps5" />

      <Footer />
    </main>
  );
}
