"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { CanvasRenderer } from "./CanvasRenderer";
import { StoryOverlays } from "./StoryOverlays";

export function ScrollyTelling() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress purely within this container's boundaries
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[1000vh] bg-[#050505] w-full">
      {/* 
        The sticky container is now a true full-screen cinematic stage.
        Both the Canvas and the StoryText float in this same container, layered via z-index.
      */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* Layer 1: Massive Background Canvas (z-10) */}
        <div className="absolute inset-0 z-10 w-full h-full">
          <CanvasRenderer numFrames={240} scrollYProgress={scrollYProgress} />
        </div>

        {/* Layer 2: Floating Safe-Zone Typography (z-20) */}
        <div className="absolute inset-0 z-20 w-full h-full pointer-events-none">
          <StoryOverlays scrollYProgress={scrollYProgress} />
        </div>

      </div>
    </div>
  );
}
