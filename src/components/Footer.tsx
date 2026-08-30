"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tighter">PLAY RENT</h2>
            <p className="text-white/60 font-medium">Gaming, delivered.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Rent</h4>
            <ul className="space-y-3 text-sm font-medium text-white/50">
              <li><Link href="#ps5" className="hover:text-white transition-colors">PS5 Rental</Link></li>
              <li><Link href="#ps4" className="hover:text-white transition-colors">PS4 Rental</Link></li>
              <li><Link href="#games" className="hover:text-white transition-colors">Games</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm font-medium text-white/50">
              <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm font-medium text-white/40">
          <p>© {new Date().getFullYear()} Play Rent. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
