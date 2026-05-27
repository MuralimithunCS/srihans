# Srihans Office Furniture E-commerce Platform

A complete, premium, high-converting e-commerce web application for **Srihans Office Furniture** — Bangalore's leading workspace solutions brand. Designed for high performance, maximum conversions, search engine visibility, and modern B2B interactions.

---

## 🛠️ Tech Stack & Configurations
- **Framework**: Next.js 16 (App Router with full Turbopack optimizations)
- **Styling**: Tailwind CSS v4 (CSS-first `@theme` settings with premium HSL Tailored palettes)
- **Animations**: Framer Motion 12
- **Validation**: React Hook Form + Zod
- **Mailing Engine**: Nodemailer with SMTP connections and safe rate limiting controls

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
Ensure you are using Node.js 18.17+ or 20+ and install package nodes:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local` and populate the keys:
```bash
cp .env.local.example .env.local
```
Configure your keys inside `.env.local`:
- `NEXT_PUBLIC_WA_NUMBER`: Redirection number for floating WhatsApp bars.
- `SMTP_HOST`: Your email provider SMTP host (e.g. `smtp.gmail.com`).
- `SMTP_PORT`: SMTP port (typically `587` or `465`).
- `SMTP_USER`: Email dispatch identity username.
- `SMTP_PASS`: SMTP email app security password key.
- `NEXT_PUBLIC_GOOGLE_MAPS_KEY`: Google Maps embed credentials.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your browser.

---

## 📦 Vercel Deployment Checklist

Vercel is the recommended hosting target for Next.js App Router applications.

1. **Import Repository**: Connect your Github/Gitlab repository to the Vercel dashboard.
2. **Framework Preset**: Vercel automatically detects Next.js. Keep the default preset.
3. **Environment Variables**: Add the following keys in your Vercel Project Settings:
   - `NEXT_PUBLIC_WA_NUMBER`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `NEXT_PUBLIC_GOOGLE_MAPS_KEY`
4. **Deploy**: Click "Deploy". All categories and products are built statically (`SSG`) for instant CDN delivery!

---

## 🧪 Smoke Test Pipeline

We have provided a fully automated smoke test script verifying route health and rate-limiting triggers.

1. Start your local server:
   ```bash
   npm run dev
   ```
2. Run the smoke-test pipeline in a separate terminal:
   ```bash
   npm run smoke-test
   ```
   This script will:
   - Verify Home page (`/`) resolves with HTTP 200.
   - Verify Category pages (`/categories/workstations`) resolve with HTTP 200.
   - Verify Product detail pages (`/products/aeron-mesh-hb`) resolve with HTTP 200.
   - Submit multiple inquiries to the B2B Quote API (`/api/quote`) to test successful dispatching and ensure that the **IP rate limiter** successfully activates (returning HTTP 429) on the 6th attempt.
