"use client";

import React, { useState } from "react";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { X, Trash2, Send, CheckCircle, ShoppingCart } from "lucide-react";

export const QuoteCartDrawer: React.FC = () => {
  const {
    cart,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeItem,
    clearCart,
    cartCount,
  } = useQuoteCart();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [contact, setContact] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  });

  if (!isDrawerOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError("Your quote cart is empty. Add products to inquire.");
      return;
    }
    if (!contact.name || !contact.phone) {
      setError("Please fill out Name and Phone number.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactDetails: contact,
          items: cart.map((item) => ({
            product: {
              name: item.product.name,
              price: item.product.price,
            },
            quantity: item.quantity,
          })),
        }),
      });

      if (response.ok) {
        setSuccess(true);
        clearCart();
        setContact({ name: "", company: "", phone: "", email: "", message: "" });
      } else {
        setError("Failed to send quote request. Please try again or use WhatsApp.");
      }
    } catch (err) {
      setError("An error occurred. Please contact us via WhatsApp directly.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Dimmed backdrop click layer */}
      <div
        className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Slide Drawer Panel */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 animate-fade-up animate-duration-300">
        
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-6 border-b border-border bg-surface">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-gold" />
            <h3 className="font-display text-xl font-bold text-dark">
              Your Quote Cart
            </h3>
            <span className="font-mono text-xs bg-dark text-white py-0.5 px-2 rounded-full font-bold">
              {cartCount}
            </span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-muted hover:text-dark p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scroll Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {success ? (
            <div className="flex flex-col items-center justify-center text-center py-12 gap-4 text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-[8px] p-6 animate-fade-up">
              <CheckCircle className="w-14 h-14 text-emerald-600" />
              <h4 className="font-display text-2xl font-bold">Quote Inquiry Sent!</h4>
              <p className="font-sans text-sm max-w-xs">
                We have received your custom configuration parameters. A Srihans corporate design expert will get back to you with prices and drawings within 2 hours.
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setIsDrawerOpen(false);
                }}
                className="mt-4 bg-dark text-white hover:bg-gold hover:text-dark font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded-sm transition-colors duration-200"
              >
                Close Drawer
              </button>
            </div>
          ) : cart.length > 0 ? (
            <>
              {/* Product list */}
              <div className="flex flex-col gap-4 border-b border-border/60 pb-6">
                <span className="text-[10px] uppercase font-mono tracking-widest text-muted block mb-1">
                  Selected Workspace Models
                </span>
                
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between items-center gap-4 p-3.5 bg-surface border border-border/80 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded overflow-hidden flex items-center justify-center p-1 border border-border">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-dark max-w-[180px] truncate">
                          {item.product.name}
                        </span>
                        <span className="block text-[10px] font-mono text-gold font-semibold">
                          ₹{item.product.price.toLocaleString("en-IN")} / Unit
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls & Delete */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center border border-border bg-white rounded-sm overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-surface font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-2.5 font-mono text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-surface font-bold text-xs"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted hover:text-red p-1.5 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inquirer contact form */}
              <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4 font-sans text-sm">
                <span className="text-[10px] uppercase font-mono tracking-widest text-muted block mb-1">
                  Requester Parameters
                </span>

                {error && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded text-xs">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={contact.name}
                    onChange={handleInputChange}
                    placeholder="Rahul Sharma"
                    className="w-full bg-white border border-border outline-none p-3 rounded-sm focus:border-gold transition-colors placeholder:text-muted"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={contact.company}
                    onChange={handleInputChange}
                    placeholder="e.g. HDFC Bank Ltd"
                    className="w-full bg-white border border-border outline-none p-3 rounded-sm focus:border-gold transition-colors placeholder:text-muted"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={contact.phone}
                      onChange={handleInputChange}
                      placeholder="98765 43210"
                      className="w-full bg-white border border-border outline-none p-3 rounded-sm focus:border-gold transition-colors placeholder:text-muted"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contact.email}
                      onChange={handleInputChange}
                      placeholder="rahul@company.com"
                      className="w-full bg-white border border-border outline-none p-3 rounded-sm focus:border-gold transition-colors placeholder:text-muted"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                    Message / Delivery specifications
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={contact.message}
                    onChange={handleInputChange}
                    placeholder="Enter customized parameters, color guidelines, space blueprint details..."
                    className="w-full bg-white border border-border outline-none p-3 rounded-sm focus:border-gold transition-colors placeholder:text-muted resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-dark hover:bg-gold hover:text-dark text-white font-semibold text-xs uppercase tracking-wider py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 group shadow-md disabled:bg-muted"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Inquiries</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 gap-4 text-muted">
              <ShoppingCart className="w-12 h-12 text-border" />
              <h4 className="font-display text-xl font-bold text-dark">Your Cart is Empty</h4>
              <p className="font-sans text-xs max-w-[240px]">
                Browse our ergonomic best-sellers and select models to request customizable pricing parameters.
              </p>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="mt-2 bg-dark text-white hover:bg-gold hover:text-dark font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded-sm transition-colors duration-200"
              >
                Start Browsing
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
