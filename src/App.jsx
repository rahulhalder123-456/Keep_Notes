// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import NotesApp from "./NotesApp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/notes/*" element={<NotesApp />} />
    </Routes>
  );
}

export default App;
