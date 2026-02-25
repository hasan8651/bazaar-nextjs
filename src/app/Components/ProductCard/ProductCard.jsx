"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, RefreshCw, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind class merging utility
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ProductCard = ({ product }) => {
  // Destructuring relevant data from your MongoDB structure
  const {
    name,
    slug,
    category,
    pricing,
    images,
    rating,
    discount,
    inventory
  } = product;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Badge (Discount) */}
      {discount?.value > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discount.value}%
        </div>
      )}

      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={images?.thumbnail || "/placeholder.jpg"}
          alt={name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Action Buttons (Hover icons) */}
        <div className="absolute bottom-[-50px] group-hover:bottom-4 left-0 right-0 flex justify-center gap-2 transition-all duration-300">
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-colors">
            <Heart size={18} />
          </button>
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-colors">
            <Eye size={18} />
          </button>
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-colors">
            <RefreshCw size={18} />
          </button>
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-colors">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <p className="text-sm text-gray-400 mb-1">{category?.name}</p>
        <Link href={`/product/${slug}`}>
          <h3 className="text-gray-800 font-medium text-base truncate hover:text-orange-600 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={cn(
                "fill-current",
                i < Math.floor(rating?.average || 0) ? "text-orange-400" : "text-gray-300"
              )}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({rating?.totalReviews || 0})</span>
        </div>

        {/* Pricing */}
        <div className="mt-3 flex items-center gap-3">
          <span className="text-lg font-bold text-slate-900">
            ${pricing?.basePrice.toFixed(2)}
          </span>
          {pricing?.oldPrice > pricing?.basePrice && (
            <span className="text-sm text-gray-400 line-through">
              ${pricing?.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status (Optional) */}
        {inventory?.stockStatus === "low-stock" && (
          <p className="text-[10px] text-red-500 mt-1 font-semibold uppercase">
            Only {inventory.totalStock} left!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;