import Sidebar from "@/components/Dashboard/Sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

export default function SellerLayout({ children }) {
  return (
    /* flex ensures sidebar and content are side-by-side */
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar - Visible on medium screens and up */}
      <div className="hidden md:block">
        <Sidebar role="seller" />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Top Header Section */}
        <DashboardHeader role="seller" />

        {/* Dynamic Content with Scrollable Container */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1400px] mx-auto">{children}</div>
        </div>
        <footer className="mt-20 py-6 text-center text-xs text-gray-400 border-t border-gray-100">
          Seller Panel © 2026 PrimeMart System Control.
        </footer>
      </main>
    </div>
  );
}
