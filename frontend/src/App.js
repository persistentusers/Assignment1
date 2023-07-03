import "./App.css";
import Home from "./Component/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import APIDetails from "./Component/APIDetails";

function App() {
  return (
    <div className="bg-gray-300 App">
      <div className="pt-16 pb-4 pl-4 font-bold ">
        <header className="items-center text-4xl font-bold text-center text-orange-500 ">
          API Monitoring
        </header>
        <button className="pl-4 text-white">
          <a href="/">Home</a>
        </button>
      </div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/apiDetails" element={<APIDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
