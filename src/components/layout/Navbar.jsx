"use client";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Search, Heart, ShoppingCart, Bell, Menu, X, LayoutGrid } from "lucide-react";
import BrandLogo from "../common/BrandLogo";
import UserMenu from "./UserMenu";
import CategoryNav from "./CategoryNav";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef(null);

  // search bar close click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowMobileSearch(false);
      }
    };
    if (showMobileSearch) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileSearch]);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Dynamic Background Glass Effect */}
      <div className="absolute inset-0 backdrop-blur-[20px] bg-(--background)/75 border-b border-(--border) shadow-sm"></div>

      <div className="relative max-w-350 mx-auto px-4 lg:px-6">
        <div className="h-16 md:h-20 flex items-center justify-between gap-4 md:gap-8">
          
          {/* Menu Toggle & Logo */}
          <div className="flex items-center gap-2">
            <button 
              className="md:hidden p-2 rounded-xl text-(--text-primary) active:scale-90 transition-all" 
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                if(showMobileSearch) setShowMobileSearch(false);
              }}
            >
              {isMenuOpen ? <X size={26} className="text-(--secondary)" /> : <Menu size={26} />}
            </button>
            <BrandLogo width={130} />
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-2xl transform transition-all duration-300 focus-within:scale-[1.01]">
            <SearchBar />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 md:gap-5 text-(--text-primary)">
            {/* Mobile Search Icon Toggle */}
            {!showMobileSearch && (
              <button 
                onClick={() => {
                  setShowMobileSearch(true);
                  if(isMenuOpen) setIsMenuOpen(false);
                }}
                className="md:hidden p-2 rounded-full hover:bg-(--border)/50 transition"
              >
                <Search size={22} />
              </button>
            )}

            {/* Desktop Only Icons (Bell & Heart) */}
            <div className="hidden sm:flex items-center gap-4 border-r border-(--border) pr-4 mr-1">
              <div className="relative group p-2 hover:bg-(--border)/30 rounded-full cursor-pointer transition">
                <Bell size={22} className="group-hover:text-(--secondary)" />
                <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-(--background) animate-pulse"></span>
              </div>
              <div className="p-2 hover:bg-(--border)/30 rounded-full cursor-pointer transition group">
                <Heart size={22} className="group-hover:fill-(--secondary) group-hover:text-(--secondary)"/>
              </div>
            </div>

            {/* Cart & UserMenu */}
            <div className="flex items-center gap-2">
              <div className="relative p-2 hover:bg-(--border)/30 rounded-full cursor-pointer transition">
                <ShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 bg-(--secondary) text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4.5 text-center border-2 border-(--background)">3</span>
              </div>
              <UserMenu user={session?.user} />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar with Auto-Close Logic */}
        {showMobileSearch && (
          <div ref={searchRef} className="md:hidden pb-4 animate-in slide-in-from-top-2 duration-300 px-2">
            <SearchBar onClose={() => setShowMobileSearch(false)} />
          </div>
        )}
      </div>

      {/* Desktop Category Nav Line */}
      <div className="hidden md:block border-t border-(--border)/40 w-full"> 
        <div className="max-w-350 mx-auto px-6">
          <CategoryNav />
        </div>
      </div>

      {/* Full Screen Mobile Drawer for Categories */}
      <div className={`md:hidden fixed inset-y-0 left-0 z-50 w-full transform transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className="relative w-75 h-full bg-(--background) shadow-2xl flex flex-col border-r border-(--border)">
          
          <div className="p-6 border-b border-(--border) flex items-center justify-between bg-(--background)">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-(--secondary)/10 rounded-lg">
                <LayoutGrid size={20} className="text-(--secondary)" />
              </div>
              <h2 className="font-bold text-lg uppercase tracking-tight text-(--text-primary)">Browse Shop</h2>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--border)/50 rounded-lg transition-all active:scale-95">
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 py-6 no-scrollbar">
            <CategoryNav isMobile={true} closeMenu={() => setIsMenuOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
}