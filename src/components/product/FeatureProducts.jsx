"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard/ProductCard";

export default function FeatureProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatureProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/products", {
          params: {
            limit: 12,
            sortBy: "createdAt",
            order: "desc",
          },
        });

        if (response.data && response.data.products) {
          setProducts(response.data.products);
        }
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatureProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-orange-500 mb-2" size={40} />
        <p className="text-gray-500 font-medium">Loading products...</p>
      </div>
    );
  }

  if (error) return null;

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="text-gray-500 mt-2">Selected items from our best categories</p>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all"
        >
          View All <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
        {products && products.length > 0 ? (
          products.map((item) => (
            item ? <ProductCard key={item._id || item.id} product={item} /> : null
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-400">
            No products found.
          </div>
        )}
      </div>
    </section>
  );
}