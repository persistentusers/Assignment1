import "./App.css";
import Home from "./Component/Home";

function App() {
  return (
    <div className="App bg-gray-400">
      <header className="text-4xl font-bold text-red-500 text-center flex flex-col items-center pt-16">
        API Monitoring
      </header>
      <Home />
    </div>
  );
}

export default App;
