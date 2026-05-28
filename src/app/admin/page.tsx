import React from "react";
import { AdminDashboard } from "@/components/AdminDashboard";
import { getQuotes, getCustomProducts, getHiddenIds } from "@/lib/db";
import { products as staticProducts } from "@/data/products";

// Ensure this page is not cached statically by Next.js
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Retrieve initial datasets server-side
  const quotes = await getQuotes();
  const customProducts = await getCustomProducts();
  const hiddenIds = await getHiddenIds();

  // Merge products and set hidden state
  const mergedProducts = [...staticProducts, ...customProducts].map((p) => ({
    ...p,
    hidden: hiddenIds.includes(p.id),
  }));

  return (
    <AdminDashboard 
      initialQuotes={quotes} 
      initialProducts={mergedProducts} 
    />
  );
}
