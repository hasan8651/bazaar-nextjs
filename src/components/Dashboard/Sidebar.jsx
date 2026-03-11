"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "@/constants/dashboard";
import { LogOut, ShoppingBag, Store, LayoutDashboard } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import BrandLogo from "../common/BrandLogo";
import Loading from "@/app/loading";

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  /**
   * Logic: Determine the current view based on the URL path.
   * This ensures the correct menu is displayed even if a seller/admin navigates to user pages.
   */
  const currentView = pathname.startsWith("/admin")
    ? "admin"
    : pathname.startsWith("/seller")
      ? "seller"
      : "user";

  const menu = MENU_ITEMS[currentView] || [];

  // Handle loading state while session is being fetched
  if (status === "loading") {
    return (
      <aside className="hidden md:flex md:flex-col md:w-72 bg-(--surface) border-r border-(--border) h-screen sticky top-0 items-center justify-center">
        <Loading />
      </aside>
    );
  }

  const user = {
    name: session?.user?.name || "Guest User",
    email: session?.user?.email || "Sign in to access",
    avatarUrl: session?.user?.image || null,
    isAuthenticated: status === "authenticated",
  };

  return (
    <aside className="flex flex-col w-72 bg-(--surface) border-r border-(--border) h-screen sticky top-0 transition-all duration-300">
      {/* 1. Brand / Logo Section */}
      <div className="p-6 border-b border-(--border) h-24 flex items-center">
        <div className="flex flex-col gap-1">
          <BrandLogo />
          <span
            className={`text-[10px] font-bold uppercase tracking-[0.2em] ml-1 ${
              currentView === "admin"
                ? "text-blue-500"
                : currentView === "seller"
                  ? "text-green-500"
                  : "text-(--secondary)"
            }`}
          >
            {currentView} Portal
          </span>
        </div>
      </div>

      {/* 2. User Profile Section */}
      <div className="p-6 border-b border-(--border) bg-(--surface-hover)/30">
        <div className="flex items-center gap-4">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center overflow-hidden border shadow-sm shrink-0 ${
              currentView === "admin"
                ? "border-blue-500/30 bg-blue-500/10"
                : currentView === "seller"
                  ? "border-green-500/30 bg-green-500/10"
                  : "border-(--secondary)/30 bg-(--secondary)/20"
            }`}
          >
            {user.isAuthenticated && user.avatarUrl ? (
              <img
                src={session?.user?.image || user.avatarUrl}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className={`text-lg font-bold ${
                  currentView === "admin"
                    ? "text-blue-600"
                    : currentView === "seller"
                      ? "text-green-600"
                      : "text-(--secondary)"
                }`}
              >
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="overflow-hidden">
            <p className="font-bold text-(--text-primary) text-sm truncate">
              {user.name}
            </p>
            <p className="text-xs text-(--text-secondary) truncate italic opacity-70">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Navigation Menu with Custom Scrollbar */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-sidebar-scroll">
        {menu.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.title}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? currentView === "admin"
                    ? "bg-blue-500/10 text-blue-600 font-bold"
                    : currentView === "seller"
                      ? "bg-green-500/10 text-green-600 font-bold"
                      : "bg-(--secondary)/15 text-(--secondary) font-bold shadow-sm"
                  : "text-(--text-secondary) hover:bg-(--secondary)/5 hover:text-(--text-primary)"
              }`}
            >
              <item.icon
                className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                  isActive
                    ? currentView === "admin"
                      ? "text-blue-600"
                      : currentView === "seller"
                        ? "text-green-600"
                        : "text-(--secondary)"
                    : "text-(--text-secondary) group-hover:text-(--text-primary)"
                }`}
              />
              <span className="text-sm">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* 4. Role Switcher - Logic for Sellers and Admins */}
      {(role === "seller" || role === "admin") && (
        <div className="px-4 mb-4">
          <Link
            href={currentView === "user" ? `/${role}` : "/user"}
            className="flex items-center justify-between w-full p-4 rounded-2xl bg-(--surface-hover) border border-(--border) hover:border-(--secondary)/50 transition-all group"
          >
            <div className="flex flex-col items-start">
              <span className="text-[9px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-[0.2em]">
                Switch to
              </span>
              <span className="text-xs font-bold text-(--text-primary)">
                {currentView !== "user"
                  ? "Buying Mode"
                  : role === "admin"
                    ? "Admin Panel"
                    : "Seller Panel"}
              </span>
            </div>
            <div
              className={`p-2 rounded-lg shadow-sm transition-transform group-hover:rotate-12 ${
                currentView !== "user"
                  ? "bg-(--secondary)/10"
                  : role === "admin"
                    ? "bg-blue-500/10"
                    : "bg-green-500/10"
              }`}
            >
              {currentView !== "user" ? (
                <ShoppingBag size={16} className="text-(--secondary)" />
              ) : role === "admin" ? (
                <LayoutDashboard size={16} className="text-blue-500" />
              ) : (
                <Store size={16} className="text-green-500" />
              )}
            </div>
          </Link>
        </div>
      )}

      {/* 5. Logout Action */}
      <div className="p-4 border-t border-(--border)">
        {user.isAuthenticated ? (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-4 py-3 text-(--text-secondary) hover:text-red-500 hover:bg-red-500/5 w-full rounded-xl transition-all duration-200 font-medium group"
          >
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Logout</span>
          </button>
        ) : (
          <Link
            href="/login"
            className="flex items-center justify-center gap-3 px-4 py-3 bg-(--secondary) text-white w-full rounded-xl font-bold text-sm shadow-lg shadow-(--secondary)/20"
          >
            Sign In
          </Link>
        )}
      </div>
    </aside>
  );
}
