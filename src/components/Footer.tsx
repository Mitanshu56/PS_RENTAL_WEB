"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tighter">PLAY RENT</h2>
            <p className="text-white/60 font-medium max-w-xs">Gaming, delivered. The premium console rental experience directly to your door.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Rent</h4>
            <ul className="space-y-3 text-sm font-medium text-white/50">
              <li><Link href="/ps5" className="hover:text-white transition-colors">PS5 Rental</Link></li>
              <li><Link href="/ps4" className="hover:text-white transition-colors">PS4 Rental</Link></li>
              <li><Link href="/games" className="hover:text-white transition-colors">Games</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
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

          <div>
            <h4 className="text-white font-bold mb-4">Visit Us</h4>
            <div className="flex items-start gap-3 text-sm font-medium text-white/70 mb-4">
              <MapPin className="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-white">PS Rental</strong><br />
                Morabhagal Cir, Harekrishna Society, Reva Nagar, Rander, Surat, Gujarat 395005
              </p>
            </div>
            
            <a 
              href="https://share.google/pdershtZjlWhPC5mj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-xs font-bold tracking-widest uppercase text-[#3b82f6] hover:text-[#60a5fa] transition-colors mb-6"
            >
              Get Directions →
            </a>

            {/* Embedded Map */}
            <div className="w-full h-32 rounded-[10px] overflow-hidden border border-white/10 bg-[#111]">
              <iframe
                src="https://maps.google.com/maps?q=PS%20rental,%20Morabhagal%20Cir,%20Surat&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              />
            </div>
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
