"use client";

import { useState } from "react";
import { Mail, ArrowRight, ShieldCheck, KeyRound, Lock, Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ধাপ ১: ওটিপি পাঠানো
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/users/forgot-password", {
        email: formData.email,
      });
      if (res.data.success) {
        toast.success("Verification code sent to your email!");
        setStep(2);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // ধাপ ২: ওটিপি ভেরিফাই ও পাসওয়ার্ড রিসেট
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/users/reset-password", {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });

      if (res.data.success) {
        toast.success("Password reset successful! Please login.");
        router.push("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP or request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch justify-center font-[sans-serif]">
      <Toaster position="top-center" />

      {/* বাম পাশ: ডিজাইন ও ব্র্যান্ডিং */}
      <div className="hidden lg:flex lg:w-1/2 bg-(--secondary) p-12 flex-col justify-start gap-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white rounded-full opacity-30 blur-3xl"></div>

        <div className="relative z-10">
          <Link href="/" className="logo-invert relative w-100 h-38 block">
            <Image src="/logo.png" alt="Logo" fill priority className="object-contain" />
          </Link>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-primary leading-tight">
            {step === 1 ? "Recover Your Access." : "Set New Password."}
          </h1>
          <p className="text-primary mt-4 text-lg">
            {step === 1 
              ? "Don't worry, it happens. Enter your email and we'll send you a code to reset your password."
              : "Verify the code sent to your inbox and choose a strong new password."}
          </p>
        </div>
      </div>

      {/* ডান পাশ: ফর্ম সেকশন */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-(--background)">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 text-(--secondary)">
              {step === 1 ? "Forgot Password?" : "Reset Password"}
            </h1>
            <p className="text-sm text-(--text-primary)">
              {step === 1 ? "No worries, we'll send you reset instructions." : `Enter the code sent to ${formData.email}`}
            </p>
          </div>

          <div className="space-y-6 rounded-3xl p-8 shadow-xl border border-(--border)">
            {step === 1 ? (
              <form onSubmit={handleSendOTP} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-(--text-primary) ml-1 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full pl-11 pr-4 py-3 border outline-none rounded-xl transition-all text-(--text-primary) bg-(--surface) focus:ring-2 focus:ring-[#0EA5A4]/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0EA5A4] text-white font-bold rounded-xl hover:bg-[#0c8d8c] transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-teal-500/20 cursor-pointer"
                >
                  {isLoading ? "Sending Code..." : "Send Reset Code"}
                  {!isLoading && <ArrowRight size={18} />}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="flex justify-center mb-2 text-[#0EA5A4]">
                  <ShieldCheck size={48} strokeWidth={1.5} />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-(--text-primary) ml-1 mb-1 text-center">Verification Code</label>
                  <div className="relative">
                    <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="otp"
                      type="text"
                      required
                      maxLength={8}
                      value={formData.otp}
                      onChange={(e) => setFormData({...formData, otp: e.target.value.toUpperCase()})}
                      placeholder="EX: A1B2C3D4"
                      className="w-full pl-11 pr-4 py-3 border outline-none rounded-xl text-center font-bold tracking-[2px] text-(--text-primary) bg-(--surface) focus:ring-2 focus:ring-[#0EA5A4]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-(--text-primary) ml-1 mb-1">New Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 border outline-none rounded-xl text-(--text-primary) bg-(--surface) focus:ring-2 focus:ring-[#0EA5A4]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl text-white font-bold bg-[#0EA5A4] hover:bg-[#0c8d8c] shadow-lg shadow-teal-500/20 transition-all"
                >
                  {isLoading ? "Updating..." : "Reset Password"}
                </button>
              </form>
            )}

            <div className="text-center">
              <Link href="/login" className="text-sm font-semibold text-slate-500 hover:text-[#0EA5A4] transition-colors">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}