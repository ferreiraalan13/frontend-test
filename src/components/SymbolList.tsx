import { useSymbolContext } from "@/context/SymbolContext";
import { getSymbols } from "@/services/binanceApi";
import type { ISymbol } from "@/services/types";
import { useEffect, useState } from "react";

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
      <input
        type="text"
        placeholder="Buscar símbolo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 w-full p-2 border rounded"
      />
      <button
        onClick={handleAddSelected}
        disabled={selected.length === 0}
        className="mb-3 ml-2 px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
      >
        Adicionar selecionados
      </button>
      <div className="space-y-2 max-h-[500px] overflow-auto">
        {filteredSymbols.map((s) => (
          <div
            key={s.symbol}
            className="flex items-center justify-between p-2 border rounded shadow-sm"
          >
            <div className="flex items-center">
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
