"use client";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    productImage: "https://i.ibb.co/LX8Lnr47/Watch.webp",
    headline: "Timeless Craftsmanship",
    sub: "Experience the perfect blend of classic elegance and precision engineering on your wrist.",
    lightBg: "#CCFBFE",
    darkBg: "#0f172a",
  },
  {
    productImage: "https://i.ibb.co/cS9ysbYx/Laptop.webp",
    headline: "Next-Gen Electronics",
    sub: "Upgrade your lifestyle with the latest high-performance gadgets and gear.",
    lightBg: "#E0F2FE",
    darkBg: "#0f172a",
  },
  {
    productImage: "https://i.ibb.co/bG2XNdC/Bag.webp",
    headline: "Elevate Your Fashion",
    sub: "Explore our trendiest collection designed for your bold and unique style.",
    lightBg: "#FCE7F3",
    darkBg: "#0f172a",
  },
  {
    productImage: "https://i.ibb.co/VcZLBJMG/Grocery.webp",
    headline: "Fresh Grocery Delivery",
    sub: "Get farm-fresh essentials and organic produce delivered to your doorstep.",
    lightBg: "#DCFCE7",
    darkBg: "#0f172a",
  },
  {
    productImage: "https://i.ibb.co/0V9wskJW/Living.webp",
    headline: "Modern Home & Living",
    sub: "Transform your living space with our premium home decor and essentials.",
    lightBg: "#FFEDD5",
    darkBg: "#0f172a",
  },
  {
    productImage: "https://i.ibb.co/VWC71gyp/Skin.webp",
    headline: "Radiate Pure Beauty",
    sub: "Discover the best skincare and makeup brands for a flawless, natural glow.",
    lightBg: "#FFE4E6",
    darkBg: "#0f172a",
  },
  {
    productImage: "https://i.ibb.co/fdLHMYDV/Health.webp",
    headline: "Priority On Health",
    sub: "Supplements and health monitors to keep you and your family fit every day.",
    lightBg: "#D1FAE5",
    darkBg: "#0f172a",
  },
  {
    productImage: "https://i.ibb.co/GQ8X3n6x/Sports.webp",
    headline: "Fuel Your Sports Passion",
    sub: "Gear up with professional equipment for your next victory on the field.",
    lightBg: "#ECFCCB",
    darkBg: "#0f172a",
  },
  {
    productImage: "https://i.ibb.co/0RpYfGh0/Parts.webp",
    headline: "Master the Road",
    sub: "Find high-quality parts and accessories to keep your ride running smooth.",
    lightBg: "#EDE9FE",
    darkBg: "#0f172a",
  },
  {
    productImage: "https://i.ibb.co/JjkFwwV1/Books.webp",
    headline: "Explore Endless Books",
    sub: "Dive into a vast collection of stories and knowledge from around the world.",
    lightBg: "#FEF3C7",
    darkBg: "#0f172a",
  },
  {
    productImage: "https://i.ibb.co/Hf3jMxr4/Toys.webp",
    headline: "Joyful Toys & Games",
    sub: "Creative and safe toys to spark the imagination of your little ones.",
    lightBg: "#FEF9C3",
    darkBg: "#0f172a",
  },
  {
    productImage: "https://i.ibb.co/Q3W6yW8T/Gadgets.webp",
    headline: "Latest Tech Gadgets",
    sub: "Smart solutions and wearable tech designed to simplify your daily routine.",
    lightBg: "#DBEAFE",
    darkBg: "#0f172a",
  },
  {
    productImage: "https://i.ibb.co/q2NTwCq/Furniture.webp",
    headline: "Elegant Furniture",
    sub: "Exquisite designs and comfortable furniture to elevate your home's aesthetics.",
    lightBg: "#D1FAE5",
    darkBg: "#0f172a",
  },
];

const IMAGE_DURATION = 8;

export default function Hero() {
  const { data: session, status } = useSession();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["30deg", "-30deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-30deg", "30deg"]);

  function handleMouseMove(event) {
    const { width, height, left, top } =
      event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - left) / width - 0.5);
    mouseY.set((event.clientY - top) / height - 0.5);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, IMAGE_DURATION * 1000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  // Animation Variants for Text
  const containerVars = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const wordVars = {
    initial: { opacity: 0, y: 20, rotateX: -40 },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        backgroundColor: isDarkMode
          ? currentSlide.darkBg
          : currentSlide.lightBg,
      }}
      className="relative w-full min-h-125 md:h-[70vh] flex items-center transition-colors duration-1000 overflow-hidden py-12 md:py-0"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Image Section */}
        <div className="flex justify-center items-center perspective-[1500px] order-1 md:order-2">
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative w-75 h-75 md:w-110 md:h-110 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.productImage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{
                  opacity: { duration: 0.5 },
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="w-full h-full relative"
              >
                <Image
                  src={currentSlide.productImage}
                  alt={currentSlide.headline}
                  fill
                  priority={currentIndex === 0}
                  loading={currentIndex === 0 ? "eager" : "lazy"}
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left order-2 md:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={containerVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col"
            >
              {/* Headline - Word by Word reveal */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight text-(--text-primary) overflow-hidden flex flex-wrap justify-center md:justify-start">
                {currentSlide.headline.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordVars}
                    className="mr-[0.2em] inline-block origin-bottom"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Subheading - Smooth Slide In */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-6 text-base md:text-lg max-w-md mx-auto md:mx-0 font-medium text-(--text-secondary)"
              >
                {currentSlide.sub}
              </motion.p>

              {/* CTA Buttons - No Animation */}
              <div className="mt-8 flex flex-row justify-center md:justify-start gap-4">
                <Link
                  href={session ? "/shop" : "/login"}
                  className="px-8 py-3 bg-(--secondary) text-white rounded-full font-bold hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-indigo-500/10"
                >
                  Shop Now
                </Link>
                <Link
                  href="/seller"
                  className="px-8 py-3 border-2 border-(--secondary) text-(--secondary) rounded-full font-bold hover:bg-(--secondary) hover:text-white transition-all active:scale-95"
                >
                  Be a Seller
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* --- Slide Indicator: --- */}
      <div className="absolute bottom-4 md:bottom-8 left-0 right-0 md:left-auto md:right-8 flex justify-center md:justify-end items-center gap-3 z-20 px-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="py-4 px-1 group"
          >
            <div
              style={{
                backgroundColor:
                  currentIndex === index ? "var(--secondary)" : "var(--border)",
              }}
              className={`transition-all duration-500 rounded-full ${
                currentIndex === index
                  ? "w-12 h-1.5"
                  : "w-2 h-2 opacity-40 group-hover:opacity-100"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
