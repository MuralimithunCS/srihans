"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const AboutBrand: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400",
  ];

  return (
    <section id="about" className="py-24 bg-white px-6 md:px-12 lg:px-20 relative overflow-hidden">
      
      {/* Large watermark text backdrop behind columns */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 watermark-text z-0">
        SRIHANS
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Story Column */}
        <div className="lg:col-span-6 flex flex-col gap-6 relative">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-gold font-bold">
            Our Legacy
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl font-light italic leading-tight text-dark">
            &quot;18 years of crafting workspaces that inspire.&quot;
          </h2>

          <div className="flex flex-col gap-4 font-sans text-sm md:text-base text-muted leading-relaxed">
            <p>
              Srihans Office Furniture has been Bangalore&apos;s most trusted workspace solutions partner since 2005. From Fortune 500 multinationals to fast-growing tech startups, we have furnished over 500 offices with precision-crafted, ergonomically designed furniture.
            </p>
            <p>
              Our manufacturing unit in Nayandahalli constructs every piece to order—ensuring top-tier quality controls, deep customizations, and honest, factory-direct pricing without the retail markup. We combine international standards with domestic agility.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="#contact"
              className="bg-dark hover:bg-gold hover:text-dark text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-6 rounded-sm transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Our Story</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#clients"
              className="border border-border hover:border-dark text-charcoal font-semibold text-xs uppercase tracking-wider py-3.5 px-6 rounded-sm transition-all duration-300"
            >
              View Clients
            </Link>
          </div>
        </div>

        {/* Right 2x2 Photo Grid Column */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-[6px] overflow-hidden border border-border shadow-sm group relative"
            >
              <img
                src={img}
                alt="Srihans Workspace Integration"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-dark/10 opacity-100 group-hover:bg-transparent transition-all duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
