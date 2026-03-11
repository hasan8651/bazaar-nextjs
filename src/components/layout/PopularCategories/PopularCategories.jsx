
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  { id: 1, name: "Electronics", count: "1.2k+ Products", image: "/images/CategoryImages/electronics.png" },
  { id: 2, name: "Fashion", count: "2.5k+ Products", image: "/images/CategoryImages/fashion.png" },
  { id: 3, name: "Grocery", count: "800+ Products", image: "/images/CategoryImages/grocary.png" },
  { id: 4, name: "Home & Living", count: "1.5k+ Products", image: "/images/CategoryImages/home&leaving.png" },
  { id: 5, name: "Beauty", count: "900+ Products", image: "/images/CategoryImages/beauty.png" },
  { id: 6, name: "Mobile", count: "500+ Products", image: "/images/CategoryImages/mobile.png" },
  { id: 7, name: "Gadgets", count: "1.1k+ Products", image: "/images/CategoryImages/Gadgets.png" },
  { id: 8, name: "Sports", count: "400+ Products", image: "/images/CategoryImages/Sports.png" },
];

export default function PopularCategories() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-(--background)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Clean & Centered */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-(--primary)">
            Popular <span className="text-(--secondary)">Categories</span>
          </h1>
          <p className="mt-4 text-lg text-(--text-secondary) max-w-3xl mx-auto">
            Explore our top collections with exclusive deals and trending items handpicked for you.
          </p>
        </div>

        {/* Grid - Responsive, clean cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
              className="group relative block overflow-hidden rounded-xl bg-(--surface) border border-(--border) transition-all duration-300 hover:border-(--secondary)/30 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image - Full bleed, subtle scale */}
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              </div>

              {/* Content - Bottom aligned, clean */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-linear-to-t from-black/60 to-transparent">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-(--secondary) drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-white/80 font-medium">
                  {cat.count}
                </p>
              </div>

              {/* Hover indicator (desktop) */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:opacity-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-(--secondary) shadow-md">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse All CTA - Prominent but clean */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-3 px-8 py-4 bg-(--secondary) text-white font-semibold text-lg rounded-full shadow-md hover:bg-(--secondary)/90 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            View All Categories
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}