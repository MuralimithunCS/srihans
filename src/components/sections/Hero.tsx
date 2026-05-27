"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[95vh] pt-[72px] flex items-center justify-between bg-white overflow-hidden px-6 md:px-12 lg:px-20 py-12">
      {/* Delicate diagonal pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonal-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 40 M 0 0 L 40 40" fill="none" stroke="#1A1A1A" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-grid)" />
        </svg>
      </div>

      {/* Hero Layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Headline Content */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          
          {/* Tagline Badge */}
          <div className="animate-fade-up delay-0 inline-flex items-center gap-2 border border-border bg-surface px-4 py-1.5 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-charcoal font-semibold">
              Premium Ergonomic Workspace Solutions
            </span>
          </div>

          {/* Staggered Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-[84px] text-dark leading-[1.05] tracking-tight">
            <span className="block animate-fade-up delay-150 font-light">
              Design Changes
            </span>
            <span className="block italic font-bold text-dark animate-fade-up delay-300">
              Everything<span className="text-gold">.</span>
            </span>
          </h1>

          <p className="animate-fade-up delay-450 font-sans text-base md:text-lg text-muted max-w-xl leading-relaxed">
            Premium ergonomic office furniture crafted for modern Indian workspaces. Factory-direct from Bangalore, optimized for health, efficiency, and elegant corporate aesthetics.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-450 flex flex-wrap gap-4 pt-4">
            <Link
              href="#catalog"
              className="bg-dark hover:bg-gold hover:text-dark text-white font-semibold text-sm uppercase tracking-wider py-4 px-8 rounded-sm transition-all duration-300 flex items-center gap-2 group shadow-lg"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#contact"
              className="border border-dark hover:border-gold hover:bg-gold hover:text-dark text-dark font-semibold text-sm uppercase tracking-wider py-4 px-8 rounded-sm transition-all duration-300"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Trust Matrix */}
          <div className="animate-fade-up delay-450 border-t border-border pt-8 mt-4 grid grid-cols-3 gap-4 max-w-lg">
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-dark">18+ Years</span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-muted">Of Trusted Service</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-dark">500+ Clients</span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-muted">Corporate Offices</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-dark">Bangalore</span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-gold font-semibold">Factory Direct</span>
            </div>
          </div>

        </div>

        {/* Right Floating Product Graphic */}
        <div className="lg:col-span-5 flex justify-center items-center relative animate-fade-up delay-300">
          <div className="relative w-full max-w-md md:max-w-lg aspect-square flex items-center justify-center">
            {/* Subtle glow background layer */}
            <div className="absolute inset-0 bg-surface rounded-full filter blur-[60px] opacity-60 scale-95" />
            
            {/* Floating primary product photo */}
            <div className="relative z-10 transition-transform duration-700 hover:scale-105 hover:-rotate-1 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&q=80&w=800"
                alt="Aeron Premium HB Mesh Chair"
                className="w-full h-auto object-contain max-h-[450px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
              />
            </div>

            {/* Float Info Badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur border border-border shadow-xl p-3 flex items-center gap-3 rounded-sm z-20">
              <div className="w-10 h-10 rounded-sm bg-surface flex items-center justify-center font-bold text-gold text-lg">
                ★
              </div>
              <div>
                <span className="block text-xs font-bold text-dark">Aeron HB Chair</span>
                <span className="block text-[10px] font-mono text-muted">Starting at ₹12,500</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
