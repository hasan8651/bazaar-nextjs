"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard/ProductCard";
import Loading from "@/app/loading";

export default function FeatureProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatureProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/products", {
          params: {
            limit: 10,
            sortBy: "createdAt",
            order: "desc",
          },
        });

        if (response.data && response.data.products) {
          setProducts(response.data.products);
        }
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatureProducts();
  }, []);

  if (loading) {
    return (
   <Loading></Loading>
    );
  }

  if (error) return null;

  return (
    <section className="py-24 px-6 max-w-[1440px] mx-auto bg-[var(--background)] relative">
      
      {/* Background Decor */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-[var(--secondary)] opacity-[0.03] blur-[120px] -z-10 pointer-events-none" />

      {/* --- Section Header (Centered) --- */}
      <div className="flex flex-col items-center text-center mb-16 md:mb-20 space-y-6">
        <div className="flex items-center gap-2 text-[var(--secondary)] font-black text-[10px] uppercase tracking-[0.4em] bg-[var(--secondary)]/5 px-4 py-1.5 rounded-full border border-[var(--secondary)]/10">
          <Sparkles size={14} />
          <span>Curated Selection</span>
        </div>
        
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-[var(--text-primary)] leading-[0.85] max-w-4xl mx-auto">
          Featured <span className="text-[var(--secondary)]">Products</span>
        </h2>
        
        <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-xl font-medium opacity-70 mx-auto">
          Selected items from our best categories, handpicked for quality and modern style.
        </p>
      </div>

      {/* --- Product Grid --- */}
      <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 mb-16">
        {products && products.length > 0 ? (
          products.map((item) =>
            item ? (
              <ProductCard key={item._id || item.id} product={item} />
            ) : null
          )
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-24 border-2 border-dashed border-[var(--border)] rounded-[3rem] opacity-30">
            <p className="text-sm font-black uppercase tracking-widest text-[var(--text-secondary)]">Inventory Empty</p>
          </div>
        )}
      </div>

      {/* --- Centered View All Action --- */}
   <div className="flex justify-center pt-8">
  <Link
    href="/shop"
    className="group relative inline-flex items-center gap-4 px-12 py-5 rounded-2xl bg-[var(--secondary)] text-white font-black text-xs uppercase tracking-widest hover:scale-[1.05] transition-all shadow-xl shadow-[var(--secondary)]/25 active:scale-95"
  >
    <span>Explore Full Collection</span>
    {/* Animated Decorative Line */}
    <div className="w-6 h-px bg-white opacity-40 group-hover:w-10 transition-all duration-300" />
    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
    
    {/* Subtle Glow Effect on Hover */}
    <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
  </Link>
</div>

    </section>
  );
}