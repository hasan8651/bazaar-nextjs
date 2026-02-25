"use client";

import React from "react";

export default function TopBrands() {
  const brands = [
    { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
    { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg" },
  ];

  return (
    <section className="py-8 bg-[var(--background)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - Simple & Clean */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tighter">
            TRUSTED <span className="text-[var(--secondary)]">BRANDS</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] font-medium opacity-70">
            We partner with the best to bring you quality
          </p>
        </div>

        {/* Carousel Area */}
        <div className="relative group">
          <div className="flex animate-scroll whitespace-nowrap gap-8 items-center py-4">
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-40 h-24 md:w-48 md:h-28 flex items-center justify-center p-6 
                           bg-white dark:bg-white/5 
                           border border-gray-200 dark:border-white/10 
                           rounded-3xl shadow-sm hover:shadow-xl hover:border-[var(--secondary)] 
                           transition-all duration-300 group-hover:scale-105"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain dark:brightness-200 dark:contrast-100"
                />
              </div>
            ))}
          </div>

          {/* Side Fading Effects */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}