import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export default function TradeForm() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="py-3 px-4 border-b border-border">
        <CardTitle className="text-sm font-semibold">Place Order</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="buy" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Buy</TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">Sell</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                <span>Price</span>
                <span>USDT</span>
              </div>
              <Input type="number" defaultValue="64231.50" className="bg-secondary/50 border-border font-mono" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                <span>Amount</span>
                <span>BTC</span>
              </div>
              <Input type="number" placeholder="0.00" className="bg-secondary/50 border-border font-mono" />
            </div>

            <div className="flex justify-between gap-2">
              {[25, 50, 75, 100].map(p => (
                <Button key={p} variant="outline" size="sm" className="flex-1 text-[10px] h-7 border-border hover:bg-secondary">
                  {p}%
                </Button>
              ))}
            </div>

            <Separator className="bg-border" />

            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Available</span>
              <span className="font-medium">10,000.00 USDT</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Max Buy</span>
              <span className="font-medium">0.1556 BTC</span>
            </div>

            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
              Buy BTC
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                <span>Price</span>
                <span>USDT</span>
              </div>
              <Input type="number" defaultValue="64231.50" className="bg-secondary/50 border-border font-mono" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                <span>Amount</span>
                <span>BTC</span>
              </div>
              <Input type="number" placeholder="0.00" className="bg-secondary/50 border-border font-mono" />
            </div>

            <div className="flex justify-between gap-2">
              {[25, 50, 75, 100].map(p => (
                <Button key={p} variant="outline" size="sm" className="flex-1 text-[10px] h-7 border-border hover:bg-secondary">
                  {p}%
                </Button>
              ))}
            </div>

            <Separator className="bg-border" />

            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Available</span>
              <span className="font-medium">0.4500 BTC</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Max Sell</span>
              <span className="font-medium">28,904.17 USDT</span>
            </div>

            <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold">
              Sell BTC
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
