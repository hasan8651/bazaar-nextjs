"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // 1. Add individual routes here where you DON'T want to show Navbar and Footer
  // Example: "/login", "/register", "/forgot-password"
  const excludedRoutes = [
    // "/login",
    // "/forgot-password",
  ];

  // 2. Check if the current path starts with dashboard prefixes
  const isDashboard = pathname.startsWith("/admin") || 
                      pathname.startsWith("/seller") || 
                      pathname.startsWith("/user");

  // 3. Final check: Hide if it's a dashboard OR if it's in the excludedRoutes list
  const shouldHideLayout = isDashboard || excludedRoutes.includes(pathname);

  return (
    <>
      {/* Show Navbar only if the route is NOT excluded */}
      {!shouldHideLayout && <Navbar />}
      
      <main className="min-h-screen">
        {children}
      </main>
      
      {/* Show Footer only if the route is NOT excluded */}
      {!shouldHideLayout && <Footer />}
    </>
  );
}