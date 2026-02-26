"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (step === 1) {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error === "OTP_SENT") {
          toast.success("Verification code sent to your email!");
          setStep(2);
        } else if (result?.error) {
          toast.error(result.error);
        }
      } else {
        const result = await signIn("credentials", {
          email,
          otp,
          redirect: false,
        });

        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Login Successful!");
          router.push("/");
          router.refresh();
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--background)]">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0EA5A4]/10 text-[#0EA5A4] mb-4">
            {step === 1 ? <Lock size={32} /> : <ShieldCheck size={32} />}
          </div>
          <h1 className="text-3xl font-bold mb-1 text-[var(--primary)]">
            {step === 1 ? "Welcome Back" : "Security Check"}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {step === 1 ? "Sign in to continue shopping" : "Please enter the code sent to your email"}
          </p>
        </div>

        <div className="bg-[var(--background)] rounded-3xl p-8 shadow-xl border border-[var(--border)]">
          <form onSubmit={handleLogin} className="space-y-5">
            {step === 1 ? (
              <>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold ml-1 text-[var(--text-primary)]">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-primary)]"/>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none transition-all border text-[var(--text-secondary)] bg-[var(--surface)] focus:bg-white focus:ring-2 focus:ring-[#0EA5A4]/20"/>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold ml-1 text-[var(--text-primary)]">Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-primary)]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-12 py-3.5 rounded-2xl text-sm outline-none transition-all border text-[var(--text-secondary)] bg-[var(--surface)] focus:bg-white focus:ring-2 focus:ring-[#0EA5A4]/20"
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

                <div className="text-right">
                  <a href="#" className="text-xs font-bold hover:underline text-[var(--secondary)]">Forgot password?</a>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-center block text-[var(--secondary)]">Verification Code</label>
                  <div className="relative">
                    <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      maxLength={8}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.toUpperCase())}
                      placeholder="EX: A1B2C3D4"
                      className="w-full pl-11 pr-4 py-4 rounded-2xl text-center text-xl font-bold tracking-[4px] outline-none border-2 bg-[var(--surface)] focus:bg-white focus:border-[#0EA5A4]"
                    />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(1)} className="w-full text-xs font-medium text-slate-500 hover:text-[#0EA5A4] transition-colors">
                  Try another email or password
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-[#0EA5A4]/30 active:scale-[0.98] disabled:opacity-70 btn-primary">
              {isLoading ? "Processing..." : step === 1 ? "Sign In" : "Verify & Login"}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          {step === 1 && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[var(--background)] px-4 text-slate-400 font-medium">Or continue with</span></div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full py-3.5 rounded-2xl text-sm font-semibold border-2 border-[var(--border)] flex items-center justify-center gap-3 transition-all bg-[var(--surface)] text-[var(--text-primary)] active:scale-[0.98] btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google Account
              </button>
            </>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--text-primary)]">
          Don't have an account? <a href="/register" className="font-bold text-[var(--secondary)] hover:underline">Create for free</a>
        </p>
      </div>
    </div>
  );
}