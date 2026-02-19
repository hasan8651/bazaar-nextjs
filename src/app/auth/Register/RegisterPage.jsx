"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ShoppingBag, ArrowRight, Check } from "lucide-react";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [photo ,setPhoto] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Logging in as ${email}`);
    };

    return (
        <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans', sans-serif", background: "#F8FAFC" }}>

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-3xl text-center font-bold mb-1" style={{ color: "#1E293B" }}>
                            Create Account
                        </h1>
                        {/* <p className="text-sm text-center" style={{ color: "#64748B" }}>
              Sign in to continue shopping
            </p> */}
                    </div>

                    {/* Form card */}
                    <div
                        className="bg-white rounded-2xl p-8 shadow-sm border"
                        style={{ borderColor: "#E2E8F0" }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: "#1E293B" }}>
                                    Email address
                                </label>
                                <div className="relative">
                                    <Mail
                                        size={16}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2"
                                        style={{ color: "#64748B" }}
                                    />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all border"
                                        style={{
                                            borderColor: "#E2E8F0",
                                            color: "#1E293B",
                                            background: "#F8FAFC",
                                        }}
                                        onFocus={(e) => (e.target.style.borderColor = "#0EA5A4")}
                                        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: "#1E293B" }}>
                                    Name
                                </label>
                                <div className="relative">
                                    <Mail
                                        size={16}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2"
                                        style={{ color: "#64748B" }}
                                    />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter Name"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all border"
                                        style={{
                                            borderColor: "#E2E8F0",
                                            color: "#1E293B",
                                            background: "#F8FAFC",
                                        }}
                                        onFocus={(e) => (e.target.style.borderColor = "#0EA5A4")}
                                        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: "#1E293B" }}>
                                    Photo
                                </label>
                                <div className="relative">
                                    <Mail
                                        size={16}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2"
                                        style={{ color: "#64748B" }}
                                    />
                                    <input
                                        type="text"
                                        required
                                        value={photo}
                                        onChange={(e) => setPhoto(e.target.value)}
                                        placeholder="Image URL"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all border"
                                        style={{
                                            borderColor: "#E2E8F0",
                                            color: "#1E293B",
                                            background: "#F8FAFC",
                                        }}
                                        onFocus={(e) => (e.target.style.borderColor = "#0EA5A4")}
                                        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: "#1E293B" }}>
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        size={16}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2"
                                        style={{ color: "#64748B" }}
                                    />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none transition-all border"
                                        style={{
                                            borderColor: "#E2E8F0",
                                            color: "#1E293B",
                                            background: "#F8FAFC",
                                        }}
                                        onFocus={(e) => (e.target.style.borderColor = "#0EA5A4")}
                                        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 focus:outline-none"
                                        style={{ color: "#64748B" }}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
                                style={{ background: "#0EA5A4" }}
                            >
                                Register
                                
                            </button>
                        </form>


                      
                    </div>

                    {/* Sign up link */}
                 


                </div>
            </div>
        </div>
    );
}
