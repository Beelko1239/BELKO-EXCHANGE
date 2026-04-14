import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Coin } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface MarketTableProps {
  coins: Coin[];
  onSelectCoin?: (coin: Coin) => void;
}

export default function MarketTable({ coins, onSelectCoin }: MarketTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="w-[200px]">Asset</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h Change</TableHead>
            <TableHead className="text-right hidden sm:table-cell">24h Volume</TableHead>
            <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow 
              key={coin.id} 
              className="cursor-pointer hover:bg-secondary/50 border-border transition-colors"
              onClick={() => onSelectCoin?.(coin)}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                    {coin.symbol[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{coin.symbol}</p>
                    <p className="text-xs text-muted-foreground">{coin.name}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right font-mono">
                ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell className={cn(
                "text-right font-medium",
                coin.change24h >= 0 ? "text-emerald-500" : "text-rose-500"
              )}>
                <div className="flex items-center justify-end gap-1">
                  {coin.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(coin.change24h)}%
                </div>
              </TableCell>
              <TableCell className="text-right text-muted-foreground hidden sm:table-cell font-mono">
                ${(coin.volume24h / 1e9).toFixed(2)}B
              </TableCell>
              <TableCell className="text-right text-muted-foreground hidden md:table-cell font-mono">
                ${(coin.marketCap / 1e9).toFixed(2)}B
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
