"use client";

import React, { useState } from "react";
import { 
  CheckCircle, Eye, Edit3, Trash2, 
  Filter, Store, Power, PowerOff, ChevronDown, Package 
} from "lucide-react";

const ManageProducts = () => {
  const [products, setProducts] = useState([
   {
      id: 1,
      name: "Modern Leather Watch",
      seller: "TimeWise Shop",
      category: "Accessories",
      price: 120.0,
      stock: 45,
      status: "Pending", 
      image: null, // future API image
    },
    {
      id: 2,
      name: "Wireless Headphones",
      seller: "Gadget BD",
      category: "Electronics",
      price: 85.5,
      stock: 12,
      status: "Active",
      image: null,
    },
    {
      id: 3,
      name: "Gaming Mouse",
      seller: "Tech Land",
      category: "Electronics",
      price: 45.0,
      stock: 0,
      status: "Disabled",
      image: null,
    }
  ]);

  return (
    <div className="p-4 md:p-10 space-y-8 min-h-screen">
      {/* 🟢 Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-3">
          <Package className="text-[#00A99D]" /> Manage Products
        </h1>
        <p className="text-sm text-[var(--text-secondary)] font-bold opacity-80">Oversee merchant inventory and platform listings.</p>
      </div>

      {/* 🟢 Modern Filter Section */}
      <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2.5rem] shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Category", options: ["Electronics", "Accessories", "Home Decor"] },
            { label: "Status", options: ["Active", "Pending", "Disabled"] },
            { label: "Seller", options: ["Gadget BD", "Tech Land", "TimeWise Shop"] }
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase tracking-[0.1em] text-[var(--text-primary)] opacity-70 ml-1">
                {item.label}
              </label>
              <div className="relative group">
                <select className="w-full bg-[var(--border)]/10 border border-[var(--border)] p-3.5 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20 focus:border-[#00A99D] transition-all text-[var(--text-primary)] text-sm font-black cursor-pointer">
                  <option value="" className="bg-[var(--surface)]">Select {item.label}</option>
                  {item.options.map(opt => <option key={opt} value={opt.toLowerCase()} className="bg-[var(--surface)]">{opt}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none" size={16} />
              </div>
            </div>
          ))}
          
          <div className="flex items-end">
            <button className="w-full h-[54px] bg-[#00A99D] hover:bg-[#008c82] text-white rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00A99D]/20 active:scale-95">
              <Filter size={18} /> Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* 🔵 Improved Visibility Table */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-sidebar-scroll">
          <table className="w-full text-left border-separate border-spacing-0 min-w-[1000px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/90">
                {["Product Details", "Merchant", "Category", "Price", "Stock", "Status", "Actions"].map((head) => (
                  <th key={head} className="px-8 py-6 text-[12px] font-black uppercase tracking-widest text-slate-900 dark:text-slate-100 border-b border-[var(--border)]">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border)]">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 shrink-0 p-1 bg-white dark:bg-slate-700 rounded-2xl border border-[var(--border)] shadow-sm">
                        <img src={product.image} alt="" className="h-full w-full rounded-xl object-cover" />
                      </div>
                      <span className="font-black text-[var(--text-primary)] text-[15px] group-hover:text-[#00A99D] transition-colors leading-tight uppercase">{product.name}</span>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 font-black text-[var(--text-primary)] text-sm uppercase">
                        <Store size={14} className="text-[#00A99D]" /> {product.seller}
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-5 text-sm font-bold text-[var(--text-secondary)] uppercase tracking-tighter">{product.category}</td>
                  <td className="px-8 py-5 text-base font-black text-[var(--text-primary)]">${product.price.toFixed(2)}</td>
                  
                  <td className="px-8 py-5 text-sm font-black">
                    <span className={`flex items-center gap-2 ${product.stock === 0 ? "text-red-500" : "text-[var(--text-primary)]"}`}>
                      <div className={`w-2 h-2 rounded-full ${product.stock === 0 ? "bg-red-500 animate-pulse" : "bg-[#00A99D]"}`}></div>
                      {product.stock} Units
                    </span>
                  </td>

                  {/* 🟢 High Contrast Status Badge */}
                  <td className="px-8 py-5">
                    <span className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-[0.1em] border shadow-sm ${
                      product.status === "Active" ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/50" : 
                      product.status === "Pending" ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/50" : 
                      "bg-red-100 text-red-800 border-red-300 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/50"
                    }`}>
                      {product.status}
                    </span>
                  </td>

                  {/* 🟢 Balanced Action Panel */}
                 <td className="px-8 py-5">
  <div className="flex items-center justify-end gap-4">
    
    {/* 1. View Details Button */}
    <div className="group/tip relative flex justify-center">
      <button className="p-2.5 text-[var(--text-secondary)] hover:bg-[#00A99D]/10 hover:text-[#00A99D] rounded-2xl transition-all border border-transparent hover:border-[#00A99D]/20">
        <Eye size={20} />
      </button>
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tip:opacity-100 transition-opacity whitespace-nowrap z-50 font-bold uppercase tracking-widest shadow-xl">View</span>
    </div>

    {/* 2. Approve/Status Toggle Button (লজিক: Pending হলে Approve, অন্যথায় Toggle) */}
    <div className="group/tip relative flex justify-center">
      <button className={`p-2.5 rounded-2xl transition-all border border-transparent ${
          product.status === "Pending" 
            ? "text-green-600 hover:bg-green-100 hover:border-green-200" 
            : product.status === "Active" 
              ? "text-amber-600 hover:bg-amber-100 hover:border-amber-200" 
              : "text-[#00A99D] hover:bg-[#00A99D]/10 hover:border-[#00A99D]/20"
        }`}>
        {product.status === "Pending" ? <CheckCircle size={20} /> : product.status === "Active" ? <PowerOff size={20} /> : <Power size={20} />}
      </button>
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tip:opacity-100 transition-opacity whitespace-nowrap z-50 font-bold uppercase tracking-widest shadow-xl">
        {product.status === "Pending" ? "Approve" : product.status === "Active" ? "Disable" : "Enable"}
      </span>
    </div>

    {/* 3. Delete Button */}
    <div className="group/tip relative flex justify-center">
      <button className="p-2.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-2xl transition-all border border-transparent hover:border-red-200">
        <Trash2 size={20} />
      </button>
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-700 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tip:opacity-100 transition-opacity whitespace-nowrap z-50 font-bold uppercase tracking-widest shadow-xl">Delete</span>
    </div>

  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;