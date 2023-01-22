import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { Home, CreatePost } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="sm:p-8 px-4 py-8 bg-[#f4f4f5] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
