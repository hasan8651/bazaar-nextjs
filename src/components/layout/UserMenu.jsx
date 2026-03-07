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
  Store,
  Heart,
  ShoppingBag,
  HelpCircle,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // theme load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
  };

  const dashboardPath = user?.role === "seller" ? "/seller" : "/user";

  return (
    <div className="relative">
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
            <User size={20} />
          )}
        </div>
      </button>

      {/* Overlay for closing menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[90]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Menu Container */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 z-[100] rounded-2xl border border-[var(--border)] shadow-xl bg-[var(--background)] py-2">
          {user ? (
            <>
              {/* User Info */}
              <div className="px-4 py-2 mb-2 border-b border-[var(--border)]">
                <p className="text-sm font-bold truncate">{user.name}</p>
                <p className="text-[11px] text-[var(--text-secondary)] truncate">
                  {user.email}
                </p>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col">
                <MenuLink
                  href={dashboardPath}
                  icon={<LayoutDashboard size={18} />}
                  label="Dashboard"
                  onClick={() => setIsOpen(false)}
                />
                <MenuLink
                  href="/user/my-orders"
                  icon={<ShoppingBag size={18} />}
                  label="My Orders"
                  onClick={() => setIsOpen(false)}
                />
                <MenuLink
                  href="/user/wishlist"
                  icon={<Heart size={18} />}
                  label="Wishlist"
                  onClick={() => setIsOpen(false)}
                />
                <MenuLink
                  href="/user/settings"
                  icon={<Settings size={18} />}
                  label="Account Settings"
                  onClick={() => setIsOpen(false)}
                />
                <MenuLink
                  href="/help"
                  icon={<HelpCircle size={18} />}
                  label="Help & Support"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              {/* Seller Zone Section */}
              <div className="border-t border-[var(--border)] mt-2 pt-2">
                {user?.role === "seller" ? (
                  <MenuLink
                    href="/seller/products"
                    icon={<Package size={18} />}
                    label="Manage Products"
                    onClick={() => setIsOpen(false)}
                  />
                ) : (
                  <MenuLink
                    href="/become-seller"
                    icon={<Store size={18} />}
                    label="Become a Seller"
                    onClick={() => setIsOpen(false)}
                    className="text-[var(--secondary)] font-bold"
                  />
                )}
              </div>
            </>
          ) : (
            /* Auth Buttons for Guest */
            <div className="px-4 py-2 space-y-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-bold transition-all hover:opacity-90"
              >
                <LogIn size={18} /> Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 bg-[var(--surface)] text-[var(--text-primary)] rounded-lg text-sm font-semibold transition-all hover:bg-[var(--border)]"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Footer Actions (Theme & Logout) */}
          <div className="border-t border-[var(--border)] mt-2 pt-2">
            <button
              onClick={toggleTheme}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
            >
              {isDarkMode ? (
                <Sun size={18} className="text-amber-500" />
              ) : (
                <Moon size={18} className="text-indigo-600" />
              )}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {user && (
              <button
                onClick={() => signOut()}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
              >
                <LogOut size={18} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Component
function MenuLink({ href, icon, label, onClick, className = "" }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--surface)] text-sm font-semibold text-[var(--text-primary)] transition-colors ${className}`}
    >
      {icon} {label}
    </Link>
  );
}
