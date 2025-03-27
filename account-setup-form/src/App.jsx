import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Step2 />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step3" element={<Step3 />} />
      </Routes>
    </Router>
  );
};

export default App;
