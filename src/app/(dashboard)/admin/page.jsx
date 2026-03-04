"use client";

import React, { useState } from "react";
import {
  Users,
  Store,
  ShoppingBag,
  DollarSign,
  UserPlus,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react";
import AdminGraph from "@/components/Dashboard/AdminGraph";

const AdminPage = () => {
  const [timeRange, setTimeRange] = useState("7d");

  const globalStats = [
    {
      title: "Platform Revenue",
      value: "$128,430.00",
      icon: DollarSign,
      trend: "+12.5%",
      isUp: true,
      // এখানে আপনার secondary কালারের টেক্সট এবং হালকা ব্যাকগ্রাউন্ড ব্যবহার করছি
      color: "text-[var(--secondary)]",
      bg: "bg-[var(--secondary)]/10",
    },
    {
      title: "Active Customers",
      value: "1,245",
      icon: Users,
      trend: "+3.2%",
      isUp: true,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Total Sellers",
      value: "84",
      icon: Store,
      trend: "+5.4%",
      isUp: true,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Pending Orders",
      value: "23",
      icon: ShoppingBag,
      trend: "-2.1%",
      isUp: false,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Global Overview
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1 font-medium">
            Welcome back! Here is what's happening on{" "}
            <span className="text-[var(--secondary)] font-bold">Bazaar</span>{" "}
            today.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white rounded-xl text-xs font-bold hover:scale-105 transition-transform shadow-lg shadow-[var(--secondary)]/20">
          Generate Report <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {globalStats.map((stat, index) => (
          <div
            key={index}
            className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2rem] hover:shadow-xl hover:shadow-[var(--secondary)]/5 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}
              >
                <stat.icon size={24} strokeWidth={2.5} />
              </div>
              <div
                className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${
                  stat.isUp
                    ? "text-green-600 bg-green-500/10"
                    : "text-red-600 bg-red-500/10"
                }`}
              >
                {stat.isUp ? (
                  <TrendingUp size={12} />
                ) : (
                  <TrendingDown size={12} />
                )}
                {stat.trend}
              </div>
            </div>
            <p className="text-[var(--text-secondary)] text-[11px] font-bold uppercase tracking-wider mb-1">
              {stat.title}
            </p>
            <h3 className="text-2xl font-black text-[var(--text-primary)]">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Graph & New Requests Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h3 className="font-black text-xl flex items-center gap-3 italic text-[var(--text-primary)]">
              <span className="w-1.5 h-7 bg-[var(--secondary)] rounded-full"></span>
              Platform Sales Growth
            </h3>

            <div className="flex items-center gap-2 bg-[var(--surface-hover)] p-1.5 rounded-2xl border border-[var(--border)]">
              <Calendar
                size={14}
                className="ml-2 text-[var(--text-secondary)]"
              />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent text-xs font-black text-[var(--text-primary)] outline-none pr-2 cursor-pointer"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="1y">Last 1 Year</option>
              </select>
            </div>
          </div>

          <AdminGraph range={timeRange} />
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] p-8 shadow-sm flex flex-col">
          <h3 className="font-black text-lg mb-8 flex items-center gap-3 italic text-orange-500">
            <UserPlus size={22} />
            New Requests
          </h3>

          <div className="space-y-4 flex-1">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group flex items-center justify-between p-4 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] hover:border-[var(--secondary)]/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center font-black text-[var(--secondary)] border border-[var(--secondary)]/20">
                    S
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">
                      Seller Request
                    </p>
                    <p className="text-[10px] text-[var(--text-secondary)] font-medium">
                      2 minutes ago
                    </p>
                  </div>
                </div>
                <button className="text-xs font-black text-[var(--secondary)] hover:opacity-70 transition-colors px-3 py-1.5 hover:bg-[var(--secondary)]/5 rounded-lg">
                  Review
                </button>
              </div>
            ))}
          </div>

          <button className="mt-8 px-6 py-4 bg-[var(--secondary)] text-white rounded-2xl text-xs font-black hover:scale-[1.02] transition-all shadow-xl shadow-[var(--secondary)]/20">
            View All Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
