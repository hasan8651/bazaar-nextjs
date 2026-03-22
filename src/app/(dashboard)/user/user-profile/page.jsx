"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Edit3, Lock, X, Loader2, User, Phone, 
  MapPin, Mail, ShieldCheck, CheckCircle2 
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";
import Loading from "@/app/loading";

const MyProfile = () => {
  // Extract 'update' from useSession to refresh session data globally
  const { data: session, update: updateSession } = useSession();
  const fileInputRef = useRef(null);
  
  // State Management
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imgUploading, setImgUploading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: ""
  });

  /**
   * 1. Fetch Profile Data from Backend
   * Runs whenever the session is available
   */
  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.email) {
        try {
          const res = await axiosInstance.get(`/users/profile/${session.user.email}`);
          if (res.data.success) {
            const d = res.data.data;
            setProfile({
              name: d.name || "",
              email: d.email || "",
              phone: d.phone || "Not set",
              address: d.address || "Not set",
              image: d.image || ""
            });
          }
        } catch (error) {
          console.error("Fetch Profile Error:", error);
          toast.error("Failed to load profile data");
        } finally {
          setFetching(false);
        }
      }
    };
    fetchProfile();
  }, [session]);

  /**
   * 2. Image Upload Logic (ImgBB)
   * Uploads to ImgBB first, then updates Database and NextAuth Session
   */
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File size validation (Max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image size must be under 2MB");
    }

    setImgUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Step A: Upload to ImgBB
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 
      const resImg = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      
      const imgData = await resImg.json();

      if (imgData.success) {
        const imageUrl = imgData.data.url;

        // Step B: Update Image URL in Backend Database
        const res = await axiosInstance.put(`/users/update-profile`, { 
          image: imageUrl 
        });

        if (res.data.success) {
          // Step C: Update local state
          setProfile(prev => ({ ...prev, image: imageUrl }));

          // Step D: Update NextAuth Session so Navbar/Dashboard updates instantly
          await updateSession({
            ...session,
            user: {
              ...session?.user,
              image: imageUrl,
            },
          });

          toast.success("Profile picture updated everywhere!");
        }
      } else {
        toast.error("ImgBB upload failed");
      }
    } catch (err) {
      console.error("Upload Process Error:", err);
      toast.error("Something went wrong during upload");
    } finally {
      setImgUploading(false);
    }
  };

  /**
   * 3. Profile Info & Password Update Logic
   * Handles both profile details and security updates
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const endpoint = modal === 'profile' ? '/users/update-profile' : '/users/update-password';
      const res = await axiosInstance.put(endpoint, data);
      
      if (res.data.success) {
        if (modal === 'profile') {
          // Update local state
          setProfile(prev => ({ ...prev, ...data }));
          
          // Update session for Name changes
          await updateSession({
            ...session,
            user: { ...session?.user, name: data.name },
          });
        }
        
        toast.success(res.data.message || "Updated successfully!");
        setModal(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
   <Loading></Loading>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10 transition-all duration-300">
      <Toaster position="top-center" />

      {/* --- Profile Header Section --- */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-[var(--surface)] to-[var(--background)] border border-[var(--border)] p-8 rounded-[2.5rem] shadow-xl mb-8 group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--secondary)] opacity-5 blur-3xl rounded-full -mr-10 -mt-10" />
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative group/avatar">
            <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-[var(--secondary)]/20 shadow-2xl transition-transform group-hover/avatar:scale-105 duration-500 bg-gray-100">
              <img 
                src={profile.image || "/avatar.png"} 
                alt="User Profile" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "/avatar.png"; }} 
              />
              {imgUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="animate-spin text-white" />
                </div>
              )}
            </div>
            {/* Hidden Input for Image Selection */}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-3 -right-3 p-3 bg-[var(--secondary)] text-white rounded-2xl shadow-xl hover:rotate-12 transition-all active:scale-90"
            >
              <Camera size={18} />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <h1 className="text-3xl font-black text-[var(--text-primary)]">{profile.name}</h1>
              <CheckCircle2 size={20} className="text-blue-500" />
            </div>
            <p className="text-[var(--text-secondary)] font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
              <Mail size={14} /> {profile.email}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button onClick={() => setModal('profile')} className="px-6 py-2.5 bg-[var(--secondary)] text-white rounded-xl font-bold shadow-lg shadow-[var(--secondary)]/20 hover:opacity-90 transition-all flex items-center gap-2">
                <Edit3 size={16} /> Edit Profile
              </button>
              <button onClick={() => setModal('security')} className="px-6 py-2.5 bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] rounded-xl font-bold hover:bg-[var(--border)] transition-all flex items-center gap-2">
                <Lock size={16} /> Security
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- Information Cards Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Full Name", val: profile.name, icon: User, color: "bg-blue-500/10 text-blue-500" },
          { label: "Official Email", val: profile.email, icon: Mail, color: "bg-purple-500/10 text-purple-500" },
          { label: "Contact Number", val: profile.phone, icon: Phone, color: "bg-orange-500/10 text-orange-500" },
          { label: "Default Address", val: profile.address, icon: MapPin, color: "bg-green-500/10 text-green-500" },
        ].map((item, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[2rem] flex items-center gap-5 hover:border-[var(--secondary)]/50 transition-colors group"
          >
            <div className={`p-4 rounded-2xl ${item.color} group-hover:scale-110 transition-transform`}>
              <item.icon size={22} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[2px] text-[var(--text-secondary)] opacity-60">{item.label}</p>
              <p className="text-base font-bold text-[var(--text-primary)] truncate mt-1">{item.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Edit/Security Modal --- */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[var(--background)] border border-[var(--border)] w-full max-w-lg p-10 rounded-[3rem] relative z-10 shadow-2xl"
            >
              <button onClick={() => setModal(null)} className="absolute top-8 right-8 p-2 rounded-full hover:bg-[var(--surface)] transition-colors"><X size={24} /></button>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[var(--secondary)]/10 text-[var(--secondary)] rounded-2xl">
                  {modal === 'profile' ? <User size={24} /> : <ShieldCheck size={24} />}
                </div>
                <h2 className="text-2xl font-black text-[var(--text-primary)]">Update {modal === 'profile' ? 'Profile' : 'Security'}</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {modal === 'profile' ? (
                  <>
                    <InputField label="Full Name" name="name" icon={User} defaultValue={profile.name} placeholder="Your name" />
                    <InputField label="Phone Number" name="phone" icon={Phone} defaultValue={profile.phone} placeholder="Contact number" />
                    <InputField label="Residential Address" name="address" icon={MapPin} defaultValue={profile.address} placeholder="Shipping address" />
                  </>
                ) : (
                  <>
                    <InputField label="Current Password" name="oldPassword" icon={Lock} type="password" placeholder="••••••••" required />
                    <InputField label="New Password" name="newPassword" icon={ShieldCheck} type="password" placeholder="••••••••" required />
                  </>
                )}
                
                <button type="submit" disabled={loading} className="w-full py-5 bg-[var(--secondary)] text-white font-black rounded-2xl hover:brightness-110 shadow-xl shadow-[var(--secondary)]/20 transition-all flex justify-center items-center gap-2 active:scale-95 disabled:opacity-50">
                  {loading ? <Loader2 className="animate-spin" /> : "Confirm Changes"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-[11px] font-black uppercase text-[var(--text-secondary)] ml-3 tracking-wider">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--secondary)] transition-colors">
        <Icon size={18} />
      </div>
      <input 
        className="w-full pl-12 pr-6 py-4 bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[var(--secondary)]/50 focus:border-[var(--secondary)] transition-all placeholder:opacity-30" 
        {...props} 
      />
    </div>
  </div>
);

export default MyProfile;