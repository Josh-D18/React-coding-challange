import "./App.css";
import Home from "./components/Home/Home";
import Photos from "./components/Photos/Photos";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <section>
      {/* Routes for both the home and photos page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photos" element={<Photos />} />
      </Routes>
    </section>
  );
}

export default App;
