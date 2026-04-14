import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { MOCK_WALLET } from '../constants';
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

export default function WalletView() {
  const totalBtc = MOCK_WALLET.reduce((acc, curr) => acc + curr.btcValue, 0);
  const totalUsdt = totalBtc * 64231.50;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-border bg-card overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Wallet className="w-32 h-32" />
          </div>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <h2 className="text-4xl font-bold font-mono">{totalBtc.toFixed(8)} BTC</h2>
              <p className="text-xl text-muted-foreground font-mono">≈ ${totalUsdt.toLocaleString(undefined, { maximumFractionDigits: 2 })} USDT</p>
            </div>
            <div className="flex gap-3 mt-8">
              <Button className="bg-primary text-primary-foreground">
                <ArrowDownLeft className="w-4 h-4 mr-2" />
                Deposit
              </Button>
              <Button variant="outline" className="border-border">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Withdraw
              </Button>
              <Button variant="outline" className="border-border">
                <RefreshCw className="w-4 h-4 mr-2" />
                Transfer
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Identity Verification</span>
              <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-full font-medium">Verified</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">24h Withdrawal Limit</span>
              <span className="text-sm font-medium">100 BTC</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Trading Fee Level</span>
              <span className="text-sm font-medium">VIP 0</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Asset Balances</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead>Asset</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Available</TableHead>
                <TableHead className="text-right">In Order</TableHead>
                <TableHead className="text-right">BTC Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_WALLET.map((item) => (
                <TableRow key={item.asset} className="border-border hover:bg-secondary/50 transition-colors">
                  <TableCell className="font-bold">{item.asset}</TableCell>
                  <TableCell className="text-right font-mono">{item.total.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">{item.available.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">{item.inOrder.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">{item.btcValue.toFixed(8)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
