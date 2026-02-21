"use client";

import { useState } from "react";
import { Menu, X, Cpu, Shirt, ShoppingCart, Home, Heart, Smartphone, Activity, PlusCircle, Tag, Package, Headphones, CornerUpLeft, Gift, Star, Award } from "lucide-react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon */}
      <button onClick={() => setOpen(true)} className="md:hidden">
        <Menu size={28} />
      </button>

      {/* Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="w-64 h-full bg-white shadow-lg p-5 flex flex-col">

            {/* Close Button */}
            <button onClick={() => setOpen(false)} className="mb-4">
              <X size={26} />
            </button>

            {/* Categories */}
            <div>
              <h2 className="font-semibold text-lg pb-2 border-b">Categories</h2>
              <ul className="mt-2 space-y-2 text-gray-700 font-medium">
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
              <h2 className="font-semibold text-lg pb-2 border-b">Quick Links</h2>
              <ul className="mt-2 space-y-2 text-gray-700 font-medium">
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
        </div>
      )}
    </>
  );
}