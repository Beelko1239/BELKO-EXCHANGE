import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });

  const PORT = 3000;

  // Initial data
  let coins = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 64231.50, change24h: 2.45, volume24h: 35000000000, marketCap: 1200000000000 },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3452.12, change24h: -1.20, volume24h: 15000000000, marketCap: 400000000000 },
    { id: 'solana', symbol: 'SOL', name: 'Solana', price: 145.67, change24h: 5.12, volume24h: 4000000000, marketCap: 65000000000 },
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB', price: 589.30, change24h: 0.45, volume24h: 1200000000, marketCap: 90000000000 },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 0.45, change24h: -2.10, volume24h: 400000000, marketCap: 16000000000 },
    { id: 'ripple', symbol: 'XRP', name: 'Ripple', price: 0.62, change24h: 1.15, volume24h: 1500000000, marketCap: 34000000000 },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', price: 0.16, change24h: 8.45, volume24h: 2000000000, marketCap: 23000000000 },
  ];

  // Broadcast price updates every 2 seconds
  setInterval(() => {
    coins = coins.map(coin => {
      const change = (Math.random() - 0.5) * (coin.price * 0.001);
      const newPrice = coin.price + change;
      const newChange = coin.change24h + (Math.random() - 0.5) * 0.1;
      return {
        ...coin,
        price: newPrice,
        change24h: newChange
      };
    });

    const message = JSON.stringify({ type: 'PRICE_UPDATE', data: coins });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }, 2000);

  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    // Send initial state
    ws.send(JSON.stringify({ type: 'INITIAL_STATE', data: coins }));
    
    ws.on('close', () => console.log('Client disconnected'));
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
