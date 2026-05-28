"use client";

import React, { useState } from "react";
import Link from "next/link";
import { products as staticProducts } from "@/data/products";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { Star, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types";

interface BestSellersProps {
  initialProducts?: Product[];
}

export const BestSellers: React.FC<BestSellersProps> = ({ initialProducts }) => {
  const { addItem } = useQuoteCart();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Items" },
    { id: "mesh-chairs", label: "Chairs" },
    { id: "workstations", label: "Workstations" },
    { id: "executive-tables", label: "Tables" },
    { id: "sofas-lounge", label: "Sofas" },
    { id: "storage", label: "Storage" },
  ];

  const allProducts = initialProducts || staticProducts;

  // We filter to showcase only marked best sellers in this section
  const bestSellersList = allProducts.filter((p) => p.featured);

  const filteredProducts =
    activeTab === "all"
      ? bestSellersList
      : bestSellersList.filter((p) => p.category === activeTab);

  return (
    <section id="best-sellers" className="py-24 bg-surface px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/80 pb-8">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-gold font-bold">
              Best Sellers
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-dark mt-2">
              Our Showcase Models
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-dark text-white shadow-md"
                    : "bg-white text-charcoal hover:bg-gold hover:text-dark border border-border"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-[6px] overflow-hidden border border-border shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group flex flex-col h-full"
              >
                {/* Product Image & Badges */}
                <div className="relative aspect-[4/3] bg-white flex items-center justify-center p-6 border-b border-border/50 overflow-hidden shrink-0">
                  <span className="absolute top-3 left-3 bg-red text-white text-[9px] font-bold font-mono uppercase px-2 py-0.5 tracking-wider rounded-sm z-10">
                    BEST SELLER
                  </span>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-[160px] object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Overlay Quick actions */}
                  <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Link
                      href={`/products/${product.id}`}
                      className="bg-white hover:bg-gold text-dark p-2.5 rounded-full shadow-lg transition-transform duration-300 transform scale-90 group-hover:scale-100"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Product Card Details */}
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-sans text-base font-bold text-dark hover:text-gold transition-colors truncate">
                      {product.name}
                    </h3>
                  </div>

                  {/* Trust Rating */}
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <div className="flex text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <span className="font-bold text-dark">4.8</span>
                    <span className="text-[10px]">(198 reviews)</span>
                  </div>

                  {/* Bullet Specs in Monospace */}
                  <div className="text-[10px] font-mono text-muted tracking-wide flex flex-wrap gap-x-2 gap-y-1 bg-surface p-2 rounded-sm min-h-[48px] items-center">
                    {Object.entries(product.specs).slice(0, 3).map(([key, val], i) => (
                      <span key={i} className="inline-block">
                        • {key}: {val}
                      </span>
                    ))}
                  </div>

                  {/* Pricing row */}
                  <div className="pt-2 border-t border-border/60 mt-auto flex items-baseline justify-between">
                    <div>
                      <span className="block text-[10px] uppercase font-mono tracking-wider text-muted">
                        Starting from
                      </span>
                      <span className="text-xl font-bold font-mono text-dark">
                        {product.price > 0 ? `₹${product.price.toLocaleString("en-IN")}` : "Call for Quote"}
                      </span>
                    </div>
                  </div>

                  {/* Interactive CTAs */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => addItem(product)}
                      className="bg-dark hover:bg-gold hover:text-dark text-white font-bold text-[10px] uppercase tracking-wider py-3 rounded-sm transition-all duration-300 flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Get Quote</span>
                    </button>
                    <Link
                      href={`/products/${product.id}`}
                      className="border border-border hover:border-dark text-charcoal hover:text-dark font-bold text-[10px] uppercase tracking-wider py-3 rounded-sm transition-all duration-300 text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted font-mono text-xs bg-white rounded border border-border">
            No showcase models match this filter tab.
          </div>
        )}

      </div>
    </section>
  );
};
