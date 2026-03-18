"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axiosInstance from "@/lib/axiosInstance";
import { Package, Search, Filter, ExternalLink, Loader2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

const MyOrdersPage = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Using the API endpoint from your documentation
        const res = await axiosInstance.get("/user-dashboard/orders");
        if (res.data.success) {
          setOrders(res.data.data);
        }
      } catch (error) {
        console.error("Order Fetch Error:", error);
        toast.error("Failed to load your orders");
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchOrders();
  }, [session]);

  // Filter functionality for Search Bar
  const filteredOrders = orders.filter(order => 
    order._id.toLowerCase().includes(search.toLowerCase()) ||
    order.products.some(p => p.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-10 min-h-screen">
      <Toaster />
      
      {/* --- Page Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">My Orders</h1>
          <p className="text-[var(--text-secondary)] font-medium mt-1">
            Track your recent shipments and purchase history.
          </p>
        </div>
        
        {/* --- Premium Search Bar --- */}
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--secondary)] transition-colors" size={18} />
            <input 
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID or Product..." 
              className="pl-12 pr-6 py-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] w-full md:w-80 outline-none focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10 font-bold text-sm text-[var(--text-primary)] transition-all shadow-sm"
            />
          </div>
          <button className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-[var(--text-secondary)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* --- Orders List Logic --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 gap-4">
          <Loader2 className="animate-spin text-[var(--secondary)]" size={40}/>
          <p className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] animate-pulse">Fetching Orders...</p>
        </div>
      ) : (
        <div className="grid gap-5">
          <AnimatePresence>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.005 }}
                  key={order._id} 
                  className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-xl transition-all group"
                >
                  {/* Product Details Section */}
                  <div className="flex items-center gap-5">
                    <div className="p-5 bg-[var(--background)] rounded-2xl text-[var(--secondary)] border border-[var(--border)] group-hover:bg-[var(--secondary)] group-hover:text-white transition-colors">
                      <Package size={28} />
                    </div>
                    <div>
                      <p className="font-black text-lg text-[var(--text-primary)]">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <div className="flex flex-col">
                         <span className="text-sm font-bold text-[var(--text-secondary)] truncate max-w-[200px]">
                           {order.products[0]?.name} {order.products.length > 1 && `+${order.products.length - 1} more`}
                         </span>
                         <span className="text-[10px] font-black text-[var(--text-secondary)]/50 uppercase tracking-tighter">
                           Ordered on: {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                         </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pricing & Status Section */}
                  <div className="flex items-center justify-between md:justify-center gap-12 border-y md:border-y-0 border-[var(--border)] py-4 md:py-0">
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-widest mb-1">Total Paid</p>
                      <p className="font-black text-xl text-[var(--text-primary)]">৳{order.total?.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase text-[var(--text-secondary)] tracking-widest mb-1">Status</p>
                      <StatusBadge status={order.orderStatus} />
                    </div>
                  </div>

                  {/* Actions Section */}
                  <button className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[var(--secondary)] hover:text-white transition-all shadow-sm active:scale-95">
                    View Details <ExternalLink size={14} />
                  </button>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-24 bg-[var(--surface)] rounded-[3rem] border border-dashed border-[var(--border)]"
              >
                <div className="flex flex-col items-center gap-4 opacity-30">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="font-black text-xl text-[var(--text-secondary)]">No orders found.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

// --- Modern Dynamic Status Badge ---
const StatusBadge = ({ status }) => {
  const formattedStatus = status?.toLowerCase() || "pending";
  
  const styles = {
    delivered: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    pending: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    processing: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    cancelled: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    shipped: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  };
  
  return (
    <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[formattedStatus] || styles.pending}`}>
      {formattedStatus}
    </span>
  );
};

export default MyOrdersPage;