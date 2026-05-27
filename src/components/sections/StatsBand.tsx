"use client";

import React, { useEffect, useState, useRef } from "react";

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
}

const StatCounter: React.FC<StatItemProps> = ({ target, suffix, label }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;

    let start = 0;
    const duration = 2000; // 2 seconds animation
    const increment = target / (duration / 16); // ~60fps
    
    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [hasTriggered, target]);

  return (
    <div ref={elementRef} className="flex flex-col items-center justify-center text-center p-6 md:p-8">
      <span className="font-display text-4xl md:text-6xl font-bold text-gold tracking-tight font-mono mb-2">
        {count.toLocaleString("en-IN")}{suffix}
      </span>
      <span className="font-mono text-xs md:text-sm text-gray-400 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
};

export const StatsBand: React.FC = () => {
  return (
    <section className="bg-dark border-y border-charcoal py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Visual background subtle grid nodes */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#C8A96E_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        <StatCounter target={500} suffix="+" label="Satisfied Clients" />
        <StatCounter target={50} suffix="+" label="Product Series" />
        <StatCounter target={18} suffix="+" label="Years Experience" />
        <StatCounter target={10000} suffix="+" label="Workstations Delivered" />
      </div>
    </section>
  );
};
