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
    <div className="w-full flex items-center bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden">

      {/* Category */}
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="hidden md:flex items-center h-12 bg-gray-50 px-5 text-sm border-r border-gray-300 outline-none cursor-pointer hover:bg-gray-100 transition"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Input */}
      <input
        type="text"
        placeholder="Search for products..."
        className="flex-1 px-5 text-sm h-12 bg-white outline-none"
      />

      {/* Search button */}
      <button className="h-12 w-14 bg-blue-600 flex justify-center items-center hover:bg-blue-700 transition text-white"
      style={{backgroundColor: "var(--secondary"}}
      >
        <Search size={20} />
      </button>
    </div>
  );
}