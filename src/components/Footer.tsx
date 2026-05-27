"use client";

import React from "react";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-20 pb-8 px-6 md:px-12 border-t border-charcoal mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-charcoal">
        
        {/* Column 1: Brand Info */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex flex-col select-none group">
            <span className="font-display text-3xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-gold">
              SRIHANS
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-gold -mt-1">
              Office Furniture
            </span>
          </Link>
          <p className="font-sans text-sm text-gray-400 leading-relaxed max-w-sm">
            &quot;Design Changes Everything&quot; — Bangalore&apos;s leading partner in premium workspace solutions since 2005. Factory-direct customized configurations.
          </p>
          <div className="flex gap-4 text-xs font-mono text-gold uppercase tracking-wider">
            <span>⬡ 18+ Years</span>
            <span>⬡ 500+ Clients</span>
          </div>
        </div>

        {/* Column 2: Product Categories Links */}
        <div className="flex flex-col gap-5">
          <span className="font-display text-lg font-bold text-white tracking-wide">
            Product Catalog
          </span>
          <div className="grid grid-cols-1 gap-2.5 text-sm text-gray-400 font-sans">
            {categories.slice(0, 7).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="hover:text-gold transition-colors hover:translate-x-1 duration-200 inline-block"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/#catalog"
              className="text-gold font-semibold hover:underline flex items-center gap-1 mt-1"
            >
              Browse All Categories <span>→</span>
            </Link>
          </div>
        </div>

        {/* Column 3: Corporate Info */}
        <div className="flex flex-col gap-5">
          <span className="font-display text-lg font-bold text-white tracking-wide">
            Company
          </span>
          <div className="flex flex-col gap-2.5 text-sm text-gray-400 font-sans">
            <Link href="/#advantage" className="hover:text-gold transition-colors">
              The Srihans Advantage
            </Link>
            <Link href="/#clients" className="hover:text-gold transition-colors">
              Trusted Clients
            </Link>
            <Link href="/#about" className="hover:text-gold transition-colors">
              Our Showroom Story
            </Link>
            <Link href="/#contact" className="hover:text-gold transition-colors">
              Inquire Now
            </Link>
            <a
              href="https://wa.me/916363847274"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors flex items-center gap-1"
            >
              Careers at Srihans <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Column 4: Location Info */}
        <div className="flex flex-col gap-5">
          <span className="font-display text-lg font-bold text-white tracking-wide">
            Get in Touch
          </span>
          <div className="flex flex-col gap-4 text-sm text-gray-400 font-sans">
            <div className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-white text-xs uppercase tracking-wider font-mono">
                  Corporate Showroom
                </span>
                <p className="text-xs leading-relaxed mt-1">
                  No.1, 1st Floor, 8th Cross, Temple Road, Malleshwaram, Near Chandus Hotel, Bangalore-560003
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-white text-xs uppercase tracking-wider font-mono">
                  Production Factory
                </span>
                <p className="text-xs leading-relaxed mt-1">
                  #6, Ground Floor, 7th Mail, Behind The Club Mysore Road, Nayandahalli, South Bangalore, Bengaluru-560039
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-white text-xs uppercase tracking-wider font-mono">
                  Direct Line
                </span>
                <a href="tel:+916363847274" className="text-xs hover:text-gold mt-1 block">
                  +91 63638 47274 | 97319 10657 | 080-2334 2335
                </a>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-white text-xs uppercase tracking-wider font-mono">
                  Email
                </span>
                <a href="mailto:srihansofcefurniture@gmail.com" className="text-xs hover:text-gold mt-1 block">
                  srihansofcefurniture@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
        <div>
          <span>© {new Date().getFullYear()} Srihans Office Furniture, Bangalore. All Rights Reserved.</span>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
          <Link href="/sitemap" className="hover:text-gold transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};
