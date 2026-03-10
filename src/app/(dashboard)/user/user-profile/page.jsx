"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Edit3, Lock, X, Loader2, User, Phone, MapPin, Mail } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const MyProfile = () => {
  const { data: session } = useSession();
  const user = session?.user;
  
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || "Akash Sarker",
    email: user?.email || "akashsarker2478@gmail.com",
    phone: "+880 1700-000000",
    address: "12/A, Dhanmondi, Dhaka, Bangladesh"
  });

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModal(null);
      toast.success("Updated successfully!");
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <Toaster />

      {/* Header Section */}
      <div className="bg-[var(--surface)] border border-[var(--border)] p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-[var(--background)] shadow-2xl">
            <img src={user?.image || "/avatar.png"} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-2 -right-2 p-2 bg-[var(--secondary)] text-white rounded-lg shadow-lg hover:scale-110 transition-transform">
            <Camera size={16} />
          </button>
        </div>
        
        <div className="flex-1 text-center md:text-left min-w-0">
          <h1 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] truncate">{profile.name}</h1>
          <p className="text-[var(--text-secondary)] font-medium break-all">{profile.email}</p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button onClick={() => setModal('profile')} className="flex-1 px-4 py-3 bg-[var(--secondary)] text-white rounded-xl font-bold hover:opacity-90 flex items-center justify-center gap-2">
            <Edit3 size={16} /> Edit
          </button>
   <button 
  onClick={() => setModal('security')} 
  className="flex-1 px-4 py-3 bg-[var(--secondary)]/10 text-[var(--secondary)] rounded-xl font-bold hover:bg-[var(--secondary)]/20 transition-all flex items-center justify-center gap-2"
>
  <Lock size={16} /> Security
</button>
        </div>
      </div>

      {/* User Information */}
      <div className="bg-[var(--surface)] border border-[var(--border)] p-6 md:p-8 rounded-[2rem]">
        <h2 className="text-lg font-black mb-6 text-[var(--text-primary)] flex items-center gap-2">
            <User size={18} className="text-[var(--secondary)]" /> Personal Information
        </h2>
        <div className="space-y-4">
          {[ 
            { label: "Full Name", val: profile.name, icon: User },
            { label: "Email Address", val: profile.email, icon: Mail },
            { label: "Phone Number", val: profile.phone, icon: Phone },
            { label: "Shipping Address", val: profile.address, icon: MapPin }
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-[var(--background)] rounded-2xl border border-[var(--border)]">
              <div className="p-2.5 mt-1 bg-[var(--surface)] rounded-xl text-[var(--secondary)]"><item.icon size={18}/></div>
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase text-[var(--text-secondary)] tracking-widest">{item.label}</p>
                <p className="font-bold text-[var(--text-primary)] text-sm md:text-base break-all mt-0.5">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - Added back */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[var(--background)] border border-[var(--border)] w-full max-w-md p-8 rounded-[2rem] relative z-10 shadow-2xl">
              <button onClick={() => setModal(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-[var(--surface)]"><X size={20} /></button>
              <h2 className="text-2xl font-black mb-6 text-[var(--text-primary)]">Update {modal === 'profile' ? 'Profile' : 'Security'}</h2>
              <form onSubmit={handleSave} className="space-y-4">
                {modal === 'profile' ? (
                  <>
                    <input className="w-full p-4 bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-xl font-bold outline-none focus:ring-2 focus:ring-[var(--secondary)]" placeholder="Name" defaultValue={profile.name} />
                    <input className="w-full p-4 bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-xl font-bold outline-none focus:ring-2 focus:ring-[var(--secondary)]" placeholder="Phone" defaultValue={profile.phone} />
                    <input className="w-full p-4 bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-xl font-bold outline-none focus:ring-2 focus:ring-[var(--secondary)]" placeholder="Address" defaultValue={profile.address} />
                  </>
                ) : (
                  <>
                    <input type="password" className="w-full p-4 bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-xl font-bold outline-none focus:ring-2 focus:ring-[var(--secondary)]" placeholder="Current Password" />
                    <input type="password" className="w-full p-4 bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-xl font-bold outline-none focus:ring-2 focus:ring-[var(--secondary)]" placeholder="New Password" />
                  </>
                )}
                <button type="submit" className="w-full py-4 bg-[var(--secondary)] text-white font-black rounded-xl hover:opacity-90 flex justify-center items-center gap-2">
                  {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyProfile;