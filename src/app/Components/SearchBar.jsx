
"use client";

import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full rounded-full bg-gray-100 pl-11 pr-5 py-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition-all"
      />
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        size={20}
      />
    </div>
  );
}