"use client";

import React from "react";
import { DollarSign, ShoppingBag, Clock } from "lucide-react";

const Reports = () => {
  const stats = [
    { title: "Total Revenue", value: "$45,230", desc: "Lifetime earnings", icon: DollarSign, color: "text-blue-400" },
    { title: "Total Orders", value: "1,284", desc: "Completed orders", icon: ShoppingBag, color: "text-purple-400" },
    { title: "Pending Orders", value: "24", desc: "Awaiting action", icon: Clock, color: "text-amber-400" },
  ];

  return (
    <div className="p-4 md:p-10 space-y-8 min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[var(--text-primary)]">Dashboard Overview</h1>
        <p className="text-sm font-bold text-[var(--text-secondary)] mt-1">Platform performance stats & recent activity.</p>
      </div>

      {/* Stats Cards - Added hover-lift and sub-bg-effect */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="group bg-[var(--surface)] border border-[var(--border)] p-8 rounded-[2.5rem] transition-all duration-300 hover:border-[#00A99D] hover:-translate-y-2 shadow-lg hover:shadow-2xl"
          >
            <div className={`p-4 w-fit bg-[var(--background)] rounded-2xl mb-6 ${stat.color} shadow-inner`}>
                <stat.icon size={24}/>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">{stat.title}</p>
            <h2 className="text-4xl font-black mt-2 text-[var(--text-primary)]">{stat.value}</h2>
            <p className="text-[10px] font-black text-[var(--text-secondary)] mt-1 opacity-70">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Table - Consistent with your Global CSS */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-lg">
        <div className="p-8 border-b border-[var(--border)]">
          <h3 className="font-black text-lg text-[var(--text-primary)]">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[var(--border)]/20 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                <tr>
                    <th className="px-8 py-5">Order ID</th>
                    <th className="px-8 py-5">Customer</th>
                    <th className="px-8 py-5">Amount</th>
                    <th className="px-8 py-5">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
                {[1,2,3].map((i) => (
                    <tr key={i} className="hover:bg-[var(--background)] transition-all">
                        <td className="px-8 py-6 font-black text-[var(--text-primary)]">#ORD-772{i}</td>
                        <td className="px-8 py-6 font-bold text-[var(--text-secondary)]">User Name</td>
                        <td className="px-8 py-6 font-bold text-[var(--text-primary)]">$120.00</td>
                        <td className="px-8 py-6">
                           <span className="px-3 py-1 rounded-xl bg-green-500/10 text-green-400 text-[10px] font-black uppercase">Completed</span>
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

export default Reports;