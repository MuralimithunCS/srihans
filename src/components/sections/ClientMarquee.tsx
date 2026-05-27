"use client";

import React from "react";
import { clients } from "@/data/clients";

export const ClientMarquee: React.FC = () => {
  // Split clients into two rows of 9 items
  const row1 = clients.slice(0, 9);
  const row2 = clients.slice(9);

  return (
    <section id="clients" className="py-20 bg-white border-y border-border overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-12">
        <span className="text-xs uppercase font-mono tracking-[0.2em] text-gold font-bold">
          Trusted Partners
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-dark mt-2">
          Furnished for India&apos;s Leading Organizations
        </h2>
      </div>

      {/* Row 1: Scrolling Left */}
      <div className="marquee-container mb-6">
        <div className="marquee-content animate-marquee-left">
          {row1.map((client) => (
            <div
              key={client.id}
              className="mx-8 flex items-center justify-center bg-surface hover:bg-dark border border-border/80 hover:border-gold px-8 py-4 rounded-[6px] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group min-w-[200px]"
            >
              <span className="font-mono text-xs font-bold text-muted group-hover:text-gold uppercase tracking-widest text-center transition-colors">
                {client.logoText}
              </span>
            </div>
          ))}
        </div>
        {/* Duplicate content to make seamless infinite loop */}
        <div className="marquee-content animate-marquee-left" aria-hidden="true">
          {row1.map((client) => (
            <div
              key={`${client.id}-dup`}
              className="mx-8 flex items-center justify-center bg-surface hover:bg-dark border border-border/80 hover:border-gold px-8 py-4 rounded-[6px] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group min-w-[200px]"
            >
              <span className="font-mono text-xs font-bold text-muted group-hover:text-gold uppercase tracking-widest text-center transition-colors">
                {client.logoText}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Scrolling Right */}
      <div className="marquee-container">
        <div className="marquee-content animate-marquee-right">
          {row2.map((client) => (
            <div
              key={client.id}
              className="mx-8 flex items-center justify-center bg-surface hover:bg-dark border border-border/80 hover:border-gold px-8 py-4 rounded-[6px] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group min-w-[200px]"
            >
              <span className="font-mono text-xs font-bold text-muted group-hover:text-gold uppercase tracking-widest text-center transition-colors">
                {client.logoText}
              </span>
            </div>
          ))}
        </div>
        {/* Duplicate content to make seamless infinite loop */}
        <div className="marquee-content animate-marquee-right" aria-hidden="true">
          {row2.map((client) => (
            <div
              key={`${client.id}-dup`}
              className="mx-8 flex items-center justify-center bg-surface hover:bg-dark border border-border/80 hover:border-gold px-8 py-4 rounded-[6px] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group min-w-[200px]"
            >
              <span className="font-mono text-xs font-bold text-muted group-hover:text-gold uppercase tracking-widest text-center transition-colors">
                {client.logoText}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
