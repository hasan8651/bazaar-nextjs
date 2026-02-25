"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Image as ImageIcon, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

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
        otp: ""
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
                image: formData.photo 
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
                otp: formData.otp
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
        <div className="min-h-screen flex items-center justify-center p-6" style={{ fontFamily: "'DM Sans', sans-serif", background: "#F8FAFC" }}>
            <Toaster position="top-center" />
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: "#1E293B" }}>
                        {step === 1 ? "Create Account" : "Verify Email"}
                    </h1>
                    <p className="text-sm" style={{ color: "#64748B" }}>
                        {step === 1 ? "Join Bazzar marketplace today" : `We've sent a code to ${formData.email}`}
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-xl border" style={{ borderColor: "#E2E8F0" }}>
                    {step === 1 ? (
                        <>
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider ml-1" style={{ color: "#64748B" }}>Full Name</label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
                                        <input name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none transition-all border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#0EA5A4]/20" style={{ borderColor: "#E2E8F0" }} />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider ml-1" style={{ color: "#64748B" }}>Email Address</label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
                                        <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="name@example.com" className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none transition-all border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#0EA5A4]/20" style={{ borderColor: "#E2E8F0" }} />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider ml-1" style={{ color: "#64748B" }}>Photo URL</label>
                                    <div className="relative">
                                        <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
                                        <input name="photo" type="text" value={formData.photo} onChange={handleChange} placeholder="https://image.link" className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none transition-all border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#0EA5A4]/20" style={{ borderColor: "#E2E8F0" }} />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider ml-1" style={{ color: "#64748B" }}>Password</label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
                                        <input name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full pl-11 pr-12 py-3.5 rounded-2xl text-sm outline-none transition-all border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#0EA5A4]/20" style={{ borderColor: "#E2E8F0" }} />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" disabled={isLoading} className="w-full py-4 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-[#0EA5A4]/30 active:scale-[0.98] disabled:opacity-70" style={{ background: "#0EA5A4" }}>
                                    {isLoading ? "Creating Account..." : "Create Account"}
                                    {!isLoading && <ArrowRight size={18} />}
                                </button>
                            </form>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-medium">Or register with</span></div>
                            </div>

                            <button 
                                onClick={() => signIn('google')}
                                className="w-full py-3.5 rounded-2xl text-sm font-semibold border-2 flex items-center justify-center gap-3 transition-all hover:bg-slate-50 active:scale-[0.98]" 
                                style={{ borderColor: "#E2E8F0", color: "#1E293B" }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Continue with Google
                            </button>
                        </>
                    ) : (
                        <form onSubmit={handleVerifyOTP} className="space-y-6">
                            <div className="space-y-2 text-center">
                                <label className="text-sm font-medium text-slate-700">Enter 8-Character Code</label>
                                <input name="otp" type="text" required maxLength={8} value={formData.otp} onChange={handleChange} placeholder="EX: A1B2C3D4" className="w-full px-4 py-4 rounded-2xl text-center text-2xl font-bold tracking-[10px] outline-none border-2 bg-slate-50 focus:bg-white focus:border-[#0EA5A4]" style={{ color: "#1E293B" }} />
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full py-4 rounded-2xl text-sm font-bold text-white transition-all hover:shadow-lg bg-[#0EA5A4]">
                                {isLoading ? "Verifying..." : "Verify & Activate"}
                            </button>
                            <button type="button" onClick={() => setStep(1)} className="w-full text-sm font-medium text-slate-500 hover:text-[#0EA5A4]">
                                Back to Registration
                            </button>
                        </form>
                    )}
                </div>

                <p className="mt-8 text-center text-sm" style={{ color: "#64748B" }}>
                    Already have an account? <a href="/login" className="font-bold hover:underline" style={{ color: "#0EA5A4" }}>Sign In</a>
                </p>
            </div>
        </div>
    );
}