'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useAnimationFrame, animate } from 'framer-motion';

const GAMES = [
  { title: 'GTA V', genre: 'Open World', color: 'from-orange-900 to-yellow-900', image: '/images/games/GTAV.jpg' },
  { title: 'Minecraft', genre: 'Sandbox', color: 'from-green-700 to-green-900', image: '/images/games/minecraft.jpg' },
  { title: 'Tekken 7', genre: 'Fighting', color: 'from-red-900 to-red-950', image: '/images/games/tekken7.jpg' },
  { title: 'FIFA 24', genre: 'Sports', color: 'from-emerald-800 to-teal-900', image: '/images/games/fc24.jpg' },
  { title: 'God Of War', genre: 'Action / RPG', color: 'from-slate-800 to-slate-900', image: '/images/games/GOD.jpg' },
  { title: 'Call of Duty', genre: 'Shooter', color: 'from-gray-800 to-gray-900', image: '/images/games/COD.jpg' },
  { title: 'Black Ops III', genre: 'Shooter', color: 'from-orange-800 to-neutral-900', image: '/images/games/ops3.jpg' },
  { title: 'MK11', genre: 'Fighting', color: 'from-yellow-800 to-red-900', image: '/images/games/mk11.jpg' },
  { title: 'NBA 2K17', genre: 'Sports', color: 'from-blue-800 to-red-900', image: '/images/games/NBA17.jpg' },
  { title: 'NFS', genre: 'Racing', color: 'from-purple-900 to-pink-900', image: '/images/games/NFS.jpg' },
  { title: 'RDR 2', genre: 'Action / Adventure', color: 'from-red-900 to-amber-900', image: '/images/games/RDR.jpg' },
  { title: 'A Way Out', genre: 'Co-op', color: 'from-orange-800 to-yellow-800', image: '/images/games/wayout.jpg' },
  { title: 'Pacify', genre: 'Horror', color: 'from-zinc-800 to-zinc-950', image: '/images/games/pacify.jpg' },
  { title: 'Asphalt Legends', genre: 'Racing', color: 'from-blue-800 to-purple-900', image: '/images/games/asphalt.jpg' },
  { title: 'Rocket League', genre: 'Sports / Action', color: 'from-cyan-700 to-blue-900', image: '/images/games/rocket.jpg' },
  { title: 'Uncharted', genre: 'Action / Adventure', color: 'from-emerald-900 to-teal-950', image: '/images/games/uncharted.jpg' },
  { title: 'Fortnite', genre: 'Battle Royale', color: 'from-purple-600 to-fuchsia-900', image: '/images/games/fortnite.jpg' },
  { title: 'FIFA 19', genre: 'Sports', color: 'from-slate-700 to-slate-900', image: '/images/games/fifa19.jpg' },
  { title: 'Spider-Man', genre: 'Action', color: 'from-red-700 to-blue-900', image: '/images/games/spiderman.jpg' },
  { title: 'WWE 2K25', genre: 'Sports / Fighting', color: 'from-stone-800 to-stone-900', image: '/images/games/wwe25.jpg' },
  { title: 'Valorant', genre: 'Tactical Shooter', color: 'from-red-600 to-red-900', image: '/images/games/valorant.jpg' },
];

// 4 copies for seamless infinite looping using transforms
const ALL_GAMES = [...GAMES, ...GAMES, ...GAMES, ...GAMES];

function GameCard({ game }: { game: typeof GAMES[0] }) {
  return (
    <div className="flex-shrink-0 w-44 md:w-52 group cursor-default select-none">
      <div className={`relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b ${game.color} shadow-xl group-hover:border-[#3b82f6]/40 transition-all duration-300`}>
        <img src={game.image} alt={game.title} className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 opacity-10 -z-10"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <span className="text-6xl font-black text-white/10 select-none">{game.title.charAt(0)}</span>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10" />
        <div className="absolute bottom-0 inset-x-0 p-3 z-20">
          <p className="text-xs font-bold text-[#3b82f6] uppercase tracking-wider mb-0.5">{game.genre}</p>
          <h4 className="text-sm font-bold text-white leading-tight">{game.title}</h4>
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#3b82f6]/5 rounded-xl" />
      </div>
    </div>
  );
}

export function GameLibrary() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: '-60px' });
  const trackRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactTimeout = useRef<NodeJS.Timeout | null>(null);

  const x = useMotionValue(0);
  const speed = 0.05; // Faster, buttery smooth pixel/ms

  useAnimationFrame((time, delta) => {
    if (isHovered || isInteracting) return;

    if (trackRef.current) {
      let currentX = x.get();
      // Move left continuously
      currentX -= speed * delta;

      // Safe infinite looping jump
      // We have 4 sets of games. One set's width is scrollWidth / 4.
      const singleSetWidth = trackRef.current.scrollWidth / 4;

      if (currentX <= -singleSetWidth * 2) {
        currentX += singleSetWidth;
      } else if (currentX > 0) {
        currentX -= singleSetWidth;
      }

      x.set(currentX);
    }
  });

  const handleManualScroll = (amount: number) => {
    if (!trackRef.current) return;

    // We adjust 'x' directly instead of scrollLeft
    // If user clicks "right arrow", they want to see games on the right -> track moves left (-amount)
    // If user clicks "left arrow", they want to see games on the left -> track moves right (+amount)
    const newX = x.get() + amount;

    animate(x, newX, { type: 'spring', stiffness: 300, damping: 30 });

    setIsInteracting(true);
    if (interactTimeout.current) clearTimeout(interactTimeout.current);
    interactTimeout.current = setTimeout(() => setIsInteracting(false), 3000);
  };

  return (
    <section className="py-24 md:py-32 bg-[#020202] border-t border-white/5 overflow-hidden">
      <div ref={headingRef} className="text-center mb-14 px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[#3b82f6] text-sm font-bold uppercase tracking-widest mb-3"
        >
          What's in the box
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-black text-white tracking-tighter"
        >
          Our Game Library
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-white/40 text-lg mt-3 font-medium"
        >
          Every rental includes your choice of game. More titles added weekly.
        </motion.p>
      </div>

      <div
        className="relative w-full group overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[#020202] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[#020202] to-transparent" />

        {/* Left Arrow Button -> Moves track right (+400) to reveal left items */}
        <button
          onClick={() => handleManualScroll(400)}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-[#050505] border border-white/10 text-white/50 hover:text-[#3b82f6] hover:border-[#3b82f6]/50 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-xl"
          aria-label="Scroll Left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 -translate-x-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Right Arrow Button -> Moves track left (-400) to reveal right items */}
        <button
          onClick={() => handleManualScroll(-400)}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-[#050505] border border-white/10 text-white/50 hover:text-[#3b82f6] hover:border-[#3b82f6]/50 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-xl"
          aria-label="Scroll Right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 translate-x-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Animated Track using Framer Motion Transform */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-4 md:gap-5 px-8 md:px-32 py-4 w-max"
        >
          {ALL_GAMES.map((game, i) => (
            <GameCard key={`${game.title}-${i}`} game={game} />
          ))}
        </motion.div>
      </div>

      {/* CTA below carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-10 px-6"
      >
        <p className="text-white/30 text-sm font-medium">
          + More titles available upon request during booking
        </p>
      </motion.div>
    </section>
  );
}
