"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Plus, Trash2, Edit2, X, CheckCircle2, MapPin, Phone, User, ChevronDown } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AddressBookPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  
  // Geocode States
  const [geoData, setGeoData] = useState({});
  const [division, setDivision] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [thanas, setThanas] = useState([]);
  const [selectedThana, setSelectedThana] = useState("");

  // Fetch JSON from public folder
  useEffect(() => {
    fetch("/data/bd-geocode.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error loading geocode:", err));
  }, []);

  // Handlers
  const handleDivisionChange = (e) => {
    const div = e.target.value;
    setDivision(div);
    setDistricts(div ? Object.keys(geoData[div] || {}) : []);
    setSelectedDistrict("");
    setThanas([]);
    setSelectedThana("");
  };

  const handleDistrictChange = (e) => {
    const dist = e.target.value;
    setSelectedDistrict(dist);
    setThanas(division ? (geoData[division][dist] || []) : []);
    setSelectedThana("");
  };

  const notify = (msg, type = "success") => {
    const style = { borderRadius: '12px', background: '#27272a', color: '#fff', fontSize: '14px', padding: '12px 24px' };
    type === "success" ? toast.success(msg, { style }) : toast.error(msg, { style });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    notify("Address saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 min-h-screen">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">Shipping Addresses</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage your delivery locations securely.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-[var(--secondary)] text-white rounded-2xl font-bold shadow-xl shadow-[var(--secondary)]/20"
        >
          <Plus size={20} /> Add New Address
        </motion.button>
      </div>

      {/* Address Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((id) => (
          <div 
            key={id}
            onClick={() => { setSelectedAddressId(id); notify("Address Selected 🚚"); }}
            className={`p-6 rounded-[2.5rem] border-2 cursor-pointer transition-all bg-[var(--surface)] 
              ${selectedAddressId === id ? 'border-[var(--secondary)] shadow-2xl' : 'border-[var(--border)] opacity-80'}`}
          >
             <div className="flex justify-between items-center mb-4">
                <div className={`p-3 rounded-2xl ${selectedAddressId === id ? 'bg-[var(--secondary)] text-white' : 'bg-[var(--background)] text-[var(--text-secondary)]'}`}>
                   <Home size={20} />
                </div>
                {selectedAddressId === id && <CheckCircle2 size={24} className="text-[var(--secondary)]" />}
             </div>
             <p className="font-bold text-lg text-[var(--text-primary)]">Akash Sarker</p>
             <p className="text-sm text-[var(--text-secondary)] mt-2">Dhanmondi, Dhaka Division, Bangladesh</p>
             <div className="mt-6 pt-4 border-t border-[var(--border)] flex gap-4">
                <button className="text-xs font-bold text-[var(--text-secondary)] flex items-center gap-1"><Edit2 size={14}/> Edit</button>
                <button className="text-xs font-bold text-red-400 flex items-center gap-1"><Trash2 size={14}/> Delete</button>
             </div>
          </div>
        ))}
      </div>

      {/* Address Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--surface)] border border-[var(--border)] p-8 rounded-[2.5rem] w-full max-w-xl shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-[var(--text-primary)]">New Location</h2>
                <X className="cursor-pointer text-[var(--text-secondary)]" onClick={() => setIsModalOpen(false)} />
              </div>
              
              <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input className="sm:col-span-2 w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-4 text-[var(--text-primary)] outline-none focus:ring-2 ring-[var(--secondary)]/20" placeholder="Full Name" required />
                
                {/* Division */}
                <select value={division} onChange={handleDivisionChange} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-4 text-[var(--text-primary)] outline-none cursor-pointer" required>
                  <option value="">Select Division</option>
                  {Object.keys(geoData).map(div => <option key={div} value={div}>{div}</option>)}
                </select>

                {/* District */}
                <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!division} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-4 text-[var(--text-primary)] outline-none cursor-pointer disabled:opacity-50" required>
                  <option value="">Select District</option>
                  {districts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                </select>

                {/* Thana */}
                <select value={selectedThana} onChange={(e) => setSelectedThana(e.target.value)} disabled={!selectedDistrict} className="sm:col-span-2 w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-4 text-[var(--text-primary)] outline-none cursor-pointer disabled:opacity-50" required>
                  <option value="">Select Thana / Upazila</option>
                  {thanas.map(thana => <option key={thana} value={thana}>{thana}</option>)}
                </select>

                <textarea className="sm:col-span-2 w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-4 text-[var(--text-primary)] outline-none min-h-[100px]" placeholder="Detailed Address (House/Road/Flat)" required />

                <button type="submit" className="sm:col-span-2 py-4 bg-[var(--secondary)] text-white font-black text-lg rounded-2xl mt-4 shadow-xl">
                  Save Address Information
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}