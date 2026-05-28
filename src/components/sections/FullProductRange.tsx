"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { products as staticProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { Search, ShoppingBag, Eye, Star } from "lucide-react";
import { Product } from "@/types";

interface FullProductRangeProps {
  initialProducts?: Product[];
}

export const FullProductRange: React.FC<FullProductRangeProps> = ({ initialProducts }) => {
  const { addItem } = useQuoteCart();
  const [activeCategory, setActiveCategory] = useState("workstations");
  const [searchQuery, setSearchQuery] = useState("");

  const allProducts = initialProducts || staticProducts;

  // Dynamically filter product database based on category and search query
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && (searchQuery ? matchesSearch : true);
    });
  }, [allProducts, activeCategory, searchQuery]);

  return (
    <section id="catalog" className="py-24 bg-white px-6 md:px-12 lg:px-20 border-b border-border">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-gold font-bold">
            Interactive Catalog
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-dark relative pb-4">
            Explore Our Full Workspace Range
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gold" />
          </h2>
          <p className="font-sans text-sm md:text-base text-muted max-w-xl leading-relaxed">
            Search our complete collection of custom-built workstations, ergonomic task seating, cafeteria structures, executive cabins, and storage lockers.
          </p>
        </div>

        {/* Interactive Search & Categories Nav bar */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center bg-surface border border-border p-4 rounded-[6px]">
          
          {/* Categories select list */}
          <div className="flex overflow-x-auto gap-1.5 pb-2 lg:pb-0 scrollbar-thin scrollbar-thumb-gold scrollbar-track-surface max-w-3xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery("");
                }}
                className={`text-xs uppercase font-semibold tracking-wider px-4 py-2.5 rounded-sm whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-dark text-white shadow-sm"
                    : "bg-transparent text-charcoal hover:bg-gold/25 hover:text-dark"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search box within catalog */}
          <div className="relative flex items-center bg-white border border-border rounded-sm w-full lg:max-w-xs px-3">
            <Search className="w-4 h-4 text-muted shrink-0" />
            <input
              type="text"
              placeholder="Search category series..."
              className="w-full bg-transparent border-none outline-none p-3.5 text-xs text-dark placeholder:text-muted focus:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

        </div>

        {/* Products Catalog Display Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-[6px] overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[4/3] bg-white flex items-center justify-center p-6 border-b border-border/40 overflow-hidden shrink-0">
                  {product.featured && (
                    <span className="absolute top-3 left-3 bg-red text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded-sm">
                      BEST SELLER
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-[140px] object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Hover Actions Overlay */}
                  <div className="absolute inset-0 bg-dark/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Link
                      href={`/products/${product.id}`}
                      className="bg-white hover:bg-gold text-dark p-2.5 rounded-full shadow-lg transition-transform duration-300 scale-90 group-hover:scale-100"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <h3 className="font-sans text-sm font-bold text-dark hover:text-gold transition-colors truncate">
                    {product.name}
                  </h3>

                  {/* Bullet Specs in Monospace */}
                  <div className="text-[10px] font-mono text-muted tracking-wide flex flex-wrap gap-x-2 gap-y-1 bg-surface p-2 rounded-sm min-h-[44px] items-center">
                    {Object.entries(product.specs).slice(0, 2).map(([key, val], i) => (
                      <span key={i} className="inline-block">
                        • {key}: {val}
                      </span>
                    ))}
                  </div>

                  {/* Rating row */}
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <div className="flex text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <span className="font-bold text-dark text-[10px]">4.8</span>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-border/60 mt-auto flex justify-between items-baseline">
                    <div>
                      <span className="block text-[9px] uppercase font-mono tracking-wider text-muted">
                        Starting from
                      </span>
                      <span className="text-base font-bold font-mono text-dark">
                        {product.price > 0 ? `₹${product.price.toLocaleString("en-IN")}` : "Call for Quote"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => addItem(product)}
                      className="bg-dark hover:bg-gold hover:text-dark text-white font-bold text-[9px] uppercase tracking-wider py-2.5 rounded-sm transition-all duration-300 flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Get Quote</span>
                    </button>
                    <Link
                      href={`/products/${product.id}`}
                      className="border border-border hover:border-dark text-charcoal hover:text-dark font-bold text-[9px] uppercase tracking-wider py-2.5 rounded-sm transition-all duration-300 text-center"
                    >
                      Specs Details
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted font-mono text-xs bg-surface rounded border border-border">
            No products found matching &quot;{searchQuery}&quot; inside &quot;{categories.find(c => c.id === activeCategory)?.name}&quot; Catalog.
          </div>
        )}

      </div>
    </section>
  );
};
