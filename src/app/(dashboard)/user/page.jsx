// src/app/(dashboard)/user/page.jsx
"use client";

import React from "react";
import {
  ShoppingBag,
  Package,
  Heart,
  Truck,
  ArrowRight,
  CheckCircle2,
  Gift,
  Zap,
} from "lucide-react";
import { useSession } from "next-auth/react";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import DashboardGraph from "@/components/Dashboard/DashboardGraph";

// Mock Data for the graph
const ANALYTICS_DATA = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 800 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 1200 },
  { name: "May", value: 900 },
  { name: "Jun", value: 1500 },
  { name: "Jul", value: 1300 },
];

// Mock Data for orders
const RECENT_ORDERS = [
  {
    id: "#PM-9821",
    product: "Apple iPhone 15 Pro",
    date: "Feb 24, 2026",
    status: "Delivered",
    amount: "$1,299.00",
  },
  {
    id: "#PM-9825",
    product: "Sony WH-1000XM5",
    date: "Feb 28, 2026",
    status: "Processing",
    amount: "$349.50",
  },
  {
    id: "#PM-9829",
    product: "Nike Air Jordan 1",
    date: "Mar 01, 2026",
    status: "Pending",
    amount: "$170.00",
  },
];

export default function UserDashboard() {
  const { data: session, status } = useSession();

  // Logic for Greeting
  const fullName = session?.user?.name || "User";
  const userName = fullName.split(" ")[0];

  const hour = new Date().getHours();
  let greeting = "Good morning";
  if (hour >= 12 && hour < 17) greeting = "Good afternoon";
  if (hour >= 17) greeting = "Good evening";

  // Loading State
  if (status === "loading") {
    return (
      <div className="h-[60vh] w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--secondary)]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      {/* 1. Ultra-Clean Premium Welcome Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--surface)] border border-[var(--border)] p-8 md:p-14 shadow-sm">
  {/* Subtle Background Glow */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--secondary)] opacity-[0.03] rounded-full blur-[100px] -mr-20 -mt-20"></div>

  <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
    {/* Minimalist Avatar */}
    <div className="shrink-0">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-gradient-to-tr from-[var(--secondary)] to-[var(--secondary)]/30 p-[2px]">
        <div className="w-full h-full rounded-[2.3rem] bg-[var(--surface)] p-1">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={userName}
              className="w-full h-full object-cover rounded-[2rem]"
            />
          ) : (
            <div className="w-full h-full rounded-[2rem] bg-[var(--secondary)]/5 flex items-center justify-center">
              <span className="text-4xl font-black text-[var(--secondary)]">
                {userName.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Simple & Bold Greeting + Branding */}
    <div className="text-center md:text-left">
      {/* --- PrimeMart Brand Badge --- */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--secondary)]/5 border border-[var(--secondary)]/10 mb-4 group cursor-default transition-all duration-300 hover:bg-[var(--secondary)]/10">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)] animate-pulse"></div>
        <span className="text-[10px] font-bold text-[var(--secondary)] uppercase tracking-[0.2em]">
          Prime<span className="text-[var(--text-primary)] opacity-70">Mart</span> Official
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
        {greeting}, <br className="hidden md:block" />
        <span className="text-[var(--secondary)]">{userName}</span>
      </h1>
      
      <p className="text-[var(--text-secondary)] text-lg md:text-xl mt-4 font-medium opacity-70 max-w-xl">
        It’s good to have you back at <span className="relative inline-block font-bold text-[var(--text-primary)] group">
          PrimeMart
          {/* Underline Glow Effect */}
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--secondary)] to-transparent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
        </span>. 
        Here’s what’s happening today.
      </p>
    </div>
  </div>
</div>

      {/* 2. Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Expenditure"
          value="$4,250.00"
          subtitle="Lifetime spending"
          icon={ShoppingBag}
          trend="12.5%"
          trendType="up"
        />
        <DashboardCard
          title="Total Orders"
          value="156"
          subtitle="Completed purchases"
          icon={Package}
          trend="8%"
          trendType="up"
        />
        <DashboardCard
          title="Wishlist"
          value="42"
          subtitle="Saved items"
          icon={Heart}
          trend="5%"
          trendType="down"
        />
        <DashboardCard
          title="In Transit"
          value="03"
          subtitle="Active deliveries"
          icon={Truck}
        />
      </div>

      {/* 3. Analytics Graph Section */}
      <div className="w-full">
        <DashboardGraph
          title="Spending Analytics"
          subtitle="Monthly breakdown of your purchase history"
          data={ANALYTICS_DATA}
        />
      </div>

      {/* 4. Recent Orders Table */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2rem] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--border)] flex justify-between items-center">
          <h3 className="font-bold text-[var(--text-primary)] text-lg">
            Recent Orders
          </h3>
          <button className="text-[var(--secondary)] text-sm font-semibold flex items-center gap-1 hover:translate-x-1 transition-transform">
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--background)]/50 text-[var(--text-secondary)] text-xs uppercase tracking-wider text-left">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {RECENT_ORDERS.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-[var(--secondary)]/5 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4 text-sm font-medium text-[var(--text-primary)]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-secondary)] font-medium">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                    {order.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                        order.status === "Delivered"
                          ? "bg-green-500/10 text-green-500"
                          : order.status === "Pending"
                            ? "bg-amber-500/10 text-amber-500"
                            : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      {order.status === "Delivered" && (
                        <CheckCircle2 size={12} />
                      )}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-[var(--text-primary)]">
                    {order.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Action Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Promotion Card */}
        <div className="relative overflow-hidden group p-8 rounded-[2rem] bg-[var(--secondary)] text-white shadow-lg shadow-[var(--secondary)]/20">
          {/* Background Decorative Shapes */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white opacity-10 rounded-full scale-150 group-hover:scale-125 transition-transform duration-700"></div>
          <div className="absolute -right-5 -top-5 w-24 h-24 bg-white opacity-5 rounded-full blur-xl group-hover:opacity-10 transition-all duration-700"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={20} className="fill-white" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">
                Promotions
              </span>
            </div>
            <h4 className="text-2xl font-black mb-2">Premium Discount</h4>
            <p className="text-sm opacity-90 mb-6 max-w-[250px] leading-relaxed">
              Extra 10% off on all items this weekend just for you.
            </p>
            <button className="px-6 py-3 bg-white text-[var(--secondary)] rounded-xl text-xs font-bold hover:scale-105 transition-transform shadow-md">
              Claim Now
            </button>
          </div>
        </div>

        {/* Referral Card */}
        <div className="relative overflow-hidden group p-8 rounded-[2rem] bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] shadow-sm hover:border-[var(--secondary)]/30 transition-all duration-300">
          {/* Background Decorative Shapes */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-[var(--secondary)] opacity-[0.03] rounded-full scale-150 group-hover:scale-125 transition-transform duration-700"></div>
          <Gift
            size={140}
            className="absolute -right-10 -bottom-10 text-[var(--secondary)] opacity-[0.03] -rotate-12 group-hover:rotate-0 transition-all duration-700"
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Gift size={20} className="text-[var(--secondary)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                Referrals
              </span>
            </div>
            <h4 className="text-2xl font-black mb-2">Earn Rewards</h4>
            <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-[250px] leading-relaxed">
              Invite your friends and get $50 for each successful referral.
            </p>
            <button className="px-6 py-3 bg-[var(--secondary)] text-white rounded-xl text-xs font-bold hover:scale-105 transition-transform shadow-lg shadow-[var(--secondary)]/20">
              Invite Friends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
