"use client";

import { useState } from "react";
import { Menu, X, Cpu, Shirt, ShoppingCart, Home, Heart, Smartphone, Activity, PlusCircle, Tag, Package, Headphones, CornerUpLeft, Gift, Star, Award } from "lucide-react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon */}
      <button 
        onClick={() => setOpen(true)} 
        className="md:hidden"
        style={{ color: "var(--text-primary)" }} 
      >
        <Menu size={28} />
      </button>

      {/* Sidebar Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          {/* Sidebar Content */}
          <div 
            className="w-64 h-full shadow-lg p-5 flex flex-col transition-colors duration-300"
            style={{ 
              backgroundColor: "var(--background)", 
              color: "var(--text-primary)" 
            }}
          >

            {/* Close Button */}
            <button 
              onClick={() => setOpen(false)} 
              className="mb-4 w-fit"
              style={{ color: "var(--text-primary)" }}
            >
              <X size={26} />
            </button>

            {/* Categories */}
            <div>
              <h2 className="font-semibold text-lg pb-2 border-b" style={{ borderColor: "var(--border)" }}>
                Categories
              </h2>
              <ul className="mt-2 space-y-2 font-medium" style={{ color: "var(--text-secondary)" }}>
                <li className="flex items-center gap-3"><Cpu size={18}/> Electronics</li>
                <li className="flex items-center gap-3"><Shirt size={18}/> Fashion</li>
                <li className="flex items-center gap-3"><ShoppingCart size={18}/> Grocery</li>
                <li className="flex items-center gap-3"><Home size={18}/> Home & Living</li>
                <li className="flex items-center gap-3"><Heart size={18}/> Beauty</li>
                <li className="flex items-center gap-3"><Smartphone size={18}/> Mobile & Accessories</li>
                <li className="flex items-center gap-3"><Activity size={18}/> Sports & Outdoors</li>
                <li className="flex items-center gap-3"><PlusCircle size={18}/> Health & Beauty</li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="mt-6">
              <h2 className="font-semibold text-lg pb-2 border-b" style={{ borderColor: "var(--border)" }}>
                Quick Links
              </h2>
              <ul className="mt-2 space-y-2 font-medium" style={{ color: "var(--text-secondary)" }}>
                <li className="flex items-center gap-3"><Tag size={18}/> Offers / Deals</li>
                <li className="flex items-center gap-3"><Package size={18}/> Track Orders</li>
                <li className="flex items-center gap-3"><Headphones size={18}/> Customer Support</li>
                <li className="flex items-center gap-3"><CornerUpLeft size={18}/> Returns & Refunds</li>
                <li className="flex items-center gap-3"><Gift size={18}/> Gift Cards</li>
                <li className="flex items-center gap-3"><Star size={18}/> New Arrivals</li>
                <li className="flex items-center gap-3"><Award size={18}/> Top Brands</li>
              </ul>
            </div>

          </div>

          {/* outside click menu close  */}
          <div className="flex-1" onClick={() => setOpen(false)}></div>
        </div>
      )}
    </>
  );
}