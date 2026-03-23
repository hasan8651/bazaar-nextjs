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
  const { status } = useSession();

  const currentView = pathname.startsWith("/admin")
    ? "admin"
    : pathname.startsWith("/seller")
      ? "seller"
      : "user";

  const menu = MENU_ITEMS[currentView] || [];

  if (status === "loading") {
    return (
      <aside className="hidden md:flex md:flex-col md:w-72 bg-(--surface) border-r border-(--border) h-screen sticky top-0 items-center justify-center">
        <Loading />
      </aside>
    );
  }

  return (
    <aside className="flex flex-col w-72 bg-(--surface) border-r border-(--border) h-screen sticky top-0 transition-all duration-300">
      
      {/* 1. Simple Brand Header */}
      <div className="p-8 h-28 flex flex-col justify-center">
        <BrandLogo />
        <div className="mt-2 flex items-center gap-2 px-1">
          <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${
            currentView === "admin" ? "bg-blue-500" : currentView === "seller" ? "bg-green-500" : "bg-(--secondary)"
          }`} />
          <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${
            currentView === "admin" ? "text-blue-500" : currentView === "seller" ? "text-green-500" : "text-(--secondary)"
          }`}>
            {currentView} Portal
          </span>
        </div>
      </div>

      {/* 2. Primary Navigation - Pure Focus */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-sidebar-scroll">
        {menu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.title}
              href={item.path}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? currentView === "admin"
                    ? "bg-blue-500/10 text-blue-600 font-black shadow-sm"
                    : currentView === "seller"
                      ? "bg-green-500/10 text-green-600 font-black shadow-sm"
                      : "bg-(--secondary)/15 text-(--secondary) font-black shadow-sm"
                  : "text-(--text-secondary) hover:bg-(--secondary)/5 hover:text-(--text-primary)"
              }`}
            >
              <item.icon className={`h-5 w-5 transition-all duration-300 ${
                  isActive ? "scale-110" : "opacity-60 group-hover:opacity-100 group-hover:scale-110"
              }`} />
              <span className="text-sm font-bold tracking-tight">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* 3. Role Switcher - Slim & Elegant */}
      {(role === "seller" || role === "admin") && (
        <div className="px-5 mb-4">
          <Link
            href={currentView === "user" ? `/${role}` : "/user"}
            className="flex items-center justify-between w-full p-4 rounded-[1.5rem] bg-(--background) border border-(--border) hover:border-(--secondary)/40 transition-all group shadow-sm active:scale-95"
          >
            <div className="flex flex-col items-start">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Navigation</span>
              <span className="text-[11px] font-black text-(--text-primary)">
                {currentView !== "user" ? "Exit to App" : role === "admin" ? "Admin Panel" : "Seller Panel"}
              </span>
            </div>
            <div className={`p-2 rounded-xl transition-all group-hover:rotate-12 ${
                currentView !== "user" ? "bg-(--secondary)/10 text-(--secondary)" : role === "admin" ? "bg-blue-500/10 text-blue-500" : "bg-green-500/10 text-green-500"
            }`}>
              {currentView !== "user" ? <ShoppingBag size={14} /> : role === "admin" ? <LayoutDashboard size={14} /> : <Store size={14} />}
            </div>
          </Link>
        </div>
      )}

      {/* 4. Action Footer */}
      <div className="p-4 border-t border-(--border)/50">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-5 py-4 text-(--text-secondary) hover:text-rose-500 hover:bg-rose-500/5 w-full rounded-2xl transition-all duration-300 font-black group text-sm uppercase tracking-wider"
        >
          <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}