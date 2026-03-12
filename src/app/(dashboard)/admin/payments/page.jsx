"use client";

import React, { useState } from "react";
import { Wallet, CheckCircle, Clock, ArrowRight } from "lucide-react";

const PaymentManagement = () => {
  const [payouts] = useState([
    { id: 1, seller: "TimeWise Shop", amount: 1250.00, status: "Paid", date: "12 Mar, 2026" },
    { id: 2, seller: "Gadget BD", amount: 850.50, status: "Pending", date: "11 Mar, 2026" },
  ]);

  return (
    <div className="p-4 md:p-10 space-y-8 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[var(--text-primary)]">Payout Management</h1>
        <p className="text-sm text-[var(--text-secondary)] font-bold mt-1">Manage seller withdrawals and payments.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2rem] flex items-center justify-between">
            <div>
                <p className="text-[var(--text-secondary)] font-bold text-xs uppercase tracking-widest">Pending Payouts</p>
                <h2 className="text-2xl font-black text-[var(--text-primary)] mt-1">$5,120.00</h2>
            </div>
            <div className="p-4 bg-amber-500/10 text-amber-500 rounded-2xl"><Clock size={24}/></div>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2rem] flex items-center justify-between">
            <div>
                <p className="text-[var(--text-secondary)] font-bold text-xs uppercase tracking-widest">Total Paid</p>
                <h2 className="text-2xl font-black text-[var(--text-primary)] mt-1">$45,230.00</h2>
            </div>
            <div className="p-4 bg-green-500/10 text-green-500 rounded-2xl"><CheckCircle size={24}/></div>
        </div>
      </div>

      {/* Payout List */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2rem] overflow-hidden">
        <div className="overflow-x-auto custom-sidebar-scroll">
          <table className="w-full text-left min-w-[600px]">
            <tbody className="divide-y divide-[var(--border)]">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                  <td className="px-8 py-6">
                    <p className="font-black text-[var(--text-primary)]">{p.seller}</p>
                    <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">{p.date}</p>
                  </td>
                  <td className="px-8 py-6 font-black text-[var(--text-primary)]">${p.amount.toFixed(2)}</td>
                  <td className="px-8 py-6">
                     <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${p.status === 'Paid' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                        {p.status}
                     </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {p.status === "Pending" && (
                        <button className="flex items-center gap-2 text-[#00A99D] font-black text-xs hover:gap-3 transition-all">
                            Approve <ArrowRight size={14}/>
                        </button>
                    )}
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

export default PaymentManagement;