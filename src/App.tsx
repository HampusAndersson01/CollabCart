// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListDisplay from "./ListDisplay";

const App: React.FC = () => {
  document.title = 'CollabCart';
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
