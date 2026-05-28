"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  MessageSquare, 
  Power, 
  ToggleLeft, 
  ToggleRight, 
  Plus, 
  X, 
  AlertCircle,
  FileText,
  Building,
  User,
  Phone,
  Mail,
  Database
} from "lucide-react";
import { Product } from "@/types";
import { SavedQuote } from "@/lib/db";
import { categories } from "@/data/categories";

interface AdminDashboardProps {
  initialQuotes: SavedQuote[];
  initialProducts: (Product & { hidden: boolean })[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ initialQuotes, initialProducts }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"quotes" | "inventory">("quotes");
  
  // State management
  const [quotes, setQuotes] = useState<SavedQuote[]>(initialQuotes);
  const [products, setProducts] = useState<(Product & { hidden: boolean })[]>(initialProducts);
  const [selectedQuote, setSelectedQuote] = useState<SavedQuote | null>(null);
  
  // Search & Filter State
  const [quoteSearch, setQuoteSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");

  // Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "workstations",
    shortDescription: "",
    backType: "None",
    material: "",
    tags: "",
  });

  // Logout Handler
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Status Update Handler
  const handleStatusChange = async (id: string, status: "Pending" | "Under Review" | "Answered") => {
    try {
      const res = await fetch("/api/admin/quotes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
        if (selectedQuote && selectedQuote.id === id) {
          setSelectedQuote(prev => prev ? { ...prev, status } : null);
        }
      }
    } catch (err) {
      console.error("Status update error", err);
    }
  };

  // Visibility Toggle Handler
  const handleToggleVisibility = async (id: string) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        const data = await res.json();
        setProducts(prev => prev.map(p => p.id === id ? { ...p, hidden: data.hidden } : p));
      }
    } catch (err) {
      console.error("Visibility toggle error", err);
    }
  };

  // Create Product Handler
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.shortDescription) {
      setError("Please fill out all required fields (*).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        const data = await res.json();
        setProducts(prev => [...prev, { ...data.product, hidden: false }]);
        setAddModalOpen(false);
        setNewProduct({
          name: "",
          category: "workstations",
          shortDescription: "",
          backType: "None",
          material: "",
          tags: "",
        });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add new product.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Statistics calculation
  const totalQuotes = quotes.length;
  const pendingQuotes = quotes.filter(q => q.status === "Pending").length;
  const totalProducts = products.length;

  // Filtered lists
  const filteredQuotes = quotes.filter(q => {
    const term = quoteSearch.toLowerCase();
    return (
      q.contactDetails.name.toLowerCase().includes(term) ||
      (q.contactDetails.company && q.contactDetails.company.toLowerCase().includes(term)) ||
      q.contactDetails.phone.includes(term) ||
      q.id.toLowerCase().includes(term)
    );
  });

  const filteredProductsList = products.filter(p => {
    const term = productSearch.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(term) || p.shortDescription.toLowerCase().includes(term);
    const matchesCategory = productCategoryFilter === "all" || p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-bg flex flex-col font-sans">
      
      {/* Top Banner Navigation bar */}
      <header className="h-[72px] bg-dark text-white border-b border-charcoal shrink-0 flex items-center justify-between px-6 md:px-12 relative z-20 shadow-md">
        <div className="flex flex-col select-none">
          <span className="font-display text-2xl font-bold tracking-tight text-white transition-colors duration-200">
            SRIHANS <span className="text-gold text-xs uppercase tracking-widest font-mono">Console</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-1.5 bg-charcoal p-1 rounded-sm border border-charcoal">
            <button
              onClick={() => setActiveTab("quotes")}
              className={`text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-sm transition-all ${
                activeTab === "quotes"
                  ? "bg-gold text-dark font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Quotes Inbox
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-sm transition-all ${
                activeTab === "inventory"
                  ? "bg-gold text-dark font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Inventory Manager
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-rose-400 p-2.5 rounded-full hover:bg-charcoal transition-all border border-transparent hover:border-charcoal shrink-0"
            title="Log out session"
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Panel Content container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-8 flex flex-col gap-8">
        
        {/* Statistics Band */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-border/80 p-6 rounded-[12px] flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
              <span className="text-xs font-mono uppercase tracking-wider text-muted">Total Quotes Logs</span>
              <span className="font-display text-4xl font-bold text-dark mt-1 font-mono">{totalQuotes}</span>
            </div>
            <FileText className="w-8 h-8 text-gold" />
          </div>

          <div className="bg-white border border-border/80 p-6 rounded-[12px] flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
              <span className="text-xs font-mono uppercase tracking-wider text-muted">Pending Inquiries</span>
              <span className="font-display text-4xl font-bold text-dark mt-1 font-mono text-amber-500">{pendingQuotes}</span>
            </div>
            <AlertCircle className="w-8 h-8 text-amber-500" />
          </div>

          <div className="bg-white border border-border/80 p-6 rounded-[12px] flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
              <span className="text-xs font-mono uppercase tracking-wider text-muted">Total Catalog Stock</span>
              <span className="font-display text-4xl font-bold text-dark mt-1 font-mono">{totalProducts}</span>
            </div>
            <Database className="w-8 h-8 text-gold" />
          </div>
        </div>

        {/* Tab content controller */}
        {activeTab === "quotes" ? (
          /* ========================================================
             QUOTATION INBOX SECTION
             ======================================================== */
          <div className="flex flex-col gap-6 flex-1">
            
            {/* Search filter bar */}
            <div className="bg-white border border-border/80 p-4 rounded-[8px] flex items-center relative">
              <input
                type="text"
                value={quoteSearch}
                onChange={(e) => setQuoteSearch(e.target.value)}
                placeholder="Search quotations by name, company, phone, lead ID..."
                className="w-full bg-surface border border-border/60 focus:border-gold outline-none p-3.5 pl-11 rounded-[6px] text-xs text-dark placeholder:text-muted"
              />
              <Search className="w-4 h-4 text-gold absolute left-8 top-1/2 -translate-y-1/2" />
            </div>

            {/* Inquiries table / Cards lists */}
            {filteredQuotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {filteredQuotes.map(quote => (
                  <div
                    key={quote.id}
                    className="bg-white border border-border/80 p-6 rounded-[8px] shadow-sm hover:shadow-md transition-all flex flex-col gap-4 border-l-[4px] relative"
                    style={{
                      borderLeftColor: 
                        quote.status === "Answered" ? "#10B981" : 
                        quote.status === "Under Review" ? "#3B82F6" : "#F59E0B"
                    }}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{quote.id}</span>
                        <h4 className="font-display text-lg font-bold text-dark mt-0.5">{quote.contactDetails.name}</h4>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <select
                          value={quote.status}
                          onChange={(e) => handleStatusChange(quote.id, e.target.value as "Pending" | "Under Review" | "Answered")}
                          className="bg-surface border border-border text-[10px] font-mono uppercase font-bold p-1 px-2.5 rounded cursor-pointer outline-none text-charcoal focus:border-gold"
                        >
                          <option value="Pending">Pending 🟡</option>
                          <option value="Under Review">Under Review 🔵</option>
                          <option value="Answered">Answered ✅</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer contact cards */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted font-sans bg-surface p-3.5 rounded-[6px]">
                      {quote.contactDetails.company && (
                        <div className="flex items-center gap-1.5 truncate">
                          <Building className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span className="truncate">{quote.contactDetails.company}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{quote.contactDetails.phone}</span>
                      </div>
                      {quote.contactDetails.email && (
                        <div className="flex items-center gap-1.5 truncate col-span-2">
                          <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span className="truncate">{quote.contactDetails.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-between items-center border-t border-border/60 pt-4 mt-2">
                      <span className="text-[10px] font-mono text-muted">
                        {new Date(quote.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedQuote(quote)}
                          className="bg-surface border border-border hover:border-gold text-dark text-[10px] font-mono font-bold uppercase tracking-wider py-2 px-4 rounded transition-all"
                        >
                          Show Items ({quote.items.reduce((acc, i) => acc + i.quantity, 0)})
                        </button>
                        
                        <a
                          href={`https://wa.me/91${quote.contactDetails.phone.replace(/[^0-9]/g, "")}?text=Hi%20${quote.contactDetails.name}%2C%20this%20is%20Srihans%20Office%20Furniture.%20We%20received%20your%20quote%20request%20${quote.id}%20and%20will%20provide%20pricing%20shortly.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-whatsapp hover:bg-emerald-600 text-white p-2.5 rounded hover:scale-105 transition-all"
                          title="Contact customer on WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 text-muted border border-border bg-white rounded-[8px] font-mono text-xs">
                No client quotations found matching your search.
              </div>
            )}

          </div>
        ) : (
          /* ========================================================
             INVENTORY MANAGER SECTION
             ======================================================== */
          <div className="flex flex-col gap-6 flex-1">
            
            {/* Search, Filter categories and Insert Trigger */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border border-border/80 p-4 rounded-[8px] items-center">
                <div className="relative col-span-2">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search products by model name, description..."
                    className="w-full bg-surface border border-border/60 focus:border-gold outline-none p-3.5 pl-11 rounded-[6px] text-xs text-dark placeholder:text-muted"
                  />
                  <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
                
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="bg-surface border border-border/60 focus:border-gold outline-none p-3.5 rounded-[6px] text-xs text-dark cursor-pointer font-bold"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setAddModalOpen(true)}
                className="bg-gold hover:bg-dark hover:text-white text-dark font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-sm transition-all flex items-center justify-center gap-2 shadow-md shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Stock</span>
              </button>

            </div>

            {/* Inventory product grid list */}
            {filteredProductsList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProductsList.map(product => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-[6px] overflow-hidden border transition-all duration-300 flex flex-col h-full ${
                      product.hidden 
                        ? "border-charcoal/40 bg-gray-50/40 opacity-70" 
                        : "border-border/80 hover:shadow-lg"
                    }`}
                  >
                    <div className="relative aspect-[4/3] bg-white flex items-center justify-center p-6 border-b border-border/40 overflow-hidden shrink-0">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-[120px] object-contain"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-surface rounded flex items-center justify-center font-mono text-muted text-[10px] text-center p-2 border border-border">
                          No Image Uploaded
                        </div>
                      )}

                      {/* Display / Hidden Overlay Ribbon */}
                      {product.hidden && (
                        <span className="absolute top-3 left-3 bg-charcoal text-white text-[8px] font-bold font-mono px-2 py-0.5 rounded-sm">
                          HIDDEN
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1 gap-3.5">
                      <div>
                        <span className="text-[9px] font-mono text-muted uppercase tracking-wider block">{product.category}</span>
                        <h4 className="font-sans text-sm font-bold text-dark truncate mt-0.5">{product.name}</h4>
                      </div>

                      <p className="text-xs text-muted leading-relaxed line-clamp-2 h-8 font-sans">
                        {product.shortDescription}
                      </p>

                      <div className="border-t border-border/60 pt-3.5 mt-auto flex items-center justify-between">
                        <span className="text-[9px] font-mono text-muted uppercase tracking-wider">
                          Visibility Toggle
                        </span>
                        
                        <button
                          onClick={() => handleToggleVisibility(product.id)}
                          className={`flex items-center gap-1 transition-colors ${
                            product.hidden ? "text-gray-400 hover:text-gold" : "text-gold hover:text-gray-400"
                          }`}
                        >
                          {product.hidden ? (
                            <ToggleLeft className="w-8 h-8 cursor-pointer" />
                          ) : (
                            <ToggleRight className="w-8 h-8 cursor-pointer" />
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 text-muted border border-border bg-white rounded-[8px] font-mono text-xs">
                No catalog items found matching your filters.
              </div>
            )}

          </div>
        )}

      </main>

      {/* ========================================================
         QUOTE DETAILS OVERLAY INBOX DRAWER
         ======================================================== */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex justify-end font-sans">
          <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={() => setSelectedQuote(null)} />
          
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-fade-left">
            {/* Header Drawer */}
            <div className="bg-dark text-white p-6 flex justify-between items-center border-b border-charcoal">
              <div>
                <span className="text-[10px] font-mono text-gold uppercase tracking-wider">Quotation details</span>
                <h3 className="font-display text-2xl font-bold mt-1 text-white">{selectedQuote.id}</h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-charcoal transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contact details Card */}
            <div className="p-6 border-b border-border/60 flex flex-col gap-3 bg-surface">
              <h4 className="text-xs uppercase font-mono text-muted tracking-wider">Requester Parameters</h4>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-sans text-charcoal">
                <div className="flex gap-2.5 items-center">
                  <User className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <span className="block text-[10px] font-mono text-muted uppercase">Full Name</span>
                    <span className="font-bold">{selectedQuote.contactDetails.name}</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-center">
                  <Building className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <span className="block text-[10px] font-mono text-muted uppercase">Company Name</span>
                    <span className="font-bold">{selectedQuote.contactDetails.company || "Not Provided"}</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-center">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <span className="block text-[10px] font-mono text-muted uppercase">Phone</span>
                    <span>{selectedQuote.contactDetails.phone}</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-center">
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <span className="block text-[10px] font-mono text-muted uppercase">Email</span>
                    <span>{selectedQuote.contactDetails.email || "Not Provided"}</span>
                  </div>
                </div>
              </div>

              {selectedQuote.contactDetails.message && (
                <div className="mt-2 border-t border-border/60 pt-3">
                  <span className="block text-[10px] font-mono text-muted uppercase">Custom Blueprint Specs</span>
                  <p className="text-xs leading-relaxed text-muted bg-white p-3 border border-border/80 rounded mt-1 font-sans">
                    {selectedQuote.contactDetails.message}
                  </p>
                </div>
              )}
            </div>

            {/* Quoted cart list */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              <h4 className="text-xs uppercase font-mono text-muted tracking-wider">Inquired Catalog Items</h4>

              <div className="flex flex-col gap-3">
                {selectedQuote.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border border-border p-4 rounded bg-white shadow-sm"
                  >
                    <div className="flex flex-col gap-0.5 max-w-[70%]">
                      <span className="text-[9px] font-mono text-gold uppercase">{item.product.category}</span>
                      <span className="font-bold text-sm text-dark truncate">{item.product.name}</span>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center font-mono">
                        <span className="block text-[8px] uppercase tracking-wider text-muted">Count</span>
                        <span className="text-sm font-bold text-dark">x{item.quantity}</span>
                      </div>
                      
                      <div className="text-right font-mono">
                        <span className="block text-[8px] uppercase tracking-wider text-muted">Unit price</span>
                        <span className="text-sm font-bold text-dark">
                          {item.product.price > 0 ? `₹${item.product.price.toLocaleString("en-IN")}` : "Call for Quote"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions footer */}
            <div className="p-6 border-t border-border/60 bg-surface flex justify-between items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-muted uppercase">Quotation Status</span>
                <select
                  value={selectedQuote.status}
                  onChange={(e) => handleStatusChange(selectedQuote.id, e.target.value as "Pending" | "Under Review" | "Answered")}
                  className="bg-white border border-border text-xs font-mono uppercase font-bold p-2 px-4 rounded mt-1 cursor-pointer outline-none text-charcoal focus:border-gold"
                >
                  <option value="Pending">Pending 🟡</option>
                  <option value="Under Review">Under Review 🔵</option>
                  <option value="Answered">Answered ✅</option>
                </select>
              </div>

              <a
                href={`https://wa.me/91${selectedQuote.contactDetails.phone.replace(/[^0-9]/g, "")}?text=Hi%20${selectedQuote.contactDetails.name}%2C%20we%20have%20reviewed%20your%20Srihans%20quote%20request%20${selectedQuote.id}%20for:%0A${selectedQuote.items.map(i => `• ${i.product.name} (x${i.quantity})`).join("%0A")}%0A%0AOur%20custom%20price%20estimates%20are%20ready%20for%20dispatch.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-whatsapp hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-sm flex items-center gap-2 shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Quote Details</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
         ADD NEW STOCK MODAL DIALOG
         ======================================================== */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-sans px-6">
          <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={() => setAddModalOpen(false)} />
          
          <div className="relative w-full max-w-lg bg-white rounded-[12px] shadow-2xl overflow-hidden flex flex-col animate-fade-up">
            <div className="bg-dark text-white p-6 flex justify-between items-center border-b border-charcoal">
              <div>
                <span className="text-[10px] font-mono text-gold uppercase tracking-wider">Catalog Inventory</span>
                <h3 className="font-display text-xl font-bold text-white mt-1">Register New Stock Item</h3>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-charcoal transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 flex flex-col gap-4 text-xs font-sans">
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 col-span-2">
                  <label className="font-bold text-dark text-[10px] uppercase tracking-wider font-mono">
                    Product Model Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Aeron Ergonomic Mesh Chair"
                    className="w-full bg-white border border-border focus:border-gold outline-none p-3 rounded-sm transition-all text-dark placeholder:text-muted"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-dark text-[10px] uppercase tracking-wider font-mono">
                    Catalog Category *
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-white border border-border focus:border-gold outline-none p-3 rounded-sm transition-all text-dark cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-dark text-[10px] uppercase tracking-wider font-mono">
                    Back Support Type
                  </label>
                  <select
                    value={newProduct.backType}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, backType: e.target.value }))}
                    className="w-full bg-white border border-border focus:border-gold outline-none p-3 rounded-sm transition-all text-dark cursor-pointer font-mono"
                  >
                    <option value="None">None</option>
                    <option value="HB">HB (High Back)</option>
                    <option value="MB">MB (Medium Back)</option>
                    <option value="LB">LB (Low Back)</option>
                    <option value="VC">VC (Visitor Cantilever)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-dark text-[10px] uppercase tracking-wider font-mono">
                  Primary Material
                </label>
                <input
                  type="text"
                  value={newProduct.material}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, material: e.target.value }))}
                  placeholder="e.g. Glass Mesh back, Nylon frames"
                  className="w-full bg-white border border-border focus:border-gold outline-none p-3 rounded-sm transition-all text-dark placeholder:text-muted"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-dark text-[10px] uppercase tracking-wider font-mono">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newProduct.shortDescription}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, shortDescription: e.target.value }))}
                  placeholder="Brief summary of ergonomics, suitable workspaces, built structure..."
                  className="w-full bg-white border border-border focus:border-gold outline-none p-3 rounded-sm transition-all text-dark placeholder:text-muted resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-dark text-[10px] uppercase tracking-wider font-mono">
                  Tags (Separated by commas)
                </label>
                <input
                  type="text"
                  value={newProduct.tags}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="e.g. mesh, chair, premium, aeron"
                  className="w-full bg-white border border-border focus:border-gold outline-none p-3 rounded-sm transition-all text-dark placeholder:text-muted"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold hover:bg-dark hover:text-white text-dark font-bold text-xs uppercase tracking-widest py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:bg-muted"
              >
                {loading ? (
                  <span>Saving to Database...</span>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Register Product</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
