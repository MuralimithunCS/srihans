"use client";

import React, { useEffect, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";

export const MobileCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 0.5s entrance delay on page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "916363847274";
  const message = encodeURIComponent("Hi Srihans, I need a quote for office furniture.");
  const waUrl = `https://wa.me/${waNumber}?text=${message}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-2xl md:hidden flex justify-between items-center p-2.5 gap-2 transition-transform duration-500 transform translate-y-0">
      <a
        href="tel:+916363847274"
        className="flex-1 bg-dark hover:bg-charcoal text-white py-3 px-4 rounded font-medium flex items-center justify-center gap-2 text-sm transition-colors duration-200"
      >
        <Phone className="w-4 h-4 fill-current text-gold" />
        <span>Call Now</span>
      </a>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-whatsapp hover:bg-emerald-600 text-white py-3 px-4 rounded font-medium flex items-center justify-center gap-2 text-sm transition-colors duration-200"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
};
