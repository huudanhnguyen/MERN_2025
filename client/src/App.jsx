import React from "react";
import { Routes, Route } from "react-router-dom";
import path from "./utils/path";

// import các page
import Public from "./pages/public/Public";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Public />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
