import { useState } from "react";
import "./App.css";
import { v4 } from "uuid";
import Home from "./pages/Home";
import Collaborate from "./pages/Collaborate";
import Room from "./pages/Room";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/collaborate" element={<Collaborate />} />
        <Route exact path="/room" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
