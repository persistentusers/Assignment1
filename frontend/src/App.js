import "./App.css";
import React from "react";
import Home from "./Component/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import APIDetails from "./Component/APIDetails";
import APIReport from "./Component/APIReport";
import Schedular from "./Component/Schedular";
import APIValidation from "./Component/APIValidation";

function App() {
  return (
    <div className="bg-gray-300 App">
      <div className="pt-16 pb-4 pl-4 font-bold">
        <header className="items-center text-4xl font-bold text-center text-orange-500 ">
          API Monitoring
        </header>
        <button className="flex gap-2 pl-4 text-lg text-white">
          <a href="/">Home</a>
          <a href="/report">Report</a>
        </button>
      </div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/apiDetails" element={<APIDetails />} />
          <Route exact path="/report" element={<APIReport />} />
          <Route exact path="/schedular" element={<Schedular />} />
          <Route exact path="/apiValidation" element={<APIValidation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
