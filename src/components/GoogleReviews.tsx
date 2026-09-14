'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

interface Review {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  timeStr: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-[#f59e0b]' : 'text-white/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export function GoogleReviews() {
  const reviews: Review[] = [
    {
      author_name: "Umang Pattharwala",
      profile_photo_url: "https://ui-avatars.com/api/?name=Umang+Pattharwala&background=3b82f6&color=fff",
      rating: 5,
      text: "Rented for 6 hours. Their sevice is great. Enjoyed so much. Highly recommended.",
      timeStr: "3 weeks ago",
    },
    {
      author_name: "Dhaval Khatri",
      profile_photo_url: "https://ui-avatars.com/api/?name=Dhaval+Khatri&background=10b981&color=fff",
      rating: 4,
      text: "Rented ps4 for 24hr and it was amazing experience looking forward to rent every weekends",
      timeStr: "a month ago",
    },
    {
      author_name: "Aasif Shaikh",
      profile_photo_url: "https://ui-avatars.com/api/?name=Aasif+Shaikh&background=8b5cf6&color=fff",
      rating: 5,
      text: "Very good experience with ps4",
      timeStr: "a month ago",
    },
    {
      author_name: "BullY BullY",
      profile_photo_url: "https://ui-avatars.com/api/?name=BullY+BullY&background=f59e0b&color=fff",
      rating: 5,
      text: "⭐⭐⭐⭐⭐ Great experience renting the PS4 for 24 hours! Everything worked perfectly and the service was smooth. Highly recommended! 🎮",
      timeStr: "3 weeks ago",
    },
    {
      author_name: "NGO GAMING LITE",
      profile_photo_url: "https://ui-avatars.com/api/?name=NGO+GAMING+LITE&background=ef4444&color=fff",
      rating: 5,
      text: "Best rental plans I have seen Also they have offered a quality console and support thanks for that . I really enjoyed Mortal Kombat 11",
      timeStr: "a month ago",
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section className="py-24 bg-[#020202] relative z-10 border-t border-white/5 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-bold text-white tracking-widest uppercase">Verified Reviews</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">Gamers Love Us.</h2>
            <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
              Don't just take our word for it. Check out what our community has to say about their rental experience.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-6"
        >
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300 relative group"
              >
                {/* Gaming accent line on top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={review.profile_photo_url} 
                        alt={review.author_name} 
                        className="w-12 h-12 rounded-full border-2 border-white/10 group-hover:border-[#3b82f6]/50 transition-colors"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-[#050505] rounded-full p-0.5">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold tracking-tight">{review.author_name}</h4>
                      <p className="text-white/40 text-xs font-medium uppercase tracking-wider mt-0.5">
                        {review.timeStr}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <StarRating rating={review.rating} />
                </div>

                <p className="text-white/70 text-sm leading-relaxed font-medium">
                  "{review.text}"
                </p>
              </motion.div>
            ))}
          </motion.div>
      </div>
    </section>
  );
}
