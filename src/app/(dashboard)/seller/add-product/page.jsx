"use client";
import axiosInstance from '@/lib/axiosInstance';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// 1. Constants
const categories = [
  "Electronics", "Fashion", "Grocery", "Home & Living",
  "Beauty", "Health", "Sports", "Automotive",
  "Books", "Toys", "Gadgets", "Furniture"
];

const statusOptions = ["in-stock", "out-of-stock", "low-stock"];

// 2. Helper Components
const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center gap-2.5 mb-5 mt-8 first:mt-0">
    <span className="text-base">{icon}</span>
    <h2 className="text-sm font-bold uppercase tracking-widest text-(--text-primary)">{title}</h2>
    <div className="flex-1 h-px bg-(--text-primary)" />
  </div>
);

const Req = () => <span className="text-red-400 ml-0.5">*</span>;

const ErrIcon = () => (
  <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const ChevronIcon = () => (
  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// 3. Main Component
export default function ProductForm() {
  const [imagePreview, setImagePreview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const { data: session } = useSession();
  const user = session?.user;
  // console.log(user)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "", 
      brand: "", 
      sku: "",
      shortDescription: "",
      description: "",
      pricing: {
        basePrice: 0, 
        oldPrice: 0, 
        currency: "USD"
      },
      category: { id: "cat_fashion", name: ""  },
      subCategory: { id: "sub_men_clothing", name: "", slug: "" },
      discount: { type: 'percentage', value: 0, taxIncluded: true },
      inventory: { totalStock: 0, lowStockThreshold: 5, stockStatus: "in-stock" },
      shipping: { weight: 0 },
      dimensions: { length: 0, width: 0, height: 0, freeShipping: false, estimatedDeliveryDays: 7 },
      seo: { metaTitle: "", metaDescription: "" },
      images: { thumbnail: "", gallery: [] },
      // Added Seller Fields
      seller: {
        storeName: "",
        sellerEmail: "",
        sellerRating: 4.5
      }
    },
  });

  const onSubmit = async (data) => {
    try {
      const imageFile = data.images.thumbnail[0];
      if (!imageFile) return alert("Please select an image");

      const formData = new FormData();
      formData.append("image", imageFile);

      const imgBBKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBKey}`, {
        method: "POST",
        body: formData,
      });

      const imgData = await uploadRes.json();

      if (imgData.success) {
        const imageUrl = imgData.data.url;
        
        // Slug removed here - backend will handle it
        const payload = {
          ...data,
          images: {
            thumbnail: imageUrl,
            gallery: [imageUrl]
          },
          userRole:user?.role,
          seller: {
            ...data.seller,
            sellerId: user?.id || "sel_manual_entry",
            sellerEmail:user?.email
          }
        };

        const res = await axiosInstance.post('/products/add', payload);
        console.log(res.data)
        
        setSubmittedData(payload);
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Submission Error:', err);
      alert("Something went wrong.");
    }
  };

  const handleReset = () => {
    reset();
    setSubmitted(false);
    setSubmittedData(null);
    setImagePreview("");
  };

  const inputBase = "w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 outline-none bg-(--surface) focus:ring-2 focus:ring-[#0EA5A4]/20 focus:border-[#0EA5A4] placeholder:text-slate-400";
  const inputNormal = `${inputBase} border-[#E2E8F0] text-(--text-primary)`;
  const inputError = `${inputBase} border-red-400 focus:ring-red-200 focus:border-red-400 bg-red-50/40`;
  const labelBase = "block text-xs font-semibold uppercase tracking-widest mb-2 text-[#64748B]";
  const errorText = "mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1";

  if (submitted && submittedData) {
    return (
        <div className="min-h-screen bg-(--background) flex items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-(--background) rounded-3xl shadow-xl p-10 text-center border border-[#E2E8F0]">
            <div className="w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1E293B] mb-8">Product Added Successfully!</h2>
            <button onClick={handleReset} className="px-8 py-3 rounded-xl bg-[#0EA5A4] text-white font-semibold shadow-lg hover:bg-[#137f7f] transition-all">
              Add Another Product
            </button>
          </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--background) flex items-start justify-center px-6 py-2">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-(--secondary)">Add New Product</h1>
          <p className="text-sm text-(--text-primary)">Complete all sections to list your product.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-(--background) rounded-3xl shadow-xl overflow-hidden border border-[#E2E8F0]/60">
            <div className="h-1.5 bg-[#0EA5A4]" />
            <div className="p-8 md:p-10">

              {/* 1. Basic Info */}
              <SectionTitle icon="🏷️" title="Basic Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className={labelBase}>Product Name <Req /></label>
                  <input {...register("name", { required: "Required" })} className={errors.name ? inputError : inputNormal} placeholder="Classic Leather Jacket" />
                </div>
                <div>
                  <label className={labelBase}>SKU <Req /></label>
                  <input {...register("sku", { required: "Required" })} className={errors.sku ? inputError : inputNormal} placeholder="FASH-CJK-401" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div>
                  <label className={labelBase}>Brand <Req /></label>
                  <input {...register("brand", { required: "Required" })} className={errors.brand ? inputError : inputNormal} placeholder="Urban Style" />
                </div>
                <div>
                    <label className={labelBase}>Short Description</label>
                    <input {...register("shortDescription")} className={inputNormal} placeholder="Brief summary..." />
                </div>
              </div>

              {/* 2. Image Section */}
              <SectionTitle icon="🖼️" title="Product Image" />
              <div className="mb-8 flex gap-4 items-start">
                <div className="flex-1">
                  <label className={labelBase}>Thumbnail Upload <Req /></label>
                  <input type="file" accept="image/*" {...register("images.thumbnail", { required: "Required", onChange: (e) => {
                        const file = e.target.files[0];
                        if (file) setImagePreview(URL.createObjectURL(file));
                      }})} className={errors.images?.thumbnail ? inputError : inputNormal} />
                </div>
                <div className="w-24 h-24 rounded-xl border-2 border-dashed flex items-center justify-center bg-gray-50 overflow-hidden shrink-0">
                  {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <span className="text-[10px] text-gray-400">Preview</span>}
                </div>
              </div>

              {/* 3. Inventory & Pricing */}
              <SectionTitle icon="📊" title="Inventory & Pricing" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                <div>
                  <label className={labelBase}>Base Price ($) <Req /></label>
                  <input type="number" {...register("pricing.basePrice", { required: true })} className={inputNormal} />
                </div>
                <div>
                  <label className={labelBase}>Discount (%)</label>
                  <input type="number" {...register("discount.value")} className={inputNormal} />
                </div>
                <div>
                  <label className={labelBase}>Stock Qty <Req /></label>
                  <input type="number" {...register("inventory.totalStock", { required: true })} className={inputNormal} />
                </div>
                <div className="relative">
                  <label className={labelBase}>Stock Status</label>
                  <select {...register("inventory.stockStatus")} className={`${inputNormal} appearance-none`}>
                    {statusOptions.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                  </select>
                  <ChevronIcon />
                </div>
              </div>

              {/* 4. Categorization */}
              <SectionTitle icon="📂" title="Categorization" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="relative">
                  <label className={labelBase}>Category <Req /></label>
                  <select {...register("category.name", { required: true })} className={`${inputNormal} appearance-none`}>
                    <option value="">Select...</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronIcon />
                </div>
                <div>
                  <label className={labelBase}>Sub-Category Name</label>
                  <input {...register("subCategory.name")} className={inputNormal} placeholder="e.g. Men Clothing" />
                </div>
              </div>

              {/* 5. Seller Information (New Section) */}
              <SectionTitle icon="🏪" title="Seller Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <div>
                  <label className={labelBase}>Store Name <Req /></label>
                  <input {...register("seller.storeName", { required: "Required" })} className={inputNormal} placeholder="Urban Wear" />
                </div>
              
                <div>
                  <label className={labelBase}>Seller Rating (0-5)</label>
                  <input type="number" step="0.1" max="5" min="0" {...register("seller.sellerRating")} className={inputNormal} placeholder="4.5" />
                </div>
              </div>

              {/* 6. Shipping & Dimensions */}
              <SectionTitle icon="🚚" title="Shipping & Dimensions" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                <div>
                  <label className={labelBase}>Weight (kg)</label>
                  <input type="number" step="0.1" {...register("shipping.weight")} className={inputNormal} />
                </div>
                <div>
                  <label className={labelBase}>Length (cm)</label>
                  <input type="number" {...register("dimensions.length")} className={inputNormal} />
                </div>
                <div>
                  <label className={labelBase}>Width (cm)</label>
                  <input type="number" {...register("dimensions.width")} className={inputNormal} />
                </div>
                <div>
                  <label className={labelBase}>Height (cm)</label>
                  <input type="number" {...register("dimensions.height")} className={inputNormal} />
                </div>
              </div>

              {/* 7. Description & SEO */}
              <SectionTitle icon="🔍" title="Description & SEO" />
              <div className="space-y-5 mb-8">
                <div>
                  <label className={labelBase}>Full Description <Req /></label>
                  <textarea {...register("description", { required: true })} rows={3} className={inputNormal} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div>
                    <label className={labelBase}>Meta Title</label>
                    <input {...register("seo.metaTitle")} className={inputNormal} placeholder="SEO Title" />
                  </div>
                  <div>
                    <label className={labelBase}>Meta Description</label>
                    <input {...register("seo.metaDescription")} className={inputNormal} placeholder="SEO Description" />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t">
                <button type="button" onClick={handleReset} className="px-8 py-3 font-semibold border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">Reset</button>
                <button type="submit" disabled={isSubmitting} className="px-10 py-3 bg-[#0EA5A4] text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-all disabled:opacity-50">
                  {isSubmitting ? "Uploading..." : "Save Product"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}