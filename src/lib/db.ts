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

// Helper to read local JSON database
async function readLocalDB(): Promise<LocalDB> {
  try {
    const data = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    // If running in vercel production read-only filesystem, fallback to memory
    const defaultDB: LocalDB = { quotes: [], hiddenProductIds: [], customProducts: [] };
    try {
      await writeLocalDB(defaultDB);
    } catch {
      // Ephemeral fallback
    }
    return defaultDB;
  }
}

// Helper to write local JSON database
async function writeLocalDB(data: LocalDB): Promise<void> {
  try {
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Suppress write errors in read-only environment
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
