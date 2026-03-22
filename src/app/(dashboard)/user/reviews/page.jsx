"use client";

import React from "react";
import { Star, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const MyReviewsPage = () => {
  const reviews = [
    { id: 1, product: "Apple AirPods Max", rating: 5, date: "Mar 10, 2026", comment: "The build quality is insane. Feels like a premium product from every angle." },
    { id: 2, product: "Logitech MX Master 3S", rating: 4, date: "Feb 28, 2026", comment: "Ergonomics are top-notch. Could be a bit more silent though." },
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">My Reviews</h1>
        <p className="text-[var(--text-secondary)] mt-1">Manage and update your shared feedback.</p>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <motion.div 
            key={review.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 transition-all duration-300"
          >
            <div className="flex flex-col gap-4">
              {/* Top Row: Product Name & Date */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{review.product}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{review.date}</p>
                </div>
                {/* Static Stars for simplicity */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-[var(--border)]"} />
                  ))}
                </div>
              </div>

              {/* Comment */}
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic">
                "{review.comment}"
              </p>

              {/* Bottom Row: Actions */}
              <div className="flex items-center gap-6 mt-2">
                <button className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)] hover:text-[var(--secondary)] transition-colors">
                  <Edit2 size={13} /> Edit Review
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 transition-colors">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyReviewsPage;