"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import ProductCard from "@/components/product/ProductCard/ProductCard";
import Loading from "@/app/loading";
import { ArrowRight, Search, SlidersHorizontal, Star, Tag } from "lucide-react";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/products", {
          params: { page, limit: 12, search: debouncedSearch, category, minPrice, maxPrice, rating, sortBy: "createdAt", order: "desc" },
        });
        if (res.data) {
          setProducts(res.data.products || []);
          setTotalPages(res.data.totalPages || 1);
        }
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, debouncedSearch, category, minPrice, maxPrice, rating]);

  if (loading) return <Loading />;

  // Reusable Modern Input Style
  const inputBase = "w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0EA5A4] transition-all duration-300 placeholder:text-gray-400";

  return (
    <section className="min-h-screen py-16 px-4 md:px-10 lg:px-20 bg-[var(--background)]">
      
      {/* --- Modern Header Section --- */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Premium <span className="text-[#0EA5A4]">Collections</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Experience the future of shopping with PrimeMart. Curated quality products just for you.
        </p>
      </div>

      {/* --- Advanced Search & Filter Bar (SaaS Style) --- */}
      <div className="max-w-[1400px] mx-auto mb-12 p-6 rounded-[2rem] bg-white dark:bg-slate-900/40 border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-none backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-4 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0EA5A4] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search everything..."
              className={`${inputBase} pl-12`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

         {/* Category Select */}
          <div className="md:col-span-2 relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className={`${inputBase} pl-12 appearance-none cursor-pointer`}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="gadgets">Gadgets</option>
              <option value="fashion">Fashion</option>
              <option value="accessories">Accessories</option>
              <option value="beauty">Beauty & Care</option>
              <option value="health">Health</option>
              <option value="grocery">Grocery</option>
              <option value="home-living">Home & Living</option>
              <option value="furniture">Furniture</option>
              <option value="sports">Sports & Outdoors</option>
              <option value="automotive">Automotive</option>
              <option value="books">Books</option>
              <option value="toys">Toys & Games</option>
            </select>
          </div>

          {/* Price Range Group */}
          <div className="md:col-span-4 flex gap-3">
            <input
              type="number"
              placeholder="Min Price"
              className={inputBase}
              value={minPrice}
              onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
            />
            <input
              type="number"
              placeholder="Max Price"
              className={inputBase}
              value={maxPrice}
              onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
            />
          </div>

          {/* Ratings */}
          <div className="md:col-span-2 relative">
            <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <select
              value={rating}
              onChange={(e) => { setRating(e.target.value); setPage(1); }}
              className={`${inputBase} pl-12 appearance-none cursor-pointer`}
            >
              <option value="">Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- Product Grid --- */}
      <div className="max-w-[1400px] mx-auto">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((item) => (
              <div key={item._id} className="transform hover:-translate-y-2 transition-all duration-300">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="inline-flex p-6 rounded-full bg-gray-100 dark:bg-slate-800 mb-4 text-gray-400">
              <SlidersHorizontal size={40} />
            </div>
            <h3 className="text-xl font-semibold">No products matched your filters</h3>
            <p className="text-gray-500">Try adjusting your search or category.</p>
          </div>
        )}
      </div>

      {/* --- Pagination --- */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-20">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-[#0EA5A4] disabled:opacity-30 transition-all shadow-sm"
          >
            <ArrowRight className="rotate-180" size={24} />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-400">Page</span>
            <span className="text-lg font-bold text-[#0EA5A4]">{page}</span>
            <span className="text-sm font-medium text-gray-400">of {totalPages}</span>
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-4 rounded-2xl bg-[#0EA5A4] text-white hover:opacity-90 disabled:opacity-30 transition-all shadow-lg shadow-[#0ea5a440]"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
}