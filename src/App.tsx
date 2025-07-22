import { SymbolList } from "./components/SymbolList";
import { WatchList } from "./components/WatchList";
import { SymbolProvider } from "./context/SymbolContext";

function App() {
  return (
    <SymbolProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Símbolos disponíveis</h2>
          <SymbolList />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Minha Watchlist</h2>
          <WatchList />
        </div>
      </div>
    </SymbolProvider>
  );
}

export default App;
