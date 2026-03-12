"use client";

import React, { useState } from "react";
import { User, Camera, Percent, Save, Edit3, X, Lock } from "lucide-react";

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-4 md:p-10 space-y-8 min-h-screen bg-[var(--background)] pb-32">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">Settings</h1>
          <p className="text-sm font-bold text-[var(--text-secondary)] mt-1">Manage configurations.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-[#00A99D] text-white px-6 py-3 rounded-2xl font-black w-full sm:w-auto justify-center active:scale-95 transition-all"
          >
            <Edit3 size={18} /> Edit Settings
          </button>
        )}
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Platform Settings */}
        <div className="bg-[var(--surface)] border border-[var(--border)] p-6 md:p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="text-lg font-black text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <Percent className="text-[#00A99D]" /> Platform Settings
          </h3>
          <div>
            <label className="text-[10px] font-black uppercase text-[var(--text-secondary)] block mb-2">Commission Rate (%)</label>
            <input 
              type="number" 
              defaultValue="10" 
              disabled={!isEditing}
              className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] font-black text-[var(--text-primary)] disabled:opacity-50 focus:border-[#00A99D] focus:outline-none" 
            />
          </div>
        </div>

        {/* Admin Profile */}
        <div className="bg-[var(--surface)] border border-[var(--border)] p-6 md:p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="text-lg font-black text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <User className="text-blue-500" /> Admin Profile
          </h3>
          
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[var(--border)] flex items-center justify-center overflow-hidden border-4 border-[var(--background)]">
                 <img src="https://ui-avatars.com/api/?name=Akash+Sarker&background=00A99D&color=fff" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              {isEditing && (
                <div className="absolute bottom-0 right-0 p-2.5 bg-[#00A99D] text-white rounded-full border-4 border-[var(--surface)] cursor-pointer">
                  <Camera size={14} />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <input type="text" disabled={!isEditing} defaultValue="Akash Sarker" className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] font-bold text-[var(--text-primary)] disabled:opacity-50" />
            <input type="email" disabled={!isEditing} defaultValue="akashsarker2478@gmail.com" className="w-full p-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] font-bold text-[var(--text-primary)] disabled:opacity-50" />
            {isEditing && (
                <div className="flex items-center gap-2 p-2 bg-[var(--background)] rounded-2xl border border-[var(--border)]">
                    <Lock size={18} className="ml-2 text-[var(--text-secondary)]" />
                    <input type="password" placeholder="Change Password" className="w-full p-3 bg-transparent font-bold text-[var(--text-primary)] focus:outline-none" />
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Fixed Save Bar */}
      {isEditing && (
        <div className="fixed bottom-0 left-0 w-full p-4 z-50 bg-[var(--background)]/80 backdrop-blur-xl border-t border-[var(--border)]">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase hidden sm:block">You have unsaved changes</p>
                <div className="flex w-full sm:w-auto gap-4">
                    <button onClick={() => setIsEditing(false)} className="flex-1 sm:flex-none px-6 py-4 rounded-2xl font-black text-[var(--text-secondary)] hover:bg-[var(--border)] transition-all">Cancel</button>
                    <button onClick={() => setIsEditing(false)} className="flex-[2] sm:flex-none flex items-center justify-center gap-2 bg-[#00A99D] hover:bg-[#008c82] text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg shadow-[#00A99D]/20">
                        <Save size={18} /> Save
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Settings;