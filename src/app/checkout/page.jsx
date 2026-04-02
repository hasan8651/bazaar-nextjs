"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft,
  MapPin,
  Phone,
  User
} from "lucide-react";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const name = searchParams.get("name") || "Premium Product";
  const price = searchParams.get("price") || "0.00";
  const image = searchParams.get("image") || "/placeholder.jpg";

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully! 🎉", {
      style: {
        borderRadius: '16px',
        background: 'var(--surface)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border)'
      },
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] py-8 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Navigation */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-secondary transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium uppercase tracking-widest text-[10px]">Back to Store</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Checkout Form */}
          <div className="lg:col-span-7 space-y-8">
            <header className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight italic uppercase italic">Checkout.</h1>
              <p className="text-[var(--text-secondary)] text-sm tracking-wide">Enter your details to finalize the purchase.</p>
            </header>

            {/* Shipping Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Truck className="text-secondary" size={20} />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Shipping Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={16} />
                  <input type="text" placeholder="Full Name" className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={16} />
                  <input type="text" placeholder="Phone Number" className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" />
                </div>
                <div className="relative md:col-span-2">
                  <MapPin className="absolute left-4 top-4 text-[var(--text-secondary)]" size={16} />
                  <textarea rows="3" placeholder="Full Shipping Address" className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all resize-none"></textarea>
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <CreditCard className="text-secondary" size={20} />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Payment Method</h2>
              </div>
              
              <div className="p-5 bg-secondary/5 border-2 border-secondary rounded-2xl flex justify-between items-center group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white">
                    <Truck size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-bold uppercase tracking-wider">Cash on Delivery</span>
                    <span className="text-[10px] text-[var(--text-secondary)]">Pay when you receive the product</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border-[6px] border-secondary"></div>
              </div>
            </section>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-12">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] p-8 shadow-2xl shadow-black/5 relative overflow-hidden">
              
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

              <h2 className="text-sm font-black mb-8 uppercase tracking-[0.3em] text-secondary">Summary</h2>
              
              {/* Product Preview - Enlarged & Enhanced */}
              <div className="flex gap-6 mb-8 items-start">
                <div className="w-32 h-32 bg-white rounded-3xl overflow-hidden p-3 border border-[var(--border)] shadow-inner shrink-0 flex items-center justify-center group">
                  <motion.img 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="flex flex-col justify-center py-2">
                  <h4 className="text-base font-bold leading-tight mb-2 line-clamp-2">{name}</h4>
                  <div className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit">
                    Premium Pack
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm tracking-wide">
                  <span className="text-[var(--text-secondary)] uppercase text-[11px] font-bold">Subtotal</span>
                  <span className="font-bold">${price}</span>
                </div>
                <div className="flex justify-between text-sm tracking-wide">
                  <span className="text-[var(--text-secondary)] uppercase text-[11px] font-bold">Shipping</span>
                  <span className="text-green-500 font-bold uppercase text-[11px]">Free</span>
                </div>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent my-6"></div>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black uppercase tracking-widest">Grand Total</span>
                  <div className="text-right">
                    <span className="block text-[10px] text-secondary font-bold uppercase tracking-tighter -mb-1">USD</span>
                    <span className="text-4xl font-black tracking-tighter text-secondary">${price}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                onClick={handlePlaceOrder}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-16 bg-secondary text-white font-black rounded-2xl shadow-xl shadow-secondary/20 transition-all duration-300 uppercase tracking-[0.2em] text-[12px] flex items-center justify-center gap-3 group"
              >
                Complete Purchase
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Security Badge */}
              <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-center gap-4 opacity-50">
                <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-green-500" />
                  Secure
                </div>
                <div className="w-1 h-1 bg-[var(--border)] rounded-full"></div>
                <div className="text-[9px] font-bold uppercase tracking-widest">
                  Original Products
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;