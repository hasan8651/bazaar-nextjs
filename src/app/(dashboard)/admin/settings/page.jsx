"use client";

import React, { useEffect, useState } from "react";
import { User, Camera, Percent, Save, Edit3, Lock, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import toast, { Toaster } from "react-hot-toast"; // 1. Import Toast

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // New state for saving loader
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    role: "",
    _id: ""
  });

  // Fetch Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/users/profile/akashsarker2478@gmail.com");
        if (response.data.success) {
          setAdminData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // 2. Handle Save Function
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulated API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Show Success Toast
      toast.success("Settings updated successfully!", {
        style: {
          borderRadius: '16px',
          background: '#333',
          color: '#fff',
          fontWeight: 'bold'
        },
      });

      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update settings.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-[#00A99D]" size={40} />
    </div>
  );

  return (
    <div className="p-4 md:p-10 space-y-8 min-h-screen bg-[var(--background)] pb-32">
      {/* 3. Add Toaster Component anywhere in the return */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">Settings</h1>
          <p className="text-sm font-bold text-[var(--text-secondary)] mt-1">Manage configurations.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-[#00A99D] text-white px-6 py-3 rounded-2xl font-black active:scale-95 transition-all"
          >
            <Edit3 size={18} /> Edit Settings
          </button>
        )}
      </div>

      {/* Settings Content... (Same as before) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Platform Settings Block */}
         <div className="bg-[var(--surface)] border border-[var(--border)] p-6 md:p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="text-lg font-black text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <Percent className="text-[#00A99D]" /> Platform Settings
          </h3>
          <label className="text-[10px] font-black uppercase text-[var(--text-secondary)] block mb-2">Commission Rate (%)</label>
          <input 
            type="number" 
            defaultValue="10" 
            disabled={!isEditing}
            className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] font-black disabled:opacity-50" 
          />
        </div>

        {/* Profile Block */}
        <div className="bg-[var(--surface)] border border-[var(--border)] p-6 md:p-8 rounded-[2.5rem] shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-lg font-black text-[var(--text-primary)] flex items-center gap-2"><User className="text-blue-500" /> Admin Profile</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-[10px] font-black uppercase">{adminData.role}</span>
          </div>
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-[var(--background)] overflow-hidden">
               <img src={`https://ui-avatars.com/api/?name=${adminData.name}&background=00A99D&color=fff`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-4">
            <input 
              type="text" 
              disabled={!isEditing} 
              value={adminData.name} 
              onChange={(e) => setAdminData({...adminData, name: e.target.value})}
              className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] font-bold disabled:opacity-50" 
            />
            <input type="email" disabled value={adminData.email} className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] font-bold opacity-50" />
          </div>
        </div>
      </div>

      {/* Fixed Save Bar */}
      {isEditing && (
        <div className="fixed bottom-0 left-0 w-full p-4 z-50 bg-[var(--background)]/80 backdrop-blur-xl border-t border-[var(--border)]">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <p className="text-[10px] font-black text-[#00A99D] uppercase tracking-widest hidden sm:block">Unsaved changes</p>
                <div className="flex gap-4 w-full sm:w-auto">
                    <button onClick={() => setIsEditing(false)} className="flex-1 px-6 py-4 rounded-2xl font-black text-slate-500">Cancel</button>
                    <button 
                      onClick={handleSave} 
                      disabled={isSaving}
                      className="flex-[2] flex items-center justify-center gap-2 bg-[#00A99D] text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-[#00A99D]/20"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Save Changes</>}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Settings;