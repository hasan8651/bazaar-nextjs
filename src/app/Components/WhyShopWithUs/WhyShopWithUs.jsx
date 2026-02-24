import React from 'react';
import {
  Truck, ShieldCheck, Zap, Headphones,
  RotateCcw, CreditCard, Award, BadgeCheck, Star, Shield
} from 'lucide-react';

const WhyShopWithUs = () => {
  const features = [
    { id: 1, title: "Free Delivery", desc: "Free shipping on orders over $50", icon: Truck, color: "text-green-600 dark:text-green-400 bg-green-100/50 dark:bg-green-950/30" },
    { id: 2, title: "Secure Payment", desc: "100% secure payment processing", icon: ShieldCheck, color: "text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-950/30" },
    { id: 3, title: "Genuine Products", desc: "Directly from top brands", icon: BadgeCheck, color: "text-amber-600 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-950/30" },
    { id: 4, title: "24/7 Support", desc: "Always here to help you", icon: Headphones, color: "text-purple-600 dark:text-purple-400 bg-purple-100/50 dark:bg-purple-950/30" },
    { id: 5, title: "Easy Returns", desc: "7-day easy return policy", icon: RotateCcw, color: "text-red-600 dark:text-red-400 bg-red-100/50 dark:bg-red-950/30" },
    { id: 6, title: "Best Prices", desc: "Guaranteed lowest prices", icon: Zap, color: "text-yellow-600 dark:text-yellow-400 bg-yellow-100/50 dark:bg-yellow-950/30" },
    { id: 7, title: "Verified Sellers", desc: "Top rated trusted partners", icon: Award, color: "text-indigo-600 dark:text-indigo-400 bg-indigo-100/50 dark:bg-indigo-950/30" },
    { id: 8, title: "Secure Checkout", desc: "Advanced fraud protection", icon: Shield, color: "text-cyan-600 dark:text-cyan-400 bg-cyan-100/50 dark:bg-cyan-950/30" },
  ];

  const stats = [
    { label: "50K+", sub: "Happy Customers" },
    { label: "100K+", sub: "Products Sold" },
    { label: "99%", sub: "Satisfaction Rate" },
    { label: "24/7", sub: "Customer Support" },
  ];

  return (
    <section className="py-20 md:py-24 lg:py-28 bg-[var(--background)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--primary)]">
            Why Shop <span className="text-[var(--secondary)]">With Us?</span>
          </h2>
          <p className="mt-5 text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            We make shopping simple, safe, and enjoyable with features built for you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-28">
          {features.map((f) => (
            <div
              key={f.id}
              className="group relative p-8 md:p-10 rounded-2xl bg-[var(--surface)] border border-[var(--border)] 
                         flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-3 
                         hover:border-[var(--secondary)]/40 hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(14,165,164,0.15)]"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${f.color} flex items-center justify-center mb-6 shadow-sm 
                               group-hover:scale-105 transition-transform duration-400`}>
                <f.icon size={40} strokeWidth={1.8} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-[var(--primary)] mb-3 group-hover:text-[var(--secondary)] transition-colors">
                {f.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 md:p-10 text-center 
                         transition-all duration-300 hover:shadow-lg hover:border-[var(--secondary)]/30"
            >
              <h4 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--primary)] mb-3 tracking-tight">
                {s.label}
              </h4>
              <p className="text-sm md:text-base font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-4 md:gap-6 px-8 md:px-12 py-5 
                          bg-[var(--surface)] border border-[var(--border)] rounded-full shadow-sm 
                          dark:bg-slate-800/50 dark:border-slate-700">
            <ShieldCheck className="text-[var(--secondary)]" size={28} />
            <span className="text-[var(--primary)] font-semibold text-base md:text-lg whitespace-nowrap">
              Trusted by thousands of happy customers
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-[var(--accent)] text-[var(--accent)]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyShopWithUs;