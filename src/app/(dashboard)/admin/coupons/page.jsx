"use client";

import React, { useState } from "react";
import { Tag, Calendar, Users, Plus, Trash2, Edit3, X, Zap } from "lucide-react";

const ManageCoupons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coupons, setCoupons] = useState([
    { id: 1, code: "EID2026", discount: "20%", expiry: "15 Mar, 2026", used: 124, status: "Active" },
    { id: 2, code: "FLAT50", discount: "$50", expiry: "10 Mar, 2026", used: 85, status: "Expired" },
    { id: 3, code: "WELCOME10", discount: "10%", expiry: "30 Mar, 2026", used: 450, status: "Active" },
  ]);

  return (
    <div className="p-4 md:p-10 space-y-8 min-h-screen">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">Coupon Manager</h1>
          <p className="text-sm text-[var(--text-secondary)] font-bold mt-1">Manage and create promotional codes for your store.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#00A99D] hover:bg-[#008c82] text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-[#00A99D]/20"
        >
          <Plus size={18} /> New Coupon
        </button>
      </div>

      {/* Modal - Overlay with high z-index to stay above the header */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--surface)] w-full max-w-md p-8 rounded-[2.5rem] border border-[var(--border)] shadow-2xl relative animate-in zoom-in-95 duration-300">
            
            {/* Close button to exit the modal */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-6 right-6 p-2 bg-[var(--border)]/20 hover:bg-[var(--border)] rounded-full transition-all text-[var(--text-primary)]"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-black text-[var(--text-primary)] mb-6 flex items-center gap-3">
              <Zap className="text-[#00A99D]" /> New Coupon
            </h2>
            
            {/* Form inputs with explicit text colors for dark mode visibility */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-widest ml-1 mb-1 block">Coupon Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. SUMMER26" 
                  className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--border)]/10 text-[var(--text-primary)] placeholder:text-slate-500 font-bold focus:outline-none focus:border-[#00A99D]" 
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-widest ml-1 mb-1 block">Discount Type</label>
                <input 
                  type="text" 
                  placeholder="e.g. 20%" 
                  className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--border)]/10 text-[var(--text-primary)] placeholder:text-slate-500 font-bold focus:outline-none focus:border-[#00A99D]" 
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-widest ml-1 mb-1 block">Expiry Date</label>
                <input 
                  type="date" 
                  className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--border)]/10 text-[var(--text-primary)] font-bold focus:outline-none focus:border-[#00A99D] [color-scheme:dark]" 
                />
              </div>
              
              <button className="w-full bg-[#00A99D] hover:bg-[#008c82] text-white py-4 rounded-2xl font-black mt-4 transition-all">
                Create Coupon
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Coupons Grid display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-[#00A99D]/10 text-[#00A99D] px-4 py-2 rounded-xl font-black tracking-widest text-sm flex items-center gap-2">
                <Tag size={16} /> {coupon.code}
              </div>
              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${coupon.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {coupon.status}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-4xl font-black text-[var(--text-primary)] mb-1">{coupon.discount}</h2>
              <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Discount Value</p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-[var(--border)]">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-[10px] font-bold text-[var(--text-secondary)]">
                    <Calendar size={12} /> {coupon.expiry}
                </span>
                <span className="flex items-center gap-2 text-[10px] font-bold text-[var(--text-secondary)]">
                    <Users size={12} /> {coupon.used} Used
                </span>
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"><Edit3 size={16}/></button>
                <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"><Trash2 size={16}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCoupons;