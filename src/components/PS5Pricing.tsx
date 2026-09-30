'use client';

import { useState, Suspense, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, Html, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

import { useIsMobile } from "@/hooks/useIsMobile";

// ─── Plan data ────────────────────────────────────────────────────────────────
const ps5Plans = {
  base: {
    id:       "base",
    name:     "PS5 Starter",
    subtitle: "Standard next-gen gaming",
    price:    "₹499",
    duration: "6 Hours",
    features: ["Premium PS5 console", "1 DualSense controller", "3 Premium Games", "Free Delivery"],
    ctaText:  "Rent Starter",
    primary:  false,
  },
  pro: {
    id:       "pro",
    name:     "PS5 Pro",
    subtitle: "The ultimate 4K experience",
    price:    "₹699",
    duration: "6 Hours",
    features: ["PS5 Pro console", "2 DualSense controllers", "5 Premium Games", "Free Delivery"],
    ctaText:  "Rent Pro Plan",
    primary:  true,
  },
  vr: {
    id:       "vr",
    name:     "PSVR2 Bundle",
    subtitle: "Immersive virtual reality",
    price:    "₹999",
    duration: "6 Hours",
    features: ["Premium PS5 console", "PSVR2 Headset", "2 VR Games", "Free Delivery"],
    ctaText:  "Rent VR Bundle",
    primary:  false,
  },
} as const;

const planKeys = ["base", "pro", "vr"] as const;
type PlanKey  = typeof planKeys[number];
type Plan     = typeof ps5Plans[PlanKey];

// Pre-load GLB (no-op on mobile since Canvas never mounts)
useGLTF.preload("/models/nintendo_switch.glb");

// ─── Shared slide variants ────────────────────────────────────────────────────
const slideVariants = {
  enter:  (d: number) => ({ x: d > 0 ?  60 : -60, opacity: 0, scale: 0.97 }),
  center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
  exit:   (d: number) => ({ zIndex: 0, x: d < 0 ?  60 : -60, opacity: 0, scale: 0.97 }),
};

const slideTransition = {
  x:       { type: "spring" as const, stiffness: 300, damping: 30 },
  opacity: { duration: 0.18 },
  scale:   { duration: 0.22 },
};

const WA = "https://wa.me/917990613681";

// ─── Shared inner card content ────────────────────────────────────────────────
// Used both inside the Html-transform 3-D overlay AND the standalone 2-D card.
function PS5CardContent({
  plan,
  animKey,
  direction,
  isFlickering,
  interactive,
}: {
  plan:         Plan;
  animKey:      string;
  direction:    number;
  isFlickering: boolean;
  interactive:  boolean;
}) {
  const isPrimary = plan.primary;

  return (
    <div className="w-full h-full bg-[#080808] overflow-hidden flex flex-col relative select-none">
      {/* Dashboard header */}
      <div className="w-full bg-[#111] border-b border-white/5 px-4 py-2.5 flex justify-between items-center shrink-0">
        <span className="text-[11px] font-bold text-white/40 tracking-widest uppercase">
          PS5 Rental Store
        </span>
        <span className="text-[11px] font-bold text-[#3b82f6] tracking-widest animate-pulse">
          ● LIVE
        </span>
      </div>

      {/* Animated slide panel */}
      <div className={`flex-1 relative overflow-hidden ${interactive ? "pointer-events-auto" : "pointer-events-none"}`}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={animKey}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-center"
          >
            {/* Name + price */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tighter leading-none mb-1">
                  {plan.name}
                </h3>
                <p className={`text-sm font-medium ${isPrimary ? "text-[#3b82f6]" : "text-white/60"}`}>
                  {plan.subtitle}
                </p>
              </div>
              <div className="text-right shrink-0 ml-3">
                <span className="text-2xl sm:text-3xl font-black text-white leading-none">
                  {plan.price}
                </span>
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mt-0.5">
                  / {plan.duration}
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-5 flex-1">
              {plan.features.map((f, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-2.5 text-sm font-medium ${isPrimary ? "text-white/90" : "text-white/70"}`}
                >
                  <span className={`text-base leading-none ${isPrimary ? "text-[#3b82f6]" : "text-white/30"}`}>
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "w-full py-3 text-center font-bold rounded-xl text-sm tracking-widest uppercase",
                "block transition-colors shrink-0",
                isPrimary
                  ? "bg-[#3b82f6] hover:bg-[#4ea0ff] text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/10",
              ].join(" ")}
            >
              {plan.ctaText}
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Flicker shimmer */}
      <div
        className={[
          "absolute inset-0 pointer-events-none transition-all duration-[50ms]",
          isFlickering
            ? "bg-[#3b82f6]/50 mix-blend-screen"
            : "bg-gradient-to-br from-white/5 to-transparent opacity-40",
        ].join(" ")}
      />
    </div>
  );
}

// ─── 3-D Device Model (desktop only) ─────────────────────────────────────────
function DeviceModel({ currentPlan, direction, isFlickering, activePlan, switchPlan }: {
  currentPlan:  Plan;
  direction:    number;
  isFlickering: boolean;
  activePlan:   PlanKey;
  switchPlan:   (step: number) => void;
}) {
  const gltf = useGLTF("/models/nintendo_switch.glb");
  const { viewport } = useThree();
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  const { scaleFactor, screenZ } = useMemo(() => {
    const box    = new THREE.Box3().setFromObject(scene);
    const size   = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
    const naturalLongAxis = Math.max(size.x, size.z);
    const targetWidth     = Math.min(viewport.width * 0.88, 8);
    const sf              = targetWidth / naturalLongAxis;
    const hz              = (box.max.y - 0) * sf + 0.02;
    return { scaleFactor: sf, screenZ: hz };
  }, [scene, viewport.width]);

  useMemo(() => {
    scene.rotation.set(Math.PI / 2, 0, 0);
    scene.scale.setScalar(scaleFactor);
  }, [scene, scaleFactor]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (e.point.x < -0.4) switchPlan(-1);
    else if (e.point.x > 0.4) switchPlan(1);
  };

  return (
    <Float rotationIntensity={0.1} floatIntensity={0.3} speed={1.2}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" castShadow />
      <spotLight position={[-7, 6, -4]} intensity={5} color="#3b82f6" penumbra={2} angle={0.3} />
      <spotLight position={[6, -2, 4]}  intensity={2} color="#a855f7" penumbra={2} angle={0.4} />
      <Environment preset="city" />

      <primitive
        object={scene}
        onPointerDown={handleClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() =>  (document.body.style.cursor = "auto")}
      />

      <Html
        transform
        occlude="blending"
        position={[0, 0.1, screenZ]}
        scale={0.22}
        rotation={[0, 0, 0]}
        className="w-[820px] h-[460px] pointer-events-none"
      >
        <PS5CardContent
          plan={currentPlan}
          animKey={activePlan}
          direction={direction}
          isFlickering={isFlickering}
          interactive={false}
        />
      </Html>
    </Float>
  );
}

// ─── 2-D Mobile card (no WebGL) ──────────────────────────────────────────────
function MobilePS5Card({
  activePlanIdx,
  direction,
  isFlickering,
  onPrev,
  onNext,
  onDot,
}: {
  activePlanIdx: number;
  direction:     number;
  isFlickering:  boolean;
  onPrev:        () => void;
  onNext:        () => void;
  onDot:         (i: number) => void;
}) {
  const activePlanKey = planKeys[activePlanIdx];
  const plan          = ps5Plans[activePlanKey];

  return (
    <div className="w-full max-w-sm mx-auto px-1">
      {/* Dot navigator + arrows */}
      <div className="flex items-center justify-between mb-3 px-1">
        {/* Left arrow */}
        <button
          onClick={onPrev}
          aria-label="Previous Plan"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#050505] border border-white/10 text-white/50 hover:text-[#3b82f6] hover:border-[#3b82f6]/50 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Plan dots */}
        <div className="flex gap-2 items-center">
          {planKeys.map((key, i) => (
            <button
              key={key}
              onClick={() => onDot(i)}
              aria-label={ps5Plans[key].name}
              className={[
                "rounded-full transition-all duration-200",
                i === activePlanIdx
                  ? "w-5 h-2 bg-[#3b82f6]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40",
              ].join(" ")}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={onNext}
          aria-label="Next Plan"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#050505] border border-white/10 text-white/50 hover:text-[#3b82f6] hover:border-[#3b82f6]/50 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Card shell — mirrors the 3-D screen dashboard */}
      <div
        className={[
          "w-full rounded-2xl overflow-hidden border",
          plan.primary
            ? "border-[#3b82f6]/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            : "border-white/10",
        ].join(" ")}
        style={{ minHeight: 290 }}
      >
        <PS5CardContent
          plan={plan}
          animKey={activePlanKey}
          direction={direction}
          isFlickering={isFlickering}
          interactive={true}
        />
      </div>

      {/* Plan name label */}
      <p className="text-center text-xs font-bold text-white/30 tracking-widest uppercase mt-3">
        {plan.name}
      </p>
    </div>
  );
}

// ─── EXPORTED SECTION ─────────────────────────────────────────────────────────
export function PS5Pricing() {
  const [activePlanIdx, setActivePlanIdx] = useState(1); // start on 'pro'
  const [direction, setDirection]         = useState(0);
  const [isFlickering, setIsFlickering]   = useState(false);

  const isMobile     = useIsMobile();
  const activePlanKey = planKeys[activePlanIdx];
  const currentPlan   = ps5Plans[activePlanKey];

  const triggerFlicker = () => {
    setIsFlickering(true);
    setTimeout(() => setIsFlickering(false), 150);
  };

  const switchPlan = (step: number) => {
    triggerFlicker();
    setDirection(step);
    setActivePlanIdx(prev => {
      let next = prev + step;
      if (next < 0)                next = planKeys.length - 1;
      if (next >= planKeys.length) next = 0;
      return next;
    });
  };

  const setPlan = (idx: number) => {
    if (idx === activePlanIdx) return;
    triggerFlicker();
    setDirection(idx > activePlanIdx ? 1 : -1);
    setActivePlanIdx(idx);
  };

  return (
    <section
      id="ps5-pricing"
      className="py-16 sm:py-24 md:py-32 bg-[#020202] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12 relative z-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#0070CC] drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
              Experience
            </span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg font-medium max-w-xl mx-auto">
            Doorstep delivery. Zero commitment. Pure next-gen.
          </p>
        </div>

        <div className="flex flex-col items-center w-full relative z-20">

          {/* ── MOBILE (≤767px): 2-D card, no WebGL ── */}
          {isMobile ? (
            <MobilePS5Card
              activePlanIdx={activePlanIdx}
              direction={direction}
              isFlickering={isFlickering}
              onPrev={() => switchPlan(-1)}
              onNext={() => switchPlan(1)}
              onDot={setPlan}
            />
          ) : (
            /* ── DESKTOP (≥768px): full 3-D Canvas ── */
            <>
              {/* Plan toggle pills */}
              <div className="mb-6 flex gap-2 p-1 bg-[#050505] rounded-full border border-white/10 overflow-x-auto max-w-full">
                {planKeys.map((key, idx) => (
                  <button
                    key={key}
                    onClick={() => setPlan(idx)}
                    className={[
                      "px-5 py-2 rounded-full font-bold text-xs tracking-widest",
                      "transition-all whitespace-nowrap",
                      idx === activePlanIdx
                        ? "bg-[#3b82f6] text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                        : "text-white/40 hover:text-white",
                    ].join(" ")}
                  >
                    {ps5Plans[key].name}
                  </button>
                ))}
              </div>

              {/* 3-D Canvas */}
              <div className="relative w-full h-[90vh] min-h-[700px]">
                {/* Left arrow */}
                <button
                  onClick={() => switchPlan(-1)}
                  aria-label="Previous Plan"
                  className="absolute left-0 md:left-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-[#050505] border border-white/10 text-white/50 hover:text-[#3b82f6] hover:border-[#3b82f6]/50 transition-all group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                <Canvas
                  camera={{ position: [0, 0, 4], fov: 62 }}
                  className="w-full h-full"
                  style={{ background: "transparent" }}
                >
                  <Suspense
                    fallback={
                      <Html center>
                        <div className="text-white/50 text-sm font-bold tracking-widest uppercase animate-pulse px-6 py-3 bg-white/5 rounded-lg">
                          Loading…
                        </div>
                      </Html>
                    }
                  >
                    <DeviceModel
                      currentPlan={currentPlan}
                      direction={direction}
                      isFlickering={isFlickering}
                      activePlan={activePlanKey}
                      switchPlan={switchPlan}
                    />
                    <ContactShadows position={[0, -2.8, 0]} opacity={0.5} scale={14} blur={2.5} far={5} />
                  </Suspense>
                </Canvas>

                {/* Right arrow */}
                <button
                  onClick={() => switchPlan(1)}
                  aria-label="Next Plan"
                  className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-[#050505] border border-white/10 text-white/50 hover:text-[#3b82f6] hover:border-[#3b82f6]/50 transition-all group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-0.5 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
