"use client";

import React, { useState } from "react";
import { Edit3, Trash2, Eye, Plus, Store } from "lucide-react";

const ManageSellers = () => {
  const [sellers, setSellers] = useState([
    { id: 1, name: "TimeWise Shop", email: "timewise@example.com", totalProducts: 12, status: "Active" },
    { id: 2, name: "Gadget BD", email: "gadgetbd@example.com", totalProducts: 25, status: "Pending" },
    { id: 3, name: "Tech Land", email: "techland@example.com", totalProducts: 8, status: "Disabled" },
  ]);

  const getStatusClasses = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Disabled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-4 md:p-10 space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-black flex items-center gap-3 text-[var(--text-primary)]">
          <Store className="text-[#00A99D]" /> Manage Sellers
        </h1>
        <button className="bg-[#00A99D] hover:bg-[#008c82] text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2">
          <Plus size={18} /> Add Seller
        </button>
      </div>

      {/* Table */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto custom-sidebar-scroll">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/80">
                {["ID", "Name", "Email", "Products", "Status", "Actions"].map((head) => (
                  <th key={head} className="px-6 py-4 text-[12px] font-black uppercase tracking-widest text-slate-800 dark:text-slate-200">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {sellers.map((seller) => (
                <tr key={seller.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                  <td className="px-6 py-4 font-black text-[#00A99D]">{seller.id}</td>
                  <td className="px-6 py-4 font-bold text-[var(--text-primary)]">{seller.name}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{seller.email}</td>
                  <td className="px-6 py-4 font-black text-[var(--text-primary)]">{seller.totalProducts}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${getStatusClasses(seller.status)}`}>
                      {seller.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      {/* View Action */}
                      <div className="group/tip relative flex justify-center">
                        <button className="p-2.5 text-[var(--text-secondary)] hover:bg-[#00A99D]/10 hover:text-[#00A99D] rounded-2xl transition-all">
                          <Eye size={16} />
                        </button>
                        <span className="absolute -top-10 scale-0 group-hover/tip:scale-100 transition-transform bg-slate-900 text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap z-50">View</span>
                      </div>

                      {/* Edit Action */}
                      <div className="group/tip relative flex justify-center">
                        <button className="p-2.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all">
                          <Edit3 size={16} />
                        </button>
                        <span className="absolute -top-10 scale-0 group-hover/tip:scale-100 transition-transform bg-slate-900 text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap z-50">Edit</span>
                      </div>

                      {/* Delete Action */}
                      <div className="group/tip relative flex justify-center">
                        <button className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all">
                          <Trash2 size={16} />
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

export default ManageSellers;