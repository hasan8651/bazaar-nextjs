"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");


const fillDemoCredentials = (role) => {
    const demoAccounts = {
      admin: {
        email: "admin@primemart.com",
        password: "Admin123#",
      },
      seller: {
        email: "seller@primemart.com",
        password: "Seller123#",
      },
      user: {
        email: "user@primemart.com",
        password: "User123#",
      },
    };

    setEmail(demoAccounts[role].email);
    setPassword(demoAccounts[role].password);
    setOtp("");
    setStep(1);

    toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} demo credentials loaded`);
  };


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
        } else {
          toast.success("Login Successful!");
          router.push("/");
          router.refresh();
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
    <div className="min-h-screen flex  items-stretch justify-center">
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
            Welcome Back to Our Community.
          </h1>
          <p className="text-primary mt-4 text-lg ">
            Sign in to continue your journey and explore the latest premium
            products and exclusive deals curated just for you.
          </p>
        </div>
      </div>

      {/* ডান পাশ: ফর্ম সেকশন */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-(--background)">
        <div className="w-full max-w-md space-y-2">
          <div className="text-center">
            {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0EA5A4]/10 text-[#0EA5A4] mb-4">
            {step === 1 ? <Lock size={32} /> : <ShieldCheck size={32} />}
          </div> */}
            <h1 className="text-3xl font-bold mb-2 text-(--secondary)">
              {step === 1 ? "Welcome Back" : "Security Check"}
            </h1>
            <p className="text-sm text-(--text-primary)">
              {step === 1
                ? "Enter your credentials to access your account"
                : "Please enter the code sent to your email"}
            </p>
          </div>

          <div className="space-y-6 rounded-3xl p-8 shadow-xl border border-(--border)">
            <form onSubmit={handleLogin} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-(--text-primary) ml-1 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-primary)"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3 border outline-none rounded-xl transition-all  text-(--text-primary) bg-(--surface)  focus:ring-2 focus:ring-[#0EA5A4]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-(--text-primary) ml-1 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-primary)"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3 border outline-none rounded-xl transition-all text-(--text-primary) bg-(--surface) focus:ring-2 focus:ring-[#0EA5A4]/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center ml-2">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 accent-(--secondary) cursor-pointer"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-xs font-bold text-(--secondary) cursor-pointer select-none"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-bold hover:underline text-(--secondary)"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-center block text-(--secondary)">
                      Verification Code
                    </label>
                    <div className="relative">
                      <KeyRound
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                      />
                      <input
                        type="text"
                        required
                        maxLength={8}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.toUpperCase())}
                        placeholder="EX: A1B2C3D4"
                        className="w-full pl-11 pr-4 py-3 border outline-none rounded-xl transition-all  text-(--text-primary) bg-(--surface) focus:ring-2 focus:ring-[#0EA5A4]/20"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                     onClick={() => {
                      setStep(1);
                      setOtp("");
                    }}
                    className="w-full text-xs font-medium text-slate-500 hover:text-[#0EA5A4] transition-colors"
                  >
                    Try another email or password
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0EA5A4] text-white font-bold rounded-xl hover:bg-[#0c8d8c] transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-teal-500/20 cursor-pointer"
              >
                {isLoading
                  ? "Processing..."
                  : step === 1
                    ? "Sign In"
                    : "Verify & Login"}
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>

            {step === 1 && (
              <>

<div className="rounded-2xl border border-(--border) p-4 bg-(--surface)">
                  <p className="text-sm font-semibold text-(--secondary) mb-2 text-center">
                    Quick Demo Login
                  </p>

                  <p className="text-xs text-center text-(--text-primary) mb-3">
                    For evaluation, use these demo accounts to test different roles.
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials("admin")}
                      className="px-3 py-2 rounded-xl text-sm font-medium border border-(--border) hover:bg-(--surface) transition cursor-pointer"
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials("seller")}
                      className="px-3 py-2 rounded-xl text-sm font-medium border border-(--border) hover:bg-(--surface) transition cursor-pointer"
                    >
                      Seller
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials("user")}
                      className="px-3 py-2 rounded-xl text-sm font-medium border border-(--border) hover:bg-(--surface) transition cursor-pointer"
                    >
                      User
                    </button>
                  </div>
                </div>


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
                  onClick={handleGoogleLogin}
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
                  Google Account
                </button>
              </>
            )}
            <div className="text-center">
              <p className="mt-2 text-slate-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-(--secondary) hover:underline"
                >
                  Create for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}