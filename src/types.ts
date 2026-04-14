export interface Coin {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

export interface Order {
  price: number;
  amount: number;
  total: number;
  type: 'buy' | 'sell';
}

export interface Trade {
  id: string;
  price: number;
  amount: number;
  time: string;
  type: 'buy' | 'sell';
}

export interface WalletBalance {
  asset: string;
  total: number;
  available: number;
  inOrder: number;
  btcValue: number;
}
