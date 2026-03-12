"use client";

import React, { useState } from "react";
import { Edit3, Trash2, Plus, LayoutGrid, Tag } from "lucide-react";

const ManageCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", productCount: 124, color: "from-blue-500/20 to-indigo-500/20", icon: "⚡" },
    { id: 2, name: "Accessories", productCount: 85, color: "from-emerald-500/20 to-teal-500/20", icon: "⌚" },
    { id: 3, name: "Home Decor", productCount: 42, color: "from-amber-500/20 to-orange-500/20", icon: "🛋️" },
    { id: 4, name: "Fashion", productCount: 210, color: "from-rose-500/20 to-pink-500/20", icon: "👕" },
  ]);

  return (
    <div className="p-4 md:p-10 space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">Categories</h1>
          <p className="text-sm text-[var(--text-secondary)] font-bold mt-1 tracking-wide">Organize your store structure effortlessly.</p>
        </div>
        
        {/* Updated Button Styling */}
        <button className="bg-[#00A99D] hover:bg-[#008c82] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all shadow-lg shadow-[#00A99D]/20 active:scale-95">
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Grid - No empty card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2.5rem] hover:border-[#00A99D]/50 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1">
            <div className="flex justify-between items-start mb-8">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl bg-gradient-to-br ${cat.color} backdrop-blur-sm shadow-inner`}>
                {cat.icon}
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors">
                    <Edit3 size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                    <Trash2 size={16} />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-black text-[var(--text-primary)] mb-1">{cat.name}</h3>
            <div className="flex items-center gap-2 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">
              <Tag size={10} className="text-[#00A99D]" /> {cat.productCount} Total Items
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategories;