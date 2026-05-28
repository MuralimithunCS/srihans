import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { CategoriesGrid } from "@/components/sections/CategoriesGrid";
import { BestSellers } from "@/components/sections/BestSellers";
import { Advantage } from "@/components/sections/Advantage";
import { StatsBand } from "@/components/sections/StatsBand";
import { Lookbook } from "@/components/sections/Lookbook";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { FullProductRange } from "@/components/sections/FullProductRange";
import { products as staticProducts } from "@/data/products";
import { getCustomProducts, getHiddenIds } from "@/lib/db";
import { Testimonials } from "@/components/sections/Testimonials";
import { AboutBrand } from "@/components/sections/AboutBrand";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { MobileCTA } from "@/components/MobileCTA";
import { BackToTop } from "@/components/BackToTop";
import { QuoteCartDrawer } from "@/components/QuoteCartDrawer";

export default async function Home() {
  const customProducts = await getCustomProducts();
  const hiddenIds = await getHiddenIds();

  const activeProducts = [...staticProducts, ...customProducts].filter(
    (p) => !hiddenIds.includes(p.id)
  );

  return (
    <>
      {/* Dynamic Header Navbar Shell */}
      <Navbar />

      {/* Primary Landing Page Sections */}
      <main className="w-full relative overflow-hidden bg-white">
        {/* Section 2: Hero (100vh) */}
        <Hero />

        {/* Section 3: Product Categories Grid */}
        <CategoriesGrid />

        {/* Section 4: Featured Products Best Sellers */}
        <BestSellers initialProducts={activeProducts} />

        {/* Section 5: The Srihans Advantage */}
        <Advantage />

        {/* Section 6: Stats Counter Band */}
        <StatsBand />

        {/* Section 7: Spaces We've Transformed Lookbook */}
        <Lookbook />

        {/* Section 8: Full Catalog Range */}
        <FullProductRange initialProducts={activeProducts} />

        {/* Section 9: Client Logos Trust Band */}
        <ClientMarquee />

        {/* Section 10: Testimonials */}
        <Testimonials />

        {/* Section 11: About Brand Story */}
        <AboutBrand />

        {/* Section 12: Inquiries & Google Maps Contact Form */}
        <ContactForm />
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Floating Action Button (Pulsing WhatsApp) */}
      <WhatsAppFAB />

      {/* Sticky Bottom Actions Panel for Mobile Viewports */}
      <MobileCTA />

      {/* Floating Back To Top Event Trigger */}
      <BackToTop />

      {/* Slide-out Quote Cart Drawer */}
      <QuoteCartDrawer />
    </>
  );
}
