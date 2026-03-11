"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Image as ImageIcon,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photo,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setStep(2);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/users/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });

      if (res.data.success) {
        toast.success("Account verified! Please login.");
        router.push("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch justify-center font-[sans-serif]">
      <Toaster position="top-center" />

      {/* বাম পাশ: ডিজাইন ও ব্র্যান্ডিং (ডেস্কটপ) */}
      <div className="hidden lg:flex lg:w-1/2 bg-(--secondary) p-12 flex-col justify-start gap-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white rounded-full opacity-30 blur-3xl"></div>

        <div className="relative z-10">
          <div className="logo-invert relative w-100 h-38">
            <Image
              src="/logo.png"
              alt="Brand Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-primary leading-tight">
            {step === 1
              ? "Start Your Journey With Us Today."
              : "Secure Your Account."}
          </h1>
          <p className="text-primary mt-4 text-lg">
            {step === 1
              ? "Join thousands of happy customers and get access to premium products and exclusive deals."
              : "We have sent a secure 8-character code to your email. Please verify to continue."}
          </p>
        </div>
      </div>

      {/* ডান পাশ: ফর্ম সেকশন */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-(--background)">
        <div className="w-full max-w-md space-y-2">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 text-(--secondary)">
              {step === 1 ? "Create Account" : "Verify Email"}
            </h1>
            <p className="text-sm text-(--text-primary)">
              {step === 1
                ? "Join PrimeMart marketplace today"
                : `We've sent a code to ${formData.email}`}
            </p>
          </div>

          {step === 1 ? (
            <div className="space-y-6 rounded-3xl p-8 shadow-xl border border-(--border)">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-(--text-primary) ml-1 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3 border outline-none rounded-xl transition-all  text-(--text-primary) bg-(--surface)  focus:ring-2 focus:ring-[#0EA5A4]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-(--text-primary) ml-1 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
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

{/* <div>
<label className="block text-sm font-semibold text-[var(--text-primary)] ml-1 mb-1">Photo URL (Optional)</label>
<div className="relative">
<ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
<input name="photo" type="text" value={formData.photo} onChange={handleChange} placeholder="https://image-link.com" className="w-full pl-11 pr-4 py-3 border outline-none rounded-xl transition-all  text-[var(--text-primary)] bg-[var(--surface)]  focus:ring-2 focus:ring-[#0EA5A4]/20"/>
</div>
</div> */}

                <div>
                  <label className="block text-sm font-semibold text-(--text-primary) ml-1 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 border outline-none rounded-xl transition-all  text-(--text-primary) bg-(--surface) focus:ring-2 focus:ring-[#0EA5A4]/20"
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
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0EA5A4] text-white font-bold rounded-xl hover:bg-[#0c8d8c] transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-teal-500/20 cursor-pointer"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                  {!isLoading && <ArrowRight size={18} />}
                </button>
              </form>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-(--border)"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-(--background) px-4 text-(--text-primary) font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                onClick={() => signIn("google")}
                className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-3 transition-all active:scale-[0.98] btn-secondary cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <div className="text-center">
                <p className="mt-2 text-slate-600">
                  {step === 1 ? (
                    <>
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="text-[#0EA5A4] font-semibold hover:underline"
                      >
                        Sign In
                      </Link>
                    </>
                  ) : (
                    `Code sent to ${formData.email}`
                  )}
                </p>
              </div>
            </div>
          ) : (
            /* OTP ভেরিফিকেশন স্টেপ */
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="flex justify-center mb-4 text-[#0EA5A4]">
                <ShieldCheck size={64} strokeWidth={1.5} />
              </div>
              <div className="space-y-3 text-center">
                <label className="text-sm font-semibold text-slate-700">
                  Enter 8-Character Verification Code
                </label>
                <input
                  name="otp"
                  type="text"
                  required
                  maxLength={8}
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="EX: A1B2C3D4"
                  className="w-full px-4 py-4 rounded-xl text-center text-2xl font-bold tracking-[6px] outline-none border border-slate-200 bg-white focus:ring-2 focus:ring-[#0EA5A4]/20 focus:border-[#0EA5A4]"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-white font-bold bg-[#0EA5A4] hover:bg-[#0c8d8c] shadow-lg shadow-teal-500/20 transition-all"
              >
                {isLoading ? "Verifying..." : "Verify & Activate"}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-sm font-semibold text-slate-500 hover:text-[#0EA5A4]"
              >
                Back to Registration
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
