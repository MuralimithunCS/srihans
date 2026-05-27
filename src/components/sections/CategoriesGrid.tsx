"use client";

import React from "react";
import Link from "next/link";
import { categories } from "@/data/categories";
import { ArrowUpRight } from "lucide-react";

export const CategoriesGrid: React.FC = () => {
  // We showcase the top 10 categories as specified in the catalog
  const displayCategories = categories.slice(0, 10);

  return (
    <section id="categories" className="py-24 bg-white px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-gold font-bold">
            Curated Workspaces
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-dark relative pb-4">
            Everything Your Office Needs
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gold" />
          </h2>
          <p className="font-sans text-sm md:text-base text-muted max-w-xl leading-relaxed">
            From boardroom desks to orthopedic chairs, browse our extensive ranges engineered specifically for ergonomics and collaboration.
          </p>
        </div>

        {/* Categories Grid: 5 columns x 2 rows on desktop, 2 cols on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {displayCategories.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative aspect-square overflow-hidden rounded-[12px] bg-surface shadow-sm border border-border/40 cursor-pointer block"
            >
              {/* Category Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              
              {/* Dark Overlay Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Category Content Overlay */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end items-start gap-2">
                <span className="text-[10px] font-mono tracking-widest text-gold font-semibold uppercase">
                  Series 0{idx + 1}
                </span>
                <div className="flex justify-between items-center w-full">
                  <h3 className="font-display text-lg md:text-xl font-bold text-white leading-tight">
                    {cat.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
