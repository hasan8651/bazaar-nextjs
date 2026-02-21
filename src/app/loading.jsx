import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        {/* large ring */}
        <div className="w-20 h-20 border-4 border-gray-200 border-t-[#0EA5A4] rounded-full animate-spin"></div>
        
        {/* small ring */}
        <div className="absolute w-12 h-12 border-4 border-gray-200 border-b-[#F59E0B] rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <h2 className="text-2xl font-black text-[#111827] tracking-tighter animate-pulse">
          Ba<span className="text-[#0EA5A4]">zaar</span>
        </h2>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] animate-bounce">
          Loading Experience...
        </p>
      </div>
    </div>
  );
}