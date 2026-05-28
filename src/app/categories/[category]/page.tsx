import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { categories } from "@/data/categories";
import { products as staticProducts } from "@/data/products";
import { getCustomProducts, getHiddenIds } from "@/lib/db";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { BackToTop } from "@/components/BackToTop";
import { MobileCTA } from "@/components/MobileCTA";
import { QuoteCartDrawer } from "@/components/QuoteCartDrawer";
import { Eye, ArrowLeft, Star } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// 1. Generate SEO Metadata dynamically for each category
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const currentCategory = categories.find((c) => c.slug === category);
  
  if (!currentCategory) {
    return {
      title: "Category Not Found | Srihans Office Furniture",
    };
  }

  return {
    title: `${currentCategory.name} Bangalore | Custom Office Furniture | Srihans`,
    description: `Browse premium ${currentCategory.name} in Bangalore. Factory-direct pricing on fully customizable workspace solutions. 18+ years of trust. Get free quote within 2 hours.`,
  };
}

// 2. Pre-render all category slugs for outstanding performance
export async function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const currentCategory = categories.find((c) => c.slug === category);

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center font-sans p-6">
        <h1 className="font-display text-3xl font-bold mb-4">Category Not Found</h1>
        <Link href="/" className="text-gold font-bold hover:underline">
          Return to Home Page
        </Link>
      </div>
    );
  }

  // Fetch dynamic products data from database
  const customProducts = await getCustomProducts();
  const hiddenIds = await getHiddenIds();

  // Merge and filter out hidden items
  const allProducts = [...staticProducts, ...customProducts].filter(
    (p) => !hiddenIds.includes(p.id)
  );

  // Filter products matching this category
  const categoryProducts = allProducts.filter((p) => p.category === currentCategory.id);

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-28 bg-surface pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          
          {/* Breadcrumbs & Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-dark font-semibold">Categories</span>
            <span>/</span>
            <span className="text-gold font-bold">{currentCategory.name}</span>
          </div>

          <Link href="/" className="flex items-center gap-1.5 text-xs font-mono text-dark hover:text-gold transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Dynamic Hero Header Visual Banner */}
          <div className="relative rounded-[12px] overflow-hidden bg-dark h-[240px] md:h-[320px] flex items-center p-8 md:p-12 shadow-md">
            {/* Background image overlay */}
            <div className="absolute inset-0">
              <img
                src={currentCategory.image}
                alt={currentCategory.name}
                className="w-full h-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
            </div>
            
            {/* Header Content */}
            <div className="relative z-10 max-w-xl flex flex-col gap-4 text-left">
              <span className="text-[10px] uppercase font-mono tracking-widest text-gold font-semibold">
                Bangalore Factory Direct
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {currentCategory.name}
              </h1>
              <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                Explore our full line of premium, customizable {currentCategory.name.toLowerCase()} built specifically to drive comfort and productivity in modern workspaces.
              </p>
            </div>
          </div>

          {/* Product Grid */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-[6px] overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full"
                >
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
                    />
                    
                    <div className="absolute inset-0 bg-dark/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <Link
                        href={`/products/${product.id}`}
                        className="bg-white hover:bg-gold text-dark p-2.5 rounded-full shadow-lg transition-transform duration-300 scale-90 group-hover:scale-100"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <h3 className="font-sans text-sm font-bold text-dark hover:text-gold transition-colors truncate">
                      {product.name}
                    </h3>

                    <div className="text-[10px] font-mono text-muted tracking-wide flex flex-wrap gap-x-2 gap-y-1 bg-surface p-2 rounded-sm min-h-[44px] items-center">
                      {Object.entries(product.specs).slice(0, 2).map(([key, val], i) => (
                        <span key={i} className="inline-block">
                          • {key}: {val}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="font-bold text-dark text-[10px]">4.8</span>
                    </div>

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

                    <div className="grid grid-cols-1 gap-2 pt-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="bg-dark hover:bg-gold hover:text-dark text-white font-bold text-[9px] uppercase tracking-wider py-3 rounded-sm transition-all duration-300 text-center"
                      >
                        View Specifications
                      </Link>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted font-mono text-xs bg-white rounded border border-border">
              No products found in this category currently.
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
