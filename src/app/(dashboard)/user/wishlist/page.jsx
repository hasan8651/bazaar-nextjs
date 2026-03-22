"use client";

import React, { useState, useEffect } from "react";
import { Trash2, ShoppingBag, Info, Heart, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axiosInstance";
import { toast, Toaster } from "react-hot-toast";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Wishlist Data from API
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/wishlist/my-wishlist");
      if (res.data.success) {
        setWishlistItems(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load wishlist");
      console.error("Wishlist Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // 2. Remove Item from Wishlist
  const handleRemove = async (wishlistId) => {
    try {
      const res = await axiosInstance.delete(`/wishlist/remove/${wishlistId}`);
      if (res.data.success) {
        // Optimistic UI update: Remove item from state immediately
        setWishlistItems((prev) => prev.filter((item) => item._id !== wishlistId));
        toast.success("Removed from wishlist");
      }
    } catch (error) {
      toast.error("Could not remove item");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-40 gap-4">
      <Loader2 className="animate-spin text-[var(--secondary)]" size={40} />
      <p className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">Loading Collection...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen">
      <Toaster />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">My Wishlist</h1>
        <p className="text-[var(--text-secondary)] font-medium mt-1">
          {wishlistItems.length} items saved in your collection.
        </p>
      </div>

      {/* List Container */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => (
              <motion.div 
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                className="group bg-[var(--surface)] border border-[var(--border)] p-4 md:p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[var(--secondary)]/30 transition-all shadow-sm"
              >
                {/* Left: Product Info from API */}
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="w-20 h-20 bg-[var(--background)] rounded-2xl flex items-center justify-center border border-[var(--border)] shrink-0 relative overflow-hidden group-hover:bg-[var(--secondary)]/5 transition-colors">
                    {/* If product has image use it, otherwise show Heart icon */}
                    <Heart size={24} className="text-[var(--text-secondary)] group-hover:text-rose-500 transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase text-[var(--secondary)] tracking-[0.2em] mb-1">
                      {item.product?.category?.name || "Product"}
                    </p>
                    <p className="font-black text-lg text-[var(--text-primary)] truncate max-w-[250px]">
                      {item.product?.name}
                    </p>
                    <p className="text-sm font-bold text-[var(--text-secondary)] mb-1">
                      Brand: {item.product?.brand}
                    </p>
                    <p className="font-black text-[var(--text-primary)] text-lg">
                      ৳{item.product?.pricing?.basePrice?.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {/* Right: Actions */}
                <div className="flex items-center w-full md:w-auto gap-3">
                  {/* Remove Button */}
                  <button 
                    onClick={() => handleRemove(item._id)}
                    className="flex-1 md:flex-none p-4 bg-[var(--background)] border border-[var(--border)] text-[var(--text-secondary)] rounded-2xl hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all active:scale-90"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Add to Cart Button */}
                  <button className="flex-[3] md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-[var(--secondary)] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-[var(--secondary)]/20 active:scale-95">
                    <ShoppingBag size={18} /> 
                    <span>Add to Cart</span>
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-24 bg-[var(--surface)] rounded-[3rem] border border-dashed border-[var(--border)]"
            >
              <div className="flex flex-col items-center gap-4 opacity-20">
                <Heart size={64} strokeWidth={1} />
                <p className="font-black text-xl">Your wishlist is empty</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishlistPage;