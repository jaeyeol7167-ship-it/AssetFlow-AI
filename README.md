# Real-time Asset Price Comparison Calculator

A professional full-stack web application built with **React (Vite)** and **Express**, designed for real-time monitoring and comparison of global asset prices including exchange rates, gold, and cryptocurrencies.

## 🚀 Features

- **Real-time Data**: Fetches live prices from ExchangeRate-API and CoinGecko.
- **Asset Converter**: Instantly calculate values between BTC, Gold (oz, g, don), USD, KRW, and JPY.
- **AdSense Ready**: Pre-configured `AdBanner` components in high-conversion locations (Top, Middle, Bottom).
- **SEO Optimized**: Includes dynamic meta tags, keywords, and JSON-LD schema for better search engine ranking.
- **Modern UI**: Sleek dark mode design using Tailwind CSS and Motion for smooth interactions.
- **Full-Stack Architecture**: Express backend handles API requests to avoid CORS issues and keep logic centralized.

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Motion.
- **Backend**: Node.js, Express.
- **APIs**: ExchangeRate-API, CoinGecko.

## 💰 Monetization Setup

1. Open `src/components/AdBanner.tsx`.
2. Locate the `data-ad-client` attribute.
3. Replace `"ca-pub-전체공용코드"` with your actual Google AdSense Publisher ID.
4. Deploy to your preferred hosting provider.

## 📦 Installation

```bash
npm install
npm run dev
```

## 🌐 Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjaeyeol7167%2Fasset-calculator)

---

Developed with ❤️ for financial intelligence and revenue generation.
