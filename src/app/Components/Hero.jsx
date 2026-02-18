"use client";
import {motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, ShieldCheck, Truck } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react'

const slides = [
  {
    image: "https://i.ibb.co/dwzd0vW8/slide1.webp",
    campaign: "Wear the Trend. Be the Trend. Upgrade Your Style with Our New Arrivals.",
  },
  {
    image: "https://i.ibb.co/cKLV5xwB/slide2.webp",
    campaign: "Mega Tech Sale: Power Up for Less! Premium Tech. Unbeatable Prices.",
  },
  {
    image: "https://i.ibb.co/xKK2X8wZ/slide3.webp",
    campaign: "Farm Fresh Goodness, Delivered to Your Doorstep. Eat Fresh, Live Healthy.",
  },
  {
    image: "https://i.ibb.co/R422PVq2/slide4.webp",
    campaign: "Premium Furniture. Affordable Prices. Where Comfort Meets Style.",
  },
];

const IMAGE_DURATION = 12; // seconds

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto‑change slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, IMAGE_DURATION * 1000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
   <section className="relative w-full h-[80vh] text-white overflow-hidden">
       <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" }, // crossfade
              scale: { duration: IMAGE_DURATION, ease: "linear" }, // slow zoom
            }}
          >
            <Image
              src={currentSlide.image}
              alt="HeroSlides"
              fill
              priority={currentIndex === 0}
              className="object-cover"
            />

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: "-200%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                delay: 2,
                repeat: Infinity,
                repeatDelay: 4,
              }}
              style={{
                background:
                  "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                width: "140%",
                height: "260%",
                transform: "rotate(25deg)",
                filter: "blur(10px)",
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient overlay for read text */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-blue-900/40 to-black/70" />

      {/* Foreground content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 py-6 md:py-4 flex items-center">
        <div className="w-full md:w-2/3 lg:w-1/2">
          {/* Campaign (changes per slide) */}
          <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 font-medium text-(--accent) backdrop-blur-sm border border-indigo-500/20">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span>{currentSlide.campaign}</span>
          </div>

          {/* Main Heading */}
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Development Only.
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-base md:text-xl text-primary max-w-xl">
             Development Only.
          </p>

          {/* CTA need update */}
         <div className="mt-8 grid grid-cols-2 gap-4 w-2/3">
          <button className="inline-flex items-center justify-center rounded-full border border-(--secondary) bg-indigo-500/10 py-3 text-sm md:text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-(--secondary) cursor-pointer">
            Shop Now
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-(--secondary) bg-indigo-500/10 py-3 text-sm md:text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-(--secondary) cursor-pointer">
View Best Sellers
</button> 
</div>
 </div>
          {/* Trust badges */}
            <div className="absolute bottom-10 left-4 right-4 z-20">
          <div className="mt-6 flex flex-col md:flex-row gap-2 md:gap-6 text-sm font-medium opacity-90">
            <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-green-600" /> Secure checkout</div>
            <div className="flex items-center gap-2"> <Truck className="w-5 h-5 text-blue-600" /> Fast delivery across Bangladesh</div>
            <div className="flex items-center gap-2"><BadgeCheck className="w-5 h-5 text-orange-500" /> Safety-tested products only</div>
          </div>
        </div>
       </div>
    </section>
  );
}
