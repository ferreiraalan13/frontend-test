import { SymbolList } from "./components/SymbolList";
import Watchlist from "./components/WatchList";

function App() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 h-[50%]">
      <div className="sm:max-w-[350px] sm:min-w-[350px] w-full mb-10">
        <h2 className="text-xl font-bold mb-2 text-center">
          Símbolos disponíveis
        </h2>
        <SymbolList />
      </div>
      <div className="mb-10 w-full flex-1">
        <h2 className="text-xl font-bold mb-2 text-center">Minha Watchlist</h2>
        <div className="overflow-auto max-h-[90%]">
          <Watchlist />
        </div>
      </div>
    </div>
  );
}

export default App;
