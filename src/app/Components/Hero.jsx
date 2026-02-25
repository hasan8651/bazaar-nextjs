"use client";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
 
  {
    image: "https://i.ibb.co/Q35SNGZg/photo-1609081219090-a6d81d3085bf-q-80-w-1326-auto-format-fit-crop-ixlib-rb-4-1.jpg",
    campaign: `Mega Tech Sale: Power Up for Less!
    Premium Tech. Unbeatable Prices.`,
  },
  {
    image: "https://i.ibb.co/xKK2X8wZ/slide3.webp",
    campaign: `Farm Fresh Goodness, Delivered to Your Doorstep.
     Eat Fresh, Live Healthy.`,
  },
  {
    image: "https://i.ibb.co/R422PVq2/slide4.webp",
    campaign: `Premium Furniture. Affordable Prices.
    Where Comfort Meets Style.`,
  },
];

const IMAGE_DURATION = 12; // seconds

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto‑change slides OK
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, IMAGE_DURATION * 1000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full h-[80vh] overflow-hidden ">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1, ease: "easeInOut" }, // crossfade
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

          
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient overlay for read text OK */}
     <div className="absolute inset-0 bg-(--primary) opacity-30" />


      {/* Foreground content */}
      <div className="relative  w-fit mx-auto mt-40">
        <div >
          {/* Campaign (changes per slide) */}
          {/* Main Heading */}
          <h1 className="mt-12 text-4xl font-bold text-white text-center leading-tight">
            Your Daily Essentials, Just a Click Away.
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base md:text-xl text-white text-center ">
            Smart Shopping, Superior Style, Seamless Service.
          </p>
          {/* inline-flex items-center justify-center rounded-full border border-(--secondary) bg-indigo-500/10 py-3 text-sm md:text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-(--secondary) cursor-pointer */}

          {/* CTA need update */}
          <div className="mt-10 flex justify-center gap-5">
            <Link href="/login" className="btn btn-primary !text-white !rounded-full">
              Bazaar Now
            </Link>
            <Link href="/register" className="btn btn-primary !text-white !rounded-full">
              Be a Seller
            </Link>
          </div>
        </div>
        {/* Trust badges OK */}
        {/* <div className="absolute bottom-2 left-4 right-4 text-gray-400 z-20">
          <div className="mt-6 flex flex-col md:flex-row gap-2 md:gap-6 text-sm font-medium opacity-90">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600" /> Secure checkout
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" /> Fast delivery across Bangladesh
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-orange-500" /> Safety-tested products only
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
