import "./App.css";
import Home from "./Component/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import APIDetails from "./Component/APIDetails";

function App() {
  return (
    <div className="bg-gray-300 App">
      <header className="flex flex-col items-center pt-16 text-4xl font-bold text-center text-orange-500">
        API Monitoring
      </header>
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
