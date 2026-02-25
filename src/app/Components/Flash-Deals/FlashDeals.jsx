"use client";

import { useEffect, useState } from "react";
import { Zap, ArrowRight, Plus, Flame, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FlashDeal() {
  const products = [
    {
      id: 1,
      name: "Sony WH-1000XM5 Headphones",
      price: 299,
      oldPrice: 450,
      discount: "-35%",
      image: "/images/flashDealImages/sonyHeadphone.jpg",
      stockLeft: 5,
      soldPercentage: "85%",
    },
    {
      id: 2,
      name: "Apple Watch Series 9",
      price: 399,
      oldPrice: 599,
      discount: "-40%",
      image: "/images/flashDealImages/appleWatch.jfif",
      stockLeft: 2,
      soldPercentage: "95%",
    },
    {
      id: 3,
      name: "Logitech MX Master 3S",
      price: 99,
      oldPrice: 150,
      discount: "-30%",
      image: "/images/flashDealImages/logitech.jpg",
      stockLeft: 12,
      soldPercentage: "60%",
    },
    {
      id: 4,
      name: "iPhone 15 Pro Case - Leather",
      price: 49,
      oldPrice: 80,
      discount: "-50%",
      image: "/images/flashDealImages/phoneCover.jfif",
      stockLeft: 8,
      soldPercentage: "70%",
    },
  ];

  const [hours, setHours] = useState(24);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) setSeconds(seconds - 1);
      else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  return (
    <section className="max-w-7xl mx-auto px-4 my-6">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 p-6 md:p-10 rounded-[2.5rem] bg-[var(--surface)] border border-[var(--border)] relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[var(--secondary)] mb-3">
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Exclusive Offers
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tighter">
            FLASH <span className="text-[var(--secondary)] italic">DEALS</span>
          </h2>
        </div>

        {/* TIMER */}
        <div className="flex gap-4">
          {[
            { label: "H", val: hours },
            { label: "M", val: minutes },
            { label: "S", val: seconds },
          ].map((unit, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="bg-[#0EA5A4] text-white w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">
                {unit.val.toString().padStart(2, "0")}
              </div>
              <span className="text-[11px] mt-2 font-black uppercase tracking-widest text-gray-500 dark:text-gray-300">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-[2rem] md:rounded-[2.5rem] p-3 md:p-5 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
          >
            {/* Image Area */}
            <div className="relative aspect-square bg-[var(--background)] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-4 border border-[var(--border)] flex items-center justify-center">
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 bg-red-500 text-white text-[9px] md:text-[10px] font-black px-2 py-1 rounded-lg z-10">
                {product.discount}
              </div>

              {/* Product Image */}
              <div className="relative w-full h-full p-4 group-hover:scale-110 transition-transform duration-500">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Add to Cart Icon - Fixed Hover Styling */}
              <button className="absolute bottom-3 right-3 bg-[#0EA5A4] text-white w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all duration-300 z-20">
                <Plus size={24} strokeWidth={3} />
              </button>
            </div>

            {/* Product Info */}
            <div className="space-y-2 px-1">
              <h3 className="font-bold text-[var(--text-primary)] text-xs md:text-base line-clamp-1 group-hover:text-[var(--secondary)]">
                {product.name}
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl font-black text-[var(--text-primary)]">
                  ${product.price}
                </span>
                <span className="text-[10px] md:text-xs text-[var(--text-secondary)] line-through opacity-50">
                  ${product.oldPrice}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="pt-2">
                <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-[#0EA5A4] transition-all duration-1000"
                    style={{ width: product.soldPercentage }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1.5">
                  <p className="text-[8px] md:text-[9px] font-bold text-[var(--text-secondary)] uppercase">
                    {product.stockLeft} Left
                  </p>
                  <div className="flex items-center gap-1 text-[8px] font-black text-orange-500">
                    <Flame size={10} fill="currentColor" /> HOT
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- FOOTER --- */}
      <div className="mt-14 flex justify-center">
        <Link
          href={"/allDeals"}
          className="flex items-center justify-center gap-2 bg-[#0EA5A4] text-white px-10 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 group shadow-lg"
        >
          Explore All Deals
          <ArrowRight
            size={18}
            className="group-hover:translate-x-2 transition-transform"
          />
        </Link>
      </div>
    </section>
  );
}
