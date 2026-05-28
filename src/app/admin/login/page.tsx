"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      setError("Please enter your admin passcode.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      if (res.ok) {
        // Authenticated successfully, redirect to dashboard
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Authentication failed. Incorrect passcode.");
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-6 font-sans relative overflow-hidden">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#C8A96E_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gold/10 blur-[80px] top-[-100px] right-[-100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px] bottom-[-200px] left-[-200px] pointer-events-none" />

      <div className="max-w-md w-full flex flex-col gap-8 relative z-10">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-col select-none group">
            <span className="font-display text-4xl font-bold tracking-tight text-white">
              SRIHANS
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-gold -mt-1 text-center">
              Office Furniture
            </span>
          </div>
          <span className="text-xs uppercase font-mono tracking-widest text-muted mt-2">
            Secure Admin Portal Access
          </span>
        </div>

        {/* Card Panel */}
        <div className="bg-charcoal border border-charcoal/80 p-8 rounded-[12px] shadow-2xl flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <h2 className="font-display text-2xl font-bold text-white">Enter Passcode</h2>
            <p className="text-xs text-gray-400">
              Provide the secure showroom passcode key to proceed to inventory and lead manager.
            </p>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3.5 rounded-[6px] text-xs flex items-start gap-2 animate-fade-up">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5 relative">
              <label htmlFor="passcode" className="font-bold text-gray-300 text-[10px] uppercase tracking-wider font-mono">
                Security Passcode
              </label>
              <div className="relative">
                <input
                  id="passcode"
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-dark/60 border border-charcoal focus:border-gold outline-none p-4 pl-11 rounded-sm transition-all text-white placeholder:text-muted"
                />
                <Lock className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-white text-dark font-bold text-xs uppercase tracking-widest py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:bg-muted disabled:text-muted-foreground"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <span>Unlock Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center font-mono text-[10px] text-gray-500">
          <span>Srihans Office Furniture © {new Date().getFullYear()}</span>
        </div>

      </div>
    </div>
  );
}
