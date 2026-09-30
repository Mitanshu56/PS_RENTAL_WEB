"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 relative z-10">
      {/* ─── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pt-10 sm:pt-16 md:pt-24 pb-6 sm:pb-8 md:pb-12">

        {/*
          DESKTOP  → 5-column grid (unchanged from original)
          TABLET   → 5-column grid (unchanged)
          MOBILE   → stacked sections but tightly spaced via the classes below
        */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8 lg:gap-12 md:mb-16">

          {/* ── Brand ── */}
          <div className="md:col-span-2 mb-6 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tighter">
              PLAY RENT
            </h2>
            <p className="text-white/50 text-sm font-medium max-w-xs leading-relaxed">
              Gaming, delivered. Premium console rental to your door.
            </p>
          </div>

          {/*
            ── MOBILE: Rent + Company in a 2-column grid ──
            ── DESKTOP: each gets its own grid column (restored with md:block) ──
          */}
          <div className="grid grid-cols-2 gap-4 md:contents mb-6 md:mb-0">

            {/* Rent links */}
            <div>
              <h4 className="text-white text-sm font-bold mb-3 uppercase tracking-widest">Rent</h4>
              <ul className="space-y-2.5 text-sm font-medium text-white/50">
                <li>
                  <Link href="/ps5" className="hover:text-white transition-colors">PS5 Rental</Link>
                </li>
                <li>
                  <Link href="/ps4" className="hover:text-white transition-colors">PS4 Rental</Link>
                </li>
                <li>
                  <Link href="/games" className="hover:text-white transition-colors">Games</Link>
                </li>
                <li>
                  <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
                </li>
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h4 className="text-white text-sm font-bold mb-3 uppercase tracking-widest">Company</h4>
              <ul className="space-y-2.5 text-sm font-medium text-white/50">
                <li>
                  <Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
                </li>
                <li>
                  <Link href="#terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Visit Us ── */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-white text-sm font-bold mb-3 uppercase tracking-widest">Visit Us</h4>

            {/* Address row — compact on mobile */}
            <div className="flex items-start gap-2.5 text-sm font-medium text-white/60 mb-3">
              <MapPin className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
              <p className="leading-relaxed text-xs sm:text-sm">
                <strong className="text-white/90 font-semibold">PS Rental</strong>
                <br />
                Morabhagal Cir, Harekrishna Society,
                <br className="hidden sm:block" /> Rander, Surat, Gujarat 395005
              </p>
            </div>

            <a
              href="https://share.google/pdershtZjlWhPC5mj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-bold tracking-widest uppercase text-[#3b82f6] hover:text-[#60a5fa] transition-colors mb-4"
            >
              Get Directions →
            </a>

            {/* Embedded map */}
            <div className="w-full h-32 rounded-[10px] overflow-hidden border border-white/10 bg-[#111]">
              <iframe
                src="https://maps.google.com/maps?q=PS%20rental,%20Morabhagal%20Cir,%20Surat&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              />
            </div>
          </div>
        </div>

        {/* ─── BOTTOM BAR ───────────────────────────────────────────────────── */}
        <div className="flex flex-row items-center justify-between gap-3 pt-5 border-t border-white/10 text-xs font-medium text-white/40">
          {/* Copyright */}
          <p className="leading-none">
            © {new Date().getFullYear()} Play Rent. All rights reserved.
          </p>

          {/* Social icons — icon-only on mobile, labelled on larger screens */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#"
              aria-label="Instagram"
              className="flex items-center gap-1.5 hover:text-white transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-[#e1306c] transition-colors">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <a
              href="https://wa.me/917990613681"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center gap-1.5 hover:text-white transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-[#25d366] transition-colors">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
