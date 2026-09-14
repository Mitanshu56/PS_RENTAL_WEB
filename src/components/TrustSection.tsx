"use client";

import { motion, Variants } from "framer-motion";

const features = [
  {
    num: "01",
    title: "Premium Consoles",
    desc: "Clean, tested and ready to play. Every console is sanitized and updated before delivery.",
    accent: "bg-blue-500",
    textAccent: "text-blue-400",
  },
  {
    num: "02",
    title: "Popular Games",
    desc: "Choose from a curated gaming library including the latest hits and classic co-op games.",
    accent: "bg-purple-500",
    textAccent: "text-purple-400",
  },
  {
    num: "03",
    title: "Doorstep Delivery",
    desc: "Get your setup delivered directly to you. Available for local doorstep delivery.",
    accent: "bg-emerald-500",
    textAccent: "text-emerald-400",
  },
  {
    num: "04",
    title: "Easy Booking",
    desc: "Book your gaming session in minutes. No complex paperwork, just pure gaming.",
    accent: "bg-[#3b82f6]", // Brand cyan/blue
    textAccent: "text-[#3b82f6]",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 30 } 
  },
};

export function TrustSection() {
  return (
    <section className="py-24 bg-[#020202] relative z-10 border-t border-white/5 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[#3b82f6]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
            <span className="text-sm font-bold text-white tracking-widest uppercase">The PlayRent Standard</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 tracking-tighter mb-6">
            Simple. Fast. Reliable.
          </h2>
          <p className="text-white/50 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Experience gaming without the hassle. We handle the hardware so you can focus on the gameplay.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.num}
              variants={cardVariants}
              whileHover="hover"
              className="group relative rounded-3xl bg-white/5 border border-white/10 p-8 overflow-hidden backdrop-blur-md"
            >
              {/* Hover Fill Effect Layer */}
              <motion.div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${feature.accent}`}
              />
              
              {/* Dynamic Gradient Sweep on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />

              <div className="relative z-10">
                {/* Glowing Number Badge */}
                <div className="w-14 h-14 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center mb-8 relative shadow-lg group-hover:border-white/20 transition-colors duration-300">
                  <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${feature.accent}`} />
                  <span className={`text-xl font-black tracking-tighter ${feature.textAccent}`}>
                    {feature.num}
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300">
                  {feature.title}
                </h4>
                
                <p className="text-white/60 font-medium leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {feature.desc}
                </p>
              </div>

              {/* Huge Background Watermark Number */}
              <div className="absolute -bottom-6 -right-4 text-9xl font-black text-white/[0.02] pointer-events-none group-hover:text-white/[0.04] group-hover:scale-110 transition-all duration-500 origin-bottom-right">
                {feature.num}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
