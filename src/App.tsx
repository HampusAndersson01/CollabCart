// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListForm from "./ListForm";
import ListDisplay from "./ListDisplay";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListDisplay />} />
        <Route path="/list/:listId" element={<ListDisplay />} />
      </Routes>
    </Router>
  );
};

export default App;
