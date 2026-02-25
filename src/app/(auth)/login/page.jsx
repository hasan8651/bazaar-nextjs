"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ShoppingBag, ArrowRight, Check } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

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
              Welcome back
            </h1>
            <p className="text-sm text-center" style={{ color: "#64748B" }}>
              Sign in to continue shopping
            </p>
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

              <div >
                <a
                  href="#"
                  className="text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: "#0EA5A4" }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "#0EA5A4" }}
              >
                Sign in
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
              <span className="text-xs" style={{ color: "#94A3B8" }}>or continue with</span>
              <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-1 shadow-sm">
              {[
                {
                  label: "Google",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  ),
                },

              ].map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-all hover:bg-gray-50 active:scale-[0.98]"
                  style={{ borderColor: "#E2E8F0", color: "#1E293B" }}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm mt-6" style={{ color: "#64748B" }}>
            Don't have an account?{" "}
            <a
              href="#"
              className="font-semibold transition-opacity hover:opacity-70"
              style={{ color: "#0EA5A4" }}
            >
              Create one free
            </a>
          </p>


        </div>
      </div>
    </div>
  );
}
