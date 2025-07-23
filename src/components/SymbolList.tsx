import { useSymbolContext } from "@/context/SymbolContext";
import { getSymbols } from "@/services/binanceApi";
import type { ISymbol } from "@/services/types";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FiPlus } from "react-icons/fi";
import { Input } from "./ui/input";

export const SymbolList = () => {
  const [symbols, setSymbols] = useState<ISymbol[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const { addSymbols, selectedSymbols } = useSymbolContext();

  useEffect(() => {
    getSymbols().then(setSymbols);
  }, []);

  const filteredSymbols = symbols
    .filter((s) => !selectedSymbols.includes(s.symbol))
    .filter((s) => s.symbol.toLowerCase().includes(search.toLowerCase()));

  const handleCheckbox = (symbol: string) => {
    setSelected((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    );
  };

  const handleAddSelected = () => {
    addSymbols(selected);
    setSelected([]);
  };

  return (
    <div>
      <div className="flex flex-col mb-4 justify-center ml-2">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3 w-[90%] p-2"
          placeholder="Search..."
        />
        <Button
          className="px-4 py-2 bg-green-600 text-white cursor-pointer disabled:opacity-50 w-[90%]"
          onClick={handleAddSelected}
          disabled={selected.length === 0}
        >
          <FiPlus /> Add to WatchList
        </Button>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-auto">
        {filteredSymbols.map((s) => (
          <div
            key={s.symbol}
            className="flex items-center justify-between p-2 bg-[#3d3d3d] rounded shadow-sm mr-2"
          >
            <div className="flex items-center ">
              <input
                type="checkbox"
                checked={selected.includes(s.symbol)}
                onChange={() => handleCheckbox(s.symbol)}
                className="mr-2"
              />
              <span>{s.symbol}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
