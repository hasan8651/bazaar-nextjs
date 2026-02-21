import BazaarLogo from "./BazarLogo";
import { ShoppingCart, Heart, User } from "lucide-react";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const dummyUser = {
    name :'dummy user',
    avatar:'https://i.ibb.co.com/6Rkxc5p8/usericon.png'
  }
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main row */}
        <div className="flex h-16 items-center justify-between">
          <MobileMenu></MobileMenu>
          {/* Logo */}
          <div className="flex-shrink-0">
            <BazaarLogo />
          </div>

          {/* DESKTOP ONLY: Search bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5 md:gap-8">
            <UserMenu user={dummyUser}></UserMenu>

            <button className="relative flex flex-col items-center text-gray-700 hover:text-black transition">
              <Heart size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
              <span className="text-[10px] font-medium hidden md:block mt-0.5">
                Wishlist
              </span>
            </button>

            <button className="relative flex flex-col items-center text-gray-700 hover:text-black transition">
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
              <span className="text-[10px] font-medium hidden md:block mt-0.5">
                Cart
              </span>
            </button>
          </div>
        </div>

        {/* MOBILE ONLY */}
        <div className="md:hidden px-4 pb-3 bg-white">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
