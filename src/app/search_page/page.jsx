"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import ProductCard from "@/components/product/ProductCard/ProductCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/products?search=${query}`);
        setProducts(res.data.products);
      } catch (err) {
        console.error("Search API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      {/* Header Section */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black text-[var(--text-primary)]">
          Search Results
        </h1>
        <p className="text-[var(--text-secondary)] mt-2 font-medium">
          Showing {products.length} results for <span className="text-[var(--secondary)] italic">"{query}"</span>
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-96">
          <Loader2 size={48} className="text-[var(--secondary)] animate-spin mb-4" />
          <p className="text-[var(--text-secondary)] font-semibold animate-pulse">Finding your products...</p>
        </div>
      ) : products.length === 0 ? (
        /* Empty State - Pro Level */
        <div className="flex flex-col items-center justify-center h-96 bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 text-center shadow-sm">
          <div className="bg-[var(--secondary)]/10 p-6 rounded-full mb-6">
            <AlertCircle size={48} className="text-[var(--secondary)]" />
          </div>
          <h2 className="text-2xl font-black text-[var(--text-primary)] mb-2">No matches found</h2>
          <p className="text-[var(--text-secondary)] max-w-sm mb-6">
            We couldn't find any products matching "{query}". Please check your spelling or try searching for something else.
          </p>
  <button 
  onClick={() => window.history.back()} 
  className="group flex items-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[var(--secondary)]/40 active:scale-95"
>
  <ArrowLeft 
    size={18} 
    className="transition-transform duration-300 group-hover:-translate-x-1" 
  />
  Go Back
</button>
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}