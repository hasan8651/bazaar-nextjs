"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Trash2, Plus, ShieldCheck, X, User, Calendar, Lock } from "lucide-react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast"; // Added Toast library

export default function PaymentMethodsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: session } = useSession();
  const userName = session?.user?.name || "Valued Customer";

  const cards = [
    { id: 1, name: userName, last4: "8242", isDefault: true },
    { id: 2, name: userName, last4: "8888", isDefault: false },
  ];

  // Toast notification for adding card
  const handleAddCard = () => {
    setIsModalOpen(false);
    toast.success("Payment method added successfully!");
  };

  // Toast notification for deleting card
  const handleDelete = () => {
    toast.error("Payment method removed!");
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Toaster position="top-right" /> {/* Toast Container */}
      
      {/* Personalized Header Section */}
      <div className="mb-10 p-8 bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-sm">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">
          Hello, {userName.split(' ')[0]}! 👋
        </h1>
        <p className="text-[var(--text-secondary)] mt-2 text-lg">
          Managing your payments on PrimeMart is secure and simple.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <motion.div 
            key={card.id} 
            whileHover={{ y: -5 }}
            className={`p-6 rounded-3xl border transition-all ${card.isDefault ? 'border-[var(--secondary)] bg-[var(--secondary)]/5' : 'border-[var(--border)] bg-[var(--surface)]'}`}
          >
            <div className="flex justify-between items-start mb-8">
              <CreditCard size={32} className={card.isDefault ? "text-[var(--secondary)]" : "text-[var(--text-secondary)]"} />
              {card.isDefault && (
                <span className="text-[10px] uppercase font-bold text-[var(--secondary)] bg-[var(--secondary)]/10 px-3 py-1 rounded-full">
                  Default
                </span>
              )}
            </div>
            
            <p className="text-xl font-mono mb-1 text-[var(--text-primary)] tracking-widest">•••• •••• •••• {card.last4}</p>
            
            <div className="flex justify-between items-end mt-6">
              <div>
                <p className="text-[10px] text-[var(--text-secondary)] uppercase">Cardholder</p>
                <p className="font-semibold text-[var(--text-primary)]">{card.name}</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                onClick={handleDelete} // Added delete handler
                className="text-[var(--text-secondary)] hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add New Method Button */}
      <motion.button 
        whileHover={{ scale: 1.01 }}
        onClick={() => setIsModalOpen(true)}
        className="w-full mt-8 py-5 border-2 border-dashed border-[var(--border)] rounded-2xl flex items-center justify-center gap-2 text-[var(--text-secondary)] hover:text-[var(--secondary)] hover:border-[var(--secondary)] transition-all font-bold"
      >
        <Plus size={20} /> Add New Payment Method
      </motion.button>

      {/* Security Footer */}
      <div className="mt-8 flex items-center justify-center gap-2 text-[var(--text-secondary)] text-sm">
        <ShieldCheck size={18} className="text-emerald-500" />
        <p>PrimeMart uses industry-standard encryption for your safety.</p>
      </div>

      {/* Add Card Modal - Fixed Z-index and Layout */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="relative bg-[var(--surface)] border border-[var(--border)] p-8 rounded-3xl w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Add New Card</h2>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <X />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-[var(--text-secondary)]" size={18} />
                  <input className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-3 pl-10 text-[var(--text-primary)] outline-none focus:border-[var(--secondary)]" placeholder="Cardholder Name" />
                </div>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3.5 text-[var(--text-secondary)]" size={18} />
                  <input className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-3 pl-10 text-[var(--text-primary)] outline-none focus:border-[var(--secondary)]" placeholder="Card Number" />
                </div>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Calendar className="absolute left-3 top-3.5 text-[var(--text-secondary)]" size={18} />
                    <input className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-3 pl-10 text-[var(--text-primary)] outline-none focus:border-[var(--secondary)]" placeholder="MM/YY" />
                  </div>
                  <div className="relative flex-1">
                    <Lock className="absolute left-3 top-3.5 text-[var(--text-secondary)]" size={18} />
                    <input className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl p-3 pl-10 text-[var(--text-primary)] outline-none focus:border-[var(--secondary)]" placeholder="CVC" />
                  </div>
                </div>
                <motion.button 
                  whileHover={{ opacity: 0.9 }} 
                  onClick={handleAddCard}
                  className="w-full py-3 bg-[var(--secondary)] text-white font-bold rounded-xl mt-2 transition-all"
                >
                  Save Payment Method
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}