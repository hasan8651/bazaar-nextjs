"use client";

import React, { useState, useEffect } from "react";
import {
  Users, Store, ShoppingBag, DollarSign, 
  UserPlus, ArrowUpRight, Calendar,
  LayoutDashboard, FileText, CheckCircle, 
  XCircle, Clock, Activity, Eye, 
  MapPin, Phone, Mail, ShieldCheck, FileSearch
} from "lucide-react";
import jsPDF from "jspdf";
import toast, { Toaster } from "react-hot-toast";

// Components
import DashboardCard from "@/components/Dashboard/DashboardCard"; 
import AdminGraph from "@/components/Dashboard/Admin-dashboard-graphs/AdminGraph";
import OrdersOverviewGraph from "@/components/Dashboard/Admin-dashboard-graphs/OrdersOverviewGraph";
import UsersGrowthGraph from "@/components/Dashboard/Admin-dashboard-graphs/UsersGrowthGraph";
import SellersGrowthGraph from "@/components/Dashboard/Admin-dashboard-graphs/SellersGrowthGraph";

// Libs
import axiosInstance from "@/lib/axiosInstance";
import Loading from "@/app/loading";

const AdminPage = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeller, setSelectedSeller] = useState(null); 
  
  
  const [pendingSellers, setPendingSellers] = useState([
    { 
      id: "1", name: "Sabbir Ahmed", shopName: "Tech Gadgets BD", email: "sabbir@tech.com", 
      time: "2h ago", phone: "+880 1712-345678", nid: "1234567890", license: "TR-5566", address: "Dhaka, BD" 
    },
    { 
      id: "2", name: "Rahat Kabir", shopName: "Organic Food Store", email: "rahat@shop.com", 
      time: "5h ago", phone: "+880 1812-999000", nid: "9876543210", license: "TR-1122", address: "Mymensingh, BD" 
    },
    { 
      id: "3", name: "Anika Tabassum", shopName: "Fashion Hub", email: "anika@fashion.com", 
      time: "12h ago", phone: "+880 1912-444555", nid: "5544332211", license: "TR-8899", address: "Dhanbari, BD" 
    },
  ]);

  // fetch data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/admin/stats");
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error("Stats fetch error:", err);
        setStats({
          orders: { totalRevenue: 128430, pendingOrders: 23 },
          users: 1245,
          sellers: 84
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // PDF report generate
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("PrimeMart Admin Report", 20, 20);
    doc.setFontSize(10);
    doc.text(`Report Date: ${new Date().toLocaleString()}`, 20, 30);
    doc.line(20, 35, 190, 35);
    
    doc.text(`Total Revenue: ${stats?.orders?.totalRevenue || 0} BDT`, 20, 50);
    doc.text(`Total Users: ${stats?.users || 0}`, 20, 60);
    doc.text(`Total Sellers: ${stats?.sellers || 0}`, 20, 70);
    
    doc.save(`PrimeMart_Report_${Date.now()}.pdf`);
    toast.success("PDF Downloaded!");
  };

  // seller approve handler
  const handleApprove = (id) => {
    setPendingSellers(prev => prev.filter(s => s.id !== id));
    setSelectedSeller(null);
    toast.success("Seller Approved Successfully!");
  };

  // seller rejects handler
  const handleReject = (id) => {
    if(confirm("Are you sure?")) {
      setPendingSellers(prev => prev.filter(s => s.id !== id));
      setSelectedSeller(null);
      toast.error("Seller request removed.");
    }
  };

  if (loading) return (
    <Loading></Loading>
  );

  return (
    <div className="space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <Toaster />

      {/* --- header section --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-(--surface) p-8 md:p-10 rounded-[3rem] border border-(--border) shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-(--secondary) opacity-[0.02] rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000"></div>
        
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-(--secondary) font-black text-[10px] uppercase tracking-[0.3em]">
            <Activity size={14} /> System Status: Online
          </div>
          <h1 className="text-4xl font-black text-(--text-primary) tracking-tighter italic">
            Global <span className="text-(--secondary)">Dashboard</span>
          </h1>
          <p className="text-sm text-(--text-secondary) font-medium opacity-80">
            Welcome back, Admin. Monitoring <span className="text-(--secondary) font-bold">PrimeMart</span> ecosystem.
          </p>
        </div>

        <button 
          onClick={generatePDF}
          className="group flex items-center justify-center gap-3 px-10 py-5 bg-(--secondary) text-white rounded-[1.5rem] text-xs font-black tracking-widest hover:shadow-2xl hover:shadow-(--secondary)/40 hover:-translate-y-1 transition-all duration-500 relative z-10"
        >
          <FileText size={18} className="group-hover:rotate-12 transition-transform" />
          GENERATE REPORT
        </button>
      </div>

      {/* --- status cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Revenue" value={`৳${stats?.orders?.totalRevenue?.toLocaleString()}`} subtitle="Net income flow" icon={DollarSign} />
        <DashboardCard title="Active Customers" value={stats?.users?.toLocaleString()} subtitle="Registered buyers" icon={Users} />
        <DashboardCard title="Verified Sellers" value={stats?.sellers?.toLocaleString()} subtitle="Active store owners" icon={Store} />
        <DashboardCard title="Pending Orders" value={stats?.orders?.pendingOrders || 0} subtitle="Orders in queue" icon={ShoppingBag} />
      </div>

      {/* --- main graph --- */}
      <div className="bg-(--surface) border border-(--border) rounded-[3rem] p-8 md:p-12 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <h3 className="font-black text-2xl flex items-center gap-4 text-(--text-primary)">
            <div className="w-2.5 h-10 bg-(--secondary) rounded-full shadow-[0_0_20px_rgba(var(--secondary-rgb),0.4)]"></div>
            Platform Revenue Growth
          </h3>
          <div className="flex items-center gap-2 bg-(--surface-hover) px-5 py-2.5 rounded-2xl border border-(--border)">
            <Calendar size={14} className="text-(--text-secondary)" />
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="bg-transparent text-[10px] font-black uppercase tracking-widest text-(--text-primary) outline-none cursor-pointer">
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="1y">Last 1 Year</option>
            </select>
          </div>
        </div>
        <div className="w-full">
            <AdminGraph range={timeRange} />
        </div>
      </div>

      {/* --- 3  graphs --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-(--surface) border border-(--border) rounded-[2.5rem] p-8 hover:shadow-lg transition-all">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-(--text-secondary) mb-8 italic">Order Volume</h4>
          <OrdersOverviewGraph range={timeRange} />
        </div>
        <div className="bg-(--surface) border border-(--border) rounded-[2.5rem] p-8 hover:shadow-lg transition-all">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-(--text-secondary) mb-8 italic">New User Growth</h4>
          <UsersGrowthGraph />
        </div>
        <div className="bg-(--surface) border border-(--border) rounded-[2.5rem] p-8 hover:shadow-lg transition-all">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-(--text-secondary) mb-8 italic">Seller Expansion</h4>
          <SellersGrowthGraph />
        </div>
      </div>

      {/* --- seller approval section (Updated Subtle Theme) --- */}
      <div className="bg-(--surface) border border-(--border) rounded-[3.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden group transition-all duration-500 hover:border-(--secondary)/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-(--secondary) opacity-[0.02] rounded-full -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-1000"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div className="space-y-1">
              <h3 className="font-black text-3xl text-(--text-primary) flex items-center gap-4">
                <UserPlus size={36} className="text-(--secondary)" /> 
                Seller <span className="text-(--secondary)">Authorization</span>
              </h3>
              <p className="text-xs text-(--text-secondary) font-bold mt-2 opacity-60 uppercase tracking-[0.2em] italic">Verification queue for new partner stores</p>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-(--secondary)/5 rounded-2xl border border-(--secondary)/10">
              <span className="w-2 h-2 bg-(--secondary) rounded-full animate-pulse shadow-[0_0_8px_var(--secondary)]"></span>
              <span className="text-[10px] font-black text-(--text-primary) uppercase tracking-widest">{pendingSellers.length} Requests Pending</span>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            {pendingSellers.map((seller) => (
              <div key={seller.id} className="group p-7 rounded-[2.5rem] bg-(--surface-hover) border border-(--border) hover:border-(--secondary)/40 transition-all duration-500 shadow-sm hover:shadow-xl">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-(--surface) border border-(--border) flex items-center justify-center text-(--secondary) text-2xl font-black shadow-inner">
                      {seller.name[0]}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-(--text-primary) tracking-tight group-hover:text-(--secondary) transition-colors italic">{seller.name}</h4>
                      <p className="text-xs font-bold text-(--text-secondary) opacity-80 uppercase tracking-tighter">{seller.shopName}</p>
                      <div className="flex items-center gap-2 mt-1.5 opacity-50">
                         <Clock size={12} />
                         <span className="text-[10px] font-bold uppercase italic tracking-tighter">Applied {seller.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Detail Button  */}
                  <button 
                    onClick={() => setSelectedSeller(seller)}
                    className="w-full py-4 bg-(--background) border border-(--border) text-(--text-primary) rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-(--secondary) hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Eye size={16} /> Review Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- review modal pop up  --- */}
      {selectedSeller && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedSeller(null)}></div>
          <div className="relative w-full max-w-2xl bg-(--surface) border border-(--border) rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-8 md:p-12 space-y-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-(--secondary) flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-(--secondary)/20">{selectedSeller.name[0]}</div>
                  <div>
                    <h2 className="text-2xl font-black text-(--text-primary) italic tracking-tight">{selectedSeller.shopName}</h2>
                    <p className="text-(--secondary) font-bold text-xs uppercase tracking-[0.2em]">Verification File</p>
                  </div>
                </div>
                <button onClick={() => setSelectedSeller(null)} className="p-3 bg-(--surface-hover) rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all"><XCircle size={24} /></button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-(--surface-hover) p-8 rounded-[2rem] border border-(--border)">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-bold text-(--text-primary)"><ShieldCheck size={18} className="text-(--secondary)" /> NID: <span className="opacity-70 font-medium">{selectedSeller.nid}</span></div>
                  <div className="flex items-center gap-3 text-sm font-bold text-(--text-primary)"><FileSearch size={18} className="text-(--secondary)" /> License: <span className="opacity-70 font-medium">{selectedSeller.license}</span></div>
                  <div className="flex items-center gap-3 text-sm font-bold text-(--text-primary)"><Phone size={18} className="text-(--secondary)" /> Phone: <span className="opacity-70 font-medium">{selectedSeller.phone}</span></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-bold text-(--text-primary)"><Mail size={18} className="text-(--secondary)" /> Email: <span className="opacity-70 font-medium truncate">{selectedSeller.email}</span></div>
                  <div className="flex items-start gap-3 text-sm font-bold text-(--text-primary)"><MapPin size={18} className="text-(--secondary) mt-0.5" /> Address: <span className="opacity-70 font-medium truncate">{selectedSeller.address}</span></div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button onClick={() => handleApprove(selectedSeller.id)} className="flex-1 py-5 bg-(--secondary) text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-all">Activate Store</button>
                <button onClick={() => handleReject(selectedSeller.id)} className="px-8 py-5 border border-red-500/20 text-red-500 font-black rounded-2xl text-xs uppercase hover:bg-red-500 hover:text-white transition-all">Reject</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPage;