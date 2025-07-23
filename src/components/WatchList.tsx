import { useSymbolContext } from "@/context/SymbolContext";
import { useWebSocket } from "../hooks/useWebSocket";
import { useMemo } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";

export default function Watchlist() {
  const { selectedSymbols, removeSymbol } = useSymbolContext();
  const symbolsLower = useMemo(
    () => selectedSymbols.map((s) => s.toLowerCase()),
    [selectedSymbols]
  );
  const prices = useWebSocket(symbolsLower);

  if (selectedSymbols.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Add symbols to your list to see more details
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Símbolo</TableHead>
          <TableHead>Last Price</TableHead>
          <TableHead>Bid Price</TableHead>
          <TableHead>Ask Price</TableHead>
          <TableHead>Price Change(%)</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prices.map((item) => (
          <TableRow key={item.symbol}>
            <TableCell className="uppercase">{item.symbol}</TableCell>
            <TableCell className="font-semibold">{item.lastPrice}</TableCell>
            <TableCell className="font-semibold">{item.bidPrice}</TableCell>
            <TableCell className="font-semibold">{item.askPrice}</TableCell>
            <TableCell className="font-semibold">
              {item.priceChange && !isNaN(parseFloat(item.priceChange))
                ? `${parseFloat(item.priceChange).toFixed(2)}%`
                : "--"}
            </TableCell>
            <TableCell className="font-semibold">
              <span
                onClick={() => removeSymbol(item.symbol.toUpperCase())}
                className="text-red-500 cursor-pointer"
                title="Remover símbolo"
              >
                <FaTrashAlt />
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
