import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--background)] relative overflow-hidden px-6">
      
      {/* 1. Dynamic Background Glows - For that modern SaaS feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#0EA5A4] opacity-10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* 2. Modern Glassy Spinner (No Image, just divs) */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-10 group">
          
          {/* Main Outer Ring - Very slim */}
          <div className="absolute inset-0 border-t border-[var(--border)] group-hover:border-slate-300 dark:group-hover:border-slate-700 rounded-full transition-colors duration-500" />
          
          {/* Animated Spinner Ring - Custom Tailored with Tailwind */}
          <div className="absolute inset-0 border-t-2 border-[#0EA5A4] rounded-full animate-spin transition-all" 
               style={{animationDuration: '1.2s'}} // Fine-tuning default spin speed
          />
          
          {/* Center Pulsing Accent Dot */}
          <div className="absolute w-2 h-2 bg-[#0EA5A4] rounded-full animate-pulse transition-all group-hover:scale-110" />
        </div>

        {/* 3. "PrimeMart" Brand Name with Premium Typography */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight leading-none group-hover:scale-105 transition-transform duration-500">
             Prime<span className="text-[#0EA5A4]">Mart</span>
          </h1>
          
          {/* 4. Secondary Loading Status with elegant tracking */}
          <p className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-[0.5em] opacity-40 animate-pulse transition-opacity">
            Initializing Your Experience
          </p>
          
          {/* 5. Minimal Bouncing Dots indicator */}
          <div className="flex gap-2.5 mt-2 transition-opacity group-hover:opacity-100">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5A4] animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5A4]/70 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5A4]/40 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Modern Static Quote at the bottom - Adds context and class */}
      <div className="absolute bottom-12 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.3em] opacity-30 text-center max-w-sm px-6">
        Secure. Modern. Efficient. Platform
      </div>
    </div>
  );
}