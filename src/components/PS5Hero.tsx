'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ─── Reusable glow accent (matches site design system) ───────────────────────
const GlowAccent = ({ children }: { children: React.ReactNode }) => (
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#0070CC] drop-shadow-[0_0_18px_rgba(59,130,246,0.7)]">
    {children}
  </span>
);

// ─── Word-by-word staggered reveal ───────────────────────────────────────────
function StaggerReveal({ text, accentWords = [], delay = 0 }: {
  text: string;
  accentWords?: string[];
  delay?: number;
}) {
  const words = text.split(' ');
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block overflow-hidden mr-[0.25em]"
          variants={{ hidden: {}, visible: {} }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: { y: '0%', opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {accentWords.includes(word.replace(/[.,!?]/g, '')) ? (
              <GlowAccent>{word}</GlowAccent>
            ) : (
              word
            )}
          </motion.span>
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── Story beat (appears at a specific video time) ────────────────────────────
function TimedBeat({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center px-8"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── MAIN HERO ────────────────────────────────────────────────────────────────
export function PS5Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const copyInView = useInView(copyRef, { once: true, margin: '-80px' });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTimeUpdate = () => setCurrentTime(v.currentTime);
    const onLoaded = () => setVideoDuration(v.duration);
    const onEnded = () => setVideoEnded(true);
    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('loadedmetadata', onLoaded);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('loadedmetadata', onLoaded);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  // Beat timing — normalized to video duration (works for any video length)
  const pct = videoDuration > 0 ? currentTime / videoDuration : 0;
  const showBeat1 = pct < 0.28;                       // Opening — "You've mastered the PS4."
  const showBeat2 = pct >= 0.30 && pct < 0.65;        // Mid — "Now it's time to feel the difference."
  const showBeat3 = pct >= 0.68 || videoEnded;         // End — "Welcome to next-gen."

  return (
    <div className="bg-[#020202]">
      {/* ── SECTION 1: Full-viewport video with timed text overlays ── */}
      <section
        ref={sectionRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video */}
        <video
          ref={videoRef}
          src="/videos/ps4-to-ps5.mp4"
          autoPlay
          muted
          playsInline
          loop={false}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />

        {/* Timed storytelling text */}
        <div className="relative z-20 w-full h-full pointer-events-none">
          {/* Beat 1 — Opening */}
          <TimedBeat show={showBeat1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white text-center tracking-tighter leading-[1.05]">
              You've mastered the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/50">
                PS4.
              </span>
            </h1>
          </TimedBeat>

          {/* Beat 2 — Mid-transformation */}
          <TimedBeat show={showBeat2}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white text-center tracking-tighter leading-[1.1] max-w-3xl mx-auto">
              Now it's time to{' '}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-[#0070CC] drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]">
                feel the difference.
              </span>
            </h2>
          </TimedBeat>

          {/* Beat 3 — End reveal */}
          <TimedBeat show={showBeat3}>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-lg md:text-xl font-medium text-white/60 uppercase tracking-widest mb-4">
                Welcome to next-gen.
              </p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white">
                Welcome to{' '}
                <GlowAccent>PS5.</GlowAccent>
              </h2>
            </div>
          </TimedBeat>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-white/30 text-xs font-bold tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* ── SECTION 1b: Why upgrade copy — bold punchy lines ── */}
      <section ref={copyRef} className="py-28 md:py-36 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="space-y-16">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={copyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            <span className="text-[#3b82f6] text-sm font-bold uppercase tracking-widest">01 — Speed</span>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              Games load in{' '}
              <GlowAccent>under 2 seconds.</GlowAccent>
            </h3>
            <p className="text-white/50 text-lg font-medium max-w-xl mt-2">
              The PS5's custom 825GB SSD is 100× faster than a PS4 hard drive.
              Open worlds. Zero waiting. Pure play.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={copyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 md:ml-24"
          >
            <span className="text-[#3b82f6] text-sm font-bold uppercase tracking-widest">02 — Feel</span>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              The controller{' '}
              <GlowAccent>fights back.</GlowAccent>
            </h3>
            <p className="text-white/50 text-lg font-medium max-w-xl mt-2">
              DualSense's haptic feedback and adaptive triggers let you feel rain,
              resistance, and every heartbeat — not just see them.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={copyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            <span className="text-[#3b82f6] text-sm font-bold uppercase tracking-widest">03 — Visuals</span>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              <GlowAccent>4K. 120fps. Ray tracing.</GlowAccent>
            </h3>
            <p className="text-white/50 text-lg font-medium max-w-xl mt-2">
              Real-time reflections, cinematic lighting, silky-smooth framerates.
              This is what next-gen actually looks like.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={copyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 md:ml-24"
          >
            <span className="text-[#3b82f6] text-sm font-bold uppercase tracking-widest">04 — Library</span>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              Your PS4 games.{' '}
              <GlowAccent>All of them.</GlowAccent>
            </h3>
            <p className="text-white/50 text-lg font-medium max-w-xl mt-2">
              Full backward compatibility. Every game you already love, now
              loading faster, looking sharper, feeling better.
            </p>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
