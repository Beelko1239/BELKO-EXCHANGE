import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, ShieldCheck, Globe, Zap, Lock, Mail, UserPlus, LogIn } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthViewProps {
  onLogin: () => void;
}

export default function AuthView({ onLogin }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <TrendingUp className="text-primary-foreground w-7 h-7" />
          </div>
          <h1 className="font-bold text-3xl tracking-tight">BELKO <span className="text-muted-foreground font-light">EX</span></h1>
        </div>

        <Card className="border-border bg-card/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Enter your credentials to access your exchange' 
                : 'Join the most advanced crypto exchange in Ethiopia'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={isLogin ? "login" : "register"} className="w-full" onValueChange={(v) => setIsLogin(v === 'login')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="data-active:bg-primary data-active:text-primary-foreground">Login</TabsTrigger>
                <TabsTrigger value="register" className="data-active:bg-primary data-active:text-primary-foreground">Register</TabsTrigger>
              </TabsList>

              <TabsContent value={isLogin ? "login" : "register"}>
                <div className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Full Name</label>
                      <div className="relative">
                        <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="John Doe" className="pl-10 bg-secondary/30 border-border" />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="email" placeholder="name@example.com" className="pl-10 bg-secondary/30 border-border" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Password</label>
                      {isLogin && <button className="text-[10px] text-primary hover:underline">Forgot Password?</button>}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" className="pl-10 bg-secondary/30 border-border" />
                    </div>
                  </div>

                  <Button 
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base mt-4 shadow-lg shadow-primary/20"
                    onClick={onLogin}
                  >
                    {isLogin ? <LogIn className="w-4 h-4 mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="border-border hover:bg-secondary/50">
                      <Globe className="w-4 h-4 mr-2" />
                      Google
                    </Button>
                    <Button variant="outline" className="border-border hover:bg-secondary/50">
                      <Zap className="w-4 h-4 mr-2" />
                      Apple
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-medium text-muted-foreground">Secure Escrow</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
              <Globe className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-medium text-muted-foreground">Global Access</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="p-2 rounded-full bg-orange-500/10 text-orange-500">
              <Zap className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-medium text-muted-foreground">Fast Trades</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
