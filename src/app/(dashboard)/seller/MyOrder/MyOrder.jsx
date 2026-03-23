"use client";

import React, { useState } from "react";
import { Eye, Edit3, Trash2, Filter, ShoppingBag } from "lucide-react";

const MyOrder = ({ sellerOrder }) => {
    const [orders] = useState([
        { id: "#ORD-7721", customer: "Rahim Ahmed", total: 120.0, status: "Delivered", date: "12 Mar, 2026" },
        { id: "#ORD-7722", customer: "Karim Uddin", total: 85.5, status: "Processing", date: "12 Mar, 2026" },
        { id: "#ORD-7723", customer: "Sara Islam", total: 45.0, status: "Cancelled", date: "11 Mar, 2026" },
        { id: "#ORD-7724", customer: "Jamal Khan", total: 210.0, status: "Delivered", date: "10 Mar, 2026" },
        { id: "#ORD-7725", customer: "Nabila Rahman", total: 99.0, status: "Processing", date: "09 Mar, 2026" },
        { id: "#ORD-7726", customer: "Imran Hossain", total: 150.0, status: "Delivered", date: "08 Mar, 2026" },
        { id: "#ORD-7727", customer: "Fatema Khatun", total: 35.5, status: "Cancelled", date: "07 Mar, 2026" },
    ]);

    const getStatusClasses = (status) => {
        switch (status) {
            case "Delivered": return "bg-green-100 text-green-700";
            case "Processing": return "bg-blue-100 text-blue-700";
            case "Cancelled": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    console.log(sellerOrder.orders)

//    if (!sellerOrder.orders || sellerOrder.orders.length === 0) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
//                 <ShoppingBag size={48} className="text-gray-300" />
//                 <p className="text-xl font-bold text-[var(--text-secondary)]">No Orders Found</p>
//             </div>
//         );
//     }
   
        return (
            <div className="p-4 md:p-10 space-y-8 min-h-screen">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-3">
                        <ShoppingBag className="text-[#00A99D]" /> My Orders
                    </h1>
                    <p className="text-sm text-[var(--text-secondary)] font-bold opacity-80">
                        Manage my orders.
                    </p>
                </div>

                {/* Filter */}
                <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search by order ID"
                        className="flex-1 p-4 rounded-2xl bg-[var(--border)]/10 border border-[var(--border)] font-bold text-sm focus:outline-none focus:border-[#00A99D] placeholder:text-[var(--text-secondary)] dark:placeholder:text-[var(--text-secondary)]"
                    />
                    <button className="px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all bg-[#00A99D] text-white hover:bg-[#137f7f]">
                        <Filter size={18} /> Filters
                    </button>
                </div>

                {/* Orders Table */}
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto custom-sidebar-scroll">
                        <table className="w-full min-w-[900px] text-left">
                            <thead>
                                <tr className="bg-slate-100 dark:bg-slate-800/80">
                                    {["Order ID",  "Date", "Total", "Status", "Actions"].map((head) => (
                                        <th
                                            key={head}
                                            className="px-8 py-6 text-[12px] font-black uppercase tracking-widest text-slate-800 dark:text-slate-200"
                                        >
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[var(--border)]">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                                        <td className="px-8 py-5 font-black text-[#00A99D]">{order.id}</td>

                                        <td className="px-8 py-5 font-bold text-[var(--text-secondary)]">{order.date}</td>
                                        <td className="px-8 py-5 font-black text-[var(--text-primary)]">${order.total.toFixed(2)}</td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${getStatusClasses(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="pl-4">
                                            <div className="flex  gap-3">
                                                {/* View Action */}
                                                <div className="group/tip relative flex justify-center">
                                                    <button className="p-2.5 text-[var(--text-secondary)] hover:bg-[#00A99D]/10 hover:text-[#00A99D] rounded-2xl transition-all">
                                                        <Eye size={18} />
                                                    </button>
                                                    <span className="absolute -top-10 scale-0 group-hover/tip:scale-100 transition-transform bg-slate-900 text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap z-50">View</span>
                                                </div>

                                                {/* Edit Action
                                                <div className="group/tip relative flex justify-center">
                                                    <button className="p-2.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all">
                                                        <Edit3 size={18} />
                                                    </button>
                                                    <span className="absolute -top-10 scale-0 group-hover/tip:scale-100 transition-transform bg-slate-900 text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap z-50">Edit</span>
                                                </div> */}

                                                {/* Delete Action */}
                                                <div className="group/tip relative flex justify-center">
                                                    <button className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all">
                                                        <Trash2 size={18} />
                                                    </button>
                                                    <span className="absolute -top-10 scale-0 group-hover/tip:scale-100 transition-transform bg-slate-900 text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap z-50">Delete</span>
                                                </div>
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

export default MyOrder;