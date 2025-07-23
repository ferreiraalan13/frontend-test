import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface SymbolContextType {
  selectedSymbols: string[];
  addSymbols: (symbols: string[]) => void;
  removeSymbol: (symbol: string) => void;
}

const SymbolContext = createContext<SymbolContextType | null>(null);

export const SymbolProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>(() => {
    // Inicializa do localStorage, se existir
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("selectedSymbols");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("selectedSymbols", JSON.stringify(selectedSymbols));
  }, [selectedSymbols]);

  const addSymbols = (symbols: string[]) => {
    setSelectedSymbols((prev) => {
      // Adiciona apenas os que não existem ainda
      const newSymbols = symbols.filter((s) => !prev.includes(s));
      return [...prev, ...newSymbols];
    });
  };

  const removeSymbol = (symbol: string) => {
    setSelectedSymbols(selectedSymbols.filter((s) => s !== symbol));
  };

  return (
    <SymbolContext.Provider
      value={{ selectedSymbols, addSymbols, removeSymbol }}
    >
      {children}
    </SymbolContext.Provider>
  );
};

export const useSymbolContext = () => {
  const context = useContext(SymbolContext);
  if (!context)
    throw new Error("useSymbolContext deve estar dentro do SymbolProvider");
  return context;
};
