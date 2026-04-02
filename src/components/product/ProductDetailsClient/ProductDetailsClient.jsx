"use client";
import React, { useState } from "react";
import { MapPin, Star, Flame, Minus, Plus, Heart, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast'; // Toast import

export default function ProductPage({ singleProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("product details");
  const [selectedSize, setSelectedSize] = useState("M");

  if (!singleProduct) return <div className="p-20 text-center">Loading...</div>;

  // Notification logic
  const handleAction = (msg) => {
    toast.success(msg, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  // Framer Motion Variants (Keeping your original animations)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const tabContentVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 25 },
    },
    exit: { x: 10, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto p-5 md:p-12 font-sans selection:bg-secondary/30"
    >
      <Toaster position="bottom-center" reverseOrder={false} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* LEFT: Image Gallery */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
          <div className="relative group overflow-hidden rounded-3xl bg-surface border border-border/50 shadow-sm">
            <img
              src={singleProduct?.images?.thumbnail}
              alt={singleProduct.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-accent text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_10px_20px_rgba(245,158,11,0.4)] transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                New Arrival
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-surface rounded-2xl overflow-hidden border border-border hover:border-secondary transition-all cursor-pointer group"
              >
                <img
                  src={singleProduct?.images?.thumbnail}
                  alt="thumb"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Product Info */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <div className="space-y-2 mb-6">
            <p className="text-secondary font-bold tracking-widest uppercase text-xs">
              {singleProduct?.brand || "Premium Collection"}
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-text-primary leading-[1.1]">
              {singleProduct.name}
            </h1>
          </div>

          <div className="flex items-center gap-6 mb-8 pb-6 border-b border-border/50">
            <div className="flex items-center gap-1.5">
              <div className="flex text-accent">
                <Star size={16} fill="currentColor" />
              </div>
              <span className="font-bold text-sm text-text-primary">
                {singleProduct?.rating?.average}
              </span>
              <span className="text-text-secondary text-sm">
                ({singleProduct?.rating?.totalReviews} Reviews)
              </span>
            </div>
            <div className="flex items-center text-red-500 gap-1.5 text-sm font-semibold">
              <Flame size={16} className="animate-pulse" /> 100+ Sold
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-text-primary">
                ${singleProduct?.pricing?.basePrice}
              </span>
              {singleProduct?.pricing?.oldPrice && (
                <span className="text-lg text-text-secondary line-through decoration-red-500/50">
                  ${singleProduct?.pricing?.oldPrice}
                </span>
              )}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-sm uppercase tracking-wider text-text-primary">
                Select Size
              </p>
              <button className="text-xs text-secondary underline font-medium">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "2XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-12 w-14 rounded-xl border-2 transition-all font-bold text-sm
                    ${
                      selectedSize === size
                        ? "border-secondary bg-secondary/5 text-secondary shadow-[0_0_15px_rgba(14,165,164,0.1)]"
                        : "border-border text-text-secondary hover:border-text-primary"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8 p-4 bg-surface rounded-2xl border border-border/50 flex items-center justify-between">
            <p className="font-bold text-sm uppercase tracking-wider text-text-primary ml-2">
              Quantity
            </p>
            <div className="flex items-center bg-background rounded-xl border border-border px-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-text-secondary hover:text-secondary transition-colors"
              >
                <Minus size={18} />
              </button>
              <span className="px-4 font-black text-lg min-w-[40px] text-center text-text-primary">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-text-secondary hover:text-secondary transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Buttons: Your Design Intact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <motion.button 
              onClick={() => handleAction("Added to cart successfully!")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-14 bg-transparent border-2 border-secondary text-text-primary font-bold rounded-2xl hover:bg-secondary hover:text-white transition-all duration-300 uppercase tracking-widest text-[11px]"
            >
              Add to Cart
            </motion.button>
            <motion.button
              onClick={() => handleAction("Proceeding to checkout...")}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="h-14 bg-secondary text-white font-bold rounded-2xl shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all duration-300 uppercase tracking-widest text-[11px]"
            >
              Buy It Now
            </motion.button>
          </div>

          <div className="flex justify-between items-center px-2">
            <div className="group flex items-center gap-2 text-text-secondary cursor-pointer hover:text-secondary transition-colors">
              <MapPin size={18} />{" "}
              <span className="text-sm font-semibold">Stock in Stores</span>
            </div>
            <div onClick={() => handleAction("Added to Wishlist!")} className="group flex items-center gap-2 text-text-secondary cursor-pointer hover:text-red-500 transition-colors">
              <Heart size={18} />{" "}
              <span className="text-sm font-semibold">Wishlist</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* TABS SECTION */}
      <motion.div
        variants={itemVariants}
        className="mt-24 border-t border-border pt-12"
      >
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          <div className="w-full md:w-1/3">
            <div className="flex flex-col gap-2 sticky top-8">
              {["Product Details", "Seller Info", "Shipping"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`text-left px-6 py-4 rounded-2xl font-bold transition-all ${
                    activeTab === tab.toLowerCase()
                      ? "bg-secondary text-white shadow-lg shadow-secondary/20 scale-105"
                      : "text-text-secondary hover:bg-surface"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-2/3 min-h-[350px] overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === "product details" && (
                <motion.div
                  key="details"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                >
                  <h3 className="text-2xl font-black mb-6 text-secondary">
                    Description
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-lg mb-8">
                    {singleProduct.description}
                  </p>
                  <div className="grid grid-cols-2 gap-6 p-6 bg-surface rounded-3xl border border-border/50">
                    <div>
                      <p className="text-xs uppercase text-text-secondary font-bold tracking-tighter mb-1">
                        Brand
                      </p>
                      <p className="font-bold text-text-primary">
                        {singleProduct.brand}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-text-secondary font-bold tracking-tighter mb-1">
                        Stock Status
                      </p>
                      <p className="font-bold text-success">
                        {singleProduct.inventory.stockStatus}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "seller info" && (
                <motion.div
                  key="seller"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                  className="bg-surface p-8 rounded-3xl border border-border/50"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-black">
                      {singleProduct.seller.storeName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-text-primary">
                        {singleProduct.seller.storeName}
                      </h4>
                      <p className="text-text-secondary text-sm">
                        {singleProduct.seller.sellerEmail}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-text-secondary uppercase mb-1">
                    Seller Rating
                  </p>
                  <p className="text-2xl font-black text-secondary">
                    {singleProduct.seller.sellerRating} / 5.0
                  </p>
                </motion.div>
              )}

              {activeTab === "shipping" && (
                <motion.div
                  key="shipping"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                >
                  <h3 className="text-2xl font-black mb-6 text-secondary">
                    Shipping & Delivery
                  </h3>
                  <div className="bg-surface p-8 rounded-3xl border border-border/50 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                        <Truck size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-text-primary">
                          Free Standard Shipping
                        </p>
                        <p className="text-text-secondary text-sm">
                          On all orders above $100. Delivered within 3-5
                          business days.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* REVIEWS SECTION */}
      <motion.div
        variants={itemVariants}
        className="mt-24 p-8 md:p-12 bg-surface rounded-[40px] border border-border/50"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-black mb-2 text-text-primary">
              Verified Reviews
            </h3>
            <div className="flex items-center gap-6 mt-8">
              <span className="text-7xl font-black text-secondary tracking-tighter">
                {singleProduct?.rating?.average}
              </span>
              <div>
                <div className="flex text-accent mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={20}
                      fill={s <= 4 ? "currentColor" : "none"}
                      className={s <= 4 ? "" : "text-border"}
                    />
                  ))}
                </div>
                <p className="font-bold text-text-primary">
                  Based on {singleProduct?.rating?.totalReviews} reviews
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((num) => (
              <div
                key={num}
                className="flex items-center gap-4 text-sm font-bold"
              >
                <span className="w-4 text-text-primary">{num}</span>
                <div className="flex-1 h-3 bg-background rounded-full overflow-hidden border border-border/30">
                  <div
                    className="h-full bg-secondary"
                    style={{
                      width: `${num === 5 ? 85 : num === 4 ? 60 : 15 * num}%`,
                    }}
                  ></div>
                </div>
                <span className="text-text-secondary w-10 text-right">
                  0{num}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}