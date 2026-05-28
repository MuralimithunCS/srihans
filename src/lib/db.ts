import fs from "fs/promises";
import path from "path";
import { kv } from "@vercel/kv";
import { Product, QuoteItem } from "@/types";

export interface SavedQuote {
  id: string;
  date: string;
  contactDetails: {
    name: string;
    company: string;
    phone: string;
    email: string;
    message?: string;
  };
  items: QuoteItem[];
  status: "Pending" | "Under Review" | "Answered";
}

interface LocalDB {
  quotes: SavedQuote[];
  hiddenProductIds: string[];
  customProducts: Product[];
}

const LOCAL_DB_PATH = path.join(process.cwd(), "src", "data", "database.json");

const useKv = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

const FREE_DB_URL = "https://kvdb.io/Y1fkWSyK9btaAxorgnDw4A/db_store";

// Helper to read local JSON database
async function readLocalDB(): Promise<LocalDB> {
  // If running in development (localhost), use filesystem directly
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    try {
      const data = await fs.readFile(LOCAL_DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch {
      const defaultDB: LocalDB = { quotes: [], hiddenProductIds: [], customProducts: [] };
      try {
        await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(defaultDB, null, 2), "utf-8");
      } catch {}
      return defaultDB;
    }
  }

  // If running in production (Vercel serverless) and no KV keys are present, use a free anonymous cloud KV
  try {
    const res = await fetch(FREE_DB_URL, { cache: "no-store" });
    if (res.ok) {
      const text = await res.text();
      return JSON.parse(text);
    }
  } catch (err) {
    console.error("Failed to read from free cloud database fallback:", err);
  }

  return { quotes: [], hiddenProductIds: [], customProducts: [] };
}

// Helper to write local JSON database
async function writeLocalDB(data: LocalDB): Promise<void> {
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    try {
      await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch {}
    return;
  }

  // Write to free anonymous cloud KV in production
  try {
    await fetch(FREE_DB_URL, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to write to free cloud database fallback:", err);
  }
}

// 1. getQuotes()
export async function getQuotes(): Promise<SavedQuote[]> {
  if (useKv) {
    const quotes = await kv.get<SavedQuote[]>("srihans_quotes");
    return quotes || [];
  } else {
    const db = await readLocalDB();
    return db.quotes || [];
  }
}

// 2. saveQuote()
export async function saveQuote(quote: SavedQuote): Promise<void> {
  if (useKv) {
    const quotes = await getQuotes();
    quotes.unshift(quote); // Keep latest at top
    await kv.set("srihans_quotes", quotes);
  } else {
    const db = await readLocalDB();
    if (!db.quotes) db.quotes = [];
    db.quotes.unshift(quote);
    await writeLocalDB(db);
  }
}

// 3. updateQuoteStatus()
export async function updateQuoteStatus(id: string, status: "Pending" | "Under Review" | "Answered"): Promise<void> {
  if (useKv) {
    const quotes = await getQuotes();
    const idx = quotes.findIndex((q) => q.id === id);
    if (idx > -1) {
      quotes[idx].status = status;
      await kv.set("srihans_quotes", quotes);
    }
  } else {
    const db = await readLocalDB();
    const idx = db.quotes.findIndex((q) => q.id === id);
    if (idx > -1) {
      db.quotes[idx].status = status;
      await writeLocalDB(db);
    }
  }
}

// 4. getHiddenIds()
export async function getHiddenIds(): Promise<string[]> {
  if (useKv) {
    const hidden = await kv.get<string[]>("srihans_hidden_ids");
    return hidden || [];
  } else {
    const db = await readLocalDB();
    return db.hiddenProductIds || [];
  }
}

// 5. toggleProductVisibility()
export async function toggleProductVisibility(id: string): Promise<boolean> {
  if (useKv) {
    const hidden = await getHiddenIds();
    const idx = hidden.indexOf(id);
    let isHiddenNow = false;
    if (idx > -1) {
      hidden.splice(idx, 1);
    } else {
      hidden.push(id);
      isHiddenNow = true;
    }
    await kv.set("srihans_hidden_ids", hidden);
    return isHiddenNow;
  } else {
    const db = await readLocalDB();
    if (!db.hiddenProductIds) db.hiddenProductIds = [];
    const idx = db.hiddenProductIds.indexOf(id);
    let isHiddenNow = false;
    if (idx > -1) {
      db.hiddenProductIds.splice(idx, 1);
    } else {
      db.hiddenProductIds.push(id);
      isHiddenNow = true;
    }
    await writeLocalDB(db);
    return isHiddenNow;
  }
}

// 6. getCustomProducts()
export async function getCustomProducts(): Promise<Product[]> {
  if (useKv) {
    const custom = await kv.get<Product[]>("srihans_custom_products");
    return custom || [];
  } else {
    const db = await readLocalDB();
    return db.customProducts || [];
  }
}

// 7. addCustomProduct()
export async function addCustomProduct(product: Product): Promise<void> {
  if (useKv) {
    const custom = await getCustomProducts();
    custom.push(product);
    await kv.set("srihans_custom_products", custom);
  } else {
    const db = await readLocalDB();
    if (!db.customProducts) db.customProducts = [];
    db.customProducts.push(product);
    await writeLocalDB(db);
  }
}
