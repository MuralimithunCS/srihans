"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { ShoppingBag, MessageCircle } from "lucide-react";

export const ProductActions: React.FC<{ product: Product }> = ({ product }) => {
  const { addItem } = useQuoteCart();
  const [quantity, setQuantity] = useState(1);

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "916363847274";
  const waUrl = `https://wa.me/${waNumber}?text=Hi%20Srihans%2C%20I%20am%20interested%20in%20a%20quote%20for%20the%20${encodeURIComponent(product.name)}%20(Qty%3A%20${quantity}).`;

  return (
    <div className="flex flex-col gap-5 pt-4">
      {/* Quantity Adjuster */}
      <div className="flex items-center gap-4">
        <span className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
          Quantity:
        </span>
        <div className="flex items-center border border-border bg-white rounded-sm overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 hover:bg-surface text-charcoal font-bold text-base transition-colors"
          >
            -
          </button>
          <span className="px-5 font-mono text-sm font-semibold text-dark">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 hover:bg-surface text-charcoal font-bold text-base transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Main Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => addItem(product, quantity)}
          className="bg-dark hover:bg-gold hover:text-dark text-white font-semibold text-sm uppercase tracking-wider py-4 px-8 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Quote Cart</span>
        </button>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-whatsapp hover:bg-emerald-600 text-white font-semibold text-sm uppercase tracking-wider py-4 px-8 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Inquire on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
