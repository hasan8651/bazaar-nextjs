"use client";

import React, { useState } from "react";
import { Eye, Edit3, Trash2, Filter, ShoppingBag, Truck, CheckCircle, Clock } from "lucide-react";

const AllOrders = () => {
  const [orders, setOrders] = useState([
    { id: "#ORD-7721", customer: "Rahim Ahmed", total: 120.0, status: "Delivered", date: "12 Mar, 2026" },
    { id: "#ORD-7722", customer: "Karim Uddin", total: 85.5, status: "Processing", date: "12 Mar, 2026" },
    { id: "#ORD-7723", customer: "Sara Islam", total: 45.0, status: "Cancelled", date: "11 Mar, 2026" },
  ]);

  return (
    <div className="p-4 md:p-10 space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-3">
          <ShoppingBag className="text-[#00A99D]" /> All Orders
        </h1>
        <p className="text-sm text-[var(--text-secondary)] font-bold opacity-80">Track and manage customer orders.</p>
      </div>

      {/* Filter Section */}
      <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
            <input type="text" placeholder="Search by order ID or customer..." className="w-full bg-[var(--border)]/10 border border-[var(--border)] p-4 rounded-2xl focus:outline-none focus:border-[#00A99D] font-bold text-sm" />
        </div>
        <button className="bg-[var(--border)] hover:bg-gray-200 dark:hover:bg-gray-800 text-[var(--text-primary)] px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/80">
                {["Order ID", "Customer", "Date", "Total", "Status", "Actions"].map((head) => (
                  <th key={head} className="px-8 py-6 text-[12px] font-black uppercase tracking-widest text-slate-800 dark:text-slate-200">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                  <td className="px-8 py-5 font-black text-[#00A99D]">{order.id}</td>
                  <td className="px-8 py-5 font-bold text-[var(--text-primary)]">{order.customer}</td>
                  <td className="px-8 py-5 font-bold text-[var(--text-secondary)]">{order.date}</td>
                  <td className="px-8 py-5 font-black text-[var(--text-primary)]">${order.total.toFixed(2)}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700" : 
                      order.status === "Processing" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-3">
                      <button className="p-2.5 text-[var(--text-secondary)] hover:bg-[#00A99D]/10 hover:text-[#00A99D] rounded-2xl transition-all"><Eye size={18}/></button>
                      <button className="p-2.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all"><Edit3 size={18}/></button>
                      <button className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all"><Trash2 size={18}/></button>
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

export default AllOrders;