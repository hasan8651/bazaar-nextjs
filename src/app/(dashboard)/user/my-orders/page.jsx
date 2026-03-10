"use client";

import React, { useState } from "react";
import { Package, Search, ChevronRight, Filter, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const MyOrdersPage = () => {
  const [search, setSearch] = useState("");
  
  const orders = [
    { id: "ORD-7829", date: "Mar 05, 2026", total: "$120.00", status: "Delivered" },
    { id: "ORD-7830", date: "Mar 07, 2026", total: "$85.50", status: "Processing" },
    { id: "ORD-7831", date: "Mar 08, 2026", total: "$45.00", status: "Cancelled" },
    { id: "ORD-7832", date: "Mar 09, 2026", total: "$210.00", status: "Delivered" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-10">
      {/* Modern Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">My Orders</h1>
          <p className="text-[var(--text-secondary)] font-medium mt-1">Track your recent shipments and order history.</p>
        </div>
        
        {/* Modern Premium Search Bar */}
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-4 text-[var(--text-secondary)] group-focus-within:text-[var(--secondary)] transition-colors" size={18} />
            <input 
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order ID..." 
              className="pl-12 pr-6 py-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] w-full md:w-72 outline-none focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10 font-bold text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] transition-all shadow-sm"
            />
          </div>
          <button className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-[var(--text-secondary)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Modern Card-Style List (Mobile Responsive) */}
      <div className="grid gap-4">
        {orders.map((order) => (
          <motion.div 
            whileHover={{ scale: 1.01 }}
            key={order.id} 
            className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-5">
              <div className="p-4 bg-[var(--background)] rounded-2xl text-[var(--secondary)] border border-[var(--border)]">
                <Package size={24} />
              </div>
              <div>
                <p className="font-black text-lg text-[var(--text-primary)]">{order.id}</p>
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">{order.date}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between md:justify-center gap-10">
              <div className="text-center">
                <p className="text-[10px] font-black uppercase text-[var(--text-secondary)]">Total</p>
                <p className="font-black text-[var(--text-primary)]">{order.total}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black uppercase text-[var(--text-secondary)]">Status</p>
                <StatusBadge status={order.status} />
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl font-bold text-[var(--text-primary)] hover:bg-[var(--secondary)] hover:text-white transition-all">
              Details <ExternalLink size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Delivered: "text-emerald-500 bg-emerald-500/10",
    Processing: "text-blue-500 bg-blue-500/10",
    Cancelled: "text-rose-500 bg-rose-500/10",
  };
  return (
    <span className={`mt-1 inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase ${styles[status]}`}>
      {status}
    </span>
  );
};

export default MyOrdersPage;