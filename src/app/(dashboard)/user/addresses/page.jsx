"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Plus, Trash2, Edit2, X, CheckCircle2, MapPin, Loader2, Phone, User, Navigation } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
import { useSession } from "next-auth/react";
import axiosInstance from "@/lib/axiosInstance";

export default function AddressBookPage() {
  const { data: session } = useSession();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [geoData, setGeoData] = useState({});
  const [division, setDivision] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [thanas, setThanas] = useState([]);
  const [selectedThana, setSelectedThana] = useState("");

  const [formData, setFormData] = useState({
    userName: "", userPhoneNumber: "", userPostCode: "", userFullAddress: "", addressType: "Home", isDefault: false
  });

  useEffect(() => {
    fetchAddresses();
    fetch("/data/bd-geocode.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error loading geocode:", err));
  }, [session]);

  const fetchAddresses = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await axiosInstance.get(`/address/all`);
      if (res.data.success) {
        const userAddresses = res.data.data.filter(addr => addr.userEmail === session.user.email);
        setAddresses(userAddresses);
      }
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleDivisionChange = (e) => {
    const div = e.target.value;
    setDivision(div);
    setDistricts(div && geoData[div] ? Object.keys(geoData[div]) : []);
    setSelectedDistrict(""); setThanas([]); setSelectedThana("");
  };

  const handleDistrictChange = (e) => {
    const dist = e.target.value;
    setSelectedDistrict(dist);
    setThanas(division && geoData[division] && geoData[division][dist] ? geoData[division][dist] : []);
    setSelectedThana("");
  };

  const openModal = (addr = null) => {
    if (addr) {
      setIsEditing(true);
      setFormData({ ...addr });
      setSelectedDistrict(addr.userCity);
      setSelectedThana(addr.userThana);
    } else {
      setIsEditing(false);
      setFormData({ userName: "", userPhoneNumber: "", userPostCode: "", userFullAddress: "", addressType: "Home", isDefault: false });
      setDivision(""); setSelectedDistrict(""); setSelectedThana("");
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...formData, userEmail: session?.user?.email, userCountry: "Bangladesh", userCity: selectedDistrict, userThana: selectedThana };
    try {
      let res;
      if (isEditing) res = await axiosInstance.patch(`/address/update/${session.user.email}`, payload);
      else res = await axiosInstance.post("/address/add", payload);

      if (res.data.success) {
        Swal.fire({ title: 'Success', text: res.data.message, icon: 'success', confirmButtonColor: 'var(--secondary)', border: 'none', background: 'var(--surface)' });
        setIsModalOpen(false); fetchAddresses();
      }
    } catch (error) { toast.error("Operation failed"); }
  };

  const handleDelete = (email) => {
    Swal.fire({
      title: 'Delete this address?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff4b4b',
      confirmButtonText: 'Yes, Delete',
      background: 'var(--surface)',
      color: 'var(--text-primary)'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosInstance.delete(`/address/delete/${email}`);
          if (res.data.success) { fetchAddresses(); toast.success("Address removed"); }
        } catch (error) { toast.error("Delete failed"); }
      }
    });
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-[var(--secondary)]" size={40} />
      <span className="text-sm font-bold tracking-widest opacity-50">LOADING BOOK...</span>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 min-h-screen">
      <Toaster position="top-center" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight italic">Saved <span className="text-[var(--secondary)]">Addresses</span></h1>
          <p className="text-[var(--text-secondary)] mt-2 font-medium">Quickly select your delivery location for checkout.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal()}
          className="flex items-center gap-3 px-10 py-5 bg-[var(--secondary)] text-white rounded-3xl font-black shadow-2xl shadow-[var(--secondary)]/20"
        >
          <Plus size={22} strokeWidth={3} /> Add New
        </motion.button>
      </div>

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {addresses.map((addr) => (
          <motion.div 
            layout
            key={addr._id}
            className={`group p-8 rounded-[3rem] border-2 transition-all relative overflow-hidden
              ${addr.isDefault 
                ? 'border-[var(--secondary)] bg-[var(--surface)] shadow-2xl' 
                : 'border-[var(--border)] bg-[var(--surface)]/40 opacity-90'}`}
          >
             {/* Background Decoration */}
             <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-10 ${addr.isDefault ? 'bg-[var(--secondary)]' : 'bg-gray-500'}`} />

             <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${addr.isDefault ? 'bg-[var(--secondary)] text-white' : 'bg-[var(--background)] text-[var(--text-secondary)]'}`}>
                   {addr.addressType === "Home" ? <Home size={24} /> : <Briefcase size={24} />}
                </div>
                {addr.isDefault && (
                  <div className="flex items-center gap-1 bg-[var(--secondary)]/10 text-[var(--secondary)] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    <CheckCircle2 size={12} /> Default
                  </div>
                )}
             </div>
             
             <div className="space-y-1 mb-6">
                <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">{addr.userName}</h3>
                <div className="flex items-center gap-2 text-[var(--text-secondary)] font-bold text-sm">
                   <Phone size={14} className="text-[var(--secondary)]" /> {addr.userPhoneNumber}
                </div>
             </div>

             <div className="p-5 bg-[var(--background)]/50 rounded-2xl border border-[var(--border)] mb-8">
                <p className="text-[var(--text-primary)] font-bold text-sm leading-relaxed">
                   {addr.userFullAddress}
                </p>
                <p className="text-[var(--text-secondary)] text-[11px] mt-2 font-black uppercase tracking-tighter opacity-70">
                   {addr.userThana}, {addr.userCity} — {addr.userPostCode}
                </p>
             </div>
             
             {/* Dynamic Buttons - Fixed for Mobile */}
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => openModal(addr)}
                  className="flex-1 py-3 bg-[var(--background)] border border-[var(--border)] rounded-2xl text-xs font-black text-[var(--text-primary)] flex items-center justify-center gap-2 hover:border-[var(--secondary)]/50 transition-all"
                >
                  <Edit2 size={14}/> Edit
                </button>
                <button 
                  onClick={() => handleDelete(addr.userEmail)}
                  className="flex-1 py-3 bg-red-500/5 border border-red-500/20 rounded-2xl text-xs font-black text-red-500 flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={14}/> Delete
                </button>
             </div>
          </motion.div>
        ))}

        {addresses.length === 0 && (
          <div className="col-span-full py-24 text-center border-4 border-dashed border-[var(--border)] rounded-[4rem] opacity-30">
            <Navigation size={48} className="mx-auto mb-4" />
            <p className="font-black text-xl">NO ADDRESSES SAVED YET</p>
          </div>
        )}
      </div>

      {/* Modern Minimal Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              className="bg-[var(--surface)] border border-[var(--border)] p-10 rounded-[3.5rem] w-full max-w-xl shadow-3xl overflow-y-auto max-h-[92vh]"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tighter">{isEditing ? "Update Location" : "Add Location"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-[var(--background)] rounded-2xl text-[var(--text-secondary)] hover:text-red-500 transition-colors"><X size={24} /></button>
              </div>
              
              <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                   <input 
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 text-[var(--text-primary)] font-bold focus:ring-4 ring-[var(--secondary)]/10 outline-none transition-all" 
                    placeholder="Receiver Name" required value={formData.userName}
                    onChange={(e) => setFormData({...formData, userName: e.target.value})}
                   />
                </div>
                
                <input 
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 text-[var(--text-primary)] font-bold outline-none" 
                  placeholder="Mobile Number" required value={formData.userPhoneNumber}
                  onChange={(e) => setFormData({...formData, userPhoneNumber: e.target.value})}
                />

                <input 
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 text-[var(--text-primary)] font-bold outline-none" 
                  placeholder="Zip Code" required value={formData.userPostCode}
                  onChange={(e) => setFormData({...formData, userPostCode: e.target.value})}
                />

                <select value={division} onChange={handleDivisionChange} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 text-[var(--text-primary)] font-bold outline-none cursor-pointer">
                  <option value="">Select Division</option>
                  {Object.keys(geoData).map(div => <option key={div} value={div}>{div}</option>)}
                </select>

                <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!division} className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 text-[var(--text-primary)] font-bold outline-none disabled:opacity-50">
                  <option value="">Select District</option>
                  {districts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                </select>

                <select value={selectedThana} onChange={(e) => setSelectedThana(e.target.value)} disabled={!selectedDistrict} className="sm:col-span-2 w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 text-[var(--text-primary)] font-bold outline-none disabled:opacity-50">
                  <option value="">Select Thana / Upazila</option>
                  {thanas.map(thana => <option key={thana} value={thana}>{thana}</option>)}
                </select>

                <textarea 
                  className="sm:col-span-2 w-full bg-[var(--background)] border border-[var(--border)] rounded-3xl p-5 text-[var(--text-primary)] font-bold outline-none min-h-[120px]" 
                  placeholder="Detailed Address (House, Road, Area)" required value={formData.userFullAddress}
                  onChange={(e) => setFormData({...formData, userFullAddress: e.target.value})}
                />

                <div className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-[var(--background)] rounded-[2.5rem] border border-[var(--border)]">
                   <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" id="def_addr" className="w-6 h-6 accent-[var(--secondary)]" checked={formData.isDefault}
                        onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
                      />
                      <label htmlFor="def_addr" className="text-sm font-black text-[var(--text-primary)] cursor-pointer tracking-tight">Set as default</label>
                   </div>
                   <div className="flex gap-2">
                      {['Home', 'Office'].map(t => (
                        <button 
                          key={t} type="button"
                          onClick={() => setFormData({...formData, addressType: t})}
                          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.addressType === t ? 'bg-[var(--secondary)] text-white' : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]'}`}
                        >
                          {t}
                        </button>
                      ))}
                   </div>
                </div>

                <button type="submit" className="sm:col-span-2 py-5 bg-[var(--secondary)] text-white font-black text-xl rounded-[2.5rem] mt-4 shadow-xl shadow-[var(--secondary)]/20 active:scale-95 transition-all">
                  {isEditing ? "Update Address" : "Save Location"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}