"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, RefreshCw, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ProductCard = ({ product }) => {
  if (!product) return null;
  const router = useRouter()

  console.log(product)

  const {
    name = "No Name",
    slug = "#",
    _id,
    category = {},
    pricing = { basePrice: 0, oldPrice: 0 },
    images = {},
    rating = { average: 0, totalReviews: 0 },
    discount = { value: 0 },
    inventory = { totalStock: 0, stockStatus: "" }
  } = product;

 

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-(--surface) rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
   
    >
      {discount?.value > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded">
          -{discount.value}%
        </div>
      )}

      <div className="relative aspect-square overflow-hidden bg-(--background) shrink-0">
        <Image
          src={images?.thumbnail || "/placeholder.jpg"}
          alt={name}
          fill
          className="object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute bottom-2 sm:-bottom-12.5 sm:group-hover:bottom-4 left-0 right-0 flex justify-center gap-1 sm:gap-2 transition-all duration-300 px-1">
          <button className="p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-(--secondary) hover:text-white transition-colors">
            <Heart className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
          </button>
          <button className="p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-(--secondary) hover:text-white transition-colors">
            <Eye className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
          </button>
          <button className="p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-(--secondary) hover:text-white transition-colors">
            <RefreshCw className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
          </button>
          <button className="p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-(--secondary) hover:text-white transition-colors">
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-col grow">
        <p className="text-[10px] sm:text-xs text-(--text-primary) mb-1 uppercase tracking-wider">{category?.name || "Uncategorized"}</p>
        <Link href={`/productDetails/${_id}`} className="grow">
          <h3 className="text-(--primary) font-medium text-xs sm:text-sm lg:text-base line-clamp-2 hover:text-(--secondary) transition-colors leading-tight">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "fill-current w-3 h-3 sm:w-3.5 sm:h-3.5",
                i < Math.floor(rating?.average || 0) ? "text-orange-400" : "text-gray-300"
              )}
            />
          ))}
          <span className="text-[10px] sm:text-xs text-gray-400 ml-1">({rating?.totalReviews || 0})</span>
        </div>

        <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-1.5 sm:gap-3">
          <span className="text-sm sm:text-base lg:text-lg font-bold text-(--primary)">
            ${pricing?.basePrice?.toFixed(2) || "0.00"}
          </span>
          {pricing?.oldPrice > pricing?.basePrice && (
            <span className="text-[10px] sm:text-sm text-gray-400 line-through">
              ${pricing?.oldPrice?.toFixed(2)}
            </span>
          )}
        </div>

        {inventory?.stockStatus === "low-stock" && (
          <p className="text-[9px] sm:text-[10px] text-red-500 mt-1.5 font-semibold uppercase">
            Only {inventory.totalStock} left!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;