"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [selected, setSelected] = useState("All");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Grocery",
    "Home & Living",
    "Beauty",
    "Mobile",
  ];

  return (
    <div 
      className="w-full flex items-center border rounded-full shadow-sm overflow-hidden transition-all duration-300"
      style={{ 
        backgroundColor: "var(--background)", 
        borderColor: "var(--border)" 
      }}
    >

      {/* Category Dropdown */}
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="hidden md:flex items-center h-12 px-5 text-sm border-r outline-none cursor-pointer transition"
        style={{ 
          backgroundColor: "var(--surface)", 
          borderColor: "var(--border)",
          color: "var(--text-primary)"
        }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat} className="bg-white dark:bg-[#1e293b]">
            {cat}
          </option>
        ))}
      </select>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search for products..."
        className="flex-1 px-5 text-sm h-12 outline-none transition-all"
        style={{ 
          backgroundColor: "var(--background)", 
          color: "var(--text-primary)"
        }}
      />

      {/* Search button */}
      <button 
        className="h-12 w-14 flex justify-center items-center hover:opacity-90 transition text-white"
        style={{ backgroundColor: "var(--secondary)" }}
      >
        <Search size={20} />
      </button>
    </div>
  );
}