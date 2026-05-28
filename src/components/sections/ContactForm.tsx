"use client";

import React, { useState } from "react";
import { categories } from "@/data/categories";
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    category: "workstations",
    quantity: 1,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError("Please fill out all required fields (*)");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactDetails: formData,
          items: [
            {
              product: {
                name: `Direct Inquiry: ${formData.category.toUpperCase()}`,
                price: 0,
              },
              quantity: formData.quantity,
            },
          ],
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          company: "",
          phone: "",
          email: "",
          category: "workstations",
          quantity: 1,
          message: "",
        });
      } else {
        setError("Failed to submit inquiry. Please try again or chat via WhatsApp.");
      }
    } catch (err) {
      setError("An error occurred. Please contact us on WhatsApp directly.");
      console.error("Form submit error", err);
    } finally {
      setLoading(false);
    }
  };

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "916363847274";
  const waUrl = `https://wa.me/${waNumber}?text=Hi%20Srihans%2C%20I%20want%20to%20request%20an%20office%20furniture%20quote.`;

  return (
    <section id="contact" className="py-24 bg-white px-6 md:px-12 lg:px-20 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Form Column */}
        <div className="lg:col-span-7 bg-surface border border-border p-8 md:p-10 rounded-[12px] shadow-sm flex flex-col gap-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-gold font-bold">
              Instant Pricing
            </span>
            <h3 className="font-display text-3xl font-bold text-dark mt-1">
              Get a Free Quote Today
            </h3>
            <p className="font-sans text-xs text-muted mt-1">
              Complete this catalog inquiry form, and our workspace designer will respond within 2 hours.
            </p>
          </div>

          {success ? (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-6 rounded-[6px] flex flex-col items-center justify-center gap-3 text-center py-12 animate-fade-up">
              <CheckCircle className="w-12 h-12 text-emerald-600" />
              <h4 className="font-display text-xl font-bold">Inquiry Sent Successfully!</h4>
              <p className="font-sans text-sm max-w-sm">
                Thank you for reaching out to Srihans. Our executive designer has received your parameters and will get in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-sm font-sans">
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded text-xs">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-white border border-border focus:border-gold outline-none p-3.5 rounded-sm transition-all text-dark placeholder:text-muted"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                    Company Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. HDFC Bank Ltd"
                    className="w-full bg-white border border-border focus:border-gold outline-none p-3.5 rounded-sm transition-all text-dark placeholder:text-muted"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 98765 43210"
                    className="w-full bg-white border border-border focus:border-gold outline-none p-3.5 rounded-sm transition-all text-dark placeholder:text-muted"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rahul@company.com"
                    className="w-full bg-white border border-border focus:border-gold outline-none p-3.5 rounded-sm transition-all text-dark placeholder:text-muted"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="category" className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                    Main Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-white border border-border focus:border-gold outline-none p-3.5 rounded-sm transition-all text-dark cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="quantity" className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                    Approx Quantity
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full bg-white border border-border focus:border-gold outline-none p-3.5 rounded-sm transition-all text-dark font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-bold text-dark text-xs uppercase tracking-wider font-mono">
                  Blueprint details / Requirements
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details on size requirements, color themes, space layouts..."
                  className="w-full bg-white border border-border focus:border-gold outline-none p-3.5 rounded-sm transition-all text-dark placeholder:text-muted resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-dark hover:bg-gold hover:text-dark text-white font-semibold text-sm uppercase tracking-wider py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 group shadow-md disabled:bg-muted"
              >
                {loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-gold font-bold">
              Directory
            </span>
            <h3 className="font-display text-3xl font-bold text-dark">
              Showroom & Production
            </h3>
          </div>

          <div className="flex flex-col gap-6 text-sm text-charcoal font-sans">
            <div className="flex gap-4 items-start border-b border-border pb-4">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-dark text-xs uppercase tracking-wider font-mono">
                  📍 Corporate Showroom
                </span>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  No.1, 1st Floor, 8th Cross, Temple Road, Malleshwaram, Near Chandus Hotel, Bangalore - 560003
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start border-b border-border pb-4">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-dark text-xs uppercase tracking-wider font-mono">
                  🏭 Production Factory
                </span>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  #6, Ground Floor, 7th Mail, Behind The Club, Mysore Road, Nayandahalli, South Bangalore, Bengaluru - 560039
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start border-b border-border pb-4">
              <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-dark text-xs uppercase tracking-wider font-mono">
                  📞 Phone Numbers
                </span>
                <a href="tel:+916363847274" className="text-xs text-muted hover:text-gold mt-1 block">
                  +91 63638 47274 | 97319 10657 | 080-2334 2335
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-dark text-xs uppercase tracking-wider font-mono">
                  ✉️ Email & Web
                </span>
                <span className="block text-xs text-muted mt-1">
                  srihansofcefurniture@gmail.com | santhoshsm1920@gmail.com
                </span>
                <span className="block text-xs text-gold font-semibold">
                  www.srihansofcefurniture.com
                </span>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Chat pill */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-whatsapp hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded-sm text-center flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Chat Live on WhatsApp</span>
          </a>

          {/* Google Map Iframe Bangalore coordinates */}
          <div className="w-full h-[220px] rounded-[12px] overflow-hidden border border-border shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3879951759495!2d77.566113!3d13.003117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae163c4bbabdbb%3A0xe21fba8f1eb345eb!2s8th%20Cross%20Rd%2C%20Malleshwaram%2C%20Bengaluru%2C%20Karnataka%20560003!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Srihans Showroom Location Map"
              suppressHydrationWarning={true}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
