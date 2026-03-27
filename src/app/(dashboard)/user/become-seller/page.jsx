"use client";

import { useState } from "react";
import {
  Store,
  MapPin,
  Phone,
  CreditCard,
  Image as ImageIcon,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function BecomeSellerPage() {
  const { data: session } = useSession(); // লগইন করা ইউজারের ডাটা নেয়ার জন্য
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ব্যাকএন্ড ডক অনুযায়ী স্টেট স্ট্রাকচার (যা ডাটাবেজে যাবে)
  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    businessAddress: "",
    storePhone: "",
    nidNumber: "",
    shopLogo: "", // এটি ডকে না থাকলেও ইমেজের জন্য রাখা হয়েছে
    nidCopy: "", // এটি ডকে না থাকলেও ভেরিফিকেশনের জন্য রাখা হয়েছে
    bankName: "Pending", // ডক অনুযায়ী ডিফল্ট ভ্যালু
    accountNumber: "0000", // ডক অনুযায়ী ডিফল্ট ভ্যালু
    mfsNumber: "",
  });

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  // Image Upload Handler for imgBB
  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const toastId = toast.loading(`Uploading ${fieldName}...`);
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        data,
      );
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, [fieldName]: res.data.data.url }));
        toast.success(`${fieldName} uploaded!`, { id: toastId });
      }
    } catch (error) {
      toast.error("Image upload failed!", { id: toastId });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.shopLogo || !formData.nidCopy) {
      return toast.error("Please upload all required documents");
    }

    if (!session?.user?.email) {
      return toast.error("Please login first to apply");
    }

    setIsLoading(true);

    // ব্যাকএন্ড ডক অনুযায়ী ফাইনাল ডাটা অবজেক্ট
    const finalPayload = {
      ...formData,
      storeEmail: session.user.email, // সেশন থেকে ইমেইল ইনজেক্ট করা হচ্ছে
      mfsNumber: formData.storePhone, // ফোন নাম্বারকেই আপাতত MFS নাম্বার হিসেবে পাঠানো হচ্ছে
    };

    try {
      // baseURL-এ /api আছে, তাই এখানে শুধু /seller-auth/apply
      const res = await axiosInstance.post("/seller-auth/apply", finalPayload);

      if (res.data.success) {
        toast.success("Application submitted successfully!");
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Submission Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <div className="bg-green-100 p-6 rounded-full mb-6">
          <CheckCircle2 size={80} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-(--secondary) mb-2">
          Application Received!
        </h2>
        <p className="text-slate-600 max-w-md">
          Your request to become a seller is currently under review. Admin will
          verify your documents and notify you via email soon.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12">
      <Toaster position="top-center" />

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-(--secondary)">
          Become a Seller
        </h1>
        <p className="text-slate-500">
          Fill in the details to start your business on PrimeMart
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-(--surface) p-8 rounded-3xl shadow-xl border border-(--border)"
      >
        {/* Shop Info */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
            <Store size={20} className="text-[#0EA5A4]" /> Shop Details
          </h3>

          <div>
            <label className="text-sm font-semibold ml-1">Shop Name</label>
            <input
              name="storeName"
              required
              value={formData.storeName}
              onChange={handleChange}
              placeholder="Prime Gadget Store"
              className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0EA5A4]/20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold ml-1">
              Shop Description
            </label>
            <textarea
              name="storeDescription"
              required
              rows="3"
              value={formData.storeDescription}
              onChange={handleChange}
              placeholder="Briefly describe your products..."
              className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0EA5A4]/20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold ml-1 text-slate-700">
              Shop Logo
            </label>
            <div className="mt-1 flex items-center gap-4">
              <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 rounded-xl hover:bg-slate-50 transition-all">
                <ImageIcon size={18} className="text-slate-500" />
                <span className="text-sm">Upload Logo</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "shopLogo")}
                />
              </label>
              {formData.shopLogo && (
                <img
                  src={formData.shopLogo}
                  className="w-12 h-12 rounded-lg object-cover border"
                  alt="preview"
                />
              )}
            </div>
          </div>
        </div>

        {/* Verification Info */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-[#0EA5A4]" /> Verification
          </h3>

          <div>
            <label className="text-sm font-semibold ml-1 flex items-center gap-1">
              <Phone size={14} /> Phone Number
            </label>
            <input
              name="storePhone"
              required
              value={formData.storePhone}
              onChange={handleChange}
              placeholder="+88017..."
              className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0EA5A4]/20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold ml-1 flex items-center gap-1">
              <MapPin size={14} /> Business Address
            </label>
            <input
              name="businessAddress"
              required
              value={formData.businessAddress}
              onChange={handleChange}
              placeholder="City, Area, Road..."
              className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0EA5A4]/20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold ml-1 flex items-center gap-1">
              <CreditCard size={14} /> NID Number
            </label>
            <input
              name="nidNumber"
              required
              value={formData.nidNumber}
              onChange={handleChange}
              placeholder="1234567890"
              className="w-full mt-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#0EA5A4]/20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold ml-1 text-slate-700">
              NID Copy (Front)
            </label>
            <div className="mt-1 flex items-center gap-4">
              <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 rounded-xl hover:bg-slate-50 transition-all w-full">
                <ImageIcon size={18} className="text-slate-500" />
                <span className="text-sm">Upload NID</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "nidCopy")}
                />
              </label>
              {formData.nidCopy && (
                <img
                  src={formData.nidCopy}
                  className="w-12 h-12 rounded-lg object-cover border"
                  alt="preview"
                />
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#0EA5A4] text-white font-bold rounded-2xl hover:bg-[#0c8d8c] transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
            {isLoading ? "Submitting Application..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
