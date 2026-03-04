"use client";

import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Verified Buyer",
    comment: "I'm genuinely impressed with Prime Mart. The delivery was lightning fast, and the product quality exceeded my expectations. Highly recommended!",
    rating: 5,
    
    image: "/images/testimonials/user1.jpg" 
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Regular Shopper",
    comment: "Excellent customer support! The website's interface is so intuitive that anyone can shop with ease. My go-to place for online shopping.",
    rating: 5,
    image: "/images/testimonials/user2.jfif" 
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Tech Enthusiast",
    comment: "Prime Mart offers the best deals on gadgets. The prices are very competitive compared to other platforms. A top-tier experience!",
    rating: 4,
    image: "/images/testimonials/user3.jfif" 
  }
];

export default function Testimonials() {
  return (
    <section className="py-8 bg-[var(--background)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-[var(--secondary)] bg-[var(--secondary)]/10 rounded-full">
            Wall of Love
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter">
            HEAR FROM OUR <span className="text-[var(--secondary)] italic">COMMUNITY</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto opacity-70 font-medium italic">
            "At Prime Mart, customer satisfaction isn't just a goal—it's our standard."
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t) => (
            <div 
              key={t.id}
              className="relative p-10 rounded-[2.5rem] bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:shadow-2xl hover:shadow-[var(--secondary)]/10 transition-all duration-500 group hover:-translate-y-3 overflow-hidden"
            >
              {/* Decorative Background Quote */}
              <div className="absolute -top-4 -right-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 transform rotate-12">
                <Quote size={120} className="text-[var(--text-primary)]" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1.5 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={`${i < t.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-700"}`} 
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[var(--text-primary)] text-lg leading-relaxed mb-10 font-medium relative z-10">
                "{t.comment}"
              </p>

              {/* User Identity Section */}
              <div className="flex items-center gap-5 mt-auto border-t border-[var(--border)] pt-8">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[var(--secondary)] rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[var(--secondary)] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[var(--surface)]">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-[var(--text-primary)] text-base tracking-tight">{t.name}</h4>
                  <p className="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Mention Footer */}
        <div className="mt-20 text-center">
          <p className="text-[var(--text-secondary)] text-sm font-bold uppercase tracking-widest opacity-40">
            Join 50k+ Happy Customers at <span className="text-[var(--text-primary)]">Prime Mart</span>
          </p>
        </div>
      </div>
    </section>
  );
}