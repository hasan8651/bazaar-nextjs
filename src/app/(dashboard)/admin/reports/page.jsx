"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Clock, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

const Reports = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get("/admin/all-orders");
        if (response.data.success) {
          setOrders(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // --- Calculations based on API data ---
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.orderStatus?.toLowerCase() === "pending").length;

  const stats = [
    { 
      title: "Total Revenue", 
      value: `৳${totalRevenue.toLocaleString()}`, 
      desc: "Based on all orders", 
      icon: DollarSign, 
      color: "text-emerald-400" 
    },
    { 
      title: "Total Orders", 
      value: totalOrders.toString(), 
      desc: "Lifetime transactions", 
      icon: ShoppingBag, 
      color: "text-blue-400" 
    },
    { 
      title: "Pending Orders", 
      value: pendingOrders.toString(), 
      desc: "Awaiting fulfillment", 
      icon: Clock, 
      color: "text-amber-400" 
    },
  ];

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[var(--background)]">
      <Loader2 className="animate-spin text-[#00A99D]" size={40} />
    </div>
  );

  return (
    <div className="p-4 md:p-10 space-y-8 min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[var(--text-primary)]">Dashboard Overview</h1>
        <p className="text-sm font-bold text-[var(--text-secondary)] mt-1">Real-time platform performance metrics.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="group bg-[var(--surface)] border border-[var(--border)] p-8 rounded-[2.5rem] transition-all duration-300 hover:border-[#00A99D] hover:-translate-y-2 shadow-sm hover:shadow-xl"
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

     {/* Recent Orders Table */}
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-sm">
  <div className="p-8 border-b border-[var(--border)] flex justify-between items-center">
    <h3 className="font-black text-lg text-[var(--text-primary)]">Recent Activity</h3>
    <span className="text-[10px] font-black text-[#00A99D] uppercase bg-[#00A99D]/10 px-3 py-1 rounded-lg tracking-widest">
      {orders.length > 0 ? "Live Data" : "No Records"}
    </span>
  </div>

  <div className="overflow-x-auto">
    {orders.length === 0 ? (
      // --- Empty State Message when Table is Empty ---
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="p-6 bg-[var(--background)] rounded-full mb-4 shadow-inner">
          <ShoppingBag size={48} className="text-slate-300 dark:text-slate-700" />
        </div>
        <h4 className="text-xl font-black text-[var(--text-primary)]">No Orders Yet</h4>
        <p className="text-xs font-bold text-[var(--text-secondary)] mt-2 max-w-[250px] opacity-60">
          We couldn't find any recent orders in the database. New orders will appear here automatically.
        </p>
      </div>
    ) : (
      // --- If orders exist, show the table ---
      <table className="w-full text-left">
        <thead className="bg-[var(--border)]/20 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">
          <tr>
            <th className="px-8 py-5">Order ID</th>
            <th className="px-8 py-5">Customer Email</th>
            <th className="px-8 py-5">Amount</th>
            <th className="px-8 py-5">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {orders.slice(0, 5).map((order) => (
            <tr key={order._id} className="hover:bg-[var(--background)] transition-all group">
              <td className="px-8 py-6 font-black text-[#00A99D]">
                #{order._id.slice(-6).toUpperCase()}
              </td>
              <td className="px-8 py-6 font-bold text-[var(--text-secondary)]">
                {order.email}
              </td>
              <td className="px-8 py-6 font-black text-[var(--text-primary)]">
                ৳{order.total}
              </td>
              <td className="px-8 py-6">
                <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase ${
                  order.orderStatus === 'delivered' ? 'bg-green-500/10 text-green-500' : 
                  order.orderStatus === 'pending' ? 'bg-amber-500/10 text-amber-500' : 
                  'bg-rose-500/10 text-rose-500'
                }`}>
                  {order.orderStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>
    </div>
  );
};

export default Reports;