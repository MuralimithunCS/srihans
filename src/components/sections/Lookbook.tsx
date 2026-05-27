"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export const Lookbook: React.FC = () => {
  const projects = [
    {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      title: "HDFC Regional Head Office",
      category: "150 Workstations & Executive Cabins",
      size: "col-span-2 row-span-2",
    },
    {
      image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=800",
      title: "Comstar Automotive R&D Hub",
      category: "Custom L-shape Sharing Units",
      size: "col-span-1 row-span-1",
    },
    {
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
      title: "Oxford College Cafeteria Zone",
      category: "Vivid Polypropylene Agile Seating",
      size: "col-span-1 row-span-2",
    },
    {
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
      title: "Silicon Valley Startup Cabin",
      category: "Royale Leather Seats & CEO Desks",
      size: "col-span-1 row-span-1",
    },
  ];

  return (
    <section id="lookbook" className="py-24 bg-white px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-gold font-bold">
              Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-dark mt-2">
              Spaces We&apos;ve Transformed
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base text-muted max-w-md leading-relaxed">
            Take visual inspiration from our recent corporate integrations in Bangalore. Crafted dynamically, tailored custom-fit.
          </p>
        </div>

        {/* Masonry Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px]">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-[12px] group border border-border/40 shadow-sm ${proj.size}`}
            >
              {/* Image Container */}
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                loading="lazy"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Text Layer */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end items-start gap-1">
                <span className="text-[10px] font-mono text-gold uppercase tracking-wider font-semibold">
                  {proj.category}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">
                  {proj.title}
                </h3>
                
                {/* Custom hover tag */}
                <div className="flex items-center gap-1.5 text-xs text-white/80 font-semibold group-hover:text-gold transition-colors duration-200 mt-2">
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
