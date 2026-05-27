"use client";

import React from "react";
import { testimonials } from "@/data/testimonials";
import { Quote, Star } from "lucide-react";

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-surface px-6 md:px-12 lg:px-20 border-b border-border/80">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-gold font-bold">
            Reviews
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-dark relative pb-4">
            Words From Our Clients
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gold" />
          </h2>
          <p className="font-sans text-sm md:text-base text-muted max-w-xl leading-relaxed">
            Discover how we help administrative managers, purchasing heads, and operations directors achieve ergonomic and aesthetic transformations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-[12px] p-8 border border-border/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gold/50 flex flex-col justify-between relative group"
            >
              {/* Quote Icon watermark */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-gold/10 group-hover:text-gold/20 transition-colors" />

              <div className="flex flex-col gap-4">
                {/* Gold Stars */}
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                
                <p className="font-sans text-sm text-charcoal italic leading-relaxed relative z-10">
                  &quot;{t.quote}&quot;
                </p>
              </div>

              {/* Author Profile */}
              <div className="pt-6 border-t border-border/60 mt-6 flex flex-col gap-1">
                <span className="font-display text-base font-bold text-dark">
                  {t.author}
                </span>
                <span className="font-mono text-[10px] uppercase text-muted tracking-wider">
                  {t.role}
                </span>
                <span className="font-sans text-xs font-semibold text-gold mt-0.5">
                  {t.company}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
