'use client';

import { useState, Suspense, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, Html, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// ─── PRICING DATA ─────────────────────────────────────────────────────────────
const pricingPlans = {
  ps5: {
    name: "PS5",
    subtitle: "Next-gen gaming experience",
    price: "₹499",
    duration: "6 Hours",
    features: ["Premium console", "DualSense controller", "3 Premium Games", "Free Delivery"],
    ctaText: "Rent PS5",
    primary: true,
  },
  ps4: {
    name: "PS4",
    subtitle: "Classic PlayStation experience",
    price: "₹299",
    duration: "6 Hours",
    features: ["PS4 console", "DualShock controller", "3 Popular Games", "Free Delivery"],
    ctaText: "Rent PS4",
    primary: false,
  },
};

useGLTF.preload("/models/nintendo_switch.glb");

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0, scale: 0.95 }),
  center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
  exit: (d: number) => ({ zIndex: 0, x: d < 0 ? 60 : -60, opacity: 0, scale: 0.95 }),
};

// ─── 3D DEVICE MODEL ─────────────────────────────────────────────────────────
function DeviceModel({ currentPlan, direction, isFlickering, activeConsole, switchConsole }: any) {
  const gltf = useGLTF("/models/nintendo_switch.glb");
  const { viewport } = useThree();

  // Clone the scene on every mount so hot-reloads never accumulate stale mutations
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // ── Compute scale via Box3 on the RAW (unrotated) clone ───────────────────
  // We measure before rotation so width/height are in model-local space.
  const { scaleFactor, screenZ } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Center the model at origin (translate so bounding box center = 0,0,0)
    scene.position.sub(center);

    // The GLB has its long axis along X (joy-con to joy-con).
    // Its screen faces +Y (upward in model space).
    // After rotation.x = +π/2: the +Y axis maps to +Z (toward camera). ✓
    // Camera is at z=5, fov=60. viewport.width ≈ 10 world units.
    // We target 5.8 world units so model fills most of the canvas.
    const naturalLongAxis = Math.max(size.x, size.z);
    const targetWidth = Math.min(viewport.width * 0.88, 8);
    const sf = targetWidth / naturalLongAxis;

    // After centering + +π/2 X-rotation applied on the group:
    //   model's +Y (screen face) → world +Z (toward camera)
    //   screen surface sits at (box.max.y - center.y) * sf from origin in +Z
    const screenSurface = (box.max.y - 0) * sf; // center.y already subtracted above
    const hz = screenSurface + 0.02; // nudge 0.02 so Html sits in front of mesh

    return { scaleFactor: sf, screenZ: hz };
  }, [scene, viewport.width]);

  // Apply the +π/2 X rotation to the scene object directly (not via group prop,
  // which can conflict with Float's internal transforms)
  useMemo(() => {
    scene.rotation.set(Math.PI / 2, 0, 0);
    scene.scale.setScalar(scaleFactor);
  }, [scene, scaleFactor]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (e.point.x < -0.4) switchConsole(-1);
    else if (e.point.x > 0.4) switchConsole(1);
  };

  return (
    <Float rotationIntensity={0.1} floatIntensity={0.3} speed={1.2}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" castShadow />
      <spotLight position={[-7, 6, -4]} intensity={5} color="#3b82f6" penumbra={2} angle={0.3} />
      <spotLight position={[6, -2, 4]} intensity={2} color="#a855f7" penumbra={2} angle={0.4} />
      <Environment preset="city" />

      {/* The model — already has rotation + scale + centering baked in via useMemo above */}
      <primitive
        object={scene}
        onPointerDown={handleClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      />

      {/*
        Html sits at world position [0, 0, screenZ] facing the camera.
        screenZ = the Z distance of the screen surface after +π/2 X-rotation.
        htmlScale = computed so 820px maps to the physical screen width.
      */}
      <Html
        transform
        occlude="blending"
        position={[0, 0.1, screenZ]}
        scale={0.27}
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
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeConsole}
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
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="text-5xl font-extrabold text-white tracking-tighter mb-1">{currentPlan.name}</h3>
                    <p className={currentPlan.primary ? "text-[#3b82f6] font-bold text-lg" : "text-white/60 font-medium text-lg"}>
                      {currentPlan.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-5xl font-black text-white">{currentPlan.price}</span>
                    <span className="text-white/50 text-sm font-bold uppercase tracking-widest block mt-1">/ {currentPlan.duration}</span>
                  </div>
                </div>
                <ul className="space-y-2 font-medium mb-7 text-lg">
                  {currentPlan.features.map((f: string, i: number) => (
                    <li key={i} className={`flex items-center gap-3 ${currentPlan.primary ? "text-white/90" : "text-white/70"}`}>
                      <span className={currentPlan.primary ? "text-[#3b82f6]" : "text-white/40"}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 font-bold rounded-lg text-lg tracking-widest uppercase transition-colors ${currentPlan.primary
                  ? "bg-[#3b82f6] hover:bg-[#4ea0ff] text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/5"
                  }`}>
                  {currentPlan.ctaText}
                </button>
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

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export function RentalCards() {
  const [activeConsole, setActiveConsole] = useState<"ps5" | "ps4">("ps5");
  const [direction, setDirection] = useState(0);
  const [isFlickering, setIsFlickering] = useState(false);

  const switchConsole = (newDirection: number) => {
    setIsFlickering(true);
    setTimeout(() => setIsFlickering(false), 150);
    setDirection(newDirection);
    setActiveConsole((prev) => (prev === "ps5" ? "ps4" : "ps5"));
  };

  const currentPlan = pricingPlans[activeConsole];

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
          <div className="mb-6 flex gap-2 p-1 bg-[#050505] rounded-full border border-white/10">
            <button
              onClick={() => activeConsole !== "ps5" && switchConsole(-1)}
              className={`px-8 py-2 rounded-full font-bold text-xs tracking-widest transition-all ${activeConsole === "ps5" ? "bg-[#3b82f6] text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]" : "text-white/40 hover:text-white"
                }`}
            >PS5</button>
            <button
              onClick={() => activeConsole !== "ps4" && switchConsole(1)}
              className={`px-8 py-2 rounded-full font-bold text-xs tracking-widest transition-all ${activeConsole === "ps4" ? "bg-white/10 text-white border border-white/10" : "text-white/40 hover:text-white"
                }`}
            >PS4</button>
          </div>

          {/* Canvas */}
          <div className="relative w-full h-[90vh] min-h-[700px]">
            {/* Left */}
            <button onClick={() => switchConsole(-1)} aria-label="Previous"
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
                  currentPlan={currentPlan}
                  direction={direction}
                  isFlickering={isFlickering}
                  activeConsole={activeConsole}
                  switchConsole={switchConsole}
                />
                <ContactShadows position={[0, -2.8, 0]} opacity={0.5} scale={14} blur={2.5} far={5} />
              </Suspense>
            </Canvas>

            {/* Right */}
            <button onClick={() => switchConsole(1)} aria-label="Next"
              className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-[#050505] border border-white/10 text-white/50 hover:text-[#3b82f6] hover:border-[#3b82f6]/50 transition-all group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-0.5 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
