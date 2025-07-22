// services/binanceApi.ts
import axios from "axios";
import type { ExchangeInfoResponse } from "./types";

export const getSymbols = async () => {
  const response = await axios.get<ExchangeInfoResponse>(
    "https://api.binance.com/api/v3/exchangeInfo"
  );
  return response.data.symbols.filter((s) => s.status === "TRADING");
};
