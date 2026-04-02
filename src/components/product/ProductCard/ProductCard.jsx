"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // Ensure this is installed and toaster is in layout

/**
 * Standard Utility for merging Tailwind classes
 */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ProductCard = ({ product }) => {
  if (!product) return null;
  const router = useRouter();

  // Wishlist toggle state
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    name = "No Name",
    _id,
    category = {},
    pricing = { basePrice: 0, oldPrice: 0 },
    images = {},
    rating = { average: 0, totalReviews: 0 },
    discount = { value: 0 },
  } = product;

  /**
   * Navigate to product details page
   */
  const handleCardClick = () => {
    router.push(`/productDetails/${_id}`);
  };

  /**
   * Wishlist toggle with toast
   */
  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Card click stop korbe
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);
    
    if (nextState) {
      toast.success("Added to Wishlist! ❤️");
    } else {
      toast("Removed from Wishlist", { icon: "🗑️" });
    }
  };

  /**
   * Cart notification toast
   */
  const handleCartClick = (e) => {
    e.stopPropagation(); // Card click stop korbe
    toast.success("Added to Cart successfully! 🛒");
    console.log("Cart added for:", _id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleCardClick}
      className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg cursor-pointer w-full"
    >
      {/* 1. Image Section */}
      <div className="relative aspect-square w-full bg-[var(--background)] overflow-hidden shrink-0 border-b border-[var(--border)]">
        <Image
          src={images?.thumbnail || "/placeholder.jpg"}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-3 sm:p-4 transition-transform duration-500 group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal"
        />
        
        {/* Discount Tag */}
        {discount?.value > 0 && (
          <div className="absolute top-0 left-0 bg-rose-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-br-xl z-10 shadow-sm">
            {discount.value}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistClick}
          className={cn(
            "absolute top-2 right-2 p-1.5 bg-[var(--surface)]/80 dark:bg-black/40 backdrop-blur-md rounded-full transition-colors z-10 border border-[var(--border)] shadow-sm",
            isWishlisted ? "text-rose-500" : "text-[var(--text-secondary)] hover:text-rose-500"
          )}
        >
          <Heart 
            size={16} 
            className="sm:w-5 sm:h-5" 
            fill={isWishlisted ? "currentColor" : "none"} 
          />
        </button>
      </div>

      {/* 2. Info Section */}
      <div className="p-3 sm:p-4 flex flex-col grow">
        <span className="text-[9px] sm:text-[10px] font-medium text-[var(--secondary)] uppercase tracking-tight mb-1 opacity-80">
          {category?.name || "General"}
        </span>

        <h3 className="text-[var(--text-primary)] font-semibold text-xs sm:text-sm lg:text-base line-clamp-2 leading-tight group-hover:text-[var(--secondary)] transition-colors grow">
          {name}
        </h3>

        {/* 3. Rating Section */}
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={cn(
                  "sm:w-3.5 sm:h-3.5 transition-colors",
                  i < Math.floor(rating?.average || 0) 
                    ? "fill-amber-400 text-amber-400" 
                    : "fill-slate-200 text-slate-200 dark:fill-slate-200 dark:text-slate-700"
                )}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-slate-400 font-medium opacity-70">
            ({rating?.totalReviews || 0})
          </span>
        </div>

        {/* 4. Pricing and Cart CTA */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-sm sm:text-lg font-bold text-[var(--text-primary)] leading-none tracking-tight">
              ${pricing?.basePrice}
            </span>
            {pricing?.oldPrice > pricing?.basePrice && (
              <span className="text-[10px] sm:text-xs text-[var(--text-secondary)] line-through mt-0.5 opacity-50">
                ${pricing?.oldPrice}
              </span>
            )}
          </div>

          {/* Cart Button */}
          <button 
            onClick={handleCartClick}
            className="h-8 w-8 sm:h-9 sm:w-9 bg-[var(--secondary)] text-white flex items-center justify-center rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shadow-[var(--secondary)]/20"
          >
            <ShoppingCart size={16} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;