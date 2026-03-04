// src/components/dashboard/DashboardHeader.jsx
"use client";

import React, { useState } from "react";
import { Menu, Bell, Search, X } from "lucide-react"; 
import { useSession } from "next-auth/react";
import SearchBar from "../layout/SearchBar";
import UserMenu from "../layout/UserMenu";

export default function DashboardHeader({ toggleSidebar, role }) {
  const { data: session } = useSession();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false); 

  return (
    <header className="bg-[var(--surface)] border-b border-[var(--border)] sticky top-0 z-[60] h-20 flex items-center shadow-sm">
      <div className="flex items-center justify-between w-full px-4 md:px-8 gap-4">
        
        {/* --- Left Section --- */}
        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-[var(--background)] md:hidden text-[var(--text-primary)] transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight capitalize">
              {role} Panel
            </h1>
          </div>
        </div>

        {/* --- Desktop Search Bar --- */}
        <div className="hidden lg:block flex-1 max-w-xl">
          <SearchBar />
        </div>

        {/* --- Right Section --- */}
        <div className="flex items-center gap-2 sm:gap-6 shrink-0">
          
          {/* Mobile Search Toggle Button (Only visible on Mobile) */}
          <button 
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-[var(--background)] text-[var(--text-secondary)]"
          >
            <Search size={22} />
          </button>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl hover:bg-[var(--background)] text-[var(--text-secondary)]">
            <Bell size={22} />
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-[var(--surface)] rounded-full"></span>
          </button>

          <div className="hidden sm:block h-8 w-[1px] bg-[var(--border)]"></div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <UserMenu user={session?.user} />
          </div>
        </div>
      </div>

      {/* --- Mobile Search Overlay (Animated) --- */}
      {isMobileSearchOpen && (
        <div className="absolute top-0 left-0 w-full h-20 bg-[var(--surface)] flex items-center px-4 z-[70] lg:hidden animate-in slide-in-from-top duration-300">
          <div className="flex-1">
             <SearchBar /> {/* Reusing your search bar */}
          </div>
          <button 
            onClick={() => setIsMobileSearchOpen(false)}
            className="ml-2 p-2 text-[var(--text-secondary)]"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </header>
  );
}