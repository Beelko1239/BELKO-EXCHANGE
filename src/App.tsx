import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import MarketTable from './components/MarketTable';
import TradingChart from './components/TradingChart';
import OrderBook from './components/OrderBook';
import TradeForm from './components/TradeForm';
import WalletView from './components/WalletView';
import SecurityView from './components/SecurityView';
import { MOCK_COINS } from './constants';
import { Coin } from './types';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { TrendingUp, TrendingDown, Activity, Users, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCoin, setSelectedCoin] = useState<Coin>(MOCK_COINS[0]);
  const [coins, setCoins] = useState<Coin[]>(MOCK_COINS);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins => 
        prevCoins.map(coin => {
          const change = (Math.random() - 0.5) * (coin.price * 0.001);
          const newPrice = coin.price + change;
          return {
            ...coin,
            price: newPrice,
            change24h: coin.change24h + (Math.random() - 0.5) * 0.1
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update selected coin when coins state updates
  useEffect(() => {
    const updated = coins.find(c => c.id === selectedCoin.id);
    if (updated) setSelectedCoin(updated);
  }, [coins]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Volume (24h)', value: '$52.4B', change: '+12.5%', icon: BarChart3, color: 'text-blue-500' },
                { label: 'Active Traders', value: '1.2M', change: '+5.2%', icon: Users, color: 'text-purple-500' },
                { label: 'Market Cap', value: '$2.4T', change: '-2.1%', icon: Activity, color: 'text-emerald-500' },
                { label: 'New Listings', value: '24', change: 'Last 7d', icon: TrendingUp, color: 'text-orange-500' },
              ].map((stat, i) => (
                <Card key={i} className="border-border bg-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-secondary ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-lg font-bold">{stat.value}</h3>
                        <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Market Overview</h2>
                  <button className="text-xs text-primary font-bold hover:underline">View All</button>
                </div>
                <MarketTable 
                  coins={coins} 
                  onSelectCoin={(coin) => {
                    setSelectedCoin(coin);
                    setActiveTab('markets');
                  }} 
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Top Gainers</h2>
                <div className="space-y-3">
                  {coins.sort((a, b) => b.change24h - a.change24h).slice(0, 4).map((coin) => (
                    <Card key={coin.id} className="border-border bg-card hover:bg-secondary/30 transition-colors cursor-pointer" onClick={() => { setSelectedCoin(coin); setActiveTab('markets'); }}>
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                            {coin.symbol[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{coin.symbol}</p>
                            <p className="text-[10px] text-muted-foreground">{coin.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-mono font-bold">${coin.price.toFixed(2)}</p>
                          <p className="text-[10px] text-emerald-500 font-bold">+{coin.change24h.toFixed(2)}%</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'markets':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
            <div className="xl:col-span-3 space-y-6">
              <TradingChart coin={selectedCoin} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TradeForm />
                <Card className="border-border bg-card">
                  <CardHeader className="py-3 px-4 border-b border-border">
                    <CardTitle className="text-sm font-semibold">Market Trades</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-3 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                      <span>Price (USDT)</span>
                      <span className="text-right">Amount</span>
                      <span className="text-right">Time</span>
                    </div>
                    <div className="px-4 space-y-1 py-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-3 text-[11px] font-mono">
                          <span className={Math.random() > 0.5 ? 'text-emerald-500' : 'text-rose-500'}>
                            {(selectedCoin.price + (Math.random() - 0.5) * 10).toFixed(2)}
                          </span>
                          <span className="text-right">{(Math.random() * 0.5).toFixed(4)}</span>
                          <span className="text-right text-muted-foreground">12:45:0{i}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="xl:col-span-1">
              <OrderBook price={selectedCoin.price} />
            </div>
          </div>
        );
      case 'wallet':
        return <WalletView />;
      case 'security':
        return <SecurityView />;
      default:
        return <div className="flex items-center justify-center h-full text-muted-foreground italic">Coming Soon...</div>;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
