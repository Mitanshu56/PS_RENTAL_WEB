"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── Nav links config ─────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "/",        label: "Home"    },
  { href: "/ps5",     label: "PS5"     },
  { href: "/ps4",     label: "PS4"     },
  { href: "/games",   label: "Games"   },
  { href: "/pricing", label: "Pricing" },
] as const;

const WA_LINK = "https://wa.me/917990613681";

// ─── Hamburger icon (3 bars → X) ──────────────────────────────────────────────
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]" aria-hidden>
      <span
        className="block h-[2px] w-5 bg-white origin-center transition-all duration-300 ease-in-out"
        style={open ? { transform: "translateY(7px) rotate(45deg)" } : undefined}
      />
      <span
        className="block h-[2px] w-5 bg-white transition-all duration-300 ease-in-out"
        style={open ? { opacity: 0, transform: "scaleX(0)" } : undefined}
      />
      <span
        className="block h-[2px] w-5 bg-white origin-center transition-all duration-300 ease-in-out"
        style={open ? { transform: "translateY(-7px) rotate(-45deg)" } : undefined}
      />
    </span>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export function Navbar({ introState }: { introState: "playing" | "fading" | "done" }) {
  const isVisible   = introState === "fading" || introState === "done";
  const isInteractive = introState !== "playing";
  const pathname    = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // One-time PS5 power-on sweep
  const [shouldSweep, setShouldSweep]   = useState(false);
  const sweepHasPlayed                   = useRef(false);

  useEffect(() => {
    if (isVisible && !sweepHasPlayed.current) {
      sweepHasPlayed.current = true;
      const t = setTimeout(() => setShouldSweep(true), 200);
      return () => clearTimeout(t);
    }
  }, [isVisible]);

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Close on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMenuOpen(false);
  }, []);
  useEffect(() => {
    if (menuOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, handleKeyDown]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Header bar ──────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={[
          "fixed top-0 inset-x-0 z-50",
          "h-14 sm:h-16",                              // 56px mobile → 64px desktop
          "flex items-center justify-between",
          "px-4 sm:px-6 lg:px-12",
          "bg-[#050505]/80 backdrop-blur-lg",
          "border-b border-white/5",
          isInteractive ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Power-on sweep */}
        {shouldSweep && (
          <motion.div
            initial={{ left: "-25%", opacity: 0 }}
            animate={{ left: "125%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1, ease: [0.45, 0, 0.55, 1], times: [0, 0.2, 0.8, 1] }}
            onAnimationComplete={() => setShouldSweep(false)}
            className="absolute bottom-0 w-1/4 h-px z-20 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,.8) 30%, #fff 50%, rgba(59,130,246,.8) 70%, transparent 100%)",
              boxShadow:  "0 0 10px rgba(59,130,246,1), 0 0 20px rgba(59,130,246,.8)",
            }}
          />
        )}

        {/* Glowing edge-light */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute bottom-[-1px] left-0 right-0 h-px bg-[#0070CC]/80 pointer-events-none"
          style={{ boxShadow: "0 0 8px rgba(0,112,204,.6), 0 0 20px rgba(0,112,204,.3), 0 0 40px rgba(0,112,204,.15)" }}
        >
          <motion.div
            animate={{ opacity: [0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            className="w-full h-full bg-[#3b82f6]"
            style={{ boxShadow: "0 0 10px rgba(59,130,246,.8), 0 0 25px rgba(59,130,246,.5)" }}
          />
        </motion.div>

        {/* ── Logo ── */}
        <Link
          href="/"
          className="relative z-10 font-black text-lg sm:text-xl tracking-tighter text-white select-none shrink-0"
          aria-label="Play Rent – home"
        >
          PLAY RENT
        </Link>

        {/* ── Desktop nav (1024px+) ── */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                "relative py-1 transition-colors duration-200",
                pathname === href
                  ? "text-[#3b82f6] font-semibold"
                  : "text-white/70 hover:text-white",
              ].join(" ")}
            >
              {label}
              {pathname === href && (
                <motion.span
                  layoutId="nav-active-dot"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#3b82f6] rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* ── Right side: CTA + hamburger ── */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          {/* Rent Now CTA – always visible */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              /* min 44×44 touch target via padding */
              "inline-flex items-center justify-center",
              "h-10 sm:h-10 px-4 sm:px-5",
              "text-xs sm:text-sm font-bold tracking-wide rounded-full",
              "bg-[#0070CC] hover:bg-[#00A8FF] active:scale-95",
              "text-white transition-all duration-200",
              "shadow-[0_0_16px_rgba(0,112,204,.35)]",
              "whitespace-nowrap select-none",
            ].join(" ")}
          >
            Rent Now
          </a>

          {/* Hamburger – tablet + mobile only (hidden lg+) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={[
              "lg:hidden",
              /* min 44×44 tap target */
              "flex items-center justify-center w-11 h-11",
              "rounded-xl border border-white/10",
              "bg-white/5 hover:bg-white/10 active:bg-white/15",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]",
            ].join(" ")}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </motion.header>

      {/* ─── Mobile / Tablet drawer ───────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />

            {/* Drawer panel */}
            <motion.nav
              key="drawer"
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className={[
                "fixed top-0 right-0 bottom-0 z-50 lg:hidden",
                "w-[min(320px,85vw)]",         // max 320px, never more than 85% of screen
                "flex flex-col",
                "bg-[#0a0a0a] border-l border-white/8",
                "pt-14 sm:pt-16 pb-8",         // clear the fixed header height
                "overflow-y-auto",
              ].join(" ")}
            >
              {/* Close button in top-right of drawer */}
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className={[
                  "absolute top-3 right-3",
                  "flex items-center justify-center w-11 h-11",
                  "rounded-xl border border-white/10 text-white/50",
                  "hover:text-white hover:bg-white/10 active:bg-white/15",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]",
                ].join(" ")}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Label */}
              <p className="px-6 pb-3 text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
                Navigation
              </p>

              {/* Links */}
              <ul className="flex flex-col px-3" role="list">
                {NAV_LINKS.map(({ href, label }, i) => {
                  const isActive = pathname === href;
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={href}
                        className={[
                          /* min 44px height via py */
                          "flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1",
                          "text-[15px] font-semibold tracking-tight",
                          "transition-all duration-150",
                          isActive
                            ? "bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20"
                            : "text-white/80 hover:text-white hover:bg-white/5 active:bg-white/10",
                        ].join(" ")}
                      >
                        {/* Active indicator bar */}
                        <span
                          className={[
                            "block w-1 h-5 rounded-full transition-all duration-150",
                            isActive ? "bg-[#3b82f6]" : "bg-white/10",
                          ].join(" ")}
                        />
                        {label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Divider */}
              <div className="mx-6 my-5 h-px bg-white/8" />

              {/* CTA at bottom of drawer */}
              <div className="px-6 mt-auto space-y-3">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "flex items-center justify-center gap-2.5",
                    "w-full py-4 rounded-2xl",
                    "bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98]",
                    "text-white text-sm font-bold tracking-wide",
                    "transition-all duration-200 shadow-lg shadow-[#25D366]/20",
                  ].join(" ")}
                >
                  {/* WhatsApp icon */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Book on WhatsApp
                </a>

                <p className="text-center text-[10px] text-white/20 font-medium tracking-widest uppercase">
                  +91 79906 13681
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
