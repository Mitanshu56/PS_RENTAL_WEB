"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { BookingCTA } from "@/components/BookingCTA";
import { Footer } from "@/components/Footer";
import { GAMES, GameData } from "@/data/games";

function GameCard({ game }: { game: GameData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative flex flex-col cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-b ${game.color} opacity-0 transition-opacity duration-500 rounded-xl z-0 ${isOpen ? 'opacity-40 blur-xl' : ''}`} />

      {/* Card Container */}
      <div
        className={`relative aspect-[2/3] rounded-[10px] border border-white/10 transition-all duration-300 ease-out bg-[#050505] overflow-hidden ${isOpen
            ? 'scale-[1.1] shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 border-white/20'
            : 'scale-100 shadow-xl z-10'
          }`}
      >
        {/* Poster */}
        <img src={game.image} alt={game.title} className="absolute inset-0 w-full h-full object-cover z-0" />

        {/* Default State Minimal Label */}
        <div className={`absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 z-10 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
          <h3 className="text-white font-bold text-sm leading-tight truncate">{game.title}</h3>
        </div>

        {/* Detail Reveal Overlay (Hover/Tap) */}
        <div className={`absolute inset-0 transition-all duration-300 flex flex-col p-5 z-20 bg-[#050505]/95 backdrop-blur-sm ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {/* Subtle colored accent inside the detail card */}
          <div className={`absolute inset-0 bg-gradient-to-b ${game.color} opacity-20 pointer-events-none`} />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-white font-black text-xl leading-tight mb-2">
              {game.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 bg-white/10 text-white border border-white/10 rounded-full backdrop-blur-md">
                {game.genre}
              </span>
              {game.platform && (
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 bg-white/10 text-white rounded-full backdrop-blur-md">
                  {game.platform}
                </span>
              )}
            </div>
            <p className="text-white/70 text-sm font-medium leading-relaxed">
              {game.description}
            </p>

            <div className="mt-auto">
              <span className="text-[10px] font-bold text-[#3b82f6] uppercase tracking-widest animate-pulse">Included in Rental</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function GamesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Extract unique genres for the filter bar.
  // The user said: "treat each full genre string as its own distinct category exactly as written"
  const uniqueGenres = useMemo(() => {
    const genres = new Set<string>();
    GAMES.forEach((game) => genres.add(game.genre));
    return ["All", ...Array.from(genres)];
  }, []);

  const filteredGames = useMemo(() => {
    if (activeFilter === "All") return GAMES;
    return GAMES.filter(game => game.genre === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-[#3b82f6]/30 font-sans">
      <Navbar introState="done" />

      <main className="pt-24 pb-32">
        {/* HERO SECTION */}
        <section className="relative px-6 md:px-12 py-20 md:py-32 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#3b82f6]/10 rounded-full blur-[120px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
              <span className="text-sm font-bold tracking-widest uppercase">The Collection</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              OUR GAME LIBRARY.
            </h1>

            <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Every title. Every genre. One rental. Dive into our curated collection of next-gen hits and timeless classics.
            </p>
          </motion.div>
        </section>

        {/* FILTER BAR */}
        <section className="px-6 md:px-12 mb-16 relative z-20">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
            {uniqueGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveFilter(genre)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wider transition-all duration-300 ${activeFilter === genre
                    ? "bg-[#3b82f6] text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {genre.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        {/* UNIFIED GAMES GRID */}
        <section className="px-6 md:px-12 relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredGames.map((game, idx) => (
              // Add index to key just in case there are duplicates, though titles should be unique
              <GameCard key={`${game.title}-${idx}`} game={game} />
            ))}
          </div>
        </section>
      </main>

      <BookingCTA />
      <Footer />
    </div>
  );
}
