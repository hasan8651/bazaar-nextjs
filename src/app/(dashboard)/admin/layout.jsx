"use client";

import { useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { useSession } from "next-auth/react";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();

  // যদিও আমরা হার্ডকোড করে "admin" দিচ্ছি, তবে সেশন থেকে নেওয়া ভালো
  const userRole = session?.user?.role || "admin"; 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      
      {/* Sidebar - Admin Role */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0`}
      >
        <Sidebar role="admin" />
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Header */}
        <DashboardHeader role="admin" toggleSidebar={toggleSidebar} />
        
        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
            {children}
          </div>
          
          <footer className="mt-20 py-6 text-center text-xs text-gray-400 border-t border-gray-100">
            Admin Panel © 2026 PrimeMart System Control.
          </footer>
        </main>
      </div>
    </div>
  );
}