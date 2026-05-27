"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export const WhatsAppFAB: React.FC = () => {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "916363847274";
  const message = encodeURIComponent("Hi Srihans, I need a quote for office furniture.");
  const waUrl = `https://wa.me/${waNumber}?text=${message}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:right-8 z-40 bg-whatsapp text-white p-4 rounded-full shadow-2xl animate-pulse-wa flex items-center justify-center cursor-pointer transition-all duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
    </a>
  );
};
