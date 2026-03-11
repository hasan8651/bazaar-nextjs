"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// 1. Constants
const categories = [
  "Electronics", "Fashion", "Grocery", "Home & Living",
  "Beauty", "Health", "Sports", "Automotive",
  "Books", "Toys", "Gadgets", "Furniture"
];

const statusOptions = ["In Stock", "Out of Stock", "Coming Soon"];

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "", brand: "", currentPrice: "",
      oldPrice: "", description: "", category: "",
      shippingWeight: "", discount: "", status: "",
    },
  });



  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 900)); // Simulate API call
    setSubmittedData(data);
    setSubmitted(true);
  };

  const handleReset = () => {
    reset();
    setSubmitted(false);
    setSubmittedData(null);
    setImagePreview("");
  };


  console.log(submittedData)

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
          <h2 className="text-2xl font-bold text-[#1E293B] mb-8">Product Submitted Successfully!</h2>
          <div className="bg-[#F8FAFC] rounded-2xl p-6 text-left space-y-3 mb-8 border border-[#E2E8F0]">
            {Object.entries(submittedData).filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="flex items-start gap-3 text-sm">
                <span className="text-[#64748B] font-medium capitalize w-32 shrink-0">{k.replace(/([A-Z])/g, " $1")}</span>
                <span className="text-[#1E293B] font-semibold break-all">
                  {v instanceof FileList ? v[0]?.name : v}
                </span>
              </div>
            ))}
          </div>
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
          <p className="text-sm text-(--text-primary)">Enter the details to create your listing.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-(--background) rounded-3xl shadow-xl overflow-hidden border border-[#E2E8F0]/60">
            <div className="h-1.5 bg-[#0EA5A4]" />
            <div className="p-8 md:p-10">

              {/* 1. Basic Info: Name & Brand */}
              <SectionTitle icon="🏷️" title="Basic Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div>
                  <label className={labelBase}>Product Name <Req /></label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Wireless Headphones"
                    className={errors.name ? inputError : inputNormal}
                  />
                  {errors.name && <p className={errorText}><ErrIcon />{errors.name.message}</p>}
                </div>
                <div>
                  <label className={labelBase}>Brand <Req /></label>
                  <input
                    {...register("brand", { required: "Brand is required" })}
                    placeholder="Sony"
                    className={errors.brand ? inputError : inputNormal}
                  />
                  {errors.brand && <p className={errorText}><ErrIcon />{errors.brand.message}</p>}
                </div>
              </div>

              {/* 2. Image Section */}
              <SectionTitle icon="🖼️" title="Product Image" />
              <div className="mb-8 flex gap-4 items-start">
                <div className="flex-1">
                  <label className={labelBase}>Image URL <Req /></label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image", { required: "Image is required" })}
                    className={errors.image ? inputError : inputNormal}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  {errors.imageUrl && <p className={errorText}><ErrIcon />{errors.imageUrl.message}</p>}
                </div>
                <div className="w-24 h-24 rounded-xl border-2 border-dashed flex items-center justify-center bg-gray-50 overflow-hidden shrink-0">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        (e.target.src = "https://placehold.co/100x100?text=Error")
                      }
                    />
                  ) : (
                    <span className="text-[10px] text-gray-400">Preview</span>
                  )}
                </div>
              </div>

              {/* 3. Pricing Section */}
              <SectionTitle icon="💰" title="Pricing & Discount" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <div>
                  <label className={labelBase}>Current Price ($) <Req /></label>
                  <input type="number" step="0.01" {...register("currentPrice", { required: "Required" })} placeholder="99.99" className={errors.currentPrice ? inputError : inputNormal} />
                  {errors.currentPrice && <p className={errorText}><ErrIcon />{errors.currentPrice.message}</p>}
                </div>
                <div>
                  <label className={labelBase}>Old Price ($)</label>
                  <input type="number" step="0.01" {...register("oldPrice")} placeholder="129.99" className={inputNormal} />
                </div>
                <div>
                  <label className={labelBase}>Discount (%)</label>
                  <input type="number" {...register("discount")} placeholder="20" className={inputNormal} />
                </div>
              </div>

              {/* 4. Description */}
              <SectionTitle icon="📝" title="Description" />
              <div className="mb-8">
                <label className={labelBase}>Product Description <Req /></label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  rows={4}
                  placeholder="Tell us about the product..."
                  className={errors.description ? inputError : inputNormal}
                />
                {errors.description && <p className={errorText}><ErrIcon />{errors.description.message}</p>}
              </div>

              {/* 5. Details: Category, Weight, Status */}
              <SectionTitle icon="📦" title="Product Details" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                <div className="relative">
                  <label className={labelBase}>Category <Req /></label>
                  <select {...register("category", { required: "Select category" })} className={errors.category ? `${inputError} appearance-none` : `${inputNormal} appearance-none`}>
                    <option value="">Select...</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronIcon />
                  {errors.category && <p className={errorText}><ErrIcon />{errors.category.message}</p>}
                </div>
                <div>
                  <label className={labelBase}>Weight (kg)</label>
                  <input type="number" step="0.1" {...register("shippingWeight")} placeholder="1.5" className={inputNormal} />
                </div>
                <div className="relative">
                  <label className={labelBase}>Status <Req /></label>
                  <select {...register("status", { required: "Select status" })} className={errors.status ? `${inputError} appearance-none` : `${inputNormal} appearance-none`}>
                    <option value="">Select...</option>
                    {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronIcon />
                  {errors.status && <p className={errorText}><ErrIcon />{errors.status.message}</p>}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <button type="button" onClick={handleReset} className="px-13 md:px-17 py-2 font-semibold btn-secondary rounded-2xl transition-colors cursor-pointer">Reset</button>
                <button type="submit" disabled={isSubmitting} className="px-6 md:px-10 py-3 bg-[#0EA5A4] text-white rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer">
                  {isSubmitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}