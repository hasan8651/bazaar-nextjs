"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TopBrands() {
  const brands = [
    { id: 1, name: "Apple", logo: "/images/Brands/apple.png" },
    { id: 2, name: "Asus", logo: "/images/Brands/asus.png" },
    { id: 3, name: "HP", logo: "/images/Brands/hp.png" },
    { id: 4, name: "IKEA", logo: "/images/Brands/ikea.webp" },
    { id: 5, name: "Logitech", logo: "/images/Brands/logitech.png" },
    { id: 6, name: "Nike", logo: "/images/Brands/nike.png" },
    { id: 7, name: "Royal Canin", logo: "/images/Brands/royalChain.png" },
    { id: 8, name: "Samsung", logo: "/images/Brands/samsung.png" },
    { id: 9, name: "Sony", logo: "/images/Brands/sony.png" },
    { id: 10, name: "Xiaomi", logo: "/images/Brands/xiaomi.png" },
    { id: 11, name: "Zara Home", logo: "/images/Brands/zaraHome.png" },
  ];

  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-16 md:py-24 bg-[var(--surface)] transition-colors duration-500 overflow-hidden">
      {/* --- Header Section --- */}
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs md:text-sm font-bold tracking-widest uppercase mb-4">
            Authorized Partners
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            TOP <span className="text-[var(--secondary)]">GLOBAL BRANDS</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto text-sm md:text-base font-medium">
            Discover authentic products from world-leading manufacturers delivered to your doorstep.
          </p>
        </motion.div>
      </div>

      {/* --- Infinite Auto-Scroll Slider --- */}
      <div className="relative flex items-center">
        {/* Side Overlays for Professional Fade Effect */}
        <div className="absolute left-0 z-20 w-20 md:w-64 h-full bg-gradient-to-r from-[var(--surface)] to-transparent pointer-events-none"></div>
        <div className="absolute right-0 z-20 w-20 md:w-64 h-full bg-gradient-to-l from-[var(--surface)] to-transparent pointer-events-none"></div>

        <motion.div
          className="flex gap-4 md:gap-8 lg:gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 30, 
            repeat: Infinity,
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div key={`${brand.id}-${index}`} className="flex-shrink-0 group">
              {/* Individual Logo Card */}
              <motion.div
                whileHover={{ y: -8 }}
                className="w-32 sm:w-40 md:w-48 lg:w-56 h-24 md:h-32 flex flex-col items-center justify-center 
                           bg-white dark:bg-slate-900/30 
                           border border-[var(--border)] dark:border-slate-800/60 
                           rounded-2xl md:rounded-[2.5rem] relative overflow-hidden shadow-sm 
                           hover:shadow-2xl hover:border-[var(--secondary)]/40 transition-all duration-500"
              >
                {/* Logo Image Rendering */}
                <div className="relative w-full h-full p-6 flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={140}
                    height={60}
                    className="object-contain transition-all duration-500
                               grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100
                               dark:brightness-150 dark:contrast-125 dark:group-hover:brightness-200"
                  />
                </div>

                {/* Desktop Hover Overlay: Reveals Brand Name */}
                <div className="absolute inset-0 bg-[var(--secondary)]/95 flex items-center justify-center 
                              translate-y-full group-hover:translate-y-0 transition-transform duration-500 
                              hidden md:flex">
                  <span className="text-white font-extrabold text-xs lg:text-sm uppercase tracking-widest px-4 text-center">
                    {brand.name}
                  </span>
                </div>
              </motion.div>

              {/* Mobile-Only Branding Label (Visible below the card) */}
              <div className="mt-4 text-center md:hidden">
                <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest opacity-80">
                  {brand.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- Global Trust Statistics --- */}
      <div className="max-w-7xl mx-auto px-4 mt-16 md:mt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-[var(--border)]/50 pt-12">
          {[
            { number: "50+", label: "International Brands" },
            { number: "15k+", label: "Premium Products" },
            { number: "50k+", label: "Global Customers" },
            { number: "24/7", label: "Expert Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-2xl md:text-4xl font-black text-[var(--secondary)] tracking-tight group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-[9px] md:text-xs font-bold text-[var(--text-secondary)] uppercase mt-2 tracking-widest opacity-60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}