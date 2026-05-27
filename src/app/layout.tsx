import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { QuoteCartProvider } from "@/context/QuoteCartContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Srihans Office Furniture Bangalore | Workstations, Chairs, Tables",
  description: "Buy premium ergonomic office furniture in Bangalore. High-end workstations, mesh chairs, executive tables, sofas & storage. Factory-direct pricing since 2005. 500+ happy clients. Call 63638 47274",
  keywords: "office furniture bangalore, mesh chairs bangalore, workstations bangalore, executive chairs, ergonomic chairs, office tables bangalore, office sofa, l shaped desks",
  openGraph: {
    title: "Srihans Office Furniture | Premium Ergonomic Workspace Solutions",
    description: "Bangalore's leading office furniture brand. Experience factory-direct pricing on custom-built workstations and seating solutions.",
    url: "https://www.srihansofcefurniture.com",
    siteName: "Srihans Office Furniture",
    images: [
      {
        url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Srihans Office Workstation Showroom",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Srihans Office Furniture Bangalore",
    description: "Bangalore's leading premium workspaces partner. Fully customized office workstations, ergonomic seating, and executive layouts.",
    images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Setup standard LocalBusiness and Aggregate Schema markup
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Srihans Office Furniture",
    "image": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
    "@id": "https://www.srihansofcefurniture.com",
    "url": "https://www.srihansofcefurniture.com",
    "telephone": "+916363847274",
    "priceRange": "₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No.1, 1st Floor, 8th Cross, Temple Road, Malleshwaram",
      "addressLocality": "Bangalore",
      "postalCode": "560003",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0031,
      "longitude": 77.5683
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:30",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.facebook.com/srihansofficefurniture",
      "https://www.instagram.com/srihansofficefurniture"
    ]
  };

  const productRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Srihans Ergonomic Mesh Chairs & Workstations",
    "image": "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&q=80&w=800",
    "description": "Ergonomic mesh chairs, linear sharing workstations, and executive wood tables for corporate office interiors in India.",
    "brand": {
      "@type": "Brand",
      "name": "Srihans"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "198"
    }
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${ibmMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productRatingSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-bg text-dark relative">
        <QuoteCartProvider>
          {children}
        </QuoteCartProvider>
      </body>
    </html>
  );
}
