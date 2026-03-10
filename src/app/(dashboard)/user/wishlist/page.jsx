"use client";

import React from "react";
import { Trash2, ShoppingBag, Info, Heart } from "lucide-react";
import { motion } from "framer-motion";

const WishlistPage = () => {
  const wishlistItems = [
    { id: 1, name: "Premium Wireless Headphones", price: "$299", category: "Electronics" },
    { id: 2, name: "Minimalist Leather Watch", price: "$149", category: "Accessories" },
    { id: 3, name: "Ergonomic Office Chair", price: "$450", category: "Furniture" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[var(--text-primary)]">My Wishlist</h1>
        <p className="text-[var(--text-secondary)] font-medium">Your saved collection in one place.</p>
      </div>

      {/* List Container */}
      <div className="space-y-4">
        {wishlistItems.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-[var(--surface)] border border-[var(--border)] p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 hover:border-[var(--secondary)] transition-all shadow-sm"
          >
            {/* Left: Product Info */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-16 h-16 bg-[var(--background)] rounded-xl flex items-center justify-center border border-[var(--border)] shrink-0 overflow-hidden">
                {/* Image Placeholder - আপনি এখানে <img src={item.image} /> ব্যবহার করতে পারেন */}
                <Heart size={20} className="text-[var(--text-secondary)] group-hover:text-rose-500 transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase text-[var(--secondary)] tracking-widest truncate">{item.category}</p>
                <p className="font-bold text-sm md:text-base text-[var(--text-primary)] truncate">{item.name}</p>
                <p className="font-black text-xs text-[var(--success)]">{item.price}</p>
              </div>
            </div>
            
            {/* Right: Actions (Optimized for Mobile & Desktop) */}
            <div className="flex items-center w-full md:w-auto gap-2">
              
              {/* Details Button */}
              <button 
                className="flex-1 md:flex-none flex flex-col md:flex-row items-center justify-center p-2 md:p-3 bg-[var(--background)] border border-[var(--border)] text-[var(--text-secondary)] rounded-xl hover:text-[var(--secondary)] hover:border-[var(--secondary)] transition-all"
                title="View Details"
              >
                <Info size={16} />
                <span className="text-[9px] font-bold mt-1 md:hidden">Details</span>
              </button>

              {/* Trash Button */}
              <button 
                className="flex-1 md:flex-none flex flex-col md:flex-row items-center justify-center p-2 md:p-3 bg-[var(--background)] border border-[var(--border)] text-[var(--text-secondary)] rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                title="Remove"
              >
                <Trash2 size={16} />
                <span className="text-[9px] font-bold mt-1 md:hidden">Remove</span>
              </button>
              
              {/* Add to Cart - Responsive Text */}
              <button className="flex-[2] md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-[var(--secondary)] text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all shadow-lg shadow-[var(--secondary)]/20">
                <ShoppingBag size={14} /> 
                <span className="md:hidden">Cart</span>
                <span className="hidden md:inline">Add to Cart</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;