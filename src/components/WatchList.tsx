import { useSymbolContext } from "@/context/SymbolContext";

export const WatchList = () => {
  const { selectedSymbols, removeSymbol } = useSymbolContext();

  return (
    <div className="space-y-2">
      {selectedSymbols.map((symbol) => (
        <div
          key={symbol}
          className="flex justify-between p-2 bg-gray-100 rounded shadow-sm"
        >
          <span>{symbol}</span>
          <button
            onClick={() => removeSymbol(symbol)}
            className="text-sm text-red-500"
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
};
