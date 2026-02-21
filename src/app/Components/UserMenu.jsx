"use client";

import { useState } from "react";
import { User, Moon, Sun, ChevronDown, Settings, LogOut, Heart, ShoppingCart, Package } from "lucide-react";

export default function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = user
    ? [
        { label: "Profile", icon: <User size={18} /> },
        { label: "Orders", icon: <Package size={18} /> },
        { label: "Wishlist", icon: <Heart size={18} /> },
        { label: "Cart", icon: <ShoppingCart size={18} /> },
        { label: "Settings", icon: <Settings size={18} /> },
        { label: "Logout", icon: <LogOut size={18} />, action: () => console.log("Logout clicked") },
      ]
    : [];

  return (
    <div className="relative">
      {/* User icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 group focus:outline-none"
      >
        <div className="p-2 rounded-full group-hover:bg-gray-100 transition-all text-gray-700">
          {user?.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
          ) : (
            <User size={22} />
          )}
        </div>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 shadow-2xl rounded-xl py-3 z-[100]">
          {!user && (
            <div className="px-4 py-2 mb-2 text-center">
              <p className="text-xs text-gray-500 mb-3">Welcome to Bazaar!</p>
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
            <ul className="flex flex-col text-gray-700 font-medium">
              {menuItems.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    if (item.action) item.action();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors rounded-md"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          )}

          <hr className="my-2 border-gray-50" />

          {/* Theme toggle */}
          <button
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              setIsOpen(false);
            }}
            className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-md"
          >
            <div className="w-8 flex justify-start">
              {isDarkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className="text-indigo-500" />}
            </div>
            <span className="font-medium">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      )}
    </div>
  );
}