"use client";

import { useEffect, useState } from "react";
import {
  User,
  Moon,
  Sun,
  ChevronDown,
  Settings,
  LogOut,
  Package,
  LogIn,
  LayoutDashboard, 
} from "lucide-react";
import { signOut } from "next-auth/react"; 
import Link from "next/link";
import Image from "next/image";

export default function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);


  // dashboard path condition
  const dashboardPath = user?.role === "seller" ? "/seller" : "/user";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* User Icon or Image */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 group focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--secondary)] transition-colors overflow-hidden flex items-center justify-center">
          {user?.image ? (
            <Image
              src={user.image}
              alt="user"
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <User size={20} strokeWidth={2.5} />
          )}
        </div>
        <ChevronDown
          size={14}
          className={`text-[var(--text-secondary)] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[90]"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute right-0 mt-3 w-64 overflow-hidden z-[100] rounded-2xl border border-[var(--border)] shadow-xl bg-[var(--background)]">
            {user ? (
              <>
                {/* --- User Profile Info --- */}
                <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]/50">
                  <p className="text-sm font-bold text-[var(--text-primary)] truncate">
                    {user.name}
                  </p>
                  <div className="flex items-center gap-2">
                     <p className="text-[10px] text-[var(--text-secondary)] truncate">
                       {user.email}
                     </p>
                     {user?.role === "seller" && (
                       <span className="text-[8px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded font-bold uppercase">Seller</span>
                     )}
                  </div>
                </div>

                <ul className="flex flex-col py-2">
                  {/* --- add dashboard--- */}
                  <Link href={dashboardPath} onClick={() => setIsOpen(false)}>
                    <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--surface)] cursor-pointer text-sm font-semibold text-[var(--text-primary)] transition-colors">
                      <LayoutDashboard size={18} className="text-purple-500" /> 
                      {user?.role === "seller" ? "Seller Dashboard" : "My Dashboard"}
                    </li>
                  </Link>

                  <Link href="/user/profile" onClick={() => setIsOpen(false)}>
                    <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--surface)] cursor-pointer text-sm font-semibold text-[var(--text-primary)] transition-colors">
                      <User size={18} className="text-blue-500" /> Profile
                    </li>
                  </Link>

                  <Link href="/user/orders" onClick={() => setIsOpen(false)}>
                    <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--surface)] cursor-pointer text-sm font-semibold text-[var(--text-primary)] transition-colors">
                      <Package size={18} className="text-orange-500" /> Orders
                    </li>
                  </Link>

                  <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--surface)] cursor-pointer text-sm font-semibold text-[var(--text-primary)] transition-colors">
                    <Settings size={18} className="text-gray-400" /> Settings
                  </li>

                  <div className="border-t border-[var(--border)] my-1 opacity-50"></div>

                  <li
                    onClick={() => signOut()} 
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer text-sm font-semibold text-red-500 transition-colors"
                  >
                    <LogOut size={18} /> Logout
                  </li>
                </ul>
              </>
            ) : (
              <div className="p-4 text-center">
                <p className="text-xs text-[var(--text-secondary)] mb-3 font-medium">
                  Welcome to PrimeMart!
                </p>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[var(--secondary)] text-white rounded-xl text-sm font-bold hover:brightness-110 transition-all active:scale-95"
                >
                  <LogIn size={18} />
                  Login
                </Link>
              </div>
            )}

            <div className="border-t border-[var(--border)] opacity-50"></div>

            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
            >
              {isDarkMode ? (
                <Sun size={18} className="text-amber-500" />
              ) : (
                <Moon size={18} className="text-indigo-600" />
              )}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}