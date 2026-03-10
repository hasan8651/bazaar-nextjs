"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Plus, Clock, CheckCircle2, X, ChevronRight, Search } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function SupportTicketPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  // Mock Tickets Data
  const tickets = [
    { id: "TK-1024", subject: "Order #5523 not delivered", status: "Open", date: "Mar 10, 2026" },
    { id: "TK-1022", subject: "Refund request for damaged item", status: "Resolved", date: "Mar 05, 2026" },
    { id: "TK-1020", subject: "Account login issue", status: "Resolved", date: "Feb 28, 2026" },
  ];

  const filteredTickets = filter === "All" ? tickets : tickets.filter(t => t.status === filter);

  const notify = (msg) => toast.success(msg, {
    position: "top-center",
    style: { borderRadius: '12px', background: '#27272a', color: '#fff' }
  });

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-12 px-4 sm:px-6 min-h-screen">
      <Toaster />

      {/* Header & Filter */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">Help & Support</h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-1">Track your requests or get assistance.</p>
          </div>
          {/* Desktop Add Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white rounded-2xl font-bold shadow-lg shadow-[var(--secondary)]/20"
          >
            <Plus size={20} /> New Ticket
          </motion.button>
        </div>

        {/* Filter Tabs - Horizontal Scroll for Mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["All", "Open", "Resolved"].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filter === tab ? "bg-[var(--secondary)] text-white" : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--secondary)]/50"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket List */}
      <div className="space-y-3">
        {filteredTickets.map((ticket) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            key={ticket.id} 
            className="p-4 sm:p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl sm:rounded-[2rem] flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer hover:border-[var(--secondary)]/50"
          >
            <div className="flex items-center gap-3 sm:gap-5 min-w-0">
              <div className="p-3 bg-[var(--background)] rounded-xl sm:rounded-2xl text-[var(--secondary)] border border-[var(--border)] shrink-0">
                <MessageSquare size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-[var(--text-primary)] truncate text-sm sm:text-base">{ticket.subject}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{ticket.id} • {ticket.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`hidden sm:flex px-4 py-1.5 rounded-full text-xs font-bold items-center gap-2 ${ticket.status === 'Open' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
                {ticket.status}
              </span>
              <ChevronRight className="text-[var(--text-secondary)]" size={20} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile FAB */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="sm:hidden fixed bottom-6 right-6 p-4 bg-[var(--secondary)] text-white rounded-full shadow-2xl z-40 hover:scale-105 transition-all"
      >
        <Plus size={24} />
      </button>

      {/* Create Ticket Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] w-full max-w-lg shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">New Support Request</h2>
                <X className="cursor-pointer text-[var(--text-secondary)] p-1 hover:bg-[var(--background)] rounded-full transition-all" onClick={() => setIsModalOpen(false)} />
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); notify("Ticket submitted successfully!"); }} className="space-y-4">
                <input className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-4 text-[var(--text-primary)] outline-none focus:ring-2 ring-[var(--secondary)]/20" placeholder="Subject" required />
                <textarea className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-4 text-[var(--text-primary)] outline-none focus:ring-2 ring-[var(--secondary)]/20 min-h-[150px]" placeholder="Describe your issue in detail..." required />
                <button type="submit" className="w-full py-4 bg-[var(--secondary)] text-white font-black text-lg rounded-2xl shadow-xl transition-all hover:brightness-110">
                  Submit Ticket
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}