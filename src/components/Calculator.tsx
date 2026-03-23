import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, TrendingUp, Coins, CircleDollarSign } from 'lucide-react';

interface Prices {
  rates: { USD: number; KRW: number; JPY: number };
  bitcoin: { usd: number; krw: number; jpy: number };
  gold: { usd_per_oz: number; krw_per_gram: number };
}

interface CalculatorProps {
  prices: Prices | null;
}

const Calculator: React.FC<CalculatorProps> = ({ prices }) => {
  const [amount, setAmount] = useState<number>(1);
  const [fromAsset, setFromAsset] = useState<string>('BTC');
  const [toAsset, setToAsset] = useState<string>('GOLD_GRAM');
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    if (!prices) return;

    const calculate = () => {
      let usdValue = 0;

      // Convert fromAsset to USD
      switch (fromAsset) {
        case 'BTC': usdValue = amount * prices.bitcoin.usd; break;
        case 'USD': usdValue = amount; break;
        case 'KRW': usdValue = amount / prices.rates.KRW; break;
        case 'JPY': usdValue = amount / prices.rates.JPY; break;
        case 'GOLD_OZ': usdValue = amount * prices.gold.usd_per_oz; break;
        default: usdValue = 0;
      }

      // Convert USD to toAsset
      let finalValue = 0;
      switch (toAsset) {
        case 'BTC': finalValue = usdValue / prices.bitcoin.usd; break;
        case 'USD': finalValue = usdValue; break;
        case 'KRW': finalValue = usdValue * prices.rates.KRW; break;
        case 'JPY': finalValue = usdValue * prices.rates.JPY; break;
        case 'GOLD_OZ': finalValue = usdValue / prices.gold.usd_per_oz; break;
        case 'GOLD_GRAM': finalValue = usdValue / (prices.gold.usd_per_oz / 31.1035); break;
        case 'GOLD_DON': finalValue = (usdValue * prices.rates.KRW) / prices.gold.krw_per_gram / 3.75; break;
        default: finalValue = 0;
      }

      setResult(finalValue);
    };

    calculate();
  }, [amount, fromAsset, toAsset, prices]);

  if (!prices) return <div className="p-8 text-center text-zinc-500">Loading calculator data...</div>;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <ArrowRightLeft className="w-5 h-5 text-emerald-500" />
        </div>
        <h2 className="text-xl font-semibold text-white">Asset Converter</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">From</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
            <select
              value={fromAsset}
              onChange={(e) => setFromAsset(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-3 text-white focus:outline-none"
            >
              <option value="BTC">BTC</option>
              <option value="USD">USD</option>
              <option value="KRW">KRW</option>
              <option value="JPY">JPY</option>
              <option value="GOLD_OZ">Gold (oz)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">To</label>
          <div className="flex gap-2">
            <div className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-emerald-400 font-mono flex items-center">
              {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
            </div>
            <select
              value={toAsset}
              onChange={(e) => setToAsset(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-3 text-white focus:outline-none"
            >
              <option value="GOLD_GRAM">Gold (g)</option>
              <option value="GOLD_DON">Gold (돈)</option>
              <option value="GOLD_OZ">Gold (oz)</option>
              <option value="BTC">BTC</option>
              <option value="KRW">KRW</option>
              <option value="USD">USD</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/50">
        <p className="text-sm text-zinc-400 text-center">
          1 {fromAsset} = <span className="text-emerald-400 font-mono">{(result / (amount || 1)).toLocaleString(undefined, { maximumFractionDigits: 6 })}</span> {toAsset}
        </p>
      </div>
    </div>
  );
};

export default Calculator;
