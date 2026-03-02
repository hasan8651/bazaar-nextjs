"use client";

import React from "react";
import { DollarSign, Package, ShoppingCart, Plus, Clock,  } from "lucide-react";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import SellerStatsGraph from "@/components/Dashboard/SellerStatsGraph";

export default function SellerDashboard() {
  return (
    <div className="space-y-8">
      
      {/* Simple Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[var(--surface)] p-6 rounded-3xl border border-[var(--border)] shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[var(--text-primary)]">Store Dashboard</h1>
          <p className="text-sm text-[var(--text-secondary)] font-medium opacity-70">
            Welcome back! Here is what's happening with your shop today.
          </p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-green-600/20">
          <Plus size={18} strokeWidth={3} />
          Add New Product
        </button>
      </div>

      {/* Essential Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Earnings" 
          value="$8,450.00" 
          icon={DollarSign} 
          trend="12%" 
          trendType="up" 
        />
        <DashboardCard 
          title="Active Orders" 
          value="24" 
          icon={ShoppingCart} 
          trend="5%" 
          trendType="up" 
        />
        <DashboardCard 
          title="Total Products" 
          value="18" 
          icon={Package} 
        />
        <DashboardCard 
          title="Pending Order" 
          value="15" 
          icon={Clock} 
        />
      </div>

      {/* Main Analytics Graph */}
      <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2rem] shadow-sm">
        <SellerStatsGraph />
      </div>

    </div>
  );
}