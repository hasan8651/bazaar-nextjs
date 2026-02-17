"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { 
  IoSearchOutline, IoPersonOutline, IoHeartOutline, 
  IoCartOutline, IoMenuOutline, IoCloseOutline, 
  IoLogOutOutline, IoSettingsOutline, IoStorefrontOutline,
  IoChevronDownOutline, IoFlashOutline, IoBagHandleOutline
} from "react-icons/io5";
import BazaarLogo from "./BazarLogo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) setIsVisible(false);
    else setIsVisible(true);
  });

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/shop" },
    { 
      name: "Categories", 
      dropdown: [
        { name: "Handicrafts", path: "/category/handicrafts" },
        { name: "Fashion", path: "/category/fashion" },
        { name: "Electronics", path: "/category/electronics" },
        { name: "Lifestyle", path: "/category/lifestyle" },
      ]
    },
    { name: "Vendors", path: "/vendors" },
  ];

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isVisible ? "visible" : "hidden"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-[var(--border)] z-[100] shadow-sm"
      >
        {/* Top Promotional Bar */}
        <div className="hidden md:block bg-[var(--primary)] text-white py-2 text-center text-[11px] font-semibold tracking-[0.1em] uppercase">
          <p>Global Shipping Available | <span className="text-[var(--accent)]">Flash Sale is Live!</span> | Use Code: <span className="underline">BAZAAR10</span></p>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Mobile Menu Trigger */}
          <div className="flex items-center gap-4 min-w-fit">
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-[var(--primary)] p-1 hover:bg-[var(--surface)] rounded-md transition-all">
              <IoMenuOutline size={28} />
            </button>
            <Link href="/" className="flex-shrink-0">
               <BazaarLogo size={24} />
            </Link>
          </div>

          {/* Optimized Search Bar */}
          <form className="hidden lg:flex flex-1 max-w-xl group">
            <div className="flex w-full items-center bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden group-focus-within:ring-2 group-focus-within:ring-[var(--secondary)]/30 group-focus-within:border-[var(--secondary)] transition-all duration-300">
              <input
                type="text"
                placeholder="Find local crafts & global brands..."
                className="w-full bg-transparent px-6 py-3 outline-none text-sm text-[var(--text-primary)]"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[var(--secondary)] text-white px-6 py-3"
              >
                <IoSearchOutline size={20} />
              </motion.button>
            </div>
          </form>

          {/* Action Hub */}
          <div className="flex items-center gap-2 md:gap-5">
            
            {/* Multi-vendor: Sell Hub */}
            <Link href="/seller/onboarding" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[var(--surface)] text-[var(--primary)] rounded-xl border border-[var(--border)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all duration-300">
              <IoStorefrontOutline size={18} />
              <span className="text-xs font-bold uppercase hidden xl:block">Sell on Bazaar</span>
            </Link>

            {/* Account Management */}
            <div className="relative">
              <button 
                onMouseEnter={() => setProfileDropdown(true)}
                className="flex flex-col items-center text-[var(--text-secondary)] hover:text-[var(--secondary)] transition-colors p-1"
              >
                <div className="relative p-1.5 rounded-full bg-[var(--surface)] border border-transparent group-hover:border-[var(--secondary)]">
                   <IoPersonOutline size={22} />
                </div>
                <span className="text-[9px] font-bold uppercase mt-1 hidden md:block">Account</span>
              </button>

              <AnimatePresence>
                {profileDropdown && (
                  <motion.div
                    onMouseLeave={() => setProfileDropdown(false)}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden p-3 z-[110]"
                  >
                    <div className="px-4 py-4 bg-[var(--surface)] rounded-xl mb-2">
                       <p className="text-sm font-bold text-[var(--primary)] flex items-center gap-2">
                         Md. Mahmudul Hasan <span className="bg-[var(--secondary)]/10 text-[var(--secondary)] text-[8px] px-1.5 py-0.5 rounded uppercase">Lead</span>
                       </p>
                       <p className="text-[11px] text-[var(--text-secondary)] mt-1">codesquad.dev@gmail.com</p>
                    </div>
                    <div className="space-y-1">
                      <ProfileLink icon={<IoSettingsOutline />} label="My Dashboard" href="/dashboard" />
                      <ProfileLink icon={<IoBagHandleOutline />} label="My Orders" href="/orders" />
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-all font-medium italic"><IoLogOutOutline size={18} /> Logout Session</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart & Wishlist with badges */}
            <div className="flex items-center gap-1">
              <NavActionButton icon={<IoHeartOutline size={26} />} count={5} href="/wishlist" color="hover:text-red-500" badgeBg="bg-red-500" />
              <NavActionButton icon={<IoCartOutline size={26} />} count={2} href="/cart" color="hover:text-[var(--secondary)]" badgeBg="bg-[var(--secondary)]" />
            </div>
          </div>
        </div>

        {/* Lower Navigation (Desktop Only) */}
        <nav className="hidden lg:block border-t border-[var(--border)] bg-white/50">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-14">
              <ul className="flex items-center gap-10 text-[12px] font-bold uppercase tracking-widest text-[var(--text-primary)]">
                {navLinks.map((link, idx) => (
                  <li key={idx} className="relative group py-4 cursor-pointer hover:text-[var(--secondary)] transition-all">
                    {link.path ? <Link href={link.path}>{link.name}</Link> : <span className="flex items-center gap-1">{link.name} <IoChevronDownOutline className="group-hover:rotate-180 transition-all" /></span>}
                    
                    {link.dropdown && (
                      <div className="absolute top-full left-0 pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">
                        <div className="w-56 bg-white shadow-2xl rounded-b-2xl border-x border-b border-[var(--border)] p-3 mt-[1px]">
                           {link.dropdown.map((sub, sIdx) => (
                             <Link key={sIdx} href={sub.path} className="block px-4 py-3 hover:bg-[var(--surface)] hover:text-[var(--secondary)] rounded-xl text-xs transition-colors">{sub.name}</Link>
                           ))}
                        </div>
                      </div>
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--secondary)] transition-all group-hover:w-full"></span>
                  </li>
                ))}
              </ul>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-1.5 rounded-full font-black text-[11px] border border-[var(--accent)]/20 shadow-sm"
              >
                <IoFlashOutline className="animate-bounce" size={16} />
                <span className="tracking-tighter">DEALS OF THE HOUR</span>
              </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
            />
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-[160] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <BazaarLogo size={20} />
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-[var(--surface)] rounded-full"><IoCloseOutline size={24} /></button>
              </div>
              <div className="space-y-6">
                {navLinks.map((link, i) => (
                  <Link key={i} href={link.path || "#"} className="block text-lg font-bold text-[var(--primary)] border-b border-[var(--surface)] pb-2">{link.name}</Link>
                ))}
                <Link href="/seller/onboarding" className="block text-[var(--secondary)] font-black text-lg">Sell on Bazaar</Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Padding to prevent content from going under the fixed navbar */}
      <div className="h-20 lg:h-[134px]"></div>
    </>
  );
};

// Helper Components
const ProfileLink = ({ icon, label, href }) => (
  <Link href={href} className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-[var(--surface)] hover:text-[var(--secondary)] rounded-xl transition-all">
    <span className="text-lg">{icon}</span> {label}
  </Link>
);

const NavActionButton = ({ icon, count, href, color, badgeBg }) => (
  <Link href={href} className={`relative p-2 transition-all duration-300 ${color} hover:bg-[var(--surface)] rounded-full`}>
    {icon}
    {count > 0 && (
      <span className={`absolute top-1 right-1 ${badgeBg} text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-lg border border-white`}>
        {count}
      </span>
    )}
  </Link>
);

export default Navbar;