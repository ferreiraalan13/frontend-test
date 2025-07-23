import { useEffect, useState } from "react";

interface PriceData {
  symbol: string;
  lastPrice: string;
  bidPrice?: string;
  askPrice?: string;
  priceChange?: string;
}

export function useWebSocket(symbols: string[]) {
  const [prices, setPrices] = useState<PriceData[]>(
    symbols.map((symbol) => ({
      symbol,
      lastPrice: "Carregando...",
      bidPrice: "Carregando...",
      askPrice: "Carregando...",
      priceChange: "Carregando...",
    }))
  );

  useEffect(() => {
    if (symbols.length === 0) {
      setPrices([]);
      return;
    }

    setPrices(
      symbols.map((symbol) => ({
        symbol,
        lastPrice: "Carregando...",
        bidPrice: "Carregando...",
        askPrice: "Carregando...",
        priceChange: "Carregando...",
      }))
    );

    const streams = symbols.map((s) => `${s.toLowerCase()}@ticker`).join("/");
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`
    );

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const data = message.data;

      setPrices((prev) =>
        prev.map((item) =>
          item.symbol.toLowerCase() === data.s.toLowerCase()
            ? {
                ...item,
                lastPrice: data.c,
                bidPrice: data.b,
                askPrice: data.a,
                priceChange: data.P,
              }
            : item
        )
      );
    };

    return () => ws.close();
  }, [symbols]);

  return prices;
}
