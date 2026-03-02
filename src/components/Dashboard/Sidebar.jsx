"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "@/constants/dashboard";
import { LogOut, ShoppingBag, Store } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import BrandLogo from "../common/BrandLogo";
import Loading from "@/app/loading";

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  /* Logic: If a user is a seller, they might be in the '/user' path. 
     We need to decide which menu to show based on the current URL.
  */
  const currentView = pathname.startsWith("/seller") ? "seller" : "user";
  const menu = MENU_ITEMS[currentView] || [];

  // Show loading state
  if (status === "loading") {
    return (
      <aside className="hidden md:flex md:flex-col md:w-72 bg-[var(--surface)] border-r border-[var(--border)] h-screen sticky top-0 items-center justify-center">
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
    <aside className="hidden md:flex md:flex-col md:w-72 bg-[var(--surface)] border-r border-[var(--border)] h-screen sticky top-0 transition-all duration-300">
      
      {/* 1. Brand / Logo Section */}
      <div className="p-6 border-b border-[var(--border)] h-24 flex items-center">
        <div className="flex flex-col gap-1">
          <BrandLogo />
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ml-1 ${
            currentView === 'seller' ? 'text-green-500' : 'text-[var(--secondary)]'
          }`}>
            {currentView} Portal
          </span>
        </div>
      </div>

      {/* 2. User Profile Section */}
      <div className="p-6 border-b border-[var(--border)] bg-[var(--surface-hover)]/30">
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center overflow-hidden border shadow-sm shrink-0 ${
            currentView === 'seller' ? 'border-green-500/30 bg-green-500/10' : 'border-[var(--secondary)]/30 bg-[var(--secondary)]/20'
          }`}>
            {user.isAuthenticated && user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className={`text-lg font-bold ${currentView === 'seller' ? 'text-green-600' : 'text-[var(--secondary)]'}`}>
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="overflow-hidden">
            <p className="font-bold text-[var(--text-primary)] text-sm truncate">{user.name}</p>
            <p className="text-xs text-[var(--text-secondary)] truncate italic opacity-70">{user.email}</p>
          </div>
        </div>
      </div>

      {/* 3. Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-sidebar-scroll">
        {menu.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.title}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? currentView === 'seller' 
                    ? "bg-green-500/10 text-green-600 font-bold" 
                    : "bg-[var(--secondary)]/15 text-[var(--secondary)] font-bold shadow-sm"
                  : "text-[var(--text-secondary)] hover:bg-[var(--secondary)]/5 hover:text-[var(--text-primary)]"
              }`}
            >
              <item.icon
                className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                  isActive
                    ? currentView === 'seller' ? "text-green-600" : "text-[var(--secondary)]"
                    : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                }`}
              />
              <span className="text-sm">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* 4. Role Switcher - Visible only if the actual DB role is 'seller' */}
      {role === "seller" && (
        <div className="px-4 mb-4">
          <Link
            href={pathname.startsWith("/seller") ? "/user" : "/seller"}
            className="flex items-center justify-between w-full p-4 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] hover:border-[var(--secondary)]/50 transition-all group"
          >
            <div className="flex flex-col items-start">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">Switch to</span>
              <span className="text-xs font-bold text-[var(--text-primary)]">
                {pathname.startsWith("/seller") ? "Buying Mode" : "Seller Panel"}
              </span>
            </div>
            <div className={`p-2 rounded-lg shadow-sm transition-transform group-hover:rotate-12 ${
              pathname.startsWith("/seller") ? "bg-[var(--secondary)]/10" : "bg-green-500/10"
            }`}>
              {pathname.startsWith("/seller") ? (
                <ShoppingBag size={16} className="text-[var(--secondary)]" />
              ) : (
                <Store size={16} className="text-green-500" />
              )}
            </div>
          </Link>
        </div>
      )}

      {/* 5. Logout Action */}
      <div className="p-4 border-t border-[var(--border)]">
        {user.isAuthenticated ? (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-4 py-3 text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/5 w-full rounded-xl transition-all duration-200 font-medium group"
          >
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Logout</span>
          </button>
        ) : (
          <Link
            href="/login"
            className="flex items-center justify-center gap-3 px-4 py-3 bg-[var(--secondary)] text-white w-full rounded-xl font-bold text-sm shadow-lg shadow-[var(--secondary)]/20"
          >
            Sign In
          </Link>
        )}
      </div>
    </aside>
  );
}