"use client";

import { useEffect, useRef, useState } from "react";
import { useTransform, useMotionValueEvent, MotionValue, useSpring, motion } from "framer-motion";

interface CanvasRendererProps {
  numFrames: number;
  scrollYProgress: MotionValue<number>;
}

export function CanvasRenderer({ numFrames, scrollYProgress }: CanvasRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Apply Apple-style cinematic physics (momentum/easing lag) to the scroll timeline
  // PERFORMANCE FIX: Increased stiffness from 70 to 400, damping from 20 to 40.
  // This drastically reduces the sluggish "lag" while maintaining buttery smoothness.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  });

  // Map the smoothed scroll progress to the exact frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [1, numFrames], {
    clamp: true,
  });

  // Dynamic ambient lighting: pulse brighter during the climax (0.5 scroll)
  const bloomOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.35, 0.1]);

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= numFrames; i++) {
      const img = new Image();
      const frameString = i.toString().padStart(3, "0");
      img.src = `/Controller-jpg/ezgif-frame-${frameString}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === numFrames) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [numFrames]);

  useEffect(() => {
    if (isLoaded && images.length > 0 && canvasRef.current) {
      renderFrame(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, images]);

  const renderFrame = (index: number) => {
    const safeIndex = Math.max(1, Math.min(index, numFrames));
    if (!images[safeIndex - 1] || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = images[safeIndex - 1];

    if (canvas.width !== container.clientWidth || canvas.height !== container.clientHeight) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    // Fill background with exact matching color #050505
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;

    const isMobile = window.innerWidth < 768;
    const mobileSafeRatio = isMobile ? Math.min(hRatio * 0.9, vRatio) : Math.min(hRatio, vRatio) * 1.05;
    const ratio = mobileSafeRatio;

    const offsetX = isMobile ? 0 : canvas.width * 0.15;
    const offsetY = isMobile ? canvas.height * 0.25 : canvas.height * 0.05;

    const centerShift_x = ((canvas.width - img.width * ratio) / 2) + offsetX;
    const centerShift_y = ((canvas.height - img.height * ratio) / 2) + offsetY;

    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded) {
      renderFrame(Math.round(latest));
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        renderFrame(Math.round(frameIndex.get()));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, frameIndex]);

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center">

      {/* 
        PERFORMANCE FIX: 
        Removed mix-blend-screen and reduced blur radius. 
        Massive CSS blurs with complex blend modes cause massive GPU compositor bottlenecks during scroll!
      */}
      <motion.div
        style={{ opacity: bloomOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 transition-opacity duration-300 will-change-transform"
      >
        <div className="w-[40vw] h-[40vw] bg-[#0070CC] rounded-full blur-[100px]" />
      </motion.div>

      {!isLoaded && (
        <div className="absolute z-20 flex flex-col items-center justify-center">
          <p className="text-white/50 font-medium tracking-widest text-sm uppercase animate-pulse">
            Loading Cinematic Experience...
          </p>
        </div>
      )}

      {/* Continuous Ambient Idle Motion */}
      <motion.canvas
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        ref={canvasRef}
        className="w-full h-full block z-10 relative object-contain will-change-transform"
      />
    </div>
  );
}
