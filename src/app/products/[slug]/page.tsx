import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { BackToTop } from "@/components/BackToTop";
import { MobileCTA } from "@/components/MobileCTA";
import { QuoteCartDrawer } from "@/components/QuoteCartDrawer";
import { ProductActions } from "@/components/ProductActions";
import { ArrowLeft, Star, ArrowRight, ShieldCheck } from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Generate SEO metadata dynamically for each product
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  
  if (!product) {
    return {
      title: "Product Not Found | Srihans Office Furniture",
    };
  }

  const categoryName = categories.find((c) => c.id === product.category)?.name || "Office Furniture";

  return {
    title: `${product.name} Bangalore | ${categoryName} | Srihans`,
    description: `Order ${product.name} in Bangalore. Factory-direct premium ergonomics, customizable configurations, and 18+ years of trust.`,
  };
}

// 2. Pre-render all product paths for instant rendering
export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center font-sans p-6">
        <h1 className="font-display text-3xl font-bold mb-4">Product Not Found</h1>
        <Link href="/" className="text-gold font-bold hover:underline">
          Return to Home Page
        </Link>
      </div>
    );
  }

  const categoryObj = categories.find((c) => c.id === product.category);

  // Recommendations: products in same category excluding current product
  const recommended = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-28 bg-surface pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          {/* Breadcrumbs & Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`/categories/${categoryObj?.slug}`} className="hover:text-gold transition-colors">
              {categoryObj?.name || "Catalog"}
            </Link>
            <span>/</span>
            <span className="text-gold font-bold">{product.name}</span>
          </div>

          <Link href="/" className="flex items-center gap-1.5 text-xs font-mono text-dark hover:text-gold transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Product Deep View Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[12px] p-6 md:p-10 border border-border shadow-sm">
            
            {/* Left Side: Product Image Display Panel */}
            <div className="lg:col-span-6 flex justify-center items-center bg-surface border border-border/60 rounded-[8px] p-8 min-h-[360px] md:min-h-[480px] relative overflow-hidden group">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-[380px] object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-48 h-48 bg-border/40 rounded-full flex items-center justify-center text-muted text-xs font-mono">
                  No Image Available
                </div>
              )}
              <span className="absolute bottom-4 right-4 text-[9px] uppercase font-mono tracking-wider text-muted">
                100% Genuine Bangalore Manufactured
              </span>
            </div>

            {/* Right Side: Product specifications and Actions Panel */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              
              {/* Product title headers */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold font-bold">
                  {categoryObj?.name || "Premium Series"}
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-dark leading-tight">
                  {product.name}
                </h1>
                
                {/* Product rating row */}
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-sans text-xs font-bold text-dark">4.8</span>
                  <span className="font-sans text-xs text-muted">(198 verified corporate inquiries)</span>
                </div>
              </div>

              {/* Pricing section */}
              <div className="bg-surface border border-border/80 p-4 rounded-sm flex items-baseline justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-muted">
                    Est. Starting Price
                  </span>
                  <span className="text-3xl font-bold font-mono text-dark">
                    {product.price > 0 ? `₹${product.price.toLocaleString("en-IN")}` : "Call for Quote"}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gold font-semibold uppercase tracking-wider">
                  * Factory Direct Pricing
                </span>
              </div>

              {/* Specs detailed bullet listing in IBM Plex Mono font */}
              <div className="flex flex-col gap-3">
                <span className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                  Technical Specifications
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-charcoal bg-surface p-4 rounded-sm border border-border/60">
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="capitalize"><strong>{key}</strong>: {val}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2 font-sans text-sm text-muted leading-relaxed">
                <span className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                  Product Overview
                </span>
                <p>{product.shortDescription}</p>
              </div>

              {/* Interactive Client Actions */}
              <ProductActions product={product} />

              {/* Advantage Badges */}
              <div className="border-t border-border pt-6 grid grid-cols-3 gap-4 text-center mt-2">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-gold mb-1" />
                  <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-dark">3 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-gold mb-1" />
                  <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-dark">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-gold mb-1" />
                  <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-dark">ISO Certified</span>
                </div>
              </div>

            </div>

          </div>

          {/* Sibling Recommendations Grid */}
          {recommended.length > 0 && (
            <div className="flex flex-col gap-8 pt-10 border-t border-border">
              <div className="flex justify-between items-end">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-dark">
                  Recommended Workspace Models
                </h3>
                <Link
                  href={`/categories/${categoryObj?.slug}`}
                  className="text-xs uppercase font-mono tracking-wider font-semibold text-gold hover:underline flex items-center gap-1"
                >
                  <span>Explore Series</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {recommended.map((rec) => (
                  <Link
                    key={rec.id}
                    href={`/products/${rec.id}`}
                    className="bg-white rounded-[6px] border border-border p-4 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="aspect-[4/3] bg-surface rounded flex items-center justify-center p-4 overflow-hidden relative">
                      {rec.image ? (
                        <img
                          src={rec.image}
                          alt={rec.name}
                          className="max-h-[110px] object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-border/40 rounded-full flex items-center justify-center text-muted text-[10px] font-mono">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="block text-xs font-bold text-dark truncate group-hover:text-gold transition-colors">
                        {rec.name}
                      </span>
                      <span className="block text-xs font-mono font-semibold text-gold">
                        {rec.price > 0 ? `Starting at ₹${rec.price.toLocaleString("en-IN")}` : "Call for Quote"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
      <BackToTop />
      <MobileCTA />
      <QuoteCartDrawer />
    </>
  );
}
