"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

// All categories with images (replace with your real paths)
const allCategories = [
  { id: 1, name: "Electronics", count: "1.2k+ Products", image: "/images/CategoryImages/electronics.png" },
  { id: 2, name: "Fashion", count: "2.5k+ Products", image: "/images/CategoryImages/fashion.png" },
  { id: 3, name: "Grocery", count: "800+ Products", image: "/images/CategoryImages/grocary.png" },
  { id: 4, name: "Home & Living", count: "1.5k+ Products", image: "/images/CategoryImages/home&leaving.png" },
  { id: 5, name: "Beauty Care", count: "900+ Products", image: "/images/CategoryImages/beauty.png" },
  { id: 6, name: "Mobile", count: "500+ Products", image: "/images/CategoryImages/mobile.png" },
  { id: 7, name: "Kitchen", count: "1.1k+ Products", image: "/images/CategoryImages/kitchen.png" }, // add your image
  { id: 8, name: "Sports", count: "400+ Products", image: "/images/CategoryImages/Sports.png" },
  { id: 9, name: "Baby Care", count: "600+ Products", image: "/images/CategoryImages/babyCare.png" },
  { id: 10, name: "Automotive", count: "300+ Products", image: "/images/CategoryImages/car-equipment.png" },
  { id: 11, name: "Pet Supplies", count: "450+ Products", image: "/images/CategoryImages/petSupplies.png" },
  { id: 12, name: "Office", count: "700+ Products", image: "/images/CategoryImages/office.png" },
  { id: 13, name: "Watches", count: "250+ Products", image: "/images/CategoryImages/watch.png" },
  { id: 14, name: "Cameras", count: "180+ Products", image: "/images/CategoryImages/camera.png" },
  { id: 15, name: "Audio", count: "320+ Products", image: "/images/CategoryImages/audio.png" },
  { id: 16, name: "Books", count: "2k+ Products", image: "/images/CategoryImages/books.png" },
];

export default function AllCategories() {
  return (
    <main className="min-h-screen bg-(--background) py-12 md:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button - Left aligned */}
        <div className="flex justify-start mb-10 md:mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-(--surface) border border-(--border) rounded-full text-(--secondary) font-semibold text-sm shadow-sm transition-all duration-300 hover:bg-(--secondary) hover:text-white hover:shadow-lg hover:shadow-(--secondary)/20 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-(--primary)">
            All <span className="text-(--secondary)">Categories</span>
          </h1>
          <p className="mt-4 text-lg text-(--text-secondary) max-w-3xl mx-auto">
            Discover our complete range — from everyday essentials to premium collections. Find exactly what you're looking for.
          </p>
        </div>

        {/* Categories Grid - Same style as Popular */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {allCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
              className={`
                group relative block overflow-hidden rounded-xl 
                bg-(--surface) border border-(--border) 
                transition-all duration-300 ease-out
                hover:border-(--secondary)/40 hover:shadow-xl hover:-translate-y-1
              `}
            >
              {/* Image + Overlay */}
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={cat.image || `https://placehold.co/600x450/0EA5A4/white?text=${cat.name}`} // fallback placeholder
                  alt={cat.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className={`
                  absolute inset-0 bg-linear-to-t 
                  from-black/60 via-black/25 to-transparent 
                  transition-all duration-300 
                  group-hover:from-black/82 group-hover:via-black/48
                `} />
              </div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-linear-to-t from-black/70 to-transparent pointer-events-none">
                <h3 className={`
                  text-xl md:text-2xl font-semibold 
                  text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] 
                  group-hover:text-(--secondary) 
                  transition-colors duration-300
                `}>
                  {cat.name}
                </h3>
                <p className="mt-1.5 text-sm text-white/90 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.75)]">
                  {cat.count}
                </p>
              </div>

              {/* Hover Indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 lg:opacity-0">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full 
                  bg-white/20 backdrop-blur-sm border border-white/30 
                  text-(--secondary) shadow-md
                `}>
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse All CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-(--secondary) text-white font-semibold text-lg rounded-full shadow-md hover:bg-(--secondary)/90 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Browse All Products
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}