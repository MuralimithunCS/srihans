export interface Product {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  specs: {
    [key: string]: string;
  };
  tags: string[];
  featured: boolean;
  image: string; // Keeps the UI compile clean
  price: number; // Keeps the UI compile clean
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface Client {
  id: string;
  name: string;
  logoText: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
}
