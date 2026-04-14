import { Coin, WalletBalance } from './types';

export const MOCK_COINS: Coin[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 64231.50, change24h: 2.45, volume24h: 35000000000, marketCap: 1200000000000 },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3452.12, change24h: -1.20, volume24h: 15000000000, marketCap: 400000000000 },
  { id: 'solana', symbol: 'SOL', name: 'Solana', price: 145.67, change24h: 5.12, volume24h: 4000000000, marketCap: 65000000000 },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB', price: 589.30, change24h: 0.45, volume24h: 1200000000, marketCap: 90000000000 },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 0.45, change24h: -2.10, volume24h: 400000000, marketCap: 16000000000 },
  { id: 'ripple', symbol: 'XRP', name: 'Ripple', price: 0.62, change24h: 1.15, volume24h: 1500000000, marketCap: 34000000000 },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', price: 0.16, change24h: 8.45, volume24h: 2000000000, marketCap: 23000000000 },
];

export const MOCK_WALLET: WalletBalance[] = [
  { asset: 'BTC', total: 0.45, available: 0.40, inOrder: 0.05, btcValue: 0.45 },
  { asset: 'ETH', total: 5.2, available: 5.2, inOrder: 0, btcValue: 0.28 },
  { asset: 'USDT', total: 12500, available: 10000, inOrder: 2500, btcValue: 0.19 },
];
