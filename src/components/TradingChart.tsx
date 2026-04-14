import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Coin } from '../types';

interface TradingChartProps {
  coin: Coin;
}

// Generate some mock historical data
const generateData = (basePrice: number) => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    price: basePrice + (Math.random() - 0.5) * (basePrice * 0.05),
  }));
};

export default function TradingChart({ coin }: TradingChartProps) {
  const data = React.useMemo(() => generateData(coin.price), [coin.id]);

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold">
            {coin.symbol[0]}
          </div>
          <div>
            <CardTitle className="text-lg font-bold">{coin.symbol}/USDT</CardTitle>
            <p className="text-xs text-muted-foreground">{coin.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold font-mono">${coin.price.toLocaleString()}</p>
          <p className={`text-xs font-medium ${coin.change24h >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={coin.change24h >= 0 ? "#10b981" : "#f43f5e"} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={coin.change24h >= 0 ? "#10b981" : "#f43f5e"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }}
              />
              <YAxis 
                hide 
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: '#71717a', fontSize: '10px' }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={coin.change24h >= 0 ? "#10b981" : "#f43f5e"} 
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
