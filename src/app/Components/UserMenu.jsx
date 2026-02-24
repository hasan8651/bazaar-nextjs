"use client";

import { useEffect, useState } from "react";
import { 
  User, Moon, Sun, ChevronDown, Settings, 
  LogOut, Heart, ShoppingCart, Package 
} from "lucide-react";

export default function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  //set localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // theme toggle function
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
    setIsOpen(false);
  };

  const menuItems = user
    ? [
        { label: "Profile", icon: <User size={18} className="text-blue-500" /> },
        { label: "Orders", icon: <Package size={18} className="text-orange-500" /> },
        { label: "Wishlist", icon: <Heart size={18} className="text-red-500" /> },
        { label: "Cart", icon: <ShoppingCart size={18} className="text-green-500" /> },
        { label: "Settings", icon: <Settings size={18} className="text-gray-500" /> },
        { label: "Logout", icon: <LogOut size={18} className="text-red-600" />, action: () => console.log("Logout clicked") },
      ]
    : [];

  return (
    <div className="relative">
      {/* User icon / Profile Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 group focus:outline-none"
      >
       <div className="p-0.5 rounded-full dark:bg-gray-200 dark:border dark:border-white transition-all">
  {user?.avatar ? (
    <img 
      src={user.avatar} 
      alt="avatar" 
      className="w-7 h-7 rounded-full object-cover" 
    />
  ) : (
    <User size={22} />
  )}
</div>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/*outside click close menu */}
          <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)}></div>
          
          <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-gray-700 shadow-2xl rounded-2xl py-3 z-[100] transition-all">
            
            {!user && (
              <div className="px-4 py-4 mb-2 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Welcome to Bazaar!</p>
                <button
                  className="btn btn-primary btn-sm w-full"
                  onClick={() => {
                    setIsOpen(false);
                    console.log("Login button clicked");
                  }}
                >
                  Login / Signup
                </button>
              </div>
            )}

            {user && (
              <div className="px-4 py-2 mb-2 border-b border-gray-50 dark:border-gray-700/50">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Account</p>
              </div>
            )}

            {user && (
              <ul className="flex flex-col text-gray-700 dark:text-gray-200 font-medium">
                {menuItems.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      if (item.action) item.action();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="my-2 border-t border-gray-100 dark:border-gray-700"></div>

            {/* Theme toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="w-8 flex justify-start">
                {isDarkMode ? (
                  <Sun size={18} className="text-amber-500 transition-pulse" />
                ) : (
                  <Moon size={18} className="text-indigo-500" />
                )}
              </div>
              <span className="font-semibold">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}