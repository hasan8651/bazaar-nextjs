"use client";

import React, { useState } from "react";
import { Bell, Shield, Trash2, Mail, Lock, Smartphone, ChevronRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// কাস্টম টগল সুইচ (আপনার থিমের সাথে সামঞ্জস্যপূর্ণ)
const ToggleSwitch = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 ${
      checked ? "bg-[var(--secondary)]" : "bg-[var(--border)]"
    }`}
  >
    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? "translate-x-6" : "translate-x-0"}`} />
  </button>
);

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  const handleSaveSettings = (key, value) => {
    toast.success(`Settings updated!`, {
        style: { background: '#0EA5A4', color: '#fff', borderRadius: '16px', fontWeight: 'bold' }
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 md:px-6 min-h-screen">
      <Toaster position="top-center" />
      <h1 className="text-4xl font-black mb-8 text-[var(--text-primary)]">Account Settings</h1>

      {/* 1. Notification Preferences */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] p-8 mb-6 shadow-sm">
        <h2 className="text-lg font-black mb-8 flex items-center gap-3 text-[var(--text-primary)]">
          <div className="p-2 bg-[var(--secondary)]/10 rounded-xl text-[var(--secondary)]"><Bell size={20} /></div> Notification Preferences
        </h2>
        
        <div className="space-y-8">
          <div className="flex justify-between items-center group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[var(--background)] rounded-2xl border border-[var(--border)]"><Mail className="text-[var(--text-secondary)]" size={20} /></div>
              <div>
                <p className="font-black text-[var(--text-primary)]">Email Updates</p>
                <p className="text-xs text-[var(--text-secondary)]">Receive order receipts via email</p>
              </div>
            </div>
            <ToggleSwitch checked={emailNotif} onChange={(val) => { setEmailNotif(val); handleSaveSettings("email", val); }} />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[var(--background)] rounded-2xl border border-[var(--border)]"><Smartphone className="text-[var(--text-secondary)]" size={20} /></div>
              <div>
                <p className="font-black text-[var(--text-primary)]">SMS Alerts</p>
                <p className="text-xs text-[var(--text-secondary)]">Get delivery updates via SMS</p>
              </div>
            </div>
            <ToggleSwitch checked={smsNotif} onChange={(val) => { setSmsNotif(val); handleSaveSettings("sms", val); }} />
          </div>
        </div>
      </div>

      {/* 2. Security & Privacy */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] p-8 mb-6 shadow-sm">
        <h2 className="text-lg font-black mb-6 flex items-center gap-3 text-[var(--text-primary)]">
          <div className="p-2 bg-[var(--secondary)]/10 rounded-xl text-[var(--secondary)]"><Shield size={20} /></div> Security & Privacy
        </h2>
        <button className="w-full flex items-center justify-between p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl font-bold text-[var(--text-primary)] hover:border-[var(--secondary)] transition-all">
          <span className="flex items-center gap-3"><Lock size={18} /> Manage Connected Devices</span>
          <ChevronRight size={20} className="text-[var(--text-secondary)]" />
        </button>
      </div>

      {/* 3. Danger Zone */}
      <div className="bg-[var(--surface)] border border-red-500/20 rounded-[2.5rem] p-8">
        <h2 className="text-lg font-black mb-2 flex items-center gap-3 text-red-500">
          <Trash2 size={20} /> Danger Zone
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Once you delete your account, there is no going back.</p>
        <button className="w-full py-4 bg-red-500/10 text-red-500 font-black rounded-2xl hover:bg-red-500 hover:text-white transition-all">
          Delete My Account
        </button>
      </div>
    </div>
  );
}