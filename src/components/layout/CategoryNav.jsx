"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ChevronRight } from "lucide-react";

export default function CategoryNav({ isMobile = false, closeMenu }) {
  const pathname = usePathname();

  const categories = [
    { name: "Electronics", href: "/category/electronics" },
    { name: "Fashion", href: "/category/fashion" },
    { name: "Grocery", href: "/category/grocery" },
    { name: "Home & Living", href: "/category/home" },
    { name: "Beauty", href: "/category/beauty" },
    { name: "Health", href: "/category/health" },
    { name: "Sports", href: "/category/sports" },
    { name: "Automotive", href: "/category/automotive" },
    { name: "Books", href: "/category/books" },
    { name: "Toys", href: "/category/toys" },
    { name: "Gadgets", href: "/category/gadgets" },
    { name: "Furniture", href: "/category/furniture" },
  ];

  // ---------- MOBILE ----------
  
if (isMobile) {
  return (
    <div className="flex flex-col gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={cat.href}
          onClick={closeMenu}
          className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--secondary)]/10 hover:border-[var(--secondary)] transition-all group"
        >
        
          <span className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wide">
            {cat.name}
          </span>
          
       
          <ChevronRight 
            size={16} 
            className="text-[var(--text-secondary)] group-hover:text-[var(--secondary)] transition-colors" 
          />
        </Link>
      ))}

      <Link
        href="/categories"
        onClick={closeMenu}
        className="flex items-center justify-center gap-2 p-4 mt-2 bg-[var(--secondary)] text-white rounded-xl font-black text-xs uppercase tracking-[0.1em] shadow-lg shadow-[var(--secondary)]/20 hover:opacity-90 transition-all"
      >
        <LayoutGrid size={16} />
        View All Categories
      </Link>
    </div>
  );
}

  // ---------- DESKTOP ----------
  return (
<nav className="relative flex items-center w-full h-12">
    {/* Category list - scrollable */}
    <div className="flex items-center gap-5 lg:gap-7 overflow-x-auto no-scrollbar flex-1 pr-32"> {/* ← pr-32 দিয়ে ALL-এর জন্য জায়গা রাখা */}
      {categories.map((cat) => {
        const active = pathname === cat.href;

        return (
<Link
  key={cat.name}
  href={cat.href}
  className={`relative whitespace-nowrap text-[12px] uppercase tracking-widest transition-all duration-300
    ${active 
      ? "text-[var(--secondary)]" 
      : "text-[var(--text-secondary)] hover:text-[var(--secondary)]"
    }
  `}
>
  {/* Name with subtle scale effect on hover */}
  <span className={`inline-block transition-transform duration-300 ${!active && "hover:scale-105"}`}>
    {cat.name}
  </span>

  {/* Smooth Underline */}
  <span 
    className={`absolute -bottom-1 left-0 h-[2px] bg-[var(--secondary)] transition-all duration-300 ease-out
    ${active ? "w-full" : "w-0 group-hover:w-full"}`}
  ></span>
</Link>
        );
      })}
    </div>

    {/* Sticky ALL button */}
    <div className="absolute right-0 top-0 bottom-0 flex items-center pr-4 lg:pr-8 bg-gradient-to-l from-[var(--background)] via-[var(--background)] to-transparent pl-10 pointer-events-none">
      <div className="pointer-events-auto">
        <Link
          href="/categories"
          className="flex items-center gap-2 px-5 py-1.5 bg-[var(--secondary)] text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all whitespace-nowrap"
        >
          <LayoutGrid size={15} />
          ALL
        </Link>
      </div>
    </div>
  </nav>
  );
}
