'use client';

import { useState, Suspense, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, Html, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

import { pricingPlans } from "@/data/pricing";

useGLTF.preload("/models/nintendo_switch.glb");

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0, scale: 0.95 }),
  center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
  exit: (d: number) => ({ zIndex: 0, x: d < 0 ? 60 : -60, opacity: 0, scale: 0.95 }),
};

// ─── 3D DEVICE MODEL ─────────────────────────────────────────────────────────
function DeviceModel({ currentConsoleData, direction, isFlickering, activeConsole, cyclePlan, selectedPlanIndex }: any) {
  const gltf = useGLTF("/models/nintendo_switch.glb");
  const { viewport } = useThree();

  // Clone the scene on every mount so hot-reloads never accumulate stale mutations
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // ── Compute scale via Box3 on the RAW (unrotated) clone ───────────────────
  const { scaleFactor, screenZ } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    scene.position.sub(center);

    const naturalLongAxis = Math.max(size.x, size.z);
    const targetWidth = Math.min(viewport.width * 0.88, 8);
    const sf = targetWidth / naturalLongAxis;

    const screenSurface = (box.max.y - 0) * sf;
    const hz = screenSurface + 0.02;

    return { scaleFactor: sf, screenZ: hz };
  }, [scene, viewport.width]);

  useMemo(() => {
    scene.rotation.set(Math.PI / 2, 0, 0);
    scene.scale.setScalar(scaleFactor);
  }, [scene, scaleFactor]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (e.point.x < -0.4) cyclePlan(-1);
    else if (e.point.x > 0.4) cyclePlan(1);
  };

  const currentPlan = currentConsoleData.plans[selectedPlanIndex] || currentConsoleData.plans[0];
  const animationKey = `${activeConsole}-${selectedPlanIndex}`;

  return (
    <Float rotationIntensity={0.1} floatIntensity={0.3} speed={1.2}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" castShadow />
      <spotLight position={[-7, 6, -4]} intensity={5} color="#3b82f6" penumbra={2} angle={0.3} />
      <spotLight position={[6, -2, 4]} intensity={2} color="#a855f7" penumbra={2} angle={0.4} />
      <Environment preset="city" />

      <primitive
        object={scene}
        onPointerDown={handleClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      />

      <Html
        transform
        occlude="blending"
        position={[0, 0.1, screenZ]}
        scale={0.22}
        rotation={[0, 0, 0]}
        className="w-[820px] h-[460px] pointer-events-none"
      >
        <div className="w-full h-full bg-[#080808] overflow-hidden flex flex-col shadow-inner relative select-none">
          {/* Header */}
          <div className="w-full bg-[#111] border-b border-white/5 px-6 py-3 flex justify-between items-center shrink-0">
            <span className="text-sm font-bold text-white/40 tracking-widest uppercase">Pricing Store</span>
            <span className="text-sm font-bold text-[#3b82f6] tracking-widest animate-pulse">● LIVE</span>
          </div>

          {/* Slide */}
          <div className="flex-1 relative overflow-hidden pointer-events-auto">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={animationKey}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.25 },
                }}
                className="absolute inset-0 p-8 flex flex-col justify-center"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-5xl font-extrabold text-white tracking-tighter mb-1">{currentConsoleData.name}</h3>
                    <p className={currentConsoleData.primary ? "text-[#3b82f6] font-bold text-lg" : "text-white/60 font-medium text-lg"}>
                      {currentConsoleData.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-5xl font-black text-white">{currentPlan.price}</span>
                    <span className="text-white/50 text-sm font-bold uppercase tracking-widest block mt-1">/ {currentPlan.duration}</span>
                  </div>
                </div>

                <ul className="space-y-2 font-medium mb-7 text-lg flex-1">
                  {currentConsoleData.features.map((f: string, i: number) => (
                    <li key={i} className={`flex items-center gap-3 ${currentConsoleData.primary ? "text-white/90" : "text-white/70"}`}>
                      <span className={currentConsoleData.primary ? "text-[#3b82f6]" : "text-white/40"}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/917990613681"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 font-bold rounded-lg text-lg tracking-widest uppercase transition-colors shrink-0 text-center block ${currentConsoleData.primary
                    ? "bg-[#3b82f6] hover:bg-[#4ea0ff] text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/5"
                    }`}>
                  {currentConsoleData.ctaText}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flicker / glass shimmer */}
          <div className={`absolute inset-0 pointer-events-none transition-all duration-[50ms] ${isFlickering ? "bg-[#3b82f6]/50 mix-blend-screen" : "bg-gradient-to-br from-white/5 to-transparent opacity-40"
            }`} />
        </div>
      </Html>
    </Float>
  );
}

// ─── Standalone 2-D pricing card (shown on mobile / small viewports) ─────────
// Intentional layout mode — not a fallback or error state.
// ─── useSwipe ─────────────────────────────────────────────────────────────────
// Pointer Events-based swipe hook for the standalone pricing card.
//
// Architecture:
//   • Uses React synthetic Pointer Events (onPointerDown/Move/Up) so React
//     manages the listener lifecycle — no manual addEventListener/cleanup.
//   • Direction is LOCKED after 8px of movement.  If the first significant
//     delta is more horizontal than vertical → horizontal gesture →
//     call e.preventDefault() to suppress scroll/pull-to-refresh.
//     Otherwise → vertical gesture → do nothing, let the browser scroll.
//   • Fires onPrev/onNext only when locked-horizontal displacement ≥ 50px.
//   • setPointerCapture keeps the element receiving events even if the
//     finger drifts outside the card bounds.
//   • Safe to attach to any element; no-ops when callbacks are undefined.
const SWIPE_LOCK_PX = 8;   // px of movement before we decide H vs V
const SWIPE_MIN_PX  = 50;  // px of horizontal travel to fire navigation

function useSwipe(onPrev: () => void, onNext: () => void, enabled: boolean) {
  // Gesture state stored in a ref — no re-renders during a swipe.
  const gesture = useRef<{
    startX: number;
    startY: number;
    locked: "h" | "v" | null; // null = not yet decided
    pointerId: number;
  } | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    // Only track primary pointer (first finger / left mouse button)
    if (!e.isPrimary) return;
    gesture.current = { startX: e.clientX, startY: e.clientY, locked: null, pointerId: e.pointerId };
    // Capture keeps events flowing even when finger moves off the element
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || !gesture.current || e.pointerId !== gesture.current.pointerId) return;
    const dx = e.clientX - gesture.current.startX;
    const dy = e.clientY - gesture.current.startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (gesture.current.locked === null && (absDx > SWIPE_LOCK_PX || absDy > SWIPE_LOCK_PX)) {
      // Lock direction: whichever axis moved more first
      gesture.current.locked = absDx >= absDy ? "h" : "v";
    }

    if (gesture.current.locked === "h") {
      // Suppress vertical scroll for this gesture so the swipe feels clean
      e.preventDefault();
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || !gesture.current || e.pointerId !== gesture.current.pointerId) return;
    const dx = e.clientX - gesture.current.startX;
    const locked = gesture.current.locked;
    gesture.current = null;

    if (locked !== "h") return; // vertical or undecided — do nothing
    if (Math.abs(dx) < SWIPE_MIN_PX) return; // too short — treat as tap

    // Swipe left → next card; swipe right → prev card
    if (dx < 0) onNext();
    else         onPrev();
  };

  const onPointerCancel = () => { gesture.current = null; };

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}

// ─── Standalone 2-D pricing card (shown on mobile / small viewports) ─────────
function StandaloneCard({
  consoleData,
  activeConsole,
  selectedPlanIndex,
  direction,
  isFlickering,
  onPrev,
  onNext,
}: {
  consoleData: typeof pricingPlans["ps5"];
  activeConsole: "ps5" | "ps4";
  selectedPlanIndex: number;
  direction: number;
  isFlickering: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  const currentPlan = consoleData.plans[selectedPlanIndex] || consoleData.plans[0];
  const animationKey = `${activeConsole}-${selectedPlanIndex}`;
  const hasMultiplePlans = consoleData.plans.length > 1;
  const isPrimary = consoleData.primary;

  // Swipe handlers — enabled only when there are multiple plans to navigate.
  const swipeHandlers = useSwipe(onPrev, onNext, hasMultiplePlans);

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Swipe hint + plan pips — only shown when there are multiple plans */}
      {hasMultiplePlans && (
        <div className="flex flex-col items-center gap-2 mb-4">
          {/* Animated swipe hint */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5"
            style={{
              animation: "swipeHintFade 3s ease-out 1s both",
            }}
          >
            {/* sliding hand icon */}
            <span
              className="text-base leading-none"
              style={{ animation: "swipeHand 1.4s ease-in-out infinite" }}
              aria-hidden="true"
            >
              👆
            </span>
            <span className="text-[11px] font-semibold text-white/50 tracking-wide whitespace-nowrap">
              Swipe left or right to explore plans
            </span>
          </div>

          {/* Plan position dots */}
          <div className="flex gap-1.5 items-center">
            {consoleData.plans.map((_, i) => (
              <span
                key={i}
                className={[
                  "block rounded-full transition-all duration-300",
                  i === selectedPlanIndex ? "w-4 h-1.5 bg-[#3b82f6]" : "w-1.5 h-1.5 bg-white/20",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      )}

      {/* Keyframes injected once via a style tag */}
      <style>{`
        @keyframes swipeHintFade {
          0%   { opacity: 0; transform: translateY(-4px); }
          15%  { opacity: 1; transform: translateY(0);    }
          75%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes swipeHand {
          0%, 100% { transform: translateX(0);    }
          40%      { transform: translateX(-6px); }
          70%      { transform: translateX(6px);  }
        }
      `}</style>

      {/*
        Card — swipe handlers are on this div.
        touch-action: pan-y allows the browser to handle vertical scrolling
        natively while our JS takes over only for horizontal gestures.
        user-select: none prevents text highlight during a swipe drag.
      */}
      <div
        {...swipeHandlers}
        style={{ touchAction: "pan-y", userSelect: "none" }}
        className={[
          "w-full rounded-2xl overflow-hidden border",
          isPrimary
            ? "border-[#3b82f6]/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            : "border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]",
        ].join(" ")}
      >
        {/* Dashboard header bar — matches the 3-D screen style */}
        <div className="w-full bg-[#111] border-b border-white/5 px-4 py-3 flex justify-between items-center">
          <span className="text-xs font-bold text-white/40 tracking-widest uppercase">Pricing Store</span>
          <span className="text-xs font-bold text-[#3b82f6] tracking-widest animate-pulse">● LIVE</span>
        </div>

        {/* Animated slide */}
        <div className="bg-[#080808] relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={animationKey}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.18 },
                scale: { duration: 0.22 },
              }}
              className="p-5 flex flex-col gap-3"
            >
              {/* Name + price */}
              <div className="flex justify-between items-start">
                <div className="min-w-0 pr-3">
                  <h3 className="text-xl font-extrabold text-white tracking-tighter leading-none mb-1">
                    {consoleData.name}
                  </h3>
                  <p className={`text-xs font-medium ${isPrimary ? "text-[#3b82f6]" : "text-white/60"}`}>
                    {consoleData.subtitle}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-2xl font-black text-white leading-none">{currentPlan.price}</span>
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mt-0.5">
                    / {currentPlan.duration}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2">
                {consoleData.features.map((f, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2 text-sm font-medium ${isPrimary ? "text-white/90" : "text-white/70"}`}
                  >
                    <span className={`text-sm shrink-0 ${isPrimary ? "text-[#3b82f6]" : "text-white/30"}`}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://wa.me/917990613681"
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "w-full py-3 text-center font-bold rounded-xl text-sm tracking-widest uppercase block",
                  "transition-colors mt-1",
                  isPrimary
                    ? "bg-[#3b82f6] hover:bg-[#4ea0ff] text-white shadow-[0_0_18px_rgba(59,130,246,0.4)]"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/10",
                ].join(" ")}
              >
                {consoleData.ctaText}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── EXPORTED COMPONENT ───────────────────────────────────────────────────────
export function RentalCards({ defaultConsole = "ps5", hideToggle = false }: { defaultConsole?: "ps5" | "ps4", hideToggle?: boolean } = {}) {
  const [activeConsole, setActiveConsole] = useState<"ps5" | "ps4">(defaultConsole);
  const [direction, setDirection] = useState(0);
  const [isFlickering, setIsFlickering] = useState(false);
  const [selectedPlanIndices, setSelectedPlanIndices] = useState({ ps5: 0, ps4: 0 });

  // SSR-safe: start false, flip after mount to avoid hydration mismatch.
  // show3D = true only at ≥1024px wide — below that use the standalone 2-D card.
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setShow3D(mq.matches);
    const handler = (e: MediaQueryListEvent) => setShow3D(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const currentConsoleData = pricingPlans[activeConsole];
  const selectedPlanIndex = selectedPlanIndices[activeConsole];

  const triggerFlicker = () => {
    setIsFlickering(true);
    setTimeout(() => setIsFlickering(false), 150);
  };

  const toggleConsole = (newConsole: "ps5" | "ps4") => {
    if (activeConsole === newConsole) return;
    triggerFlicker();
    setDirection(newConsole === "ps4" ? 1 : -1);
    setActiveConsole(newConsole);
  };

  const cyclePlan = (dir: number) => {
    const totalPlans = currentConsoleData.plans.length;
    if (totalPlans <= 1) return;
    triggerFlicker();
    setDirection(dir);
    setSelectedPlanIndices(prev => {
      let nextIndex = prev[activeConsole] + dir;
      if (nextIndex >= totalPlans) nextIndex = 0;
      if (nextIndex < 0) nextIndex = totalPlans - 1;
      return { ...prev, [activeConsole]: nextIndex };
    });
  };

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#020202] relative z-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 relative z-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">Choose Your Console.</h2>
          <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
            Flexible rental options integrated directly into the dashboard.
          </p>
        </div>

        <div className="flex flex-col items-center w-full relative z-20">
          {/* Toggle */}
          {!hideToggle && (
            <div className="mb-8 flex gap-2 p-1 bg-[#050505] rounded-full border border-white/10">
              <button
                onClick={() => toggleConsole("ps5")}
                className={`px-8 py-2 rounded-full font-bold text-xs tracking-widest transition-all ${activeConsole === "ps5" ? "bg-[#3b82f6] text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]" : "text-white/40 hover:text-white"
                  }`}
              >PS5</button>
              <button
                onClick={() => toggleConsole("ps4")}
                className={`px-8 py-2 rounded-full font-bold text-xs tracking-widest transition-all ${activeConsole === "ps4" ? "bg-white/10 text-white border border-white/10" : "text-white/40 hover:text-white"
                  }`}
              >PS4</button>
            </div>
          )}

          {/* ── MODE A: 3-D Canvas (≥1024px) ── */}
          {show3D ? (
            <div className="relative w-full" style={{ height: "min(90vh, 760px)", minHeight: "560px" }}>
              {/* Left arrow */}
              <button onClick={() => cyclePlan(-1)} aria-label="Previous Plan"
                className="absolute left-0 md:left-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-[#050505] border border-white/10 text-white/50 hover:text-[#3b82f6] hover:border-[#3b82f6]/50 transition-all group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <Canvas
                camera={{ position: [0, 0, 4], fov: 62 }}
                className="w-full h-full"
                style={{ background: "transparent" }}
              >
                <Suspense fallback={
                  <Html center>
                    <div className="text-white/50 text-sm font-bold tracking-widest uppercase animate-pulse px-6 py-3 bg-white/5 rounded-lg">
                      Loading…
                    </div>
                  </Html>
                }>
                  <DeviceModel
                    currentConsoleData={currentConsoleData}
                    direction={direction}
                    isFlickering={isFlickering}
                    activeConsole={activeConsole}
                    cyclePlan={cyclePlan}
                    selectedPlanIndex={selectedPlanIndex}
                  />
                  <ContactShadows position={[0, -2.8, 0]} opacity={0.5} scale={14} blur={2.5} far={5} />
                </Suspense>
              </Canvas>

              {/* Right arrow */}
              <button onClick={() => cyclePlan(1)} aria-label="Next Plan"
                className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-[#050505] border border-white/10 text-white/50 hover:text-[#3b82f6] hover:border-[#3b82f6]/50 transition-all group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-0.5 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          ) : (
            /* ── MODE B: Standalone 2-D card (<1024px) ── */
            <StandaloneCard
              consoleData={currentConsoleData}
              activeConsole={activeConsole}
              selectedPlanIndex={selectedPlanIndex}
              direction={direction}
              isFlickering={isFlickering}
              onPrev={() => cyclePlan(-1)}
              onNext={() => cyclePlan(1)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
