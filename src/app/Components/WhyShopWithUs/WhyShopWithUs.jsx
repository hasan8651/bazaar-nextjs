import React from 'react';
import {
  Truck, ShieldCheck, Zap, Headphones,
  RotateCcw, BadgeCheck, Award, Shield, Star
} from 'lucide-react';

const WhyShopWithUs = () => {
  const features = [
    { id: 1, title: "Free Delivery", desc: "On all orders over $50", icon: Truck, color: "from-emerald-400 to-cyan-500" },
    { id: 2, title: "Secure Payment", desc: "100% secure processing", icon: ShieldCheck, color: "from-blue-500 to-indigo-600" },
    { id: 3, title: "Genuine Goods", desc: "Verified brand products", icon: BadgeCheck, color: "from-orange-400 to-red-500" },
    { id: 4, title: "24/7 Support", desc: "Always here to help", icon: Headphones, color: "from-purple-500 to-pink-600" },
    { id: 5, title: "Easy Returns", desc: "7-day return policy", icon: RotateCcw, color: "from-rose-500 to-orange-500" },
    { id: 6, title: "Best Prices", desc: "Guaranteed lowest rates", icon: Zap, color: "from-yellow-400 to-orange-500" },
    { id: 7, title: "Verified Sellers", desc: "Trusted global partners", icon: Award, color: "from-indigo-500 to-blue-700" },
    { id: 8, title: "Fraud Shield", desc: "Advanced protection", icon: Shield, color: "from-cyan-500 to-blue-500" },
  ];

  const stats = [
    { label: "50K+", sub: "Happy Customers" },
    { label: "100K+", sub: "Products Sold" },
    { label: "99.9%", sub: "Service Rating" },
    { label: "24/7", sub: "Live Support" },
  ];

  return (
    <section className="py-8 relative overflow-hidden bg-[var(--background)]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--secondary)]/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-black uppercase tracking-[0.3em] text-[var(--secondary)] bg-[var(--secondary)]/10 rounded-full">
            Our Excellence
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter">
            WHY SHOP <span className="text-[var(--secondary)] italic">WITH US</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto opacity-80 font-medium">
            Experience the future of online shopping with our world-class service standards.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {features.map((f) => (
            <div
              key={f.id}
              className="group relative p-8 rounded-[2.5rem] bg-[var(--surface)] border border-[var(--border)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--secondary)]/10 overflow-hidden"
            >
              {/* Hover Background Glow */}
              <div className={`absolute -inset-px bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-8 text-white shadow-lg shadow-inherit/20 group-hover:scale-110 transition-transform duration-500`}>
                <f.icon size={32} strokeWidth={2} />
              </div>

              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--secondary)] transition-colors">
                {f.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-medium opacity-70">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section with Glassmorphism */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 p-8 md:p-12 rounded-[3rem] bg-[var(--surface)] border border-[var(--border)] shadow-sm backdrop-blur-sm mb-20">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center relative group">
              {idx !== 0 && <div className="hidden lg:block absolute left-0 top-1/4 bottom-1/4 w-px bg-[var(--border)] opacity-50" />}
              <h4 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-2 tracking-tighter group-hover:scale-110 transition-transform">
                {s.label}
              </h4>
              <p className="text-[10px] md:text-xs font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] opacity-60">
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badge / Social Proof */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex -space-x-3">
             {[1, 2, 3, 4, 5].map((i) => (
               <div key={i} className="w-12 h-12 rounded-full border-4 border-[var(--background)] bg-gray-200 overflow-hidden shadow-sm">
                 <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
               </div>
             ))}
             <div className="w-12 h-12 rounded-full border-4 border-[var(--background)] bg-[var(--secondary)] flex items-center justify-center text-white text-xs font-bold">
               +50k
             </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 bg-[var(--surface)] border border-[var(--border)] px-8 py-4 rounded-full shadow-xl">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-orange-400 text-orange-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-[var(--text-primary)]">
              Trusted by 50,000+ happy shoppers worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyShopWithUs;