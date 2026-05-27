"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 md:right-8 z-40 bg-dark hover:bg-gold text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 flex items-center justify-center group"
      aria-label="Back to Top"
    >
      <ArrowUp className="w-5 h-5 transition-transform group-hover:animate-bounce" />
    </button>
  );
};
