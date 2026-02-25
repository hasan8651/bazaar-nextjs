"use client";

import { useEffect, useState } from "react";
import { User, Moon, Sun, ChevronDown, Settings, LogOut, Package } from "lucide-react";

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
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
    setIsOpen(false);
  };

  const menuItems = user ? [
    { label: "Profile", icon: <User size={18} className="text-blue-500" /> },
    { label: "Orders", icon: <Package size={18} className="text-orange-500" /> },
    { label: "Settings", icon: <Settings size={18} className="text-gray-400" /> },
    { label: "Logout", icon: <LogOut size={18} className="text-red-500" /> },
  ] : [];

  return (
    <div className="relative">
      {/* User Icon Trigger - CSS Variable ব্যবহার করে */}
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1 group focus:outline-none">
        <div className="p-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]">
          <User size={20} strokeWidth={2.5} />
        </div>
        <ChevronDown size={14} className={`text-[var(--text-secondary)] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu - সরাসরি CSS Variable দিয়ে Force করা হয়েছে */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)}></div>
          
          <div 
            style={{ backgroundColor: 'var(--background)' }} // Inline style দিয়ে Force করছি
            className="absolute right-0 mt-3 w-60 overflow-hidden z-[100] rounded-2xl border border-[var(--border)] shadow-xl shadow-black/10"
          >
            {user && (
              <ul className="flex flex-col py-2">
                {menuItems.map((item, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--surface)] cursor-pointer text-sm font-semibold text-[var(--text-primary)] transition-colors"
                  >
                    {item.icon} {item.label}
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-[var(--border)] opacity-50"></div>

            {/* Theme Toggle Button */}
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