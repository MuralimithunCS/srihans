"use client";

import React from "react";
import { BadgePercent, ShieldCheck, Truck, Wrench } from "lucide-react";

export const Advantage: React.FC = () => {
  const pillars = [
    {
      icon: <BadgePercent className="w-8 h-8 text-gold" />,
      title: "Factory-Direct Pricing",
      desc: "Skip the middlemen. Every single piece is manufactured at our own Bangalore factories in Nayandahalli at honest, factory-direct prices.",
    },
    {
      icon: <Wrench className="w-8 h-8 text-gold" />,
      title: "Custom Configurations",
      desc: "Any size, color, or quantity. We manufacture custom systems that align with your workspace blueprints and brand identity guidelines.",
    },
    {
      icon: <Truck className="w-8 h-8 text-gold" />,
      title: "Pan-India Logistics & Setup",
      desc: "Professional delivery, distribution, and assembly network across India. We set it up completely so you can start working instantly.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-gold" />,
      title: "18+ Years of Corporate Trust",
      desc: "Since 2005, we've furnished 500+ corporate offices, public banks, educational schools, and government institutions across India.",
    },
  ];

  return (
    <section id="advantage" className="py-24 bg-surface px-6 md:px-12 lg:px-20 border-y border-border/60">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-gold font-bold">
            The Srihans Distinction
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-dark relative pb-4">
            Why Leading Offices Choose Us
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gold" />
          </h2>
          <p className="font-sans text-sm md:text-base text-muted max-w-xl leading-relaxed">
            By combining high-end design intelligence with domestic manufacturing capabilities, we build furniture that lasts a lifetime.
          </p>
        </div>

        {/* Advantage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[12px] p-8 border border-border/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gold hover:-translate-y-1.5 flex flex-col gap-5 group"
            >
              <div className="w-14 h-14 bg-surface rounded-[6px] flex items-center justify-center transition-colors duration-300 group-hover:bg-dark shrink-0">
                {p.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-dark group-hover:text-gold transition-colors">
                {p.title}
              </h3>
              <p className="font-sans text-sm text-muted leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
