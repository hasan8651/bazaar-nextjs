"use client";

import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, Package, Heart, Truck, ArrowRight, 
  CheckCircle2, Gift, Zap, Loader2, ShoppingCart, Info
} from "lucide-react";
import { useSession } from "next-auth/react";
import axiosInstance from "@/lib/axiosInstance";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import DashboardGraph from "@/components/Dashboard/UserGraph";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "@/app/loading";

//static graph
const STATIC_ANALYTICS = [
  { name: "Jan", value: 400 }, { name: "Feb", value: 800 },
  { name: "Mar", value: 600 }, { name: "Apr", value: 1200 },
  { name: "May", value: 900 }, { name: "Jun", value: 1500 },
];

export default function UserDashboard() {
  const { data: session } = useSession();
  console.log("Current Session User:", session?.user);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1.stats and order apis call
        const [statsRes, ordersRes] = await Promise.all([
          axiosInstance.get("/user-dashboard/stats"),
          axiosInstance.get("/user-dashboard/orders")
        ]);

        if (statsRes.data.success) setStats(statsRes.data.stats);
        if (ordersRes.data.success) setOrders(ordersRes.data.data.slice(0, 5)); //last 5 data
      } catch (error) {
        console.error("Dashboard Data Error:", error);
        toast.error("Failed to sync your dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchDashboardData();
  }, [session]);

  const userName = session?.user?.name?.split(" ")[0] || "User";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  if (loading) return (
   <Loading></Loading>
  );

  return (
    <div className="space-y-10 pb-10 max-w-[1400px] mx-auto">
      <Toaster />

   {/* 1. Compact & Dynamic Welcome Banner */}
<div className="relative overflow-hidden rounded-[2rem] bg-[var(--surface)] border border-[var(--border)] p-6 md:p-8 shadow-sm group">
  
  <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--secondary)] opacity-[0.05] rounded-full blur-[80px] -mr-20 -mt-20 transition-opacity duration-700 group-hover:opacity-[0.1]" />

  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
    
    {/* Left Side: Greeting */}
    <div className="space-y-1">
      <div className="flex items-center gap-2 mb-2">
         <span className="flex h-2 w-2 rounded-full bg-[var(--secondary)] animate-pulse" />
         <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">Dashboard / Home</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] tracking-tight">
        {greeting}, <span className="text-[var(--secondary)]">{session?.user?.name || userName}</span>
      </h1>
      <p className="text-[var(--text-secondary)] text-xs font-bold opacity-70">
        You have <span className="text-[var(--text-primary)]">{stats?.orders?.pendingOrders || 0} pending shipments</span> to process today.
      </p>
    </div>

    {/* Right Side: Dynamic Status from API */}
    <div className="flex items-center gap-4">
       <div className="hidden sm:flex flex-col items-end text-right border-r border-[var(--border)] pr-4">
          <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-wider opacity-50">Member Status</span>
          
          {/* Dynamic Logic: Role + Verification check */}
          <span className={`text-xs font-black uppercase tracking-tighter ${session?.user?.isVerified ? 'text-[#00A99D]' : 'text-amber-500'}`}>
            {session?.user?.isVerified ? 'Verified' : 'Pending'} {session?.user?.role || 'User'}
          </span>
       </div>
       
       <div className="p-3 bg-[var(--secondary)]/10 rounded-2xl border border-[var(--secondary)]/20 text-[var(--secondary)] group-hover:scale-110 transition-transform">
          <ShoppingBag size={20} />
       </div>
    </div>
  </div>
