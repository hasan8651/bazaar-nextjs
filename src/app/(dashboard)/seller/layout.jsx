"use client";

import { useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

export default function SellerLayout({ children }) {
  // state for mobile side bar open and close
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // sidebar toggle open function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      
      {/* --- Sidebar Section --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 transform 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 shadow-2xl md:shadow-none bg-[var(--surface)]`}
      >
        <Sidebar role="seller" />
      </aside>

      {/* --- Mobile Overlay  --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] md:hidden animate-in fade-in duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* --- Main Content Area --- */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        
        {/*  toggleSidebar  */}
        <DashboardHeader role="seller" toggleSidebar={toggleSidebar} />

        {/* Dynamic Content with Scrollable Container */}
        <div className="flex-1 p-4 md:p-10 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
            {children}
          </div>

          <footer className="mt-20 py-6 text-center text-xs text-gray-400 border-t border-[var(--border)]">
            Seller Panel © 2026 PrimeMart System Control. All Rights Reserved.
          </footer>
        </div>
      </main>
    </div>
  );
}
