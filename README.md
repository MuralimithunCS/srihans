# Srihans Office Furniture E-commerce Platform

A complete, premium, high-converting e-commerce web application for **Srihans Office Furniture** — Bangalore's leading workspace solutions brand. Designed for high performance, maximum conversions, search engine visibility, and modern B2B interactions.

---

## 🛠️ Tech Stack & Configurations
- **Framework**: Next.js 16 (App Router with full Turbopack optimizations)
- **Styling**: Tailwind CSS v4 (CSS-first `@theme` settings with premium HSL Tailored palettes)
- **Animations**: Framer Motion 12
- **Validation**: React Hook Form + Zod
- **Mailing Engine**: Nodemailer with SMTP connections and safe rate limiting controls
- **Database Layer**: Local file-based JSON database in development (`database.json`), scaling seamlessly to Upstash-backed **Vercel KV** in cloud production.

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
- `ADMIN_PASSCODE`: Access passcode barrier for the `/admin` portal (default is `admin123`).

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your browser. The secure admin panel is available at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 📦 Vercel Deployment Checklist

Vercel is the recommended hosting target for Next.js App Router applications.

1. **Import Repository**: Connect your Github/Gitlab repository to the Vercel dashboard.
2. **Framework Preset**: Vercel automatically detects Next.js. Keep the default preset.
3. **Provision Vercel KV**:
   - Go to the **Storage** tab in your Vercel Project Dashboard.
   - Select **KV (Redis)** and click "Create".
   - Vercel will automatically inject `KV_REST_API_URL` and `KV_REST_API_TOKEN` into your environment variables automatically.
4. **Environment Variables**: Add the following keys in your Vercel Project Settings:
   - `NEXT_PUBLIC_WA_NUMBER`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `NEXT_PUBLIC_GOOGLE_MAPS_KEY`
   - `ADMIN_PASSCODE` (Set a secure passcode for your live admin dashboard)
5. **Deploy**: Click "Deploy". All categories and products are built statically (`SSG`) for instant CDN delivery!
