"use client";

import Link from 'next/link';
import { ArrowLeft, Home, ShoppingBag } from 'lucide-react';
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6 overflow-hidden relative">
      
      {/* --- 1. Premium Background Accents --- */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Grid Pattern for SaaS Feel */}
        <div className="absolute inset-0 bg-[grid-white-500/5] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-20" />
        
        {/* Dynamic Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0EA5A4] opacity-[0.08] rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600 opacity-[0.05] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        
        {/* --- 2. The 404 Hero Section --- */}
        <div className="relative mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter text-[var(--text-primary)] opacity-[0.03] dark:opacity-[0.05] select-none">
              404
            </h1>
          </motion.div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="p-3 bg-[#0EA5A4]/10 rounded-2xl border border-[#0EA5A4]/20 text-[#0EA5A4]">
                <ShoppingBag size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
                Prime<span className="text-[#0EA5A4]">Mart</span>
              </h3>
            </motion.div>
          </div>
        </div>

        {/* --- 3. Content Section --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)]">
              Shelf is Empty!
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto leading-relaxed font-medium opacity-80">
              The page you are looking for has been moved or doesn't exist in our current inventory.
            </p>
          </div>

          {/* --- 4. Action Buttons --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link 
              href="/" 
              className="w-full sm:w-auto px-10 py-4 bg-[var(--secondary)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-lg shadow-[var(--secondary)]/20 hover:shadow-[var(--secondary)]/40 hover:-translate-y-1 transition-all active:scale-95 group"
            >
              <Home size={18} className="group-hover:rotate-12 transition-transform" />
              <span>Back to Home</span>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-10 py-4 bg-transparent border border-[var(--border)] text-[var(--text-primary)] rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-[var(--surface-hover)] hover:-translate-y-1 transition-all active:scale-95 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Go Back</span>
            </button>
          </div>
        </motion.div>

        {/* --- 5. Footer Branding --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8 }}
          className="mt-24 flex justify-center items-center gap-6"
        >
          <div className="h-px w-16 bg-[var(--text-secondary)]" />
          <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[var(--text-secondary)]">
            SYSTEM_ERROR_CODE: 404
          </span>
          <div className="h-px w-16 bg-[var(--text-secondary)]" />
        </motion.div>
      </div>
    </div>
  );
}