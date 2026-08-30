"use client";

export function TrustSection() {
  return (
    <section className="py-24 bg-brand-bg-primary relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">Simple. Fast. Reliable.</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div>
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <span className="text-xl text-white font-bold">01</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Premium Consoles</h4>
            <p className="text-white/60 font-medium leading-relaxed">
              Clean, tested and ready to play. Every console is sanitized and updated before delivery.
            </p>
          </div>
          
          <div>
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <span className="text-xl text-white font-bold">02</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Popular Games</h4>
            <p className="text-white/60 font-medium leading-relaxed">
              Choose from a curated gaming library including the latest hits and classic co-op games.
            </p>
          </div>
          
          <div>
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <span className="text-xl text-white font-bold">03</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Doorstep Delivery</h4>
            <p className="text-white/60 font-medium leading-relaxed">
              Get your setup delivered directly to you. Available for local doorstep delivery.
            </p>
          </div>
          
          <div>
            <div className="w-12 h-12 rounded-full bg-brand-accent-blue/20 flex items-center justify-center mb-6">
              <span className="text-xl text-brand-accent-cyan font-bold">04</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Easy Booking</h4>
            <p className="text-white/60 font-medium leading-relaxed">
              Book your gaming session in minutes. No complex paperwork, just pure gaming.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
