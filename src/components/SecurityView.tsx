import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Shield, Smartphone, Mail, Key, History } from 'lucide-react';
import { Switch } from './ui/switch';

export default function SecurityView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Settings</h2>
          <p className="text-muted-foreground">Manage your account security and authentication methods.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-lg border border-emerald-500/20">
          <Shield className="w-5 h-5" />
          <span className="font-bold">Security Level: High</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              Two-Factor Authentication (2FA)
            </CardTitle>
            <CardDescription>Used for login and withdrawals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Google Authenticator</p>
                <p className="text-xs text-muted-foreground">Highly recommended for account safety</p>
              </div>
              <Button variant="outline" className="border-border">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Authentication</p>
                <p className="text-xs text-muted-foreground">Used for withdrawals and security changes</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">+251 **** 5678</span>
                <Button variant="ghost" size="sm" className="text-primary">Change</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Email Verification
            </CardTitle>
            <CardDescription>Primary account verification method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Address</p>
                <p className="text-xs text-muted-foreground">beletewoldu2@gmail.com</p>
              </div>
              <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-full font-medium">Verified</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Anti-Phishing Code</p>
                <p className="text-xs text-muted-foreground">Prevents phishing emails</p>
              </div>
              <Button variant="outline" className="border-border">Set Code</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Monitor your account for suspicious activity</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {[
                { action: 'Login', device: 'Chrome (macOS)', ip: '197.156.102.45', time: '2024-04-14 12:34:56', status: 'Success' },
                { action: 'Withdrawal', device: 'Mobile App (iOS)', ip: '197.156.102.45', time: '2024-04-13 15:20:11', status: 'Success' },
                { action: 'API Key Created', device: 'Chrome (macOS)', ip: '197.156.102.45', time: '2024-04-12 09:15:33', status: 'Success' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-secondary/20 transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.device} • {log.ip}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs font-mono">{log.time}</p>
                    <p className="text-xs text-emerald-500 font-medium">{log.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
