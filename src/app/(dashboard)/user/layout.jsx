"use client";

import { useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function UserLayout({ children }) {
  // State for mobile sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get session data to identify if the user is a Seller or Admin
  const { data: session } = useSession();

  // Get the actual role from database/session (defaults to "user")
  const userRole = session?.user?.role || "user";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)] transition-colors duration-300">
      {/* --- Sidebar Section --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 transform 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 shadow-2xl md:shadow-none`}
      >
        {/* Passing the actual userRole. 
          If role is "seller", the switch button will automatically appear 
          thanks to the logic we added in Sidebar.jsx 
        */}
        <Sidebar role={userRole} />
      </aside>

      {/* --- Overlay for Mobile (Close sidebar on click outside) --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header with role-based info and mobile toggle */}
        <DashboardHeader role={userRole} toggleSidebar={toggleSidebar} />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-sidebar-scroll">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>

          {/* Footer inside the scrollable area */}
          <footer className="mt-12 py-6 border-t border-[var(--border)] text-center text-xs text-[var(--text-secondary)] opacity-50 font-medium">
            © 2026 PrimeMart - Professional E-commerce Ecosystem. All Rights
            Reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}
