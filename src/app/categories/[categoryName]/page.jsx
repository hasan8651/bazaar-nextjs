"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import ProductCard from "@/components/product/ProductCard/ProductCard";
import Loading from "@/app/loading";
import Link from "next/link";

export default function CategoryDetailsPage() {
  const params = useParams();
  const categoryName = params.categoryName; // ইউআরএল থেকে নাম পাবে

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // API-তে ক্যাটাগরি অনুযায়ী ডাটা রিকোয়েস্ট
        const res = await axiosInstance.get("/products", {
          params: { category: categoryName }
        });
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) fetchProducts();
  }, [categoryName]);

  if (loading) return <Loading />;

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 capitalize">
        Explore <span className="text-[#0EA5A4]">{categoryName.replace('-', ' ')}</span>
      </h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-24 px-6 text-center">
          {/* Animated Icon Container */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#0EA5A4] opacity-10 blur-3xl rounded-full"></div>
            <div className="relative p-8 rounded-full bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 shadow-inner">
              <svg 
                className="w-16 h-16 text-gray-300 dark:text-gray-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.5" 
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
                />
              </svg>
            </div>
          </div>

          {/* Text Content */}
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            No Products Found
          </h3>
          <p className="text-[var(--text-secondary)] max-w-sm mx-auto mb-8">
            We couldn't find any items in this category right now. Try exploring our other amazing collections!
          </p>

          {/* Action Button */}
          <Link
            href="/allProducts"
            className="px-8 py-3 bg-[#0EA5A4] text-white font-semibold rounded-xl shadow-lg shadow-[#0ea5a440] hover:bg-[#137f7f] hover:-translate-y-1 transition-all duration-300"
          >
            Explore All Products
          </Link>
        </div>
      )}
    </div>
  );
}