</div>

      {/* 2. Metrics Grid (API Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Spent" 
          value={`৳${stats?.orders?.totalSpent?.toLocaleString() || 0}`} 
          subtitle="Lifetime spending" 
          icon={ShoppingBag} 
        />
        <DashboardCard 
          title="My Orders" 
          value={stats?.orders?.totalOrders || 0} 
          subtitle="Completed purchases" 
          icon={Package} 
        />
        <DashboardCard 
          title="Wishlist" 
          value={stats?.wishlistCount || 0} 
          subtitle="Items saved for later" 
          icon={Heart} 
        />
        <DashboardCard 
          title="Active Cart" 
          value={stats?.cartCount || 0} 
          subtitle="Items in your bag" 
          icon={ShoppingCart} 
        />
      </div>

      {/* 3. Analytics Graph */}
      <div className="w-full">
        <DashboardGraph title="Purchase Behavior" subtitle="Visual breakdown of your monthly activity" data={STATIC_ANALYTICS} />
      </div>

      {/* 4. Recent Orders (API Data) */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="p-8 border-b border-[var(--border)] flex justify-between items-center">
          <div>
            <h3 className="font-black text-[var(--text-primary)] text-xl">Recent Activity</h3>
            <p className="text-xs text-[var(--text-secondary)] font-medium">Track your most recent transactions</p>
          </div>
          <button className="px-5 py-2.5 bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs font-black rounded-xl hover:bg-[var(--secondary)] transition-all hover:text-white flex items-center gap-2">
            View History <ArrowRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--background)]/50 text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-widest text-left">
              <tr>
                <th className="px-8 py-5">Order Reference</th>
                <th className="px-8 py-5">Product Details</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {orders.length > 0 ? orders.map((order) => (
                <tr key={order._id} className="hover:bg-[var(--secondary)]/[0.02] transition-colors group">
                  <td className="px-8 py-5 text-sm font-bold text-[var(--text-primary)] opacity-70">#{order._id.slice(-8).toUpperCase()}</td>
                  <td className="px-8 py-5">
                    <div className="text-sm font-bold text-[var(--text-primary)] truncate max-w-[200px]">
                      {order.products[0]?.name}
                      {order.products.length > 1 && <span className="text-[var(--secondary)] ml-1">+{order.products.length - 1} more</span>}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-[var(--text-secondary)] font-medium">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${
                      order.orderStatus === 'delivered' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {order.orderStatus === 'delivered' && <CheckCircle2 size={12} />}
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right text-sm font-black text-[var(--text-primary)]">৳{order.total.toLocaleString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-30">
                      <ShoppingBag size={48} />
                      <p className="font-bold">No orders found in your history</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Promotional Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ActionCard title="Summer Sale" desc="Extra 15% discount applied automatically at checkout." icon={Zap} color="bg-[var(--secondary)]" isDark={true} />
        <ActionCard title="Invite & Earn" desc="Get credits for every friend who joins the PrimeMart community." icon={Gift} color="bg-[var(--surface)]" isDark={false} />
      </div>
    </div>
  );
}

// Reusable Action Card for the bottom section
const ActionCard = ({ title, desc, icon: Icon, color, isDark }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300 }}
    className={`relative overflow-hidden p-8 md:p-10 rounded-[2.8rem] shadow-xl group cursor-pointer border ${
      isDark 
        ? 'bg-gradient-to-br from-[var(--secondary)] to-[#5c4cf4] border-transparent' 
        : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--secondary)]/30'
    }`}
  >
    {/* Background Abstract Shapes (Animate on Hover) */}
    <div className={`absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-[80px] transition-all duration-700 group-hover:scale-150 group-hover:opacity-40 ${
      isDark ? 'bg-white/20' : 'bg-[var(--secondary)]/10'
    }`} />
    
    <div className="relative z-10">
      {/* Icon Badge */}
      <div className={`inline-flex p-4 rounded-2xl mb-6 transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110 ${
        isDark ? 'bg-white/10 text-white shadow-inner' : 'bg-[var(--secondary)]/10 text-[var(--secondary)]'
      }`}>
        <Icon size={28} strokeWidth={2.5} />
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-black uppercase tracking-[0.25em] ${
            isDark ? 'text-white/60' : 'text-[var(--text-secondary)]/60'
          }`}>
            Exclusive Priority
          </span>
          <div className={`h-[1px] w-8 ${isDark ? 'bg-white/20' : 'bg-[var(--border)]'}`} />
        </div>
        
        <h4 className={`text-2xl md:text-3xl font-black leading-none ${
          isDark ? 'text-white' : 'text-[var(--text-primary)]'
        }`}>
          {title}
        </h4>
        
        <p className={`text-sm md:text-base font-medium leading-relaxed max-w-[280px] ${
          isDark ? 'text-white/80' : 'text-[var(--text-secondary)]'
        }`}>
          {desc}
        </p>
      </div>

      {/* Modern Button with Arrow Hover */}
      <button className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
        isDark 
          ? 'bg-white text-[var(--secondary)] hover:shadow-white/20 hover:-translate-y-1' 
          : 'bg-[var(--secondary)] text-white hover:shadow-[var(--secondary)]/30 hover:-translate-y-1'
      }`}>
        Claim Offer
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
      </button>
    </div>

    {/* Decorative Floating Icon (Background) */}
    <Icon 
      size={180} 
      className={`absolute -right-10 -top-10 transition-all duration-1000 opacity-[0.03] group-hover:opacity-[0.08] group-hover:rotate-12 group-hover:scale-110 ${
        isDark ? 'text-white' : 'text-[var(--secondary)]'
      }`} 
    />
  </motion.div>
);
