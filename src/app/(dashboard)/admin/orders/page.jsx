"use client";

import React, { useEffect, useState } from "react";
import { Eye, Edit3, Trash2, Filter, ShoppingBag, Loader2, PackageOpen } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import Loading from "@/app/loading";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/admin/all-orders");
        if (response.data.success) {
          setOrders(response.data.data);
          setFilteredOrders(response.data.data); 
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // --- search logic ---
  useEffect(() => {
    const results = orders.filter(order =>
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(results);
  }, [searchTerm, orders]);

  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "pending": return "bg-amber-100 text-amber-700 border border-amber-200";
      case "cancelled": return "bg-rose-100 text-rose-700 border border-rose-200";
      default: return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  if (loading) return (
   <Loading></Loading>
  );

  return (
    <div className="p-4 md:p-10 space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-3">
          <ShoppingBag className="text-[#00A99D]" /> All Orders
        </h1>
        <p className="text-sm text-[var(--text-secondary)] font-bold opacity-80">
          Total {filteredOrders.length} orders found.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by Email, Order ID, or Status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-4 rounded-2xl bg-[var(--border)]/10 border border-[var(--border)] font-bold text-sm focus:outline-none focus:border-[#00A99D] transition-all"
        />
        <button className="px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all bg-[#00A99D] text-white hover:bg-[#137f7f] shadow-lg shadow-[#00A99D]/20">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Orders Table or Empty Message */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-sm">
        {filteredOrders.length === 0 ? (
          // --- Empty State Message ---
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
              <PackageOpen size={60} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-black text-[var(--text-primary)] mb-2">No Orders Found</h2>
            <p className="text-[var(--text-secondary)] font-medium max-w-sm">
              It looks like there are no orders matching your criteria right now. Check back later or try a different search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto custom-sidebar-scroll">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-[var(--border)]">
                  {["Order ID", "Customer Email", "Date", "Total Amount", "Status", "Actions"].map((head) => (
                    <th key={head} className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-slate-500">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-all group">
                    <td className="px-8 py-5 font-black text-[#00A99D]">#{order._id.slice(-6).toUpperCase()}</td>
                    <td className="px-8 py-5 font-bold text-[var(--text-primary)]">{order.email}</td>
                    <td className="px-8 py-5 font-bold text-[var(--text-secondary)] text-xs">
                      {new Date(order.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-8 py-5 font-black text-[var(--text-primary)]">৳{order.total}</td>
                    <td className="px-8 py-5">
                      <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusClasses(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2.5 text-slate-400 hover:text-[#00A99D] transition-all"><Eye size={18}/></button>
                        <button className="p-2.5 text-slate-400 hover:text-blue-500 transition-all"><Edit3 size={18}/></button>
                        <button className="p-2.5 text-slate-400 hover:text-rose-500 transition-all"><Trash2 size={18}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;