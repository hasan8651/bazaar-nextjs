"use client";
import { useState } from "react";
import { Menu, X, Cpu, Shirt, ShoppingCart, Home, Heart, Smartphone, Tag, Star } from "lucide-react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // এটি সহজেই Backend থেকে লুপ করে আনা যাবে
  const categories = [
    { name: "Electronics", icon: Cpu },
    { name: "Fashion", icon: Shirt },
    { name: "Grocery", icon: ShoppingCart },
    { name: "Home & Living", icon: Home },
    { name: "Beauty", icon: Heart },
  ];

  return (
    <>
      <button onClick={() => setOpen(true)} className="md:hidden p-1 text-(--text-primary) hover:bg-(--surface) rounded-lg transition-colors">
        <Menu size={26} />
      </button>

      {open && (
        <div className="fixed inset-0 z-100 md:hidden">
          {/* Overlay with blur */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          
          <div className="absolute top-0 left-0 w-70 h-full bg-(--background) shadow-2xl flex flex-col animate-in slide-in-from-left duration-500">
            <div className="p-6 flex flex-col h-full">
              
              <div className="flex items-center justify-between mb-10">
                <span className="font-black text-xl italic tracking-tighter text-(--secondary)">PrimeMart</span>
                <button onClick={() => setOpen(false)} className="p-2 rounded-xl bg-(--surface) text-(--text-primary)">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8 overflow-y-auto">
                <section>
                  <h3 className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-5">Explore Categories</h3>
                  <ul className="space-y-3">
                    {categories.map((item) => (
                      <li key={item.name} className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-(--secondary)/5 cursor-pointer transition-all">
                        <div className="p-2.5 rounded-xl bg-(--surface) text-(--secondary) group-hover:bg-(--secondary) group-hover:text-white transition-all">
                          <item.icon size={18}/>
                        </div>
                        <span className="text-sm font-bold text-(--text-primary)">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="mt-auto pt-6 border-t border-(--border) text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Powered by PrimeMart v2.0</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}