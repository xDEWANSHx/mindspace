"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Shield, User, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadingRole, setLoadingRole] = useState(null); // 'Admin' | 'Staff' | 'form'

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoadingRole("form");
    setTimeout(() => {
      // Form default logic: match strings
      const normalized = username.toLowerCase();
      if (normalized.includes("admin")) {
        localStorage.setItem("mindspace_user_role", "Admin");
        localStorage.setItem("mindspace_user_name", "Harsh Goyal (Admin)");
        router.push("/dashboard");
      } else {
        localStorage.setItem("mindspace_user_role", "Staff");
        localStorage.setItem("mindspace_user_name", "Arjun Sharma (Staff)");
        router.push("/dashboard");
      }
    }, 1000);
  };

  const handleQuickLogin = (role) => {
    setLoadingRole(role);
    setTimeout(() => {
      localStorage.setItem("mindspace_user_role", role);
      localStorage.setItem(
        "mindspace_user_name",
        role === "Admin" ? "Harsh Goyal (Admin)" : "Arjun Sharma (Staff)"
      );
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#1C2421] text-stone-200 flex flex-col justify-between py-12 px-6 relative overflow-hidden font-body">
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] bg-accent-aqua-core/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[45vw] h-[45vw] bg-accent-birch-wood/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between z-10">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Landing Page</span>
        </button>
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent-birch-wood">
          MindSpace Internal Console
        </span>
      </header>

      {/* Main Login Card Container */}
      <main className="w-full max-w-md mx-auto my-auto z-10 flex flex-col gap-8">
        
        {/* Branding */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative w-20 h-20 bg-white border border-accent-birch-wood rounded-full overflow-hidden shadow-lg flex items-center justify-center select-none p-0.5">
            <Image src="/assets/logo.jpg" alt="MindSpace Logo" fill className="object-contain" />
          </div>
          <h1 className="shrimp-display text-4xl text-white tracking-wide mt-2">
            PORTAL LOGIN
          </h1>
          <p className="text-xs text-stone-400">
            Secure Role-Based Access Control Console.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#262F2C] border border-stone-800/80 p-8 squircle-md shadow-2xl flex flex-col gap-6">
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            {/* Field Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 px-1">
                Security Identifier
              </label>
              <div className="flex items-center gap-3 bg-[#1C2421] border border-stone-800 px-4 py-3 rounded-2xl focus-within:border-accent-aqua-core transition-colors">
                <User className="w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  required
                  placeholder="admin_goyal or staff_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border-0 outline-0 p-0 text-sm text-white font-medium placeholder-stone-600"
                />
              </div>
            </div>

            {/* Field Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 px-1">
                Access Passcode
              </label>
              <div className="flex items-center gap-3 bg-[#1C2421] border border-stone-800 px-4 py-3 rounded-2xl focus-within:border-accent-aqua-core transition-colors">
                <Lock className="w-4 h-4 text-stone-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 outline-0 p-0 text-sm text-white font-medium placeholder-stone-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loadingRole !== null}
              className="w-full py-4 bg-gradient-to-r from-accent-aqua-core to-[#14B8A6] text-white text-xs uppercase tracking-widest font-bold rounded-2xl transition-all duration-300 hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loadingRole === "form" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          {/* Quick-Switch Bypass Toggles for Testing */}
          <div className="flex flex-col gap-4 mt-4 pt-6 border-t border-stone-800">
            <span className="text-[9px] uppercase tracking-widest font-bold text-stone-500 text-center">
              Developer Quick-Bypass Authentication
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickLogin("Admin")}
                disabled={loadingRole !== null}
                className="py-3 px-4 bg-white/5 hover:bg-white/10 hover:border-accent-birch-wood border border-stone-800/80 rounded-xl text-[10px] font-bold uppercase tracking-wider text-accent-birch-wood flex flex-col items-center gap-1.5 transition-all cursor-pointer"
              >
                {loadingRole === "Admin" ? (
                  <Loader2 className="w-4 h-4 animate-spin text-accent-birch-wood" />
                ) : (
                  <Shield className="w-4 h-4 text-accent-birch-wood" />
                )}
                <span>Admin View</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("Staff")}
                disabled={loadingRole !== null}
                className="py-3 px-4 bg-white/5 hover:bg-white/10 hover:border-accent-aqua-core border border-stone-800/80 rounded-xl text-[10px] font-bold uppercase tracking-wider text-accent-aqua-core flex flex-col items-center gap-1.5 transition-all cursor-pointer"
              >
                {loadingRole === "Staff" ? (
                  <Loader2 className="w-4 h-4 animate-spin text-accent-aqua-core" />
                ) : (
                  <Sparkles className="w-4 h-4 text-accent-aqua-core" />
                )}
                <span>Staff View</span>
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full text-center text-[10px] text-stone-500 z-10 select-none">
        © {new Date().getFullYear()} MindSpace Library Inc. Authorization logs are recorded on server node ff6bcbea.
      </footer>
    </div>
  );
}
