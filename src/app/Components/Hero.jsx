"use client";
import {motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react'

const slides = [
  {
    image: "https://i.ibb.co/PZpsxL0J/slide1.webp",
    campaign: "Wear the Trend. Be the Trend. Upgrade Your Style with Our New Arrivals.",
  },
  {
    image: "https://i.ibb.co/PZpsxL0J/slide1.webp",
    campaign: "Mega Tech Sale: Power Up for Less! Premium Tech. Unbeatable Prices.",
  },
  {
    image: "https://i.ibb.co/PZpsxL0J/slide1.webp",
    campaign: "Farm Fresh Goodness, Delivered to Your Doorstep. Eat Fresh, Live Healthy.",
  },
  {
    image: "https://i.ibb.co/PZpsxL0J/slide1.webp",
    campaign: "Premium Furniture. Affordable Prices. Where Comfort Meets Style.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative h-125 w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div 
            className="w-full h-full bg-contain bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          >
            {/* Overlay and Text */}
            <div className="bg-black/40 p-8 rounded-lg text-center">
              <h1 className="text-white text-3xl md:text-5xl font-bold max-w-2xl text-balance">
                {slides[current].campaign}
              </h1>
              <button className="mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-full transition">
                Shop Now
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full"
      >
        <ChevronLeft size={30} className="text-white" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full"
      >
        <ChevronRight size={30} className="text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div 
            key={index}
            className={`h-3 w-3 rounded-full transition-all ${index === current ? "bg-white w-6" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
