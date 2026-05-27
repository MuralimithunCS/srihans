"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import {
  Search,
  MessageCircle,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { setIsDrawerOpen, cartCount } = useQuoteCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  // Monitor page scroll to update header styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter search matches across name and description dynamically
  const query = searchQuery.trim().toLowerCase();
  const searchResults = query.length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query)
      ).slice(0, 5)
    : [];

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "916363847274";
  const waUrl = `https://wa.me/${waNumber}?text=Hi%20Srihans%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20office%20furniture.`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 flex items-center justify-between px-6 md:px-12 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-border/80 shadow-sm"
            : "bg-white border-b border-border/30"
        }`}
      >
        {/* Brand Logo Wordmark */}
        <Link href="/" className="flex flex-col select-none group">
          <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-dark transition-colors duration-200 group-hover:text-gold">
            SRIHANS
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-muted -mt-1 group-hover:text-dark">
            Office Furniture
          </span>
        </Link>

        {/* Desktop Central Links */}
        <nav className="hidden lg:flex items-center gap-8 font-sans font-medium text-charcoal text-sm">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          
          {/* Products Mega Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-gold transition-colors py-4">
              <span>Products</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {productsDropdownOpen && (
              <div className="absolute top-[50px] -left-48 w-[640px] bg-white border border-border shadow-2xl p-6 grid grid-cols-2 gap-4 rounded-md animate-fade-up">
                <div className="col-span-2 pb-2 border-b border-border flex justify-between items-center">
                  <span className="font-display text-lg font-bold text-dark">Explore Our Range</span>
                  <Link href="/#catalog" className="text-xs text-gold flex items-center gap-1 hover:underline">
                    View Catalog <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="flex items-center gap-3 p-2 rounded-sm hover:bg-surface transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-sm bg-surface overflow-hidden relative group-hover:scale-105 transition-transform">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-dark group-hover:text-gold transition-colors">
                        {cat.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/#advantage" className="hover:text-gold transition-colors">
            About
          </Link>
          <Link href="/#clients" className="hover:text-gold transition-colors">
            Clients
          </Link>
          <Link href="/#contact" className="hover:text-gold transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-5">
          {/* Inline Search Toggle */}
          <button
            onClick={() => setSearchOpen(true)}
            className="text-dark hover:text-gold p-2 transition-colors relative"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* WhatsApp Pill */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-whatsapp hover:bg-emerald-600 text-white font-medium text-xs py-2 px-4 rounded-full transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp</span>
          </a>

          {/* B2B Get Quote Action */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative flex items-center gap-2 bg-dark hover:bg-gold hover:text-dark text-white font-medium text-xs uppercase tracking-wider py-2.5 px-5 rounded-sm transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Get Quote</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono border border-white animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Navbar Hamburger Controls */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-dark hover:text-gold p-2"
          >
            <Search className="w-5.5 h-5.5" />
          </button>
          
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative text-dark hover:text-gold p-2"
          >
            <ShoppingBag className="w-5.5 h-5.5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-dark p-2 hover:text-gold"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN OVERLAY MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-6 animate-fade-up">
          <div className="flex justify-between items-center pb-6 border-b border-border">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col"
            >
              <span className="font-display text-2xl font-bold text-dark">
                SRIHANS
              </span>
              <span className="text-[8px] uppercase tracking-[0.2em] font-mono text-muted -mt-1">
                Office Furniture
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-dark p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-6">
            <span className="text-[10px] uppercase font-mono tracking-widest text-muted block mb-2">
              Browse Categories
            </span>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 bg-surface hover:bg-card-hover rounded transition-colors group"
                >
                  <div className="w-8 h-8 rounded-sm bg-border overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-semibold text-dark truncate">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>

            <div className="border-t border-border pt-6 flex flex-col gap-4 font-display text-2xl font-bold text-dark">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold">
                Home
              </Link>
              <Link href="/#advantage" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold">
                Our Advantage
              </Link>
              <Link href="/#clients" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold">
                Clients
              </Link>
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold">
                Inquire & Visit
              </Link>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col gap-3">
            <a
              href={`tel:+916363847274`}
              className="w-full bg-dark text-white text-center py-3.5 rounded font-medium text-sm flex items-center justify-center gap-2"
            >
              Get Free Consultation
            </a>
          </div>
        </div>
      )}

      {/* FLOATING DIALOG SEARCH SYSTEM */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-sm flex justify-center p-4 pt-[100px]">
          <div className="w-full max-w-2xl bg-white rounded shadow-2xl overflow-hidden flex flex-col max-h-[480px] animate-fade-up">
            <div className="flex items-center border-b border-border p-4 gap-3 bg-surface">
              <Search className="w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Search ergonomic chairs, workspaces, linear setups..."
                className="flex-1 bg-transparent text-dark border-none outline-none font-sans text-sm focus:ring-0 placeholder:text-muted"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-muted hover:text-dark p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {searchQuery.trim().length < 2 ? (
                <div className="text-center py-8 text-muted text-xs font-mono">
                  Type at least 2 characters to discover office items...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-muted block mb-1">
                    Matching Catalog Lines ({searchResults.length})
                  </span>
                  {searchResults.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/products/${prod.id}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center justify-between p-3 hover:bg-surface border border-transparent hover:border-border transition-all duration-200 rounded group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-surface rounded overflow-hidden">
                          {prod.image ? (
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-border flex items-center justify-center text-[10px] text-muted">
                              No Image
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="block text-sm font-bold text-dark group-hover:text-gold transition-colors">
                            {prod.name}
                          </span>
                          <span className="block text-xs text-muted truncate max-w-md">
                            {prod.shortDescription}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs font-mono font-semibold text-gold">
                          Starting at
                        </span>
                        <span className="block text-sm font-bold text-dark font-mono">
                          {prod.price > 0 ? `₹${prod.price.toLocaleString("en-IN")}` : "Call for Quote"}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted text-xs font-mono">
                  No matching workspace models found for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
