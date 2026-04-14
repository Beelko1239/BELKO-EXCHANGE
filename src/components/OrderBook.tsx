import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

interface OrderBookProps {
  price: number;
}

export default function OrderBook({ price }: OrderBookProps) {
  // Mock order book data
  const asks = Array.from({ length: 15 }, (_, i) => ({
    price: price + (i + 1) * (price * 0.0001),
    amount: Math.random() * 2,
    total: 0
  })).reverse();

  const bids = Array.from({ length: 15 }, (_, i) => ({
    price: price - (i + 1) * (price * 0.0001),
    amount: Math.random() * 2,
    total: 0
  }));

  return (
    <Card className="border-border bg-card h-full">
      <CardHeader className="py-3 px-4 border-b border-border">
        <CardTitle className="text-sm font-semibold">Order Book</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-3 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
          <span>Price (USDT)</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Total</span>
        </div>
        
        <ScrollArea className="h-[200px]">
          <div className="px-4 space-y-[2px]">
            {asks.map((order, i) => (
              <div key={i} className="grid grid-cols-3 text-[11px] font-mono relative group">
                <div className="absolute inset-0 bg-rose-500/10 origin-right transition-transform" style={{ transform: `scaleX(${order.amount / 2})` }}></div>
                <span className="text-rose-500 z-10">{order.price.toFixed(2)}</span>
                <span className="text-right z-10">{order.amount.toFixed(4)}</span>
                <span className="text-right z-10">{(order.price * order.amount).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="px-4 py-3 border-y border-border bg-secondary/20">
          <p className="text-lg font-bold font-mono text-emerald-500 text-center">
            {price.toLocaleString()} <span className="text-xs text-muted-foreground font-normal">≈ $64,231.50</span>
          </p>
        </div>

        <ScrollArea className="h-[200px]">
          <div className="px-4 space-y-[2px] py-1">
            {bids.map((order, i) => (
              <div key={i} className="grid grid-cols-3 text-[11px] font-mono relative group">
                <div className="absolute inset-0 bg-emerald-500/10 origin-right transition-transform" style={{ transform: `scaleX(${order.amount / 2})` }}></div>
                <span className="text-emerald-500 z-10">{order.price.toFixed(2)}</span>
                <span className="text-right z-10">{order.amount.toFixed(4)}</span>
                <span className="text-right z-10">{(order.price * order.amount).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
