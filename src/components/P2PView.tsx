import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, ShieldCheck, Star, ThumbsUp } from 'lucide-react';

const MOCK_P2P_ADS = [
  { id: 1, advertiser: 'EthioCrypto_King', orders: 1245, completion: '98.5%', price: 135.50, available: '0.54 BTC', limit: '5,000 - 500,000 ETB', methods: ['CBE', 'Telebirr'] },
  { id: 2, advertiser: 'Addis_Trader', orders: 856, completion: '99.2%', price: 135.75, available: '1.20 BTC', limit: '10,000 - 1,500,000 ETB', methods: ['Awash Bank', 'Telebirr'] },
  { id: 3, advertiser: 'Habesha_OTC', orders: 3421, completion: '97.8%', price: 136.00, available: '5.00 BTC', limit: '50,000 - 5,000,000 ETB', methods: ['CBE', 'Dashen Bank'] },
  { id: 4, advertiser: 'Tele_Fast', orders: 452, completion: '100%', price: 136.20, available: '0.15 BTC', limit: '1,000 - 150,000 ETB', methods: ['Telebirr'] },
];

export default function P2PView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">P2P Trading</h2>
          <p className="text-muted-foreground">Buy and sell cryptocurrency directly with other users.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-primary text-primary-foreground">
            Post My Ad
          </Button>
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="p-0">
          <Tabs defaultValue="buy" className="w-full">
            <div className="px-6 pt-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="buy" className="px-8 data-active:bg-emerald-500 data-active:text-white">Buy</TabsTrigger>
                <TabsTrigger value="sell" className="px-8 data-active:bg-rose-500 data-active:text-white">Sell</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-secondary/30 rounded-lg px-3 py-1 border border-border">
                  <span className="text-xs font-bold mr-2">Asset:</span>
                  <select className="bg-transparent text-xs font-bold outline-none">
                    <option>BTC</option>
                    <option>USDT</option>
                    <option>ETH</option>
                    <option>BNB</option>
                  </select>
                </div>
                <div className="flex items-center bg-secondary/30 rounded-lg px-3 py-1 border border-border">
                  <span className="text-xs font-bold mr-2">Fiat:</span>
                  <select className="bg-transparent text-xs font-bold outline-none">
                    <option>ETB</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </div>
              </div>
            </div>

            <TabsContent value="buy" className="m-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase font-bold text-muted-foreground border-b border-border">
                      <th className="px-6 py-4">Advertiser</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Limit/Available</th>
                      <th className="px-6 py-4">Payment</th>
                      <th className="px-6 py-4 text-right">Trade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {MOCK_P2P_ADS.map((ad) => (
                      <tr key={ad.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-sm text-primary">{ad.advertiser}</span>
                              <ShieldCheck className="w-3 h-3 text-emerald-500" />
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                              <span>{ad.orders} orders</span>
                              <span>|</span>
                              <span>{ad.completion} completion</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <ThumbsUp className="w-3 h-3 text-emerald-500" />
                              <span className="text-[10px] font-bold">99% positive</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-lg font-bold font-mono">{ad.price.toLocaleString()}</span>
                            <span className="text-[10px] text-muted-foreground">ETB / USDT</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs max-w-[150px]">
                              <span className="text-muted-foreground">Available</span>
                              <span className="font-medium">{ad.available}</span>
                            </div>
                            <div className="flex justify-between text-xs max-w-[150px]">
                              <span className="text-muted-foreground">Limit</span>
                              <span className="font-medium">{ad.limit}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {ad.methods.map(m => (
                              <Badge key={m} variant="secondary" className="text-[9px] font-bold px-1.5 py-0">
                                {m}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs h-8 px-6">
                            Buy BTC
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="sell" className="m-0">
              <div className="p-12 text-center text-muted-foreground italic">
                No active sell orders found for your criteria.
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Escrow Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            All P2P trades are protected by our secure escrow system. Funds are held safely until both parties confirm the transaction.
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Star className="w-4 h-4 text-orange-500" />
              Verified Merchants
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            Trade with confidence by choosing verified merchants with high completion rates and positive feedback.
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-blue-500" />
              24/7 Support
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            Our dispute resolution team is available around the clock to help you with any issues during your P2P trades.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
