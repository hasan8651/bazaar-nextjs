"use client"; 
import { useSession } from "next-auth/react";
import { Heart, ShoppingCart } from "lucide-react";
import MobileMenu from "./MobileMenu";
import BrandLogo from "../common/BrandLogo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user; 


  return (
    <nav className="sticky top-0 z-50 shadow-md py-4 transition-all duration-300 border-b"
      style={{ 
        backgroundColor: "var(--background)", 
        borderColor: "var(--border)" 
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <MobileMenu />
          
          <div className="flex-shrink-0">
            <BrandLogo width={180} height={80} />
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center gap-5 md:gap-8" style={{ color: "var(--text-primary)" }}>
            {/* pass user data*/}
            <UserMenu user={user} />

            <button className="relative flex flex-col items-center hover:opacity-70 transition">
              <Heart size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
              <span className="text-[10px] font-medium hidden md:block mt-0.5">Wishlist</span>
            </button>

            <button className="relative flex flex-col items-center hover:opacity-70 transition">
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
              <span className="text-[10px] font-medium hidden md:block mt-0.5">Cart</span>
            </button>
          </div>
        </div>

        <div className="md:hidden px-4 pb-3" style={{ backgroundColor: "var(--background)" }}>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}