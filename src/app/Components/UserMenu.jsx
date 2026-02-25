"use client";

import { useEffect, useState } from "react";
import { User, Moon, Sun, ChevronDown, Settings, LogOut, Package, LogIn } from "lucide-react";
import Link from "next/link"; 

export default function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  
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
      {/* user icon */}
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1 group focus:outline-none">
        <div className="p-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--secondary)] transition-colors">
          <User size={20} strokeWidth={2.5} />
        </div>
        <ChevronDown size={14} className={`text-[var(--text-secondary)] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)}></div>
          
          <div className="absolute right-0 mt-3 w-60 overflow-hidden z-[100] rounded-2xl border border-[var(--border)] shadow-xl bg-[var(--background)]">
            
            {/* --- when user login --- */}
            {user ? (
              <ul className="flex flex-col py-2">
                {[
                  { label: "Profile", icon: <User size={18} className="text-blue-500" /> },
                  { label: "Orders", icon: <Package size={18} className="text-orange-500" /> },
                  { label: "Settings", icon: <Settings size={18} className="text-gray-400" /> },
                  { label: "Logout", icon: <LogOut size={18} className="text-red-500" /> },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--surface)] cursor-pointer text-sm font-semibold text-[var(--text-primary)] transition-colors">
                    {item.icon} {item.label}
                  </li>
                ))}
              </ul>
            ) : (
              /* when user logout */
              <div className="p-4">
                <p className="text-xs text-[var(--text-secondary)] mb-3 font-medium">Welcome to our shop!</p>
                <Link 
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[var(--secondary)] text-white rounded-xl text-sm font-bold hover:brightness-110 transition-all active:scale-95"
                >
                  <LogIn size={18} />
                  Login / Register
                </Link>
              </div>
            )}

            <div className="border-t border-[var(--border)] opacity-50"></div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
            >
              {isDarkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className="text-indigo-600" />}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}