import React, { useState, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Coin } from '../types';
import { TrendingUp, TrendingDown, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface MarketTableProps {
  coins: Coin[];
  onSelectCoin?: (coin: Coin) => void;
}

type SortKey = 'symbol' | 'price' | 'change24h' | 'volume24h' | 'marketCap';
type SortOrder = 'asc' | 'desc' | null;

export default function MarketTable({ coins, onSelectCoin }: MarketTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('marketCap');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortOrder === 'desc') setSortOrder('asc');
      else if (sortOrder === 'asc') setSortOrder(null);
      else setSortOrder('desc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const sortedCoins = useMemo(() => {
    if (!sortOrder || !sortKey) return coins;

    return [...coins].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [coins, sortKey, sortOrder]);

  const SortIndicator = ({ id }: { id: SortKey }) => {
    if (sortKey !== id || !sortOrder) return <ArrowUpDown className="ml-2 h-3 w-3 opacity-30" />;
    return sortOrder === 'asc' 
      ? <ChevronUp className="ml-2 h-3 w-3 text-primary" /> 
      : <ChevronDown className="ml-2 h-3 w-3 text-primary" />;
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead 
              className="w-[200px] cursor-pointer hover:text-foreground transition-colors"
              onClick={() => handleSort('symbol')}
            >
              <div className="flex items-center">
                Asset <SortIndicator id="symbol" />
              </div>
            </TableHead>
            <TableHead 
              className="text-right cursor-pointer hover:text-foreground transition-colors"
              onClick={() => handleSort('price')}
            >
              <div className="flex items-center justify-end">
                Price <SortIndicator id="price" />
              </div>
            </TableHead>
            <TableHead 
              className="text-right cursor-pointer hover:text-foreground transition-colors"
              onClick={() => handleSort('change24h')}
            >
              <div className="flex items-center justify-end">
                24h Change <SortIndicator id="change24h" />
              </div>
            </TableHead>
            <TableHead 
              className="text-right hidden sm:table-cell cursor-pointer hover:text-foreground transition-colors"
              onClick={() => handleSort('volume24h')}
            >
              <div className="flex items-center justify-end">
                24h Volume <SortIndicator id="volume24h" />
              </div>
            </TableHead>
            <TableHead 
              className="text-right hidden md:table-cell cursor-pointer hover:text-foreground transition-colors"
              onClick={() => handleSort('marketCap')}
            >
              <div className="flex items-center justify-end">
                Market Cap <SortIndicator id="marketCap" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCoins.map((coin) => (
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
                  {Math.abs(coin.change24h).toFixed(2)}%
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
