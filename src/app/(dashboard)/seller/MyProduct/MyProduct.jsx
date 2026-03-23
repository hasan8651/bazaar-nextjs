"use client"
// 1. ADDED CheckCircle TO THE IMPORT LIST
import { Eye, Package, Power, PowerOff, Store, Trash2, CheckCircle, Filter, ChevronDown } from 'lucide-react';
import React from 'react';

const MyProduct = ({ sellerProduct }) => {
    // 2. Added a safety check to prevent "cannot read map of undefined"
    if (!sellerProduct || !Array.isArray(sellerProduct)) return null;


    return (
        <div className="p-4 md:p-10 space-y-8 min-h-screen">

            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-3">
                    <Package className="text-[#00A99D]" /> My Products
                </h1>
                <p className="text-sm text-[var(--text-secondary)] font-bold opacity-80">Oversee my inventory and platform listings.</p>
            </div>



            <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2.5rem] shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { label: "Category", options: ["Electronics", "Accessories", "Home Decor"] },
                        { label: "Status", options: ["Approved", "Unapproved"] },

                    ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.1em] text-[var(--text-primary)] opacity-70 ml-1">
                                {item.label}
                            </label>
                            <div className="relative group">
                                <select className="w-full bg-[var(--border)]/10 border border-[var(--border)] p-3.5 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20 focus:border-[#00A99D] transition-all text-[var(--text-primary)] text-sm font-black cursor-pointer">
                                    <option value="" className="bg-[var(--surface)]">Select {item.label}</option>
                                    {item.options.map(opt => <option key={opt} value={opt.toLowerCase()} className="bg-[var(--surface)]">{opt}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none" size={16} />
                            </div>
                        </div>
                    ))}

                    <div className="flex items-end">
                        <button className="w-full h-[54px] bg-[#00A99D] hover:bg-[#008c82] text-white rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00A99D]/20 active:scale-95">
                            <Filter size={18} /> Apply Filters
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto custom-sidebar-scroll">
                    <table className="w-full text-left border-separate border-spacing-0 min-w-[1000px]">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800/90">
                                {["Product Name", "Brand", "Category", "Price", "Stock", "Status", "Actions"].map((head) => (
                                    <th key={head} className="px-8 py-6 text-[12px] font-black uppercase tracking-widest text-slate-900 dark:text-slate-100 border-b border-[var(--border)]">
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[var(--border)]">
                            {sellerProduct.map((product) => (
                                <tr key={product._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all group">
                                    {/* Column 1: Product Name & Image */}
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative h-14 w-14 shrink-0 p-1 bg-white dark:bg-slate-700 rounded-2xl border border-[var(--border)] shadow-sm">
                                                <img src={product.images.thumbnail} alt="" className="h-full w-full rounded-xl object-cover" />
                                            </div>
                                            <span className="font-black text-[var(--text-primary)] text-[15px] group-hover:text-[#00A99D] transition-colors leading-tight uppercase">
                                                {product.name || "Unnamed Product"}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Column 2: Brand/Store */}
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 font-black text-[var(--text-primary)] text-sm uppercase">
                                            <Store size={14} className="text-[#00A99D]" /> {product.seller?.storeName || "N/A"}
                                        </div>
                                    </td>

                                    {/* Column 3: Category */}
                                    <td className="px-8 py-5 text-sm font-bold text-[var(--text-secondary)] uppercase tracking-tighter">
                                        {product.category.name}
                                    </td>

                                    {/* Column 4: Price */}
                                    <td className="px-8 py-5 text-base font-black text-[var(--text-primary)]">
                                        ${product.pricing?.basePrice}
                                    </td>

                                    {/* Column 5: Stock */}
                                    <td className="px-8 py-5 text-sm font-black">
                                        <span className={`flex items-center gap-2 ${product.inventory?.totalStock === 0 ? "text-red-500" : "text-[var(--text-primary)]"}`}>
                                            <div className={`w-2 h-2 rounded-full ${product.inventory?.totalStock === 0 ? "bg-red-500 animate-pulse" : "bg-[#00A99D]"}`}></div>
                                            {product.inventory?.totalStock ?? 0}
                                        </span>
                                    </td>

                                    {/* Column 6: Status Badge */}
                                    <td className="px-8 py-5">
                                        <span className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-[0.1em] border shadow-sm ${product.status?.isActive ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-500/20" :
                                            "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-500/20"

                                            }`}>
                                            {product.status?.approval || "Unknown"}
                                        </span>
                                    </td>

                                    {/* Column 7: Action Panel */}
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-4">
                                            {/* View Button */}
                                            <button className="p-2.5 text-[var(--text-secondary)] hover:bg-[#00A99D]/10 hover:text-[#00A99D] rounded-2xl transition-all border border-transparent">
                                                <Eye size={20} />
                                            </button>

                                            {/* Toggle/Approve Button
                                            // <button className={`p-2.5 rounded-2xl transition-all border border-transparent ${
                                            //     product.status?.approval === "Pending" ? "text-green-600 hover:bg-green-100" : 
                                            //     product.status?.approval === "Active" ? "text-amber-600 hover:bg-amber-100" : "text-[#00A99D]"
                                            // }`}>
                                            //     {product.status?.approval === "Pending" ? <CheckCircle size={20} /> : 
                                            //      product.status?.approval === "Active" ? <PowerOff size={20} /> : <Power size={20} />}
                                            // </button> */}

                                            {/* Delete Button */}
                                            <button className="p-2.5 text-red-500 hover:bg-red-100 rounded-2xl transition-all border border-transparent">
                                                <Trash2 size={20} />
                                            </button>
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

export default MyProduct;