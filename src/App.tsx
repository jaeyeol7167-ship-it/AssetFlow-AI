import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Coins, 
  CircleDollarSign, 
  RefreshCcw, 
  Globe, 
  BarChart3,
  Info
} from 'lucide-react';
import AdBanner from './components/AdBanner';
import Calculator from './components/Calculator';

interface Prices {
  rates: { USD: number; KRW: number; JPY: number };
  bitcoin: { usd: number; krw: number; jpy: number };
  gold: { usd_per_oz: number; krw_per_gram: number };
  lastUpdated: string;
}

export default function App() {
  const [prices, setPrices] = useState<Prices | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/prices');
      if (!response.ok) throw new Error('Failed to fetch prices');
      const data = await response.json();
      setPrices(data);
      setError(null);
    } catch (err) {
      setError('실시간 데이터를 가져오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "실시간 자산 가격 비교 계산기",
    "description": "환율, 금, 암호화폐 실시간 시세 조회 및 자산 간 변환 계산기",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All"
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-emerald-500/30">
        <Helmet>
          <title>실시간 자산 가격 비교 계산기 | 환율, 금, 비트코인 시세</title>
          <meta name="description" content="실시간 달러 환율, 금 시세, 비트코인 가격을 한눈에 비교하고 자산 간 가치를 즉시 계산하세요. 구글 애드센스 수익형 웹앱 템플릿." />
          <meta name="keywords" content="환율 계산기, 금 시세, 비트코인 가격, 자산 비교, USD KRW, BTC Gold" />
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        </Helmet>

        {/* Header */}
        <header className="border-bottom border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-black w-5 h-5" />
              </div>
              <h1 className="text-lg font-bold text-white tracking-tight">AssetFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              {prices && (
                <span className="text-[10px] text-zinc-500 font-mono hidden sm:block">
                  Last Updated: {new Date(prices.lastUpdated).toLocaleTimeString()}
                </span>
              )}
              <button 
                onClick={fetchPrices}
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                disabled={loading}
              >
                <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">
          {/* Top Ad */}
          <AdBanner position="top" />

          {/* Hero Section */}
          <section className="mb-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
            >
              Real-time Asset <span className="text-emerald-500">Intelligence</span>
            </motion.h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              환율, 금, 암호화폐의 실시간 가치를 비교하고 분석하세요. 
              복잡한 자산 간 변환을 단 한 번의 클릭으로 해결합니다.
            </p>
          </section>

          {/* Price Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Currency Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Globe className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Exchange Rates</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-zinc-500 text-sm">USD / KRW</span>
                  <span className="text-xl font-mono text-white">{prices?.rates.KRW.toLocaleString() || '---'}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-zinc-500 text-sm">USD / JPY</span>
                  <span className="text-xl font-mono text-white">{prices?.rates.JPY.toLocaleString() || '---'}</span>
                </div>
              </div>
            </motion.div>

            {/* Crypto Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Coins className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Cryptocurrency</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-zinc-500 text-sm">Bitcoin (USD)</span>
                  <span className="text-xl font-mono text-white">${prices?.bitcoin.usd.toLocaleString() || '---'}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-zinc-500 text-sm">Bitcoin (KRW)</span>
                  <span className="text-lg font-mono text-white">₩{prices?.bitcoin.krw.toLocaleString() || '---'}</span>
                </div>
              </div>
            </motion.div>

            {/* Gold Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-yellow-500" />
                </div>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Commodities</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-zinc-500 text-sm">Gold (oz/USD)</span>
                  <span className="text-xl font-mono text-white">${prices?.gold.usd_per_oz.toLocaleString() || '---'}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-zinc-500 text-sm">Gold (g/KRW)</span>
                  <span className="text-lg font-mono text-white">₩{prices?.gold.krw_per_gram.toLocaleString() || '---'}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Middle Ad */}
          <AdBanner position="middle" />

          {/* Calculator Section */}
          <section className="mb-12">
            <Calculator prices={prices} />
          </section>

          {/* Info Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                <Info className="w-4 h-4 text-emerald-500" />
                <h3>About This Tool</h3>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400">
                본 서비스는 실시간 금융 데이터를 바탕으로 자산 가치를 비교해주는 전문 계산기입니다. 
                환율 데이터는 ExchangeRate-API를, 암호화폐 시세는 CoinGecko API를 통해 제공받습니다. 
                모든 데이터는 1분 간격으로 자동 갱신됩니다.
              </p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                <CircleDollarSign className="w-4 h-4 text-emerald-500" />
                <h3>Monetization Guide</h3>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400">
                이 웹앱은 구글 애드센스 최적화 레이아웃으로 설계되었습니다. 
                <code className="bg-zinc-800 px-1 rounded text-emerald-400">AdBanner.tsx</code> 파일의 
                <code className="bg-zinc-800 px-1 rounded text-emerald-400">data-ad-client</code> 속성에 
                본인의 퍼블리셔 ID를 입력하여 바로 수익 창출을 시작할 수 있습니다.
              </p>
            </div>
          </section>

          {/* Bottom Ad */}
          <AdBanner position="bottom" />
        </main>

        <footer className="border-t border-zinc-800 py-12 bg-black">
          <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="text-emerald-500 w-5 h-5" />
              <span className="text-white font-bold">AssetFlow</span>
            </div>
            <p className="text-zinc-600 text-xs">
              © 2024 AssetFlow Calculator. All rights reserved. Data provided for informational purposes only.
            </p>
            <div className="flex gap-6 text-xs text-zinc-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}
